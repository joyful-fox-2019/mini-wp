<template>
  <section class="container-fluid border position-fixed section" id="sidebar">
    <div class="nav navbar-nav navbar-light flex-column">
      <div class="d-flex justify-content-start position-relative" id="show-web">
        <div style="font-size: 2em; margin-left: 1rem; margin-right: 1rem;">
          <i class="fas fa-home"></i>
        </div>
        <div>
          <p class="my-0">Alif Taufik</p>
          <small>
            <a href="#aaaa" class="stretched-link">View aliftaufik.home.blog</a>
          </small>
        </div>
      </div>
      <div class="nav-item" :class="{ active: section === 'all' }" @click="switchSection('all')">
        <h5>
          <a class="nav-link">All Articles</a>
        </h5>
      </div>
      <div
        class="nav-item"
        :class="{ active: section === 'posted' }"
        @click="switchSection('posted')"
      >
        <h5>
          <a class="nav-link">Posted</a>
        </h5>
      </div>
      <div
        class="nav-item"
        :class="{ active: section === 'draft' }"
        @click="switchSection('draft')"
      >
        <h5>
          <a class="nav-link">Draft</a>
        </h5>
      </div>
      <div
        class="nav-item"
        :class="{ active: section === 'trash' }"
        @click="switchSection('trash')"
      >
        <h5>
          <a class="nav-link">Trash</a>
        </h5>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      section: "all"
    };
  },
  methods: {
    switchSection(val) {
      this.section = val;
      this.$emit("switch-section", val);
    }
  }
};
</script>

<style scoped>
#sidebar {
  height: 100vh;
  width: 17rem;
  overflow-x: hidden;
  overflow-y: auto;
  top: 0;
  padding: 0;
}

#sidebar .nav-item {
  padding-left: 1rem;
  margin: 0;
}

#sidebar .nav-item.active {
  background-color: #c5d9ed;
}

#sidebar .nav-item:hover:not(.active) {
  background-color: #cccccc;
}

#show-web {
  margin-top: 4rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e9ecef;
}
</style>