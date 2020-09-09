<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <br />
    <el-button type="primary">
      主要按钮
    </el-button>
    <div>{{ arr }}</div>
    <div>{{ arr2 }}</div>
  </div>
</template>

<script>
import { computed, reactive } from '@vue/composition-api'
import { unique2 } from '@/utils/unique-array'

export default {
  name: 'Home',
  setup() {
    const arr = reactive([
      { id: 1, name: '王' },
      { id: 1, name: '王' },
      { id: 2, name: '盛' },
      { id: 2, name: '盛' },
      [1, 2, 3],
      [1, 2, 3]
    ])

    const arr2 = computed(() => unique2(arr))

    return {
      arr,
      arr2
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  text-align: center;
}
</style>
