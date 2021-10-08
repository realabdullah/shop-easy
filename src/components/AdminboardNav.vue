<template>
  <div class="container-fluid d-flex justify-content-center mt-5">
    <div class="card m-4" style="width: 18rem;">
      <img src="../assets/admin.png" class="card-img-top" alt="admin">
      <div class="card-body">
        <h5 class="card-title">View All Products</h5>
        <p class="card-text">View all products in the database.</p>
        <router-link class="btn btn-primary" to="/admin-board/view-products">View Products</router-link>
      </div>
    </div>

    <div class="card m-4" style="width: 18rem;">
      <img src="../assets/admin.png" class="card-img-top" alt="admin">
      <div class="card-body">
        <h5 class="card-title">Add A Product</h5>
        <p class="card-text">Add a new product to the database</p>
          <router-link class="btn btn-primary" to="/admin-board/add-product">Add Product</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>