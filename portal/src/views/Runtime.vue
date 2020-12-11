<template>
  <div class="runtime">
    <h1><b>Runtime</b></h1>
    <div>
      <RuntimeData/>
    </div>
  </div>
</template>

<script>
import RuntimeData from '@/components/RuntimeData.vue'
export default {
  name: 'Runtime',
  components: {
    RuntimeData
  }
}
</script>
