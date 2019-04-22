<template lang="html">
  <transition name="fade">
    <div class="modal-overlay" v-if="show">
      <div class="container-fluid">
        <div class="row justify-content-center mt-5">
          <div class="col-lg-6 col-md-8 col-11">
            <div class="modal">
              <div class="modal-title">
                <h2 class="title">{{ title }}</h2>
              </div>
              <div class="modal-body">
                <form-register
                  :params="form"
                ></form-register>
              </div>
            </div>
          </div>
          <div class="col-md-1 col-2">
            <div class="modal-close" v-on:click="closeModal"></div>
          </div>
        </div>
      </div>
    </div>
  </transition>

</template>

<script>
import FormRegister from '../Form/Register.vue';

export default {
  props: {
    title: String,
    form: Object,
    type: String,
    show: {
      type: Boolean,
      default: function() {
        return false;
      },
    },
  },
  components: {
    'form-register': FormRegister,
  },
  methods: {
    closeModal: function () {
      this.show = !this.show;
    }
  }
}
</script>

<style lang="css" scoped>
</style>
