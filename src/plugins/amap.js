// 初始化高德地图

export function initAMap(callback) {
  const src =
    'https://webapi.amap.com/maps?v=1.4.15&key=e4502ea2b50a7160fa3ee61916d61f33&callback=onAMapLoad'
  window.onAMapLoad = () => {
    if (callback) {
      callback()
    }
  }

  const jsapi = document.createElement('script')
  jsapi.charset = 'utf-8'
  jsapi.src = src
  document.head.appendChild(jsapi)
}

/**
 * 创建地图
 * @param {id} 地图容器
 */

export function createMap({
  id,
  center = [],
  zoom = 4,
  mapStyle = 'amap://styles/fresh'
}) {
  return new Promise((resolve) => {
    getMap().then(() => {
      const map = new AMap.Map(id, {
        zoom, // 地图放大级别
        center,
        mapStyle,
        pitch: 0,
        viewMode: '3D',
        resizeEnable: true
      })
      resolve(map)
    })
  })
}

function getMap() {
  return new Promise((resolve) => {
    if (window.AMap) {
      resolve()
    } else {
      initAMap(resolve)
    }
  })
}
