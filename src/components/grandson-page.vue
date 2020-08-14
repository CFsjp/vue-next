<template>
  <div class="grandson">
    <h1>This is an about grandson page</h1>
    <h1>{{ msg }}</h1>
    <h1>fooNew：{{ fooNew }}</h1>
  </div>
</template>

<script>
import { Vue, Component } from "vue-property-decorator";

@Component({
  inject: ["fooNew"]
})
export default class Grandson extends Vue {
  msg = "我是孙子组件!";
}
</script>

<style lang="scss" scoped>
.grandson {
  background-color: rgb(218, 157, 157);
}
</style>
