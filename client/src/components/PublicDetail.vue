<template>
  <div class="detailPublic">
      <a @click.prevent="backPublic()" href="" style="color:black; font-size:18px;"><i class="fas fa-arrow-left"></i> <span>Back</span></a>
        <div style="text-align:center;">
            <h1 style="font-size:30px; font-weight:bold;">{{ publicDetailData.title }}</h1>
            <p>{{formatDate(publicDetailData.createdAt)}} 
                <span v-for="(tag,index) in publicDetailData.tags" :key="index" style="margin-left:20px;"> 
            <i class="fas fa-tags"></i> {{ tag }} </span>
            </p>
            <img :src="publicDetailData.featured_image" alt="article" style="margin:30px 0; width:70%;">
        </div>
        <p style="text-align:justify;" v-html="publicDetailData.content">
            
        </p>
        <br><br>
  </div>
</template>

<script>
import moment from 'moment'
export default {
    name : 'PublicDetail',
    props: [
        'publicDetailData'
    ],
    methods : {
        formatDate(date) {
            return moment(date).fromNow()
        },
        backPublic() {
            this.$emit('changePage',false,true,false,false,false,false,false)
        }
    }
}
</script>

<style scoped>

.detailPublic {
    overflow: scroll;
    height: 90vh;
    padding: 0 50px;
}

</style>