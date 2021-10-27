import { createStore } from 'vuex'
// const state = {
//   cartItems: []
// }

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
