/**
 * new操作符
 *
 * new 到底干了什么？
 * 创建一个空的对象{}
 * 链接该对象到另一个对象
 * 将步骤1新创建的对象作为this的上下文
 * 如果该函数没有返回对象，则返回this
 */

// 1、new 用法是什么？
//   从构造函数创造一个实例对象，构造函数的this指向为创造的实例对象，
//   并且可以使用构造函数原型属性和方法

function Person(name, age) {
  this.name = name
  this.age = age
}
Person.prototype.say = function() {
  console.log(this.age)
}
const p1 = new Person('lihua', 18)
console.log(p1.name) // lihua
p1.say() // 18

// 2、怎么实现this指向改变？
//   call，apply

// 3、怎么实现构造函数原型属性和方法的使用
//   原型链 原型继承

function muNew(fn, ...args) {
  // 1、创造一个实例对象
  let obj = {}

  // 2、改变指向，完成继承
  obj.__proto__ = Object.create(fn.prototype)

  // 3、改变构造函数this指向为实例对象
  const result = fn.call(obj, ...args)

  // 4. 如果构造函数执行的结果返回的是一个对象或者函数，那么返回这个对象或函数
  if ((result && typeof result === 'object') || typeof result === 'function') {
    return result
  }

  // 不然直接返回boj
  return obj
}
function myBind(ctx, ...args) {
  if (typeof this !== 'function') {
    throw new TypeError('error')
  }

  const self = this
  let fn = function() {
    self.apply(this instanceof self ? this : self, args.concat([...arguments]))
  }
  fn = Object.create(this.prototype)
  return fn
}

function myCall(ctx, ...args) {
  if (typeof this !== 'function') {
    throw new TypeError('error')
  }
  const key = Symbol('key')
  ctx[key] = this
  const result = ctx[key](...args)
  delete ctx[key]
  return result
}

function myNuwe(fn, ...args) {
  if (typeof this !== 'function') {
    throw new TypeError('error')
  }
  const obj = Object.create(fn.prototype)
  const result = fn.apply(obj, args)
  if ((result && typeof result === 'object') || typeof result === 'function') {
    return result
  }
  return obj
}

// 测试一下
function Person(name, age) {
  this.name = name
  this.age = age
}
Person.prototype.say = function() {
  console.log(this.age)
}
let p1 = myNew(Person, 'lihua', 18)
console.log(p1.name)
console.log(p1)
p1.say()
