/**
 * 冒泡排序
 *
 * 时间复杂度：O(n^2)
 * 空间复杂度：O(1)
 *
 * 稳定性：稳定；当判断条件改成 if(list[j] >= list[j + 1])，就不稳定了
 * 如果i=j，排序前i在j的前面，排序后i仍然在j的前面，
 * 即相等的两个数字的相对位置在排序前后不变，则该算法是稳定的
 */

function bubbleSort(list) { // 冒泡排序优化写法
  for (let i = 0; i < list.length; i++) {
    for (let j = 0; j < list.length - 1 - i; j++) {
      if (list[j] > list[j + 1]) {
        [list[j], list[j + 1]] = [list[j + 1], list[j]]
      }
    }
  }
  return list
}

console.log(bubbleSort([1, 5, 4, 3, 2]))
