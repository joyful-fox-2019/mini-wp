<template>
<div>
  <navbar></navbar>

  <div class="columns">
        <div class="column is-one-quarter">
            <panel @showPanel="addForm()" @exit="publishShow()" @myCollections="myCollectios()"></panel>
        </div>
        <div class="column" v-if="showPublish" style="margin-top: 10px;">   
            <card v-for="(article,index) in articlesList" :article="article" :key="index"></card>
        </div>
        <!-- <div class="column" v-if="showMyCollections" style="margin-top: 10px;">   
            <cardCollections v-for="(article,index) in articleCollections" :article="article" :key="index"></cardCollections>
        </div> -->
        <div class="column" v-if="showAddForm">
            
            <div class="root" style="margin: auto; width: 80%; height: 100%">
                <div class="header">
                    <input type="text"  placeholder="Your title goes here">
                </div>
                <div class="editor">
                    <wysiwyg class="texteditor"></wysiwyg>
                </div>
            </div> 
        </div>
  </div>
</div>
</template>

<script>
import navbar from '../components/navbar'
import panel from '../components/panel'
import card from '../components/card'
import wysiwyg from '../../vueWysiwyg'
import axios from 'axios'
// import cardCollections from '../components/cardCollections'

export default {
    
    props: ["articlesList"],
    components: {
        navbar,
        panel,
        wysiwyg: wysiwyg.component,
        card,
        // cardCollections
    },
    data() {
        return {
            showAddForm: false,
            articlePublish: [],
            showMyCollections: false,
            baseUrl: '3.0.99.253',
            articleCollections: [],
            showPublish: true
        }
    },
    methods: {
        addForm() {
            this.showAddForm = true
        },
        publishShow() {
            this.showAddForm = false
        },
        myCollectios() {
            Swal.showLoading()
            axios({
                url: `${this.baseUrl}/articles/myarticles`
            })
            .then(({data})=>{
                Swal.close()
                this.articleCollections = data;
                showMyCollections = true,
                showPublish = false,
                addForm = false
            })
            .catch((err)=>{
                Swal.close()

            })
        }
    },
    created() {
        // // console.log(this.articlePublish)
        // // Swal.showLoading()
        // axios ({
        //     url: `${this.baseUrl}/articles`,
        //     method: 'GET',
        //     headers: {
        //         token: localStorage.getItem('token')
        //     }
        // })
        // .then(({data})=>{
        //     // Swal.close()
        //     alert('sukses')
        //     this.articlePublish = data
        //     console.log(this.articlePublish)
        // })
        // .catch((err)=> {
        //     alert('err')
        // })
    }
}
</script>

<style>
.columns {
    height: 100vh;
    background-color: rgb(255, 255, 255);
}
    input {
        height: 12vh;
        width: 70%;
        font-size: 2.4rem;
        text-align: center;
        border: none;
    }
    .header{
        width: 100%;
        display: flex;
        justify-content: center;
        margin-bottom: 5vh;
    }
    .texteditor{
        margin: 0px;
        width: 100%;
    }
    .root{
        width: 80%;
    }
</style>