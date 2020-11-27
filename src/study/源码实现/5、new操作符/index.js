/**
 * new操作符
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
  obj = Object.create(fn.prototype)

  // 3、改变构造函数this指向为实例对象
  const result = fn.call(obj, ...args)

  // 4. 如果构造函数执行的结果返回的是一个对象或者函数，那么返回这个对象或函数
  if ((result && typeof result === 'object') || typeof result === 'function') {
    return result
  }

  // 不然直接返回boj
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
