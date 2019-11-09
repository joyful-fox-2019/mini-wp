<template>
  <div class="container">
    <b-navbar class="bg-standard">
      <template slot="brand">
          <div @click="$router.push('/')" class="logo clickable">
            <strong class="t-standard">Spotlight</strong>
          </div>
      </template>

      <template slot="end">
        <b-navbar-item tag="div">
          <div class="buttons">
            <div>
            <b-switch type="is-primary" v-model="isDark" size="is-small" style="margin-right: 10px;" class="t-standard">Dark Theme</b-switch>
            </div>
            <router-link to="/write-article">
              <button v-if="isLogin" class="button bg-primary-gradient" style="margin-right: 10px;">
                Write Article
              </button>
            </router-link>
            <router-link to="/login">
              <a v-if="!isLogin" class="button bg-surface t-standard">
                Sign in
              </a>
            </router-link>
              <a v-if="isLogin" @click="logout" class="button bg-surface t-standard">
                Sign out
              </a>
          </div>
        </b-navbar-item>
      </template>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  data() {
    return {
      isDark: false
    }
  },
  props: ['isLogin'],
  methods: {
    logout() {
      this.$emit('logout')
    }
  },
  watch: {
    isDark() {
      this.$emit('setDark', this.isDark)
    }
  }
}
</script>

<style scoped>
.container {
  background: red;
}
button {
  font-family: 'Yeseva One', cursive;
  font-weight: bold;
}
.logo {
  font-family: 'Yeseva One', cursive;
  color: rgb(187, 187, 187) !important;
  margin-top: 3px;
  font-size: 25px;
}
a {
  font-family: 'Yeseva One', cursive;
}
</style>