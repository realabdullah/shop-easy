<template>
  <div class="banners">
    <div class="carousel-img">
      <img src="../assets/camp.jpg" alt="ads">
    </div>
  </div>
</template>

<script>
// import { Carousel, Slide } from 'vue3-carousel'
// import 'vue3-carousel/dist/carousel.css'

export default {
  // components: {
  //   Carousel,
  //   Slide
  // }
}
</script>

<style>
/* .banners {
  margin-top: 90px;
  margin-left: 300px;
  height: 200px;
} */

.carousel-img img {
  width: 100%;
  height: 350px;
}

@media(max-width: 800px) {
  /* .banners {
    margin-top: 60px;
  } */

  /* .carousel-img {
    height: 255px;
  } */
}
</style>