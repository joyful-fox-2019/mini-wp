<template>
  <div>
    <pageCreate v-if="page == 'create'"></pageCreate>
    <pageReader v-if="page == 'reader'"></pageReader>
    <pagePersonal v-if="page == 'personal'"></pagePersonal>
  </div>
</template>

<script>
import pageCreate from './PageCreate'
import pageReader from './PageReader'
import pagePersonal from './PagePersonal'

export default {
  name: 'RightBar',
  data(){
    return {
      
    }
  },
  props: [
    'page'
  ],
  components: {
    pageCreate,
    pageReader,
    pagePersonal
  }
}
</script>

<style>



</style>