/**
 * 发布者订阅者模式--EventEmitter
 */

// 1、什么是发布者订阅者模式
//   发布-订阅模式其实是一种对象间一对多的依赖关系，
//   当一个对象的状态发生改变时，所有依赖于它的对象都将得到状态改变的通知

// 2、怎么实现一对多
//   既然一对多，肯定有一个事件调度中心用来调度事件；
//   订阅者可以注册事件(on)到事件中心，发布者可以发布事件(emit)到调度中心
//   订阅者也可以取消订阅(off)或者只订阅一次(once)

// 手写发布订阅模式 EventEmitter
class EventEmitter {
  constructor() {
    this.events = {} // 事件中心
  }

  // 实现订阅
  on(type, callBack) {
    if (!this.events) {
      this.events = Object.create(null) // 保证原型链没有继承其他东西
    }

    if (!this.events[type]) {
      this.events[type] = [callBack]
    } else {
      this.events[type].push(callBack)
    }
  }

  // 删除订阅
  off(type, callBack) {
    if (!this.events[type]) return

    this.events[type] = this.events[type].filter(item => {
      return item !== callBack
    })
  }

  // 只执行一次订阅事件
  once(type, callBack) {
    // 原来的方法不动，新写一个把原来的包装起来成一个方法，
    // 调用一次后，删除自己
    const fn = () => {
      callBack()
      this.off(type, fn)
    }

    this.on(type, fn)
  }

  // 触发事件
  emit(type, ...rest) {
    this.events[type] && this.events[type].forEach(fn => fn.apply(this, rest))
  }
}

// 使用如下
const event = new EventEmitter()

const handle = (...rest) => {
  console.log(rest)
}

event.on('click', handle)
event.emit('click', 1, 2, 3, 4, 5)
event.off('click', handle)
event.emit('click', 1, 2)

event.once('dbClick', () => {
  console.log(123456)
})
event.emit('dbClick')
event.emit('dbClick')
