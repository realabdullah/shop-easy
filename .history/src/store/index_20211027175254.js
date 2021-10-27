import { createStore } from 'vuex'
import gettingProduct from '../composables/gettingProduct'
// const state = {
//   cartItems: []
// }


const { getProduct, productData } = gettingProduct()

export default createStore({
  state: {
    products: productData,
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
    }
  },
  getters: {
    getProducts: state => {
      getProduct()
      return state.products
    },
    getCart: state => {
      return state.cart
    },
    getTotal: state => {
      let total = 0
      state.cart.map((p) => {
        total += p.price*p.quantity
      })
      return total
    },
  },
  modules: {
  }
})
