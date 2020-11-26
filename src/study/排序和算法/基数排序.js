/**
 * 基数排序
 *
 * 时间复杂度：O(n*log(n))
 * 空间复杂度：O(1)
 *
 * 稳定性：稳定
 *
 * 基本思想是：分布式排序算法，它根据数字的有效位或基数将整数分布到桶中，
 * 基数是基于数组中值的记数制的。
 *
 * 归并排序的核心是分治思想和递归实现
 */

const radixSort = (array, max) => {
  console.time('计数排序耗时')
  const buckets = []
  let unit = 10
  let base = 1
  for (let i = 0; i < max; i++, base *= 10, unit *= 10) {
    for (let j = 0; j < array.length; j++) {
      const index = ~~((array[j] % unit) / base) // 依次过滤出个位，十位等等数字
      if (buckets[index] === null) {
        buckets[index] = [] // 初始化桶
      }
      buckets[index].push(array[j]) // 往不同桶里添加数据
    }
    let pos = 0
    let value
    for (let j = 0, length = buckets.length; j < length; j++) {
      if (buckets[j] !== null) {
        while ((value = buckets[j].shift()) !== null) {
          array[pos++] = value // 将不同桶里数据挨个捞出来，为下一轮高位排序做准备，由于靠近桶底的元素排名靠前，因此从桶底先捞
        }
      }
    }
  }
  console.timeEnd('计数排序耗时')
  return array
}
