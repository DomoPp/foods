<template>
  <div>
    <b-container class="bv-example-row">
      <b-row class="text-center">
        <b-col></b-col>
        <b-col cols="8">
          <div class="card">
            <b-form @submit="onSubmit" @reset="onReset" v-if="show">
              
              <b-form-group id="input-group-1" label="Your Name:" label-for="input-1">
                <b-form-input ref="userName" v-model="form.name" required placeholder="Enter name"></b-form-input>
              </b-form-group>

              <b-form-group id="input-group-2" label="Email address:" label-for="input-2">
                <b-form-input
                  ref="userEmail"
                  v-model="form.email"
                  type="email"
                  required
                  placeholder="Enter email"
                ></b-form-input>
              </b-form-group>

              <b-form-group id="input-group-2" label="Email address:" label-for="input-2">
                <b-form-input
                  ref="userEmail"
                  v-model="form.email"
                  type="email"
                  required
                  placeholder="Enter email"
                ></b-form-input>
              </b-form-group>


              <b-form-group id="input-group-2" label="Email address:" label-for="input-2">
                <b-form-input
                  ref="userEmail"
                  v-model="form.email"
                  type="email"
                  required
                  placeholder="Enter email"
                ></b-form-input>
              </b-form-group>


              <b-button type="submit" variant="primary" class="float-right">Submit</b-button>
              <b-button type="reset" variant="danger" class="float-left">Reset</b-button>
            </b-form>
          </div>

          <!-- <showAlert ref="showAlert" /> -->

          <div class="card-header">User List</div>
          <div class="card-body">
            <userTable ref="userTable" />
          </div>
        </b-col>
        <b-col></b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import axios from "axios";
import userTable from "@/components/UserTable.vue";

export default {
  components: {
    userTable
  },
  data() {
    return {
      show: true,
      form: {
        name: "",
        email: ""
      }
    };
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      //alert(JSON.stringify(this.form))
      let data = this.form;
      let option = [
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      ];
      axios.post("http://127.0.0.1:3000/api/foods", data, option).then(res => {
        //this.$refs.showAlert.showAlert();
        console.log(res.data);
        
        this.resetForm();
      });
    },
    onReset(evt) {
      evt.preventDefault();
      // Reset our form values
      this.resetForm();
    },
    resetForm() {
      this.form.email = "";
      this.form.name = "";
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    }
  }
};
</script>

<style>
.card {
  margin-bottom: 20px;
  border-color: transparent;
}
</style>