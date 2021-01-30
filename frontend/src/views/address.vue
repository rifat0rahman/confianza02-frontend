<template>
  <div class="upcontain">
    <div class="center title">
      Feel free give us the informations you wanna get your product
      <p
        style="margin: 20px; font-family: arial; font-size: 15px"
        class="red-text"
      >
        {{ err }}
      </p>
    </div>
    <div>
      <div class="container">
        <div class="row">
          <div class="col l6 m6 s6 cols">
            <input
              type="text"
              placeholder="Your Name"
              v-model="UserInfo.name"
              required
            />
          </div>
          <div class="col l6 m6 s6 cols">
            <input
              type="text"
              placeholder="Your Email"
              v-model="UserInfo.email"
              required
            />
          </div>
          <div class="col l6 m12 s12 cols secondrow">
            <input
              type="text"
              placeholder="Your Number"
              v-model="UserInfo.number"
              required
            />
          </div>
          <div class="col l6 m12 s12 cols secondrow">
            <div class="row address">
              <div class="col l4 m4 s4">
                <div class="lebal">
                  <p>Division</p>
                </div>
                <div class="input-field">
                  <select v-model="UserInfo.address.divisions" required>
                    <option
                      :value="division.division"
                      v-for="division in division_data"
                      :key="division.id"
                    >
                      {{ division.division }}
                    </option>
                  </select>
                </div>
              </div>
              <div>
                <div class="col l4 m4 s4">
                  <div class="lebal">
                    <p>District</p>
                  </div>
                  <div class="input-field">
                    <select v-model="UserInfo.address.district" required>
                      <option
                        v-for="district in district_data"
                        :key="district.id"
                      >
                        {{ district.district }}
                      </option>
                    </select>
                  </div>
                </div>
              </div>
              <div>
                <div class="col l4 m4 s4 upozella">
                  <div class="input-field">
                    <input
                      type="text"
                      placeholder="Upozella"
                      v-model="UserInfo.address.upozella"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col l6 m6 s6 cols">
            <input
              type="text"
              placeholder="Your external address"
              v-model="UserInfo.address.external_address"
            />
          </div>
          <div class="col l6 m6 s6 cols">
            <input
              type="text"
              placeholder="Your external number"
              v-model="UserInfo.external_number"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="center">
      <div class="pym-head">Payment methods</div>
      <div class="pym-cont">
        <p style="display: inline-block; margin: 15px">
          <label>
            <input
              type="checkbox"
              value="Cash On Delivery"
              v-model="UserInfo.delivery_method"
            />
            <span>Cash On Delivery</span>
          </label>
        </p>
        <p style="display: inline-block">
          <button class="btn">Bkash</button>
          <span class="grey-text lighten-1">coming soon</span>
        </p>
      </div>
    </div>
    <div class="center">
      <input
        type="submit"
        class="btn red lighten-1"
        name="info"
        value="Confirm Order"
        @click="order"
      />
    </div>
  </div>
</template>

<script>
import M from "materialize-css";
import Axios from "axios";
import region_data from "../data.js";

export default {
  mounted() {
    M.AutoInit();
    var cart = JSON.parse(localStorage.getItem('cart'))
    if(!cart.length){
      this.$router.push('/cart')
    }
  },
  // address func
  data() {
    return {
      err: "",
      divisions: [],
      division_data: null,
      district_data: null,
      UserInfo: {
        name: null,
        email: null,
        number: null,
        delivery_method: null,
        address: {
          divisions: null,
          district: null,
          upozella: null,
          external_address: null,
        },
        external_number: null,
      },
    };
  },
  created() {
    this.division_data = region_data.division.data;
    this.district_data = region_data.district.data;
    const user_data = this.$cookies.get("user_info");
    if (user_data) {
      this.UserInfo.name = user_data.name;
      this.UserInfo.email = user_data.email;
      this.UserInfo.number = user_data.phone;
    }
  },
  methods: {
    order() {
      const cart_data = JSON.parse(localStorage.getItem("FinalCart"));
      if (this.UserInfo.address.divisions && this.UserInfo.address.district) {
        Axios.post(this.baseUrl+"/orders", {
          cart: JSON.stringify(cart_data[0].cart),
          pricing: JSON.stringify(cart_data[1].price_condition),
          Placement: JSON.stringify(this.UserInfo),
          user: JSON.stringify(this.$cookies.get("user")),
          quantities: JSON.stringify(cart_data[0].cart.length),
          address: JSON.stringify(
            this.UserInfo.address.upozella,
            this.UserInfo.number
          ),
        })
          .then(() => {
            localStorage.setItem("cart", "");
            this.$root.$emit("cart_length");
            this.$router.push({ path: "/orders" });
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        this.err = "fill the division and district field or cart is empty";
      }
    },
  },
};
</script>

<style scoped>
.pym-head {
  font-family: "Courier New", Courier, monospace;
  font-size: 20px;
  margin: 5px;
}
.pym-cont {
  margin: 20px;
}
.secondrow {
  margin-top: 30px;
}
.upozella {
  position: relative;
  top: 20px;
}
.lebal {
  position: relative;
  top: 25px;
  color: rgb(187, 187, 187);
}
.address {
  position: relative;
  bottom: 35px;
}
.row {
  margin-bottom: 30px;
}
.cols {
  margin-bottom: 20px;
}
.title {
  margin: 40px;
  font-size: 20px;
  font-family: "Courier New", Courier, monospace;
  font-weight: 600;
}
.upcontain {
  margin-top: 60px;
  padding: 10px;
}
</style>