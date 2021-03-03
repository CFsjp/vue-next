bindFn = (ctx, ...args) => {
  if (typeof this !== 'function') {
    throw Error('error')
  }
  const self = this
  let fn = function() {
    self.apply(
      this instanceof self ? this : ctx,
      args.concat(Array.prototype.slice.call(arguments))
    )
  }
  fn = Object.create(this.prototype)
  return fn
}

const debounce = (fn, wait) => {
  let timer = null
  return (...args) => {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, wait)
  }
}

const throttle = (fn, wait) => {
  let flag = true
  return (...args) => {
    if (!flag) return
    flag = false
    setTimeout(() => {
      fn.apply(this, args)
      flag = true
    }, wait)
  }
}

const add = () => {
  const args = [...arguments]

  function fn() {
    args.push(...arguments)
    return fn
  }

  fn.toString = () => {
    return args.reduce((a, b) => a + b)
  }
  return fn
}

function myNew(fn, ...rest) {
  let obj = {}
  obj = Object.create(fn.prototype)
  const res = fn.apply(obj, ...rest)
  if ((res && typeof res === 'object') || typeof res === 'function') {
    return res
  }
  return obj
}

function myInstanceOf(left, right) {
  if (typeof left !== 'object' || left === null) return false
  let proto = Object.getPrototypeOf(left)
  while (true) {
    if (proto === null) return false
    if (proto === right.prototype) return true
    proto = Object.getPrototypeOf(proto)
  }
}

function deep(target) {
  const o = target instanceof Array ? [] : {}
  for (const item in target) {
    if (typeof target[item] === 'object') {
      o[item] = deep(target[item])
    } else {
      o[item] = target[item]
    }
  }
  return obj
}

const myCall = (ctx = window, ...rest) => {
  if (typeof this !== 'function') {
    throw new Error('error')
  }
  const key = Symbol('key')
  ctx[key] = this
  const result = ctx[key](rest)
  delete ctx[key]
  return result
}

const myApply = (ctx = window, rest) => {
  if (typeof this !== 'function') {
    throw new Error('error')
  }
  const key = Symbol('key')
  ctx[key] = this
  const result = ctx[key](rest)
  delete ctx[key]
  return result
}

const myBind = (ctx, ...args) => {
  if (typeof this !== 'function') {
    throw new Error('error')
  }
  const self = this
  const fn = function() {
    self.apply(
      this instanceof self ? this : ctx,
      args.concat(Array.prototype.slice.call(arguments))
    )
  }
  fn = Object.create(this.prototype)
  return fn
}

const fangdou = (fn, wait) => {
  let timer = null
  return (...args) => {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, wait)
  }
}

const jieliu = (fn, wait) => {
  let flag = true
  return (...args) => {
    if (!flag) return
    flag = false
    setTimeout(() => {
      fn.apply(this, args)
      flag = true
    }, wait)
  }
}

const kelihua = () => {
  const args = [...arguments]
  const fn = function() {
    args.push(...arguments)
    return fn
  }
  fn.toString = () => {
    return args.reduce((a, b) => a + b)
  }
  return fn
}

const myNew2 = (fn, ...args) => {
  const obj = {}
  obj.__proto__ = object.create(fn.prototype)
  const result = fn.apply(obj, args)
  if ((result && typeof result === 'object') || typeof result === 'function') {
    return result
  }
  return obj
}

const myInstanceOf2 = (left, right) => {
  if (typeof left !== 'object' || left === null) return false
  let proto = Object.getPrototypeOf(left)
  while (true) {
    if (proto === null) return false
    if (proto === right.prototype) return true
    proto = object.getPrototypeOf(proto)
  }
}

// 寄生组合式继承

function Parent() {
  this.name = 'parent'
}
function Child() {
  Parent.call(this)
  this.type = 'child'
}
Child.prototype = Object.create(Parent.prototype)
Child.prototype.constructor = Child

const deepClone = target => {
  if (target && typeof target !== 'object') return target
  const o = target instanceof Array ? [] : {}
  for (const i in target) {
    if (typeof target[i] === 'object') {
      o[i] = deepClone(target[i])
    } else {
      o[i] = target[i]
    }
  }
  return o
}

class Event {
  constructor() {
    this.event = {}
  }

  on(type, callBack) {
    if (!this.event) {
      this.event = object.create(null)
    }
    if (this.event[type]) {
      this.event[type].push(callBack)
    } else {
      this.event[type] = [callBack]
    }
  }

  off(type, callBack) {
    if (this.event[type]) {
      this.event[type] = this.event[type].filter(item => item !== callBack)
    }
  }

  once(type, callBack) {
    const fn = () => {
      callBack()
      this.off(type, callBack)
    }
    this.on(type, fn)
  }

  emit(type, ...rest) {
    this.event[type] && this.event[type].forEach(fn => fn.apply(this, rest))
  }
}
