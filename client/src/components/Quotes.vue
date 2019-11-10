<template>
  <section style="margin-top: 70px;">
    <button
      class="button block is-link is-outlined is-small is-rounded"
      @click="isActive = true"
    >Click to show Quote</button>
    <b-message
      title="Quote of the day"
      type="is-link"
      :active.sync="isActive"
      aria-close-label="Close message"
    >
      {{ quote.content }}
      <br />
      ~{{ quote.author }}
    </b-message>
  </section>
</template>

<script>
export default {
  name: "Quote",
  props: ["quote"],
  data() {
    return {
      isActive: false
    };
  }
};
</script>