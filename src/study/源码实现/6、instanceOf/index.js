/**
 * instanceof
 */

// 1、instanceof 原理?
//   右侧对象的原型对象（prototype ）是否在左侧对象的原型链上面

// 2、怎么遍历左侧对象的原型链是关键点?
// while(true) 一直遍历 直到原型链的尽头 null 都没有相等就说明不存在 返回 false

function myInstanceof(left, right) {
  let leftProp = left.__proto__
  const rightProp = right.prototype
  // 一直会执行循环  直到函数return
  while (true) {
    // 遍历到了原型链最顶层
    if (leftProp === null) {
      return false
    }
    if (leftProp === rightProp) {
      return true
    } else {
      // 遍历赋值__proto__做对比
      leftProp = leftProp.__proto__
    }
  }
}
// 测试一下
const a = []
console.log(myInstanceof(a, Array))
