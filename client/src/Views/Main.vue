<template>
  <div>
    <Header
    :isLogin="isLogin"
    @switchPage="switchPage"
    @switchContent="switchContent"
    @switchSubContent="switchSubContent"
    @statusLogin="statusLogin"
    ></Header>
    <Home 
    v-if="content==='home'"
    @selectedArticleData="selectedData"
    @switchContent="switchContent"
    @taggedData="taggedData"
    ></Home>
    <UserPage 
    v-if="content==='user'"
    :subContent="subContent"
    :editData="editData"
    @selectedArticleData="selectedData"
    @switchSubContent="switchSubContent"
    @switchContent="switchContent"
    @editBlog="editBlog"
    ></UserPage>
    <SelectedArticle
    v-if="content==='selected'"
    :selectedData="selectedArticle"
    @switchSubContent="switchSubContent"
    @switchContent="switchContent"
    @editPayload="editPayload"
    ></SelectedArticle>
    <TagPage
    v-if="content==='tag'"
    :tagBlog="tagBlog"
    :tagName="tagName"
    @selectedArticleData="selectedData"
    @switchContent="switchContent"
    ></TagPage>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from '../../src/components/Header'
import Home from '../../src/components/Home'
import UserPage from '../../src/components/UserPage'
import Footer from '../../src/components/Footer'
import SelectedArticle from '../../src/components/SelectedArticle'
import TagPage from '../../src/components/TagPage'
export default {
    props : ['isLogin'],
    components :{
        Header,
        Home,
        UserPage,
        Footer,
        SelectedArticle,
        TagPage
    },
    data(){
        return{
            content: 'home',
            subContent: '',
            selectedArticle : '',
            editData : '',
            tagName : '',
            tagBlog : ''
        }
    },
    methods : {
        switchPage(page){
            this.$emit('switchPage', page)
        },
        statusLogin(status){
            this.$emit('statusLogin', status)
        },
        switchContent(content){
            this.content = content
        },
        switchSubContent(subContent){
            this.subContent = subContent
        },
        selectedData(payload){
            this.selectedArticle = payload
        },
        editPayload(payload){
            this.editData = payload
        },
        editBlog(payload){
            this.editData = payload
        },
        taggedData(payload){
            this.tagName = payload.tag
            this.tagBlog = payload.data
        }
    }

}
</script>

<style>

</style>