<template>
  <b-row no-gutters @click="gotoDetail(dataId)">
    <b-col>
      <b-card class="mb-2 border-secondary">
        <b-row class="text-dark align-items-center">
          <b-col class="text-center" cols="1">
            <b>1.</b>
          </b-col>
          <b-col class cols="5">
            <b>Bagaimana cara pemanfaatan PWA dan pengunaannya di kehidupan nyata</b>
          </b-col>
          <b-col cols="3">Wed, 20 January 2019</b-col>
          <b-col class="text-center" cols="3">
            <p class="m-0">
              <span>Ruby</span>
              <span>PHP</span>
              <span>Javascript</span>
              <span>Phyton</span>
            </p>
          </b-col>
        </b-row>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
export default {
  data() {
    return {
      dataId: 2
    };
  },
  methods: {
    gotoDetail(_id) {
      this.$router.push({ path: `/admin/edit-article/${_id}`});
    }
  }
};
</script>

<style>

</style>