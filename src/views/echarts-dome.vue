<template>
  <div class="echarts-wrap">
    <div class="pie-echart" ref="pieEchart" />
    <div id="main" style="width: 600px;height:400px;" ref="charts"></div>
  </div>
</template>

<script>
// import { useEcharts } from './hooks/echarts-dome.js'

export default {
  // setup() {
  //   const { pieEchart, renderEchart } = useEcharts()
  //   return { pieEchart, renderEchart }
  // }
}
</script>

<style lang="scss" scoped>
.echarts-wrap {
  width: 100%;
  height: 100%;
}

.pie-echart {
  width: 500px;
  height: 500px;
}
</style>
