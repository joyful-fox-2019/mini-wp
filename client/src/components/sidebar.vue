<template>
  <div class="col-md-2 mt-4">
    <div class="menu-bar">
      <p>Manage</p>
      <div class="menu" @click="gotoall">
        <div class="icon">
          <i class="fas fa-book-open"></i>
        </div>
        <div class="name">View my article</div>
      </div>
      <div class="menu" @click="gotodraft">
        <div class="icon">
          <i class="far fa-sticky-note fa-lg"></i>
        </div>
        <div class="name">Draft</div>
      </div>
      <div class="menu" @click="gotopublished">
        <div class="icon">
          <i class="far fa-clipboard fa-lg"></i>
        </div>
        <div class="name">Published</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: ""
    };
  },
  methods: {
    gotodraft() {
      this.$dlg.toast(`Draft section`, {
        messageType: "success",
        closeTime: 2,
        position: "topCenter"
      });
      this.$emit("draftsection", "Draft");
    },
    gotopublished() {
      this.$dlg.toast(`Published section`, {
        messageType: "success",
        closeTime: 2,
        position: "topCenter"
      });
      this.$emit("publishsection", "Published");
    },
    gotoall() {
      this.$dlg.toast(`All section`, {
        messageType: "success",
        closeTime: 2,
        position: "topCenter"
      });
      this.$emit("allsection", "");
    }
  }
};
</script>

<style>
.col-md-2 {
  border-right: 2px solid grey;
  height: 84vh;
  padding: 0px !important;
}
.menu {
  margin-bottom: 5%;
  padding-left: 3%;
}
.menu:hover {
  background-color: skyblue;
}
</style>