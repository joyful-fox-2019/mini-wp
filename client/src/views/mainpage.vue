<template>
<div>
    
        <navbar></navbar>
        
        

        <section class="main-content columns is-fullheight" >

        <sidebar @openCreateForm='showCreateForm'></sidebar>

        <contentpage v-if="createPage === false"></contentpage>

        <div class="container column is-10" style="overflow:scroll; padding:100px;">


            <form v-if="createPage === true" @submit="createProject">
                
                <template style="display:flex;align-items:center; width:70%">
                        <section style="padding:50px">
                            
                            <p class="card-header-title" style="font-size: 36px; padding-left:-10px">Create project</p> 
                            
                            <hr>

                            <div class="field">
                                <label for="" class="label">Title</label>
                                <div class="control has-icons-left">
                                    <input v-model="title" type="text" placeholder="" class="input">
                                    <span class="icon is-small is-left">
                                    </span>
                            </div>

                            <div class="field">
                                <label for="" class="label">Description</label>
                                <div class="control has-icons-left">
                                    <quill v-model="description" output="html"></quill>
                                    <span class="icon is-small is-left">
                                    </span>
                            </div>

                            <div class="field">
                                <section>
                                    <b-field label="Tags">
                                        <b-taginput
                                            placeholder="Add a tag"
                                            v-model="tags"
                                            >
                                        </b-taginput>
                                    </b-field>
                                </section>
                            </div>

                            <div class="field">
                                <section style="margin-top:50px;justify-contents:center">
                                    <b-field label="Upload file">
                                        <b-upload v-model="dropFiles"
                                            multiple
                                            drag-drop>
                                            <section class="section">
                                                <div class="content has-text-centered">
                                                    <p>
                                                        <b-icon
                                                            icon="upload"
                                                            size="is-large">
                                                        </b-icon>
                                                    </p>
                                                    <p>Drop your files here or click to upload</p>
                                                </div>
                                            </section>
                                        </b-upload>
                                    </b-field>

                                    <div class="tags">
                                        <span v-for="(file, index) in dropFiles"
                                            :key="index"
                                            class="tag is-primary" >
                                            {{file.name}}
                                            <button class="delete is-small"
                                                type="button"
                                                @click="deleteDropFile(index)">
                                            </button>
                                        </span>
                                    </div>
                                </section>
                            </div>


                            

                            <button class="button" type="is-primary">Submit</button>
                            <button class="button" type="is-danger" @click="createPage = false">Cancel</button>

                        
                        </section>
                    </template>


            </form>
        </div>

        </section>

</div>
   

</template>

<script>

import sidebar from '../components/sidebar'
import navbar from '../components/navbar'
import contentpage from '../components/contentpage'
import quill from 'quill'
import axios from '../apis/server'


export default {
    name : 'main-page',
    data(){
        return {
            
            projects : [],
            title:'',
            dropFiles : [],
            tags : [],
            index : 0,
            description: {
                    ops: [],
                },
                config: {
                    placeholder: 'Compose an epic...',
                },   
            createPage : false,
        }
    },
    components:{

        sidebar,
        navbar,
        contentpage

    },
    methods: {
        showCreateForm(status){
            this.createPage = status
        },
        createProject(){
            axios({
                method : 'post',
                url : '/projects',
                data : {
                    title : this.title,
                    description : this.description,
                    tags : this.tags,
                    images : this.dropFiles
                }
            })
            .then(({data}) => {
                console.log('sukses')
            })
            .catch(err => {
                console.log(err)
            })
        }
    },
    mounted() {
    this.editor = new Quill(this.$refs.editor, {
        modules: {
            toolbar: [
                [{ header: [1, 2, 3, 4, false] }],
                ['bold', 'italic', 'underline']
            ]
        },
        theme: 'bubble',
        formats: ['bold', 'underline', 'header', 'italic']
    });

    this.editor.root.innerHTML = this.value;
    // We will add the update event here
    this.editor.on('text-change', () => {});
}

}

</script>

<style>

.main-content{
    background-color: rgb(247, 247, 247);
    height:100vh;
}

</style>