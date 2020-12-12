/**
 * instanceof
 */

// 1、instanceof 原理?
//   右侧对象的原型对象（prototype ）是否在左侧对象的原型链上面

// 2、怎么遍历左侧对象的原型链是关键点?
// while(true) 一直遍历 直到原型链的尽头 null 都没有相等就说明不存在 返回 false

function myInstanceof(left, right) {
  if (typeof left !== 'object' || left === null) return false
  // getPrototypeOf 是 Object 对象自带的一个方法，能够拿到参数的原型对象
  let proto = Object.getPrototypeOf(left)

  while (true) {
    // 查到尽头，还没找到
    if (proto === null) return false

    // 找到相同的原型对象
    if (proto === right.prototype) return true
    proto = Object.getPrototypeOf(left)
  }
}
// 测试一下
const a = [1, 2, 3, 4]
console.log(myInstanceof(a, Array))
