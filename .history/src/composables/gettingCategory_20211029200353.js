import { ref } from 'vue'
import { supabase } from '../supabase'

const gettingCategory = () => {
    const categoryData = ref([])

    const getCategory = async () => {
        try {
            const data = await supabase
            .from('products')
            .select('*')
            .eq
            productData.value = data.data
        }
        catch (err) {
            alert('Error')
            console.error('Unknown problem getting db', err)
            return null
        }
    }

    return {
        getProduct,
        productData
    }
}

export default gettingProduct