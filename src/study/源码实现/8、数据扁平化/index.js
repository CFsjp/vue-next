/**
 * 实现数组扁平化的方法
 * arr = [1, [2, [3, [4, 5]]], 6]
 * => [1, 2, 3, 4, 5, 6]
 */

const arr = [1, [2, [3, [4, 5]]], 6]

// 1、使用ES6的flat()
const res1 = arr.flat(Infinity)

// 2、利用正则
const res2 = JSON.parse('[' + JSON.stringify(arr).replace(/\[|\]/g, '') + ']')

// 3、使用reduce()
const flatten = arr => {
  return arr.reduce((pre, cur) => {
    return pre.concat(Array.isArray(cur) ? flatten(cur) : cur)
  }, [])
}
const res3 = flatten(arr)

// 4、递归
const res4 = []
const fn = list => {
  for (let i = 0; i < list.length; i++) {
    const item = list[i]
    if (Array.isArray(item)) {
      fn(item)
    } else {
      res4.push(item)
    }
  }
}
fn(arr)
