<template>
  <div class="home">
    <Navbar />
    <Banner />
    <Category />

    <div class="products">
      <div class="recommended">
        <h2>Electronics</h2>
        <div class="rp-container">
          <div class="rp-card" v-for="electronic in electronics" :key="electronic.id">
            <router-link :to="{ name: 'Product', params: { name: electronic.name }}">
              <img :src="electronic.file" alt="headset">
            </router-link>
              <div class="details">
                <p class="price"><span> &#8358; </span>{{ electronic.price.toLocaleString() }}</p>
                <p class="name">{{ electronic.name }}</p>
                <div class="buttons">
                  <button class="view">
                    <router-link :to="{ name: 'Product', params: { name: electronic.name }}">
                      View
                    </router-link>
                  </button>
                  <button class="add-cart" @click="addProduct(electronic)">
                    <i class="fas fa-cart-plus"></i>
                  </button>
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>

    <Footer />
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'
import Banner from '../components/Banner.vue'
import Category from '../components//Category.vue'
import Footer from '../components/Footer.vue'
import { supabase } from '../supabase'
import { ref, onBeforeMount } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'Home',
  components: {
    Navbar,
    Banner,
    Category,
    Footer
  },
  setup() {
    const store = useStore()
    const electronics = ref([])

    const addProduct = (p) => {
      let product = { ...p };
      store.dispatch("addProduct", product);
    }

    const getElectronics = async () => {
      try {
        const data = await supabase
        .from('products')
        .select('*')
        .eq('category', 'Home')
        electronics.value = data.data
      }
      catch(error) {
        console.log(error)
      }
    }

    onBeforeMount(() => {
      getElectronics()
    })

    return {
      addProduct,
      electronics
    }
  }
}
</script>

<style>

</style>