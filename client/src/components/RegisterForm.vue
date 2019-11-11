<template>
  <div class="form form__signup">
    <div class="containerLogin">
      <div class="overlay">
        <form v-on:submit.prevent="register">
          <label for="email">E-MAIL</label>
          <input v-model="email" type="email" />
          <label for="password">PASSWORD</label>
          <input v-model="password" type="password" />
          <br />
          <input type="submit" value="REGISTER" />
        </form>
      </div>
      <div class="box left">
        <h4>Start working!</h4>
        <button class="btn btn__login" v-on:click="changePage">LOG IN</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RegisterForm",
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    changePage() {
      
    },
    register() {
      axios({
        method: "POST",
        url: "http://miniwpserver.hoandreasm.xyz/users/register",
        data: {
          email: this.email,
          password: this.password
        }
      })
        .then(({ data }) => {
          console.log(`register successful`);
          Swal.fire({
            type: "success",
            title: "Registration successful",
            showConfirmButton: false,
            timer: 1500
          });
        })
        .catch(err => {
          console.log(err);
          Swal.fire({
            type: "error",
            title: "Oops...",
            text:
              "The email that you use is already registered in our database, please use other email.",
            footer: "<a href>Why do I have this issue?</a>"
          });
        });
    }
  }
};
</script>

<style>
</style>