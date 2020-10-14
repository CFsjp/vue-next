## Vue3

#### Vue3性能提升：
  diff算法优化-静态标记添加
    + Vue2中的虚拟dom是进行全量的对比
    + Vue3新增了静态标记（PatchFlag）
      在于上次虚拟节点进行对比时候，只对比带有patchFlag的节点
      并且可以通过flag的信息得知当前节点要对比的具体内容
- hoistStatic静态提升
  + Vue2中无论元素是否参与更新，每次都会重新创建
  + Vue3中对于不参与更新的元素，只会被创建一次，之后在每次渲染时候被不停的调用
- cacheHandles 事件侦听器缓存
  + 默认情况下onClick会被视为动态绑定，所以每次都会去追踪它的变化
    但是因为是同一个函数，所以没有追踪变化，直接缓存起来复用即可
- ssr渲染
 + 当有大量静态的内容时候，这些内容会被当做纯字符串推进一个buffer里面，
 即便存在动态的绑定，会通过模板插值嵌入进去。这样会比通过虚拟dom来渲染的快上很多很多。
 + 当静态内容大到一定量级的时候，会用_createStaticVNode方法在客户端去生成一个static node，这些静态node，会被直接innerHtml，就不需要创建对象，然后根据对象渲染。

#### Vue3.0--快速上手

- toRaw方法
获取proxy对象的原始数据
应用场景：ref/reactive数据每次修改都会被追踪，都会更新UI界面，这样是非常消耗性能的，
如果我们有一些操作不需要追踪，不需要更新UI界面，那么这个时候使用toRaw，
可以拿到它的原始数据，弃用监听，不被追踪，可以提升性能

- shallowRef / shallowReactive
应用场景--一般情况下，使用ref和reactive即可，只有在需要监听的数据量比较大的时候，才使用shallowRef / shallowReactive

- markRow
使用markRow可以使对象数据永远不被监听，追踪

#### Vue3.0--Custom Renderer API