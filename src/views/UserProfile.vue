<template>
  <Navbar />
  <div class="user">
    <h2>User Info</h2>
    <p>{{ userInfo.first_name }}</p>
    <p>{{ userInfo.last_name }}</p>
    <p>{{ userInfo.email }}</p>
    <p>{{ userInfo.phone }}</p>
    <p>{{ userInfo.country }}</p>
    <p>{{ userInfo.state }}</p>

    <h2>Cart</h2>
    <p></p>

  </div>
  <button @click="logOut">
    Log Out
  </button>
  <Footer />
</template>

<script>
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'
import { ref, reactive, computed, onBeforeMount } from 'vue'
import { useRoute } from 'vue-router'
import { supabase } from '../supabase'
export default {
  components: {
    Navbar,
    Footer
  },
  setup() {
    const route = useRoute()
    const userInfoHolder = ref([])
    const user = supabase.auth.user()

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
      }
      catch(error) {
        console.log(error)
      }
    }

    const logOut = () => {
      try {
        const { error } = supabase.auth.signOut()
      }
      catch(error) {
        console.log(error)
      }
    }

    onBeforeMount(() => {
      getUserInfo()
      const user = supabase.auth.user()
    })

    return {
      userInfo,
      logOut
    }
  }
}
</script>

<style>

</style>