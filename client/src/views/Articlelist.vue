<template>
  <div> 
    <h2 class="mt-2 mb-4"> <b></b> Post List ( Article List )</h2>
    <div>

      <!-- Data Header -->
      <b-row no-gutters>
        <b-col>
          <b-card class="mb-2 border-info" style="font-size:17px;">
            <b-row class="text-dark align-items-center">
              <b-col class="border-right text-center" cols="1" >
                <b>No.</b>
              </b-col>
              <b-col class="border-right text-center" cols="5" >
                <b>
                  Article Title
                </b>
                
              </b-col>
              <b-col class="border-right text-center" cols="3" >
                <b>Date Published</b>
              </b-col>
              <b-col class="text-center" cols="3" >
                <b>Tag</b>
              </b-col>
            </b-row>
          </b-card>
        </b-col>
      </b-row>

      <!-- Article List -->
      <b-row no-gutters>
        <b-col>
          <b-card class="mb-2 border-secondary">
            <b-row class="text-dark align-items-center">
              <b-col class="" cols="1" >
                <b>1.</b>
              </b-col>
              <b-col class="" cols="5" >
                <b>
                  Bagaimana cara pemanfaatan PWA dan pengunaannya di kehidupan nyata
                </b>
                
              </b-col>
              <b-col class="" cols="3" >
                Wed, 20 January 2019
              </b-col>
              <b-col class="text-center" cols="3" >
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

    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>