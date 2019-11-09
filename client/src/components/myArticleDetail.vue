<template>
  <div class="detailPrivate">
      <a @click.prevent="backPrivate()" href="" style="color:black; font-size:18px;"><i class="fas fa-arrow-left"></i> <span>Back</span></a>
        <div style="text-align:center;">
            <h1 style="font-size:30px; font-weight:bold;">{{ myDetailData.title }}</h1>
            <p>{{formatDate(myDetailData.createdAt)}} 
            <span v-for="(tag,index) in myDetailData.tags" :key="index" style="margin-left:20px;"> 
            <i class="fas fa-tags"></i> {{ tag }} </span>
            </p>
            <img :src="myDetailData.featured_image" alt="article" style="margin:30px 0; width:70%;">
        </div>
        <p style="text-align:justify;" v-html="myDetailData.content"></p>
        <br>
        <div class="buttons">
            <a href="" @click.prevent="updateArticle()" style="color:black; margin:0 10px; background-color:#05c46b; padding:5px; border-radius:5px; color:white;">
                <i class="fas fa-pencil-alt"></i>
                Update
            </a>
            <a @click.prevent="deletePrivateArticle(myDetailData._id)" href="" style="color:black; margin:0 10px; background-color:#ff3f34; padding:5px; border-radius:5px; color:white;">
                <i class="fas fa-trash"></i>
                Delete
            </a>
        </div>
        <br><br>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
import axios from '../apis/server'
import moment from 'moment'

export default {
    name : 'myArticleDetail',
    props: [
        'myDetailData'
    ],
    methods : {
        updateArticle(){
            this.$emit('changePage',false,false,false,false,false,false,true)
        },
        formatDate(date) {
            return moment(date).fromNow()
        },
        backPrivate() {
            this.$emit('changePage',false,false,false,false,true,false,false)
        },
        deletePrivateArticle(id) {
            const swalWithBootstrapButtons = Swal.mixin({
                customClass: {
                    confirmButton: 'btn btn-success',
                    cancelButton: 'btn btn-danger'
                },
                buttonsStyling: false
            })

            swalWithBootstrapButtons.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, delete it!',
                cancelButtonText: 'No, cancel!',
                reverseButtons: true
            }).then((result) => {
            if (result.value) {
                axios({
                    method: 'delete',
                    url: '/articles/' + id,
                    headers: {
                        token : localStorage.getItem('token')
                    }
                })
                    .then(_=>{
                        swalWithBootstrapButtons.fire(
                        'Deleted!',
                        'Your article has been deleted.',
                        'success'
                        )
                        this.$emit('changePage',false,false,false,false,true,false)
                    })
                    .catch(err=>{
                        console.log(err);
                        
                        swalWithBootstrapButtons.fire(
                        'Error',
                        'internal server error',
                        'error'
                        )
                    })
            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire(
                'Cancelled',
                'Your article is safe',
                'error'
                )
            }
            })
        }
    }
}
</script>

<style scoped>

.detailPrivate {
    overflow: scroll;
    height: 90vh;
    padding: 0 50px;
}

</style>