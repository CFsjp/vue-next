/**
 * call、apply、bind源码实现
 *
 * 相同点：都改变了this指向
 * 不同点：
 *    call立即调用，返回函数执行结果，this指向第一个参数，后面可有多个参数，并且这些都是fn函数的参数。
 *    apply立即调用，返回函数执行结果，this指向第一个参数，第二个参数是个参数数组。
 *    bind不会立即调用，而是返回一个绑定后的新函数，执行时可以继续传入参数，
 *  实现了函数的柯里化，提高了参数的复用
 *
 * 应用场景：
 *    需要立即调用使用call/apply
 * 要传递的参数不多，则可以使用fn.call(thisObj, arg1, arg2 ...)
 * 要传递的参数很多，则可以用数组将参数整理好调用fn.apply(thisObj, [arg1, arg2 ...])
 * 不需要立即执行，而是想生成一个新的函数长期绑定某个函数给某个对象使用，使用const newFn = fn.bind(thisObj); newFn(arg1, arg2...)
 */

Function.prototype.myCall = function(ctx = window, ...args) {
  const key = Symbol()
  ctx[key] = this // 指的是调用的对象
  const result = ctx[key](...args) // 调用后就删除，因为本来自己身上就没有这个属性
  delete ctx[key]
  return result
}

// apply 和 call 的不同就是 apply传入的是一个数组
Function.prototype.myApply = function(ctx = window, args) {
  const key = Symbol()
  ctx[key] = this // 指的是调用的对象
  const result = ctx[key](...args) // 调用后就删除，因为本来自己身上就没有这个属性
  delete ctx[key]
  return result
}

// 测试一下 call 和 apply
const obj = {
  a: 1
}
function fn(name, age) {
  console.log(this)
  console.log(name)
  console.log(age)
}
fn.myCall(obj, '我是lihua', '18')
fn.myApply(obj, ['我是lihua', '18'])
// const newFn = fn.myBind(obj, '我是lihua', '18')
// newFn()

Function.prototype.myBind = function(context, ...args) {
  if (typeof this !== 'function') {
    throw new Error('Function.prototype.bind - what is trying to be bound is not callable')
  }

  const self = this

  let fbound = function() {
    self.apply(this instanceof self
      ? this
      : context, args.concat(Array.prototype.slice.call(arguments)))
  }

  fbound = Object.create(this.prototype)

  return fbound
}
