<template>
  <div class="runtime">
    <h1><b>Runtime</b></h1>
    <div>
      <RuntimeData :id="id" :today="today" />
    </div>
  </div>
</template>

<script>
import RuntimeData from '@/components/RuntimeData.vue'
export default {
  name: 'Runtime',
  components: {
    RuntimeData
  },
  props: ['id', 'today']
}
</script>
