<template>
  <div class="products">
    <div class="recommended">
      <h2>Recommended Products</h2>
      <div class="rp-container">
        <div class="rp-card" v-for="produce in productData">
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
        <!-- <div class="rp-card">
          <router-link :to="{ name: 'Product', params: { name: product.name }}">
            <img src="../assets/headset.png" alt="headset">
            <div class="details">
              <p class="price">$120.10</p>
              <p class="name">Sony Ultimate Ears</p>
              <div class="buttons">
                <button class="view">View</button>
                <button class="add-cart">
                  <i class="fas fa-cart-plus"></i>
                </button>
              </div>
            </div>
          </router-link>
        </div>
        <div class="rp-card">
          <router-link :to="{ name: 'Product', params: { name: product.name }}">
            <img src="../assets/airmax.png" alt="airmax">
            <div class="details">
              <p class="price">$320.10</p>
              <p class="name">Nike - Airmax Sneakers</p>
              <div class="buttons">
                <button class="view">View</button>
                <button class="add-cart">
                  <i class="fas fa-cart-plus"></i>
                </button>
              </div>
            </div>
          </router-link>
        </div>
        <div class="rp-card">
          <router-link :to="{ name: 'Product', params: { name: product.name }}">
            <img src="../assets/airpod.png" alt="airpod">
            <div class="details">
              <p class="price">$199.99</p>
              <p class="name">Apple - Airpods Pro</p>
              <div class="buttons">
                <button class="view">View</button>
                <button class="add-cart">
                  <i class="fas fa-cart-plus"></i>
                </button>
              </div>
            </div>
          </router-link>
        </div>
        <div class="rp-card">
          <router-link :to="{ name: 'Product', params: { name: product.name }}">
            <img src="../assets/cap.png" alt="cap">
            <div class="details">
              <p class="price">$365.00</p>
              <p class="name">Nike - Face Cap</p>
              <div class="buttons">
                <button class="view">View</button>
                <button class="add-cart">
                  <i class="fas fa-cart-plus"></i>
                </button>
              </div>
            </div>
          </router-link>
        </div>
        <div class="rp-card">
          <router-link :to="{ name: 'Product', params: { name: product.name }}">
            <img src="../assets/hisense.png" alt="hisense">
            <div class="details">
              <p class="price">$1,320.00</p>
              <p class="name">HiSense 50" Smart UHD 4K TV+</p>
              <div class="buttons">
                <button class="view">View</button>
                <button class="add-cart">
                  <i class="fas fa-cart-plus"></i>
                </button>
              </div>
            </div>
          </router-link>
        </div>
        <div class="rp-card">
          <router-link :to="{ name: 'Product', params: { name: product.name }}">
            <img src="../assets/iphone.png" alt="iphone">
            <div class="details">
              <p class="price">$1,200.00</p>
              <p class="name">Apple - Iphone 13</p>
              <div class="buttons">
                <button class="view">View</button>
                <button class="add-cart">
                  <i class="fas fa-cart-plus"></i>
                </button>
              </div>
            </div>
          </router-link>
        </div>
        <div class="rp-card">
          <router-link :to="{ name: 'Product', params: { name: product.name }}">
            <img src="../assets/nike-bag.png" alt="nike-bag">
            <div class="details">
              <p class="price">$119.23</p>
              <p class="name">SNike Backpack - Blue</p>
              <div class="buttons">
                <button class="view">View</button>
                <button class="add-cart">
                  <i class="fas fa-cart-plus"></i>
                </button>
              </div>
            </div>
          </router-link>
        </div>
        <div class="rp-card">
          <router-link :to="{ name: 'Product', params: { name: product.name }}">
            <img src="../assets/samsung.png" alt="samsung">
            <div class="details">
              <p class="price">$799.00</p>
              <p class="name">Samsung Galaxy S21</p>
              <div class="buttons">
                <button class="view">View</button>
                <button class="add-cart">
                  <i class="fas fa-cart-plus"></i>
                </button>
              </div>
            </div>
          </router-link>
        </div>
        <div class="rp-card">
          <router-link :to="{ name: 'Product', params: { name: product.name }}">
            <img src="../assets/tv.png" alt="tv">
            <div class="details">
              <p class="price">$420.60</p>
              <p class="name">Itel 19" Inches A1940BE HD ELED TV</p>
              <div class="buttons">
                <button class="view">View</button>
                <button class="add-cart">
                  <i class="fas fa-cart-plus"></i>
                </button>
              </div>
            </div>
          </router-link>
        </div>
        <div class="rp-card">
          <router-link :to="{ name: 'Product', params: { name: product.name }}">
            <img src="../assets/headset.png" alt="headset">
            <div class="details">
              <p class="price">$120.10</p>
              <p class="name">Sony Ultimate Ears</p>
              <div class="buttons">
                <button class="view">View</button>
                <button class="add-cart">
                  <i class="fas fa-cart-plus"></i>
                </button>
              </div>
            </div>
          </router-link>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import { onBeforeMount, ref } from 'vue'
import { supabase } from '../supabase'

export default {
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
</style>