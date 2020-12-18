<template>
  <ve-line
    :data="runtime"
    :settings="settings"
    :extend="extend"
    :mark-point="markPoint"
    :mark-line="markLine"
    :data-zoom="dataZoom"
  />
</template>

<script>
import VeLine from 'v-charts/lib/line.common'
import 'echarts/lib/component/markLine'
import 'echarts/lib/component/markPoint'
import 'echarts/lib/component/dataZoom'

export default {
  components: {
    've-line': VeLine
  },
  props: [
    // 'qlData',
    'day',
    'rumtime'
  ],
  data: function () {
    return {
      settings: {
        // min: [0],
        // max: [30]
        // area: true
      },
      extend: {
        'xAxis.0.axisLabel.rotate': 45
      },
      markPoint: {
        data: [
          {
            type: 'max',
            name: 'MAX'
          }
        ]
      },
      markLine: {
        data: [
          {
            name: '平均线',
            type: 'average',
            lineStyle: {
              color: 'red'
            }
          },
          {
            name: 'open',
            yAxis: 20
          }
        ]
      },
      dataZoom: [
        {
          type: 'slider'
        }
      ]
    }
  },
  computed: {
    runtime: function () {
      return {
        columns: [
          'time',
          'price'
        ],
        rows: this.calcRows(this.qlData)
      }
    }
  },
  methods: {
    calcRows (data) {
      // console.log('data = ' + data.toString())
      const ret = []
      for (let i = 0; i < data.length; ++i) {
        const item = data[i]
        ret.push({
          time: item.updated,
          price: item.price
        })
      }
      // console.log(ret)
      return ret
    }
  }
}
</script>
