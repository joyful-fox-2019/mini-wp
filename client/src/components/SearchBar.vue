<template>
  <div id="search-bar-container">
    <div id="search-bar" class="search-bar row">
      <div class="nav-wrapper">
        <form>
          <div class="input-field">
            <input
              v-model="search"
              @input="updateSearch"
              id="search"
              type="search"
              placeholder="Search articles by title.."
              required
            />
            <label class="label-icon" for="search">
              <i class="material-icons">search</i>
            </label>
            <i class="material-icons">close</i>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "search-bar",
  data() {
    return {
      search: ''
    }
  },
  methods: {
    updateSearch() {
      this.$emit('update:search', this.search)
    }
  }
}
</script>

<style>
</style>