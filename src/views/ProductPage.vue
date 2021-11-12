<template>
  <Navbar />

  <div class="ccontainer">
    <div class="ccard">
      <div class="card-head">
        <img :src="productInfo.file" alt="logo" class="card-logo">
        <div class="product-detail">
          <h2>{{ productInfo.name }}</h2>
        </div>
        <img :src="productInfo.file" alt="Shoe" class="product-img">
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
              <span> &#8358; </span><b>{{ productInfo.price.toLocaleString() }}</b>
            </span>
          </div>
          <span @click="addProduct(productInfo)" class="cart-button">
            Add to cart
          </span>
        </div>
      </div>
      <span @click="addProduct(productInfo)" class="cart-button">
        Add to cart
      </span>
    </div>
  </div>

  <div class="review">
    <h3>Make a review</h3>
    <form @submit.prevent="sendReview">
      <textarea cols="30" rows="5" v-model="dReview"></textarea>
      <button type="submit">Submit</button>
    </form>

    <div class="reviews">
      <div class="reviewdata" v-for="review in reviewsCon" :key="review.uid" v-if="reviewsCon.length">
        <li>
          {{ review.review }}
          <span>{{ review.created_at }}</span>
        </li>
      </div>

      <div class="empty" v-else>
        <p>No reviews on this product yet!</p>
      </div>
    </div>
  </div>

  <Footer />
</template>

<script>
import { ref, reactive, computed, onBeforeMount, onUpdated } from 'vue'
import { useRoute } from 'vue-router'
import { supabase } from '../supabase'
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'
import { useStore } from 'vuex'

export default {
  components: {
    Navbar,
    Footer
  },
  setup() {
    const store = useStore()
    const route = useRoute()
    const singleProductName = computed(() => route.params.name)
    const productInfoHolder = ref([])
    const dReview = ref('')
    const reviewsCon = ref([])

    const productInfo = reactive({
      id: '',
      file: '',
      name: '',
      description: '',
      price: '',
      available: ''
    })

    function formatPrice(value) {
      let val = (value/1).toFixed(2).replace(',', '.')
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    }

    const sendReview = async () => {
      try {
        const productReview = dReview.value
        const { data, error } = await supabase
        .from('reviews')
        .insert([
          { id: productInfo.id, review: productReview }
        ])
          dReview.value = ''
        if (error) {
          alert(error.message)
          console.error('There was an error inserting', error)
          return null
        }
      } catch (err) {
        console.log(err)
      }
    }

    const getProductInfo = async () => {
      try {
        const data = await supabase
        .from('products')
        .select('*')
        .eq('name', singleProductName.value)
        .single()
        const newDetails = productInfoHolder.value = data.data
        productInfo.id = newDetails.id,
        productInfo.name = newDetails.name,
        productInfo.description = newDetails.description,
        productInfo.price = newDetails.price,
        productInfo.file = newDetails.file,
        productInfo.available = newDetails.available
      }
      catch(error) {
        console.log(error)
      }
    }

    const getReviews = async () => {
      try {
        const revId = productInfo.id
        const { data: reviews, error } = await supabase
        .from('reviews')
        .select('*')
        .eq('id', revId)
        reviewsCon.value = reviews
      } catch (error) {
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

    // onMounted(() => {
    //   getReviews()
    // })

    onUpdated(() => {
      getReviews()
    })

    return {
      productInfo,
      addProduct,
      formatPrice,
      sendReview,
      dReview,
      reviewsCon
    }
  }
}
</script>

<style scoped>
.ccontainer {
  margin: 60px auto;
  margin-bottom: 0px;
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
  backdrop-filter: blur(20px);
  background-color: rgb(46, 45, 47, 0.9);
  /* Old browsers */
  /* background: -moz-linear-gradient(-45deg, #fa782e 8%, #c82930 83%); */
  /* FF3.6-15 */
  /* background: -webkit-linear-gradient(-45deg, #fa782e 8%, #c82930 83%); */
  /* Chrome10-25,Safari5.1-6 */
  /* background: linear-gradient(135deg, #fa782e 8%, #c82930 83%); */
  /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
  /* filter: progid: DXImageTransform.Microsoft.gradient( startColorstr='#fa782e', endColorstr='#c82930', GradientType=1); */
}

.card-logo {
  width: 55px;
  margin: 20px;
}

.product-img {
  width: 100%;
  height: auto;
  padding: 20px;
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
  font-size: 1.3rem;
  font-weight: 400;
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
  margin-top: 15px;
  margin-left: 20px;
}

.cart-button {
  position: relative;
  bottom: 0;
  left: 0;
  right: 0;
  width: auto;
  border: none;
  background: rgb(46, 45, 47);
  padding: 7px 20px;
  text-align: center;
  display: inline-block;
  font-size: 1.3rem;
  font-weight: 200;
  color: #fff;
  border-radius: 7px;
  box-shadow: -10px 20px 15px -10px rgba(17, 233, 91, 0.3);
  margin: 20px;
  margin-top: 30px;
  cursor: pointer;
}

.product-price b {
  margin-left: 3px;
}

.product-desc .cart-button {
  display: none;
}

.review {
  margin: 40px;
}

.review form {
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.review form textarea {
  padding: 10px;
  outline: none;
  resize: none;
  margin-bottom: 15px;
  border-radius: 7px;
}

.review form button {
  padding: 10px;
  border: none;
  border-radius: 7px;
  background-color: rgb(46, 45, 47);
  color: #fff;
}

.reviews {
  margin: 40px;
}

.reviewdata {
  padding: 10px;
}

.reviewdata li {
  display: flex;
  flex-direction: column;
}

.reviewdata li span {
  margin-top: 5px;
  font-size: 0.6rem;
}

@media(max-width: 800px) {
  .ccard {
    display: flex;
    flex-direction: column;
  }

  .product-desc {
    display: flex;
    flex-direction: column;
  }

  .reviews {
    margin: 20px;
  }
}

@media(min-width: 801px) {
  .ccard {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }

  .card-head {
    width: 50%;
    padding: 25px;
    background: none;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    flex-direction: column;
  }

  .card-body {
    width: 50%;
    padding-right: 100px;
  }

  .card-head .card-logo {
    width: 55px;
    margin: 20px 0;
  }

  .product-detail {
    margin: 20px 0;
    color: #333;
  }

  .product-img {
    margin: 20px 0;
    max-width: 100%;
    height: auto;
  }

  .cart-button {
    display: none;
  }

  .product-title {
    margin-bottom: 20px;
  }

  .product-caption {
    margin: 20px 0;
    font-size: 1.5rem;
    line-height: 2.4rem;
  }

  .product-price {
    margin: 20px 0;
  } 

  .product-desc .cart-button {
    display: block;
    padding: 15px;
    cursor: pointer;
  }
}
</style>
