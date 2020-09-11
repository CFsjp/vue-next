<template>
  <div class="container">
    <div id="amap"></div>
    <div class="btn">
      <el-button @click="addMarker">
        addMarker
      </el-button>
      <el-button @click="provinceMarker(positions)">
        provinceMarker
      </el-button>
      <el-button @click="clearMarker">
        clearMarker
      </el-button>
    </div>
  </div>
</template>

<script>
import AMap from 'AMap' // 引入高德地图

export default {
  data() {
    return {
      map: null,
      marker: null,
      positions: {
        山东: [117.000923, 36.675807],
        河北: [115.48333, 38.03333],
        吉林: [125.35, 43.88333],
        黑龙江: [127.63333, 47.75],
        辽宁: [123.38333, 41.8],
        内蒙古: [111.670801, 41.818311],
        新疆: [87.68333, 43.76667],
        甘肃: [103.73333, 36.03333],
        宁夏: [106.26667, 37.46667],
        山西: [112.53333, 37.86667],
        陕西: [108.95, 34.26667],
        河南: [113.65, 34.76667],
        安徽: [117.283042, 31.86119],
        江苏: [119.78333, 32.05],
        浙江: [120.2, 30.26667],
        福建: [118.3, 26.08333],
        广东: [113.23333, 23.16667],
        江西: [115.9, 28.68333],
        海南: [110.35, 20.01667],
        广西: [108.320004, 22.82402],
        贵州: [106.71667, 26.56667],
        湖南: [113.0, 28.21667],
        湖北: [114.298572, 30.584355],
        四川: [104.06667, 30.66667],
        云南: [102.73333, 25.05],
        西藏: [91.0, 30.6],
        青海: [96.75, 36.56667],
        天津: [117.2, 39.13333],
        上海: [121.55333, 31.2],
        重庆: [106.45, 29.56667],
        北京: [116.41667, 39.91667],
        台湾: [121.3, 25.03],
        香港: [114.1, 22.2],
        澳门: [113.5, 22.2]
      }
    }
  },
  mounted() {
    document.title = '高德地图'
    this.init()
  },
  methods: {
    init() {
      this.map = new AMap.Map('amap', {
        center: [108.95, 34.26667],
        resizeEnable: true,
        zoom: 5
      })
      this.map.plugin(['AMap.ToolBar'], function() {
        this.map.addControl(new AMap.ToolBar())
      })
      this.map.plugin(['AMap.MouseTool'], function() {
        const mouseTool = new AMap.MouseTool(this.map)
        // 使用鼠标工具，在地图上画标记点
        mouseTool.marker()
      })
    },
    addMarker() {
      // 创建一个 Marker 实例：
      this.marker = new AMap.Marker({
        position: new AMap.LngLat(116.39, 39.9), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
        title: '北京'
      })
      // 将创建的点标记添加到已有的地图实例：
      this.marker.setMap(this.map)
    },
    clearMarker() {
      if (this.marker) {
        // 清除点标记使用marker.setMap(null)
        // 坑：并且为了下次使用，marker也得清掉
        this.marker.setMap(null)
        this.marker = null
      } else {
        // 全部清除
        this.map.clearMap()
      }
    },
    provinceMarker(positions) {
      const markers = []
      Object.keys(positions).forEach((key) => {
        const marker = new AMap.Marker({
          position: positions[key],
          title: key,
          map: this.map
        })
        markers.push(marker)
      })
      this.map.setFitView()
    }
  }
}
</script>

<style lang="scss" scoped>
.container,
#amap {
  position: relative;
  width: 100%;
  height: 100%;
}
.btn {
  position: absolute;
  top: 0;
  right: 0;
}
</style>
