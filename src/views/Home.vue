<template>
  <div class="home">
    <Navbar />
    <!-- <Sidebar /> -->
    <Banner />
    <Products />
  </div>
  <div class="mobile">
    <h2>Not available yet! <br> Still in development, we'll be operational very soon.</h2>
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'
// import Sidebar from '../components/Sidebar.vue'
import Banner from '../components/Banner.vue'
import Products from '../components/Products.vue'

export default {
  name: 'Home',
  components: {
    Navbar,
    // Sidebar,
    Banner,
    Products
  }
}
</script>

<style>
.home {
  background: #ffffff;
}

.mobile {
  display: none;
}

@media(max-width: 600px) {
  .home {
    display: none;
  }

  .mobile {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 50px;
    height: 100vh;
    background: rgba( 55, 25, 213, 0.75 );
  }

  h2 {
    background: rgba( 255, 255, 255, 0.25 );
    box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
    backdrop-filter: blur( 4px );
    -webkit-backdrop-filter: blur( 4px );
    border-radius: 25px;
    border: 1px solid rgba( 255, 255, 255, 0.18 );
    padding: 50px;
    color: #fff;
  }
}
</style>