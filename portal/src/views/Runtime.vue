<template>
  <div class="runtime">
    <h1><b>Runtime</b></h1>
    <RuntimeGraph/>
  </div>
</template>

<script>
import RuntimeGraph from '@/components/RuntimeGraph.vue'
export default {
  name: 'Runtime',
  components: {
    RuntimeGraph
  }
}
</script>

<style scoped>
.runtime {
  width: 900px;
  height: 900px;
}
</style>
