<template>
  <div class="html container">
    <!-- preloader -->
    <div class="center preload" v-show="preload">
      <div class="preloader-wrapper big active">
        <div class="spinner-layer spinner-green-only">
          <div class="circle-clipper left">
            <div class="circle"></div>
          </div>
          <div class="gap-patch">
            <div class="circle"></div>
          </div>
          <div class="circle-clipper right">
            <div class="circle"></div>
          </div>
        </div>
      </div>
    </div>
    <!-- preloader end -->
    <!-- product picture -->
    <div style="margin-top: 20px">
      <div class="row center">
        <div class="col s4 m3" v-for="product in Products" :key="product.id">
          <div class="card">
            <div class="card-image">
              <img
                :src="baseUrl + product.pro_image1"
                alt="item image"
              />
            </div>
            <div class="card-content">
              <p class="card-title name">{{ product.name }}</p>
              <p class="card-title name">Price-{{ product.price }}৳</p>
            </div>
            <div class="card-action">
              <router-link :to="'/' + product.id" class="btn">buy</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Axios from "axios";
export default {
  data() {
    return {
      Products: [],
      id: null,
      preload:true
    };
  },
  created() {
    this.id = localStorage.getItem("cate_id");
    Axios.get(this.baseUrl).then((data) => {
      this.Products = data.data.filter((items) => {
        return items.Category == this.id;
      });
      if(!this.Products){
        this.preload = true
      }
      else{
        this.preload = false
      }
    });
  },
};
</script>
<style scoped>
.html {
  margin-top: 60px;
}
.preload{
  position: relative;
  top: 300px;
}
.card img {
  height: 250px;
}
.card .card-content {
  border-radius: 0 0 2px 2px;
  height: 120px;
}
@media screen and (max-width:800px){
  .card .card-content{
  height: 100px;
}
.name{
  font-size: 16px;
}
}
/* container for not more than bigger */

@media only screen and (min-width:10px){
  .container {
    width: 90%;
}
}

@media only screen and (min-width:1450px){
.container {
    margin: 0 auto;
    max-width: 1280px;
    width: 90%;
}
.html{
  margin-top: 50px;
}
}
</style>