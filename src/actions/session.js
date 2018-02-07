export const SESSION_RESET = "session/SESSION_RESET";
export const SESSION_CHANGE = "session/SESSION_CHANGE";

export const MESSAGE_MORE = "session/MESSAGE_MORE";

/**
 * 初始化会话列表
 */
export function loadSession(sessions:any) {
  return {
    type: SESSION_RESET,
    sessions
  }
}

/**
 * 修改当前会话用户
 */
export function changeActiveUser(userId:number) {
  return {
    type: SESSION_CHANGE,
    userId
  }
}


/**
 * 加载更多消息
 */
export function loadMoreMessage(messages:any,appendId:number) {
  return {
    type: MESSAGE_MORE,
    messages,
    appendId
  }
}
