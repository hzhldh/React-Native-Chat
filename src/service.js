import axios from 'axios';
export const CHAT_API_URL="http://192.168.1.176:8080";
export const SOCKET_SERVER_URL="http://192.168.1.176:8080";


/**
 * 模拟登录
 */
export async function userLogin(nickname) {
  let resp =
    await axios.post(`${CHAT_API_URL}/user/login?nickname=${nickname}`);
  return resp ? resp.data : null;
}

/**
 * 获取用户的会话
 */
export async function getRecentSessions(userId) {
  let resp = await axios.get(`${CHAT_API_URL}/session/recent?userId=${userId}`);
  return resp ? resp.data : null;
}

/**
 * 获取聊天记录
 * @param userId  用户的Id
 * @param receiverId  消息接收人ID
 * @param timeTag 查询的最大的时间戳
 * @param limit  查询的消息记录条数
 * @return {Promise.<void>}
 */
export async function getChatMessages(userId, receiverId, timeTag, limit) {
  let resp =
    await axios.get(`${CHAT_API_URL}/message/history?senderId=${userId}&receiverId=${receiverId}&limit=${limit}&max_ts=${timeTag}`);
  return resp ? resp.data : null;
}


/**
 * 将消息设为已读
 * @param userId
 * @param otherUserId
 * @return {Promise.<Array>}
 */
export async function readMessages(userId, otherUserId) {
  await axios.post(`${CHAT_API_URL}/message/read?receiverId=${userId}&senderId=${otherUserId}`);
}

/**
 * 获取离线消息
 * @param userId  用户的Id
 * @param timeTag
 * @return {Promise.<void>}
 */
export async function getOfflineMessages(userId, timeTag) {
  let resp =
    await axios.get(`${CHAT_API_URL}/message/offline?userId=${userId}&min_ts=${timeTag}`);
  return resp ? resp : null;
}

/**
 * 删除用户会话
 * @param userId  当前用户的Id
 * @param otherId 删除用户的Id
 * @return {Promise.<void>}
 */
export  async function deleteUserSession(userId: number, otherId: number){
  await axios.post(CHAT_API_URL + `/session/delete?userId=${userId}&otherId=${otherId}`);
}