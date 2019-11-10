<template>
    <div class="article-card p-2">
        <div class="m-2 text-white" @click="changePage" style="position: absolute; cursor: pointer;"><i class="far fa-edit"></i></div>
        <img :src="articleItem.file" alt="">
        <articleTime :article="articleItem"></articleTime>
        <h5 v-html="articleItem.title"></h5>
        <div v-html="articleItem.content" style="height: 50px; overflow: hidden; font-size: 12px; color: grey;"></div>
        <div class="article-card-tag" style="width: 300px">
            <span v-for="(tag, i) in articleItem.tags" @click="searchByTag(tag)" :key="i">#{{ tag }}</span>
        </div>
    </div>
</template>

<script>
import articleTime from './article-time'

export default {
    name: 'article-card',
    props: ['articleItem'],
    components: {
        articleTime
    },
    methods: {
        changePage(){
            this.$emit('changePage', 'create')
            this.articleId()
        },
        articleId(){
            this.$emit('articleId', this.articleItem._id)
        },
        searchByTag(tag){
            this.$emit('searchByTag', tag)
        }
    }
}
</script>

<style>

</style>