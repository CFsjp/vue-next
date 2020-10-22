<template>
  <div>
    <h1>{{ count }}</h1>
    <el-button @click="changeCount(1)">
      +
    </el-button>
    <el-button @click="changeCount(-1)">
      -
    </el-button>
  </div>
</template>

<script>
import { ref, watch } from '@vue/composition-api'

export default {
  setup(props, { root }) {
    const count = ref(root.$store.state.count)
    const { changeCount } = useVuex(root)

    watch(
      () => root.$store.state.count,
      (newVal) => {
        count.value = newVal
      }
    )

    return { count, changeCount }
  }
}
function useVuex(root) {
  function changeCount(num) {
    root.$store.dispatch('asyncCount', num)
  }

  return { changeCount }
}
</script>

<style lang="scss" scoped></style>
