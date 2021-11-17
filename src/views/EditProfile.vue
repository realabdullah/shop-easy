<template>
  <Navbar />

  <loading v-model:active="isLoading" :can-cancel="true" :is-full-page="fullPage"/>

  <div class="login-root">
    <div class="box-root flex-flex flex-direction--column" style="min-height: 100vh;flex-grow: 1;">
      <div class="box-root flex-flex flex-direction--column" style="flex-grow: 1; z-index: 9;">
        <div class="formbg-outer">
          <div class="formbg">
            <div class="formbg-inner padding-horizontal--48">
              <span class="padding-bottom--15">Update Profile</span>
              <form id="stripe-login" @submit.prevent="updateProfile">
                <!-- <div class="field padding-bottom--24">
                  <label for="username">Username</label>
                  <input type="text" name="username" v-model="username">
                </div> -->
                <div class="field padding-bottom--24">
                  <label for="first-name">First Name</label>
                  <input type="text" name="first-name" v-model="profileUpdate.first_name">
                </div>
                <div class="field padding-bottom--24">
                  <label for="last-name">Last Name</label>
                  <input type="text" name="last-name" v-model="profileUpdate.last_name">
                </div>
                <!-- <div class="field padding-bottom--24">
                  <label for="email">Email</label>
                  <input type="email" name="email" v-model="profileUpdate.email">
                </div> -->
                <!-- <div class="field padding-bottom--24">
                  <div class="grid--50-50">
                    <label for="password">Password</label>
                  </div>
                  <input type="password" name="password" v-model="password">
                </div> -->
                <div class="field padding-bottom--24">
                  <label for="phone">Mobile Number</label>
                  <input type="telephone" name="phone" v-model="profileUpdate.phone">
                </div>
                <div class="field padding-bottom--24">
                  <label for="country">Country</label>
                  <input type="text" name="country" v-model="profileUpdate.country">
                </div>
                <div class="field padding-bottom--24">
                  <label for="state">State</label>
                  <input type="text" name="state" v-model="profileUpdate.state">
                </div>
                <div class="field padding-bottom--24"><button class="submi" v-if="loading">
                    <svg width="38" height="38" viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg" stroke="#fff">
                      <g fill="none" fill-rule="evenodd">
                        <g transform="translate(1 1)" stroke-width="2">
                          <circle stroke-opacity=".5" cx="18" cy="18" r="18"/>
                          <path d="M36 18c0-9.94-8.06-18-18-18">
                            <animateTransform
                                attributeName="transform"
                                type="rotate"
                                from="0 18 18"
                                to="360 18 18"
                                dur="1s"
                                repeatCount="indefinite"/>
                          </path>
                        </g>
                    </g>
                  </svg>
                  </button>
                  <button class="submit" v-else>Update</button>
                </div>
                <div class="field padding-bottom--24" v-if="updated">
                  <p class="updated">Profile updated successfully.</p>
                </div>
              </form>
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
import { reactive, ref, onBeforeMount } from 'vue'
import { supabase } from '../supabase'
import { useRouter } from 'vue-router'
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
    const profileUpdateData = ref([])
    const user = supabase.auth.user()
    const loading = ref(false)
    const updated = ref(false)
    const isLoading = ref(false)
    const fullPage = ref(true)

    const profileUpdate = reactive({
      first_name: '',
      last_name: '',
      phone: '',
      country: '',
      state: ''
    })

    const getProfileForUpdate = async () => {
      try {
        isLoading.value = true
        const data = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()
        const readyUpdate = profileUpdateData.value = data.data
        profileUpdate.first_name = readyUpdate.first_name,
        profileUpdate.last_name = readyUpdate.last_name,
        profileUpdate.phone = readyUpdate.phone,
        profileUpdate.country = readyUpdate.country,
        profileUpdate.state = readyUpdate.state
        isLoading.value = false
      }
      catch (err) {
        
      }
    }

    const updateProfile = async () => {
      try {
        loading.value = true
        let { error } = await supabase
        .from('profiles')
        .update({
          first_name: profileUpdate.first_name,
          last_name: profileUpdate.last_name,
          phone: profileUpdate.phone,
          country: profileUpdate.country,
          state: profileUpdate.state
        })
        .eq('id', user.id)
        .single()
        updateMeta()
        loading.value = false
        updated.value = true
      } catch (error) {
        // alert(error.message)
      }
    }

    const updateMeta = async () => {
      try {
        const { user } = await supabase.auth.update({ 
          data: {
            first_name: profileUpdate.first_name,
            last_name: profileUpdate.last_name,
            phone: profileUpdate.phone,
            country: profileUpdate.country,
            state: profileUpdate.state
          } 
        })
      }
      catch(error) {

      }
    }

    onBeforeMount(() => {
      getProfileForUpdate()
    })

    return {
      profileUpdate,
      updateProfile,
      loading,
      updated,
      isLoading,
      fullPage
    }
  }
}
</script>

<style scoped>
.submi {
  padding: 5px 16px;
  width: 100%;
  min-height: 44px;
  border: unset;
  border-radius: 4px;
  background-color: #353030;
  box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px, 
              rgba(0, 0, 0, 0) 0px 0px 0px 0px, 
              rgba(0, 0, 0, 0.12) 0px 1px 1px 0px, 
              #353030 0px 0px 0px 1px, 
              rgba(0, 0, 0, 0) 0px 0px 0px 0px, 
              rgba(0, 0, 0, 0) 0px 0px 0px 0px, 
              rgba(60, 66, 87, 0.08) 0px 2px 5px 0px;
  color: #fff;
  font-weight: 600;
  cursor: pointer;
}

.submi svg {
  width: 25px;
}
a {
  color: #353030;
  text-decoration: unset;
}
.login-root {
  background: #fff;
  display: flex;
}
.loginbackground {
  min-height: 692px;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
  z-index: 0;
  overflow: hidden;
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
.loginbackground-gridContainer {
  display: -ms-grid;
  display: grid;
  justify-content: center;
  margin: 0 -2%;
  transform: rotate(-12deg) skew(-12deg);
  grid-template-columns: [start] 1fr [left-gutter] repeat(16,86.6px) [left-gutter] 1fr [end];
  grid-template-rows: [top] 1fr [top-gutter] repeat(8,64px) [bottom-gutter] 1fr [bottom];
}
.box-divider--light-all-2 {
  box-shadow: inset 0 0 0 2px #e3e8ee;
}
.box-background--blue {
  background-color: #353030;
}
.box-background--white {
  background-color: #ffffff; 
}
.box-background--blue800 {
  background-color: #212d63;
}
.box-background--gray100 {
  background-color: #e3e8ee;
}
.box-background--cyan200 {
  background-color: #7fd3ed;
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

.formbg {
  margin: 0px auto;
  width: 100%;
  max-width: 448px;
  background: white;
  border-radius: 4px;
  box-shadow: rgba(60, 66, 87, 0.12) 0px 7px 14px 0px, rgba(0, 0, 0, 0.12) 0px 3px 6px 0px;
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
.reset-pass a,label {
  font-size: 14px;
  font-weight: 600;
  display: block;
}
.reset-pass > a {
  text-align: right;
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

.submit {
  font-size: 16px;
  line-height: 28px;
  padding: 8px 16px;
  width: 100%;
  min-height: 44px;
  border: unset;
  border-radius: 4px;
  background-color: #353030;
  box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px, 
              rgba(0, 0, 0, 0) 0px 0px 0px 0px, 
              rgba(0, 0, 0, 0.12) 0px 1px 1px 0px, 
              #353030 0px 0px 0px 1px, 
              rgba(0, 0, 0, 0) 0px 0px 0px 0px, 
              rgba(0, 0, 0, 0) 0px 0px 0px 0px, 
              rgba(60, 66, 87, 0.08) 0px 2px 5px 0px;
  color: #fff;
  font-weight: 600;
  cursor: pointer;
}
.field-checkbox input {
  width: 20px;
  height: 15px;
  margin-right: 5px; 
  box-shadow: unset;
  min-height: unset;
}
.field-checkbox label {
  display: flex;
  align-items: center;
  margin: 0;
}
.updated {
  color: #008000;
  font-weight: 600;
}
.footer-link span {
  font-size: 14px;
  text-align: center;
}
.listing a {
  color: #697386;
  font-weight: 600;
  margin: 0 10px;
}

.animationRightLeft {
  animation: animationRightLeft 2s ease-in-out infinite;
}
.animationLeftRight {
  animation: animationLeftRight 2s ease-in-out infinite;
}
.tans3s {
  animation: animationLeftRight 3s ease-in-out infinite;
}
.tans4s {
  animation: animationLeftRight 4s ease-in-out infinite;
}

@keyframes animationLeftRight {
  0% {
    transform: translateX(0px);
  }
  50% {
    transform: translateX(1000px);
  }
  100% {
    transform: translateX(0px);
  }
} 

@keyframes animationRightLeft {
  0% {
    transform: translateX(0px);
  }
  50% {
    transform: translateX(-1000px);
  }
  100% {
    transform: translateX(0px);
  }
} 
</style>