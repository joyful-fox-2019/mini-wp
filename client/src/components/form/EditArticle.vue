<template>
    <section style="margin-top: 10px;">
        <h3 class="title">Edit Your Article</h3>
        <form enctype="multipart/form-data">
            <b-field label="Title">
                <b-input  v-model="title"></b-input>
            </b-field>

            <b-field label="Tag"
                type="is-info"
                message="use comma if there are more than one tags">
                <b-input v-model="tag"></b-input>
            </b-field>

            <b-field label="Article content">
                <wysiwyg  style="min-height: 180px;" v-model="content"/>
            </b-field>

            <div class="buttons">
                <span @click.prevent="updateArticle(article._id)" class="button is-info">Update</span>
                <span @click.prevent="cancelUpdate" class="button is-danger is-outlined">Cancel</span>
            </div>
        </form>
    </section>
</template>

<script>
import "vue-wysiwyg/dist/vueWysiwyg.css";
import axios from 'axios'


export default {
    name: 'EditArticle',
    props: ["article"],
    data() {
        return {
            title: this.article.title,
            content: this.article.content,
            tag: this.article.tag.join(' '),
            isFullPage: true
        }
    },
    methods: {
        updateArticle(id){
            axios({
                method: 'patch',
                url: `const host = 'https://mini-wp-aws.sigitariprasetyo.xyz'/article/${id}/update`,
                // url: `http://localhost:3000/article/${id}/update`,
                data: {
                    title: this.title,
                    tag: this.tag,
                    content: this.content
                },
                headers: {
                        token: localStorage.getItem('token')
                }
            })
                .then(()=> {
                    const loadingComponent = this.$buefy.loading.open({
                        container: this.isFullPage ? null : this.$refs.element.$el
                    })
                    setTimeout(() => loadingComponent.close(), 1 * 2000)
                    setTimeout(() => this.$buefy.toast.open({
                        message: 'Update Article Success..',
                        type: 'is-success'
                    }), 2000)
                    setTimeout(() => this.$emit('afterUpdate', false), 1 * 1900)
                })
                .catch(err => {
                    const loadingComponent = this.$buefy.loading.open({
                        container: this.isFullPage ? null : this.$refs.element.$el
                    })
                    setTimeout(() => loadingComponent.close(), 1 * 2000)
                    this.$buefy.toast.open({
                        message: 'Sorry your request is not complete..',
                        type: 'is-danger'
                    })
                })
        },
        cancelUpdate(){
            this.$emit('cancelEdit', false)
        }
    }
}
</script>
