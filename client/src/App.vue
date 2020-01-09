<template>
  <div>
    <Navbar
      v-if="login"
      @signout="userout"
      :sites="page"
      @mypage="mysite"
      @readersite="gotoreader"
      @gotocreate="showcreate"
      @searcharticle="searchfile"
    ></Navbar>
    <Reader v-if="page === 'reader' && login" :keywordfile="keyword"></Reader>
    <Mysite v-if="page === 'mysite' && login" @editfile="editcontent"></Mysite>
    <Login
      v-if="!login && page === 'login'"
      @onlogin="loggedin"
      @registerform="showregis"
      @glogin="loggedin"
    ></Login>
    <Register
      v-if="!login && page === 'register'"
      @successregis="afterregis"
      @showlogin="backtologin"
    ></Register>
    <FormArt v-if="page === 'create' && login" @aftercreateart="backtomysite"></FormArt>
    <EditArt v-if="page === 'edit' && login" :datafound="singleData" @backmysite="afteredit"></EditArt>
  </div>
</template>

<script>
import Navbar from "./components/navbar";
import Reader from "./views/Reader";
import Mysite from "./views/Mysite";
import Login from "./views/Login";
import Register from "./views/Register";
import FormArt from "./views/Create";
import EditArt from "./views/Edit";

export default {
  data() {
    return {
      login: false,
      page: "login",
      singleData: [],
      keyword: ""
    };
  },
  components: {
    Navbar,
    Reader,
    Mysite,
    Login,
    Register,
    FormArt,
    EditArt
  },
  methods: {
    loggedin(arg) {
      this.$dlg.toast("Welcome back!", {
        messageType: "success",
        closeTime: 2 // auto close dialog time(second)
      });
      localStorage.setItem("token", arg);
      this.page = "reader";
      this.login = true;
    },
    afteredit(arg) {
      this.$dlg.toast("Success editing data...", {
        messageType: "success",
        closeTime: 2 // auto close dialog time(second)
      });
      this.page = arg;
    },
    backtomysite(arg) {
      this.page = arg;
    },
    showregis(arg) {
      this.page = arg;
    },
    afterregis(arg) {
      this.$dlg.toast("Successfull registration!", {
        messageType: "success",
        closeTime: 2 // auto close dialog time(second)
      });
      this.page = arg;
    },
    backtologin(arg) {
      this.page = arg;
    },
    userout(arg) {
      this.$dlg.toast("Thanks for coming!", {
        messageType: "success",
        closeTime: 2 // auto close dialog time(second)
      });
      localStorage.clear();
      this.login = false;
      this.page = arg;
    },
    mysite(arg) {
      this.page = arg;
    },
    gotoreader(arg) {
      this.page = arg;
    },
    showcreate(arg) {
      this.page = arg;
    },
    editcontent(arg, data) {
      this.page = arg;
      this.singleData = data;
    },
    searchfile(arg) {
      this.keyword = arg;
    }
  },
  created() {
    if (localStorage.getItem("token")) {
      this.login = true;
      this.page = "reader";
    } else {
      this.login = false;
    }
  }
};
</script>

<style>
</style>