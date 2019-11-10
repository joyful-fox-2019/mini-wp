<template>
    <div @click="selectArticle(selectedData)" class="col-md-12 p-3">
      <div>
        <div class="border-bottom pb-2">
          <h2>{{selectedData.title}}</h2>
          <p>created at {{date}}, by {{selectedData.author}}</p>
          <p class="">Tags : {{selectedData.tag}}</p>
      </div>
    </div>
</template>

<script>
import Swal from 'sweetalert2'
import axios from '../../myAxios/axios'
export default {
  props : ['selectedData'],
  methods : {
    selectArticle(payload){
      this.$emit('selectedArticleData', payload)
      this.$emit('switchContent', 'selected')
    },
  },
  computed :{
    date(){   
      Date.prototype.toISODate = function() {
        return this.getFullYear() + '-' +
               ('0'+ (this.getMonth()+1)).slice(-2) + '-' +
               ('0'+ this.getDate()).slice(-2);
        }
        return new Date(this.selectedData.createdAt).toISODate();
    }
  },
  created(){
    this.$emit('payloadFromChild', this.selectedData)
  }
}
</script>

<style>

</style>