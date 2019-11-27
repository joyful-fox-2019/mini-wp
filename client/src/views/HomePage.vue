<template>
    <b-row>
        <b-col class="no-col">
            <MainSidebar></MainSidebar>
        </b-col>
        <b-col cols="9" class="no-col">
            <Dashboard @update-article="updateArticle"></Dashboard>
        </b-col>
    </b-row>
</template>

<script>
import MainSidebar from '../components/MainSidebar'
import Dashboard from '../components/Dashboard'

export default {
    data() {
        return {};
    },
    components: {
        MainSidebar,
        Dashboard
    },
    methods: {
        updateArticle(value) {
            this.$emit('update-article', value)
        }
    }
}
</script>

<style scoped>
    .no-col {
        padding: 0;
        margin: 0;
    }

    .main-area {
        height: 90vh;
    }
</style>