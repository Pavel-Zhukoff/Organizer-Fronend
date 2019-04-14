<template lang="html">
  <transition name="fade">
    <div class="modal-overlay" v-if="show">
      <div class="container-fluid">
        <div class="row justify-content-center mt-5">
          <div class="col-lg-6 col-md-8 col-10">
            <div class="modal">
              <div class="modal-title">
                <h2 class="title">Заголовок</h2>
              </div>
              <div class="modal-body">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Soluta quis dolore voluptate, quod eveniet veritatis? Hic placeat quo vel. Delectus consequuntur iusto voluptatibus nemo ipsum, quod animi sint deleniti expedita.
                </p>
              </div>
            </div>
          </div>
          <div class="col-md-1 col-2">
            <div class="modal-close" v-on:click="show = !show"></div>
          </div>
        </div>
      </div>
    </div>
  </transition>

</template>

<script>
export default {
  data () {
    return {
      show: false
    }
  }
}
</script>

<style lang="css" scoped>
</style>
