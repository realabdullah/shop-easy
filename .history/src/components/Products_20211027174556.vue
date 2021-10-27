<template>
  <div class="products">
    <div class="recommended">
      <h2>Recommended Products</h2>
      <div class="rp-container">
        <div class="rp-card" v-for="produce in products" :key="produce.id">
          <router-link :to="{ name: 'Product', params: { name: produce.name }}">
            <img :src="produce.file" alt="headset">
            <div class="details">
              <p class="price">${{ produce.price }}</p>
              <p class="name">{{ produce.name }}</p>
              <div class="buttons">
                <button class="view">View</button>
                <button class="add-cart">
                  <i class="fas fa-cart-plus"></i>
                </button>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onBeforeMount, computed } from 'vue'
import gettingProduct from '../composables/gettingProduct'
import { useStore } from 'vuex';

export default {
  setup() {
    const { getProduct } = gettingProduct()
    const store = useStore()
    // const imageSource = 
    // const productData = ref([])

    const addProduct = (p) {
      let product = { ...p };
      store.dispatch("addProduct", product);
    }

    onBeforeMount(() => {
      getProduct()
    })

    return {
      products: computed(() => store.getters.getProducts)
    }
  }
}
</script>

<style>
.products {
  margin-top: 300px;
  /* margin-left: 300px; */
  padding: 30px;
}

.recommended h2 {
  margin-bottom: 20px;
}

.rp-container {
  display: flex;
  align-items: stretch;
  flex-wrap: wrap;
}

.rp-card {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  flex: 1 16%;
  background-image: linear-gradient(to right top, #fd1b2d, #dd1423, #bd0d1a, #9f0511, #820008);
  border-radius: 15px;
  margin: 10px;
  height: auto;
  box-shadow: 0px 12px 24px -12px rgba(0, 0, 0, 0.5);
  -webkit-box-shadow: 0px 12px 24px -12px rgba(0, 0, 0, 0.5);
 padding: 2%;
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
}

.details .buttons .view {
  border: none;
  padding: 10px 25px;
  border-radius: 25px;
  background-color: #850009;
  color: #fff;
  margin-right: 17px;
}

.details .buttons .add-cart {
  border: none;
  padding: 10px;
  border-radius: 25px;
  background-color: #850009;
  color: #fff;
}

a {
  text-decoration: none;
}

@media(max-width: 800px) {
  .products {
    margin-top: 70px;
    padding: 10px;
  }

  .recommended h2 {
    margin-bottom: 10px;
  }
}
</style>