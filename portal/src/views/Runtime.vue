<template>
  <div class="runtime">
    <h1><b>Runtime</b></h1>
    <div>
      <RuntimeGraph/>
    </div>
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
