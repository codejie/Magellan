<template>
  <ve-line :data="runtime"/>
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
    return {
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
