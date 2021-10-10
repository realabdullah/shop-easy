<template>
  <div class="card m-3 p-3" style="width: 18rem;">
    <img :src="produce.file" class="card-img-top" alt="product">
    <div class="card-body">
      <h5 class="card-title">{{ produce.name }}</h5>
      <p class="card-text text-dark">${{ produce.price }}</p>
      <div class="btns d-flex">
        <router-link class="btn btn-primary me-3" :to="{ name: 'Update Product',params: { name: produce.name }}">Edit</router-link>
        <button class="btn btn-danger" @click="deleteProduct">Delete</button>
      </div>
    </div>
  </div>
</template>

<script>
import { supabase } from '../supabase'

export default {
  props: [
    'produce'
  ],
  setup(props) {
    const deleteProduct = async () => {
      try {
        await supabase
        .from('products')
        .delete()
        .eq('id', props.produce.id)
      }
      catch (error) {
        console.error('error', error)
      }
    }

    return {
      deleteProduct
    }
  }
}
</script>

<style>

</style>