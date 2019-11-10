<template>
  <div>
    <div class="d-flex align-items-center" style="background: #006088;">
      <div class="p-2">
        <div style="color: white;">
          <i class="fab fa-wordpress fa-1x"></i> My Site
        </div>
      </div>
      <div class="p-2">
        <div style="color: white;">
          <i class="fas fa-book"></i> Reader
        </div>
      </div>
      <div class="p-2 ml-auto d-flex align-items-center">
        <div class="px-3">
          <button @click="switchCreate" type="button" class="btn btn-light">
            <i class="fas fa-edit"></i> Write
          </button>
        </div>
        <div class="px-3" style="color: white;">
          <button @click="switchCreate" type="button" class="btn btn-info">
          <i class="fas fa-user-circle fa-1x"></i> Profile
          </button>
        </div>
        <div class="px-3" style="color: white;">
          <button @click="setLogout" type="button" class="btn btn-info">
            <i class="fas fa-sign-out-alt"></i> Logout
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "naviBar",
  methods: {
    switchCreate() {
      this.$emit("switchCreate");
    },
    setLogout(){
      this.$emit('setLogout');
    }
  }
};
</script>

<style scoped>
</style>