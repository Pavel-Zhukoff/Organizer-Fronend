<template>

  <div>
    <header-component ref="header" :actions="actions"></header-component>
    <desk-component></desk-component>
    <modal-component
      ref="asdasd"
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
        login: this.enterFormRender,
        signup: this.registerFormRender,
        logout: this.exit,
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
        },
        method: 'post',
        text: 'Поехали!',
        type: 'signup',
      };
    },
    noteFormRender: function () {
      this.modalTitle = 'Добавить новую заметку.';
      this.modalShow = true;
      this.modalForm = {
        action: {
          url: this.backendUrl + '/note/new',
        },
        method: 'post',
        text: 'Добавить',
        type: 'card'
      };
    },
    exit: function() {
      var user = JSON.parse(localStorage.getItem('user'))[0];
      console.log(user);
      axios.post(this.backendUrl + '/user/logout', user, {
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      })
      .then(response => {
        console.log(response);
        if (response.data.code == "200") {
          alert( response.data.answer);
          if (localStorage.getItem('user') !== undefined) {
            localStorage.removeItem('user');
          }
        } else {
          alert( response.data.answer);
        }
      })
      .catch(error => {
        console.log(error);
      });
    },
    loginUser: function (event) {
      event.preventDefault();
      let form = event.target;
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
  },
  created: function () {
    if (localStorage.getItem('user') !== null) {
      //this.$cookies.remove('user')
      var user = JSON.parse(localStorage.getItem('user'));
      axios.post(this.backendUrl + '/user', user, {
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      })
      .then(response => {
        if (response.data.code == "200") {
          localStorage.setItem('user', JSON.stringify(response.data.answer));
        } else {
          localStorage.removeItem('user');
        }
      })
      .catch(error => {
        console.log(error);
      });
    }
  },
}
</script>
