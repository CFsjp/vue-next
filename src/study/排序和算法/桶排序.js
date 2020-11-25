/**
 * 桶排序
 *
 * 时间复杂度：O(n)
 * 空间复杂度：O(1)
 *
 * 稳定性：稳定
 *
 * 基本思想是：将要排序的数据分到有限数量的几个有序的桶里，
 * 每个桶里的数据再单独进行排序（一般用插入排序或者快速排序），
 * 桶内排完序之后，再把每个桶里的数据按照顺序依次取出，组成的序列就是有序的了
 */

const bucketSort = (array, bucketSize) => {
  if (array.length < 2) {
    return array
  }
  console.time('桶排序耗时')
  const buckets = createBuckets(array, bucketSize)
  return sortBuckets(buckets)
}

// 创建桶，按余数存储不同的数据
const createBuckets = (array, bucketSize) => {
  let minValue = array[0]
  let maxValue = array[0]
  for (let i = 0; i < array.length; i++) {
    if (array[i] < minValue) {
      minValue = array[i] // 输入数据的最小值
    } else if (array[i] > maxValue) {
      maxValue = array[i] // 输入数据的最大值
    }
  }

  const defaultBucketSize = 5
  bucketSize = bucketSize || defaultBucketSize
  const bucketCount = Math.floor((maxValue - minValue) / bucketSize) + 1
  const buckets = new Array(bucketCount)
  for (i = 0; i < buckets.length; i++) {
    buckets[i] = []
  }

  // 这就按余数把数据存放在不同的桶中了
  for (i = 0; i < array.length; i++) {
    const bucketIndex = Math.floor((array[i] - minValue) / bucketSize)
    buckets[bucketIndex].push(array[i])
  }

  return buckets
}

// 利用快排排序
const sortBuckets = (buckets) => {
  const sortArray = []
  for (let i = 0; i < buckets.length; i++) {
    if (buckets[i] !== null) {
      sortArray.push(...quickSort(buckets[i]))
    }
  }
  console.timeEnd('桶排序耗时');
  return sortArray
}

function quickSort(arr) {
  if (arr.length === 0) {
    return [] // 返回空数组
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

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
  11, 12, 13, 15, 16, 17, 19, 20, 35, 40, 50, 55, 60, 70, 80, 100]

console.log(bucketSort(arr, 10))
