import { createStore } from 'vuex'
import { ref } from 'vue'
import { supabase } from '../supabase'
// const state = {
//   cartItems: []
// }

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
    alert('Error')
    console.error('Unknown problem getting db', err)
    return null
  }
}

export default createStore({
  state: {
    products: productData.value,
    cart: []
  },
  mutations: {
    addProduct(state,product){
      state.cart.push(product)
      state.products.map((p)=>{
        if ( p.id == product.id) {
          p.cart= true
        }
      })
    },
    removeProduct(state,id){
      state.cart = state.cart.filter((p)=> p.id != id )
      state.products.map((p)=>{
        if ( p.id == id) {
          p.cart= false
        }
      })
    }
  },
  actions: {
    addProduct({commit},product){
      commit('addProduct',product)
    },
    removeProduct({commit},id){
      commit('removeProduct',id)
    },
    increase({commit},id){
      commit('increase',id)
    },
    decrease({commit},id){
      commit('decrease',id)
    }
  },
  modules: {
  }
})
