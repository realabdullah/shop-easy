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
                <p class="price"><span> &#8358; </span>{{ shoe.price.toLocaleString() }}</p>
                <p class="name">{{ shoe.name }}</p>
                <div class="buttons">
                  <button class="view">
                    <router-link :to="{ name: 'Product', params: { name: shoe.name }}">
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
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'
import Banner from '../components/Banner.vue'
import Category from '../components//Category.vue'
import { supabase } from '../supabase'
import { ref, onBeforeMount } from 'vue'

export default {
  name: 'Home',
  components: {
    Navbar,
    Banner,
    Category
  },
  setup() {
    const accessory = ref([])

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
      accessory
    }
  }
}
</script>

<style>

</style>