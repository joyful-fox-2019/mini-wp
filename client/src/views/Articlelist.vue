<template>
  <div>
    <h2 class="mt-2 mb-4">
      <b></b> Post List ( Article List )
    </h2>
    <div>
      
      <!-- Data Header -->
      <b-row no-gutters>
        <b-col>
          <b-card class="mb-2 border-info" style="font-size:17px;">
            <b-row class="text-dark align-items-center">
              <b-col class="border-right text-center" cols="1">
                <b>No.</b>
              </b-col>
              <b-col class="border-right text-center" cols="5">
                <b>Article Title</b>
              </b-col>
              <b-col class="border-right text-center" cols="3">
                <b>Date Published</b>
              </b-col>
              <b-col class="text-center" cols="3">
                <b>Tag</b>
              </b-col>
            </b-row>
          </b-card>
        </b-col>
      </b-row>

      <!-- Article List -->
      <Articlelistbar></Articlelistbar>

    </div>
  </div>
</template>

<script>
import Articlelistbar from '../components/Articlelistbar'

export default {
  data() {
    return {};
  },
  components:{
    Articlelistbar
  },
  methods: {
    gotoDetail(_id) {
      this.$router.push({ path: `/admin/edit-article/${_id}`});
    }
  }
}
</script>

<style>
</style>