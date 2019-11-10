<template>
  <div id="mysite">
    <div id="navbar">
        <nav id="nav" class="navbar navbar-dark">
            <div id="nav-container">
                <div id="nav-left">
                    <button type="button" @click="displayDefault()" class="btn btn-outline-light btn-lg site-btns" style="margin-right: 10px;"><i class="fas fa-book"></i> My Sites</button>
                    <button type="button" @click="displayReader()" class="btn btn-outline-light btn-lg site-btns"><i class="fas fa-newspaper"></i> Reader</button>

                </div>
                <div id="nav-right">
                    <button type="button" @click="displayCreatePost()" class="btn btn-outline-light btn-lg site-btns" style="margin-left: 1000px"><i class="far fa-keyboard"></i> Write</button>
                    <button type="button" @click="displayFollowing()" class="btn btn-outline-light btn-lg site-btns" style="margin-left: 10px"
                    data-toggle="modal" data-target="#user-profile"><i class="fas fa-user-md"></i></button>

                    <!-- Modal -->
                    <div class="modal fade" id="user-profile" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog" role="document">
                            <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Profile</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <div id="users" v-for="(user, index) in followingData" :key="index">
                                    <p>{{user.name}}</p> 
                                    <button type="button" style="font-weight: bold; border: 2px solid black;" @click="unfollow(user._id)" class="btn btn-danger">Unfollow</button>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" style="font-weight: bold;" data-dismiss="modal">Close</button>
                            </div>
                            </div>
                        </div>
                    </div>
                    <button type="button" class="btn btn-outline-light btn-lg site-btns" style="margin-left: 10px"><i class="far fa-bell"></i></button>
                    <button type="button" @click="logout()" class="btn btn-outline-light btn-lg site-btns" style="margin-left: 10px"><i class="fas fa-power-off"></i></button>
                </div>
            </div>
        </nav>
    </div>
    <div id="main-container" class="container">
        <div class="row">
            <div class="col-sm-4">
                <div v-if="!sideBar" id="mysites-menu-left" class="overflow-auto">
                    <h5 class="left-menus">Manage</h5><br>
                    <div id="sub-menu">
                        <ul id="menu-need-hover">
                            <a href="http://reilvrein.wordpress.com" target="_blank">
                                <i class="submenu-logo fas fa-file-alt"></i> &nbsp; Site Pages
                            </a>
                        </ul>
                        <ul id="menu-need-hover">
                            <i class="submenu-logo far fa-clipboard"></i> &nbsp; Blog Post
                        </ul>
                        <ul id="menu-need-hover">
                            <i class="submenu-logo fas fa-photo-video"></i> &nbsp; Media
                        </ul>
                        <ul id="menu-need-hover">
                            <i class="submenu-logo far fa-comments"></i> &nbsp; Comments
                        </ul>
                        <ul id="menu-need-hover">
                            <i class="submenu-logo fas fa-comment-alt"></i> &nbsp; Feedback
                        </ul>
                        <ul id="menu-need-hover">
                            <i class="submenu-logo fas fa-scroll"></i> &nbsp; Testimonials
                        </ul>
                        <ul id="menu-need-hover">
                            <i class="submenu-logo fas fa-envelope-open-text"></i> &nbsp; Portofolio
                        </ul>
                    </div>
                    <h5 class="left-menus">Design</h5><br>
                        <div id="sub-menu">
                            <ul id="menu-need-hover">
                                <i class="submenu-logo fas fa-tools"></i> &nbsp; Customize
                            </ul>
                            <ul id="menu-need-hover">
                                <i class="submenu-logo far fa-images"></i> &nbsp; Themes
                            </ul>
                        </div>
                    <h5 class="left-menus">Tools</h5><br>
                        <div id="sub-menu">
                            <ul id="menu-need-hover">
                                <i class="submenu-logo fas fa-search-plus"></i> &nbsp; Plugins
                            </ul>
                            <ul id="menu-need-hover">
                                <i class="submenu-logo fas fa-upload"></i> &nbsp; Import
                            </ul>
                            <ul id="menu-need-hover">
                                <i class="submenu-logo fas fa-download"></i> &nbsp; Export
                            </ul>
                        </div>
                </div>
            </div>
            <div class="lds-circle d-flex justify-content-center align-items-center mx-auto" v-if="loading"><div></div></div>
            <div class="col-sm-8">
                <!--DisplayPost-->
                <div v-if="inDefaultDashboard && !loading" id="posts">
                    <nav>
                        <div class="nav nav-tabs" id="nav-tab" role="tablist">
                            <a class="nav-item nav-link" id="published" href="#">Published</a>
                        </div>
                    </nav>
                    <div id="my-posts-header">
                        <p style="margin-left: 20px; margin-bottom: 0">Posts</p>
                        <button @click="displayCreatePost()" style="margin-right: 20px; height: 40px; background-color: #AB235A; color: white; font-weight:bold;"  
                        type="button" class="btn">Add New Post</button>
                    </div>
                    <div v-for="(post, index) in postData" :key="index" id="my-posts">
                        <div id="post" class="card w-90">
                            <div id="card-container" class="card-body">
                                <div id="card-text">
                                    <h5 class="card-title">{{post.title}}</h5>
                                    <div id="tags">
                                        <div v-for="(tag, index) in post.tags" :key="index">
                                            <a href="#" @click="displayPostsByTags(tag._id)" class="badge bd-custom badge-dark" style="margin-right: 5px; margin-bottom:7px;">{{tag.name}}</a>
                                        </div>
                                    </div>
                                    <span class="badge badge-warning" style="width: 35px;"><i class="far fa-thumbs-up"></i> {{post.like.length}}</span>
                                </div>
                                
                                <div id="card-img" style="height: 100px; display: flex;">
                                    <img id="c-img" :src="post.img" alt="">
                                    <div id="authorized-btns" style="display:flex; flex-direction: column; margin-top: 10px; margin-left: 10px">
                                        <button type="button" @click="displayEditPost(post._id, post.title, post.content, post.img, post.tags)" 
                                        style="font-weight: bold; margin-bottom:5px;" class="btn post-btn"><i class="far fa-edit"></i></button> <br>
                                        <button type="button" @click="deletePost(post._id)" style="font-weight: bold;" class="btn post-btn"><i class="far fa-trash-alt"></i></button>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

                <!--CreatePost-->
                <div id="new-post" v-if="inCreatePost" class="app col-sm-8">
                    <div id="add-post-header">
                        <h1 style="font-family: 'Tinos', serif; font-weight: bold; color:#006088;"><i class="fas fa-pencil-alt"></i> Add New Post</h1>
                    </div> <br><br>

                    <div class="form-row align-items-center">
                        <div class="col-auto">
                            <h6 style="color: rgb(65, 78, 78);"> Title:</h6>
                            <input v-model="newPost.title" style="width: 600px;" type="textarea" placeholder="Enter title"><br><br>
                        </div>
                    </div>

                    <div class="form-row align-items-center">
                        <div class="col-auto">
                            <h6 style="color: rgb(65, 78, 78);"> Tags:</h6>
                            <div class="tags-2">
                                <div v-for="(tag, index) in tagsData" :key="index">
                                    <div id="tag-name">
                                        <center>&nbsp; <strong>{{tag.name}}</strong></center>
                                        <button id="plus-button" @click="addToCurrentTags(tag._id, tag.name, index)" type="button" class="btn"><i class="far fa-plus-square"></i></button>
                                    </div>
                                </div> 
                            </div>    
                        </div>
                    </div> <br>

                    <div class="form-row align-items-center">
                        <div class="col-auto">
                            <h6 style="color: rgb(65, 78, 78);"> Create new tags:</h6>
                            <div id="create-tags">
                                <input type="textarea" v-model="newTag.name" placeholder="Enter new tag's name"> &nbsp; 
                                <button type="button" @click="createTag()" class="btn"
                                style="height: 37px; font-weight: bold; background-color: #006088; color:white;">Create</button>
                            </div>
                        </div>
                    </div><br>

                    <div class="form-row align-items-center">
                        <div class="col-auto">
                            <h6 style="color: rgb(65, 78, 78);"> Current tags:</h6>
                            <div class="tags-2">
                                <div v-for="(tag, index) in newPost.tags" :key="index">
                                    <div id="tag-name">
                                        <center>&nbsp; <strong>{{tag.name}}</strong></center>
                                        <button id="plus-button" @click="removeFromCurrentTags(tag.id, tag.name, index)" type="button" class="btn"><i class="far fa-minus-square"></i></button>
                                    </div>
                                </div> 
                            </div>    
                        </div>
                    </div> <br>

                    <p class="text-left mb-1" style="color: rgb(65, 78, 78);">Upload Image</p>
                    <div class="custom-file mb-3">
                        <input v-on:change="getImageForPost($event)" class="custom-file-input" type="file">
                        <label class="custom-file-label text-left">{{newPost.img.name}}</label>
                    </div>
                    <hr>

                    <!-- Include Quill stylesheet -->
                    <h6 style="color: rgb(65, 78, 78);">Content: </h6><br>
                    <quillEditor v-model="newPost.content"> </quillEditor> <br><br>
                    <center><button id="submit-btn" @click="createPost()" class="btn btn-lg" type="submit">Submit</button></center> <br>
                </div>

                <!--EditPost-->
                <div id="edit-post" v-if="inEditPost" class="app col-sm-8">
                    <div id="add-post-header">
                        <h1 style="font-family: 'Tinos', serif; font-weight: bold; color:#006088;"><i class="far fa-edit"></i> Edit Post</h1>
                    </div> <br><br>

                    <div class="form-row align-items-center">
                        <div class="col-auto">
                            <h6 style="color: rgb(65, 78, 78);"> Title:</h6>
                            <input v-model="editPost.title" type="textarea" placeholder="Enter title"><br><br>
                        </div>
                    </div>

                    <div class="form-row align-items-center">
                        <div class="col-auto">
                            <h6 style="color: rgb(65, 78, 78);"> Tags:</h6>
                            <div class="tags-2">
                                <div v-for="(tag, index) in tagsDataForEdit" :key="index">
                                    <div id="tag-name">
                                        <center>&nbsp; <strong>{{tag.name}}</strong></center>
                                        <button id="plus-button" @click="addToCurrentTagsForEdit(tag._id, tag.name, index)" type="button" class="btn"><i class="far fa-plus-square"></i></button>
                                    </div>
                                </div> 
                            </div>    
                        </div>
                    </div> <br>

                    <div class="form-row align-items-center">
                        <div class="col-auto">
                            <h6 style="color: rgb(65, 78, 78);"> Create new tags:</h6>
                            <div id="create-tags">
                                <input type="textarea" v-model="newTag.name" placeholder="Enter new tag's name"> &nbsp; 
                                <button type="button" @click="createTag()" class="btn"
                                style="height: 37px; font-weight: bold; background-color: #006088; color:white;">Create</button>
                            </div>
                        </div>
                    </div><br>

                    <div class="form-row align-items-center">
                        <div class="col-auto">
                            <h6 style="color: rgb(65, 78, 78);"> Current tags:</h6>
                            <div class="tags-2">
                                <div v-for="(tag, index) in editPost.tags" :key="index">
                                    <div id="tag-name">
                                        <center>&nbsp; <strong>{{tag.name}}</strong></center>
                                        <button id="plus-button" @click="removeFromCurrentTagsForEdit(tag._id, tag.name, index)" type="button" class="btn"><i class="far fa-minus-square"></i></button>
                                    </div>
                                </div> 
                            </div>    
                        </div>
                    </div> <br>


                    <h6>Current Image: </h6>
                    <img id="current-img" :src="editPost.temp_img" alt=""> <br> <br>
                    <div class="custom-file mb-3">
                        <input v-on:change="getImageForPost($event)" class="custom-file-input" type="file">
                        <label class="custom-file-label text-left"></label>
                    </div>
                    <hr>

                    <!-- Include Quill stylesheet -->
                    <h6 style="color: rgb(65, 78, 78);">Content: </h6><br>
                    <quillEditor v-model="editPost.content"> </quillEditor> <br><br> <br><br>
                    <center><button id="submit-btn" @click="updatePost(editPost.id)" class="btn btn-lg" type="submit">Submit</button></center> <br>
                </div>
            </div>
        </div>
        <Reader v-if="inReader" />
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
import axios from 'axios'
import Reader from '../components/Reader'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'

export default {
    name: 'MySite',
    props: ['displayHome', 'displayMySite'],
    components: {
        Reader,
        quillEditor
    },
    data () {
        return {
            loading: true,
            inCreatePost: false,
            inEditPost: false,
            inDefaultDashboard: true,
            inReader: false,
            sideBar: true,
            newPost: {
                title: '',
                content: '',
                img: '',
                tags: []
            },
            editPost: {
                id: '',
                title: '',
                content: '',
                img: '',
                temp_img: '',
                tags: []
            },
            newTag: {
                name: ''
            },
            image: '',
            postData: [],
            tagsData: [],
            tagsDataForEdit: [],
            followingData: []
        }
    },
    methods: {
        logout() {
            Swal.fire(
                'Logout Success!',
                `See you again`,
                'success'
            )
            localStorage.removeItem('token')
            this.displayHome()
        },
        displayReader() {
            this.inReader = true
            this.inDefaultDashboard = false
            this.inCreatePost = false
            this.inEditPost = false
            this.sideBar = true
        },
        displayDefault() {
            this.displayMySite()
            this.inDefaultDashboard = true
            this.inCreatePost = false
            this.inEditPost = false
            this.loading = false
            this.sideBar = false
            this.inReader = false
            this.displayPosts()
        },
        displayCreatePost() {
            this.inCreatePost = true
            this.inDefaultDashboard = false
            this.sideBar = false
            this.inReader = false
            this.inEditPost = false
        },
        displayEditPost(id, title, content, img, tags) {
            this.editPost.tags = tags
            this.inEditPost = true
            this.inDefaultDashboard = false
            this.editPost.id = id
            this.editPost.title = title
            this.editPost.content = content
            this.editPost.temp_img = img
            this.displayTagsForEdit()
        },
        getImageForPost(link){
            this.newPost.img = link.target.files[0];
            this.editPost.img = link.target.files[0];
            this.image = link.target.files[0];
        },
        addToCurrentTags(id, name, index) {
            this.newPost.tags.unshift({id, name})

            this.tagsData.splice(index, 1)
            this.tagsData = this.tagsData.sort((a, b) => (a.name > b.name) ? 1 : -1)
            
        },
        removeFromCurrentTags(id, name, index) {
            this.tagsData.unshift({id, name})

            this.newPost.tags.splice(index, 1)
            this.tagsData = this.tagsData.sort((a, b) => (a.name > b.name) ? 1 : -1)
        },
        addToCurrentTagsForEdit(id, name, index) {
            this.editPost.tags.unshift({_id: id, name})

            this.tagsDataForEdit.splice(index, 1)
            this.tagsDataForEdit = this.tagsDataForEdit.sort((a, b) => (a.name > b.name) ? 1 : -1)
        },
        removeFromCurrentTagsForEdit(id, name, index) {
            this.tagsDataForEdit.unshift({id, name})

            this.editPost.tags.splice(index, 1)
            this.tagsDataForEdit = this.tagsDataForEdit.sort((a, b) => (a.name > b.name) ? 1 : -1)
        },
        unfollow(id) {
            const token = localStorage.getItem('token')

            axios({
                method: 'patch',
                url: `http://localhost:3000/unfollow/${id}`,
                headers: {token}
            })
                .then(({data}) => {
                    Swal.fire(
                        'Unfollowed!',
                        `Success!`,
						'success'
					)
                    this.displayFollowing()
                    
                })
        },
        displayFollowing() {
            const token = localStorage.getItem('token')

            axios({
                method: 'get',
                url: `http://localhost:3000/following`,
                headers: {token}
            })  
                .then(({data}) => {
                    this.followingData = data
                })
        },
        createTag() {
            axios({
                method: 'post',
                url: `http://localhost:3000/tags`,
                data: {
                    name: this.newTag.name
                }
            })
                .then(({data}) => {
                    this.newTag.name = ''
                    this.tagsData.push({
                        _id: data.tag._id,
                        name: data.tag.name
                    })

                    this.tagsDataForEdit.push({
                        _id: data.tag._id,
                        name: data.tag.name
                    })
                })
                .catch(console.log)
        },
        displayTags() {
            axios({
                method: 'get',
                url: `http://localhost:3000/tags`
            })
                .then(({data}) => {
                    this.tagsData = data.sort((a, b) => (a.name > b.name) ? 1 : -1)
                })
                .catch(console.log)
        },
        displayTagsForEdit() {
            const newTags = this.tagsData.filter(tag => {
                const tagFound = this.editPost.tags.some(item => item.name === tag.name)

                if (!tagFound) {
                    return tag
                }
            })

            this.tagsDataForEdit = newTags
        },
        displayPosts() {
            const token = localStorage.getItem('token')
            // this.loading = true

            axios({
                method: 'get',
                url: `http://localhost:3000/posts`,
                headers: {token}
            })
                .then(({data}) => {
                    this.postData = data.reverse()
                    this.postTagsData = data.tags
                })
                .catch(console.log)
        },
        displayPostsByTags(id) {
            const token = localStorage.getItem('token')

            axios({
                method: 'get',
                url: `http://localhost:3000/tags/${id}`,
                headers: {token}
            })
                .then(({data}) => {
                    this.postData = data
                })
                .catch(console.log)
        },
        createPost () {
            Swal.fire({
            title: 'Uploading ...',
            onBeforeOpen: () => {
            Swal.showLoading()
            }
        })
            const token = localStorage.getItem('token')
            let formData = new FormData();
            formData.append('image', this.newPost.img);

            let tagsBody = []

            for (let i = 0; i < this.newPost.tags.length; i++) {
                tagsBody.push(this.newPost.tags[i].id)
            }

            axios.post(`http://localhost:3000/img/upload`, formData, {})
                .then((image) => {
                    if (image === null || image == undefined) {
                        image = 'none'
                    }
                    
                axios({
                    method: 'post',
                    url: `http://localhost:3000/posts`,
                    data: {
                        title: this.newPost.title,
                        content: this.newPost.content,
                        img: image.data.link,
                        tags: tagsBody
                    },
                    headers: {token}
                })
                    .then(({data}) => {
                        this.displayDefault()
                        this.displayTags()
                        Swal.fire(
                            'New Post Created!',
                            `Success`,
                            'success'
                        )
                        this.newPost.tags = []
                        this.newPost.title = ''
                        this.newPost.content = ''
                        this.newPost.img = ''
                    })
                    .catch(err => {
                        console.log(err)
                    })
                    
                })
        },
        updatePost(id) {
            Swal.fire({
                title: 'Uploading ...',
                onBeforeOpen: () => {
                Swal.showLoading()
                }
            })
            const token = localStorage.getItem('token')
            let formData = new FormData();
            formData.append('image', this.editPost.img);

            let imageBody = null
            let tagsBody = []

            for (let i = 0; i < this.editPost.tags.length; i++) {
                tagsBody.push(this.editPost.tags[i]._id)
            }

            axios.post(`http://localhost:3000/img/upload`, formData, {})
                .then((image) => {
                    if(!image) {
                        imageBody = this.editPost.img
                    } else {
                        imageBody = image.data.link
                    }
                    axios({
                        method: 'put',
                        url: `http://localhost:3000/posts/${id}`,
                        headers: {token},
                        data: {
                            title: this.editPost.title,
                            content: this.editPost.content,
                            img: imageBody,
                            tags: tagsBody
                        }
                    })
                        .then(({data}) => {
                            this.displayDefault()
                            Swal.fire(
                                'Post is successfully edited!',
                                `Success`,
                                'success'
                            )
                        })
                        .catch(console.log)
                        })

        },
        deletePost(id) {
            const token = localStorage.getItem('token')

            axios({
                method: 'delete',
                url: `http://localhost:3000/posts/${id}`,
                headers: {token}
            })
                .then(({data}) => {
                    Swal.fire({
                        title: 'Are you sure?',
                        text: "You won't be able to revert this!",
                        type: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Yes, delete it!'
                    }).then((result) => {
                        if (result.value) {
                            this.displayDefault()
                            Swal.fire(
                            'Deleted!',
                            'Your post has been deleted.',
                            'success'
                            )
                        }
                    })
                })
        }
    },
    created() {
        this.displayPosts()
        this.displayTags()
        setTimeout(() => {
            this.loading = false
            this.sideBar = false
        }, 1000)
    }
}
</script>

<style scoped>
.tags-2 {
    display: flex;
}

#tag-name {
    width: 120px;
    height: 38px;
    border: 1px solid black;
    border-radius: 3px;
    margin-right: 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
#mysite {
    background-color: #F6F7F7;
    height: 1400px;
}
.container {
	padding-top: 20px;
    padding-left: 20px;
	margin: 0px;
	min-width: 1425px;
}

#mysites-btn {
    background-color: #006088;
}

#nav {
    background-color:#006088;
}

#nav-container {
    display: flex;
    align-items: center;

}

#tags {
    display: flex;
}

#nav-logo {
    height: 40px;
}

#mysites-menu-left {
    padding-top: 20px;
    border-top: 1px solid black;
    border-right: 1px solid black;
    border-left: 1px solid black;
    height: 1000px;
    width: 350px;
    background-color: white;
}

#menu-need-hover:hover {
    background-color: rgb(222, 241, 241)
}

#sub-menu {
    font-weight: bold;
}

ul {
    padding: 10px 15px 15px 15px;
    margin-left: 20px;
    color: rgb(65, 78, 78)
}

.left-menus {
    color: rgb(0, 0, 0);
    border-bottom: 1px solid rgb(182, 175, 175);
    padding-bottom: 20px;
    margin-left: 15px;
    font-weight: bold;
}

ul {
    cursor:pointer
}

a {
    color: inherit;
    text-decoration: none;
}

a:hover {
     color:#00A0C6; 
     text-decoration:none; 
     cursor:pointer;  
}

#published {
    color: rgb(65, 78, 78);
    padding: 14px;
    font-size: 17px;
    font-weight: 450;
}

#published:hover {
    color: #4771B1;
    background-color: #E9EFF5;
    padding: 14px;
    font-size: 17px;
    font-weight: 450;
}

#my-posts {
    display: flex;
    flex-direction: column;
}

#card-text {
    display: flex;
    flex-direction: column;
    justify-content: center;    
}

#card-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

#c-img {
    width: 150px;
    height: 100px
}

a.badge-dark {
    margin-top: 15px;
    color: white;
}

.bd-custom {
    background-color: #4267B2;
}

.site-btns {
    font-size: 1rem;
}

#new-post, #edit-post {
    margin-top: 45px;
    margin-left: 0px;
}
#newpost-content {
  width: 600px;
  height: 250px;
}

#add-post {
    align-self: center;
}

#add-post-header {
    border: 3px solid #006088;
    padding: 10px;
    width: 700px;
    border-radius: 4px;
}

#submit-btn {
    color: white;
    font-weight: bold;
    background-color: #006088;
}

#my-posts-header {
    border: 1px solid #F6F7F7;
    height: 70px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: white;
    border-radius: 3px;
}

#post-btns {
    margin-top: 60px;
}

.post-btn {
    background-color: #0087BE;
    color: white;
}

.post-btn:hover {
    background-color: #F6F7F7;
    color: black;
    border: 1px solid black;
}

.card-body {
    height: 140px;
}

#current-img {
    height: 200px;
    width: 300px;
}

.lds-circle {
    margin-top: 100px;
    padding-right: 250px;
    display: inline-block;
    transform: translateZ(1px);
}

.lds-circle > div {
    background-image: url("https://i.imgur.com/gMfJ8nX.png");
    background-size: 80%;
    background-repeat: no-repeat;
    background-position: 50%;
    display: inline-block;
    width: 500px;
    height: 500px;
    margin: 6px;
    border-radius: 50%;
    /* background: crimson; */
    animation: lds-circle 5s cubic-bezier(0, 0.2, 0.8, 1) infinite;
}

@keyframes lds-circle {
    0%, 100% {
    animation-timing-function: cubic-bezier(0.5, 0, 1, 0.5);
    }
    0% {
    transform: rotateY(0deg);
    }
    50% {
    transform: rotateY(1800deg);
    animation-timing-function: cubic-bezier(0, 0.5, 0.5, 1);
    }
    100% {
    transform: rotateY(3600deg);
    }
}

#plus-button {
    background-color:#006088; 
    color:white;
}

#plus-button:hover {
    background-color: #0087BE;
}

#users {
	background-color: white;
	border: 3px solid black;
	font-weight: bold;
	color: black;
	text-align: left;
	padding: 10px;
	margin-bottom: 5px;
	border-radius: 5px;
	display: flex;
	justify-content: space-between;
	align-items: center;
}
</style>