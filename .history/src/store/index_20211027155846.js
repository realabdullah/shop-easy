import { createStore } from 'vuex'
// const state = {
//   cartItems: []
// }

export default createStore({
  state: {
    cartItems: []
  },
  mutations: {
    UPDATE_CART_ITEMS (state, payload) {
      state.cartItems = payload;
    }
  },
  actions: {
    getCartItems ({ commit }) {
      axios.get('/api/cart').then((response) => {
        commit('UPDATE_CART_ITEMS', response.data)
      });

      if (localStorage.getItem("cartArray")){
        commit('UPDATE_CART_ITEMS', response.data)
        cartItems.value = JSON.parse(localStorage.getItem("cartArray"))
      }
    },
    addCartItem ({ commit }, cartItem) {
      localStorage.setItem('cartArray',JSON.stringify(cartArray))
    },
    removeCartItem ({ commit }, cartItem) {
      axios.delete('/api/cart/delete', cartItem).then((response) => {
        commit('UPDATE_CART_ITEMS', response.data)
      });
    },
    removeAllCartItems ({ commit }) {
      axios.delete('/api/cart/delete/all').then((response) => {
        commit('UPDATE_CART_ITEMS', response.data)
      });
    }
  },
  modules: {
  }
})
