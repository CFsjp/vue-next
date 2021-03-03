/**
 * 数组去重的几种实现方式
 */

// 1、set去重
const arr = [1, 1, 1, 1, 2, 3]
const res1 = [...new Set(arr)]

// 2、两层for循环+splice
const unique1 = arr => {
  let len = arr.length
  for (let i = 0; i < len; i++) {
    for (let j = i + 1; j < len; j++) {
      if (arr[i] === arr[j]) {
        arr.splice(j, 1)
        // 每删除一个树，j--保证j的值经过自加后不变。同时，len--，减少循环次数提升性能
        len--
        j--
      }
    }
  }
  return arr
}

// 3、利用indexOf
const unique2 = arr => {
  const res = []
  for (let i = 0; i < arr.length; i++) {
    if (res.indexOf(arr[i]) === -1) res.push(arr[i])
  }
  return res
}

// 4、利用includes
const unique3 = arr => {
  const r = []
  for (let i = 0; i < arr.length; i++) {
    if (!r.includes(arr[i])) r.push(arr[i])
  }
  return r
}

// 5、利用filter
const unique4 = arr => {
  return arr.filter((item, index) => {
    return arr.indexOf(item) === index
  })
}

// 6、利用Map
const unique5 = arr => {
  const map = new Map()
  const res = []
  for (let i = 0; i < arr.length; i++) {
    if (!map.has(arr[i])) {
      map.set(arr[i], true)
      res.push(arr[i])
    }
  }
  return res
}
