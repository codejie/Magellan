<template>
  <div class="frame-container">
    <H1> RUNTIME </H1>
    <stock-infos :table-data="tableData" />
  </div>
</template>

<script>
import StockInfos from '@/components/StockInfos.vue'

export default {
  name: 'Runtime',
  components: {
    'stock-infos': StockInfos
  }
}

</script>
<style lang="scss" scoped>
  .frame {
    &-container {
      margin: 30px
    }
  }
</style>
