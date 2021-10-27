import { onBeforeMount, ref, computed } from 'vue'
import { supabase } from '../supabase'

const getProduct = async () => {
    try {
      const data = await supabase
      .from('products')
      .select('*')
      productData.value = data.data
      console.log(productData)
    }
    catch (err) {
      alert('Error')
      console.error('Unknown problem getting db', err)
      return null
    }
  }