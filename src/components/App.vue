<template>

  <div>
    <header-component :actions="actions"></header-component>
    <desk-component></desk-component>
    <modal-component
    :title="modalTitle"
    :form="modalForm"
    :show="modalShow"
    ></modal-component>
  </div>

</template>

<script>
import axios from 'axios';

import HeaderComponent from './Common/Header.vue';
import DeskComponent from './Desk/Desk.vue' ;
import ModalComponent from './Modal/Modal.vue' ;

export default {
  data() {
    return {
      actions: {
        enter: this.enterFormRender,
        register: this.registerFormRender,
        exit: this.exit,
        newNote: this.noteFormRender,
      },
      modalTitle: '',
      modalForm: {},
      modalShow: false,
      backendUrl: 'http://organizer-backend',
    };
  },
  methods: {
    enterFormRender: function() {
      this.modalTitle = 'Вход.';
      this.modalShow = true;
      this.modalForm = {
        action: {
          url: this.backendUrl +'/user/login',
          func: 'create_user'
        },
        method: 'post',
        text: 'Войти',
        type: 'login'
      };
    },
    registerFormRender: function() {
      this.modalTitle = 'Регистрация.';
      this.modalShow = true;
      this.modalForm = {
        action: {
          url: this.backendUrl + '/user/new',
          func: this.createUser
        },
        method: 'post',
        text: 'Поехали!',
        type: 'register',
      };
    },
    noteFormRender: function () {
      this.modalTitle = 'Добавить новую заметку.';
      this.modalShow = true;
      this.modalForm = {
        action: {
          url: this.backendUrl + '/note/new',
          func: this.addNote,
        },
        method: 'post',
        text: 'Добавить',
        type: 'card'
      };
    },
    exit: function() {
      alert(23);
    },
    loginUser: function (event) {
      event.preventDefault();
      let form = event.target;
    },
    create_user: function (event, data) {

      console.log(event);
      console.log(data);

      /*


      axios.post(form.action, {
        email: data.get('email'),
        password: data.get('password'),
        name: data.get('name')
      },{
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      })
      .then(function (response) {
        console.log(response);
        if (response.data.code == "200") {
          form.reset();
        }
        document.querySelector('.error-container').innerText = response.data.answer;
      })
      .catch(function (error) {
        console.log(error);
      });*/
    },
    addNote: function (event) {
      event.preventDefault();
      let form = event.target;
    },
  },
  components: {
    'header-component': HeaderComponent,
    'modal-component': ModalComponent,
    'desk-component': DeskComponent
  }
}
</script>
