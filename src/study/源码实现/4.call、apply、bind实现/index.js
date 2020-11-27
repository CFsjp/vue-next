/**
 * call、apply、bind源码实现
 */

// eslint-disable-next-line no-extend-native
Function.prototype.myCall = function(context, ...args) {
  if (!context || context === null) {
    context = window
  }
  // 创造唯一的key值  作为我们构造的context内部方法名
  const key = Symbol()
  context[key] = this // this指向调用call的函数
  // 执行函数并返回结果 相当于把自身作为传入的context的方法进行调用了
  return context[key](...args)
}

// apply原理一致  只是第二个参数是传入的数组
// eslint-disable-next-line no-extend-native
Function.prototype.myApply = function(context, args) {
  if (!context || context === null) {
    context = window
  }
  // 创造唯一的key值  作为我们构造的context内部方法名
  const key = Symbol()
  context[key] = this
  // 执行函数并返回结果
  return context[key](...args)
}

// 测试一下 call 和 apply
const obj = {
  a: 1
}
function fn(name, age) {
  console.log(this.a)
  console.log(name)
  console.log(age)
}
fn.myCall(obj, '我是lihua', '18')
fn.myApply(obj, ['我是lihua', '18'])
const newFn = fn.myBind(obj, '我是lihua', '18')
newFn()

// bind实现要复杂一点  因为他考虑的情况比较多 还要涉及到参数合并(类似函数柯里化)

Function.prototype.myBind = function(context, ...args) {
  if (!context || context === null) {
    context = window
  }
  // 创造唯一的key值  作为我们构造的context内部方法名
  const fn = Symbol()
  context[fn] = this
  const _this = this
  //  bind情况要复杂一点
  const result = function(...innerArgs) {
    // 第一种情况 :若是将 bind 绑定之后的函数当作构造函数，通过 new 操作符使用，则不绑定传入的 this，而是将 this 指向实例化出来的对象
    // 此时由于new操作符作用  this指向result实例对象  而result又继承自传入的_this 根据原型链知识可得出以下结论
    // this.__proto__ === result.prototype   //this instanceof result =>true
    // this.__proto__.__proto__ === result.prototype.__proto__ === _this.prototype; //this instanceof _this =>true
    if (this instanceof _this === true) {
      // 此时this指向指向result的实例  这时候不需要改变this指向
      this[fn] = _this
      this[fn](...[...args, ...innerArgs]) // 这里使用es6的方法让bind支持参数合并
      delete this[fn]
    } else {
      // 如果只是作为普通函数调用  那就很简单了 直接改变this指向为传入的context
      context[fn](...[...args, ...innerArgs])
      delete context[fn]
    }
  }
  // 如果绑定的是构造函数 那么需要继承构造函数原型属性和方法
  // 实现继承的方式一:  构造一个中间函数来实现继承
  // let noFun = function () { }
  // noFun.prototype = this.prototype
  // result.prototype = new noFun()
  // 实现继承的方式二: 使用Object.create
  result.prototype = Object.create(this.prototype)
  return result
}
// 测试一下

function Person(name, age) {
  console.log(name) // '我是参数传进来的name'
  console.log(age) // '我是参数传进来的age'
  console.log(this) // 构造函数this指向实例对象
}
// 构造函数原型的方法
Person.prototype.say = function() {
  console.log(123)
}
const obj1 = {
  objName: '我是obj1传进来的name',
  objAge: '我是obj1传进来的age'
}
// 普通函数
function normalFun(name, age) {
  console.log(name) // '我是参数传进来的name'
  console.log(age) // '我是参数传进来的age'
  console.log(this) // 普通函数this指向绑定bind的第一个参数 也就是例子中的obj
  console.log(this.objName) // '我是obj传进来的name'
  console.log(this.objAge) // '我是obj传进来的age'
}

// 先测试作为构造函数调用
// let bindFun = Person.myBind(obj, '我是参数传进来的name')
// let a = new bindFun('我是参数传进来的age')
// a.say() //123

// 再测试作为普通函数调用
const bindFun = normalFun.myBind(obj1, '我是参数传进来的name')
bindFun('我是参数传进来的age')
