/**
 * 希尔排序
 *
 * 时间复杂度：O(n^2)
 * 空间复杂度：O(1)
 *
 * 稳定性：稳定
 *
 * 基本思想是：先类似归并排序，先排序一部分数组，
 * 而后使用选择排序，
 * 主要是先排序了一部分数组，从而使得排序性能提升
 */

function sheelSort(array) {
  const N = array.length
  let h = 1
  while (h < N / 3) {
    // 设置h
    h = 3 * h + 1
  }
  while (h >= 1) {
    // 使数组变为h有序
    for (let i = h; i < N; i++) {
      // 将array[i]插入到array[i-h],array[i- 2*h],array[i - 3*h]
      for (let j = i; j >= h && this.less(array[j], array[j - h]); j -= h) {
        this.exch(array, j, j - h)
      }
    }
    h = Math.floor(h / 3)
  }
}

console.log(sheelSort([1, 5, 4, 3, 2]))
