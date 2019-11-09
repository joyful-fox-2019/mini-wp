<template>
  <div>
       <!-- tabs section  -->
                <section>
                  <div class="tabs">
                    <ul>
                      <li class="is-active"><a>Published</a></li>
                      <li><a>Draft</a></li>
                    </ul>
                    <div class="tabs-end">
                        <div class="panel-block">
                            <p class="control has-icons-right">
                              <input v-on:keyup.enter="selectedArticle" v-model="searchTitle" class="input" type="text" placeholder="Search"  >
                              <span class="icon is-right">
                                <i class="fas fa-search" aria-hidden="true" ></i>
                              </span>
                            </p>
                          </div>
                    </div>
                  </div>
                </section>
                <!-- end tabs section  -->    
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>