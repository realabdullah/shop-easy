<template>
  <div class="home">
    <Navbar />
    <Banner />
    <Category />
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'
import Banner from '../components/Banner.vue'
import Category from '../components//Category.vue'

export default {
  name: 'Home',
  components: {
    Navbar,
    Banner,
    Category
  },
  setup() {
    const store = useStore()
    const computers = ref([])

    const addProduct = (p) => {
      let product = { ...p };
      store.dispatch("addProduct", product);
    }

    const getComputers = async () => {
      try {
        const data = await supabase
        .from('products')
        .select('*')
        .eq('category', 'Laptop')
        computers.value = data.data
        console.log(computers)
      }
      catch(error) {
        console.log(error)
      }
    }

    onBeforeMount(() => {
      getComputers()
    })

    return {
      addProduct,
      computers
    }
  }
}
</script>

<style>

</style>