<template>
  <div>
    <b-container class="bv-example-row">
      <b-row class="text-center">
        <b-col></b-col>
        <b-col cols="8">
          <div class="card">
            <b-form @submit="onSubmit" @reset="onReset">
              <b-form-group label="ชื่ออาหาร: " label-for="food-name">
                <b-form-input ref="name" v-model="form.name" required placeholder="Enter Name food.."></b-form-input>
              </b-form-group>

              <b-form-group label="วัตถุดิบ: " label-for="ingredient">
                <b-form-input
                  ref="ingredient"
                  v-model="form.ingredient"
                  type="text"
                  required
                  placeholder="Enter ingredient.."
                ></b-form-input>
              </b-form-group>

              <b-form-group label="โดย: " label-for="by">
                <b-form-input
                  ref="by"
                  v-model="form.by"
                  type="text"
                  required
                  placeholder="Enter By.."
                ></b-form-input>
              </b-form-group>

              <b-form-group label="สูตร: " label-for="formula">
                <b-form-textarea
                  v-model="form.formula"
                  placeholder="Enter formula..."
                  rows="3"
                  max-rows="6"
                ></b-form-textarea>
              </b-form-group>

              <b-form-group label="รูป: " label-for="img">
                <input type="file" ref="img"/>
              </b-form-group>

              <b-button type="submit" variant="success" class="float-right">เพิ่ม</b-button>
              <b-button type="reset" variant="danger" class="float-left">ล้าง</b-button>
            </b-form>
          </div>

          <!-- <showAlert ref="showAlert" /> -->
          <b-form-input
            class="mt-3 mb-3"
            type="text"
            required
            placeholder="Search"
            @change="search"
          ></b-form-input>

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
      form: {
        name: "",
        ingredient: "",
        by: "",
        formula: ""
      }
    };
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      //alert(JSON.stringify(this.form))
      
      let fd = new FormData();
      fd.append("f_name", this.form.name);
      fd.append("f_ingredient", this.form.ingredient);
      fd.append("f_formula", this.form.formula);
      fd.append("f_by", this.form.by);
      fd.append("f_img", this.$refs.img.files[0]);

      axios.post("http://127.0.0.1:3000/api/foods", fd).then(res => {
        //this.$refs.showAlert.showAlert();
        this.$refs.userTable.foods = res.data;

        this.resetForm();
      });
    },
    onReset(evt) {
      evt.preventDefault();
      // Reset our form values
      this.resetForm();
    },
    resetForm() {
      this.form.name = "";
      this.form.ingredient = "";
      this.form.by = "";
      this.form.formula = "";
      this.$refs.img.values = "";
    },
    search(e) {
        console.log(e);
      
        // if (e !== "*" && e !== "") {
        //     const x = this.state.depositData.filter(n => {
        //         const regex = new RegExp(`${this.searchTxt.value}`);
        //         return regex.test(n.p_name);
        //     });
        //     this.setState({ depositData: x });
        // }else{
        //     let x;
        //     if(this.state.categoryType === "0"){
        //         x = this.state.data;
        //     }else{
        //         x = this.state.data.filter(n => this.state.categoryType === n.c_id.toString());
        //     }
        //     this.setState({ depositData: x });
        // }
      
    }
  }
};
</script>

<style>
.card {
  margin-bottom: 20px;
  border-color: transparent;
  text-align: start
}
</style>