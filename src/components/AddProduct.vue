<template>
  <AdminBar />

  <div class="row justify-content-center mt-5 pb-5">
    <div class="col-md-5">
      <h3 class="text-center">Add New Product</h3>
      <form @submit.prevent="addProduct" class="mt-5">

        <div class="mb-3">
          <label for="formFileLg" class="form-label">Upload an image for the product</label>
          <input class="form-control form-control-lg" id="formFileLg" ref="file" type="file">
        </div>

        <div class="form-floating mb-3">
          <input type="text" class="form-control" id="floatingInput" v-model="name" placeholder="Product Name">
          <label for="floatingInput">Product Name</label>
        </div>

        <div class="form-floating mb-3">
          <input type="text" class="form-control" id="floatingInput" v-model="description" placeholder="Product Description">
          <label for="floatingInput">Product Description</label>
        </div>

        <div class="form-floating mb-3">
          <input type="text" class="form-control" id="floatingInput" v-model="price" placeholder="Product Price">
          <label for="floatingInput">Product Price</label>
        </div>

        <div class="form-floating mb-3">
          <label for="floatingInput">Category</label>
          <select v-model="category" class="form-select" aria-label="Default select example">
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
          <select v-model="available" class="form-select" aria-label="Default select example">
            <option value="True">True</option>
            <option value="False">False</option>
          </select>
        </div>
        
        <div class="form-group mt-3">
          <button type="submit" class="btn btn-primary btn-block">Add Product</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import AdminBar from '../components/AdminBar.vue'
import { ref } from 'vue'
import { supabase } from '../supabase'

export default {
  components: {
    AdminBar
  },
  setup() {
    const name = ref('')
    const description = ref('')
    const price = ref('')
    const category = ref('')
    const available = ref('')
    const file = ref(null)
    const fileUrl = ref('')

    const handleFileUpload = async() => {
      try {
        const avatarFile = file.value.files[0]
        const preName = file.value.files[0].name
        const finalName = 'public/' + preName
        const { data, error } = await supabase.storage
          .from('product-image')
          .upload(finalName, avatarFile)
        console.log("selected file", finalName)
        //Upload to server
      }
      catch (error) {
        alert('Error')
        console.error('Problem uploading!', error)
        return null
      }
    }

    const addProduct = async () => {
      try {
        const avatarFile = file.value.files[0]
        const preName = avatarFile.name
        const finalName = 'public/' + preName
        fileUrl.value = 'https://lvxtnhawypcwdyffjisb.supabase.in/storage/v1/object/public/product-image/' + finalName
        handleFileUpload()
        const { data, error } = await supabase
        .from('products')
        .insert([
          { name: name.value, description: description.value, category: category.value, available: available.value, price: price.value, image: finalName, file: fileUrl.value },
        ])
        if (error) {
          alert(error.message)
          console.error('There was an error inserting', error)
          return null
        }
        name.value = '',
        description.value = '',
        category.value = '',
        available.value = '',
        price.value = '',
        file.value = '',
        console.log('Added a new product')
        return data
      } catch (err) {
          alert('Error')
          console.error('Unknown problem inserting to db', err)
          return null
        }
    }


    return {
      name,
      price,
      description,
      category,
      available,
      addProduct,
      handleFileUpload,
      file
    }
  }
}
</script>