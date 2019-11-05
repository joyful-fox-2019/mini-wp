const app = new Vue ({
  el: "#app",
  data : {
    message : 'Hello Vue!'
  },
  methods : {
    changeMessage : function() {
      this.message = "Welcome to Womanizer Mini-WP"
    }
  }
})