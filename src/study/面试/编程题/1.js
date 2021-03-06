// 输入一个正数S，打印出所有和为S的连续正数序列。

// 例如：输入15，有序1+2+3+4+5 = 4+5+6 = 7+8 = 15 所以打印出3个连续序列1-5，5-6和7-8。

// 思路
// 创建一个容器child，用于表示当前的子序列，初始元素为1,2

// 记录子序列的开头元素small和末尾元素big

// big向右移动子序列末尾增加一个数 small向右移动子序列开头减少一个数

// 当子序列的和大于目标值，small向右移动，子序列的和小于目标值，big向右移动

function FindContinuousSequence(sum) {
  const result = []
  const child = [1, 2]
  let big = 2
  let small = 1
  let currentSum = 3
  while (big < sum) {
    while (currentSum < sum && big < sum) {
      child.push(++big)
      currentSum += big
    }
    while (currentSum > sum && small < big) {
      child.shift()
      currentSum -= small++
    }
    if (currentSum === sum && child.length > 1) {
      result.push(child.slice())
      child.push(++big)
      currentSum += big
    }
  }
  return result
}

console.log(FindContinuousSequence(15))
