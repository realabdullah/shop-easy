<template>
  <AdminBar />
   <!-- class="d-flex flex-sm-column flex-md-column flex-lg-row align-items-stretch flex-wrap justify-content-center p-5" -->
  <div class="products mt-5">
    <div class="recommended">
      <h2>All Products({{ productData.length }})</h2>
      <div class="flex flex-col mt-8">
        <div class="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
          <div
            class="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
            <table class="min-w-full">
              <thead>
                <tr>
                  <th
                    class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                    Name
                  </th>
                  <th
                    class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                    Price
                  </th>
                  <th
                    class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                    Availabilty
                  </th>
                  <th
                    class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                    Edit
                  </th>
                  <th
                    class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                    Delete
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white" v-for="produce in productData" :key="produce.id" :produce="produce">
                <NewView :produce="produce"/>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onBeforeMount, ref } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '../supabase'
import AdminBar from '../components/AdminBar.vue'
import NewView from '../components/NewView.vue'

export default {
  components: {
    AdminBar,
    NewView
  },
  setup(props) {
    const router = useRouter()

    const productData = ref([])

    const getProduct = async () => {
      try {
        const data = await supabase
        .from('products')
        .select('*')
        productData.value = data.data
        console.log(productData)
      }
      catch (err) {
        console.error('Unknown problem getting db', err)
        return null
      }
    }

    const deleteProduct = async () => {
      try {
        await supabase
        .from('products')
        .delete()
        .eq('id', props.produce.id)
        router.push('/admin-board/view-products')
      }
      catch (error) {
        console.error('error', error)
      }
    }

    onBeforeMount(() => {
      getProduct()
    })

    return {
      productData,
      deleteProduct
    }
  }
}
</script>

<style>

</style>