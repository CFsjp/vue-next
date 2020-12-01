class UsePromise {
  constructor(fn) {
    this.state = 'pending'
    this.successFn = []
    this.failFn = []

    const resolve = val => {
      if (this.state !== 'pending') return
      this.state = 'success'
      setTimeout(() => {
        this.successFn.forEach(item => item.call(this, val))
      })
    }

    const reject = err => {
      if (this.state !== 'pending') return
      this.state = 'fail'
      setTimeout(() => {
        this.failFn.forEach(item => item.call(this, err))
      })
    }

    try {
      fn(resolve, reject)
    } catch (error) {
      reject(error)
    }
  }

  then(resolveCallback, rejectCallback) {
    resolveCallback =
      typeof resolveCallback === 'function' ? resolveCallback : data => data
    rejectCallback =
      typeof rejectCallback === 'function'
        ? rejectCallback
        : error => {
          throw error
        }

    // 保持链式调用，继续返回promise对象
    return new UsePromise((resolve, reject) => {
      this.successFn.push(val => {
        try {
          const x = resolveCallback(val)
          x instanceof UsePromise ? x.then(resolve, reject) : resolve(x)
        } catch (error) {
          reject(error)
        }
      })

      this.failFn.push(val => {
        try {
          const x = rejectCallback(val)
          x instanceof UsePromise ? x.then(resolve, reject) : reject(x)
        } catch (error) {
          reject(error)
        }
      })
    })
  }

  // all、race、any等方法后续添加
}
