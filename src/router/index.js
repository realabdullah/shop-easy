import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/product/:name',
    name: 'Product',
    component: () => import('../views/Product.vue')
  },
  {
    path: '/admin-board',
    name: 'Admin Board',
    component: () => import('../views/AdminBoard.vue')
  },
  {
    path: '/admin-board/add-product',
    name: 'Add Product',
    component: () => import('../components/AddProduct.vue')
  },
  {
    path: '/admin-board/update-product/:name',
    name: 'Update Product',
    component: () => import('../components/UpdateProduct.vue')
  },
  {
    path: '/admin-board/view-products',
    name: 'View Products',
    component: () => import('../components/ViewProducts.vue')
  },
  {
    path: '/sign-up',
    name: 'Sign Up',
    component: () => import('../views/SignUp.vue')
  },
  {
    path: '/sign-in',
    name: 'Sign In',
    component: () => import('../views/SignIn.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
