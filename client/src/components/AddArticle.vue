<template>
  <div>
     <!-- add new article  -->
                <br>
                 <h1 class="subtitle is-3"><i> Spark a glint of a soul through writing!</i></h1>

                  
                 <input class="input" type="text" placeholder="Your Title over here" v-model="title">

                <br>
                <br>

                <div>
                <wysiwyg v-model="content" />
                </div>


                <br>


                <!-- buefy image upload  -->
                  <b-field class="file">
                    <b-upload v-model="file">
                        <a class="button is-primary">
                            <b-icon icon="upload"></b-icon>
                            <span>Click to upload</span>
                        </a>
                    </b-upload>
                    <span class="file-name" v-if="file">
                        {{ file.name }}
                    </span>
                  </b-field>
                  <!-- end buefy image upload  -->




                <br>

                <!-- button  -->
                <div class="buttons">
                  <button @click="postArticle" class="button is-light">Save Changes</button>
                </div>
                <!-- end button  -->
              


                 <!-- end add new article  -->
  </div>
</template>

<script>
import axios from 'axios'


export default {
  data() {
    return {
        file: null,
        title : '',
        content : ''
    }
  },
  methods : {
    setSection() {
      console.log(`masuk switch main page`);
      this.$emit('setSection', 'article')
    },
    postArticle() {
      let body = new FormData()
      body.append('title', this.title)
      body.append('content', this.content)
      body.append('file', this.file)

      axios({
        method: 'post',
        url: 'http://localhost:3000/articles',
        data : body,
        headers : {
          token : localStorage.getItem('token')
        }
      })
      .then(({data}) => {
        console.log(data, "di component post articleeeeee");

        this.setSection()
      })
      .catch(err => {
        console.log(err.response);
        
      })
    },
    patchArticle() {
      let id = `?????????`
      axios({
        method: 'patch',
        url : `http://localhost:3000/articles/${id}`
      })
      .then(({data}) => {
        console.log(data, "di patch articleee");
        this.switchToMainPage() 
      })
      .catch(err => {
        console.log(err.response);
        
      })
    }
  }
}
</script>

<style>
.file {
  display: flex;
  justify-content: flex-start;
}
</style>