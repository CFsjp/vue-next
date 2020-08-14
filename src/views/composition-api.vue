<template>
  <div>
    <h1>{{ state.count }} * 2= {{ double }}</h1>
    <h2>{{ num }}</h2>
    <button @click="add">累加</button>
  </div>
</template>

<script lang="ts">
import { reactive, computed, ref, onMounted } from "@vue/composition-api";

/**
 * setup composition的入口，在beforeCreate和created中间调用，函数返回的内容会作为模板渲染的上下文
 * reactive 负责声明响应式复杂数据结构
 * ref 声明基本的响应式的数据结构
 *
 * composition api 可以有效的避免上下反复横跳和mixin数据来源不清晰的问题
 */
export default {
  setup() {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    const { state, double } = useCounter(1, 0);
    const num = ref(2);
    function add() {
      state.count++;
      num.value += 10;
    }
    onMounted(() => {
      console.log("mouted");
    });
    return { state, add, double, num };
  }
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function useCounter(count: number, n: unknown) {
  const state = reactive({
    count
  });
  const double = computed(() => state.count * 2);
  return { state, double };
}
</script>
