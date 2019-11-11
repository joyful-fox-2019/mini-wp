<template>
  <div class="card m-2">
        <h1 style="margin-bottom: 10px; margin-right: 5px;">{{detailArticle.title}}</h1>
        <div class="container my-2">
            <div class="row">
            <div class="col-md-6 mt-2">
                <img :src="detailArticle.featured_image" width="100%" height="100%">
            </div>
            <div class="col-md-6">
                <div class="row">
                    <div v-for="(el, index) in detailArticle.tags" :key="index">
                    <p>{{el}} &nbsp;</p>
                    </div>
                </div>
                <hr>
                <div class="row">
                    Posted on: {{detailArticle.createdAt.slice(0,10)}}
                </div>
                <div class="row">
                    <p>Created by: {{detailArticle.author}}</p>
                </div>
            </div>
            </div>
            <div class="row">
                <p v-html="detailArticle.content" class="mx-2"></p>
            </div>
        </div>
  </div>
</template>

<script>
export default {
    name: 'DetailPage',
    props: ['article'],
    data () {
        return {
            comment: '',
            detailArticle: {
                
            }
        }
    },
    watch: {
        article: {
            handler(val) {
                this.detailArticle = val
            }
        },
        deep: true
    },
    created () {
        this.detailArticle = this.article
    }
}
</script>

<style>

</style>