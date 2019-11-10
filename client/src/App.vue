<template>
  <div>
    <Navbar :isLogin="isLogin" @changeLogin="changeLogin"></Navbar>
    <router-view
      :tags="tags"
      @changeLogin="changeLogin"
    ></router-view>
    <Footer></Footer>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'

export default {
  data(){
    return{
      tags: ['Business', 'Document', 'Politics', 'Military', 'Health', 'Technology'],
      isLogin: false
    }
  },
  methods:{
    changeLogin(value){
      this.isLogin = value
    }
  },
  components:{
    Navbar,
    Footer
  }
}
</script>

<style>
.image-container {
  position: relative;
  transition: 800ms;
  background-image: linear-gradient(to top, black , #3b444b);
  color: white;
}

.image-container:hover {
  transform: scale(1.02); /* Equal to scaleX(0.7) scaleY(0.7) */
}

.image{
  object-fit: cover;
  height: 450px;
  -webkit-mask-image:-webkit-gradient(linear, left top, left bottom, from(rgba(0,0,0,1)), to(rgba(0,0,0,0)));
      mask-image: linear-gradient(to bottom, rgba(0,0,0,1), rgba(0,0,0,0));
}

.imageSecondary{
  object-fit: cover;
  max-height: 220px;
  -webkit-mask-image:-webkit-gradient(linear, left top, left bottom, from(rgba(0,0,0,1)), to(rgba(0,0,0,0)));
      mask-image: linear-gradient(to bottom, rgba(0,0,0,1), rgba(0,0,0,0));
}

#secondaryContainer{
  height: 450px
}

.bottom-left {
  position: absolute;
  bottom: 20px;
  left: 10px;
  margin-right: 20px
}

.link{
  color:#FF4421
}

.link:hover { 
  color: #000; 
  text-decoration: none;
}

@media (max-width: 576px) {
  .image{
    height: 220px;
  }
}
</style>