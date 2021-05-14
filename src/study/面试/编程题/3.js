// 取出数组中的所有子数组

const arr = [1, 2, 3, 4, 5, 6]

function fn(array) {
  const res = [[]]
  for (let i = 0; i < nums.length; i++) {
    const t = []
    for (let j = 0; j < res.length; j++) {
      // t.push([...res[j], nums[i]]);
      // 组合res[j]中的数据和num[i]
      t.push([...res[j], num[i]])
    }

    res.push(...t)
  }
  return res
}
