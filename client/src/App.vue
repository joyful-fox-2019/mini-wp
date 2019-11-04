<template>
    <div>
        <Navbar></Navbar>
        <div>
            <div class="columns is-gapless">
                <div class="column is-one-fifth left-menu">
                    <SideMenu><SideMenu/>
                </div>
                <div class="column right-menu">
                    <div class="container">
                        <!-- <div class="posting-content">
                            kotak buat konten
                        </div> -->
                        <ProjectContent></ProjectContent>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Navbar from './components/Navbar'
import SideMenu from './components/SideMenu'
import ProjectContent from './components/ProjectContent'

export default {
    name: 'App',
    components : {
        Navbar,SideMenu,ProjectContent
    }
}
</script>

<style>

</style>