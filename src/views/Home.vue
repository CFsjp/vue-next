<template>
  <div class="home">
    <!-- <h1>数组去重</h1>
    <div>{{ arr }}</div>
    <div>{{ arr2 }}</div> -->
    <h1>加油，上进！</h1>
    1、覆盖激活
    <el-tooltip content="Bottom center" placement="bottom" effect="light">
      <div slot="content">
        <span>1.所选的表必须设有主键，并且是单字段主键</span>
        <br />
        <span>2.必须保证主键长度至少19位</span>
      </div>
      <el-button>Light</el-button>
    </el-tooltip>
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
