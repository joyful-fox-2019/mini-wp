<template>
  <div>
    <b-menu>
      <b-menu-list v-if="isLogin" icon="account" :label="user">
        <b-menu-item
          class="menu-item"
          v-if="isLogin"
          @click="publicPost"
          icon="home"
          label="Public Post"
        ></b-menu-item>
        <b-menu-item v-if="isLogin" @click="yourPost" icon="newspaper" label="Your Post"></b-menu-item>
        <b-menu-item v-if="isLogin" @click="write" icon="pencil" label="Write"></b-menu-item>
      </b-menu-list>
      <!-- <b-menu-list v-else icon="account" label="Menu">
        <div>
          <b-tooltip position="is-right" :delay="500" label="You must Login first..">
            <b-menu-item disabled icon="home" label="Pablic Post"></b-menu-item>
          </b-tooltip>
        </div>
        <div>
          <b-tooltip position="is-right" :delay="500" label="You must Login first..">
            <b-menu-item disabled icon="newspaper" label="Your Post"></b-menu-item>
          </b-tooltip>
        </div>
        <div>
          <b-tooltip position="is-right" :delay="500" label="You must Login first..">
            <b-menu-item disabled icon="newspaper" label="Your Post"></b-menu-item>
          </b-tooltip>
        </div>
      </b-menu-list>-->
      <b-menu-list label="Actions">
        <b-menu-item @click="handleLogout" v-if="isLogin" icon="logout" label="Logout"></b-menu-item>
        <b-menu-item @click="formLogin" v-else icon="login" label="Login"></b-menu-item>
      </b-menu-list>
    </b-menu>
  </div>
</template>

<script>
import swal from "sweetalert2";

export default {
  name: "MenuBar",
  props: ["username", "isLogin"],
  data() {
    return {
      isFullPage: true,
      user: localStorage.getItem("username")
    };
  },
  methods: {
    handleLogout() {
      const loadingComponent = this.$buefy.loading.open({
        container: this.isFullPage ? null : this.$refs.element.$el
      });
      setTimeout(() => loadingComponent.close(), 1 * 1000);
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      localStorage.removeItem("email");
      this.$emit("logout", false);
    },
    write() {
      this.$router.push("/write-post");
    },
    formLogin() {
      this.$emit("login", true);
    },
    publicPost() {
      const loadingComponent = this.$buefy.loading.open({
        container: this.isFullPage ? null : this.$refs.element.$el
      });
      setTimeout(() => loadingComponent.close(), 1 * 1000);
      setTimeout(() => this.$emit("home", true), 1 * 1000);
      this.$router.push("/");
    },
    yourPost() {
      const loadingComponent = this.$buefy.loading.open({
        container: this.isFullPage ? null : this.$refs.element.$el
      });
      setTimeout(() => loadingComponent.close(), 1 * 1000);
      setTimeout(() => this.$emit("isPublic", false), 1 * 1000);
      this.$router.push("/user-post");
    }
  }
};
</script>
<style scoped>
b-menu-item:active {
  background-color: #006088 !important;
}
menu-item-active-background-color {
  background-color: #006088 !important;
}
</style>

