import { ref } from 'vue'
import { supabase } from '../supabase'

const gettingCategory = () => {
    const categoryData = ref([])

    const getCategory = async () => {
        try {
            const data = await supabase
            .from('products')
            .select('*')
            .eq('category')
            categoryData.value = data.data
            console.log(categoryData)
        }
        catch (err) {
            alert('Error')
            console.error('Unknown problem getting db', err)
            return null
        }
    }

    return {
        getCategory,
        categoryData
    }
}

export default gettingCategory