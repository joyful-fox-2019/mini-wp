<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item href="#" @click="gotomine">
            <i class="fab fa-wordpress-simple fa-lg"></i>
            My Sites
          </b-nav-item>
          <b-nav-item href="#" @click="readerpage">
            <i class="far fa-newspaper fa-lg"></i>
            Reader
          </b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <button
            type="button"
            class="btn btn-secondary"
            v-if="sites === 'mysite'"
            @click="writearticle"
          >
            <i class="far fa-file fa-lg"></i>
            Write
          </button>
          <b-nav-form v-if="sites === 'reader'" @submit="searchfile">
            <b-form-input size="sm" class="mr-sm-2" placeholder="Search" v-model="searching"></b-form-input>
            <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
          </b-nav-form>

          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template v-slot:button-content>
              <i class="far fa-user-circle fa-lg"></i>
            </template>
            <b-dropdown-item href="#">Profile</b-dropdown-item>
            <b-dropdown-item href="#" @click="userout">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searching: ""
    };
  },
  props: {
    sites: String
  },
  methods: {
    userout() {
      this.$emit("signout", "login");
    },
    gotomine() {
      this.$emit("mypage", "mysite");
    },
    readerpage() {
      this.$emit("readersite", "reader");
    },
    writearticle() {
      this.$emit("gotocreate", "create");
    },
    searchfile(evt) {
      evt.preventDefault();
      this.$emit("searcharticle", this.searching);
      this.searching = "";
    }
  }
};
</script>

<style>
</style>