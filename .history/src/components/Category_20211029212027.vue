<template>
  <div class="category-cont">
    <h2>Categories</h2>
    <div class="category-body">
      
      <div class="cat">
        <router-link to="/category/phones">
          <div class="cat-img">
            <img src="../assets/phone.png">
          </div>
          <p>Smartphones</p>
        </router-link>
      </div>
      <div class="cat">
        <router-link to="/category/computers">
          <div class="cat-img">
            <img src="../assets/laptop.png">
          </div>
          <p>Computers</p>
        </router-link>
      </div>
      <div class="cat">
        <router-link to="/category/shoes">
          <div class="cat-img">
            <img src="../assets/airmax.png">
          </div>
          <p>Shoes</p>
        </router-link>
      </div>
      <div class="cat">
        <router-link to="/category/electronics">
          <div class="cat-img">
            <img src="../assets/hisense.png">
          </div>
          <p>Electronics</p>
        </router-link>
      </div>
      <div class="cat">
        <router-link to="/category/accessory">
          <div class="cat-img">
            <img src="../assets/accessory.png">
          </div>
          <p>Accessory</p>
        </router-link>
      </div>
      <div class="cat">
        <router-link to="/category/fashion">
          <div class="cat-img">
            <img src="../assets/fashion.png">
          </div>
          <p>Fashion</p>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>

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