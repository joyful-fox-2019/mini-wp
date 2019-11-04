<template>
  <div class="container">
    <div class="columns is-centered">
      <div class="column is-half">
        <img src="../../assets/login.png">
        <form>
          <b-field>
            <b-input v-model="email" placeholder="Email">
          </b-field>
          <b-field>
            <b-input v-model="password" placeholder="Password">
          </b-field>
          <button class="button is-warning" type="submit">
            Log in
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      email: '',
      password: ''
    }
  }
}
</script>

<style scoped>
  .container {
    width: 70% !important;
  }
  .button {
    font-family: 'Yeseva One', cursive;
    font-weight: bold;
    float: right;
  }
  img {
    max-height: 400px;
  }
</style>