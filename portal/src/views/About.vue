<template>
  <div class="about">
    <h1>This is an about page</h1>
    <Apollo/>
  </div>
</template>

<script>
import Apollo from '@/components/SayHello.vue'
export default {
  name: 'About',
  components: {
    Apollo
  }
}
</script>
