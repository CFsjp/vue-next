// 计算几个月后的时间
export function useFutureTime(num) {
  const timestamp = new Date().getTime()
  const len = timestamp.toString().length

  let date = new Date(timestamp)
  if (len === 10) {
    date = date * 1000
  }

  const D =
    date
      .getDate()
      .toString()
      .padStart(2, '0') + ' '
  const h =
    date
      .getHours()
      .toString()
      .padStart(2, '0') + ':'
  const m =
    date
      .getMinutes()
      .toString()
      .padStart(2, '0') + ':'
  const s = date
    .getSeconds()
    .toString()
    .padStart(2, '0')
  let Y = date.getFullYear()
  let M = date.getMonth() + 1

  M += num
  if (M > 12) {
    Y = parseInt(M / 12) + Y
    M = M % 12
  }
  M = M.toString().padStart(2, '0') + '-'
  Y += '-'
  const time = Y + M + D + h + m + s
  return { time }
}
