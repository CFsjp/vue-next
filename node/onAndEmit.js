const event = {
  list: {},
  on(key, fn) {
    if (!this.list[key]) {
      this.list[key] = []
    }
    this.list[key].push(fn)
  },
  emit() {
    const key = [].shift.call(arguments)
    const fns = this.list[key]

    if (!fns || fns.length === 0) {
      return false
    }
    fns.forEach((fn) => {
      fn.apply(this, arguments)
    })
  },
  remove(key, fn) {
    // 这回我们加入了取消订阅的方法
    const fns = this.list[key]
    // 如果缓存列表中没有函数，返回false
    if (!fns) return false
    // 如果没有传对应函数的话
    // 就会将key值对应缓存列表中的函数都清空掉
    if (!fn) {
      fns && (fns.length = 0)
    } else {
      // 遍历缓存列表，看看传入的fn与哪个函数相同
      // 如果相同就直接从缓存列表中删掉即可
      fns.forEach((cb, i) => {
        if (cb === fn) {
          fns.splice(i, 1)
        }
      })
    }
  }
}

function cat() {
  console.log('一起喵喵喵')
}
function dog() {
  console.log('一起旺旺旺')
}

event.on('pet', (data) => {
  console.log('接收数据')
  console.log(data)
})
event.on('pet', cat)
event.on('pet', dog)
// 取消dog方法的订阅
event.remove('pet', dog)
// 发布
event.emit('pet', ['二哈', '波斯猫'])
/*
  接收数据
  [ '二哈', '波斯猫' ]
  一起喵喵喵
*/
