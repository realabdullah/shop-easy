<template>
  <div class="products">
    <div class="recommended">
      <h2>Recommended Products</h2>
      <div class="rp-container">
        <div class="rp-card">
          <img src="../assets/headset.png" alt="headset">
          <div class="details">
            <p class="price">$120.10</p>
            <p class="name">Sony Ultimate Ears</p>
            <button class="add-cart">View</button>
          </div>
        </div>
        <div class="rp-card">
          <img src="../assets/headset.png" alt="headset">
          <div class="details">
            <p class="price">$120.10</p>
            <p class="name">Sony Ultimate Ears</p>
            <button class="add-cart">View</button>
          </div>
        </div>
        <div class="rp-card">
          <img src="../assets/headset.png" alt="headset">
          <div class="details">
            <p class="price">$120.10</p>
            <p class="name">Sony Ultimate Ears</p>
            <button class="add-cart">View</button>
          </div>
        </div>
        <div class="rp-card">
          <img src="../assets/headset.png" alt="headset">
          <div class="details">
            <p class="price">$120.10</p>
            <p class="name">Sony Ultimate Ears</p>
            <button class="add-cart">View</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>
.products {
  margin-top: 300px;
  margin-left: 300px;
  padding: 30px;
}

.recommended h2 {
  margin-bottom: 20px;
}

.rp-container {
  display: flex;
  align-items: center;
}

.rp-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-image: linear-gradient(to right top, #fd1b2d, #dd1423, #bd0d1a, #9f0511, #820008);
  border-radius: 15px;
  margin: 10px;
  width: 200px;
  height: auto;
  box-shadow: 0px 12px 24px -12px rgba(0, 0, 0, 0.5);
  -webkit-box-shadow: 0px 12px 24px -12px rgba(0, 0, 0, 0.5);
  padding: 15px;
}

.rp-card img {
  width: 200px;
}

.details {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
}

.details .price {
  color: #ecb0b8;
  margin-bottom: 10px;
}

.details .name {
  font-weight: bold;
  color: #dce4eb;
  margin-bottom: 10px;
}

.details .add-cart {
  border: none;
  padding: 10px 25px;
  border-radius: 25px;
  background-color: #850009;
  color: #fff;
}
</style>