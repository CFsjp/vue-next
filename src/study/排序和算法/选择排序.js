/**
 * 选择排序
 *
 * 时间复杂度：O(n^2)
 * 空间复杂度：O(1)
 *
 * 稳定性：不稳定
 *
 * 基本思想是：先在待排序列表中找到最小（大）的元素，
 * 把它放在起始位置作为已排序序列；
 * 然后，再从剩余待排序序列中找到最小（大）的元素放在已排序序列的末尾，
 * 以此类推，直至完毕
 */

function selectSort(list) {
  const len = list.length
  for (let i = 0; i < len - 1; i++) {
    let indexMin = i
    for (let j = i; j < len; j++) {
      if (list[i] > list[j]) {
        indexMin = j
      }
    }
    if (i !== indexMin) {
      [list[i], list[indexMin]] = [list[indexMin], list[i]]
    }
  }
  return list
}

console.log(selectSort([1, 5, 4, 3, 2]))
