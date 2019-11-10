<template>

  <div id="navbar-no-token" 
    class="navbar-fixed">

    <nav class="main-navbar" 
      role="navigation">
      <div class="nav-wrapper container">
        <ul class="left">
          <li>
            <a href="#"
              @click="showHome">
              <img
                class="nav-logo"
                src="https://s.w.org/style/images/about/WordPress-logotype-simplified.png"
                alt="logo"
              />
              <p class="nav-link-title">Home</p>
            </a>
          </li>
          <!-- <li>
            <a href="#">
              <img
                class="nav-logo"
                src="https://icons-for-free.com/iconfiles/png/512/news+newspaper+paper+press+icon-1320085812194058032.png"
                alt="logo"
              />
              <p class="nav-link-title">Reader</p>
            </a>
          </li> -->
        </ul>

        <ul class="right">
          <!-- @click="toggleAddPostForm"
              v-bind:class="{active: addPostFormActive}" -->
          <li>
            <a
              @click="toggleAddPostForm"
              href="#"
              id="nav-button-write"
              class="nav-button waves-effect waves btn white"
            >
              <img
                class="nav-logo-write"
                src="https://static.thenounproject.com/png/204040-200.png"
                alt="logo"
              />
            </a>
          </li>
          <li>
            <!-- @click="signOut -->
            <a href="#"
              @click="showProfile">
              <img
                class="nav-logo-right profile"
                src="https://img.pngio.com/profile-icon-png-image-free-download-searchpngcom-profile-icon-png-673_673.png"
                alt="logo-profile"
              />
            </a>
          </li>

          <li>
            <!-- <a href="#">
              <img
                class="nav-logo-right"
                src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-ios7-bell-512.png"
                alt="logo"
              />
            </a> -->
          </li>
        </ul>
      </div>
    </nav>
  </div>

</template>

<script>
export default {
  name: 'navbar-with-token',
  methods: {
    showHome: function() {
      this.$emit('show-home')
    },
    showProfile: function() {
      this.$emit('show-profile')
    },
    toggleAddPostForm: function() {
      this.$emit('toggle-add-post-form')
    }
  }
};
</script>

<style>
</style>