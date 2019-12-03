<template>
  <div>
    <p class="is-6 title">Search Tag</p>
    <b-field position="is-centered">
      <b-input placeholder="Search Tag" type="search" icon="magnify">
      </b-input>
      <p class="control">
          <button class="button is-info">Search</button>
      </p>
    </b-field>

    <b-field grouped group-multiline>
      <div class="control">
        <b-taglist attached>
          <b-tag type="is-dark">npm</b-tag>
        </b-taglist>
      </div>

      <div class="control">
        <b-taglist attached>
          <b-tag type="is-dark">downloads</b-tag>
          <b-tag type="is-success">15k</b-tag>
        </b-taglist>
      </div>

      <div class="control">
        <b-taglist attached>
          <b-tag type="is-dark">chat</b-tag>
          <b-tag type="is-primary">on</b-tag>
        </b-taglist>
      </div>

      <div class="control">
        <b-taglist attached>
          <b-tag type="is-dark">chat</b-tag>
          <b-tag type="is-primary">on</b-tag>
        </b-taglist>
      </div>
    </b-field>


  </div>
</template>

<script>
export default {
  name:'Rightmenu'
}
</script>

<style scoped>
  
</style>