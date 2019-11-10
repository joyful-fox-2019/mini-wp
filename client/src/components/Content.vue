<template>
  <div class="" style="margin-top: 90px;">
      <div class="row">
          <side-nav-bar @dariTest='dariTest' @articleForm='ArticleForm' @UserArticle='userArticle' @detailsPage='DetailsPage' @dariUser='dariUser' @showTag='ShowTag' @dariTag='dariTag' @showPublic='ShowPublic' @showUpdate='ShowUpdate'></side-nav-bar>
          <div class="col-md-8 col-sm-12" id="main-content">
              <div class=" p-2">
                  <div v-if='articleForm'>
                      <create-article @dariNavbar='DariNavBar' @articleForm='ArticleForm' @UserArticle='userArticle' @showPublic='ShowPublic'></create-article>
                  </div>
                  <div v-if="showPublic">
                      <h1 style="margin-bottom: 10px;">What's new article today ? </h1>
                        <list-article @detailsPage='DetailsPage' @articleData='ArticleData' @UserArticle='userArticle' :articleData='articleData' @article='Article' @showUpdate='ShowUpdate' @dataUpdate='DataUpdate' @showPublic='ShowPublic' @showTag='ShowTag'></list-article>
                  </div>
                  <div v-if="UserArticle">
                      <h1 style="margin-bottom: 10px;">Your Past Article</h1>
                        <list-article @detailsPage='DetailsPage' @articleData='ArticleData' @UserArticle='userArticle' :articleData='articleData' @article='Article' @showUpdate='ShowUpdate' @dataUpdate='DataUpdate' @showPublic='ShowPublic' @showTag='ShowTag'></list-article>
                    </div>
                    <div v-if="showTag">
                      <h1 style="margin-bottom: 10px;">Your Search</h1>
                        <list-article @detailsPage='DetailsPage' @articleData='ArticleData' @UserArticle='userArticle' :articleData='articleData' @article='Article' @showUpdate='ShowUpdate' @dataUpdate='DataUpdate' @showPublic='ShowPublic' @showTag='ShowTag'></list-article>
                  </div>
                  </div>
                  <div v-if="detailsPage">
                      <detail-page :article='article'></detail-page>
                  </div>
                  <div v-if="updateForm">
                      <update-article :updateData='updateData'></update-article>
                  </div>
              </div>
          </div>
      </div>
</template>

<script>
import CreateArticle from './CreateArticle'
import SideNavBar from './SideNavBar'
import ListArticle from './ListArticle'
import DetailPage from './DetailPage'
import UpdateArticle from './UpdateArticle'
export default {
    props: ['arrData', 'dariNavbar'],
    name: 'Content',
    components: {
        CreateArticle,
        SideNavBar,
        ListArticle,
        DetailPage,
        UpdateArticle
    },
    data () {
        return {
            articleForm: false,
            article: {},
            detailsPage: false,
            UserArticle: false,
            articleData: {},
            tag: {},
            showTag: false,
            showPublic: false,
            updateForm: false,
            updateData: {}
        }
    },
    methods: {
        DataUpdate (input) {
            console.log(input)
            this.updateData = input
        },
        ShowUpdate (input) {
            this.updateForm = input
        },
        ShowPublic (input) {
            this.showPublic = input
        },
        dariTag (input) {
            this.articleData = input
        },
        ShowTag (input) {
            this.showTag = input
        },
        dariUser (input) {
            console.log(input)
            this.articleData = input
        },
        dariTest (input) {
            console.log(input)
            this.articleData = input
        },
        Article (input) {
            this.article = input
        },
        ArticleData (input) {
            this.articleData = input
        },
        DetailsPage (input) {
            this.detailsPage = input
        },
        DariNavBar (input) {
            console.log(input)
            this.articleData = input
        },
        ArticleForm (input) {
            this.articleForm = input
        },
        userArticle (input) {
            this.UserArticle = input
        }
        
    },
    watch: {
        dariNavbar : {
            handler(val) {
                console.log(val)
                this.articleData = val
                if (val.mainContent) {
                    this.articleForm = false
                    this.UserArticle = false
                    this.detailsPage = false
                } 
            },
            deep: true
        },
        articleData: {
            handler(val) {
                console.log('dari watch', val)
            }
        }
    },
    created () {
        // this.articleForm = false
        // if (this.dariNavbar.mainContent) {
        //     this.articleForm = false
        //     this.UserArticle = false
        //     this.detailsPage = false
        // }
        this.showPublic = true
    }
}
</script>

<style scoped>

@media screen and (max-width: 767px) {
  #main-content {
    margin: 2px !important; 
    }
}
@media screen and (min-width: 768px) {
  #main-content {
    margin-left: 27%;
    }
}

</style>