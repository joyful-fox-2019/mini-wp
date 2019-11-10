<template>
  <div>
    <div class="profile-container flex-column d-flex align-items-center mt-5">
    <h1>Profile</h1>
        <div class="d-flex">
          <img :src="profilePic" class="profile-pic" alt="">
          <form class="d-flex flex-column" @submit.prevent="updateProfile">
            <input v-model="firstName" type="text" placeholder="Enter First Name">
            <input v-model="lastName" type="text" placeholder="Enter Last Name">
            <input v-model="address" type="text" placeholder="Enter Address">
            <input id="file" class="my-4" type="file" @change="onFileSelected" ref="file"  accept="image/*" />
            <input style="margin: 0 auto;" class="btn btn-info w-25" type="submit" value="Update">
          </form>
        </div>
  </div>
  </div>
</template>

<script>
import axios from '../config/axios'
import Swal from 'sweetalert2'
export default {
  data(){
    return{
      firstName: '',
      lastName: '',
      address: '',
      profilePic: '',
      file: '',
      selectedFile: null,
    }
  },
  methods: {
    onFileSelected(event) {
        this.selectedFile = event.target.files[0];
        this.file = this.selectedFile;
    },
    fetchProfile(){
      Swal.showLoading()
      axios({
        method: 'get',
        url: '/users',
        headers: {
          token : localStorage.getItem('token')
        }
      })
      .then(({data})=>{
        this.firstName = data.firstName
        this.lastName = data.lastName
        this.address = data.address
        this.file = data.file
        this.profilePic = data.profilePic
      })
      .catch(({ response }) => {
          this.$noty.error(response.data.message)
      })
      .finally(()=>{
          Swal.close()
      })
    },
    updateProfile(){
      Swal.showLoading()
      const fd = new FormData();

      fd.append("firstName", this.firstName);
      fd.append("lastName", this.lastName);
      fd.append("address", this.address);
      fd.append("file", this.file);

      axios.patch(`/users`, fd, {
          headers: {
              token: localStorage.getItem("token")
          }
      })
      .then(() => {
          this.$noty.info("Success Update Profile!")
          this.fetchProfile()
      })
      .catch(({ response }) => {
          this.$noty.error(response.data.message)
      })
      .finally(()=>{
          Swal.close()
      })
    }
  },
  created() {
    if(localStorage.getItem('token')){
      this.fetchProfile()
    }
  }
}
</script>

<style scoped>

h1{
  font-family: 'Righteous', cursive;
}

.profile-container{
  width: 100%;
}

.profile-pic{
  width: 200px;
  height: 200px;
  border-radius: 50%;
  box-shadow: 10px 10px 38px -9px rgba(240,118,240,1);
  object-fit: cover;  
}

input:not(:last-child) {
  margin: 5px 25px;
  padding: 7px;
  width: 400px;
  border-radius: 15px;
  border: none;
  outline: none;
  background-color: rgb(34, 34, 34);
  color: white;
}


</style>>

