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
    path: '/user/:id',
    name: 'User Profile',
    component: () => import('../views/UserProfile.vue')
  },
  {
    path: '/edit/:id',
    name: 'Edit Profile',
    component: () => import('../views/EditProfile.vue')
  },
  {
    path: '/checkout',
    name: 'Checkout',
    component: () => import('../views/Checkout.vue')
  },
  {
    path: '/category/accessory',
    name: 'Accessory',
    component: () => import('../views/Accessorycart.vue')
  },
  {
    path: '/category/computers',
    name: 'Computers',
    component: () => import('../views/Computercat.vue')
  },
  {
    path: '/category/electronics',
    name: 'Electronics',
    component: () => import('../views/Electronicscart.vue')
  },
  {
    path: '/category/fashion',
    name: 'Fashion',
    component: () => import('../views/Fashioncart.vue')
  },
  {
    path: '/category/phones',
    name: 'Phones',
    component: () => import('../views/Phonescat.vue')
  },
  {
    path: '/category/shoes',
    name: 'Shoes',
    component: () => import('../views/Shoescart.vue')
  },
  {
    path: '/admin-board',
    name: 'Admin Board',
    component: () => import('../views/AdminBoard.vue')
    // meta: {
    //   requiresAuth: true,
    // }
  },
  {
    path: '/admin-board/add-product',
    name: 'Add Product',
    component: () => import('../components/AddProduct.vue')
    // meta: {
    //   requiresAuth: true,
    // }
  },
  {
    path: '/admin-board/update-product/:name',
    name: 'Update Product',
    component: () => import('../components/UpdateProduct.vue')
    // meta: {
    //   requiresAuth: true,
    // }
  },
  {
    path: '/admin-board/view-products',
    name: 'View Products',
    component: () => import('../components/ViewProducts.vue')
    // meta: {
    //   requiresAuth: true,
    // }
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

// router.beforeEach((to, from, next) => {
//   // get current user info
//   const currentUser = supabase.auth.user()
//   const requiresAuth = to.matched.some
//   (record => record.meta.requiresAuth)

//   if(requiresAuth && !currentUser) {
//     next('/sign-in')
//   }
//   else if(!requiresAuth && currentUser) {
//     next('/category/shoes');
//   }
//   else {
//     next();
//   }
// })

export default router
