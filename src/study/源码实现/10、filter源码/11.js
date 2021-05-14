// 看看有没有回退版本

function debounce(fn, wait) {
  let timer = null
  return (...args) => {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, wait)
  }
}

function throttle(fn, wait) {
  let flag = true
  return (...args) => {
    if (flag) return
    flag = false
    setTimeout(() => {
      fn.apply(this, args)
    }, wait)
  }
}

function deepClone(target) {
  if (typeof target !== 'object' && target) return target
  const obj = Array.isArray(target) ? [] : {}
  for (const key in target) {
    if (typeof target[key] === 'object' && target[key]) {
      obj[key] = deepClone(target[key])
    } else {
      obj[key] = target[key]
    }
  }
}
