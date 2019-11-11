<template>
   <div>
    <section class="fdb-block">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-12 col-md-8 col-lg-7 col-xl-5 text-center">
            <div class="fdb-box">
              <div class="row">
                <div class="col">
                  <h1>Log In</h1>
                </div>
              </div>
              <div class="row mt-4">
                <div class="col">
                  <input type="text" class="form-control" placeholder="Username" v-model="username" />
                </div>
              </div>
              <div class="row mt-4">
                <div class="col">
                  <input
                    type="password"
                    class="form-control mb-1"
                    placeholder="Password"
                    v-model="password"
                  />
                  <p class="text-right">
                    <a @click.prevent="$emit('showRegister')" href>Dont have an account?</a>
                  </p>
                </div>
              </div>
              <div class="row mt-4">
                <div class="col">
                  <button class="btn btn-outline-secondary" type="button" v-on:click="login">Submit</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            registerShow: false,
            username: '',
            password: '',
            baseUrl: '3.0.99.253',
            articleList: []
        }
    },
    components: {

    },
  
    methods: {
        login() {
          Swal.showLoading()
          this.loading = true
            axios({
                url: '3.0.99.253/users/login',
                method: 'POST',
                data: {
                    username:this.username,
                    password: this.password
                }
            })
            .then(({data})=>{
              Swal.close()
                localStorage.setItem('token', data.token)
                this.$emit('showMain')
            })
            .catch( (err) => {
              Swal.close()
            })
        },
    }
}
</script>

<style scoped>
.fdb-block {
  height: 100vh;
  background-image: url("../img/owltree.jpg");
}

fdb-box {
  float: left !important;
}

/* .container {
  float: left !important;
} */

    /* .login-content {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        text-align: center;
        margin-left: 120px;
    }
    
    .img img {
        width: 440px;
        justify-content: left;
    }
    
    form {
        width: 360px;
    }
    
    .login-content img {
        height: 100px;
    }
    
    .login-content h2 {
        margin: 15px 0;
        color: rgb(0, 0, 0);
        font-size: 2.9rem;
    }
    
    .login-content .input-div {
        position: relative;
        display: grid;
        grid-template-columns: 7% 93%;
        margin: 25px 0;
        padding: 5px 0;
        border-bottom: 2px solid #d9d9d9;
    }
    
    .login-content .input-div.one {
        margin-top: 0;
    }
    
    .i {
        color: #020202;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    
    .i i {
        transition: .3s;
    }
    
    .input-div>div {
        position: relative;
        height: 45px;
    }
    
    .input-div>div>h5 {
        position: absolute;
        left: 10px;
        top: 50%;
        transform: translateY(-50%);
        color: rgb(7, 6, 6);
        font-size: 18px;
        transition: .3s;
    }
    
    .input-div:before,
    .input-div:after {
        content: '';
        position: absolute;
        bottom: -2px;
        width: 0%;
        height: 2px;
        background-color: #38d39f;
        transition: .4s;
    }
    
    .input-div:before {
        right: 50%;
    }
    
    .input-div:after {
        left: 50%;
    }
    
    .input-div.focus:before,
    .input-div.focus:after {
        width: 50%;
    }
    
    .input-div.focus>div>h5 {
        top: -5px;
        font-size: 15px;
    }
    
    .input-div.focus>.i>i {
        color: #38d39f;
    }
    
    .input-div>div>input {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        border: none;
        outline: none;
        background: none;
        padding: 0.5rem 0.7rem;
        font-size: 1.2rem;
        color: rgb(6, 7, 7);
        font-family: 'poppins', sans-serif;
    }
    
    .input-div.pass {
        margin-bottom: 4px;
    }
    
    a {
        display: block;
        text-align: right;
        text-decoration: none;
        color: #999;
        font-size: 0.9rem;
        transition: .3s;
    }
    
    a:hover {
        color: #20b382;
    }
    
    .btn {
        display: block;
        width: 100%;
        height: 50px;
        border-radius: 5px;
        outline: none;
        border: none;
        background-image: linear-gradient(to right, #bdd6ce, #9aa2ad, #5fe6da);
        background-size: 200%;
        font-size: 1.2rem;
        color: rgb(52, 97, 97);
        font-family: 'Poppins', sans-serif;
        margin: 1rem 0;
        cursor: pointer;
        transition: .5s;
        font-weight: bold;
    }
    
    .btn:hover {
        background-position: right;
    } */
</style>