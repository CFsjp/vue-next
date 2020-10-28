<template>
  <div>
    <h1>{{ count }}</h1>
    <el-button @click="changeCount(1)">
      +
    </el-button>
    <el-button @click="changeCount(-1)">
      -
    </el-button>
    <el-button @click="downExcel()">
      down
    </el-button>
    <a href="./favicon.ico">1111</a>
  </div>
</template>

<script>
import { ref, watch } from '@vue/composition-api'

export default {
  setup(props, { root }) {
    const count = ref(root.$store.state.count)
    const { changeCount, downExcel } = useVuex(root)

    watch(
      () => root.$store.state.count,
      (newVal) => {
        count.value = newVal
      }
    )

    return { count, changeCount, downExcel }
  }
}
function useVuex(root) {
  function changeCount(num) {
    root.$store.dispatch('asyncCount', num)
  }

  function downExcel() {
    window.open('./1.xlsx')
  }
  return { changeCount, downExcel }
}
</script>

<style lang="scss" scoped></style>
