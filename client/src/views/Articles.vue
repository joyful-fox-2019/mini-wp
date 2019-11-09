<template>
  <div class="container">
    <div class="tile is-ancestor">
      <div class="tile is-4 is-vertical is-parent">
        <div class="tile is-child">
          <p class="title t-standard">One</p>
          <div class="t-lighten">
            <small><i>LIFESTYLE</i></small>
          </div>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare magna eros, eu pellentesque tortor vestibulum ut. Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis.</p>
          <figure class="image is-3by1 has-margin-t">
            <img src="https://bulma.io/images/placeholders/128x128.png">
          </figure>
          <div class="row t-lighten">
            <small>
              Nov, 4 - Satyo Wicaksana
            </small>
          </div>
        </div>
        <div class="tile is-child">
          <p class="title t-standard">Two</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare magna eros, eu pellentesque tortor vestibulum ut. Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis.</p>
          <figure class="image is-3by1 has-margin-t">
            <img src="https://bulma.io/images/placeholders/128x128.png">
          </figure>
          <div class="row t-lighten">
            <small>
              Nov, 4 - Satyo Wicaksana
            </small>
          </div>
        </div>
      </div>
      <div class="tile is-parent">
        <div class="tile is-child">
          <figure class="image is-3by1 has-margin-b">
            <img src="https://bulma.io/images/placeholders/128x128.png">
          </figure>
          <p class="title t-standard">Three</p>
          <div class="t-lighten">
            <small><i>LIFESTYLE</i></small>
          </div>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam semper diam at erat pulvinar, at pulvinar felis blandit. Vestibulum volutpat tellus diam, consequat gravida libero rhoncus ut. Morbi maximus, leo sit amet vehicula eleifend, nunc dui porta orci, quis semper odio felis ut quam.</p>
          <p>Suspendisse varius ligula in molestie lacinia. Maecenas varius eget ligula a sagittis. Pellentesque interdum, nisl nec interdum maximus, augue diam porttitor lorem, et sollicitudin felis neque sit amet erat. Maecenas imperdiet felis nisi, fringilla luctus felis hendrerit sit amet. Aenean vitae gravida diam, finibus dignissim turpis. Sed eget varius ligula, at volutpat tortor.</p>
          <p>Integer sollicitudin, tortor a mattis commodo, velit urna rhoncus erat, vitae congue lectus dolor consequat libero. Donec leo ligula, maximus et pellentesque sed, gravida a metus. Cras ullamcorper a nunc ac porta. Aliquam ut aliquet lacus, quis faucibus libero. Quisque non semper leo.</p>
          <div class="row t-lighten">
            <small>
              Nov, 4
            </small>
          </div>
          <div class="row">
            <small>
              Satyo Wicaksana
            </small>
          </div>
        </div>
      </div>
    </div>
    <div class="columns is-multiline">
      <div class="column is-four-fifths">
        <div class="rows">
          <div class="row t-lighten">
            <small><i>LIFESTYLE</i></small>
          </div>
          <div class="row">
            <strong class="title t-standard">The Lifespan of a Lie</strong>
          </div>
          <div class="row t-lighten">
            <small>
              The most famous psychology study of all time was a sham.
            </small>
          </div>
          <br>
          <div class="row">
            <small>
              Satyo Wicaksana
            </small>
          </div>
          <div class="row t-lighten">
            <small>
              Nov, 4
            </small>
          </div>
        </div>
      </div>
      <div class="column">
        <figure class="image is-square">
          <img src="https://bulma.io/images/placeholders/256x256.png">
        </figure>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  width: 70% !important;
  margin-top: 20px;
}
.title {
  font-size: 23px;
}
img {
  border-left: solid 3px var(--primary-color);
}
@media only screen and (max-width: 600px) {
  .container {
    width: 90% !important;
  }
}
</style>