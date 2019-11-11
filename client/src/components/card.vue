<template>
     
    <div class="card mb-3" style="max-width: 100%;">
        <div class="row no-gutters">
            <div class="col-md-4">
            <img :src="article.image" class="card-img" alt="elephant">
            </div>
            <div class="col-md-8">
            <div class="card-body">
                <h5 class="card-title">{{article.title}}</h5>
                <p class="card-text">{{article.content}}</p>
            </div>
            <div class="col-md">
                <tag v-for="(tag,index) in article.tags" :tag="tag" :key="index"></tag>
  
                <p class="card-text"></p>
                <hr>
            </div>
                        <div class="col-md">

                <p class="card-text"><small class="text-muted">{{article.created_at}}</small></p>
                <hr>
            </div>
            </div>
        </div>
    </div>
</template>

<script>
import tag from '../components/tag'
export default {
    components: {
        tag
    },
    props: ['article'],
    data () {
        return {
            createdDate: '',
            tags: this.article.tags
        }
    },
    methods: {
        createDate () {
            let date = ''
            for (let i = 0; i < 10;i++) {
                date += this.created_at[i]
            }
            return date
        }
    }
}
</script>

<style>

</style>