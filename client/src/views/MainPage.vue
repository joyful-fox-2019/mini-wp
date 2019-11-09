<template>
    <div class="container-fluid d-flex">
        <div class="side-bar d-flex flex-column">
            <sidebar></sidebar>
        </div>
        <div class="content-page">
            <contentpage></contentpage>
        </div>
    </div>
</template>
<script>

import sidebar from '../components/SideBar'
import contentpage from '../components/Content'

export default {
    components:{
        sidebar,
        contentpage
    },
    data(){
        return {}
    }
}
</script>
<style scope>
.side-bar{
    height: calc(100vh - 56px);
    width: 20%;
}

.content-page{
    height: calc(100vh - 56px);
    width: 80%;
    background-color: whitesmoke;
}
</style>