<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ name }}</div>
    <person-stock-data :table-data="tableData" />
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
      tableData: []
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  watch: {
    async temp() {
      for (let i = 0; i < this.temp.length; ++i) {
        const item = this.temp[i]
        const { header, body } = await stockInfo({ id: item.stockId })
        console.log(body)
        if (header.code === 0) {
          if (body.length > 0) {
            item.id = body[0].id
            item.name = body[0].name
            item.code = body[0].code
            item.market = body[0].market
            item.type = body[0].type
          }
        }
        const ret = await dayDataLatest({ id: item.stockId })
        if (ret.header.code === 0) {
          item.value = item.total * ret.body[0].todayopen
        }

        this.tableData.push(item)
      }
    }
  },
  created() {
    this.fetchStockData()
  },
  methods: {
    fetchStockData() {
      this.listLoading = true
      stockData({}).then(result => {
        console.log(result)
        const { header, body } = result
        if (header.code === 0) {
          body.forEach(element => {
            element.fund = element.total * element.price
            this.temp.push(element)
          })
        } else {
          //
        }
      }).catch((error) => {
        console.error(error)
      })
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
