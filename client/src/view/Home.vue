<template>
  <div class="main">
    <b-navbar class="post">
      <template slot="start">
        <p class="subtitle is-6">Public Post</p>
      </template>
    </b-navbar>
    <NotFound v-if="!articles.length"></NotFound>
    <div class="column" v-for="article in articles" :key="article._id">
      <CardArticle :key="article._id" :article="article"></CardArticle>
    </div>
  </div>
</template>


<script>
import CardArticle from "../components/CardArticle";
import NotFound from "../components/NotFound";


export default {
  name: "App",
  props: ["articles"],
  components: {
    CardArticle,
    NotFound
  }
};
</script>
<style scoped>
::-webkit-scrollbar {
  width: 5px;
}

/* Track */
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px grey;
  border-radius: 2px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #006088;
  border-radius: 10px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #006088;
}
.main {
  height: 84vh;
  overflow: scroll;
  overflow-x: hidden;
}
.post {
  height: 25px;
  border: 2px solid #e9ebec !important;
  margin: 20px 20px 0 20px;
}
.subtitle {
  margin: auto 15px;
  padding: 0 10px;
}
.btn {
  background-color: rgb(218, 42, 112);
  height: 30px;
  margin: auto 20px;
  color: white;
  border: 1px solid rgb(92, 92, 92);
  padding: 0 15px;
  border-radius: 3px;
}
.btn:hover {
  background-color: rgb(163, 32, 84);
}
.column {
  margin: 20px 12px 0 12px;
}
</style>