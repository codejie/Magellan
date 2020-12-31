<template>
  <div class="about">
    <h1>This is an about page</h1>
    <Apollo/>
    <div>
      <LineTest />
    </div>
  </div>
</template>

<script>
import Apollo from '@/components/SayHello.vue'
import LineTest from '@/components/LineTest.vue'
export default {
  name: 'About',
  components: {
    Apollo,
    LineTest
  }
}
</script>
