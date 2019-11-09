<template>
  <div>

    <Navbar></Navbar>
 
     <!-- BODY SECTION -->
    <section class="section">



      <div class="columns is-gapless is-multiline is-mobile">


                <Panel class="column is-2"></Panel>
          
          

      

          <!-- body right col 10 -->
            <div class="column is-10">
              <!-- right container  inside body right -->
              <div class="container">


                <Tabs></Tabs>
                
                
                <!-- story list -->
                <section>
                  <div class="container">

                    <!-- <Article></Article> -->
                      <!-- one storyline -->
                  <div v-for="article in filteredArticles" :key="article._id" class="columns story-list"> 
                      <div class="column is-10">
                        <p style="font-size: 22px;">  
                            <br>
                          <B><i> {{article.title}} </i></B>
                        </p>
                        <p>
                          {{article.content}}
                          </p>
                          <br>
                                  <!-- group tags -->
                        <div  class="field is-grouped is-grouped-multiline">
                            <div v-for="tag in article.tags" :key="tag._id" class="control">
                              <div class="tags has-addons">
                                <span class="tag">on</span>
                                <span class="tag is-primary" style="background-color: rgba(9, 87, 90, 0.514);">{{tag}}</span>
                              </div>
                            </div>
                          </div>
                          <!-- end goup tags -->
                      </div>
                    <div class="column is-2">
                        <figure class="image is-square"> 
                            <img class="is-rounded" :src="article.imgSrc">
                          </figure>
                    </div>
                  </div>
                  <!-- end one story line  -->
 
                    

                 
              
                  </div>
                  <!-- end container story list  -->
                

                </section>
                <!-- end story list  -->

              </div>
              <!-- end container  inside body right -->
            </div>
            <!-- end body right col 10  -->


            
      </div>
      <!-- end gapless column  -->





    </section>
    <!-- end BODY SECTION  -->


  </div>
</template>

<script>
import Navbar from "../components/Navbar"
import Panel from "../components/Panel"
import Tabs from "../components/Tabs"
import Article from "../components/Article"
import WriteArticle from "../components/WriteArticle"

export default {
  name : 'MainPage',
  data : function() {
    return {
    message : 'Hello Vue!',
    articles : [],
    searchTitle : '',
    baseUrl : `http://localhost:3000`
    }
  },
  methods : {
    changeMessage : function() {
      this.message = "Welcome to Womanizer Mini-WP"
    },
    selectedArticle() {
      axios({
        method: 'get',
        url:`${this.baseUrl}/articles?title=${this.searchTitle}`
      })
      .then(({ data }) => {
        this.articles = data        
      })
      .catch(err => {
        console.log(err)
      })
    },
    fetchArticle() {
      axios({
        method: 'get',
        url:`${this.baseUrl}/articles`
      })
      .then(({ data }) => {
        this.articles = data
      })
    }
  },
  components : {
    Navbar,
    Panel,
    Tabs,
    Article,
    WriteArticle
  },
    created() {
    this.fetchArticle() 
  },
  computed: {
    filteredArticles: function () {
      console.log(this.articles.filter(el => {
        el.title.includes(this.searchTitle)
      }), "<<")
      //regex match
      return this.articles
    }
  }
}
</script>

<style scoped>

</style>
