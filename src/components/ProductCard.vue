<template>
  <div class="card m-3 p-3" style="width: 18rem;">
    <img :src="produce.file" class="card-img-top" alt="product">
    <div class="card-body">
      <h5 class="card-title">{{ produce.name }}</h5>
      <p class="card-text text-dark">${{ produce.price }}</p>
      <div class="btns d-flex">
        <router-link class="btn btn-primary me-3" :to="{ name: 'Update Product',params: { name: produce.name }}">Edit</router-link>
        <!-- <button class="btn btn-danger" @click="deleteProduct">Delete</button> -->
        <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#exampleModal">
          Delete
        </button>
      </div>
      <Modal :produce="produce"/>
      <!-- <a href="#" class="btn btn-primary">View All</a> -->
    </div>
  </div>
</template>

<script>
import { supabase } from '../supabase'
import Modal from '../components/Modal.vue'

export default {
  props: [
    'produce'
  ],
  components: {
    Modal
  }
}
</script>

<style>

</style>