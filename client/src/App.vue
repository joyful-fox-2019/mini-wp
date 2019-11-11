<template>
  <div id='app'>

    <WithoutToken
      @check-token="checkToken" 
      v-if="!tokenExists">
    </WithoutToken> 

    <WithToken 
      v-if="tokenExists"
      @check-token="checkToken"
      @sign-out="signOut">
    </WithToken>

  </div>
</template>

<script>
import WithoutToken from './views/WithoutToken'
import WithToken from './views/WithToken'

export default {
  name: 'app',
  data() {
    return {
      tokenExists: false
    }
  },
  mounted() {
    this.checkToken()
  },
  methods: {
    signOut: function() {
      localStorage.removeItem('access_token')
      this.checkToken()
    },
    checkToken: function() {
      const access_token = localStorage.getItem('access_token')
      console.log('checkToken terpanggil', access_token);
      if (access_token) {
        this.tokenExists = true
      }
      else {
        this.tokenExists = false
      }
    }
  },
  components: {
    WithoutToken, WithToken
  }
};
</script>

<style scoped>
  /* * {
    width: 100vw;
  } */
</style>