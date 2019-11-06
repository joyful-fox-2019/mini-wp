<template>
  <div  class="main-content flex flex-wrap justify-center" style="overflow: auto; height: 90vh;">
    <h1>ini edit article</h1>
    <quill-editor v-model="content" ref="myQuillEditor">
  </quill-editor>
  </div>
</template>

<script>
import quill from 'vue-quill-editor'
export default {
  name: 'EditArticle',
  data() {
    return {
      content: ''  
    }
  },
}
</script>

<style>

</style>