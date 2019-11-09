<template>
  <div>
      <div class="login-container d-flex flex-column justify-content-center align-items-center" style="height: 80vh;">
            <h1>My Profile</h1>
            <form @submit.prevent="register" class="d-flex flex-column justify-content-center align-items-center">
                <input v-model="email" type="text" placeholder="Enter Email">
                <input v-model="password" type="password" placeholder="Enter Password">
                <input class="btn btn-info" type="submit">
            </form>
            <h3>or</h3>
            <span @click="changePage" >Already have account? login</span>
        </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>