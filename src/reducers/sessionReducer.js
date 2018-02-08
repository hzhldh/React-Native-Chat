import {LOGGED_IN, LOGOUT} from "../actions/user";
import {
  MESSAGE_MORE, MESSAGE_RECEIVE, MESSAGE_SEND, SESSION_ADD, SESSION_CHANGE, SESSION_CLOSE,
  SESSION_RESET
} from "../actions/session";

const initialState={
  activeUserId: -1,//正在聊天的对象
  users: {
    // 1:{
    //   session:{
    //     user:{},
    //     lastMsg:{},
    //     session:{},
    //     unRead:0,
    //   },
    //   messageIds:[],
    // },
  },
  messages: {
    // "888-66":{},
  }
};

function session(state = initialState, action: any){
  switch (action.type) {
    //加载会话列表
    case SESSION_RESET:
      let newUsers = {};
      action.sessions.forEach(item => {
        if (!state.users[item.chatUser.id]) {//首次新建会话
          let newSession = {
            session: item,
            messageIds: []
          };
          newUsers[item.chatUser.id] = newSession;
        } else {
          // newUsers[item.chatUser.id] = {
          //   ...state.users[item.chatUser.id],
          //   session: item,
          // }
        }
      });

      return {
        ...state,
        users: {
          ...state.users,
          ...newUsers,
        }
      };

    //切换聊天用户
    case SESSION_CHANGE:
      return{
        ...state,
        activeUserId:action.userId,
        users:{
          ...state.users,
          [action.userId]:{
            ...state.users[action.userId],
            session:{
              ...state.users[action.userId].session,
              unRead:0
            }
          }
        }
      };

    //关闭聊天会话
    case SESSION_CLOSE:
      return{
        ...state,
        activeUserId:-1
      };


    //加载更多消息
    case MESSAGE_MORE:
      const appendMessages = action.messages;
      const newMessageMap = {};
      const newIds = [];
      appendMessages.forEach(msg => {
        newMessageMap[msg.uuid] = msg;
        if (!(state.users[action.appendId].messageIds.some(m => m === msg.uuid))) {//判断消息池内是否重复
          newIds.unshift(msg.uuid)
        }
      });
      return {
        ...state,
        messages: {
          ...state.messages,
          ...newMessageMap
        },
        users: {
          ...state.users,
          [action.appendId]: {
            ...state.users[action.appendId],
            messageIds: [
              ...newIds,
              ...state.users[action.appendId].messageIds,
            ]
          }
        }
      };


    //发送一条消息
    case MESSAGE_SEND:
      const message = action.message;
      const user_id = message.receiverId;
      let appendUuid = message.uuid;
      // if (state.users[user_id].messageIds.some(id => id === message.uuid)) {
      //   appendUuid = [];//重复uuid
      // }
      return {
        ...state,
        messages: {
          ...state.messages,
          [action.message.uuid]: action.message,
        },
        users: {
          ...state.users,
          [user_id]: {
            ...state.users[user_id],
            messageIds: [
              ...state.users[user_id].messageIds,
              appendUuid
            ],
            session: {
              ...state.users[user_id].session,
              lastMsg: message,
            }
          }
        },
      };

    //添加收到消息
    case  MESSAGE_RECEIVE:
      return addReceiveMessage(state,action.message);

    //新建会话
    case  SESSION_ADD:
      return {
        ...state,
        users: {
          ...state.users,
          [action.newUserId]: action.newSession,
        }
      };




    default:
      return state;
  }
}

/**
 * 添加一条收到的消息
 * @param state
 * @param receiveMessage
 * @return state
 */
function addReceiveMessage(state: any, receiveMessage: any) {
  const userId = receiveMessage.senderId;
  let appendUuid = receiveMessage.uuid;
  let unReadNum = state.users[userId].session.unRead + 1;
  if (state.users[userId].messageIds.some(item => item === receiveMessage.uuid)) {//判断是否已有重复消息
    receiveMessage.uuid = [];
  }
  if (state.activeUserId === receiveMessage.senderId) {//判断是否正在聊天中
    unReadNum = 0;
  }
  return {
    ...state,
    users: {
      ...state.users,
      [userId]: {
        ...state.users[userId],
        messageIds: [
          ...state.users[userId].messageIds,
          appendUuid
        ],
        session: {
          ...state.users[userId].session,
          lastMsg: receiveMessage,
          unRead: unReadNum,
        }
      },
    },
    messages: {
      ...state.messages,
      [receiveMessage.uuid]: receiveMessage,
    },
  };
}

export default session;