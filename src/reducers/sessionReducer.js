import {LOGGED_IN, LOGOUT} from "../actions/user";
import {MESSAGE_MORE, SESSION_CHANGE, SESSION_RESET} from "../actions/session";

const initialState={
  activeUserId: -1,//正在聊天的对象
  users: {
    // 1:{
    //   session:{
    //     user:{},
    //     lastMsg:{},
    //     lastChatTime:'',
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
        activeUserId:action.userId
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
              ...state.users[action.appendId].messageIds,
              ...newIds,
            ]
          }
        }
      };




    default:
      return state;
  }
}

export default session;