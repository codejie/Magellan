<template>
  <ve-line
    ref="veline"
    :data="dynamicPart.runtime"
    :settings="dynamicPart.settings"
    :extend="fixedPart.extend"
    :mark-point="dynamicPart.markPoint"
    :mark-line="dynamicPart.markLine"
    :data-zoom="fixedPart.dataZoom"
    :toolbox="toolbox"
  />
</template>

<script>
// import VeLine from 'v-charts/lib/line.common'
// import 'echarts/lib/component/markLine'
// import 'echarts/lib/component/markPoint'
// import 'echarts/lib/component/dataZoom'
// import 'echarts/lib/component/toolbox'

export default {
  // yMin: 0,
  // components: {
  //   've-line': VeLine
  // },
  props: [
    'qlData'
  ],
  data: function () {
    return {
      toolbox: {
        feature: {
          magicType: { type: ['line', 'bar'] },
          saveAsImage: {}
        }
      },
      fixedPart: {
        extend: {
          'xAxis.0.axisLabel.rotate': 45
        },
        markPoint: {
          data: [
            {
              type: 'max',
              name: 'MAX'
            },
            {
              type: 'min',
              name: 'MIN'
            }
          ]
        },
        dataZoom: [
          {
            type: 'slider'
          }
        ]
      }
    }
  },
  computed: {
    dynamicPart: function () {
      const data = this.calcRows(this.qlData)
      const line = this.calcMarkLink(this.qlData)
      return {
        runtime: {
          columns: [
            'time',
            'price'
          ],
          rows: data.rows
        },
        settings: {
          min: [data.yMin],
          max: [data.yMax],
          type: 'line'
          // area: true
        },
        markPoint: {
          data: [
            {
              type: 'max',
              name: 'MAX'
            },
            {
              type: 'min',
              name: 'MIN'
            }
          ]
        },
        markLine: {
          data: line // this.calcMarkLink(this.qlData)
        }
      }
    }
  },
  methods: {
    calcMarkLink: function (qlData) {
      const ret = [
        {
          name: '平均线',
          type: 'average',
          lineStyle: {
            color: 'blue'
          }
        }
      ]
      if (qlData.day) {
        ret.push({
          name: 'close',
          yAxis: qlData.day.yestclose,
          lineStyle: {
            color: 'black'
          }
        })
        ret.push({
          name: 'open',
          yAxis: qlData.day.todayopen,
          lineStyle: {
            color: 'green'
          }
        })
      }
      return ret
    },
    calcRows: function (qlData) {
      const ret = {
        yMax: 0,
        yMin: 10000,
        rows: []
      }
      const data = qlData.runtime
      for (let i = 0; i < data.length; ++i) {
        const item = data[i]
        if (item.price > ret.yMax) {
          ret.yMax = item.price
        }
        if (item.price < ret.yMax) {
          ret.yMin = item.price
        }
        ret.rows.push({
          time: item.updated.substring(11),
          price: item.price
        })
      }
      if (qlData.day) {
        if (qlData.day.yestclose > ret.yMax) {
          ret.yMax = qlData.day.yestclose
        }
        if (qlData.day.todayopen > ret.yMax) {
          ret.yMax = qlData.day.todayopen
        }
        if (qlData.day.yestclose < ret.yMin) {
          ret.yMin = qlData.day.yestclose
        }
        if (qlData.day.todayopen < ret.yMin) {
          ret.yMin = qlData.day.todayopen
        }
      }
      ret.yMax = ret.yMax * 1.03
      ret.yMin = ret.yMin * 0.97

      return ret
    },
    onBeforeConfig: function (data) {
      console.log('onBeforeConfig' + data)
    }
  }
}
</script>
