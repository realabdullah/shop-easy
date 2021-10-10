<template>
  <div class="container-fluid p-5">
    <form @submit.prevent="signIn">
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">Email address</label>
        <input type="email" v-model="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
        <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
      </div>
      <div class="mb-3">
        <label for="exampleInputPassword1" class="form-label">Password</label>
        <input type="password" v-model="password" class="form-control" id="exampleInputPassword1">
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<script>
import { supabase } from '../supabase'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export default {
  setup() {
    const email = ref('')
    const password = ref('')

    const router = useRouter()

    const signIn = async () => {
      try {
        const { user, session, error } = await supabase.auth.signIn({
          email: email.value,
          password: password.value,
        })
        router.push('/admin-board')
      }
      catch(error) {
        console.log('Error signing in!')
      }
    }
    
    return {
      email,
      password,
      signIn
    }
  }
}
</script>

<style>

</style>