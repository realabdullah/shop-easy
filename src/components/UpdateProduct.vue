<template>
  <AdminBar />

  <div class="row justify-content-center mt-5 pb-5">
    <div class="col-md-5">
      <h3 class="text-center">Update Product</h3>
      <form @submit.prevent="updateProduct" class="mt-5">

        <div class="mb-3">
          <label for="formFileLg" class="form-label">Upload an image for the product</label>
          <input class="form-control form-control-lg" id="formFileLg" ref="productUpdate.file" type="file">
        </div>

        <div class="form-floating mb-3">
          <input type="text" class="form-control" id="floatingInput" v-model="productUpdate.name" placeholder="Product Name">
          <label for="floatingInput">Product Name</label>
        </div>

        <div class="form-floating mb-3">
          <input type="text" class="form-control" id="floatingInput" v-model="productUpdate.description" placeholder="Product Description">
          <label for="floatingInput">Product Description</label>
        </div>

        <div class="form-floating mb-3">
          <input type="text" class="form-control" id="floatingInput" v-model="productUpdate.price" placeholder="Product Price">
          <label for="floatingInput">Product Price</label>
        </div>

        <div class="form-floating mb-3">
          <label for="floatingInput">Category</label>
          <select v-model="productUpdate.category" class="form-select" aria-label="Default select example">
            <option value="Phones">Phones</option>
            <option value="Laptop">Laptop</option>
            <option value="Home & Office">Home & Office</option>
            <option value="Fashion">Fashion</option>
            <option value="Computing">Computing</option>
            <option value="Gaming">Gaming</option>
            <option value="Automobile">Automobile</option>
          </select>
        </div>

        <div claas="form-floating mb-3">
          <label for="floatingInput">In-stock</label>
          <select v-model="productUpdate.available" class="form-select" aria-label="Default select example">
            <option value="True">True</option>
            <option value="False">False</option>
          </select>
        </div>
        
        <div class="form-group mt-3">
          <button type="submit" class="btn btn-primary btn-block">Update Product</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { reactive, ref, computed, onBeforeMount } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { supabase } from '../supabase'
import AdminBar from '../components/AdminBar.vue'

export default {
  components: {
    AdminBar
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const productName = computed(() => route.params.name)
    const productUpdateData = ref([])

    const productUpdate = reactive({
      file: '',
      name: '',
      description: '',
      price: '',
      category: '',
      available: ''
    })

    const getProductForUpdate = async () => {
      try {
        const data = await supabase
        .from('products')
        .select('*')
        .eq('name', productName.value)
        .single()
        const readyUpdate = productUpdateData.value = data.data
        productUpdate.file = readyUpdate.file,
        productUpdate.name = readyUpdate.name,
        productUpdate.description = readyUpdate.description,
        productUpdate.price = readyUpdate.price,
        productUpdate.category = readyUpdate.category,
        productUpdate.available = readyUpdate.available
        console.log(readyUpdate.name)
        console.log(productName.value)
      }
      catch (err) {
        alert('Error')
        console.error('Unknown problem getting productUpdateData', err)
        return null
      }
    }

    const updateProduct = async () => {
      try {
        let { error } = await supabase
        .from("products")
        .update({
          name: productUpdate.name,
          description: productUpdate.description,
          price: productUpdate.price,
          category: productUpdate.category,
          available: productUpdate.available
        })
        .eq('name', productName.value)
        .single()
        console.log('update success!')

        if (error) throw error
      } catch (error) {
        alert(error.message)
      }
    }

    onBeforeMount(() => {
      getProductForUpdate()
    })

    return {
      productUpdate,
      updateProduct
    }
  }
}
</script>

<style>

</style>