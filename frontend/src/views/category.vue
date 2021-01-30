<template>
  <div class="html container">
    <!-- header of the page -->
    <div>
      <div class="collection">
        <h5 class="center-align collection-item">
          <i class="material-icons">all_inclusive</i
          ><span class="text">Categories and Marchents</span>
        </h5>
      </div>
    </div>
    <!-- preloader -->
    <div class="center preload" v-show="preload">
      <div class="preloader-wrapper big active">
        <div class="spinner-layer spinner-blue-only">
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
    <!-- categories card -->
    <div class="divison" v-show="!preload">
      <div class="row">
        <div
          class="col l3 m3 s6"
          v-for="category in categories"
          :key="category.id"
        >
          <div class="card">
            <div class="card-image waves-effect waves-block waves-light">
              <img
                class="activator"
                :src="baseUrl+ category.image"
              />
            </div>
            <div class="card-content"></div>
            <div class="card-reveal">
              <span class="card-title grey-text text-darken-4"
                >{{ category.name
                }}<i class="material-icons right">close</i></span
              >
              <p>
                {{ category.descriptions }}
              </p>
              <div class="center">
                <button
                  class="btn grey button"
                  @click="categorized(category.id)"
                >
                  products
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import M from "materialize-css";
import Axios from "axios";
export default {
  data() {
    return {
      categories: "",
      preload: true,
    };
  },
  mounted() {},
  // main functionality is here
  created() {
    Axios.get(this.baseUrl+"/categories").then((data) => {
      this.categories = data.data;
      if (!this.categories) {
        this.preload = true;
      } else {
        this.preload = false;
      }
    });
  },
  methods: {
    categorized(id) {
      localStorage.setItem("cate_id", id);
      this.$router.push({ path: "/pro_by_cate" });
      id;
    },
  },
};
</script>
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Aldrich&family=Poppins:wght@300&family=Rubik+Mono+One&family=Sriracha&display=swap");
.html {
  margin-top: 50px;
}
.preload{
  position: relative;
  top: 200px;
}
.divison {
  height: 200px !important;
}
.text {
  font-family: "Aldrich", sans-serif;
  position: relative;
  bottom: 3px;
  margin-left: 10px;
}
.button {
  margin-top: 10px;
}
.card .card-content {
  padding: 24px;
  border-radius: 0 0 2px 2px;
  height: 0px;
}
.card .card-image img {
  display: block;
  border-radius: 2px 2px 0 0;
  position: relative;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 250px;
}
@media screen and (max-width:800px){
.name{
  font-size: 16px;
}
}
/* container for not more than bigger */

@media only screen and (min-width:10px){
  .container {
    width: 100%;
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
