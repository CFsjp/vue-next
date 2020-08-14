<template>
  <div class="son">
    <h1>This is an about son page</h1>
    <h1>{{ msg }}</h1>
    <div>
      <p>兄弟组件--数据传递</p>
      <button @click="showData">发送数据</button>
      <button @click="showDataTwo">发送第二种数据</button>
    </div>
    <grandsonPage />
  </div>
</template>

<script>
import { Vue, Component } from "vue-property-decorator";
import grandsonPage from "./grandson-page.vue";
import Bus from "@/utils/eventBus.ts";

@Component({
  components: { grandsonPage }
})
export default class SonPage extends Vue {
  msg = "我是子组件!";

  showData() {
    const data = {
      age: 22,
      name: "盛俊鹏"
    };
    Bus.$emit("sendData", data);
  }

  showDataTwo() {
    const data = {
      age: 14,
      name: "王亚秋"
    };
    Bus.$emit("sendData", data);
  }
}
</script>

<style lang="scss" scoped>
.son {
  background-color: rgb(175, 66, 66);
}
</style>
