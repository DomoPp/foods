<template>
  <div>
    <div>
      <p>ชื่อเมนู : {{food.f_name}}</p>
      <p>วัตถุดิบ : {{food.f_ingredient}}</p>
      <p>โดย : {{food.f_by}}</p>
      <img :src="`http://localhost:3000/img/${food.f_img}`" />
      <p>สูตร : {{food.f_formula}}</p>
    </div>
    <div>
      <b-row>
        <b-col></b-col>
        <b-col cols="6">
          <b-form class="form" @submit="onSubmit">
            <b-form-group label="ชื่อ: " label-for="food-name">
              <b-form-input v-model="comment.name" required placeholder="Enter Name " ref="c_name"></b-form-input>
            </b-form-group>

            <b-form-group label="เนื้อหา: " label-for="ingredient">
              <b-form-textarea
                required
                v-model="comment.detail"
                placeholder="Enter Comment"
                rows="3"
                max-rows="6"
              ></b-form-textarea>
            </b-form-group>

            <b-button type="submit" variant="success" class="float-right">comment</b-button>
          </b-form>
        </b-col>
        <b-col></b-col>
      </b-row>
    </div>

    <b-row v-for="(comment, index) in datacomment" :key="index">
      <b-col></b-col>
      <b-col cols="6">
        <div class="comment mt-3">
          <p>ชื่อผู้โพสต์ : {{comment.c_name}}</p>
          <p>comment: {{comment.c_detail}}</p>
          <p>เวลา: {{comment.c_date}}</p>
        </div>
      </b-col>
      <b-col></b-col>
    </b-row>

  </div>
</template>

<script>
import axios from "axios";

export default {
  data: () => ({
    food: {
      f_id: "",
      f_name: "",
      f_ingredient: "",
      f_by: "",
      f_formula: "",
      f_img: ""
    },
    comment: {
      name: "",
      detail: ""
    },
    datacomment: []
  }),
  methods: {
    async onSubmit(e) {
      e.preventDefault();
      await axios.post(
        `http://localhost:3000/api/comment/${this.$route.params.id}`,
        {
          c_name: this.comment.name,
          c_detail: this.comment.detail,
          c_food: this.food.f_id
        }
      );
      await axios
        .get(`http://localhost:3000/api/comment/${this.$route.params.id}`)
        .then(res => {
          this.datacomment = res.data;
          this.resetFormComment();
        });
    },
    resetFormComment() {
      this.comment.name = "";
      this.comment.detail = "";
    }
  },
  mounted() {
    axios
      .get(`http://localhost:3000/api/food/${this.$route.params.id}`)
      .then(res => {
        this.food = res.data[0];
      });
    axios
      .get(`http://localhost:3000/api/comment/${this.$route.params.id}`)
      .then(res => {
        this.datacomment = res.data;
      });
  }
};
</script>

<style scoped>
.form {
  text-align: start;
}
.comment {
  background-color: darkcyan;
  padding: 5px;
}
</style>