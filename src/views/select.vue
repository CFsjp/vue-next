<template>
  <div>
    <el-button @click="isReverse = !isReverse">倒序</el-button>
    <ul :class="{ ul: isReverse }">
      <li v-for="(item, index) in arr" :key="index">
        index:{{ index }},name:{{ item[0] }},age:{{ item[1] }}
      </li>
    </ul>
  </div>
</template>

<script>
import '@/study/源码实现/5、new操作符/new'
import '@/study/源码实现/4.call、apply、bind实现/test'

export default {
  data() {
    return {
      arr: [
        ['张三', 18],
        ['李四', 19],
        ['王五', 20],
        ['赵六', 21]
      ],
      isReverse: false
    }
  }
}
</script>

<style lang="scss" scoped>
.ul {
  display: flex;
  flex-direction: column-reverse;
}
</style>
