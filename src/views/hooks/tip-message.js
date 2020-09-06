/**
 * 封装消息提示
 * @message 消息的具体内容
 * @duration 关闭时间
 * 如果有别的设置，则在以后具体添加
 */
import { Message, Notification } from 'element-ui'

export function useMsg() {
  function notifyMsg(message, type = 'info', title = '', duration = '3000') {
    Notification({
      type,
      title,
      message,
      duration
    })
  }

  function tipMsg(message, type = 'info', title = '', duration = '3000') {
    Message({
      type,
      title,
      message,
      duration
    })
  }

  return { notifyMsg, tipMsg }
}
