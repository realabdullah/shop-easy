<template>
  <div class="home">
    <Navbar />
    <Banner />
    <Category />

    <div class="products">
      <div class="recommended">
        <h2>Fashion</h2>
        <div class="rp-container">
          <div class="rp-card" v-for="fashion in fashions" :key="fashion.id">
            <router-link :to="{ name: 'Product', params: { name: fashion.name }}">
              <img :src="fashion.file" alt="headset">
            </router-link>
              <div class="details">
                <p class="price"><span> &#8358; </span>{{ fashion.price.toLocaleString() }}</p>
                <p class="name">{{ fashion.name }}</p>
                <div class="buttons">
                  <button class="view">
                    <router-link :to="{ name: 'Product', params: { name: fashion.name }}">
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
import { supabase } from '../supabase'
import { ref, onBeforeMount } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'Home',
  components: {
    Navbar,
    Banner,
    Category
  },
  setup() {
    const store = useStore()
    const fashions = ref([])

    const addProduct = (p) => {
      let product = { ...p };
      store.dispatch("addProduct", product);
    }

    const getFashion = async () => {
      try {
        const data = await supabase
        .from('products')
        .select('*')
        .eq('category', 'Fashion')
        fashions.value = data.data
      }
      catch(error) {
        console.log(error)
      }
    }

    onBeforeMount(() => {
      getFashion()
    })

    return {
      addProduct,
      fashions
    }
  }
}
</script>

<style>

</style>