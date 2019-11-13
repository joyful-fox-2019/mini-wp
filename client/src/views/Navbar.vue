<template>
    <div>
    <nav class="navbar navbar-expand-sm navbar-dark justify-content-between d-flex py-0 pl-0"
            style="background-color: #2C6286;">
        <div class="d-flex justify-content-start">
            <button type="button" class="d-flex align-items-center menuUp">
                <i class="fa fa-wordpress fa-2x ml-3 mr-2" aria-hidden="true" style="color: white;"></i>
                My Sites
            </button>
            <button type="button" class="d-flex align-items-center menuUp">
                <i class="fa fa-newspaper-o fa-2x ml-3 mr-2" aria-hidden="true"
                    style="color: rgb(218, 216, 216);"></i>
                Reader 
            </button>
        </div>
        <login-navbar @isLogin="isLogin" @writeArticle="writeArticle"></login-navbar>
    </nav>
    </div>
</template>

<script>
import loginNavbar from '../components/LoginNavbar'

export default {
    name: "Navbar",
    data() {
        return {
        };
    },
    methods: {
        isLogin(value){
            console.log(value,'dwdadaw');
            
            this.$emit('isLogin',value)
        },
        writeArticle(value){
            console.log('dari navbar');
            this.$emit('writeArticle',value)
        }
    },
    components : {
        'login-navbar' : loginNavbar
    },
    created() {
        // console.log('dari navbar');
    },
};
</script>

<style>
.menuUp{
    color: white;
    background-color: #2C6286;
    border: none;
    outline: none;
    padding: 0.7em 1em;
}

.menuUp:hover{
    background-color: rgba(0, 0, 0, 0.219);
}
.menuUp:focus{
    background-color: rgba(0, 0, 0, 0.527);
    outline: none;
}

.writeButton{
    background-color: white;
    height: -4em;
    border: none;
    outline: none;
    padding: 1em 3em;
    color: #2C6286;
}
.writeButton:hover{
    background-color: rgba(255, 255, 255, 0.76);
}
.writeButton:focus{
    background-color: rgba(255, 255, 255, 0.76);
    outline: none;
}

.article-count{
    background-color: #2C6286;
    height: 1.5em;
    width: 1.5em;
    border-radius: 50%;
    color: white;
}

.searchByName{
    background-color: #FAF8F8;
    border: none;
    outline: none;
    color: #000000;
    padding: 0.7em;
    border-radius: 50%;
}
.searchByName:focus{
    background-color: rgba(0, 0, 0, 0.418);
    outline: none;
    color: white;
}

#buttonEdit{
    padding: 0.2em;
    background-color: #FAF8F8;
    border: none;
    outline: none;
}

#buttonEdit:hover{
    color: green;
    border: none;
    outline: none;
}

#buttonEdit:focus{
    border: none;
    outline: none;
}

#buttonDelete{
    padding: 0.2em;
    background-color: #FAF8F8;
    border: none;
    outline: none;
}

#buttonDelete:hover{
    color: red;
    border: none;
    outline: none;
}

#buttonDelete:focus{
    border: none;
    outline: none;
}
</style>