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
  yMin: 0,
  components: {
    've-line': VeLine
  },
  props: [
    'qlData'
  ],
  data: function () {
    this.yMax = 0
    this.yMin = 2000
    this.rows = this.calcRows(this.qlData.runtime)
    return {
      settings: {
        min: [this.yMin],
        max: [this.yMax]
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
          },
          {
            type: 'min',
            name: 'MIN'
          }
        ]
      },
      markLine: {
        data: [
          {
            name: '平均线',
            type: 'average',
            lineStyle: {
              color: 'blue'
            }
          },
          {
            name: 'close',
            yAxis: this.qlData.day.yestclose,
            lineStyle: {
              color: 'black'
            }
          },
          {
            name: 'open',
            yAxis: this.qlData.day.todayopen,
            lineStyle: {
              color: 'green'
            }
          }
        ]
      },
      dataZoom: [
        {
          type: 'slider'
        }
      ],
      runtime: {
        columns: [
          'time',
          'price'
        ],
        rows: this.rows // this.calcRows(this.qlData.runtime)
      }
    }
  },
  methods: {
    calcRows: function (data) {
      const ret = []
      // const data = this.qlData.runtime
      for (let i = 0; i < data.length; ++i) {
        const item = data[i]
        if (item.price > this.yMax) {
          this.yMax = item.price
        }
        if (item.price < this.yMax) {
          this.yMin = item.price
        }
        ret.push({
          time: item.updated.substring(11),
          price: item.price
        })
      }
      if (this.qlData.day.yestclose > this.yMax) {
        this.yMax = this.qlData.day.yestclose
      }
      if (this.qlData.day.todayopen > this.yMax) {
        this.yMax = this.qlData.day.todayopen
      }
      if (this.qlData.day.yestclose < this.yMin) {
        this.yMin = this.qlData.day.yestclose
      }
      if (this.qlData.day.todayopen < this.yMin) {
        this.yMin = this.qlData.day.todayopen
      }

      this.yMax = this.yMax * 1.03
      this.yMin = this.yMin * 0.97

      return ret
    }
  }
}
</script>
