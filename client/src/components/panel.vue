<template>
  <div class="main-panel">
    <article class="panel is-primary">
  <p class="panel-tabs">
    <a class="is-active">All</a>
    <!-- <a>Public</a>
    <a>Private</a>
    <a>Sources</a>
    <a>Forks</a> -->
  </p>
  <div class="panel-block">
    <p class="control has-icons-left">
      <input class="input is-primary" type="text" placeholder="Search">
      <span class="icon is-left">
        <i class="fas fa-search" aria-hidden="true"></i>
      </span>
    </p>
  </div>
  <a class="panel-block" @click.prevent="$emit('exit')">
    <span class="panel-icon">
      <i class="fas fa-book" aria-hidden="true"></i>
    </span>
    Publish Articles
  </a>
  <a class="panel-block" @click.prevent="$emit('myCollections')">
    <span class="panel-icon">
      <i class="fas fa-book" aria-hidden="true"></i>
    </span>
    MyArticles
  </a>
  <a class="panel-block" @click.prevent="$emit('showPanel')">
    <span class="panel-icon">
      <i class="fas fa-book" aria-hidden="true"></i>
    </span>
    Add Article +
  </a>

</article>
  </div>
</template>

<script>
export default {
  props: ['showPanel', 'exit','myCollections']
}
</script>

<style>
  .main-panel {
    margin: auto;
  }
</style>