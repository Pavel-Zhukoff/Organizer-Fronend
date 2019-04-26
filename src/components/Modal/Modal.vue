<template lang="html">
  <transition name="fade">
    <div class="modal-overlay">
      <div class="container-fluid">
        <div class="row justify-content-center mt-5">
          <div class="col-lg-6 col-md-8 col-11">
            <div class="modal">
              <div class="modal-title">
                <h2 class="title">{{ title }}</h2>
              </div>
              <div class="modal-body">
                <template v-if="form.type == `signup`">
                  <form-register
                    :params="form"
                  ></form-register>
                </template>
                <template v-else-if="form.type == `login`">
                  <form-login
                    :params="form"
                  ></form-login>
                </template>
                <template v-else-if="form.type == `card`">
                  <form-card
                    :params="form"
                  ></form-card>
                </template>
              </div>
            </div>
          </div>
          <div class="col-md-1 col-2">
            <div class="modal-close" @click="closeModal"></div>
          </div>
        </div>
      </div>
    </div>
  </transition>

</template>

<script>
import FormRegister from "../Form/Register.vue";
import FormLogin from "../Form/Enter.vue";
import FormCard from "../Form/Card.vue";

export default {
  props: {
    title: String,
    form: Object,
  },
  components: {
    "form-register": FormRegister,
    "form-login": FormLogin,
    "form-card": FormCard,
  },
  methods: {
    closeModal: function () {
      this.$emit('close');
    }
  }
}
</script>

<style lang="css" scoped>
</style>
