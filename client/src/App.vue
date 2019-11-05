<template>
  <div>
    <Navbar></Navbar>
    <b-container class="my-4">
      <b-row>

        <b-col cols="3">
          <Menu></Menu>
        </b-col>

        <b-col cols="9">

          <div v-if="true"> 
            <h2 class="mt-2 mb-4"> <b></b> Post List ( Article List )</h2>
            <div>

              <b-row no-gutters>

                <b-col cols="1">
                  <b-card class="mb-2 border-info">
                    <div class=" text-dark">
                      <p style="font-size:20px;" class="m-0 text-center"> <b>No</b> </p>
                    </div>
                  </b-card>
                </b-col>

                <b-col cols="5">
                  <b-card class="mb-2 border-info">
                    <div class=" text-dark">
                      <p style="font-size:20px;" class="m-0 text-center"> <b>Title</b> </p>
                    </div>
                  </b-card>
                </b-col>

                <b-col cols="3">
                  <b-card class="mb-2 border-info">
                    <div class=" text-dark">
                      <p style="font-size:20px;" class="m-0 text-center"> <b>Date Published</b> </p>
                    </div>
                  </b-card>
                </b-col>
                  
                <b-col cols="3">
                  <b-card class="mb-2 border-info">
                    <div class=" text-dark">
                      <p style="font-size:20px;" class="m-0 text-center"> <b>Author</b> </p>
                    </div>
                  </b-card>
                </b-col>

              </b-row>

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
                        <b-badge pill variant="secondary" class="mt-1">Primary</b-badge>
                        <b-badge pill variant="secondary" class="mt-1">Primary</b-badge>
                      </b-col>
                      <b-col class="" cols="3" >
                        Wed, 20 January 2019
                      </b-col>
                      <b-col class="text-center" cols="3" >
                        Dipadana
                      </b-col>
                    </b-row>
                  </b-card>
                </b-col>
              </b-row>

              <b-row no-gutters>
                <b-col>
                  <b-card class="mb-2 border-secondary">
                    <b-row class="text-dark align-items-center">
                      <b-col class="" cols="1" >
                        <b>2.</b>
                      </b-col>
                      <b-col class="" cols="5" >
                        <b>
                          Bagaimana cara pemanfaatan PWA dan pengunaannya di kehidupan nyata
                        </b>
                        <b-badge pill variant="secondary" class="mt-1">Primary</b-badge>
                      </b-col>
                      <b-col class="" cols="3" >
                        Wed, 20 January 2019
                      </b-col>
                      <b-col class="text-center" cols="3" >
                        Dipadana
                      </b-col>
                    </b-row>
                  </b-card>
                </b-col>
              </b-row>

              <b-row no-gutters>
                <b-col>
                  <b-card class="mb-2 border-secondary">
                    <b-row class="text-dark align-items-center">
                      <b-col class="" cols="1" >
                        <b>3.</b>
                      </b-col>
                      <b-col class="" cols="5" >
                        <b>
                          Bagaimana cara pemanfaatan PWA dan pengunaannya di kehidupan nyata
                        </b>
                        <b-badge pill variant="secondary" class="mt-1">Primary</b-badge>
                        <b-badge pill variant="secondary" class="mt-1">Primary</b-badge>
                        <b-badge pill variant="secondary" class="mt-1">Primary</b-badge>
                      </b-col>
                      <b-col class="" cols="3" >
                        Wed, 20 January 2019
                      </b-col>
                      <b-col class="text-center" cols="3" >
                        Dipadana
                      </b-col>
                    </b-row>
                  </b-card>
                </b-col>
              </b-row>

              <b-row no-gutters>
                <b-col>
                  <b-card class="mb-2 border-secondary">
                    <b-row class="text-dark align-items-center">
                      <b-col class="" cols="1" >
                        <b>4.</b>
                      </b-col>
                      <b-col class="" cols="5" >
                        <b>
                          Bagaimana cara pemanfaatan PWA dan pengunaannya di kehidupan nyata
                        </b>
                        <b-badge pill variant="secondary" class="mt-1">Primary</b-badge>
                      </b-col>
                      <b-col class="" cols="3" >
                        Wed, 20 January 2019
                      </b-col>
                      <b-col class="text-center" cols="3" >
                        Dipadana
                      </b-col>
                    </b-row>
                  </b-card>
                </b-col>
              </b-row>

              <b-row no-gutters>
                <b-col>
                  <b-card class="mb-2 border-secondary">
                    <b-row class="text-dark align-items-center">
                      <b-col class="" cols="1" >
                        <b>5.</b>
                      </b-col>
                      <b-col class="" cols="5" >
                        <b>
                          Bagaimana cara pemanfaatan PWA dan pengunaannya di kehidupan nyata
                        </b>
                        <b-badge pill variant="secondary" class="mt-1">Primary</b-badge>
                      </b-col>
                      <b-col class="" cols="3" >
                        Wed, 20 January 2019
                      </b-col>
                      <b-col class="text-center" cols="3" >
                        Dipadana
                      </b-col>
                    </b-row>
                  </b-card>
                </b-col>
              </b-row>

              

              

              

            </div>
          </div>
          
        </b-col>

      </b-row>
    </b-container>
  </div>
</template>

<script>
import Navbar from './components/Navbar'
import Menu from './components/Menu'

export default {
  data(){
    return{
      text: ``
    }
  },
  components:{
    Navbar,
    Menu
  }
}
</script>

<style>
  .card-body{
    padding: 0;
  }
</style>