<template>
    <div id="searchArticle">
        <form v-on:submit.prevent="searchArticleByTitle"> <!-- v-on buat trigger method searchArticleByTitle -->
            <div class="form-inline">
                <input type="text" v-model="searchKeyword" class="form-control" placeholder="Search your article here" style="width: 750px;"><button type="submit" class="btn btn-primary"><i class="fas fa-search"></i></button>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    name: "SearchBar",
    data() {
        return {
            searchKeyword: ''
        }
    },
    methods: {
        searchArticleByTitle() {
            console.log(this.searchKeyword);
            axios({
                method: "GET",
                url: `http://miniwpserver.hoandreasm.xyz/articles/?title=${this.searchKeyword}`,
                headers: {
                    token: localStorage.getItem('token')
                }
            })
                .then(({ data }) => {
                    console.log(data);
                    this.$emit("is-found-is-true", data)
                    // this.articles = data;
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }

}
</script>

<style>

</style>