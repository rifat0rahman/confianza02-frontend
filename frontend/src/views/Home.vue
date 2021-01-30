<template>
  <div style="margin-top: 30px" class="container">
    <!-- preloader -->
    <div class="center preload" v-show="preload">
      <div class="preloader-wrapper big active">
        <div class="spinner-layer spinner-red-only">
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
    <!-- slider -->
    <div class="carousel carousel-slider up" id="slider">
      <a class="carousel-item" href="#one!">
        <img :src="sliderimage1" alt="" class="responsive-img" />
      </a>
      <a class="carousel-item" href="#one!">
        <img :src="sliderimage2" alt="" class="responsive-img" />
      </a>
      <a class="carousel-item" href="#one!">
        <img :src="sliderimage3" alt="" class="responsive-img" />
      </a>
    </div>
    <!-- msg bar is here -->
    <ul class="collapsible z-depth-0 msg-bar">
      <li>
        <div class="collapsible-header row msg-header">
          <p class="title col l6 m5 s5">Buy a product get a lot of Confianza</p>
          <p class="promo col l5 m7 s7">
            get 10% free by using "CONFIANZA" promo code now
          </p>
        </div>
        <div class="collapsible-body">
          <p>
            You are Confianza,means the most trusted people.You may have another
            explaination about us but we really care about our services that
            should be as we talk.By selling product we communicate to you guys
            and having a lot of experiences from you,one day maybe I will pay
            you for that wait till then.
            <br />Our new promo is sailed here,,creck that up quickly!!!!
          </p>
        </div>
      </li>
    </ul>
    <!-- products card is here -->
    <div class="products" v-show="!preload">
      <div class="row center">
        <div class="col l3 m3 s4" v-for="product in products" :key="product.id">
          <div class="card-action">
            <router-link :to="'/' + product.id"
              ><div class="card">
                <div class="card-image">
                  <img
                    :src="baseUrl + '/' + product.pro_image1"
                    alt="item image"
                  />
                </div>
                <div class="card-content names flow-text">
                  <p class="card-title name">
                    {{ product.name | cut - name }}
                  </p>
                  <p class="card-title name">Price-{{ product.price }}৳</p>
                </div>
              </div></router-link
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import M from "materialize-css";

export default {
  mounted() {
    // metaral js design
    document.addEventListener("DOMContentLoaded", function () {
      var elems = document.querySelectorAll(".carousel");
      var instances = M.Carousel.init(elems, {
        fullWidth: true,
        indicators: true,
      });
      console.log(instances);
    });
    M.AutoInit();
    //metarial design ends here
  },
  // main functions are below
  data() {
    return {
      products: [],
      sliders: [],
      sliderimage1: "",
      sliderimage2: "",
      sliderimage3: "",
      preload: true,
    };
  },
  created() {
    // get products from django rest api
    axios.get(this.baseUrl).then((data) => {
      this.products = data.data;
      if (!this.products) {
        this.preload = true;
      } else {
        this.preload = false;
      }
    });
    // geting slider images from django rest api /sliders
    axios.get(this.baseUrl + "/sliders").then((sliders) => {
      this.sliders = sliders.data;
      this.sliderimage1 = this.baseUrl + this.sliders[0].sliderimage1;
      this.sliderimage2 = this.baseUrl + this.sliders[0].sliderimage2;
      this.sliderimage3 = this.baseUrl + this.sliders[0].sliderimage3;
    });
  },
};
</script>
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Aldrich&family=Poppins:wght@300&family=Rubik+Mono+One&family=Sriracha&display=swap");
.name {
  font-family: "Poppins", sans-serif;
  font-size: 18px;
  color: black;
  text-align: left;
  margin: 5px;
}
.preload {
  position: relative;
  top: 500px;
}
.card .card-content {
  border-radius: 0 0 2px 2px;
  height: 120px;
}
.names {
  padding: 20px;
}
.title {
  font-family: monospace;
  font-size: 13px;
}
.promo {
  font-family: monospace;
  font-size: 13px;
}
.up {
  height: 350px;
}
.products img {
  height: 250px;
}
@media screen and (max-width: 600px) {
  .up {
    height: 190px;
  }
  .products img {
    height: 180px;
  }
  .name {
    font-size: 15px;
  }
}
@media screen and (min-width: 1300px) {
  .products img {
    height: 300px;
  }
}
@media screen and (max-width: 1000px) and (min-width: 800px) {
  .up {
    height: 300px;
  }
  .products img {
    height: 220px;
  }
  .name {
    font-size: 15px;
  }
}
@media screen and (max-width: 800px) and (min-width: 600px) {
  .up {
    height: 240px;
  }
  .products img {
    height: 200px;
  }
  .name {
    font-size: 14px;
  }
}
@media screen and (max-width: 600px) and (min-width: 250px) {
  .up {
    height: 120px;
  }
  .products img {
    height: 200px;
  }
  .name {
    font-size: 11px;
  }
  .card .card-content {
    border-radius: 0 0 2px 2px;
    height: 80px;
    margin: 0px;
    padding: 5px;
  }
  .card .card-content .card-title {
    display: block;
    line-height:15px;
    margin-bottom: 8px;
}
}
/* container for not more than bigger */

@media only screen and (min-width: 3px) {
  .container {
    width: 100%;
  }
}

@media only screen and (min-width: 1450px) {
  .container {
    margin: 0 auto;
    max-width: 1280px;
    width: 80%;
  }
}
</style>
