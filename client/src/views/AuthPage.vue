<template>
<div>
  <RegisterLogin></RegisterLogin>
</div>
</template>

<script>
import RegisterLogin from "../components/RegisterLogin"

export default {
  name : 'AuthPage',
  data : function() {
    return {
      isRegistered : false
    }
  },
  methods : {
    setIsRegistered(status) {
      this.isRegistered = status
    },
    setIsLogin(status) {
      this.$emit('setIsLogin', true)
    }
   },
  components : {
    RegisterLogin
  }
}
</script>

<style scoped>

</style>
