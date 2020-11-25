/**
 * 归并排序
 *
 * 时间复杂度：O(n*log(n))
 * 空间复杂度：O(1)
 *
 * 稳定性：稳定
 *
 * 基本思想是：将队列拆分为子队列直到不可分,再将已有序的子序列合并，
 * 得到完全有序的序列；即先使每个子序列有序，再使子序列段间有序
 *
 * 归并排序的核心是分治思想和递归实现
 */

function mergeSort(array) {
  if (array.length > 1) {
    const length = array.length
    const middle = Math.floor(length / 2)
    const left = mergeSort(array.slice(0, middle))
    const right = mergeSort(array.slice(middle, length))
    array = merge(left, right)
  }
  return array
}

function merge(left, right) {
  let i = 0
  let j = 0
  const result = []
  while (i < left.length && j < right.length) {
    result.push(left[i] < right[j] ? left[i++] : right[j++])
  }
  return result.concat(i < left.length ? left.slice(i) : right.slice(j))
}

console.log(mergeSort([1, 5, 4, 3, 2]))
