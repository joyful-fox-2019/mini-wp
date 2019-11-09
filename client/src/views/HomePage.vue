<template>
    <b-row>
        <b-col>
            <MainSidebar></MainSidebar>
        </b-col>
        <b-col cols="9">
            <Dashboard></Dashboard>
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
    }
}
</script>

<style>

</style>