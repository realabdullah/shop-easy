import { createStore } from 'vuex'
// const state = {
//   cartItems: []
// }

export default createStore({
  state: {
    cartItems: []
  },
  mutations: {
    
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
