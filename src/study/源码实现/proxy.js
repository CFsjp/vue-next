// proxy 代理

// Vue3响应式基石

// const handle = {
//   get() {},
//   set() {},
//   has() {},
//   delect() {},
//   m() {
//     console.log(this === 'proxy')
//   }
// } // 处理方法
// const target = {
//   name: '牛翔',
//   age: '18',
//   love: '女'
// } // 目标函数

// const proxy = new Proxy(target, handle)
// 这个proxy就是代理后的对象，是基于target来的，处理的方法是handle

// 并且在proxy中，检验对象属性，获取对象数据一般都是用 Reflect
// 所以多看看 Reflect

// 一旦被代理后，this就指向了proxy，而不是target
// target.m() // false
// proxy.m() // true

// 有些原生对象的内部属性，只有通过正确的this才能拿到，所以 Proxy 也无法代理这些原生对象的属性。
// const target2 = new Date()
// let handler = {}
// const proxy2 = new Proxy(target2, handler)

// proxy2.getDate()
// TypeError: this is not a Date object. 报错

// 所以需要把handler代理的方法改写下
// handler = {
//   get(target, key) {
//     if (key === 'getDate') {
//       return target.getDate.bind(target)
//     }
//     return Reflect.get(target, key) // es6用来代替object的，它的好处在于，成功返回true，失败就false；不会像object一样去报错
//   }
// }

// 当然，如果你看vue3的响应式源码，还需要知道 WeekMap
// WeekMap是一种弱类型引用表，就是 { key: value }
// 这里的 key 是 objec t对象，专门用来建立关系连接的
// 虽然，Map也可以达到这个效果，但是Vue3响应式用它不用Map，就是因为Map会被内存机制回收掉

// const dinner = {
//   meal: 'tacos'
// }

// const handler = {
//   get(target, prop, receiver) {
//     return Reflect.get(...arguments)
//   }
// }

// const proxy = new Proxy(dinner, handler)
// console.log(proxy.meal)
