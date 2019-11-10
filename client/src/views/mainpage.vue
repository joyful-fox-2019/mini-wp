<template>
  <div>

  <Navbar @tohome="changehome"></Navbar>
  <div>
    <div class="columns">
      <div class="column is-2" >
        <Menubar @viewcreateform="createarticles" @backlogout="tologout"></Menubar>
      </div>
      <div class="column maincontent" >
        <div class="columns" >
          <div class="column" >
            <Articles  v-if="!pagecreate && !pageupdate" @bawadataupdate="dataupdateok" ></Articles>
            <Createarticle  v-if="pagecreate && !pageupdate" @successcreate="changepage"></Createarticle>
            <Updatearticle v-if="!pagecreate && pageupdate" :dataupdated=dataupdate @successupdate="changepage"></Updatearticle>
          </div>
          <div class="column is-3 boxtag" >
            <Rightmenu  v-if="!pagecreate && !pageupdate"></Rightmenu>
          </div>
        </div>

      </div>
    </div>
    
  </div>
  
  </div>

</template>

<script>
import Navbar from "../components/navbar";
import Menubar from "../components/menubar";
import Rightmenu from "../components/rightmenu";
import Articles from "../components/articles";
import Createarticle from "../components/createarticle";
import Updatearticle from "../components/updatearticle"

export default {
  name:'Mainpage',
  data(){
    return {
      pagecreate: false,
      dataupdate: null,
      pageupdate: false
    }
  },
  components:{
    Navbar,
    Menubar,
    Rightmenu,
    Articles,
    Createarticle,
    Updatearticle
  },
  methods:{
    createarticles(){
      this.pagecreate = true
      this.pageupdate = false
    },
    changepage(){
      this.pagecreate = false
      this.pageupdate = false
    },
    changehome(){
      this.pagecreate = false
      this.pageupdate = false
    },
    tologout(){
      this.$emit('kelogout')
    },
    dataupdateok(dataarticle){
      console.log(dataarticle)
      this.pageupdate = true
      this.dataupdate = dataarticle
    }
  },
  created(){
    this.bus.$emit('fetchData')
  }
}
</script>

<style scoped>
  .column{
    min-height: 89vh;
    padding: 10px;
  }
  .columns{
    padding: 10px;
  }
  .maincontent{
    overflow:auto;
    overflow-x: hidden;
    overflow-y: hidden;
    background-color:rgb(248, 248, 247)
    
  }
  .boxtag{
    border:1px solid rgb(231, 231, 231);
    border-radius: 5px;
    padding: 20px;
    background-color: rgb(248, 248, 247)
  }
</style>>

