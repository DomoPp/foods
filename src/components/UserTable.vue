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
          <td>{{index + 1}}</td>
          <td>
            <router-link :to="`/api/${food.fId}`">{{food.fName}}</router-link>
          </td>
          <td>
            <b-link @click="edit(user.id)">
              <b-icon icon="pencil"></b-icon>
            </b-link>
          </td>
          <td>
            <b-link @click="del(user.id)">
              <b-icon icon="trash"></b-icon>
            </b-link>
          </td>
        </tr>
      </tbody>
    </table>

    <modalEdit ref="modalEdit" />
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
            axios.delete(`http://127.0.0.1:3000/api/user/${id}`);
            //update table
            this.users = this.users.filter(user => user.id != id);
            //this.$refs.showAlert.showAlert();
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    edit(id) {
      this.$refs.modalEdit.showModalEdit(id);
    }
  },
  mounted() {
    axios
      .get("http://127.0.0.1:3000/api/foods")
      .then(response => {
        this.foods = response.data;
      });
  }
};
</script>