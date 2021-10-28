<template>
  <Navbar />

  <!-- <div class="product-container">
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
  </div> -->

  <div class="ccontainer">
    <div class="ccard">
      <div class="card-head">
        <img :src="productInfo.image" alt="logo" class="card-logo">
        <img :src="productInfo.image" alt="Shoe" class="product-img">
        <div class="product-detail">
          <h2>{{ productInfo.name }}</h2>
        </div>
        <span class="back-text">
          FAS
        </span>
      </div>
      <div class="card-body">
        <div class="product-desc">
          <span class="product-title">
            <b>{{ productInfo.name }}</b>
            <span class="badge">
              New
            </span>
          </span>
          <span class="product-caption">
            {{ productInfo.description }}
          </span>
          <div class="product-properties">
            <span class="product-price">
              USD<b>{{ productInfo.price }}</b>
            </span>
            <span class="cart-button">
              Add to cart
            </span>
          </div>
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
.ccontainer {
  margin: 60px auto;
}

.ccard {
  display: flex;
}

.card-head {
  position: relative;
  height: auto;
  padding: 5px;
  padding-bottom: 20px;
  overflow: hidden;
  background: #fa782e;
  /* Old browsers */
  background: -moz-linear-gradient(-45deg, #fa782e 8%, #c82930 83%);
  /* FF3.6-15 */
  background: -webkit-linear-gradient(-45deg, #fa782e 8%, #c82930 83%);
  /* Chrome10-25,Safari5.1-6 */
  background: linear-gradient(135deg, #fa782e 8%, #c82930 83%);
  /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
  filter: progid: DXImageTransform.Microsoft.gradient( startColorstr='#fa782e', endColorstr='#c82930', GradientType=1);
}

.card-logo {
  width: 55px;
  margin: 20px;
}

.product-img {
  position: absolute;
  margin-top: -55px;
}

.product-detail {
  padding: 0 20px;
  font-size: 11px;
  color: #fff;
}

.product-detail h2 {
  font-size: 18px;
  font-weight: 500;
  letter-spacing: 2px;
  padding-bottom: 10px;
  text-transform: uppercase;
}

.back-text {
  display: inline-block;
  font-size: 125px;
  font-weight: 900;
  margin-left: -7px;
  margin-top: -12px;
  opacity: 0.1;
}

.card-body {
  height: auto;
}

.product-title {
  padding: 20px;
  display: block;
  font-size: 17px;
  font-weight: 500;
  letter-spacing: 1px;
  text-transform: uppercase;
}

.product-title b {
  font-weight: 900;
  letter-spacing: 0px;
}

.badge {
  position: relative;
  font-size: 10px;
  font-weight: 300;
  color: #fff;
  background: #11e95b;
  padding: 2px 5px;
  border-radius: 4px;
  top: -2px;
  margin-left: 5px;
}

.product-caption {
  display: block;
  padding: 0 20px;
  font-size: 20px;
  font-weight: 400;
  text-transform: uppercase;
}

.product-price {
  background: #11e95b;
  padding: 7px 20px;
  text-align: center;
  display: inline-block;
  font-size: 1.3rem;
  font-weight: 200;
  color: #fff;
  border-radius: 7px;
  box-shadow: -10px 20px 15px -10px rgba(17, 233, 91, 0.3);
  margin: 20px;
}

.cart-button {
  background: #6952df;
  padding: 7px 20px;
  text-align: center;
  display: inline-block;
  font-size: 1.3rem;
  font-weight: 200;
  color: #fff;
  border-radius: 7px;
  box-shadow: -10px 20px 15px -10px rgba(17, 233, 91, 0.3);
  margin: 20px;
}

.product-price b {
  margin-left: 3px;
}


/* .product-container {
  margin-top: 150px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 30px;
} */

/* .product-img {
  width: 100%;
  margin-right: 70px;
} */

/* .product-img img {
  max-width: 100%;
} */

/* .product-body {
} */

/* .product-body .product-details {
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
} */

@media(max-width: 800px) {
  .ccard {
    display: flex;
    flex-direction: column;
  }


  /* .product-container {
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
  } */
}
</style>
