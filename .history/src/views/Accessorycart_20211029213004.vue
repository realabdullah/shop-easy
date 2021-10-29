<template>
  <div class="home">
    <Navbar />
    <Banner />
    <Category />

    <div class="products">
      <div class="recommended">
        <h2>Accessories</h2>
        <div class="rp-container">
          <div class="rp-card" v-for="i in accessory" :key="i.id">
            <router-link :to="{ name: 'Product', params: { name: i.name }}">
              <img :src="i.file" alt="headset">
            </router-link>
              <div class="details">
                <p class="price"><span> &#8358; </span>{{ i.price.toLocaleString() }}</p>
                <p class="name">{{ i.name }}</p>
                <div class="buttons">
                  <button class="view">
                    <router-link :to="{ name: 'Product', params: { name: i.name }}">
                      View
                    </router-link>
                  </button>
                  <button class="add-cart" @click="addProduct(product)">
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
    const accessory = ref([])

    const addProduct = (p) => {
      let product = { ...p };
      store.dispatch("addProduct", product);
    }

    const getAccessory = async () => {
      try {
        const data = await supabase
        .from('products')
        .select('*')
        .eq('category', 'accessory')
        accessory.value = data.data
      }
      catch(error) {
        console.log(error)
      }
    }

    onBeforeMount(() => {
      getAccessory()
    })

    return {
      addProduct,
      accessory
    }
  }
}
</script>

<style>

</style>