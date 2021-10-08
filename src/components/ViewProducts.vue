<template>
  <AdminBar />

  <div class="products mt-5">
    <div class="recommended">
      <h2>All Products</h2>
      <div class="d-flex flex-sm-column flex-md-column flex-lg-row align-items-stretch flex-wrap justify-content-center p-5">
        <div v-for="produce in productData" :key="produce.id" :produce="produce">
          <ProductCard :produce="produce"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onBeforeMount, ref } from 'vue'
import { supabase } from '../supabase'
import AdminBar from '../components/AdminBar.vue'
import ProductCard from '../components/ProductCard.vue'

export default {
  components: {
    AdminBar,
    ProductCard
  },
  setup() {
    // const imageSource = 
    const productData = ref([])

    const getProduct = async () => {
      try {
        const data = await supabase
        .from('products')
        .select('*')
        productData.value = data.data
        console.log(productData)
      }
      catch (err) {
        alert('Error')
        console.error('Unknown problem getting db', err)
        return null
      }
    }

    onBeforeMount(() => {
      getProduct()
    })

    return {
      productData
    }
  }
}
</script>

<style>

</style>