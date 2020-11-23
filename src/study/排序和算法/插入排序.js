/**
 * 插入排序
 *
 * 时间复杂度：O(n^2)
 * 空间复杂度：O(1)
 *
 * 稳定性：稳定
 *
 * 基本思想是：对于未排序元素，在已排序序列中从后向前扫描，
 * 找到相应位置把它插入进去；在从后向前扫描过程中，
 * 需要反复把已排序元素逐步向后挪位，为新元素提供插入空间
 */

function Insertion(arr) {
  const len = arr.length // 5
  let preIndex, current
  for (let i = 1; i < len; i++) {
    preIndex = i - 1
    current = arr[i]
    while (preIndex >= 0 && current < arr[preIndex]) {
      arr[preIndex + 1] = arr[preIndex]
      preIndex--
    }
    arr[preIndex + 1] = current
  }
  return arr
}

console.log(Insertion([1, 5, 4, 3, 2]))
