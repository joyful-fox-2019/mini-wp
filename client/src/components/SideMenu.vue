<template>
  <div class="custom">
        <div class="sidemenu">
            <div class="menu-logo"><i class="fas fa-columns"></i></div>
            <div class="sidemenu-content">
                <div>
                    <p>{{user.name}}</p>
                </div>
                <div>
                    <p>{{user.email}}</p>
                </div>
            </div>
        </div>
        <aside class="menu" style="padding: 20px;">
            <p class="menu-label">
                Configuration
            </p>
            <ul class="menu-list">
                <li><a>Dashboard</a></li>
                <li><a>Profile</a></li>
                <b-dropdown aria-role="list">
                    <button class="button is-black" type="button" slot="trigger">
                        <template>
                            <b-icon icon="account-multiple"></b-icon>
                            <span>Theme</span>
                        </template>
                        <b-icon icon="menu-down"></b-icon>
                    </button>

                    <b-dropdown-item :value="true" aria-role="listitem">
                        <div class="media">
                            <b-icon class="media-left" icon="earth"></b-icon>
                            <div @click="toDark()" class="media-content">
                                <h3>Dark Theme</h3>
                            </div>
                        </div>
                    </b-dropdown-item>
                    
                    <b-dropdown-item :value="true" aria-role="listitem">
                        <div class="media">
                            <b-icon class="media-left" icon="earth"></b-icon>
                            <div @click="toLight()" class="media-content">
                                <h3>Light Theme</h3>
                            </div>
                        </div>
                    </b-dropdown-item>
                </b-dropdown>
            </ul>
            <p class="menu-label">
                General
            </p>
            <ul class="menu-list">
                <li @click="myArticle()"><a>My Post</a></li>
            </ul>
                <p class="menu-label">
                    Actions
                </p>
                <ul class="menu-list">
                    <li @click="logout()"><a>Logout</a></li>
                </ul>
        </aside> 
  </div>
</template>

<script>
import Swal from 'sweetalert2'
// import adminButton from './adminButton'

export default {
    name : 'SideMenu',
    data() {
        return {
            isActive: true,
            user : {
                email : localStorage.getItem('email'),
                name : localStorage.getItem('name')
            }
        }
    },
    methods : {
        toDark() {
            this.$emit('changeTheme',true,false)
        },
        toLight() {
            this.$emit('changeTheme',false,true)
        },
        logout() {
            // console.log(gapi.auth2)
            var auth2 = gapi.auth2.getAuthInstance();
            auth2.signOut().then(() => {
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000
                })
                this.$emit('changeLogin',false)
                this.$emit('changePage',true,false)
                localStorage.clear()
                Toast.fire({
                    icon: 'success',
                    title: 'See you again'
                })
            }); 
        }
        ,
        myArticle() {            
            this.$emit('changePage',false,false,false,false,true,false,false)
        }
    }
}
</script>

<style scoped>
/* .custom {
    background-color: #fff !important;
} */
</style>