<template>
  <div>
    <div class="navbar-fixed">
    <div class="container">
      <nav class="container">
        <header class="#f5f5f5 white lighten-4 row">
          <div class="nav-wrapper">
            <div class="head">
              <div>
                <div class="col l6 m6 s6">
                  <span class="logo"
                    ><a href="/" style="color: black">Confianza</a></span
                  >
                </div>
                <div class="col l6 m6 s6">
                  <span
                    ><router-link to="/search" href="#"
                      ><i class="material-icons icons">search</i></router-link
                    ></span
                  >
                </div>
              </div>
            </div>
          </div>
        </header>
        <!-- Modal Structure -->
        <div id="modal1" class="modal" style="padding: 20px">
          <div class="modal-content">
            <p
              class="black-text center"
              style="font-family: monospace; font-size: 20px"
            >
              Are you sure logout yourself??
            </p>
          </div>
          <div class="modal-footer" style="margin-bottom: 20px">
            <button
              class="btn success modal-close waves-effect waves-green"
              style="margin: 10px"
            >
              No
            </button>
            <a
              href="/"
              class="btn red modal-close waves-effect waves-green"
              @click="logout"
            >
              Yes
            </a>
          </div>
        </div>
        <!-- modal end -->
        <div class="nav-wrapper #212121 grey darken-4 navup">
          <!-- profile,login,cart  here it depens on the size of screen -->
          <a
            class="right brand-logo dropdown-trigger"
            href="#"
            data-target="dropdown1"
            v-show="show"
            ><i class="large material-icons account">account_circle</i></a
          >
          <router-link
            to="/login"
            class="right brand-logo"
            href="#"
            v-show="!show"
            ><i
              class="large material-icons tooltipped lgin"
              data-position="left"
              data-tooltip="Login"
              >login</i
            ></router-link
          >
          <router-link to="/cart"
            class="small-cart">
             <span class="badge" style="position:relative;left:-18px;top:9px"
              ><p class="badge-text">{{ cart_length }}</p></span
            >
            <i class="material-icons icon tooltipped right brand-logo"
              >add_shopping_cart</i
            >
            </router-link
          >
          <!-- dropdown here -->
          <ul id="dropdown1" class="dropdown-content #e8f5e9 green lighten-5">
            <li>
              <div class="center">
                <div class="infogin">
                  <div class="row">
                    <div class="input-field col l12 m12 s12">
                      <input
                        disabled
                        :value="user_info.name"
                        id="disabled"
                        type="text"
                        class="validate"
                        style="width: 200px"
                      />
                    </div>
                    <div class="input-field col l12 m12 s12">
                      <input
                        disabled
                        :value="user_info.username"
                        id="disabled"
                        type="text"
                        class="validate"
                        style="width: 200px"
                      />
                    </div>
                  </div>
                  <div class="row">
                    <div class="input-field col l12 m12 s12">
                      <input
                        disabled
                        :value="user_info.email"
                        id="disabled"
                        type="text"
                        class="validate"
                        style="width: 200px"
                      />
                    </div>
                    <div class="input-field col l12 m12 s12">
                      <input
                        disabled
                        :value="user_info.phone"
                        id="disabled"
                        type="text"
                        class="validate"
                        style="width: 200px"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div class="center">
                <div>
                  <div>
                    <p class="info-text container" style="width: 250px">
                      Here are some informations you may need from us.
                    </p>
                  </div>

                  <div>
                    <router-link class="btn black margin-btn" to="/orders"
                      >Check your orders</router-link
                    >
                  </div>
                  <div>
                    <router-link class="btn black margin-btn" to="#"
                      >find your pyment history</router-link
                    >
                    <div style="margin-bottom: 30px">
                      <!-- Modal Trigger -->
                      <a
                        class="waves-effect waves-light btn modal-trigger"
                        href="#modal1"
                        >Logout</a
                      >
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
          <!-- profile logic here -->
          <a href="#" data-target="mobile-demo" class="sidenav-trigger"
            ><i class="material-icons">menu</i></a
          >
          <ul class="left hide-on-med-and-down">
            <li>
              <a href="/"
                ><i
                  class="material-icons icon tooltipped"
                  data-position="top"
                  data-tooltip="Shop"
                  >shop</i
                ></a
              >
            </li>
            <li>
              <router-link to="/category"
                ><i
                  class="material-icons icon tooltipped"
                  data-position="bottom"
                  data-tooltip="Categories"
                  >line_style</i
                ></router-link
              >
            </li>
            <li>
              <router-link to="/cart"
                ><i
                  class="material-icons icon tooltipped"
                  data-position="right"
                  data-tooltip="Cart"
                  >add_shopping_cart</i
                ></router-link
              >
            </li>
            <span class="badge badge"
              ><p class="badge-text">{{ cart_length }}</p></span
            >
          </ul>
        </div>
      </nav>
    </div>
    </div>
    <ul class="sidenav" id="mobile-demo">
      <li><a href="/">Shop</a></li>
      <li><router-link to="/category">Category</router-link></li>
      <li><router-link to="/login" v-show="!show">Login</router-link></li>
      <li><router-link to="/profile" v-show="show">Profile</router-link></li>
    </ul>
    <router-view></router-view>
  </div>
</template>
<script>
import M from "materialize-css";
// import axios from "axios";
export default {
  data() {
    return {
      sticky: "",
      show: false,
      user_info: [],
      cart_length: "",
    };
  },
  created() {
    this.init();
    var user = this.$cookies.get("user");
    if (user) {
      this.show = true;
    }
    this.$root.$on("login", () => {
      this.show = true;
    });
    var userInfo = this.$cookies.get("user_info");
    if (userInfo) {
      this.user_info = userInfo;
    }
    // items quantity on cart
    if (localStorage.getItem("cart")) {
      var items = JSON.parse(localStorage.getItem("cart"));
    }
    if (items) {
      this.cart_length = items.length;
    } else {
      this.cart_length = 0;
    }
    // calling cartlength for updating length of new added items
    this.$root.$on("cart_length", () => {
      this.cartlength();
    });
    // logout from profile page
    this.$root.$on('logout',()=>{
      this.logout();
    })
  },
  methods: {
    logout() {
      this.$cookies.remove("user");
      this.$cookies.remove("user_info");
      localStorage.removeItem("cart");
    },
    cartlength() {
      if (localStorage.getItem("cart")) {
        var items = JSON.parse(localStorage.getItem("cart"));
      }
      if (items) {
        this.cart_length = items.length;
      } else {
        this.cart_length = 0;
      }
    },
    // page init
    init() {
      document.addEventListener("DOMContentLoaded", function () {
        var elems = document.querySelectorAll(".sidenav");
        var instances = M.Sidenav.init(elems);
        console.log(instances);
        // tooltip
        var elems1 = document.querySelectorAll(".tooltipped");
        var instances1 = M.Tooltip.init(elems1);
        console.log(instances1);
        // scroll controll
        // profile dropdown
        var elems2 = document.querySelectorAll(".dropdown-trigger");
        var instances2 = M.Dropdown.init(elems2, {
          constrainWidth: false,
          closeOnClick: true,
        });
        console.log(instances2);
        var elems3 = document.querySelectorAll(".modal");
        var instances3 = M.Modal.init(elems3);
        console.log(instances3);
      });
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Aldrich&family=Poppins:wght@300&family=Rubik+Mono+One&family=Sriracha&display=swap");
.sticky-nav {
  position: fixed;
  top: 0px !important;
}
.small-badge{
  margin-left: 19px !important;
}
.login-btn {
  margin-top: 20px;
  margin-bottom: 30px;
}
.footer-login {
}
.register-button {
  font-size: 10px;
}
.login-dropdown {
  width: 400px;
  height: auto;
}

.login {
  font-family: "Poppins", "arial";
  margin-top: 15px;
  border-radius: 10px 10px 10px 0px;
}
.infogin {
  margin-top: 20px;
}
.margin-btn {
  margin: 20px;
}
.info-text {
  font-family: "Poppins", sans-serif;
  font-weight: 1000;
  font-size: 17px;
  margin-bottom: 20px;
}
.infos {
  width: 200px;
}
.profile-img {
  width: 200px;
  border-radius: 500px 500px 500px 50px;
}
a {
  text-decoration: none !important;
}
* {
  margin: 0px;
  padding: 0px;
}
.icons {
  color: #000;
  position: relative;
  bottom: 15px;
}
.navup {
  position: relative;
  bottom: 50px;
}
.head {
  text-align: center;
  height: 30px !important;
}
.logo {
  display: inline-block;
  position: relative;
  bottom: 15px;
  font-size: 20px;
  margin-right: 50px;
  color: rgb(0, 0, 0);
  font-family: "Sriracha", cursive;
}
.cart {
  position: relative;
}
.badge {
  position: relative;
  left: -40px;
  top: 10px;
}
.badge-text {
  color: white;
}
@media screen and (max-width: 992px) {
  .account {
    display: none !important;
  }
  .lgin {
    display: none !important;
  }
}
@media screen and (min-width: 992px){
  .small-cart{
    display: none;
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
}
</style>
