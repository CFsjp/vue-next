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
 * 
 * @function errorCaptured 优雅的处理 async/await
 * @param asyncFunc 回调函数
 * 
 * @function thousandth 千分符
 * @param num 传入的数字
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

// 防抖
export function debounce(fn: Function, delay: number = 1000) {
  let timer: number | null | undefined
  return function (this: any, ...args: any) {
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
  return function (this: any, ...args: any) {
    const ctx = this
    if (!canRun) return
    canRun = false
    setTimeout(() => {
      fn.apply(ctx, args)
      canRun = true
    }, delay)
  }
}

// 防抖节流综合版
// fn是我们需要包装的事件回调, delay是时间间隔的阈值
export function throttle2(fn: Function, delay: number = 1000) {
  let last = 0
  let timer: number | undefined

  return function (this: any, ...args: any) {
    const ctx = this
    let now = +new Date()

    if (now - last < delay) {
      clearTimeout(timer)
      timer = setTimeout(function () {
        last = now
        fn.apply(ctx, args)
      }, delay)
    } else {
      last = now
      fn.apply(ctx, args)
    }
  }
}

// 优雅的处理 async/await
export async function errorCaptured(asyncFunc: () => any) {
  try {
    let res = await asyncFunc()
    return [null, res]
  } catch (e) {
    return [e, null]
  }
}

// 数字的千分符方法 1000 => 1,000
export const thousandth = (num: number | string) => {
  if (typeof num === 'number') {
    return num.toLocaleString()
  } else if (typeof num === 'string') {
    const reg = /\d(?=(?:\d{3})+(?:\.\d+|$))/g;
    return num.replace(reg, '$&,')
  } else {
    throw TypeError('期待输入的是一个number或者string类型的数字')
  }
}