<template>
    <b-menu>
        <b-menu-list label="Menu">
            <b-menu-item
                :expanded="isActiveNews"
                @click="isActiveNews = !isActiveNews">
                <template slot="label" slot-scope="props">
                    <i class="far fa-newspaper" style="margin-right:2px"></i>
                    News Feed
                    <b-icon
                        class="is-pulled-right"
                        :icon="props.expanded ? 'menu-down' : 'menu-up'">
                    </b-icon>
                </template>
                <b-menu-item @click="changeMainPage('home')" icon="baseball" label="News Feed"></b-menu-item>
                <b-menu-item @click="changeMainPage('user')" icon="account" label="User Feed"></b-menu-item>
            </b-menu-item>
            <b-menu-item
                :expanded="isActiveArticles"
                @click="isActiveArticles = !isActiveArticles">
                <template slot="label" slot-scope="props">
                    <i class="far fa-file-alt" style="margin-right:10px"></i>
                    Articles
                    <b-icon
                        class="is-pulled-right"
                        :icon="props.expanded ? 'menu-down' : 'menu-up'">
                    </b-icon>
                </template>
                <b-menu-item @click="changeMainPage('add')" icon="pencil" label="Write Article"></b-menu-item>
            </b-menu-item>
        </b-menu-list>
        <b-menu-list label="Search">
            <b-menu-item label="Tags"></b-menu-item>
        </b-menu-list>
    </b-menu>
</template>

<script>
    export default {
        data: function() {
            return {
                isActiveNews: true,
                isActiveArticles: true
            };
        },
        props: {
            mainpage: String
        },
        methods: {
            changeMainPage(mainpage) {
                this.$emit("change-main-page", mainpage);
            }
        }
    }
</script>

<style>

</style>