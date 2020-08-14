<template>
  <div class="about">
    <h1>This is an about page</h1>
    <h1>{{ msg }}</h1>
    <input v-model.lazy="num" @change="show" />
    <h2>{{ num }}</h2>
    <sonPage />
    <brotherPage />
  </div>
</template>

<script>
import { Vue, Component } from "vue-property-decorator";
import sonPage from "@/components/son-page";
import brotherPage from "@/components/brother-page";

@Component({
  components: { sonPage, brotherPage },
  provide: {
    fooNew: "父组件的数据"
  }
})
export default class About extends Vue {
  msg = "我是父组件!";
  num = 100;

  show() {
    console.log(this.num);
  }
}
</script>

<style lang="scss" scoped>
.about {
  background-color: #eee;
}
</style>
