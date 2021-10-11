import { ref } from 'vue'

const cartArray = []

const addToCart = () => {
  localStorage.setItem('cartArray',JSON.stringify(cartArray))
  console.log(cartArray)
}

const addCart = () => {
  return {
    cartArray,
    addToCart
  }
}

export default addCart