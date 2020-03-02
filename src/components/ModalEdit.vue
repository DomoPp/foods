<template>
  <b-modal id="modalEdit" :title="title" hide-footer>
    <div>
      <b-form>
        <b-form-group id="input-group-1" label="Your Name:" label-for="input-1">
          <b-form-input required placeholder="Enter name" :value="user[0].name"></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-2" label="Email address:" label-for="input-2">
          <b-form-input type="email" required placeholder="Enter email" :value="user[0].email"></b-form-input>
        </b-form-group>

        <b-button type="submit" variant="primary" class="float-right">Submit</b-button>
        <b-button type="reset" variant="danger" class="float-left">Reset</b-button>
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
      user: [{}]    //json empty
    };
  },
  methods: {
    showModalEdit(id) {
      axios.get(`http://127.0.0.1:3000/api/user/${id}`).then(response => {
        this.user = response.data;
        console.log(JSON.stringify(this.user));
        this.$bvModal.show("modalEdit");
        this.title = `UPDATING ID: ${this.user[0].id}`;
      });
    }
  },
  mounted() {}
};
</script>