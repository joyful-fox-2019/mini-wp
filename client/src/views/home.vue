<template>
    <div>
        <navbar @showaddpage="addpageshow()" @showhome="backtohome()" @waslogout="backtologin()"></navbar>
        <sidebar v-show="sidebar" @showedit="editpageshow"></sidebar>
        <addpage @showhome="backtohome()" v-show="addform"></addpage>
        <editpage :id="id" v-show="editform " @showhome="backtohome()"></editpage>
    </div>
</template>

<script>
import navbar from '../components/navbar'
import sidebar from '../components/sidebar'
import addpage from '../components/addpage'
import editpage from '../components/editpage'
import axios from 'axios'

export default {
    components : {
        navbar,
        sidebar,
        addpage,
        editpage
    },
    data() {
        return {
            addform : false,
            editform : false,
            sidebar : true,
            id: ''
        }
    },
    methods : {
        backtologin() {
            console.log('masuk parent')
            this.$emit('showlogin')
        },
        addpageshow(id) {
            this.addform = true
            this.sidebar = false
            this.editform = false

        },
        editpageshow(id) {
            console.log(id + '============================')
            this.addform = false
            this.editform = true
            this.sidebar = false
            this.id = id
            this.fecthArticles()
        },
        fecthArticles() {  
            console.log('????????????????????????');
            
            axios({
                method: 'get',
                url: `http://localhost:3000/wp/articlesUser`,
                headers:{
                    token: localStorage.getItem('token')
                },
            })
                .then((result) => {
                    console.log(result.data)
                    let filteredResult = []
                    for (let i=0; i<result.data.length; i++) {
                        if (result.data[i].title.includes(this.search)) {
                            filteredResult.push(result.data[i])
                        }
                    }
                    this.articles = filteredResult
                }).catch((err) => {
                    console.log(err)
                });
        },
        backtohome() {
            this.addform = false
            this.editform = false
            this.sidebar = true
            this.fecthArticles()
        }
    },
    watch : {
        addform() {
        },
        sidebar() {
        },
        editform() {
        }
    },
    created() {
        this.fecthArticles()
    }
    
}
</script>

<style>

</style>