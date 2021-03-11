/**
 * 快速排序
 *
 * 时间复杂度：O(n^2)
 * 空间复杂度：O(logn)
 *
 * 稳定性：稳定
 *
 * 基本思想是：通过一趟排序将欲排序的数据分割成两部分，
 * 其中一部分数据比另一部分所有数据都要小。
 * 接着继续对这两部分数据进行快速排序。
 * 是分治思想的体现。
 */

function quickSort(arr) {
  if (arr.length < 2) {
    return arr // 返回原数组
  }
  const cIndex = Math.floor(arr.length / 2) // 向下取整
  const c = arr.splice(cIndex, 1) // 取得arr数组的中间数
  const l = []
  const r = []
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < c) {
      l.push(arr[i])
    } else {
      r.push(arr[i])
    }
  }
  // 此时完成cl数组r数组的排序
  // 再需完成l数组和r数组的排序
  // 最后连接它们即可
  return quickSort(l).concat(c, quickSort(r))
}

const arr = [
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  15,
  16,
  17,
  19,
  20,
  35,
  40,
  50,
  55,
  60,
  70,
  80,
  100
]

console.log(quickSort(arr))
