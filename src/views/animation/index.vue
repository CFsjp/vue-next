<template>
  <div class="wrapper">
    <h1>此页面是练习CSS3动画的页面</h1>
    <br />
    <h2>跑马灯</h2>
    <span ref="highSpan" class="title">为了引起你的注意，我真是煞费苦心</span>
    <marquee width="300" bgcolor="#875479" behavior="scroll">
      我单方向循环滚动
    </marquee>
    <div class="animation1"></div>
    <el-button @click="flag = !flag" type="info">
      显示动画
    </el-button>
    <br />
    <br />
    <transition name="plus-icon">
      <div class="icon-plus" v-if="flag">
        文字显示
      </div>
    </transition>
  </div>
</template>

<script>
import { onMounted, ref } from '@vue/composition-api'

export default {
  setup() {
    const flag = ref(false)
    const highSpan = ref(null)

    onMounted(() => {
      console.log(highSpan.value)
      highSpan.value.innerText = '111'
    })

    return { flag, highSpan }
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  text-align: center;
}

.animation1 {
  margin-left: 100px;
  width: 100px;
  height: 100px;
  background: red;
  position: relative;
  animation: myfirst 5s linear 2s infinite alternate;
  // 动画：动画名 动画完成所花的时间 动画的速度曲线 动画开始之前的延迟 播放次数 是否轮流反向播放动画
}

@keyframes myfirst {
  // 设置动画每个时间段的动画
  0% {
    background: red;
    left: 0px;
    top: 0px;
    transform: rotate(0deg);
  }
  25% {
    // background-image: linear-gradient(red, yellow);
    background-color: blue;
    left: 200px;
    top: 0px;
    transform: rotate(45deg);
  }
  50% {
    // background-image: linear-gradient(yellow, blue);
    background-color: yellow;
    left: 200px;
    top: 200px;
    transform: rotate(90deg);
  }
  75% {
    // background-image: linear-gradient(blue, green);
    background-color: green;
    left: 0px;
    top: 200px;
    transform: rotate(135deg);
  }
  100% {
    // background-image: linear-gradient(green, red);
    background-color: red;
    left: 0px;
    top: 0px;
    transform: rotate(180deg);
  }
}

.title {
  display: block;
  margin: 20px 0px;
  text-decoration: none;
  text-align: center;
  line-height: 1.5;
  background-image: -webkit-linear-gradient(
    left,
    #3498db,
    #f47920 10%,
    #d71345 20%,
    #f7acbc 30%,
    #ffd400 40%,
    #3498db 50%,
    #f47920 60%,
    #d71345 70%,
    #f7acbc 80%,
    #ffd400 90%,
    #3498db
  );
  color: transparent;
  -webkit-background-clip: text;
  background-size: 200% 100%;
  -webkit-animation: slide 2s infinite linear;
  animation: slide 5s infinite linear;
  font-size: 40px;
}
@keyframes slide {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: -100% 0;
  }
}

.plus-icon-enter-active {
  transition: opacity 0.5s;
}
.plus-icon-enter {
  opacity: 0;
}
.plus-icon-leave-active {
  transition: opacity 0.5s;
}
.plus-icon-leave-to {
  opacity: 0;
}
</style>
