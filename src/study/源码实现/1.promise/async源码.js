// async 的内部原理
// async就是Generator的语法糖，相当于一个自动执行的Generator

const { resolve, reject } = require('core-js/fn/promise')

// async代替*，await代替yield
function co(it) {
  // 自动执行器
  return new Promise((resolve, reject) => {
    function next(data) {
      try {
        const { value, done } = it.next(data)
      } catch (e) {
        return reject(e)
      }
      if (!done) {
        // done为true,表示迭代完成
        // value 不一定是 Promise，可能是一个普通值。使用 Promise.resolve 进行包装。
        Promise.resolve(value).then(val => {
          next(val)
        }, reject)
      } else {
        resolve(value)
      }
    }
    next()
  })
}

function* gen() {
  yield new Promise((resolve, reject) => {
    setTimeout(resolve, 100)
  })
  yield new Promise((resolve, reject) => {
    resolve(10)
  })
  yield 10
  return 1000
}

co(gen())
  .then(data => {
    console.log(data)
  })
  .catch(err => {
    console.log(err)
  })
