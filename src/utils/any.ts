export function deepClone(target: any) {
  // 深拷贝
  if (!target && typeof target !== 'object') {
    throw new Error('error arguments, shallowClone')
  }

  const result: any = target.constructor === Array ? [] : {}
  Object.keys(target).forEach((key) => {
    if (target[key] && typeof target[key] === 'object') {
      result[key] = deepClone(target[key])
    } else {
      result[key] = target[key]
    }
  })
  return result
}

// // 防抖and节流
// export function debounce(fn: Function, delay?: number) {
//   delay = delay || 500
//   let timer: number | null | undefined
//   return function() {
//     const ctx = this
//     if (timer) {
//       clearTimeout(timer)
//     }
//     timer = setTimeout(() => {
//       timer = null
//       fn.apply(ctx, arguments)
//     }, delay)
//   }
// }

// // 节流
// export function throttle(fn: Function, delay: number) {
//   delay = delay || 500
//   let canRun = true // 通过闭包保存一个标记
//   return function() {
//     const ctx = this
//     if (!canRun) return
//     canRun = false
//     setTimeout(() => {
//       fn.apply(ctx, arguments)
//       canRun = true
//     }, delay)
//   }
// }
