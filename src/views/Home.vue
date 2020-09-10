<template>
  <div class="home">
    <h1>数组去重</h1>
    <div>{{ arr }}</div>
    <div>{{ arr2 }}</div>
  </div>
</template>

<script>
import { computed, reactive } from '@vue/composition-api'
import { uniqueArrayByItem } from '@/utils/unique-array'

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

    const arr2 = computed(() => uniqueArrayByItem(arr))

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
