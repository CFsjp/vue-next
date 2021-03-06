// 输入一个递增排序的数组和一个数字S，
// 在数组中查找两个数，使得他们的和正好是S，
// 如果有多对数字的和等于S，输出两个数的乘积最小的。

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9]
const sum = 10

function fn(array, sum) {
  const result = []
  array.forEach(item => {
    if (array.includes(sum - item)) {
      result.push(item * (sum - item))
    }
  })
  return result.reduce((a, b) => {
    if (a > b) {
      return b
    } else {
      return a
    }
  })
  // return result
}
console.log(fn(arr, sum))
