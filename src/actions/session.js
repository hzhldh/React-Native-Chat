export const SESSION_RESET = "session/SESSION_RESET";
export const SESSION_CHANGE = "session/SESSION_CHANGE";
export const SESSION_ADD = "session/SESSION_ADD";
export const SESSION_CLOSE = "session/SESSION_CLOSE";

export const MESSAGE_MORE = "session/MESSAGE_MORE";
export const MESSAGE_SEND = "session/MESSAGE_SEND";
export const MESSAGE_RECEIVE = "session/MESSAGE_RECEIVE";
export const MESSAGE_UPDATE = "session/MESSAGE_UPDATE";

/**
 * 初始化会话列表
 */
export function loadSession(sessions: any) {
  return {
    type: SESSION_RESET,
    sessions
  }
}

/**
 * 修改当前会话用户
 */
export function changeActiveUser(chatUser: any) {
  //判断是否需要新建会话（联系房东等入口）
  return (dispatch: any, getState: any) => {
    if (!getState().session.users[chatUser.id]) {//需要创建会话
      dispatch(addSession(chatUser));//创建会话
    }
    dispatch(setActiveUser(chatUser.id));
  };
}

/**
 * 设置当前活跃用户
 */
export function setActiveUser(userId: any) {
  return {
    type: SESSION_CHANGE,
    userId
  }
}

/**
 * 关闭会话
 */
export function closeSession() {
  return {
    type: SESSION_CLOSE
  }
}

/**
 * 新增会话
 */
export function addSession(chatUser: any) {
  let newSession = {
    session: {
      chatUser: chatUser,
      lastMsg: {createTime: new Date().getTime()},
      unRead: 0,
    },
    messageIds: []
  };
  let newUserId = chatUser.id;
  return {
    type: SESSION_ADD,
    newSession,
    newUserId
  }
}


/**
 * 加载更多消息
 */
export function loadMoreMessage(messages: any, appendId: number) {
  return {
    type: MESSAGE_MORE,
    messages,
    appendId
  }
}


/**
 * 发送消息
 */
export function sendMessage(message: any) {
  return {
    type: MESSAGE_SEND,
    message
  }
}

/**
 * 新增一条收到的消息
 */
export function addReceiveMessage(message: any) {
  return {
    type: MESSAGE_RECEIVE,
    message
  }
}


/**
 * 更改消息的发送状态
 */
export function changeMessageStatus(message: any) {
  return {
    type: MESSAGE_UPDATE,
    message
  }
}



