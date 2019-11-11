<template>
  <div>
    <pageCreate v-if="page == 'create'" @changePage="changePage"></pageCreate>
    <pageReader v-if="page == 'reader'"></pageReader>
    <pagePersonal v-if="page == 'personal'" @update="update" @changePage="changePage"></pagePersonal>
    <pageUpdate v-if="page == 'update'" :data="data" @changePage="changePage"></pageUpdate>
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
      data: {}
    }
  },
  props: [
    'page'
  ],
  methods: {
    update(data){
      this.data = data
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