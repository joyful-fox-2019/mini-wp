<template>
  <div>
    <div class="card" style="overflow: hidden;">
      <div class="card-content">
        <div class="media">
          <div class="media-content">
            <p class="title is-4" v-html="article.title"></p>
            <!-- <div class="tags is-left" style="margin-top: -8px; margin-bottom: -10px;">
              <span
                v-for="(item, index) in article.tag"
                :key="index"
                class="tag is-rounded"
                v-html="item "
              ></span>
            </div>-->
          </div>
        </div>
        <hr />

        <div>
          <div style="float:left;">
            <figure
              class="image"
              style="max-width:150px; max-height: 200px;float:left;background-color:white; margin-right: 15px; margin-bottom:15px; padding:15px"
            >
              <img v-bind:src="article.url" alt="Placeholder image" style="display: cover" />
            </figure>
          </div>
          <div style="float:none;">
            <!-- <div class="content" v-html="article.content"></div> -->
            <truncate
              clamp="show more..."
              :length="200"
              less="Show Less"
              type="html"
              :text="article.content"
            >
              <a href></a>
            </truncate>
            <p
              class="tag date is-white"
              style="color: darkgrey; margin-left: -7px;"
            >{{ moment(article.createdAt) }}</p>
          </div>
          <p class="owner">
            <strong>(by/{{article.owner.username}})</strong>
          </p>
          <span
            v-for="(item, index) in article.tag"
            :key="index"
            class="tags tag is-rounded"
            v-html="item "
          ></span>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import moment from "moment";
import truncate from "vue-truncate-collapsed";

export default {
  name: "CardArticle",
  props: ["article"],
  components: { truncate },
  methods: {
    moment(date) {
      return moment(date).format("LLL");
    }
  }
};
</script>
<style scoped>
.date {
  margin-top: 10px;
}
.owner {
  font-size: 12px;
  margin: 10px 0;
}
.tags {
  margin: 15px 5px;
}
</style>
