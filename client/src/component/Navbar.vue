<template>
  <div class="hero head" style="margin: 0px; padding: 0px 30px 0px 50px;">
    <!-- navbar section -->
    <section class="navbar-section">
      <div class="hero-head">
        <nav class="navbar" role="navigation" aria-label="main navigation">
          <div class="navbar-brand">
            <a style="margin: 0px; padding:0px;">
              <img
                class="navbar-item"
                src="../../image/onetake.png"
                style="width:80px; margin: 0px; padding:0px;"
              />
            </a>

            <a
              role="button"
              class="navbar-burger burger"
              aria-label="menu"
              aria-expanded="false"
              data-target="navbarBasicExample"
              @click="drop"
            >
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>
          </div>

          <div id="navbarBasicExample" class="navbar-menu">
            <div class="navbar-end">
              <a class="navbar-item" @click.prevent="addpost">
                <span class="panel-icon" style="font-size: 18px">
                  <i class="fas fa-edit"></i>
                </span>
              </a>
              <a class="navbar-item">
                <span class="panel-icon" style="font-size: 18px">
                  <i class="fas fa-user-circle"></i>
                </span>
              </a>
              <a class="navbar-item">
                <span class="panel-icon" style="font-size: 18px">
                  <i class="fas fa-bell"></i>
                </span>
              </a>
              <a class="navbar-item" @click.prevent="logout">
                <span class="panel-icon" style="font-size: 18px">
                  <i class="fas fa-sign-out-alt"></i>
                </span>
              </a>
            </div>
          </div>
        </nav>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  methods: {
    logout() {
      localStorage.clear();
      this.$emit("logout");
    },
    drop() {
      var burger = document.querySelector(".burger");
      var menu = document.querySelector("#" + burger.dataset.target);
      burger.addEventListener("click", function() {
        burger.classList.toggle("is-active");
        menu.classList.toggle("is-active");
      });
    },
    addpost() {
      this.$emit("createpost");
    }
  }
};
</script>

<style scoped>
</style>