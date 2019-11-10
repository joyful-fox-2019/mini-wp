<template>
  <div class="container is-fluid">
    <div style="margin-top:150px">
      <div class="columns">
        <div class="column">
          <div style="display: flex; justify-content: center">
                <img src="../../assets/Logo.png" alt="" style="width: 400px; margin: 0px auto">
            </div>
        </div>
        <div class="column is-half">
          <Loginform v-if="!page" :is-login="isLogin" @set-login="setLogin" @set-page="setPage" @set-login-google="setLogin"></Loginform>
          <Registerform v-else :is-login="isLogin" @set-login="setLogin" @set-page="setPage"></Registerform>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import Registerform from '../components/registerform';
import Loginform from '../components/loginform'
export default {
  name:'Loginpage',
  data(){
    return{
      page: false
    }
  },
  components: {
    Registerform,
    Loginform
  },
  methods: {
    setLogin() {
      this.$emit("set-login");
    },
    setPage(page) {
      this.page = page;
    }
  },
  props: {
    isLogin: Boolean
  },
}
</script>

<style>

</style>