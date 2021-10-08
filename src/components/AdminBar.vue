<template>
  <nav class="p-3 navbar navbar-dark bg-dark justify-content-between flex-row">
    <div class="container-fluid">
      <router-link class="nav-link  me-3" to="/admin-board">
        <a class="navbar-brand float-left">ShopEasy</a>
      </router-link>

      <ul class="nav navbar-nav flex-row float-right">
        <li class="nav-item">
          <router-link class="nav-link me-3" to="/admin-board/add-product">Add Product</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link  me-3" to="/admin-board/view-products">View Products</router-link>
        </li>
        <!-- <li class="nav-item">
          <router-link class="nav-link  me-3" to="/admin-board/update-product">Update Product</router-link>
        </li> -->
      </ul>
    </div>
  </nav>
</template>

<script>
export default {

}
</script>

<style>

</style>