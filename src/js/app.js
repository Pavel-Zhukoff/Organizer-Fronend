const Vue = require('vue/dist/vue.js');
const components = {
  deskComponent: require('../components/Desk/Desk.vue').default,
};

console.log(components.deskComponent);

new Vue({
  el: "#app",
  data: {
    posts: [
      {id: 1, title: 'Hello, World!'}
    ]
  },
  components: {
    desk: components.deskComponent
  }
})
