<template>
    <div id="reader">
        <div class="container">
            <div class="row">
                <div class="col-4">
                    <div id="mysites-menu-left" class="overflow-auto">
                        <h5 class="left-menus">Streams</h5><br>
                        <div id="sub-menu">
                            <ul id="menu-need-hover">
                                <a href="#" type="button" style="cursor:pointer" @click="displayUsersToFollow()"> 
                                    <i class="fas fa-search-plus"></i> &nbsp; Discover
                                </a>
                            </ul>
                            <ul id="menu-need-hover">
                                <a href="#" type="button" style="cursor:pointer;" @click="displayFollowingPost()">
                                    <i class="fas fa-user-friends"></i> &nbsp; Followed Sites
                                </a>
                            </ul>
                            <ul id="menu-need-hover">
                                <a href="#" type="button" style="cursor:pointer;" @click="displayPopularPost()">
                                    <i class="fas fa-fire-alt"></i> &nbsp; Popular Posts
                                </a>
                            </ul>
                            <ul id="menu-need-hover">
                                <a href="#" type="button" style="cursor:pointer;" @click="displayLikedPost()">
                                    <i class="far fa-star"></i> &nbsp; Liked Post
                                </a>
                                
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="col-8"><br>
                    <!--Display:PopularPost-->
                    <div v-if="inPopularPost" id="posts">
                        <div id="my-posts-header">
                            <h4>Popular Posts</h4>
                            <hr>
                        </div><br>
                        <div v-for="(post, index) in postData" :key="index" id="my-posts">
                            <div id="post" class="card w-90">
                                <div id="card-container" class="card-body">
                                    <div id="card-text">
                                        <h5 class="card-title">{{post.title}}</h5>
                                        <span class="badge badge-info" style="margin-bottom:5px;">By: {{post.user.name}}</span>
                                        <span class="badge badge-warning" style="width: 35px;"><i class="far fa-thumbs-up"></i> {{post.like.length}}</span>
                                    </div>
                                    <div id="card-img" style="height: 100px; display: flex;">
                                        <img id="c-img" :src="post.img" alt="">
                                    </div>
                                </div>
                                <center>
                                    <div id="like-btn" style="padding: 0; margin: 0">
                                        <button type="button" style="font-weight: bold;" 
                                        @click="like(post._id)" class="btn post-btn like-btns"><i class="far fa-star"></i>&nbsp; Like</button> <br><br>
                                    </div>
                                </center>
                            </div>
                        </div>
                    </div>
                    <!--Display:LikedPost-->
                    <div v-if="inLikedPost" id="liked-posts">
                        <div id="my-posts-header">
                            <h4>Liked Posts</h4>
                            <hr>
                        </div><br>
                        <div v-for="(post, index) in likedPost" :key="index" id="my-posts">
                            <div id="post" class="card w-90">
                                <div id="card-container" class="card-body">
                                    <div id="card-text">
                                        <h5 class="card-title">{{post.title}}</h5>
                                        <span class="badge badge-info" style="margin-bottom:5px;">By: {{post.user.name}}</span>
                                        <span class="badge badge-warning" style="width: 35px;"><i class="far fa-thumbs-up"></i> {{post.like.length}}</span>
                                    </div>
                                    
                                    <div id="card-img" style="height: 100px; display: flex;">
                                        <img id="c-img" :src="post.img" alt="">
                                    </div>
                                </div>
                                <center>
                                    <div id="like-btn" style="padding: 0; margin: 0">
                                         <button type="button" style="font-weight: bold" 
                                        @click="unlike(post._id)" class="btn post-btn"><i class="fas fa-star"></i>&nbsp; Unlike</button> <br><br>
                                    </div>
                                </center>
                            </div>
                        </div>
                    </div>

                    <!--Display:FollowedSites-->
                    <div v-if="followedSites" id="liked-posts">
                        <div id="my-posts-header">
                            <h4>Followed Sites</h4>
                            <hr>
                        </div><br>
                        <div v-for="(post, index) in followingPost" :key="index" id="my-posts">
                            <div id="post" class="card w-90">
                                <div id="card-container" class="card-body">
                                    <div id="card-text">
                                        <h5 class="card-title">{{post.post.title}}</h5>
                                        <span class="badge badge-info" style="margin-bottom:5px;">By: {{post.name}}</span>
                                        <span class="badge badge-warning" style="width: 35px;"><i class="far fa-thumbs-up"></i> {{post.post.like.length}}</span>
                                    </div>
                                    
                                    <div id="card-img" style="height: 100px; display: flex;">
                                        <img id="c-img" :src="post.post.img" alt="">
                                    </div>
                                </div>
                                <center>
                                    <div id="like-btn" style="padding: 0; margin: 0">
                                        <button type="button" style="font-weight: bold;" 
                                        @click="likeInFollowedSites(post.post._id)" class="btn post-btn like-btns"><i class="far fa-star"></i>&nbsp; Like</button> <br><br>
                                    </div>
                                </center>
                            </div>
                        </div>
                    </div>

                    <!--Discover-->
                    <div v-if="inDiscover" id="discover">
                        <h4>Users to follow:</h4>
                        <hr><br>
                        <div id="users" v-for="(user, index) in usersToFollow" :key="index">
                            <p>{{user.name}}</p> 
                            <button type="button" style="font-weight: bold; border: 2px solid black;" @click="follow(user.id)" class="btn btn-primary">Follow</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
    name: 'Reader',
    data () {
        return {
            postData: [],
            likedPost: [],
            followingPost: [],
            usersToFollow: [],
            inLikedPost: false,
            inPopularPost: false,
            inDiscover: false,
            followedSites: false
        }
    },
    methods: {
        follow(id) {
            const token = localStorage.getItem('token')

            axios({
                method: 'patch',
                url: `http://localhost:3000/follow/${id}`,
                headers: {token}
            })
                .then(({data}) =>{
                    this.displayUsersToFollow()
                    Swal.fire(
                        'Followed!',
                        `Success!`,
						'success'
					)
                })
        },
        displayFollowingPost() {
            const token = localStorage.getItem('token')
            let postFollowing = []
            this.inDiscover = false
            this.inPopularPost = false
            this.inLikedPost = false
            this.followedSites = true

            axios({
                method: 'get',
                url: `http://localhost:3000/posts/following`,
                headers: {token}
            })
                .then(({data}) => {
                    for (let i = 0; i < data.length; i++) {
                        for (let j = 0; j < data[i].post.length; j++) {
                            postFollowing.push({
                                name: data[i].name,
                                post: data[i].post[j]
                            })
                        }
                    }

                    this.followingPost = postFollowing
                    this.followingPost = this.followingPost.sort((a, b) => (a.post.like.length < b.post.like.length) ? 1 : -1)
                })
        },
        displayUsersToFollow() {
            const token = localStorage.getItem('token')
            this.inDiscover = true
            this.inPopularPost = false
            this.inLikedPost = false
            this.followedSites = false

            axios({
                method: 'get',
                url: `http://localhost:3000/`,
                headers: {token}
            })
                .then(({data}) => {
                    this.usersToFollow = data
                })
        },
        displayLikedPost() {
            const token = localStorage.getItem('token')
            this.inLikedPost = true
            this.inPopularPost = false
            this.inDiscover = false
            this.followedSites = false

            axios({
                method: 'get',
                url: `http://localhost:3000/posts/liked`,
                headers: {token}
            })
                .then(({data}) => {
                    this.likedPost = data
                })
        },
        displayPopularPost() {
            this.inLikedPost = false
            this.inPopularPost = true
            this.inDiscover = false
            this.followedSites = false

            axios({
                method: 'get',
                url: `http://localhost:3000/posts/popular`
            })
                .then(({data}) => {
                    this.postData = data
                    this.postData = this.postData.sort((a, b) => (a.like.length < b.like.length) ? 1 : -1)
                })
                .catch(console.log)
        },
        likeInFollowedSites(id) {
            const token = localStorage.getItem('token')

            axios({
                method: 'patch',
                url: `http://localhost:3000/posts/like/${id}`,
                headers: {token}
            })
                .then(({data}) => {
                    this.displayFollowingPost()
                })
        },
        like(id) {
            const token = localStorage.getItem('token')

            axios({
                method: 'patch',
                url: `http://localhost:3000/posts/like/${id}`,
                headers: {token}
            })
                .then(({data}) => {
                    this.displayPopularPost()
                })
        },
        unlike(id) {
            const token = localStorage.getItem('token')

            axios({
                method: 'patch',
                url: `http://localhost:3000/posts/like/${id}`,
                headers: {token}
            })
                .then(({data}) => {
                    this.displayLikedPost()
                })
        }
    }, 
    created() {
        this.displayPopularPost()
    }
}
</script>

<style scoped>
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
#reader {
    background-color: #F6F7F7;
    height: 1400px;
}

.container {
	padding-top: 20px;
    padding-left: 20px;
	margin: 0px;
    padding: 0px;
	min-width: 1425px;
}

#info-bar {
    display: flex;
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
    padding-bottom: 0px;
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

.card-body {
    height: 140px;
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