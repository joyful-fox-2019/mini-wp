<template>
    <div class="col-md-12 p-3" style="height: 85vh; overflow: scroll; background-color: rgb(226, 226, 226);" >
      <div v-if="selectedData.author === user" class="my-3 d-flex justify-content-end">
        <button @click="editBlog(selectedData)" class="btn btn-warning mx-2">Edit Blog</button>
        <button @click="deleteBlog(selectedData._id)" class="btn btn-danger mx-2">Delete Blog</button>
      </div>
      <div>
        <div class="border-bottom pb-2">
          <h2>{{selectedData.title}}</h2>
          <p>created at {{date}}, by {{selectedData.author}}</p>
          <p>Tags : {{selectedData.tag}}</p>
          <hr>
          <div class="imgContainer my-2 d-flex justify-content-center">
            <img :src="selectedData.featured_image" style="object-fit: cover;" width="400">
          </div>
          <div v-html="selectedData.content" class="px-5 text-justify">

          </div>
        </div>
      </div>
    </div>
</template>

<script>
import Swal from 'sweetalert2'
import axios from '../../myAxios/axios'
export default {
  props : ['selectedData'],
  data(){
    return{
      user : localStorage.getItem('user')
    }
  },
  methods : {
    editBlog(payload){
      this.$emit('switchSubContent', 'editPage')
      this.$emit('switchContent', 'user')
      this.$emit('editPayload',payload)
    },
    deleteBlog(id){
      Swal.fire({
        title: 'Are you sure want to Delete this Blog?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Delete it'
      }).then((result) => {
        if (result.value) {
          axios.delete(`articles/${id}`,{
            headers : {
              token : localStorage.getItem('token')
            }
          })
          .then(({data})=>{
            Swal.fire(
            `Succesfully deleted ${data.data.title}`
            )
            this.$emit('switchContent', 'user')
            this.$emit('switchSubContent', 'dashBoard')
          })
          .catch(err=>{
            console.log(err)
          })

        }
      })

    }
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
  }
}
</script>

<style>

</style>