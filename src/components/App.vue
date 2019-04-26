<template>

  <div>
    <header-component ref="header" :actions="actions"></header-component>
    <desk-component></desk-component>
    <modal-component
     :title="modalTitle"
     :form="modalForm"
     v-show="modalShow"
     @close="closeModal"
    ></modal-component>
  </div>

</template>

<script>
import HeaderComponent from "./Common/Header.vue";
import DeskComponent from "./Desk/Desk.vue" ;
import ModalComponent from "./Modal/Modal.vue" ;

export default {
  data() {
    return {
      actions: {
        login: this.enterFormRender,
        signup: this.registerFormRender,
        logout: this.exit,
        newNote: this.noteFormRender,
      },
      modalTitle: "",
      modalForm: {},
      modalShow: false,
    };
  },
  methods: {
    closeModal: function () {
      this.modalShow = false;
    },
    enterFormRender: function() {
      this.modalTitle = "Вход.";
      this.modalShow = true;
      this.modalForm = {
        action: {
          url: "/user/login",
        },
        method: "post",
        text: "Войти",
        type: "login"
      };
    },
    registerFormRender: function() {
      this.modalTitle = "Регистрация.";
      this.modalShow = true;
      this.modalForm = {
        action: {
          url: "/user/new",
        },
        method: "post",
        text: "Поехали!",
        type: "signup",
      };
    },
    noteFormRender: function () {
      this.modalTitle = "Добавить новую заметку.";
      this.modalShow = true;
      this.modalForm = {
        action: {
          url: "/note/new",
        },
        method: "post",
        text: "Добавить",
        type: "card"
      };
    },
    exit: function() {
      this.$store.dispatch("REMOVE_USER")
      .then((data) => {
        alert(data.answer);
      });
    },
  },
  components: {
    "header-component": HeaderComponent,
    "modal-component": ModalComponent,
    "desk-component": DeskComponent
  },
  created: function () {
    this.$store.dispatch("GET_USER");
  },
}
</script>
