<template>
  <div class="container">
    <b-navbar class="bg-standard">
      <template slot="brand">
          <div @click="$router.push('/')" class="logo clickable">
            <strong class="t-standard font-fancy">Spotlight</strong>
          </div>
      </template>

      <template slot="end">
        <b-navbar-item tag="div">
          <div class="buttons">
            <div>
            <b-switch type="is-primary" v-model="isDark" size="is-small" style="margin-right: 10px;" class="t-standard">Dark Theme</b-switch>
            </div>
            <b-dropdown v-if="isLogin" aria-role="list" style="margin-right: 10px;">
              <div class="avatar-circle bg-primary-gradient clickable" slot="trigger">
                <span class="initials">{{ initial }}</span>
              </div>
              <!-- <button class="button bg-primary-gradient" slot="trigger">
                <span>My Articles</span>
                <b-icon icon="menu-down"></b-icon>
              </button> -->

              <b-dropdown-item @click="toWrite" class="bg-standard t-standard font-content" aria-role="listitem">Write Article</b-dropdown-item>
              <b-dropdown-item @click="toList" class="bg-standard t-standard font-content" aria-role="listitem">Article List</b-dropdown-item>
            </b-dropdown>
            <!-- <router-link to="/write-article">
              <button v-if="isLogin" class="button bg-primary-gradient" style="margin-right: 10px;">
                Write Article
              </button>
            </router-link> -->
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
      isDark: false,
      initial: ''
    }
  },
  props: {
    isLogin: Boolean
  },
  methods: {
    logout() {
      this.$emit('logout')
    },
    toWrite () {
      this.$router.push('/write-article')
    },
    toList () {
      this.$router.push('/my-articles')
    }
  },
  watch: {
    isDark() {
      this.$emit('setDark', this.isDark)
    },
    isLogin () {
      if(this.isLogin) {
        this.initial = localStorage.getItem('email').substring(0, 1).toUpperCase()
      }
    }
  },
  created () {
    if(this.isLogin) {
      this.initial = localStorage.getItem('email').substring(0, 1).toUpperCase()
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
  margin-top: 10px;
  font-size: 25px;
}
.avatar-circle {
  width: 50px;
  height: 50px;
  text-align: center;
  border-radius: 50%;
  -webkit-border-radius: 50%;
  -moz-border-radius: 50%;
}
.initials {
  top: 25px; /* 25% of parent */
  font-size: 25px; /* 50% of parent */
  line-height: 50px; /* 50% of parent */
  font-weight: bold;
}
</style>