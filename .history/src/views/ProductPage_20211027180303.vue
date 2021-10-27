<template>
  <Navbar />

  <div class="product-container">
    <div class="product-img">
      <img :src="productInfo.image" alt="admin">
    </div>
    <div class="product-body">
      <div class="product-details">
        <h1 class="product-name">{{ productInfo.name }}</h1>
        <p class="product-desc">
          {{ productInfo.description }}
        </p>
        <div class="sub-details">
          <h3 class="price">${{ productInfo.price }}</h3>
          <p class="stock" v-if="productInfo.available">In-stock</p>
          <p class="not-stock" v-else>Out of stock</p>
        </div>
        <div class="cart-section">
          <button @click="addProduct(product)" class="to-cart">
            Add to cart
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, computed, onBeforeMount } from 'vue'
import { useRoute } from 'vue-router'
import { supabase } from '../supabase'
import Navbar from '../components/Navbar.vue'
import { useStore } from 'vuex'

export default {
  components: {
    Navbar
  },
  setup() {
    const store = useStore()
    const route = useRoute()
    const singleProductName = computed(() => route.params.name)
    const productInfoHolder = ref([])

    const productInfo = reactive({
      image: '',
      name: '',
      description: '',
      price: '',
      available: ''
    })

    const getProductInfo = async () => {
      try {
        const data = await supabase
        .from('products')
        .select('*')
        .eq('name', singleProductName.value)
        .single()
        const newDetails = productInfoHolder.value = data.data
        productInfo.name = newDetails.name,
        productInfo.description = newDetails.description,
        productInfo.price = newDetails.price,
        productInfo.image = newDetails.file,
        productInfo.available = newDetails.available
      }
      catch(error) {
        console.log(error)
      }
    }

    const addProduct = (p) => {
      let product = { ...p };
      store.dispatch("addProduct", product);
    }

    onBeforeMount(() => {
      getProductInfo()
    })

    return {
      productInfo,
      addProduct
    }
  }
}
</script>

<style scoped>
.product-container {
  margin-top: 150px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 30px;
}

.product-img {
  width: 100%;
  margin-right: 70px;
}

.product-img img {
  max-width: 100%;
}

/* .product-body {
} */

.product-body .product-details {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 0 30px;
}

.product-details .product-name {
  padding: 20px 0;
  font-size: 42px;
  font-weight: bold;
}

.product-details .product-desc {
  padding: 20px 0;
}

.sub-details {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20 0px;
}

.sub-details .price {
  margin-right: 10px;
  font-weight: bold;
}

.sub-details .stock {
  padding: 5px 10px;
  background: #4a8b1e60;
  color: #fff;
  border-radius: 20px;
}

.sub-details .not-stock {
  padding: 5px 10px;
  background: #ec07079d;
  color: #fff;
  border-radius: 20px;
}

.to-cart {
  margin: 20px 0;
  border: none;
  border-radius: 20px;
  padding: 10px 20px;
  background: #333;
  color: #fff;
}

.to-cart:hover {
  background: #33333385;
}

@media(max-width: 800px) {
  .product-container {
    margin-top: 100px;
    flex-direction: column;
    padding: 0;
  }

  .product-img {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: auto;
    margin-bottom: 30px;
  }

  .product-body {
    background-image: linear-gradient(to right top, #fd1b2d, #dd1423, #bd0d1a, #9f0511, #820008);
    color: #fff;
    border-radius: 20px 20px 0 0;
    padding-top: 20px;
  }

  .product-details .product-name {
    padding: 10px 0;
    font-size: 22px;
    font-weight: bold;
    color: #fff;
  }

  .product-details .product-desc {
    padding-bottom: 20px;
    color: #fff;
  }

  .cart-section {
    width: 100%;
  }

  .to-cart {
    width: 100%;
  }
}
</style>