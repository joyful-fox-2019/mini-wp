<template>
  <div>
    <pageCreate v-if="page == 'create'"></pageCreate>
    <pageReader v-if="page == 'reader'"></pageReader>
    <pagePersonal v-if="page == 'personal'" @updateId="updateId" @changePage="changePage"></pagePersonal>
    <pageUpdate v-show="page == 'update'" :ids="id"></pageUpdate>
  </div>
</template>

<script>
import pageCreate from './PageCreate'
import pageReader from './PageReader'
import pagePersonal from './PagePersonal'
import pageUpdate from './PageUpdate'
 
export default {
  name: 'RightBar',
  data(){
    return {
      id: '' 
    }
  },
  props: [
    'page'
  ],
  methods: {
    updateId(id){
      this.id = id
    },
    changePage(page){
      this.$emit('changePage', page)
    }
  },
  components: {
    pageCreate,
    pageReader,
    pagePersonal,
    pageUpdate
  }
}
</script>

<style>



</style>