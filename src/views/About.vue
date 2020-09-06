<template>
  <div class="about">
    <h1>This is an about page</h1>
    <h1>我是父组件!</h1>
    <input v-model.lazy="num" @change="show" />
    <h2>{{ num }}</h2>
    <son-page />
    <brother-page />
  </div>
</template>

<script>
import { ref } from '@vue/composition-api'
import sonPage from '@/components/son-page'
import brotherPage from '@/components/brother-page'

export default {
  components: { sonPage, brotherPage },
  provide: {
    fooNew: '父组件的数据'
  },

  setup() {
    const num = ref(100)

    return {
      num
    }
  }
}
</script>

<style lang="scss" scoped>
.about {
  background-color: #eee;
}
</style>
