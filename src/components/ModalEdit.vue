<template>
  <b-modal id="modalEdit" :title="title" hide-footer>
    <div>
      <b-form>
        <b-form-group label="ชื่ออาหาร: " label-for="food-name">
          <b-form-input ref="name" v-model="form.f_name" required placeholder="Enter Name food.."></b-form-input>
        </b-form-group>

        <b-form-group label="วัตถุดิบ: " label-for="ingredient">
          <b-form-input
            ref="ingredient"
            v-model="form.f_ingredient"
            type="text"
            required
            placeholder="Enter ingredient.."
          ></b-form-input>
        </b-form-group>

        <b-form-group label="โดย: " label-for="by">
          <b-form-input
            ref="by"
            v-model="form.f_by"
            type="text"
            required
            placeholder="Enter By.."
          ></b-form-input>
        </b-form-group>

        <b-form-group label="สูตร: " label-for="formula">
          <b-form-textarea
            v-model="form.f_formula"
            placeholder="Enter formula..."
            rows="3"
            max-rows="6"
          ></b-form-textarea>
        </b-form-group>

        <b-button type="submit" variant="success" class="float-right" @click="update">แก้ไข</b-button>
      </b-form>
    </div>
  </b-modal>
</template>

<script>
import axios from "axios";

export default {
  name: "modalEdit",
  data() {
    return {
      title: "",
      form: {
        f_id: "",
        f_name: "",
        f_ingredient: "",
        f_by: "",
        f_formula: ""
      }
    };
  },
  props: {
    loadData: Function
  },
  methods: {
    showModalEdit(id) {
      axios.get(`http://127.0.0.1:3000/api/food/${id}`).then(response => {
        this.form = response.data[0];
        
        this.$bvModal.show("modalEdit");
        this.title = `UPDATING ID: ${this.form.f_id}`;
      });
    },
    update(e) {
      e.preventDefault();
      
      axios.put(`http://127.0.0.1:3000/api/food/${this.form.f_id}`, this.form).then(response => {
        
        // console.log(response.data);
        this.$props.loadData(response.data);
        this.$bvModal.hide("modalEdit");
      });
    }
  },
};
</script>