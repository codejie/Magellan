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
      return [
        {
          time: '0',
          price: 3.1
        },
        {
          time: '2',
          price: 2.1
        }
      ]
    }
  }
}
</script>
