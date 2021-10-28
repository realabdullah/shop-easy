<template>
  <Navbar />
  <div class="shopping-cart">
    <ul class="shopping-cart-items">
      <li class="clearfix" v-for="item in cart" :key="item.id">
        <img :src="item.file" alt="admin">
        <span class="item-name">{{ item.name }}</span>
        <span class="item-price"><span> &#8358; </span>{{ formatPrice(item.price) }}</span>
      </li>
    </ul>

    <div class="shopping-cart-header">
      <i class="fa fa-shopping-cart cart-icon"></i><span class="badge">{{cart.length}}</span>
      <div class="shopping-cart-total">
        <span class="lighter-text">Total: <span> &#8358; </span>{{ formatPrice(total) }}</span>
        <!-- <span class="main-color-text">$2,229.97</span> -->
      </div>
    </div> <!--end shopping-cart-header -->

    <a href="#" class="button">Proceed to payment</a>
  </div> <!--end shopping-cart -->
</template>

<script>
import Navbar from '../components/Navbar.vue'
import { supabase } from '../supabase'
import { ref, onBeforeMount, computed } from 'vue'
import { useStore } from 'vuex'

export default {
  components: {
    Navbar
  },
  setup() {
    const store = useStore()

    function formatPrice(value) {
      let val = (value/1).toFixed(2).replace(',', '.')
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    }

    return {
      cart: computed(() => store.getters.getCart),
      total: computed(() => store.getters.getTotal),
      formatPrice
    }
  }
}
</script>

<style scoped>
@import url(https://fonts.googleapis.com/css?family=Lato:300,400,700);
@import url(https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css);

.shopping-cart {
  margin-top: 100px;
  padding: 20px;
}
.shopping-cart .shopping-cart-header {
  border-bottom: 1px solid #E8E8E8;
  padding-bottom: 15px;
}
.shopping-cart .shopping-cart-header .shopping-cart-total {
  float: right;
}
.shopping-cart .shopping-cart-items {
  padding-top: 20px;
}
.shopping-cart .shopping-cart-items li {
  margin-bottom: 18px;
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
}
.shopping-cart .shopping-cart-items img {
  width: 100px;
  margin-right: 10px;
}
.shopping-cart .shopping-cart-items .item-name {
  display: block;
  font-size: 16px;
}
.shopping-cart .shopping-cart-items .item-price {
  color: #6394F8;
  margin-left: 20px;
  margin-right: 8px;
}
.shopping-cart .shopping-cart-items .item-quantity {
  color: #ABB0BE;
}
.shopping-cart:after {
  bottom: 100%;
  left: 89%;
  border: solid transparent;
  content: " ";
  height: 0;
  width: 0;
  position: absolute;
  pointer-events: none;
  border-bottom-color: white;
  border-width: 8px;
  margin-left: -8px;
}
.cart-icon {
  color: #515783;
  font-size: 24px;
  margin-right: 7px;
  float: left;
}
.button {
  background: #6394F8;
  color: white;
  text-align: center;
  padding: 12px;
  text-decoration: none;
  display: block;
  border-radius: 3px;
  font-size: 16px;
  margin: 25px 0 15px 0;
}
.button:hover {
  background: #729ef9;
}
.clearfix:after {
  content: "";
  display: table;
  clear: both;
}
</style>