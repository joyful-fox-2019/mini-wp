<template>
  <div>
    <b-container style="margin-top: 3vh;">
      <b-row class="no-gutters">
        <Bigimage
          :imglink="'https://picsum.photos/400/400/?image=1'"
          :title="'For more information visit website'"
          :author="'Dipadana'"
          :date="'20 Januari 2019'"
          v-on:click.native="toArticle()"
        ></Bigimage>
        <Bigimage
          :imglink="'https://picsum.photos/400/400/?image=2'"
          :title="'For more information visit website'"
          :author="'Dipadana'"
          :date="'20 Januari 2019'"
          v-on:click.native="toArticle()"
        ></Bigimage>
      </b-row>
      <b-row class="mt-4">
        <b-col cols="12" md="8" >
          <div class="border-bottom border-info mt-2 mb-4">
            <div class=" card-body pb-1 pl-0">
              <span class="m-0 bg-info p-2 text-white" style="font-size:18px">Article this day</span>
            </div>
          </div>
          <div>
            
          </div>
          <Articleitem
            :imglink="'https://picsum.photos/400/400/?image=22'"
            :author="'Dipadana'"
            :description="'<p>This is a wider card with supporting text as a natural lead-in to additional content. This content is a little bit longer This is a wider card with supporting text as a natural lead-in to additional content.This content is a little bit longer</p>'"
            :date="'20 May 2019'"
            :title="'Over the Horizon'"
            v-on:click.native="toArticle()"
          ></Articleitem>
          <Articleitem
            :imglink="'https://picsum.photos/400/400/?image=21'"
            :author="'Dipadana'"
            :description="'<b>This is a wider card with supporting text as a natural lead-in to additional content. This content is a little bit longer This is a wider card with supporting text as a natural lead-in to additional content.This content is a little bit longer</b>'"
            :date="'20 May 2019'"
            :title="'Over the Horizon'"
            v-on:click.native="toArticle()"
          ></Articleitem>
        </b-col>
        <b-col class="d-none d-sm-block" md="4">
          <Taglist
            class="mt-5 pl-3"
            :tags="[{name:'javascript',count:10},{name:'php',count:5},{name:'ruby',count:9}]"
          ></Taglist>
        </b-col>
      </b-row>
    </b-container>
    <b-container fluid class="p-0 mt-1 mt-md-4">
      <Footeritem
      ></Footeritem>
    </b-container>
  </div>
</template>

<script>
import Footeritem from '../components/Footeritem'
import Bigimage from '../components/Bigimage'
import Articleitem from '../components/Articleitem'
import Taglist from '../components/Taglist'

export default {
  components:{
    Footeritem,
    Bigimage,
    Articleitem,
    Taglist
  },
  methods:{
    toArticle(){
      console.log("masuk")
      this.$router.push({path:`/article/1`})
    }
  }
}
</script>

<style>
  .card-title{
    margin:0 !important;
  }
</style>