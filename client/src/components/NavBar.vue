<template>
  <div>
      <nav class="navbar navbar-expand-lg fixed-top navbar-master" >
        <div class="logo">
          <a @click.prevent="showList">
            <svg width="40" height="40" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <image xlink:href='https://image.flaticon.com/icons/png/512/59/59137.png' alt="symbol" height="40" width="40">
            </svg>
            <span>HackPress</span>
          </a>
        </div>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" style="color:black;">
            <span class="navbar-toggler-icon" style="color:black;">☰</span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <div>
            
          </div>
          <div class="click">
            <slot name="search"></slot>
            <slot name="register"></slot>
            <slot name="login"></slot>
            <slot name="signout"></slot>
          </div>
        </div>
      </nav>
  </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'NavBar',
    data () {
      return {

      }
    },
    methods: {
      showList() {
        axios({
          url: 'http://hackpress-server.panji-h8.online/article/news',
          method: 'get',
          headers: {
            token: localStorage.getItem('token')
          }
        })
        .then (({ data }) => {
          this.$emit('arrTest', {result: data, mainContent: true})
        })
      }
    },
    created () {
      this.showList()
    }
}
</script>

<style scoped>
.navbar-toggler-icon {
    color: black !important;
}
nav {
    background-color: rgb(13, 150, 150);
    display: flex;
    justify-content: space-between;
}
.logo {
  margin-left: 14px;
  display: flex;
  align-items: center;
}
.logo:hover {
  cursor: pointer;
}
.click {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
}
span {
  font-family: "proximanova";
  color: white;
  font-weight: 300px;
  margin: 13px;
  font-size: 15pt;
}
span:hover {
  cursor: pointer;
  color: rgb(250, 219, 81);
}
h2 {
  font-family: "proximanova";
  color: white;
  font-weight: 300px;
  margin: 13px;
  font-size: 15pt;
}
h2:hover {
  cursor: pointer;
  color: rgb(250, 219, 81);
}
</style>