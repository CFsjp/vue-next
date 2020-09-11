// export default function MapLoader() {
//   return new Promise((resolve, reject) => {
//     if (window.AMap) {
//       resolve(window.AMap)
//     } else {
//       const script = document.createElement('script')
//       script.type = 'text/javascript'
//       script.async = true
//       script.src =
//         'https://webapi.amap.com/maps?v=1.4.15&key=e4502ea2b50a7160fa3ee61916d61f33&plugin=AMap.Geocoder&callback=initAMap'
//       script.onerror = reject
//       document.head.appendChild(script)
//     }
//     window.initAMap = () => {
//       resolve(window.AMap)
//     }
//   })
// }
