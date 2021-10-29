import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import { supabase } from '../supabase'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/product/:name',
    name: 'Product',
    component: () => import('../views/ProductPage.vue')
  },
  {
    path: '/checkout',
    name: 'Checkout',
    component: () => import('../views/Checkout.vue')
  },
  {
    path: '/category/accessory',
    name: 'Category',
    component: () => import('../views/Categorypage.vue')
  },
  {
    path: '/admin-board',
    name: 'Admin Board',
    component: () => import('../views/AdminBoard.vue'),
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/admin-board/add-product',
    name: 'Add Product',
    component: () => import('../components/AddProduct.vue'),
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/admin-board/update-product/:name',
    name: 'Update Product',
    component: () => import('../components/UpdateProduct.vue'),
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/admin-board/view-products',
    name: 'View Products',
    component: () => import('../components/ViewProducts.vue'),
    meta: {
      requiresAuth: true,
    }
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

router.beforeEach((to, from, next) => {
  // get current user info
  const currentUser = supabase.auth.user()
  const requiresAuth = to.matched.some
  (record => record.meta.requiresAuth)

  if(requiresAuth && !currentUser) next('/sign-in')
  else if(!requiresAuth && currentUser) next("/admin-board");
  else next();
})

export default router
