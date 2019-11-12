<template>
  <div>

    <Navbar @setSection='setSection' @setPage='setPage'></Navbar>
 
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

                    <div v-if="section === `article`">
                    <Article v-for="article in filteredArticles" :key="article._id" :article="article" ></Article>
                    </div>
                    <AddArticle v-if=" section === `addArticle`" @setSection="setSection"></AddArticle>

                    
                 
              
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
import AddArticle from "../components/AddArticle"

export default {
  name : 'MainPage',
  data : function() {
    return {
    message : 'Hello Vue!',
    articles : [],
    searchTitle : '',
    section : 'article',
    baseUrl : `http://localhost:3000`
    }
  },
  methods : {
    changeMessage : function() {
      this.message = "Welcome to Femme Mini-WP"
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
    },
    setSection(section) {
      this.section = section
    },
    setPage(page) {
      this.$emit('setPage', page)
    }
  },
  components : {
    Navbar,
    Panel,
    Tabs,
    Article,
    AddArticle
  },
    created() {
    this.fetchArticle() 
  },
  watch : {
    
    section() {
      if (this.section === `article`) {
        this.fetchArticle() 

      }

    }
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
