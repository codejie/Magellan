<template>
  <div>
    <ve-line
      :data="chartData"
      :toolbox="toolbox">
    </ve-line>
    <button @click="onClick">Click</button>
  </div>
</template>

<script>
// import VeLine from 'v-charts/lib/line.common'
import 'echarts/lib/component/toolbox'
export default {
  components: {
    // 've-line': VCharts
  },
  data () {
    // this.toolbox = {
    //   feature: {
    //     magicType: { type: ['line', 'bar'] },
    //     saveAsImage: {}
    //   }
    // }
    return {
      toolbox: {
        feature: {
          magicType: { type: ['line', 'bar'] },
          saveAsImage: {}
        }
      },
      chartData: {
        columns: ['b', 'c'],
        rows: [
          { b: 1, c: 1 },
          { b: 2, c: 2 },
          { b: 3, c: 3 },
          { b: 4, c: 4 },
          { b: 5, c: 5 },
          { b: 6, c: 6 }
        ]
      }
    }
  },
  methods: {
    onClick: function () {
      // console.log(vm)
      this.chartData.rows = [
        { b: 1, c: 2 },
        { b: 2, c: 2 },
        { b: 3, c: 2 },
        { b: 4, c: 2 },
        { b: 5, c: 2 },
        { b: 6, c: 2 }
      ]
    }
  }
}
</script>
