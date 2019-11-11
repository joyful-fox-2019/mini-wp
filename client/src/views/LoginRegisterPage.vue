<template>
  <div class="wrapper">
    <LoginRegisterForm @set-login="setLogin"></LoginRegisterForm>
    <div class="googleButton">
      <GoogleSignInButton @set-login="setLogin"></GoogleSignInButton>
    </div>
  </div>
</template>

<script>
import LoginRegisterForm from "../components/LoginRegisterForm"
import GoogleSignInButton from "../components/GoogleSignIn";

export default {
    name: "LoginRegisterPage",
    components: {
        LoginRegisterForm,
        GoogleSignInButton
    },
    methods: {
        setLogin() {
          this.$emit('set-login')
        }
    }
}
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Montserrat:400,400i,700");
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
.googleButton {
  position: absolute;
  top: 615px;
  left: 600px;
}
.wrapper {
  height: 100vh;
  text-align: center;
  width: 100vw;
}
.overlay {
  background-color: #FFF;
  border: 3px solid #EEE;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.25);
  height: 280px;
  left: 15px;
  position: absolute;
  top: -15px;
  transition: all 0.3s linear;
  width: 300px;
  z-index: 99;
}
.overlay .form {
  align-items: center;
  display: flex;
  justify-content: center;
  padding-top: 50px;
}
.overlay .form label {
  color: #AAA;
  display: block;
  font-size: 14px;
  margin-bottom: 10px;
  text-align: left;
}
.overlay .form input {
  border: none;
  border-bottom: 1px solid #394a6d;
  outline: none;
  margin-bottom: 30px;
}
.overlay input[type="submit"] {
  background-image: linear-gradient(to bottom, #93b5b3, #c0ffb3);
  border: none;
  border-radius: 10px;
  color: #FFF;
  cursor: pointer;
  padding: 10px 15px;
}
.overlay .form__signup {
  display: none;
}
.containerLogin {
  background-color: #394a6d;
  border-radius: 10px;
  box-shadow: 0 1px 1px rgba(255, 255, 255, 0.6);
  color: #FFF;
  display: flex;
  height: 250px;
  left: 50%;
  position: relative;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 650px;
}
.box {
  align-items: center;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  position: relative;
}
.box h4 {
  color: #999;
  font-weight: normal;
  margin-bottom: 15px;
}
.box .btn {
  background-color: transparent;
  border: none;
  color: #FFF;
  cursor: pointer;
  font-size: 24px;
  outline: none;
}
</style>