/**
 * 封装消息提示
 * @message 消息的具体内容
 * @duration 关闭时间
 * 如果有别的设置，则在以后具体添加
 */
import { Notification } from 'element-ui'

export function useMsg() {
  function notifyInfo(message, duration = '3000') {
    Notification.info({
      title: '提示',
      message,
      duration
    })
  }

  return { notifyInfo }
}
