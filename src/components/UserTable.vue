<template>
  <div>
    <table class="table table-hover">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(food, index) in foods" v-bind:key="index">
          <td>{{food.f_id}}</td>
          <td>
            <router-link :to="`/api/${food.f_id}`">{{food.f_name}}</router-link>
          </td>
          <td>
            <b-link @click="edit(food.f_id)">
              <b-icon icon="pencil"></b-icon>
            </b-link>
          </td>
          <td>
            <b-link @click="del(food.f_id)">
              <b-icon icon="trash"></b-icon>
            </b-link>
          </td>
        </tr>
      </tbody>
    </table>

    <modalEdit ref="modalEdit" :loadData="loadData" />
  </div>
</template>

<script>
import axios from "axios";
import modalEdit from "@/components/ModalEdit.vue";

export default {
  name: "userTable",
  components: {
    modalEdit
  },
  data() {
    return {
      foods: []
    };
  },
  methods: {
    del(id) {
      this.$bvModal
        .msgBoxConfirm(`DELETE ID : ${id}`, {
          title: "Confirmation"
        })
        .then(value => {
          if (value) {
            axios.delete(`http://127.0.0.1:3000/api/food/${id}`).then(res => {
              // console.log(res.data);
              this.foods = res.data;
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    edit(id) {
      this.$refs.modalEdit.showModalEdit(id);
    },
    loadData(data) {
      this.foods = data;
    }
  },
  mounted() {
    axios.get("http://127.0.0.1:3000/api/foods").then(response => {
      this.foods = response.data;
    });
  }
};
</script>