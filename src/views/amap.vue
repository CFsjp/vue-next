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
      <el-button @click="handleMouseTool('marker')">
        画点
      </el-button>
      <el-button @click="handleMouseTool('polyline')">
        画折线
      </el-button>
      <el-button @click="handleMouseTool('polygon')">
        画多边形
      </el-button>
      <el-button @click="handleMouseTool('rectangle')">
        画矩形
      </el-button>
      <el-button @click="handleMouseTool('circle')">
        画圆
      </el-button>
      <el-button @click="clearMouseTool">
        clearMouseTool
      </el-button>
      <el-button @click="console">
        打印
      </el-button>
      <el-button @click="setLayer('卫星')">
        卫星地图
      </el-button>
      <el-button @click="setLayer('标准')">
        标准地图
      </el-button>
      <el-button @click="getMarkerArea(overlays[0])">
        面积
      </el-button>
    </div>
  </div>
</template>

<script>
// import AMap from 'AMap' // 引入高德地图
import { createMap } from '@/plugins/amap'

export default {
  data() {
    return {
      map: null,
      marker: null,
      mouseTool: null,
      overlays: null,
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
      const params = {
        id: 'amap',
        zoom: 5,
        center: [108.95, 34.26667]
      }
      createMap(params).then((map) => {
        // 懒加载地图
        map.plugin(
          [
            'AMap.MouseTool',
            'AMap.ToolBar',
            'AMap.Scale',
            'AMap.OverView',
            'AMap.MapType',
            'AMap.Geolocation'
          ],
          () => {
            map.addControl(new AMap.ToolBar({ liteStyle: true })) // 地图工具条插件，可以用来控制地图的缩放和平移
            // map.addControl(new AMap.Scale()) // 地图比例尺插件
            // map.addControl(new AMap.OverView({ isOpen: true })) // 地图鹰眼插件，默认在地图右下角显示缩略图
            // map.addControl(new AMap.MapType({ showTraffic: false, showRoad: false })) // 在图面添加类别切换控件，实现默认图层与卫星图、实施交通图层之间切换的控制
            map.addControl(new AMap.Geolocation()) // 在图面添加定位控件，用来获取和展示用户主机所在的经纬度位置
            this.mouseTool = new AMap.MouseTool(map) // 工具实例
          }
        )
        this.map = map
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
    },
    // 处理矢量图形
    handleMouseTool(type) {
      const option = {
        fillColor: '#00b0ff',
        strokeColor: '#80d8ff'
      }
      this.mouseTool[type](option) // 添加矢量图形方法
      this.map.on('mousemove', () => {
        this.overlays = this.map.getAllOverlays()
      })
    },
    clearMouseTool() {
      this.map.remove(this.overlays)
      this.overlays = []
      this.map.off('mousemove')
    },
    console() {
      // const info = this.overlays.map((i) => i.getOptions())
      // const bound = this.overlays.map(i => i.getBounds())
      alert(this.overlays[0].getExtData())
    },
    getMarkerArea(marker) {
      if (marker.CLASS_NAME === 'AMap.Polyline') {
        alert(marker.getArea())
        return marker.getArea() // 多边形面积
      } else if (marker.CLASS_NAME === 'AMap.Circle') {
        // 圆面积
        alert(Math.round(Math.pow(marker.getRadius() / 1000, 2) * 3.1415926))
        return Math.round(Math.pow(marker.getRadius() / 1000, 2) * 3.1415926)
      } else if (marker.CLASS_NAME === 'AMap.rectangle') {
        // 矩形面积
        alert(
          AMap.GeometryUtil.ringArea(
            marker.getOptions().path.map((i) => [i.lng, i.lat])
          )
        )
        return AMap.GeometryUtil.ringArea(
          marker.path.map((i) => [i.lng, i.lat])
        )
      } else {
        alert(marker.getPosition())
        console.log(marker.getPosition())
      }
    },
    setLayer(layerName) {
      let layer = null
      if (layerName === '卫星') {
        layer = [new AMap.TileLayer.Satellite({ detectRetina: true })]
      } else {
        layer = [new AMap.TileLayer({ detectRetina: true })]
      }
      this.map.setLayers(layer)
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
  left: 0;
}
</style>
