<template>
    <header class="bg-dark d-flex align-items-center" style="height: 10vh;">
      <nav class="p-0 navbar navbar-expand navbar-dark bg-dark h-100 w-100">
          <div class="d-flex align-items-center h-100 p-3" style="background-color: rgb(105, 0, 0);">
              <a class="navbar-brand font-weight-bold mr-1 text-white">D-Blog</a>
              <img src="https://avatars0.githubusercontent.com/u/53108094?s=460&v=4" alt="logo" width=30>
          </div>
        
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample02" aria-controls="navbarsExample02" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
      
        <div class="collapse navbar-collapse" id="navbarsExample02">
           <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
              <a @click="toHome" class="nav-link font-weight-bold" style="cursor:pointer">Home <span class="sr-only">(current)</span></a>
            </li>
          </ul>
          
          <div v-if="isLogin"  id="user-name" class="d-flex justify-content-center mx-2">
              <button @click="toWrite" class="btn btn-sm btn-light mr-2 font-weight-bold">Write Blog <span><img src="https://image.flaticon.com/icons/svg/1250/1250616.svg" alt="iconWrite" width="25"></span></button>
              <button @click="toUserPage" class="btn btn-sm btn-light mr-2 font-weight-bold">Profile <span><img src="https://image.flaticon.com/icons/svg/126/126486.svg" alt="iconWrite" width="25"></span></button>
              <p class="font-weight-bold mb-0 mr-2 text-white align-self-center">Hai! {{user}}</p>
              <button @click="signOut" class="btn btn-sm btn-warning">Sign Out</button>
          </div>
          <button v-else @click="toLoginPage" class="btn btn-sm btn-info mr-2">Login</button>

        </div>
      </nav>
    </header>
</template>

<script>
import Swal from 'sweetalert2'
export default {
    props : ['isLogin'],
    data(){
        return{
          user : localStorage.getItem('user')
        }
    },
    methods : {
        toUserPage(){
            this.$emit('switchContent', 'user')
            this.$emit('switchSubContent', 'dashBoard')
        },
        toHome(){
            this.$emit('switchContent', 'home')
            this.$emit('switchSubContent', '')
        },
        toWrite(){
            this.$emit('switchContent', 'user')
            this.$emit('switchSubContent', 'writePage')
        },
        toLoginPage(){
            this.$emit('switchPage', 'login')
        },
        signOut(){
          Swal.fire({
            title: 'Are you sure want to Log out?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Log out'
          }).then((result) => {
            if (result.value) {
              Swal.fire(
                `See you soon ${localStorage.getItem('user')}`
              )
              localStorage.removeItem('token')
              localStorage.removeItem('user')
              this.$emit('switchContent', 'home')
              this.$emit('switchSubContent', '')
              this.$emit('statusLogin', false)
            }
          })


        }
    }
}
</script>

<style>

</style>