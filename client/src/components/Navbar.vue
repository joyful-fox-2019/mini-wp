<template>
  <nav class="navbar navbar-expand fixed-top justify-content-between">
    <ul class="navbar-nav" id="nav-left">
      <li
        class="dashboard nav-item"
        v-bind:class="{ active: page === 'dashboard' }"
        v-on:click="switchPage('dashboard')"
      >
        <a class="nav-link">
          <i class="fab fa-wordpress"></i> My Site
        </a>
      </li>
      <li
        class="dashboard nav-item"
        v-bind:class="{ active: page === 'about' }"
        v-on:click="switchPage('about')"
      >
        <a class="nav-link">
          <i class="far fa-question-circle"></i> About Creator
        </a>
      </li>
    </ul>
    <ul class="navbar-nav" id="right-nav">
      <li
        class="nav-item"
        v-bind:class="{ active: page === 'write' }"
        v-on:click="switchPage('write')"
      >
        <a class="nav-link">
          <i class="far fa-edit"></i> Write
        </a>
      </li>
      <li class="nav-item dropdown" v-bind:class="{ active: page === 'account' }">
        <a class="nav-link dropdown-togle" data-toggle="dropdown">
          <i class="fas fa-user-circle"></i> Account
        </a>
        <div class="dropdown-menu dropdown-menu-right">
          <a class="dropdown-item">Your Account</a>
          <a class="dropdown-item" @click.prevent="signOut">Sign Out</a>
        </div>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: ["page"],
  methods: {
    switchPage(val) {
      this.$emit("switch-page", val);
    },
    signOut() {
      localStorage.clear();
      this.$emit("signed-out");
    }
  }
};
</script>

<style scoped>
.dropdown-item {
  cursor: pointer;
}

.dropdown-item:hover {
  background-color: #c5d9ed;
}
</style>