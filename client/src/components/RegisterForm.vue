<template>
 <div id="writePage">
    <Sidebar id="test" :userLogin="userLogin" @logout="userLogout"></Sidebar>
    <form @submit.prevent="register">
    <b-field label="Username">
      <b-input
        v-model="usernameRegister"
        placeholder="Your username"
        required>
      </b-input>  
    </b-field>
    <b-field label="Email">
        <b-input
            type="email"
            v-model='emailRegister'
            placeholder="Your email"
            required>
        </b-input>
    </b-field>
    <b-field label="Password">
        <b-input
            type="password"
            v-model='passwordRegister'
            password-reveal
            placeholder="Your password"
            required>
        </b-input>
    </b-field>
      <b-message type="is-danger" size="is-small" has-icon :auto-close="isActive" :duration="err.duration" :active.sync="isActive">
          {{ err.message }}
      </b-message>
    <!-- <button class="button" type="button" @click="$parent.close()">Close</button> -->
    <button class="button is-primary" type="submit">Sign Up</button>
  </form>
</div>
  
</template>

<script>
export default {
  name : 'registerForm',
  data(){
    return{
           emailRegister : '',
      passwordRegister : '',
      usernameRegister : '',
    }
  }
}
</script>

<style>
#writePage{
  display: flex;
  flex-direction: row
}
</style>