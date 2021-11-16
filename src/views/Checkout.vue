<template>
  <Navbar />
  <div class="checkout-cont">
    <div class="shopping-cart">
      <div class="box-root padding-top--48 padding-bottom--24 flex-flex flex-justifyContent--center">
        <h1>Your Cart ({{cart.length}})</h1>
      </div>
      <ul class="shopping-cart-items">
        <li class="clearfix" v-for="item in cart" :key="item.id">
          <img :src="item.file" alt="admin">
          <span class="item-name">{{ item.name }}</span>
          <span class="item-price">
            <span> &#8358; {{ formatPrice(item.price) }}</span>
          </span>
        </li>
      </ul>

      <div class="shopping-cart-header">
        <span class="badge">
          <i class="fa fa-shopping-cart cart-icon"></i>
          {{cart.length}}
        </span>
        <div class="shopping-cart-total">
          <span class="lighter-text">Total: </span>
          <span> &#8358; {{ formatPrice(total) }} </span>
          <!-- <span class="main-color-text">$2,229.97</span> -->
        </div>
      </div> <!--end shopping-cart-header -->
    </div><!--end shopping-cart -->
    
    <div>
      <div class="login-root">
        <div class="box-root flex-flex flex-direction--column" style="min-height: 100vh;flex-grow: 1;">
          <div class="box-root padding-top--24 flex-flex flex-direction--column" style="flex-grow: 1; z-index: 9;">
            <div class="box-root padding-top--48 padding-bottom--24 flex-flex flex-justifyContent--center">
              <h1>Shipping Details</h1>
            </div>
            <div class="formbg-outer">
              <div class="formbg">
                <div class="formbg-inner padding-horizontal--48">
                  <span class="padding-bottom--15">Fill with your details.</span>
                  <form id="stripe-login">
                    <div class="field padding-bottom--24">
                      <label for="name">Full Name</label>
                      <input type="text" name="name">
                    </div>
                    <div class="field padding-bottom--24">
                      <label for="email">Email Address</label>
                      <input type="email" name="email">
                    </div>
                    <div class="field padding-bottom--24">
                      <label for="password">Password</label>
                      <input type="password" name="password">
                    </div>
                    <div class="field padding-bottom--24">
                      <label for="address">Address</label>
                      <input type="text" name="address">
                    </div>
                    <div class="field padding-bottom--24">
                      <label for="city">City</label>
                      <input type="text" name="city">
                    </div>
                    <div class="field padding-bottom--24">
                      <label for="state">State</label>
                      <input type="text" name="state">
                    </div>
                    <div class="field padding-bottom--24">
                      <label for="country">Country</label>
                      <input type="text" name="country">
                    </div>
                    <div class="field padding-bottom--24">
                      <input type="submit" name="submit" value="Continue">
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div> 
  </div>
  <Footer />
</template>

<script>
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'
import { supabase } from '../supabase'
import { ref, onBeforeMount, computed } from 'vue'
import { useStore } from 'vuex'

export default {
  components: {
    Navbar,
    Footer
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

.checkout-cont {
  display: flex;
  align-items: flex-start;
  justify-content: space-evenly;
}

.shopping-cart {
  padding: 20px;
}
.shopping-cart .shopping-cart-header {
  padding-top: 15px;
  border-bottom: 1px solid #E8E8E8;
  padding-bottom: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.shopping-cart-total {
  display: flex;

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
  color: #353030;;
  margin-left: 20px;
  margin-right: 8px;
}
.shopping-cart .shopping-cart-items .item-quantity {
  color: #ABB0BE;
}
.cart-icon {
  color: #515783;
  font-size: 24px;
  margin-right: 7px;
  float: left;
}
.button {
  background: #353030;
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
  background: #2e2b2b;
}
.clearfix:after {
  content: "";
  display: table;
  clear: both;
}

.lighter-text {
  padding-right: 7px;
}

h1 {
    letter-spacing: -1px;
}
a {
  color: #353030;
  text-decoration: unset;
}
.login-root {
    display: flex;
}
.flex-flex {
    display: flex;
}
.align-center {
  align-items: center; 
}
.center-center {
  align-items: center;
  justify-content: center;
}
.box-root {
    box-sizing: border-box;
}
.flex-direction--column {
    -ms-flex-direction: column;
    flex-direction: column;
}
.padding-top--64 {
  padding-top: 64px;
}
.padding-top--24 {
  padding-top: 24px;
}
.padding-top--48 {
  padding-top: 48px;
}
.padding-bottom--24 {
  padding-bottom: 24px;
}
.padding-horizontal--48 {
  padding: 48px;
}
.padding-bottom--15 {
  padding-bottom: 15px;
}
.flex-justifyContent--center {
  -ms-flex-pack: center;
  justify-content: center;
}
span {
    display: block;
    font-size: 20px;
    line-height: 28px;
    color: #1a1f36;
}
label {
    margin-bottom: 10px;
}
.grid--50-50 {
    display: grid;
    grid-template-columns: 50% 50%;
    align-items: center;
}

.field input {
  font-size: 16px;
  line-height: 28px;
  padding: 8px 16px;
  width: 100%;
  min-height: 44px;
  border: unset;
  border-radius: 4px;
  outline-color: rgb(84 105 212 / 0.5);
  background-color: rgb(255, 255, 255);
  box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px, 
              rgba(0, 0, 0, 0) 0px 0px 0px 0px, 
              rgba(0, 0, 0, 0) 0px 0px 0px 0px, 
              rgba(60, 66, 87, 0.16) 0px 0px 0px 1px, 
              rgba(0, 0, 0, 0) 0px 0px 0px 0px, 
              rgba(0, 0, 0, 0) 0px 0px 0px 0px, 
              rgba(0, 0, 0, 0) 0px 0px 0px 0px;
}

input[type="submit"] {
  background-color: #353030;
  box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px, 
              rgba(0, 0, 0, 0) 0px 0px 0px 0px, 
              rgba(0, 0, 0, 0.12) 0px 1px 1px 0px, 
              rgb(53, 48, 48) 0px 0px 0px 1px, 
              rgba(0, 0, 0, 0) 0px 0px 0px 0px, 
              rgba(0, 0, 0, 0) 0px 0px 0px 0px, 
              rgba(60, 66, 87, 0.08) 0px 2px 5px 0px;
  color: #fff;
  font-weight: 600;
  cursor: pointer;
}

@media(max-width: 800px) {
  .checkout-cont {
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
}
</style>