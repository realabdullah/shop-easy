<template>
  <Navbar />
  <div class="user">

    <loading v-model:active="isLoading" :can-cancel="true" :is-full-page="fullPage"/>

    <div class="welcome">
      <div class="d">
        <h3>Welcome, {{ userInfo.first_name }}</h3>
        <p>{{ userInfo.email }}</p>
      </div>
      <div class="logout">
        <button @click="logOut">
          Log Out
        </button>
      </div>
    </div>
    
    <div class="details">
      <h2>Account Details</h2>
      <div class="adetails">
        <li>{{ userInfo.first_name }}</li>
        <li>{{ userInfo.last_name }}</li>
        <li>{{ userInfo.email }}</li>
        <li>{{ userInfo.phone }}</li>
        <li>{{ userInfo.country }}</li>
        <li>{{ userInfo.state }}</li>
      </div>
    </div>

    <div class="details">
      <h2>Account Settings</h2>
      <div class="adetails">
        <li>
          <router-link :to="`/edit/${userInfo.first_name}`">
            Edit Profile
          </router-link>
        </li>
        <li>
          <router-link to="/change-password/">
            Change Password
          </router-link>
        </li>
      </div>
    </div>
  </div>
  <Footer />
</template>

<script>
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'
import { ref, reactive, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '../supabase'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'

export default {
  components: {
    Navbar,
    Footer,
    Loading
  },
  setup() {
    const router = useRouter()
    const userInfoHolder = ref([])
    const user = supabase.auth.user()
    const isLoading = ref(false)
    const fullPage = ref(true)

    const userInfo = reactive({
      id: '',
      first_name: '',
      last_name: '',
      phone: '',
      email: '',
      country: '',
      state: ''
    })

    const getUserInfo = async () => {
      try {
        isLoading.value = true
        const data = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()
        const userData = userInfoHolder.value = data.data
        userInfo.id = userData.id,
        userInfo.first_name = userData.first_name,
        userInfo.last_name = userData.last_name,
        userInfo.phone = userData.phone,
        userInfo.email = userData.email,
        userInfo.country = userData.country,
        userInfo.state = userData.state
        isLoading.value = false
      }
      catch(error) {
        // console.log(error)
      }
    }

    const logOut = () => {
      try {
        const { error } = supabase.auth.signOut()
        router.push('/')
      }
      catch(error) {
        // console.log(error)
      }
    }

    onBeforeMount(() => {
      getUserInfo()
      const user = supabase.auth.user()
    })

    return {
      userInfo,
      logOut,
      isLoading,
      fullPage
    }
  }
}
</script>

<style scoped>
@import url(https://fonts.googleapis.com/css?family=Lato:300,400,700);
@import url(https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css);

.welcome {
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  background-color: #2e2b2bd7;
  color: #fff;
}

.logout button {
  border: none;
  outline: none;
  padding: 7px 13px;
  border-radius: 10px;
  background: #fff;
  color: rgb(53, 48, 48);
  font-size: 0.7rem;
  margin-left: 15px;
}

.logout button:hover {
  cursor: pointer;
  background: rgb(53, 48, 48);
  color: #fff;
}

.details h2 {
  width: 100%;
  padding: 10px 20px;
  background-color: #2e2b2bb2;
  color: #fff;
}

.settings h2 {
  width: 100%;
  padding: 10px 20px;
  background-color: #2e2b2bb2;
  color: #fff;
}

.adetails {
  width: 100%;
  width: -webkit-fill-available;
  width: -moz-available;
  width: stretch;
  padding: 20px;
  margin: 15px 10px;
  background-color: #E8E8E8;
  border-radius: 10px;
}

.adetails li {
  font-size: 0.9rem;
  padding: 10px 20px;
  list-style-type: none;
  border-bottom: 0.01rem solid #333;
}

.adetails li a {
  color: #2e2b2b;
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
  width: 35px;
  margin-right: 10px;
}
.shopping-cart .shopping-cart-items .item-name {
  text-align: center;
  font-size: 0.8rem;
}
.shopping-cart .shopping-cart-items .item-price {
  font-size: 0.8rem;
  color: #353030;
  margin-left: 10px;
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

.lighter-text {
  padding-right: 7px;
}
</style>