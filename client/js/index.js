function onSignIn(googleUser) {
  event.preventDefault()
  
  var profile = googleUser.getBasicProfile();
  var id_token = googleUser.getAuthResponse().id_token;
  console.log("ID: " + profile.getId()); // Do not send to your backend! Use an ID token instead.
  console.log("Name: " + profile.getName());
  console.log("Image URL: " + profile.getImageUrl());
  console.log("Email: " + profile.getEmail()); // This is null if the 'email' scope is not present.

  var id_token = googleUser.getAuthResponse().id_token;

  axios.post('http://localhost:3000/users/google',{ token : id_token })
    .then( ({ data }) => {
      console.log(data,'dapet apa?');
      localStorage.setItem('token', data.token)
      localStorage.setItem('id', data.id)
      localStorage.setItem('username', data.username)
      localStorage.setItem('image', data.profPic)
      app.successLogin()
     
    })
    .catch((err)=> {
      console.log(err);
    });
}

function signOut() {
  app.logout()
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
      console.log('User signed out.');
  });
}

let app = new Vue({
  el: #app,
  data: {
    isLogin: false,
    page: 'home'
  },
  methods: {
    displayHome() {
      this.page = 'home';
    },
    displayRegister() {
      this.page = 'register';
    },
    logout() {
      
    }
  }
})