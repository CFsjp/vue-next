/**
 * new操作符
 *
 * new 到底干了什么？
 * 创建一个空的对象{}
 * 链接该对象到另一个对象
 * 将步骤1新创建的对象作为this的上下文
 * 如果该函数没有返回对象，则返回this
 */

const myNew = (fn, ...args) => {
  let obj = {}
  obj = Object.create(fn.prototype)
  const result = fn.call(obj, ...args)
  if ((result && typeof result === 'object') || typeof result === 'function') {
    return result
  }
  return obj
}

function Person(name, age) {
  this.name = name
  this.age = age
}

const person1 = new Person('chengfeng', 18)
console.log('person1', person1)

const person2 = myNew(Person, 'chengfeng', 18)
console.log('person2', person2)
