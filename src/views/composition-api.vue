<template>
  <div>
    <h1>{{ state.count }} * 2= {{ double }}</h1>
    <h2>{{ num }}</h2>
    <button @click="add">累加</button>
  </div>
</template>

<script lang="ts">
import { ref, onMounted } from '@vue/composition-api'
import { useCounter } from './api/useCounter'
/**
 * setup composition的入口，在beforeCreate和created中间调用，函数返回的内容会作为模板渲染的上下文
 * reactive 负责声明响应式复杂数据结构
 * ref 声明基本的响应式的数据结构
 *
 * composition api 可以有效的避免上下反复横跳和mixin数据来源不清晰的问题
 */
export default {
  // props是响应式的，解构会使响应式断开
  // context是普通js对象，不是响应式可以使用解构
  setup(
    props,
    { root, parent, refs, attrs, listeners, isServer, ssrContext, emit }
  ) {
    const { state, double } = useCounter(1, 0)
    const num = ref(2)
    function add() {
      state.count++
      num.value += 10
    }
    onMounted(() => {
      console.log('mouted')
    })
    return { state, add, double, num }
  }
}
</script>
