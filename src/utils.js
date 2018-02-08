/**
 *  聊天生成时间标签
 * @param timestamp
 */
export function genTimeTag(timestamp) {
  const nowDate = new Date();
  const timeDate = new Date(timestamp);
  const hMTag = addZero(timeDate.getHours())
    + ":"
    + addZero(timeDate.getMinutes());
  const mdTag = addZero(timeDate.getMonth() + 1)
    + "-"
    + addZero(timeDate.getDate());
  if (nowDate.getFullYear() == timeDate.getFullYear()) {
    //同一年
    if (nowDate.getMonth() == timeDate.getMonth() && nowDate.getDate() == timeDate.getDate()) {
      //同一天
      return hMTag;
    } else {
      return mdTag + " " + hMTag;
    }
  }
  return timeDate.getFullYear() + "-" + mdTag + " " + hMTag;
}

function addZero(num) {
  if (num < 10) return "0" + num;
  return num;
}
