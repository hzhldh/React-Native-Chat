export const LOGGED_IN = "user/LOGGED_IN";//用户登录
export const LOGOUT = "user/LOGOUT";//退出登录

/**
 * 用户一登录
 */
export function loginSuccess(user:any) {
  return {
    type: LOGGED_IN,
    user
  }
}


/**
 * 注销登录
 */
export function logout() {
  return {
    type: LOGOUT,
  }
}