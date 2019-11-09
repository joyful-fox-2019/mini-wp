<template>
  <b-list-group>
    <b-list-group-item v-for="(tag, index) in tags" :key="index" class="d-flex justify-content-between align-items-center">
      {{ tag.name }}
      <b-badge variant="info" pill> {{ tag.count }} </b-badge>
    </b-list-group-item>
  </b-list-group>
</template>

<script>
export default {
  name:'Taglist',
  props: {
    tags: Array
  },
  created(){
    console.log(this.tags)
  }
}
</script>

<style>

</style>