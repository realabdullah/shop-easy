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
  },
  modules: {
  }
})
