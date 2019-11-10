<template>
  <div>
    <div class="p-2 d-flex flex-column" style="width: 272px;">
      <div class="sidebar">
        <a href="#" class="nav-link">
          <i class="fas fa-tv mr-2"></i>View Site
        </a>
      </div>
      <div class>
        <a href="#" class="nav-link">
          <i class="fas fa-signal mr-2"></i>Stats
        </a>
      </div>

      <div class>
        <a href="#" class="nav-link">
          <i class="fas fa-history mr-2"></i>Activity
        </a>
      </div>
      <div class>
        <a href="#" class="nav-link">
          <i class="fas fa-american-sign-language-interpreting mr-2"></i>Plan
        </a>
      </div>
      <div class>
        <a href="#" class="nav-link">
          <i class="far fa-file-alt mr-2"></i>Site Pages
        </a>
      </div>
      <div class>
        <a href="#" class="nav-link">
          <i class="fas fa-th mr-2"></i>Blog Posts
        </a>
      </div>
      <div class>
        <a href="#" class="nav-link">
          <i class="far fa-image mr-2"></i>Media
        </a>
      </div>
      <div class>
        <a href="#" class="nav-link">
          <i class="fas fa-comments mr-2"></i>Comments
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "leftBar"
};
</script>

<style scoped>
.nav-link {
  color: black;
}

.nav-link:hover {
  background: #006088;
  color: white;
}
</style>