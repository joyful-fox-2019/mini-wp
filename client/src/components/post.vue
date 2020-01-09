<template>
  <div>
    <b-card :img-src="image" img-alt="Card image" img-left class="mb-3">
      <b-card-title>{{title}}</b-card-title>
      <b-card-sub-title>{{user}} | {{status}}</b-card-sub-title>
      <b-card-text v-html="content"></b-card-text>
      <b-card-footer>Created at : {{date}}</b-card-footer>
      <div class="icon" v-if="page === 'mysite'">
        <i class="far fa-trash-alt" @click="deletecontent"></i>
        <i class="far fa-edit" @click="editcontent"></i>
      </div>
    </b-card>
  </div>
</template>

<script>
export default {
  props: {
    id: String,
    user: String,
    date: String,
    image: String,
    title: String,
    content: String,
    status: String,
    page: String
  },
  methods: {
    deletecontent() {
      this.$emit("removecontent", this.id);
    },
    editcontent() {
      this.$emit("editarticle", this.id);
    }
  }
};
</script>

<style>
.mb-3 img {
  width: 250px;
  height: 250px;
}
.fa-trash-alt:hover {
  cursor: pointer;
  color: red;
}
.fa-edit:hover {
  cursor: pointer;
  color: #17a2b8;
}
.icon {
  word-spacing: 8px;
}
</style>