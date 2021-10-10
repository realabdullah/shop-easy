<template>
  <div class="banners">
    <Carousel :autoplay="2000" :wrap-around="true">
      <Slide v-for="slide in 3" :key="slide">
        <div class="carousel__item">
          <img src="../assets/camp.jpg" alt="ads">
        </div>
        <div class="carousel__item">
          <img src="../assets/campaign-one.jpg" alt="ads">
        </div>
        <div class="carousel__item">
          <img src="../assets/campaign-two.jpg" alt="ads">
        </div>
      </Slide>
    </Carousel>
  </div>
</template>

<script>
import { Carousel, Slide } from 'vue3-carousel'
import 'vue3-carousel/dist/carousel.css'

export default {
  components: {
    Carousel,
    Slide
  }
}
</script>

<style>
.banners {
  margin-top: 90px;
  /* margin-left: 300px; */
  height: 200px;
}

.carousel__item img {
  width: auto;
  height: 475px;
}

@media(max-width: 800px) {
  .banners {
    margin-top: 60px;
  }

  .carousel__item img {
    height: 255px;
  }
}
</style>