<template>
  <div>
    <b-navbar toggleable="lg">
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
            <b-nav-item href="#" @click="changePage('home')">Close</b-nav-item>
            <b-nav-item href="#" disabled>Saved</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">     
            <b-button size="sm" class="my-2 my-sm-0" type="submit">Preview</b-button>
            <b-button size="sm" class="my-2 my-sm-0" type="submit">Publish</b-button>
        </b-navbar-nav>
        </b-collapse>
    </b-navbar>
    </div>
</template>

<script>
export default {
    data() {
        return {};
    },
    methods: {
        changePage: function(value){
            this.$emit('change-page', value);
        }
    }
}
</script>

<style scoped>
    .navbar {
        border-bottom: 1px solid #dee2e6;
    }
</style>