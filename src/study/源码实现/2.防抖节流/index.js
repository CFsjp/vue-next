/**
 * 防抖、节流 源码实现
 * @url https://juejin.cn/post/6844904153437700103#heading-1
 */

// 1、防抖和节流的区别
//   防抖是N秒内函数只会被执行一次，如果N秒内再次被触发，则重新计算延迟时间
//   （极端：如果window滚动时间添加了防抖2s执行一次，如果你不停的滚动，永远不停下，那么这个
//   回调函数就永远无法执行）

//   节流是规定一个单位时间，在这个单位时间内最多只能触发一次函数执行（还是滚动事件，如果你一直
//   不停的滚动，那么2s就会执行一次回调）

// 2、防抖怎么实现
//   时间延迟执行 并且在规定时间内再次触发需要清除，这个很容易就想到了 setTimeout

// 3、节流怎么实现
//   在单位时间内触发了一次就不在生效了，可以用一个flag来控制

// 防抖源码
export function debounce(fn, delay = 1000) {
  // 默认 300毫秒
  let timer
  return function() {
    const args = arguments

    if (timer) {
      clearTimeout(timer)
    }

    timer = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  }
}

// window.addEventListener(
//   'scroll',
//   debance(() => {
//     console.log(111)
//   }, 1000)
// )

// 节流源码
export function throttle(fn, delay = 2000) {
  let flag = true

  return () => {
    if (!flag) return

    flag = false

    setTimeout(() => {
      fn()
      flag = true
    }, delay)
  }
}

// window.addEventListener(
//   'scroll',
//   throttle(() => {
//     console.log(111)
//   }, 1000)
// )
