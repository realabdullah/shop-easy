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
    },
    increase(state,id){
      state.cart.map((p)=>{
        if ( p.id == id) {
          p.quantity += 1
        }
      })

    },
    decrease(state,id){
      state.cart.map((p)=>{
        if ( p.id == id && p.quantity > 1) {
          p.quantity -= 1
        }
      })
    }
  },
  actions: {
    getCartItems ({ commit }) {
      if (localStorage.getItem("cartArray")){
        commit('UPDATE_CART_ITEMS', JSON.parse(localStorage.getItem("cartArray")))
      }
    },
    addCartItem ({ commit }, cartItem) {
      localStorage.setItem('cartArray',JSON.stringify(cartArray))
      commit('UPDATE_CART_ITEMS', JSON.stringify(cartArray))
    }
  },
  modules: {
  }
})
