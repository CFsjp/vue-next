/**
 * 深拷贝
 */

// 1、什么是深拷贝?
// js 对引用类型的数据进行复制的时候，深拷贝不会拷贝引用类型的引用，而是将引用类型的值全部拷贝一份，形成一个新的引用类型，这样就不会发生引用错乱的问题，使得我们可以多次使用同样的数据，而不用担心数据之间会起冲突

// 2、怎么样才能全部拷贝?
// 递归遍历 直到数据类型不是引用类型才进行赋值操作

// 定义一个深拷贝函数  接收目标target参数
function deepClone(target) {
  // 定义一个变量
  let result
  // 如果当前需要深拷贝的是一个对象的话
  if (typeof target === 'object') {
    // 如果是一个数组的话
    if (Array.isArray(target)) {
      result = [] // 将result赋值为一个数组，并且执行遍历
      for (const i in target) {
        // 递归克隆数组中的每一项
        result.push(deepClone(target[i]))
      }
      // 判断如果当前的值是null的话；直接赋值为null
    } else if (target === null) {
      result = null
      // 判断如果当前的值是一个RegExp对象的话，直接赋值
    } else if (target.constructor === RegExp) {
      result = target
    } else {
      // 否则是普通对象，直接for in循环，递归赋值对象的所有值
      result = {}
      for (const i in target) {
        result[i] = deepClone(target[i])
      }
    }
    // 如果不是对象的话，就是基本数据类型，那么直接赋值
  } else {
    result = target
  }
  // 返回最终结果
  return result
}

// 扩展：利用JSON的方法实现简单的深拷贝
const targetObj = JSON.parse(JSON.stringify(sourceObj))

// 但是它有局限性：

//   ·不可以拷贝 undefined ， function， RegExp 等等类型的

//   ·会抛弃对象的 constructor，所有的构造函数会指向 Object

//   ·对象有循环引用，会报错
