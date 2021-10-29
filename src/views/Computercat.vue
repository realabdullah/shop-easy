<template>
  <div class="home">
    <Navbar />
    <Banner />
    <Category />
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'
import Banner from '../components/Banner.vue'
import Category from '../components//Category.vue'

export default {
  name: 'Home',
  components: {
    Navbar,
    Banner,
    Category
  }
}
</script>

<style>

</style>