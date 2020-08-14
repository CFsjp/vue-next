<template>
  <div class="brother">
    <h1>This is an about brother page</h1>
    <h1>{{ msg }}</h1>
    <div>
      <p>接受兄弟组件传递的数据</p>
      <div>
        <h2>年龄：{{ age }}</h2>
        <h2>姓名：{{ name }}</h2>
      </div>
    </div>
  </div>
</template>

<script>
import { Vue, Component } from "vue-property-decorator";
import Bus from "@/utils/eventBus.ts";

@Component
export default class SonPage extends Vue {
  msg = "我是兄弟组件!";
  name = "王亚兰";
  age = "18";

  created() {
    Bus.$on("sendData", this.changData);
  }

  changData(val) {
    this.age = val.age;
    this.name = val.name;
  }
}
</script>

<style lang="scss" scoped>
.brother {
  background-color: rgb(228, 147, 147);
}
</style>
