<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ name }}</div>
    <person-stock-data :table-data="tableData" :stock-infos="stockInfos" />
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
      temp: [],
      tableData: [],
      stockInfos: {}
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  watch: {
    async temp() {
      const sum = {
        total: 0,
        fund: 0.0,
        value: 0.0
      }

      for (let i = 0; i < this.temp.length; ++i) {
        const item = this.temp[i]
        // const { header, body } = await stockInfo({ id: item.stockId })
        const body = this.stockInfos[item.stockId]
        console.log(body)
        if (body) {
          item.id = body.id
          item.name = body.name
          item.code = body.code
          item.market = body.market
          item.type = body.type
        }
        // if (header.code === 0) {
        //   if (body.length > 0) {
        //     item.id = body[0].id
        //     item.name = body[0].name
        //     item.code = body[0].code
        //     item.market = body[0].market
        //     item.type = body[0].type
        //   }
        // }
        sum.total += item.total
        sum.fund += item.fund
        const ret = await dayDataLatest({ id: item.stockId })
        if (ret.header.code === 0 && ret.body.length > 0 && ret.body[0].todayopen) {
          item.value = item.total * ret.body[0].todayopen
          sum.value += item.value
        }

        this.tableData.push(item)
      }

      this.tableData.push({
        name: '合计',
        total: sum.total,
        fund: sum.fund,
        value: sum.value
      })
    }
  },
  created() {
    this.fetchStockData()
  },
  methods: {
    // fetchStockData() {
    //   this.listLoading = true
    //   stockData({}).then(result => {
    //     console.log(result)
    //     const { header, body } = result
    //     if (header.code === 0) {
    //       body.forEach(element => {
    //         element.fund = element.total * element.price
    //         this.temp.push(element)
    //       })
    //     } else {
    //       //
    //     }
    //   }).catch((error) => {
    //     console.error(error)
    //   })
    // },
    async fetchStockData() {
      this.listLoading = true
      const stockInfoResult = await stockInfo({})
      if (stockInfoResult.header.code === 0) {
        stockInfoResult.body.forEach(element => {
          this.stockInfos[element.id] = element
          // console.log('id = ' + element.id)
          // console.log(element)
        })
      }

      const stockDataResult = await stockData({})
      if (stockDataResult.header.code === 0) {
        stockDataResult.body.forEach(element => {
          element.fund = element.total * element.price
          this.temp.push(element)
        })
      }

      this.listLoading = false
    }
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
