import Vue from 'vue/dist/vue.js';
import Hello from '../components/hello.vue';



new Vue({
    el: "#app",
    data: {
      posts: [
      { id: 1, title: 'My journey with Vue' },
      { id: 2, title: 'Blogging with Vue' },
      { id: 3, title: 'Why Vue is so fun' }
    ]
  },
  components: {
    hello: Hello
  }
})
