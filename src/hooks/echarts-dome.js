import { onMounted, onUnmounted, ref } from '@vue/composition-api'
import echarts from 'echarts'

export function useEcharts() {
  const pieEchart = ref(null)

  onMounted(() => {
    renderEchart()
  })

  onUnmounted(() => {
    pieEchart.value = null // 清除echart实例，防止内存泄漏
  })

  function renderEchart() {
    const chart = echarts.init(pieEchart.value)
    const getvalue = [88]

    const option = {
      title: {
        text: getvalue + '分',
        textStyle: {
          color: '#28BCFE',
          fontSize: 40
        },
        subtext: '综合得分',
        subtextStyle: {
          color: '#666666',
          fontSize: 30
        },
        itemGap: 20,
        left: 'center',
        top: '43%'
      },
      tooltip: {
        formatter() {
          return (
            '<span style="color: #fff;">综合得分：' + getvalue + '分</span>'
          )
        }
      },
      angleAxis: {
        max: 100,
        clockwise: true, // 逆时针
        // 隐藏刻度线
        show: false
      },
      radiusAxis: {
        type: 'category',
        show: true,
        axisLabel: {
          show: false
        },
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        }
      },
      polar: {
        center: ['50%', '50%'],
        radius: '100%' // 图形大小
      },
      series: [
        {
          type: 'bar',
          data: getvalue,
          showBackground: true,
          backgroundStyle: {
            color: '#BDEBFF'
          },
          coordinateSystem: 'polar',
          roundCap: true,
          barWidth: 30,
          itemStyle: {
            normal: {
              opacity: 1,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: '#25BFFF'
                },
                {
                  offset: 1,
                  color: '#5284DE'
                }
              ]),
              shadowBlur: 5,
              shadowColor: '#2A95F9'
            }
          }
        }
      ]
    }
    chart.setOption(option)
    window.onresize = chart.resize
  }

  return { pieEchart, renderEchart }
}
