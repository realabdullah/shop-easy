<template>
  <div class="sidebar-nav">
    <div class="filter">
      <h2>Filter</h2>
      <select name="cars" id="cars">
        <option class="options" value=""></option>
        <option class="options" value="free-shipping">Free Shipping</option>
        <option class="options" value="discount">Discounted</option>
        <option class="options" value="local">Local</option>
        <option class="options" value="international">International</option>
      </select>
    </div>

    <div class="category">
      <h2>Categories</h2>
      <li>
        <i class="fas fa-house-user"></i>
        <p>Home & Office</p>
      </li>
      <li>
        <i class="fas fa-tshirt"></i>
        <p>Fashion</p>
      </li>
      <li>
        <i class="fas fa-desktop"></i>
        <p>Computing</p>
      </li>
      <li>
        <i class="fas fa-mobile-alt"></i>
        <p>Phones & Laptop</p>
      </li>
      <li>
        <i class="fas fa-dice-d6"></i>
        <p>Gaming</p>
      </li>
      <li>
        <i class="fas fa-car"></i>
        <p>Automobile</p>
      </li>
    </div>  

    <div class="sellers">
      <img src="" alt="">
      <img src="" alt="">
      <img src="" alt="">
      <img src="" alt="">
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>
.sidebar-nav {
  background-color: #fff;
  position: fixed;
  top: 91px;
  left: 0;
  height: 100vh;
  width: 300px;
  padding: 30px;
  box-shadow: 4px 0px 5px -2px rgba(54,50,50,0.53);
  -webkit-box-shadow: 4px 0px 5px -2px rgba(54,50,50,0.53);
  -moz-box-shadow: 4px 0px 5px -2px rgba(54,50,50,0.53);
}

.filter {
  margin-bottom: 20px;
}

.filter h2 {
  margin-bottom: 10px;
}

select {
  padding: 7px;
  border-radius: 10px;
}

.category h2 {
  margin-bottom: 20px;
}

.category li {
  margin-left: 30px;
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 10px;
}

.category li svg {
  margin-right: 10px;
}

</style>