<template>
  <div class="products">
    <div class="recommended">
      <h2>All Products</h2>
      <div class="rp-container">
        <div class="rp-card" v-for="product in products" :key="product.id">
          <router-link :to="`/product/${product.name}`">
            <img :src="product.file" alt="headset">
          </router-link>
            <div class="details">
              <p class="price"><span> &#8358; </span>{{ formatPrice(product.price) }}</p>
              <p class="name">{{ product.name }}</p>
              <div class="buttons">
                <button class="view">
                  <router-link :to="`/product/${product.name}`">
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
</template>

<script>
import { onBeforeMount, computed } from 'vue'
import gettingProduct from '../composables/gettingProduct'
import { useStore } from 'vuex'

export default {
  setup() {
    const { getProduct } = gettingProduct()
    const store = useStore()
    // const imageSource = 
    // const productData = ref([])

    const addProduct = (p) => {
      let product = { ...p };
      store.dispatch("addProduct", product);
    }

    
    function formatPrice(value) {
      let val = (value/1).toFixed(2).replace(',', '.')
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    }

    onBeforeMount(() => {
      getProduct()
    })

    return {
      addProduct,
      products: computed(() => store.getters.getProducts),
      formatPrice
    }
  }
}
</script>

<style>
.products {
  margin-top: 20px;
  padding: 7px;
}

.recommended h2 {
  margin-bottom: 20px;
}

.rp-container {
  display: flex;
  align-items: stretch;
  justify-content: center;
  flex-wrap: wrap;
}

.rp-card {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  /* background-image: linear-gradient(to right top, #fd1b2d, #dd1423, #bd0d1a, #9f0511, #820008); */
  background-color: #2e2d2f;
  border-radius: 15px;
  margin: 10px;
  width: 230px;
  box-shadow: 0px 12px 24px -12px rgba(0, 0, 0, 0.5);
  -webkit-box-shadow: 0px 12px 24px -12px rgba(0, 0, 0, 0.5);
  padding: 20px;
}

.rp-card a img {
  max-width: 100%;
  display: inline-block;
  vertical-align: middle;
  transform: translateZ(0);
  box-shadow: 0 0 1px rgba(0, 0, 0, 0);
  backface-visibility: hidden;
  -moz-osx-font-smoothing: grayscale;
  transition-duration: 0.3s;
  transition-property: transform;
}

.rp-card a img:hover {
  transform: scale(1.1);
}

.details {
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  font-size: 0.7rem;
}

.details .price {
  color: #ecb0b8;
  margin-bottom: 10px;
}

.details .name {
  font-weight: bold;
  color: #dce4eb;
  margin-bottom: 10px;
}

.details .buttons {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0px -8px;
  margin-top: 10px;
}

.details .buttons .view {
  border: none;
  padding: 10px 25px;
  border-radius: 25px;
  background-color: #000103;
  color: #fff;
  margin-right: 7px;
}

.details .buttons .add-cart {
  border: none;
  padding: 10px;
  border-radius: 25px;
  background-color: #000103;
  color: #fff;
}

a {
  color: #fff;
  text-decoration: none;
}

@media(max-width: 800px) {
  .products {
    margin-top: 20px;
    padding: 10px;
  }

  .recommended h2 {
    margin-bottom: 10px;
  }

  .rp-card {
    width: 150px;
    padding: 20px;
  }
}
</style>