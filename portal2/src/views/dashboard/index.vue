<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ name }}</div>
    <person-stock-data :table-data="tableData" :stock-infos="stockInfos" :parent="self" />
  </div>
</template>

<script>
import PersonStockData from '@/components/PersonStockData.vue'
import { mapGetters } from 'vuex'
import { stockData } from '@/graphql/person'
import { items as stockInfo, dayDataLatest } from '@/graphql/stock-info'

export default {
  name: 'Dashboard',
  components: {
    'person-stock-data': PersonStockData
  },
  data() {
    return {
      stockInfos: [],
      tableData: [],
      self: this
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  created() {
    this.fetchStockData()
  },
  methods: {
    async fetchStockData() {
      this.listLoading = true

      const stockInfoResult = await stockInfo({})
      if (stockInfoResult.header.code === 0) {
        this.stockInfos = stockInfoResult.body
      }
      const sum = {
        total: 0,
        fund: 0.0,
        value: 0.0
      }
      const stockDataResult = await stockData({})
      this.tableData = []
      if (stockDataResult.header.code === 0) {
        for (let i = 0; i < stockDataResult.body.length; ++i) {
          const item = stockDataResult.body[i]
          // stockDataResult.body.forEach(item => {
          item.fund = item.total * item.price
          // const body = this.stockInfos[item.stockId]
          const body = this.stockInfos.find(i => i.id === item.stockId)
          if (body) {
            item.id = body.id
            item.name = body.name
            item.code = body.code
            item.market = body.market
            item.type = body.type
          }

          sum.total += item.total
          sum.fund += item.fund
          const ret = await dayDataLatest({ id: item.stockId })
          if (ret.header.code === 0 && ret.body.length > 0 && ret.body[0].todayopen) {
            item.value = item.total * ret.body[0].todayopen
            sum.value += item.value
          }

          this.tableData.push(item)
        }
      }
      this.tableData.push({
        name: '合计',
        total: sum.total,
        fund: sum.fund,
        value: sum.value
      })

      console.log(this.tableData)

      this.listLoading = false
    }
  },
  refresh() {
    this.$forceUpdate()
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
