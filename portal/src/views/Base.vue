<template>
  <div class="base">
    <h1><b>StockInfo</b></h1>
    <StockInfo/>
  </div>
</template>

<script>
import StockInfo from '@/components/StockInfo.vue'
export default {
  name: 'Base',
  components: {
    StockInfo
  }
}
</script>
