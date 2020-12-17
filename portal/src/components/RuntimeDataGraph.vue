<template>
  <ve-line
    :data="runtime"
    :settings="settings"
    :extend="extend"
    :mark-point="markPoint"
    :mark-line="markLine"
  />
</template>

<script>
import VeLine from 'v-charts/lib/line.common'

export default {
  components: {
    've-line': VeLine
  },
  props: [
    'qlData'
  ],
  data: function () {
    this.markLine = {
      data: [
        {
          name: '平均线',
          type: 'average'
        }
      ]
    }
    return {
      settings: {
        min: [10],
        area: true
      },
      extend: {
        'xAxis.0.axisLabel.rotate': 45,
        'series.0.markPoint.data.type': 'max',
        'series.0.markPoint.data.name': 'max'
      },
      markPoint: {
        data: [
          {
            type: 'min',
            name: 'MAX'
          }
        ]
      }
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
      console.log('data = ' + data.toString())
      const ret = []
      for (let i = 0; i < data.length; ++i) {
        const item = data[i]
        ret.push({
          time: item.updated,
          price: item.price
        })
      }
      console.log(ret)
      return ret
    }
  }
}
</script>
