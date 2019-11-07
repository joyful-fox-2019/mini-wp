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
            </ul>
            <p class="menu-label">
                General
            </p>
            <ul class="menu-list">
                <li><a>Posting</a></li>
                <!-- <li> -->
                <!-- <a class="is-active">Manage Your Team</a>
                <ul>
                    <li><a>Members</a></li>
                    <li><a>Plugins</a></li>
                    <li><a>Add a member</a></li>
                </ul>
                </li>
                <li><a>Invitations</a></li>
                <li><a>Cloud Storage Environment Settings</a></li>
                <li><a>Authentication</a></li> -->
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

export default {
    name : 'SideMenu'
    ,data() {
        return {
            isActive: true,
            user : {
                email : localStorage.getItem('email'),
                name : localStorage.getItem('name')
            }
        }
    },
    methods : {
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
    }
}
</script>

<style scoped>
.custom {
    background-color: #fff !important;
}
</style>