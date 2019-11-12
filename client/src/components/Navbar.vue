<template>
  <div>

<!-- navbar section -->
      <section class="navbar-section">
      <nav class="navbar" role="navigation" aria-label="main navigation">
          <div class="navbar-brand">
            <a class="navbar-item" href="">
                <span class="panel-icon">
                    <i class="fab fa-wordpress-simple"></i>
                </span>
               <p style="font-size: 20px;">Fémme</p>
            </a>
        
            <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>
          </div>
        
          <div id="navbarBasicExample" class="navbar-menu">
            <div class="navbar-start">
        
              
              <a class="navbar-item">
                  <span class="panel-icon">
                      <i class="fab fa-readme"></i>
                  </span>
                  <p style="font-size: 20px;">Reader</p>
                </a>
        
              <div class="navbar-item has-dropdown is-hoverable">
                <a class="navbar-link">
                  More
                </a>
        
                <div class="navbar-dropdown">
                  <a class="navbar-item">
                    About
                  </a>
                  <a class="navbar-item">
                    Jobs
                  </a>
                  <a class="navbar-item">
                    Contact
                  </a>
                  <hr class="navbar-divider">
                  <a class="navbar-item">
                    Report an issue
                  </a>
                </div>
              </div>
            </div>

            <div class="navbar-end">
              <div class="navbar-item">
                  <a class="navbar-item">
                      <span class="panel-icon">
                          <i class="fas fa-edit"></i>
                      </span>
                      <p @click="addArticle" style="font-size: 18px;">Write</p>
                    </a>
                  <a class="navbar-item">
                      <span class="panel-icon">
                          <i class="fas fa-user-circle"></i>
                      </span>
                      <p style="font-size: 18px;">Account</p>
                    </a>
                  <a class="navbar-item">
                      <span class="panel-icon">
                          <i class="fas fa-bell"></i>
                      </span>
                      <p style="font-size: 18px;">Notification</p>
                    </a>
                  <a class="navbar-item">
                      <span class="panel-icon">
                          <i class="fas fa-sign-out-alt"></i>
                      </span>
                      <p @click="signOut" style="font-size: 18px;">Sign Out</p>
                    </a>
              </div>
            </div>
          </div>
        </nav>
      </section>
    <!-- end navbar section  -->
    

  </div>
</template>

<script>

export default {
  
  methods : {
    switchToAuthPage() {
      console.log(`masuk switch auth page`);
      this.$emit('setPage', 'auth')
      
    },
     switchToMainPage() {
      console.log(`masuk switch main page`);
      this.$emit('setPage', 'main')
    },
    addArticle() {
      console.log(`add article iniiiiiiiiiiiiiiiiiii`);
      
      this.$emit('setSection', 'addArticle')
    },
    onSignIn(googleUser) {
    let id_token = googleUser.getAuthResponse().id_token

    axios({
      method : 'post',
      url : 'http://localhost:3000/users/google-signin',
      data : {
        idToken : id_token
      }
    })
    .then(({data}) => {
      localStorage.setItem('token', data.token)
    })
    .catch(err => {
      console.log(err.response);
    }) 

    },
    signOut() {
        
        localStorage.removeItem('token')
            this.switchToAuthPage()

      }

  }
}
</script>

<style>

</style>