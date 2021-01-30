<template>
  <div class="html">
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
    <div>
      <div class="center" v-show="present">
        <div class="title">CHOOSE THE BEST VERSION FOR YOUR SELF</div>
      </div>
      <div>
        <div class="carousel" style="position: relative; bottom:60px;margin-top:10px">
          <a class="carousel-item" href="#one!"
            ><img :src=" baseUrl + product.pro_image1"
          /></a>
          <a class="carousel-item" href="#two!"
            ><img :src=" baseUrl + product.pro_image2"
          /></a>
          <a class="carousel-item" href="#three!"
            ><img :src=" baseUrl + product.pro_image3"
          /></a>
        </div>
      </div>
      <div class="center small-screen" v-show="present">
        <div class="row detail">
          <div class="col l7 m7 s7 name">{{ product.name }}</div>
          <div class="col l5 m5 s5 price">Price-{{ product.price }}৳</div>
        </div>
        <div style="margin: 30px; font-size: 15px">
          <p class="color">
            Color available-{{ product.colors }} -- Size available -{{
              product.sizes
            }}
          </p>
        </div>
        <div class="row detail">
          <div class="col l8 m8 s8">
            <div
              class="input-field col color-btn"
            >
              <select v-model="cartItem.color" required>
                <option value="" disabled selected>Colors</option>
                <option>White</option>
                <option>Black</option>
                <option>Blue</option>
                <option>grey</option>
                <option>Pink</option>
                <option>Purple</option>
                <option>Sky</option>
              </select>
            </div>
          </div>
          <div class="col l4 m4 s4">
            <div class="input-field col" style="width: 100px">
              <select v-model="cartItem.size" required>
                <option value="" disabled selected>Sizes</option>
                <option>M</option>
                <option>L</option>
                <option>XL</option>
              </select>
            </div>
          </div>
          <div>
            <p class="" style="margin-left: 20px">
              {{ err }}
            </p>
          </div>
          <div>
            <button class="btn black button" @click="addtocart">
              ADD TO CART
            </button>
          </div>
        </div>
        <div class="desall">
          <div class="row detail">
            <div class="extra-info">
              <p class="des">Write you wanna say to us</p>
            </div>
            <div class="row container">
              <div class="input-field col s12">
                <input
                  v-model="cartItem.extra_message"
                  id="email"
                  type="text"
                  placeholder="Write your directions"
                />
              </div>
            </div>
            <p class="des-head">Description</p>
            <p class="des container">
              {{ product.details }}
            </p>
            <a
              href="/"
              class="btn black"
              style="margin: 40px"
            >
              Back
            </a>
          </div>
        </div>
      </div>
    </div>
    <div v-show="!preload">
          <div v-show="!present">
      <div class="center invalid">
        <p>Are you lost?? Invalid Page</p>
        <a href="/">go back to home</a>
      </div>
    </div>
    </div>

  </div>
</template>
<script>
import M from "materialize-css";
import axios from "axios";
export default {
  mounted() {
    M.AutoInit();
    // get cart from localstorage for making sure you have the same cart running
    if (localStorage.getItem("cart")) {
      this.cart = JSON.parse(localStorage.getItem("cart"));
    }
  },
  // details functions are here
  data() {
    return {
      id: this.$route.params.id,
      product: [],
      cart: [],
      cartItem: {
        name: null,
        price: null,
        image: null,
        color: null,
        size: null,
        extra_message: null,
      },
      err: null,
      added: null,
      present: null,
      preload:true
    };
  },
  created() {
    M.AutoInit();
    axios.get(this.baseUrl+"?id=" + this.id).then((data) => {
      this.product = data.data;
      this.colors = this.product.colors;
      (this.cartItem.name = this.product.name),
        (this.cartItem.price = this.product.price),
        (this.cartItem.image = this.product.pro_image1),
        (this.cartItem.id = this.product.id);
      if (this.cartItem.name) {
        this.present = true;
      } else {
        this.present = false;
      }
      if(!this.product){
        this.preload = true
      }
      else{
        this.preload = false
      }
    });
  },
  methods: {
    addtocart() {
      if (this.cartItem.color && this.cartItem.size) {
        this.cart.push(this.cartItem);
        console.log(this.cart);
        this.savecart();
        this.$root.$emit("cart_length");
        this.err = "ITEM ADDED";
      } else {
        this.err = "Color and Size can not be empty";
      }
    },
    savecart() {
      var string = JSON.stringify(this.cart);
      localStorage.setItem("cart", string);
    },
  },
};
</script>

// css are here
<style scoped>
/* google font links */
@import url("https://fonts.googleapis.com/css2?family=Aldrich&family=Poppins:wght@300&family=Rubik+Mono+One&family=Sriracha&display=swap");
/* end here */
/* label focus color */
.input-field input[type="text"]:focus + label {
  color: rgb(20, 18, 18);
}
/* label underline focus color */
.input-field input[type="text"]:focus {
  border-bottom: 1px solid rgb(255, 199, 248);
  box-shadow: 0 1px 0 0 rgb(253, 213, 248);
}
.preload{
  position: relative;
  top: 200px;
}
.invalid {
  font-family: sans-serif;
  font-size: 30px;
  position: relative;
  bottom: 300px;
}
.extra-info {
  margin-top: 50px;
}
.desall {
  margin-left: 30px;
}
.button {
  margin-left: 40px;
  margin-top: 20px;
}
.title {
  font-family: "Sriracha", cursive;
  font-size: 30px;
  padding: 20px;
}
.name {
  font-size: 25px;
  font-family: "Aldrich", sans-serif;
}
.price {
  font-size: 25px;
  font-family: "Aldrich", sans-serif;
}
.des {
  font-family: "Poppins", sans-serif;
  font-size: 18px;
  margin-top: 10px;
  line-height: 27px;
}
.des-head {
  font-family: "Poppins", sans-serif;
  font-size: 30px;
  margin-top: 25px;
}
.html {
  margin-top: 38px;
}
.detail {
  width: 500px;
}
.color-btn{
  width: 100px;
  margin-left: 80px;
}
@media screen and (max-width: 550px) {
  .desall {
    margin-left: 0px;
    margin: 0px;
  }
  .detail {
  width: 450px;
}
}
@media only screen and (min-width: 250px) and (max-width:380px) {
.detail {
  width: 320px;
}
.name{
  font-size: 20px;
}
.price{
  font-size:17px;
}
.color{
  font-size: 13px;
}
.des {
  font-family: "Poppins", sans-serif;
  font-size: 14px;
  margin-top: 10px;
  line-height: 27px;
}
.des-head {
  font-family: "Poppins", sans-serif;
  font-size: 20px;
  margin-top: 25px;
}
.color-btn{
  width: 100px;
  margin-left:0px;
}
}
</style>
