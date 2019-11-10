<template>
  <div class="myAticleContent">
        <div class="preloader loading" v-if="isLoading">
            <span class="slice"></span>
            <span class="slice"></span>
            <span class="slice"></span>
            <span class="slice"></span>
            <span class="slice"></span>
            <span class="slice"></span>
        </div>
            <div v-for="(article,index) in myDataArticle.slice().reverse()" :key="article._id">
            <div :class="{ 'blog-card alt': (index % 2 === 0), 'blog-card': (index % 2 !== 0) }">
                <div class="meta">
                    <div class="photo">
                        <img :src="article.featured_image" alt="" style="height:100%;"></div>
                        <ul class="details">
                            <li class="author">
                                <i class="fas fa-user"></i>
                                <a href="#">
                                    {{article.author.name}}</a>
                            </li>
                            <li class="date">
                                <i class="fas fa-clock"></i>
                                {{formatDate(article.createdAt)}}</li>
                            <li class="tags">
                            <ul>
                                <li>
                                    <i class="fas fa-tags"></i>
                                </li>
                                <li v-for="(tag,index) in article.tags" :key="index">
                                    <a href="#">{{ tag }}&nbsp;</a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
                <div class="description">
                    <h1>{{article.title}}</h1>
                    <hr>
                    <p style="width:400px; height : 155px; white-space: wrap; overflow: hidden; text-overflow: ellipsis;" v-html="article.content"></p>
                    <p class="read-more">
                        <a href="" @click.prevent="fetchDataDetail(article._id)">Read More</a>
                    </p>
                </div>
            </div>
        </div>
  </div>
</template>

<script>
import axios from '../apis/server'
import moment from 'moment'

export default {
    name: 'myArticle',
    data(){
        return {
            isLoading: true,
            myDataArticle: []
        }
    },
    methods:  {
      formatDate(date) {
            return moment(date).fromNow()
        },
        fethcMyArticle() {
            axios({
                method: 'get',
                url :  '/articles',
                headers : {
                    token : localStorage.getItem('token')
                }
            })
                .then(({data})=>{
                    this.myDataArticle = data.data
                    this.isLoading = false
                })
                .catch(err=>{
                    Swal.fire('error','internal server error','error')
                })
        },
        fetchDataDetail(id) {
            axios({
              method: 'get',
              url: `/articles/${id}`,
              headers: {
                token : localStorage.getItem('token')
              }
            })
              .then(({data})=>{
                this.$emit('addMyData',data.data[0])
                this.$emit('changePage',false,false,false,false,false,true,false)
              })
              .catch(err=>{
                  Swal.fire('error','internal server error','error')
              })
        }
    },
    created () {
        this.fethcMyArticle()
    }
}
</script>

<style scoped>
@keyframes preload-show-1 {
  from {
    transform: rotateZ(60deg) rotateY(-90deg) rotateX(0deg);
    border-left-color: #fff;
  }
}
@keyframes preload-hide-1 {
  to {
    transform: rotateZ(60deg) rotateY(-90deg) rotateX(0deg);
    border-left-color: #fff;
  }
}
@keyframes preload-cycle-1 {
  5% {
    transform: rotateZ(60deg) rotateY(90deg) rotateX(0deg);
    border-left-color: #fff;
  }
  10%, 75% {
    transform: rotateZ(60deg) rotateY(0) rotateX(0deg);
    border-left-color: #000;
  }
  80%, 100% {
    transform: rotateZ(60deg) rotateY(90deg) rotateX(0deg);
    border-left-color: #fff;
  }
}
@keyframes preload-show-2 {
  from {
    transform: rotateZ(120deg) rotateY(-90deg) rotateX(0deg);
    border-left-color: #fff;
  }
}
@keyframes preload-hide-2 {
  to {
    transform: rotateZ(120deg) rotateY(-90deg) rotateX(0deg);
    border-left-color: #fff;
  }
}
@keyframes preload-cycle-2 {
  10% {
    transform: rotateZ(120deg) rotateY(90deg) rotateX(0deg);
    border-left-color: #fff;
  }
  15%, 70% {
    transform: rotateZ(120deg) rotateY(0) rotateX(0deg);
    border-left-color: #000;
  }
  75%, 100% {
    transform: rotateZ(120deg) rotateY(90deg) rotateX(0deg);
    border-left-color: #fff;
  }
}
@keyframes preload-show-3 {
  from {
    transform: rotateZ(180deg) rotateY(-90deg) rotateX(0deg);
    border-left-color: #fff;
  }
}
@keyframes preload-hide-3 {
  to {
    transform: rotateZ(180deg) rotateY(-90deg) rotateX(0deg);
    border-left-color: #fff;
  }
}
@keyframes preload-cycle-3 {
  15% {
    transform: rotateZ(180deg) rotateY(90deg) rotateX(0deg);
    border-left-color: #fff;
  }
  20%, 65% {
    transform: rotateZ(180deg) rotateY(0) rotateX(0deg);
    border-left-color: #000;
  }
  70%, 100% {
    transform: rotateZ(180deg) rotateY(90deg) rotateX(0deg);
    border-left-color: #fff;
  }
}
@keyframes preload-show-4 {
  from {
    transform: rotateZ(240deg) rotateY(-90deg) rotateX(0deg);
    border-left-color: #fff;
  }
}
@keyframes preload-hide-4 {
  to {
    transform: rotateZ(240deg) rotateY(-90deg) rotateX(0deg);
    border-left-color: #fff;
  }
}
@keyframes preload-cycle-4 {
  20% {
    transform: rotateZ(240deg) rotateY(90deg) rotateX(0deg);
    border-left-color: #fff;
  }
  25%, 60% {
    transform: rotateZ(240deg) rotateY(0) rotateX(0deg);
    border-left-color: #000;
  }
  65%, 100% {
    transform: rotateZ(240deg) rotateY(90deg) rotateX(0deg);
    border-left-color: #fff;
  }
}
@keyframes preload-show-5 {
  from {
    transform: rotateZ(300deg) rotateY(-90deg) rotateX(0deg);
    border-left-color: #fff;
  }
}
@keyframes preload-hide-5 {
  to {
    transform: rotateZ(300deg) rotateY(-90deg) rotateX(0deg);
    border-left-color: #fff;
  }
}
@keyframes preload-cycle-5 {
  25% {
    transform: rotateZ(300deg) rotateY(90deg) rotateX(0deg);
    border-left-color: #fff;
  }
  30%, 55% {
    transform: rotateZ(300deg) rotateY(0) rotateX(0deg);
    border-left-color: #000;
  }
  60%, 100% {
    transform: rotateZ(300deg) rotateY(90deg) rotateX(0deg);
    border-left-color: #fff;
  }
}
@keyframes preload-show-6 {
  from {
    transform: rotateZ(360deg) rotateY(-90deg) rotateX(0deg);
    border-left-color: #fff;
  }
}
@keyframes preload-hide-6 {
  to {
    transform: rotateZ(360deg) rotateY(-90deg) rotateX(0deg);
    border-left-color: #fff;
  }
}
@keyframes preload-cycle-6 {
  30% {
    transform: rotateZ(360deg) rotateY(90deg) rotateX(0deg);
    border-left-color: #fff;
  }
  35%, 50% {
    transform: rotateZ(360deg) rotateY(0) rotateX(0deg);
    border-left-color: #000;
  }
  55%, 100% {
    transform: rotateZ(360deg) rotateY(90deg) rotateX(0deg);
    border-left-color: #fff;
  }
}
@keyframes preload-flip {
  0% {
    transform: rotateY(0deg) rotateZ(-60deg);
  }
  100% {
    transform: rotateY(360deg) rotateZ(-60deg);
  }
}

.preloader {
  position: absolute;
  top: 50%;
  left: 50%;
  font-size: 20px;
  display: block;
  width: 3.75em;
  height: 4.25em;
  margin-left: -1.875em;
  margin-top: -2.125em;
  transform-origin: center center;
  transform: rotateY(180deg) rotateZ(-60deg);
}
.preloader .slice {
  border-top: 1.125em solid transparent;
  border-right: none;
  border-bottom: 1em solid transparent;
  border-left: 1.875em solid #000;
  position: absolute;
  top: 0px;
  left: 50%;
  transform-origin: left bottom;
  border-radius: 3px 3px 0 0;
}
.preloader .slice:nth-child(1) {
  transform: rotateZ(60deg) rotateY(0deg) rotateX(0);
  animation: 0.15s linear 0.82s preload-hide-1 both 1;
}
.preloader .slice:nth-child(2) {
  transform: rotateZ(120deg) rotateY(0deg) rotateX(0);
  animation: 0.15s linear 0.74s preload-hide-2 both 1;
}
.preloader .slice:nth-child(3) {
  transform: rotateZ(180deg) rotateY(0deg) rotateX(0);
  animation: 0.15s linear 0.66s preload-hide-3 both 1;
}
.preloader .slice:nth-child(4) {
  transform: rotateZ(240deg) rotateY(0deg) rotateX(0);
  animation: 0.15s linear 0.58s preload-hide-4 both 1;
}
.preloader .slice:nth-child(5) {
  transform: rotateZ(300deg) rotateY(0deg) rotateX(0);
  animation: 0.15s linear 0.5s preload-hide-5 both 1;
}
.preloader .slice:nth-child(6) {
  transform: rotateZ(360deg) rotateY(0deg) rotateX(0);
  animation: 0.15s linear 0.42s preload-hide-6 both 1;
}
.preloader.loading {
  animation: 2s preload-flip steps(2) infinite both;
}
.preloader.loading .slice:nth-child(1) {
  transform: rotateZ(60deg) rotateY(90deg) rotateX(0);
  animation: 2s preload-cycle-1 linear infinite both;
}
.preloader.loading .slice:nth-child(2) {
  transform: rotateZ(120deg) rotateY(90deg) rotateX(0);
  animation: 2s preload-cycle-2 linear infinite both;
}
.preloader.loading .slice:nth-child(3) {
  transform: rotateZ(180deg) rotateY(90deg) rotateX(0);
  animation: 2s preload-cycle-3 linear infinite both;
}
.preloader.loading .slice:nth-child(4) {
  transform: rotateZ(240deg) rotateY(90deg) rotateX(0);
  animation: 2s preload-cycle-4 linear infinite both;
}
.preloader.loading .slice:nth-child(5) {
  transform: rotateZ(300deg) rotateY(90deg) rotateX(0);
  animation: 2s preload-cycle-5 linear infinite both;
}
.preloader.loading .slice:nth-child(6) {
  transform: rotateZ(360deg) rotateY(90deg) rotateX(0);
  animation: 2s preload-cycle-6 linear infinite both;
}

/* --- article cards */

img {
    background-size: cover;
    background-repeat: no-repeat;
    background-position: 50% 50%;
}

.myAticleContent {
    overflow: scroll;
    height: 90vh;
}


.blog-card {
  display: flex;
  flex-direction: column;
  margin: 1rem auto;
  box-shadow: 0 3px 7px -1px rgba(0, 0, 0, 0.1);
  margin-bottom: 1.6%;
  background: #fff;
  line-height: 1.4;
  font-family: sans-serif;
  border-radius: 5px;
  overflow: hidden;
  z-index: 0;
}
.blog-card a {
  color: inherit;
}
.blog-card a:hover {
  color: #000;
}
.blog-card:hover .photo {
  transform: scale(1.3) rotate(3deg);
}
.blog-card .meta {
  position: relative;
  z-index: 0;
  height: 200px;
}
.blog-card .photo {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-size: cover;
  background-position: center;
  transition: transform 0.2s;
}
.blog-card .details, .blog-card .details ul {
  margin: auto;
  padding: 0;
  list-style: none;
}
.blog-card .details {
  position: absolute;
  top: 0;
  bottom: 0;
  left: -100%;
  margin: auto;
  transition: left 0.2s;
  background: rgba(0, 0, 0, 0.6);
  color: #fff;
  padding: 10px;
  width: 100%;
  font-size: 0.9rem;
}
.blog-card .details a {
  text-decoration: dotted underline;
}
.blog-card .details ul li {
  display: inline-block;
}

.blog-card .details .tags li {
  margin-right: 2px;
}
.blog-card .details .tags li:first-child {
  margin-left: -4px;
}
.blog-card .description {
  padding: 1rem;
  background: #fff;
  position: relative;
  z-index: 1;
}
.blog-card .description h1, .blog-card .description h2 {
  font-family: Poppins, sans-serif;
}
.blog-card .description h1 {
  line-height: 1;
  margin: 0;
  font-size: 1.7rem;
}
.blog-card .description h2 {
  font-size: 1rem;
  font-weight: 300;
  text-transform: uppercase;
  color: #a2a2a2;
  margin-top: 5px;
}
.blog-card .description .read-more {
  text-align: right;
}
.blog-card .description .read-more a {
  color: #000;
  display: inline-block;
  position: relative;
}
.blog-card .description .read-more a:after {
  /* content: "\f061"; */
  /* font-family: FontAwesome; */
  margin-left: -10px;
  opacity: 0;
  vertical-align: middle;
  transition: margin 0.3s, opacity 0.3s;
}
.blog-card .description .read-more a:hover:after {
  margin-left: 5px;
  opacity: 1;
}
.blog-card p {
  position: relative;
  margin: 1rem 0 0;
}
.blog-card p:first-of-type {
  margin-top: 1.25rem;
}
.blog-card p:first-of-type:before {
  content: "";
  position: absolute;
  height: 5px;
  background: #000;
  width: 35px;
  top: -0.75rem;
  border-radius: 3px;
}
.blog-card:hover .details {
  left: 0%;
}
@media (min-width: 640px) {
  .blog-card {
    flex-direction: row;
    max-width: 700px;
  }
  .blog-card .meta {
    flex-basis: 40%;
    height: auto;
  }
  .blog-card .description {
    flex-basis: 60%;
  }
  .blog-card .description:before {
    transform: skewX(-3deg);
    content: "";
    background: #fff;
    width: 30px;
    position: absolute;
    left: -10px;
    top: 0;
    bottom: 0;
    z-index: -1;
  }
  .blog-card.alt {
    flex-direction: row-reverse;
  }
  .blog-card.alt .description:before {
    left: inherit;
    right: -10px;
    transform: skew(3deg);
  }
  .blog-card.alt .details {
    padding-left: 25px;
  }
}

</style>