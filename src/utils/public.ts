/**
 * 公共方法函数库
 *
 * @function deepClone 深拷贝
 * @param target 目标参数
 *
 *
 * @function debounce 防抖
 * @param fn 目标方法
 * @param delay 延迟时间
 *
 *
 * @function throttle 节流
 * @param fn 目标方法
 * @param delay 延迟时间
 */

export function deepClone(target: any) {
  // 深拷贝
  if (!target && typeof target !== 'object') {
    throw new Error('error arguments, shallowClone')
  }

  const result: any = target.constructor === Array ? [] : {}
  Object.keys(target).forEach(key => {
    if (target[key] && typeof target[key] === 'object') {
      result[key] = deepClone(target[key])
    } else {
      result[key] = target[key]
    }
  })
  return result
}

// 防抖and节流
export function debounce(fn: Function, delay: number = 500) {
  let timer: number | null | undefined
  return function(this: any, ...args: any) {
    const ctx = this // 改变this指向为调用debounce所指的对象
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      timer = null
      fn.apply(ctx, args)
    }, delay)
  }
}

// 节流
export function throttle(fn: Function, delay: number = 1000) {
  let canRun = true // 通过闭包保存一个标记
  return function(this: any, ...args: any) {
    const ctx = this
    if (!canRun) return
    canRun = false
    setTimeout(() => {
      fn.apply(ctx, args)
      canRun = true
    }, delay)
  }
}
