<template>
  <div class="category-cont">
    <h2>Categories</h2>
    <div class="category-body">
      <div class="cat">
         <router-link :to="{ name: 'Category', params: { category: product.name }}">
          <div class="cat-img">
            <img src="../assets/phone.png">
          </div>
          <p>Smartphones</p>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { onBeforeMount, computed } from 'vue'
import gettingCategory from '../composables/gettingCategory'
import { useStore } from 'vuex'

export default {
  setup() {
    const { getCategory } = gettingCategory()

    onBeforeMount(() => {
      getProduct()
    })

    return {
      cat
    }
  }
}
</script>

<style scoped>
.category-cont {
  margin-top: 300px;
  padding: 30px;
  border-bottom: 2px solid #333;
}

.category-cont h2 {
  margin-bottom: 20px;
}

.category-body {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-around;
}

.cat a {
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.cat a p {
  color: rgb(109, 93, 93);
}

.cat-img {
  display: flex;
  width: 120px;
  height: 120px;
  border-radius: 100px;
  background-image: linear-gradient(to right top, #fd1b2d, #dd1423, #bd0d1a, #9f0511, #820008);
  justify-content: center;
  align-items: center;
  margin: 10px;
}

.cat-img img {
  width: 70px;
}
</style>