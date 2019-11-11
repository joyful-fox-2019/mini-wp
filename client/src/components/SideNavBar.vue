<template>
    <div class="col-3 ml-3 d-none d-md-block" id="sideNavBar">
        <div class="card p-2">
            <h2 class="text-sideNavBar border-bottom" @click="showArticleForm()">
            <svg width="30" height="30" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <image xlink:href='https://www.flaticon.com/premium-icon/icons/svg/46/46395.svg' alt="symbol" height="30" width="30">
            </svg>
            <span>Create Article</span>
            </h2>
            <h2 class="text-sideNavBar border-bottom" @click='showPublicArticles()'>
                <svg width="30" height="30" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                    <image xlink:href='https://image.flaticon.com/icons/svg/44/44386.svg' alt="symbol" height="30" width="30">
                </svg>
                <span>Public</span>
            </h2>
            <h2 class="text-sideNavBar border-bottom" @click="showUserArticles()">
                <svg width="30" height="30" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                    <image xlink:href='https://image.flaticon.com/icons/svg/61/61685.svg' alt="symbol" height="30" width="30">
                </svg>
                <span>Your Feed</span>
            </h2>
            <h2 class="text-sideNavBar border-bottom" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <svg width="30" height="30" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                    <image xlink:href='https://cdn0.iconfinder.com/data/icons/heroicons-ui/24/icon-tag-512.png' alt="symbol" height="30" width="30">
                </svg>
                <span>Tags</span>
            </h2>
            <div class="dropdown-menu text-sideNavBar" aria-labelledby="dropdownMenuButton">
                <a class="dropdown-item clickable" href="#" @click="searchTagArticle('World')">World</a>
                <a class="dropdown-item clickable" href="#" @click="searchTagArticle('Regional')">Regional</a>
                <a class="dropdown-item clickable" href="#" @click="searchTagArticle('Megapolitan')">Megapolitan</a>
                <a class="dropdown-item clickable" href="#" @click="searchTagArticle('Science')">Science</a>
                <a class="dropdown-item clickable" href="#" @click="searchTagArticle('Technology')">Technology</a>
                <a class="dropdown-item clickable" href="#" @click="searchTagArticle('Health')">Health</a>
                <a class="dropdown-item clickable" href="#" @click="searchTagArticle('Lifestyle')">Lifestyle</a>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SideNavBar',
    data () {
        return {
            dariTest: {
            },
            dariUser: {
            },
            dariTag: {
            }
        }
    },
    methods: {
        searchTagArticle (tag) {
            axios({
                url: `http://hackpress-server.panji-h8.online/article/tags/${tag}`,
                method: 'get',
                headers: {
                    token: localStorage.getItem('token')
                }
            })
            .then (({data}) => {
                this.dariTag.mainContent = true
                this.dariTag.result = data
                this.$emit('showTag', true)
                this.$emit('articleForm', false)
                this.$emit('UserArticle', false)
                this.$emit('detailsPage', false)
                this.$emit('showPublic', false)
                this.$emit('dariTag', this.dariTag)
                this.$emit('showUpdate', false)
            })
        },
        showArticleForm () {
            this.dariTest.mainContent = false
            this.dariTest.data = []
            this.$emit('articleForm', true)
            this.$emit('UserArticle', false)
            this.$emit('detailsPage', false)
            this.$emit('showPublic', false)
            this.$emit('dariTest', this.dariTest)
            this.$emit('showTag', false)
            this.$emit('showUpdate', false)
        },
        showUserArticles () {
            axios({
                url: 'http://hackpress-server.panji-h8.online/article',
                method: 'get',
                headers: {
                    token: localStorage.getItem('token')
                }
            })
            .then (({ data }) => {
                data = data.reverse()
                this.dariUser.mainContent = false
                this.dariUser.result = data
                this.$emit('showPublic', false)
                this.$emit('articleForm', false)
                this.$emit('UserArticle', true)
                this.$emit('detailsPage', false)
                this.$emit('dariUser', this.dariUser)
                this.$emit('showTag', false)
                this.$emit('showUpdate', false)
            })
        },
        showPublicArticles () {
            axios({
                url: 'http://hackpress-server.panji-h8.online/article/news',
                method: 'get',
                headers: {
                    token: localStorage.getItem('token')
                }
            })
            .then (({ data }) => {
                this.dariTest.mainContent = true
                this.dariTest.result = data
                this.$emit('articleForm', false)
                this.$emit('UserArticle', false)
                this.$emit('showPublic', true)
                this.$emit('detailsPage', false)
                this.$emit('showTag', false)
                this.$emit('dariTest', this.dariTest)
                this.$emit('showUpdate', false)
            })
        },
    }
}
</script>

<style>
.text-sideNavBar{
  font-family: "proximanova";
  color: rgb(128, 112, 112);
  font-weight: 300px;
  margin: 13px;
  font-size: 12pt;
  padding: 5px 0px;
}
.text-sideNavBar:hover {
  cursor: pointer;
  color: rgb(250, 219, 81);
}
#sideNavBar {
    position: fixed;
}
</style>