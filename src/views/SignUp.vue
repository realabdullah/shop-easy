<template>
  <Navbar :curUser="curUser" />
  <div class="login-root">
    <div class="box-root flex-flex flex-direction--column" style="min-height: 100vh;flex-grow: 1;">
      <div class="loginbackground box-background--white padding-top--64">
        <div class="loginbackground-gridContainer">
          <div class="box-root flex-flex" style="grid-area: top / start / 8 / end;">
            <div class="box-root" style="background-image: linear-gradient(white 0%, rgb(247, 250, 252) 33%); flex-grow: 1;">
            </div>
          </div>
          <div class="box-root flex-flex" style="grid-area: 4 / 2 / auto / 5;">
            <div class="box-root box-divider--light-all-2 animationLeftRight tans3s" style="flex-grow: 1;"></div>
          </div>
          <div class="box-root flex-flex" style="grid-area: 6 / start / auto / 2;">
            <div class="box-root box-background--blue800" style="flex-grow: 1;"></div>
          </div>
          <div class="box-root flex-flex" style="grid-area: 7 / start / auto / 4;">
            <div class="box-root box-background--blue animationLeftRight" style="flex-grow: 1;"></div>
          </div>
          <div class="box-root flex-flex" style="grid-area: 8 / 4 / auto / 6;">
            <div class="box-root box-background--gray100 animationLeftRight tans3s" style="flex-grow: 1;"></div>
          </div>
          <div class="box-root flex-flex" style="grid-area: 2 / 15 / auto / end;">
            <div class="box-root box-background--cyan200 animationRightLeft tans4s" style="flex-grow: 1;"></div>
          </div>
          <div class="box-root flex-flex" style="grid-area: 3 / 14 / auto / end;">
            <div class="box-root box-background--blue animationRightLeft" style="flex-grow: 1;"></div>
          </div>
          <div class="box-root flex-flex" style="grid-area: 4 / 17 / auto / 20;">
            <div class="box-root box-background--gray100 animationRightLeft tans4s" style="flex-grow: 1;"></div>
          </div>
          <div class="box-root flex-flex" style="grid-area: 5 / 14 / auto / 17;">
            <div class="box-root box-divider--light-all-2 animationRightLeft tans3s" style="flex-grow: 1;"></div>
          </div>
        </div>
      </div>
      <div class="box-root padding-top--24 flex-flex flex-direction--column" style="flex-grow: 1; z-index: 9;">
        <div class="footer-link padding-top--24">
          <span>Already have an account? <router-link to="/sign-in">Sign In</router-link></span>
        </div>
        <div class="formbg-outer">
          <div class="formbg">
            <div class="formbg-inner padding-horizontal--48">
              <span class="padding-bottom--15">Create an account</span>
              <form id="stripe-login" @submit.prevent="signUp">
                <div class="field padding-bottom--24">
                  <label for="username">Username</label>
                  <input type="text" name="username" v-model="username">
                </div>
                <div class="field padding-bottom--24">
                  <label for="first-name">First Name</label>
                  <input type="text" name="first-name" v-model="first_name">
                </div>
                <div class="field padding-bottom--24">
                  <label for="last-name">Last Name</label>
                  <input type="text" name="last-name" v-model="last_name">
                </div>
                <div class="field padding-bottom--24">
                  <label for="email">Email</label>
                  <input type="email" name="email" v-model="email">
                </div>
                <div class="field padding-bottom--24">
                  <div class="grid--50-50">
                    <label for="password">Password</label>
                    <!-- <div class="reset-pass">
                      <a href="#">Forgot your password?</a>
                    </div> -->
                  </div>
                  <input type="password" name="password" v-model="password">
                </div>
                <div class="field padding-bottom--24">
                  <label for="phone">Mobile Number</label>
                  <input type="telephone" name="phone" v-model="phone">
                </div>
                <div class="field padding-bottom--24">
                  <label for="country">Country</label>
                  <input type="text" name="country" v-model="country">
                </div>
                <div class="field padding-bottom--24">
                  <label for="state">State</label>
                  <input type="text" name="state" v-model="state">
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
                  <button class="submit" v-else>Sign Up</button>
                </div>
                <!-- <div class="field">
                  <a class="ssolink" href="#">Use single sign-on (Google) instead</a>
                </div> -->
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
import { supabase } from '../supabase'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export default {
  components: {
    Navbar,
    Footer
  },
  setup() {
    const router = useRouter()
    const email = ref('')
    const password = ref('')
    const username = ref('')
    const first_name = ref('')
    const last_name = ref('')
    const phone = ref('')
    const country = ref('')
    const state = ref('')
    const curUser = ref()
    const loading = ref(false)

    const signUp = async () => {
      try {
        loading.value = true
        const { user, session, error } = await supabase.auth.signUp(
          {
            email: email.value,
            password: password.value,
          },
          {
            data: {
              first_name: first_name.value,
              last_name: last_name.value,
              phone: phone.value,
              country: country.value,
              state: state.value
            }
          }
        )
        loading.value = false
        curUser.value = user.id
        pushMeta()
        router.push('/sign-in')
      }
      catch(error) {
        // console.log('Error signing up!')
      }
    }

    const pushMeta = async () => {
      try {
        const metaId = curUser.value
        const { data, error } = await supabase
        .from('profiles')
        .insert([
          {
            id: metaId,
            username: username.value,
            email: email.value,
            password: password.value,
            first_name: first_name.value,
            last_name: last_name.value,
            phone: phone.value,
            country: country.value,
            state: state.value
          },
        ])
      }
      catch(error) {
        // console.log(error)
      }
    }
    
    return {
      username,
      curUser,
      email,
      password,
      signUp,
      first_name,
      last_name,
      phone,
      country,
      state,
      loading
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
    width: 100%;
    min-height: 100vh;
    overflow: hidden;
    margin-top: 90px;
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
a.ssolink {
    display: block;
    text-align: center;
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