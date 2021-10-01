<template>
  <div class="home">
    <Navbar />
    <Sidebar />
    <Banner />
    <Products />
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'
import Sidebar from '../components/Sidebar.vue'
import Banner from '../components/Banner.vue'
import Products from '../components/Products.vue'

export default {
  name: 'Home',
  components: {
    Navbar,
    Sidebar,
    Banner,
    Products
  }
}
</script>

<style>
.home {
  background: #ffffff;
}
</style>