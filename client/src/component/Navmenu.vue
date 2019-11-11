<template>
  <!-- end body left col 2-->
  <!-- <aside class="menu">
    <ul>
      <li class="menu" style="font-size: 11px">
        <i class="material-icons">desktop_windows</i>
        View
      </li>
      <li class="menu" style="font-size: 11px">
        <i class="material-icons">bar_chart</i>
        Stats
      </li>
      <li class="menu" style="font-size: 11px">
        <i class="material-icons">restore</i>
        Activity
      </li>
      <li class="menu" style="font-size: 11px">
        <i class="material-icons">data_usage</i>
        Plan
      </li>
    </ul>
    <p class="menu-label">
      <strong>Manage</strong>
    </p
      <li class="menu" style="font-size: 11px">
        <i class="far fa-file-alt"></i>
        Site Pages
      </li>
      <li class="menu" style="font-size: 11px">
        <i class="fas fa-image"></i>
        Media
      </li>
      <li class="menu" style="font-size: 11px">
        <i class="far fa-comments"></i>
        Comments
      </li>
      <li class="menu" style="font-size: 11px">
        <i class="fas fa-plug"></i>
        Plugins
      </li>
      <li class="menu" style="font-size: 11px">
        <i class="fas fa-cloud-upload-alt"></i>
        Import
      </li>
    </ul>
    <p class="menu-label">
      <strong>personalize</strong>
    </p>
    <ul>
      <li class="menu" style="font-size: 11px">
        <i class="fas fa-cogs"></i>
        Customize
      </li>
      <li class="menu" style="font-size: 11px">
        <i class="fab fa-wordpress-simple"></i>
        WordPress
      </li>
    </ul>
  </aside>-->
</template>

<script>
export default {
  name: "navmenu",
  data() {
    return {
      isActive: true
    };
  }
};
</script>

<template>
  <b-menu style="padding: 10px;">
    <article class="media" style="margin-bottom: 20px;">
      <figure class="media-left">
        <p style="font-size: 24px;">
          <i class="far fa-window-maximize"></i>
        </p>
      </figure>
      <div class="media-content" style="width: 70%;">
        <div class="content">
          <p style="width: 100%; margin: 0; font-size: 20px;" class="title">
            <strong>Afifah Rahma K</strong>
          </p>
          <p id="desc">
            <small>afifahrk.onetake.com</small>
          </p>
        </div>
      </div>
    </article>
    <b-menu-list>
      <b-menu-item icon="chart-bar" label="Stats"></b-menu-item>
      <b-menu-item icon="desktop_windows" label="View"></b-menu-item>
      <b-menu-item icon="bar_chart" label="Stats"></b-menu-item>
      <b-menu-item icon="restore" label="Activity"></b-menu-item>
      <b-menu-item icon="data_usage" label="Plan"></b-menu-item>
    </b-menu-list>
    <b-menu-list>
      <b-menu-item icon="pencil" :expanded="isActive" @click="isActive = !isActive">
        <template slot="label" slot-scope="props">
          Site
          <b-icon class="is-pulled-right" :icon="props.expanded ? 'menu-down' : 'menu-up'"></b-icon>
        </template>
        <b-menu-item label="Pages"></b-menu-item>
        <b-menu-item label="Posts"></b-menu-item>
        <b-menu-item label="Media"></b-menu-item>
      </b-menu-item>
    </b-menu-list>
    <b-menu-list>
      <p class="menu-label">
        <strong>Manage</strong>
      </p>
      <b-menu-item icon="file-alt">Site Pages</b-menu-item>
      <b-menu-item icon="image">Media</b-menu-item>
      <b-menu-item icon="comments">Comments</b-menu-item>
      <b-menu-item icon="plug">Plugins</b-menu-item>
      <b-menu-item icon="cloud-upload-alt">Import</b-menu-item>
      <p class="menu-label">
        <strong>personalize</strong>
      </p>
      <b-menu-item icon="cogs">Customize</b-menu-item>
      <b-menu-item icon="wordpress-simple">WordPress</b-menu-item>
    </b-menu-list>
  </b-menu>
</template>

<script>
export default {
  data() {
    return {
      isActive: true
    };
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=DM+Serif+Display|Roboto&display=swap");

.title {
  font-size: 30px;
  font-weight: bolder;
  font-family: "DM Serif Display", serif;
}
.content {
  font-size: 12px;
  font-family: "Roboto", sans-serif;
}
#profile {
  width: 100%;
  height: 10%;
  font-size: 12px;
}

#desc {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>