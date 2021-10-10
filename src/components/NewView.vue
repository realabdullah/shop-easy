<template>
  <div class="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true" v-if="rDelete">
    <div class="flex flex-col items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      
      <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

      <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

      <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
        <div class="bg-white px-4 pt-5 sm:p-6 sm:pb-4">
          <div class="flex items-center flex-col justify-center sm:flex sm:items-start">
            <div class="mx-auto flex-shrink-0 flex items-center flex-col justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
              <!-- Heroicon name: outline/exclamation -->
              <svg class="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                Delete Product
              </h3>
              <div class="mt-2">
                <p class="text-sm text-gray-500">
                  Are you sure you want to remove this product? This product will be permanently removed. This action cannot be undone.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="flex items-center flex-col justify-center bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <button type="button" @click="deleteProduct" class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm p-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm">
            Delete
          </button>
          <button type="button" @click="closeModal" class="w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
  
  <tr>
    <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
      <div class="flex items-center">
        <div class="flex-shrink-0 w-10 h-10">
          <img class="w-10 h-10 rounded-full"
            :src="produce.file"
            alt="product">
        </div>
        <div class="ml-4">
          <div class="text-sm font-medium leading-5 text-gray-900">
            {{ produce.name }}
          </div>
        </div>
      </div>
    </td>
    <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
      <div class="text-sm leading-5 text-gray-500">${{ produce.price }}</div>
    </td>
    <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
      <span
        class="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full" v-if="produce.available">In-stock</span>
        <span
        class="inline-flex px-2 text-xs font-semibold leading-5 text-red-800 bg-red-100 rounded-full" v-else>Out of stock</span>
    </td>
    <td
      class="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200">
      <router-link :to="{ name: 'Update Product',params: { name: produce.name }}">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-blue-400"
        fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round"
            stroke-width="2"
            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      </router-link>
    </td>
    <td
      class="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200">
      <div @click="openModal">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-red-400"
        fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round"
            stroke-width="2"
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </div>
    </td>
  </tr>

</template>

<script>
import { ref } from '@vue/reactivity'
import { supabase } from '../supabase'

export default {
  props: [
    'produce'
  ],
  setup(props) {
    const rDelete = ref(false)
    const deleteProduct = async () => {
      try {
        await supabase
        .from('products')
        .delete()
        .eq('id', props.produce.id)
        rDelete.value = false
      }
      catch (error) {
        console.error('error', error)
      }
    }

    const openModal = () => {
      rDelete.value = true
    }

    const closeModal = () => {
      rDelete.value = false
    }

    return {
      openModal,
      rDelete,
      closeModal,
      deleteProduct
    }
  }
}
</script>

<style>

</style>