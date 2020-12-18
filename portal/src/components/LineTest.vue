<template>
  <ve-line
    :data="chartData"
    :mark-line="markLine"
    :mark-point="markPoint">
  </ve-line>
</template>

<script>
import 'echarts/lib/component/markLine'
import 'echarts/lib/component/markPoint'

export default {
  data () {
    this.markLine = {
      data: [
        {
          name: '平均线',
          type: 'average'
        }
      ]
    }
    this.markPoint = {
      data: [
        {
          name: '最大值',
          type: 'max'
        }
      ]
    }
    return {
      chartData: {
        columns: ['A', 'B', 'C'],
        rows: [
          { A: '1月1日', B: 1523, C: 1231 },
          { A: '1月2日', B: 1223, C: 2523 },
          { A: '1月3日', B: 2123, C: 1000 },
          { A: '1月4日', B: 4123, C: 3223 },
          { A: '1月5日', B: 3123, C: 3023 },
          { A: '1月6日', B: 7123, C: 5523 }
        ]
      }
    }
  }
}
</script>
