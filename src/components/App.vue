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
    }
  },
  methods: {
    enterFormRender: function() {
      this.modalTitle = 'Вход.';
      this.modalShow = true;
      this.modalForm = {
        action: {
          url: '/user/login',
          func: this.loginUser
        },
        method: 'post',
        text: 'Войти',
        inputs: [
          {
            id: 1,
            name: 'email',
            type: 'email',
            title: 'E-mail',
            required: true
          },
          {
            id: 2,
            name: 'password',
            type: 'password',
            title: 'Пароль',
            required: true
          },
        ],
        textareas: [],
      };
    },
    registerFormRender: function() {
      this.modalTitle = 'Регистрация.';
      this.modalShow = true;
      this.modalForm = {
        action: {
          url: '/user/new',
          func: this.createUser
        },
        method: 'post',
        text: 'Поехали!',
        inputs: [
          {
            id: 1,
            name: 'email',
            type: 'email',
            title: 'E-mail',
            required: true
          },
          {
            id: 2,
            name: 'password',
            type: 'password',
            title: 'Пароль',
            required: true
          },
          {
            id: 3,
            name: 'password-confirm',
            type: 'password',
            title: 'Подтверждение пароля',
            required: true
          },
          {
            id: 4,
            name: 'name',
            type: 'text',
            title: 'Имя (необязательно)',
            required: false
          },
        ],
        textareas: [],
      };
    },
    exit: function() {
      alert(23);
    },
    noteFormRender: function () {
      this.modalTitle = 'Добавить новую заметку.';
      this.modalShow = true;
      this.modalForm = {
        action: {
          url: '/',
          func: this.addNote,
        },
        method: 'post',
        text: 'Добавить',
        inputs: [
          {
            id: 1,
            name: 'title',
            type: 'text',
            title: 'Название заметки',
            required: false,
          },
          {
            id: 2,
            name: 'subtitle',
            type: 'text',
            title: 'Пояснение к заметке',
            required: false,
          },
        ],
        textareas: [
          {
            id: 3,
            name: 'text',
            title: 'Текст заметки',
            required: true
          }
        ]
      };
    },
    addNote: function (event) {
      event.preventDefault();
      let form = event.target;
    },
    loginUser: function (event) {
      event.preventDefault();
      let form = event.target;
    },
    createUser: function (event) {
      event.preventDefault();
      let form = event.target;
      let data = new FormData(form);
      
      console.log(data.getAll());
    },
  },
  components: {
    'header-component': HeaderComponent,
    'modal-component': ModalComponent,
    'desk-component': DeskComponent
  }
}
</script>
