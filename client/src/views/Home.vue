<template>
  <div>
    <nav-bar @arrTest="arrTest">
        <template v-slot:search>
            <form @submit.prevent="searchForm()" class="row" >
                <div class="col-8">
                    <input class="form-control" type="text" placeholder="Search" aria-label="Search" style="max-width:200px;" v-model="search">
                </div>
                <div class="col-3">
                    <input type="submit" class="btn" style="background-color: #ffafb0; color:white;" value="Search">
                </div>
            </form>
        </template>
        <template v-slot:signout>
            <button class="btn btn-danger ml-3" @click="signOut()">Sign Out</button>
        </template>
    </nav-bar>
    <Content :arrData='arrData' :dariNavbar='dariNavbar'></Content>
  </div>
</template>

<script>
import NavBar from '../components/NavBar'
import Content from '../components/Content'
import axios from 'axios'
import swal from 'sweetalert2'
export default {
    name: 'Home',
    components: {
        NavBar,
        Content
    },
    data () {
        return {
            isLogin: true,
            dariNavbar : {
                result: [],
                mainContent: false
            },
            search: '',
            arrData: []
        }
    },
    methods: {
        signOut() {
            this.isLogin = false
            var auth2 = gapi.auth2.getAuthInstance()
            localStorage.clear()
            auth2.signOut().then(function () {
            })
            swal.fire({
                type: 'success',
                title: 'success to Logout',
                showConfirmButton: false,
                timer: 2000
            })
            this.$emit('loggedIn', this.isLogin)
        },
        searchForm () {
            // console.log(this.search)
            this.dariNavbar.result = []
            axios({
                url: `http://hackpress-server.panji-h8.online/article/search/${this.search}`,
                method: 'get',
                headers: {
                    token: localStorage.getItem('token')
                }
            })
            .then (({ data }) => {
                console.log(data)
                if (data.length > 0) {
                    for (let i = 0; i < data.length; i++) {
                        this.dariNavbar.result.push(data[i])
                    }
                }
                this.dariNavbar.mainContent = true
            })
            .catch (err => {
                swal.fire({
                    type: 'error',
                    title: 'Search Failed ',
                    text: 'You need to put something in search toolbar',
                    showConfirmButton: false,
                    timer: 2000
                })
            })
        },  
        arrTest (input) {
            console.log(input)
            this.dariNavbar.result = input.result
            this.dariNavbar.mainContent = input.mainContent
        },
    },
    watch: {
        arrTest : {
            handler(val) {
                console.log('masuk deep')
                this.arrData = val.result
            }
        },
        deep: true
    },
}
</script>

<style>

</style>