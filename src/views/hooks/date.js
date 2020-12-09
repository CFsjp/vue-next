// 计算几个月（前）后的时间
export function useFutureTime(num) {
  const date = new Date()
  let year = date.getFullYear()
  let month = date.getMonth()

  month += num

  if (month > 12) {
    year += parseInt(month / 12)
    month = month % 12
    date.setFullYear(year)
  }
  date.setMonth(month)

  return date
}
