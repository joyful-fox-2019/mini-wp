<template>
  <b-card no-body class="overflow-hidden border-0 mb-4">
    <b-row no-gutters>
      <b-col md="4" >
        <img :src="imglink" style="object-fit: cover; height:20vh; width:100%;"  class="overflow-hidden">
      </b-col>
      <b-col md="8">
        <b-card-body :title="title">
          <p class="text-secondary mb-2"><small>{{ author }}, {{ date }}</small></p>
          <b-card-text>
            {{ description | truncate(180, '...') }}
          </b-card-text>
        </b-card-body>
      </b-col>
    </b-row>
  </b-card>
</template>

<script>
export default {
  name:'Articleitem',
  props: {
    imglink: String,
    author: String,
    date: String,
    description: String,
    title: String
  },
  created(){
    console.log(this.author)
    console.log(this.description)
  }
}
</script>

<style>

</style>