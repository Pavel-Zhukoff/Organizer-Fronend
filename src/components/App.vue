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
import HeaderComponent from './Common/Header.vue';
import DeskComponent from './Desk/Desk.vue' ;
import ModalComponent from './Modal/Modal.vue' ;

export default {
  data() {
    return {
      actions: {
        enter: this.enter,
        exit: this.exit,
        newNote: this.newNote,
      },
      modalTitle: '',
      modalForm: {},
      modalShow: false,
    }
  },
  methods: {
    enter: function(event) {
      alert(22);
    },
    exit: function(event) {
      alert(23);
    },
    newNote: function () {
      this.modalTitle = 'Добавить новую заметку.';
      this.modalShow = true;
      this.modalForm = {
        action: '/',
        method: 'post',
        text: 'Добавить',
        action: function () {},
        inputs: [
          {
            id: 1,
            name: 'title',
            type: 'text',
            title: 'Название заметки',
            required: 'false'
          },
          {
            id: 2,
            name: 'subtitle',
            type: 'text',
            title: 'Пояснение к заметке',
            required: 'false'
          },
        ],
        textareas: [
          {
            id: 3,
            name: 'text',
            title: 'Текст заметки'
          }
        ]
      };
    },
  },
  components: {
    'header-component': HeaderComponent,
    'modal-component': ModalComponent,
    'desk-component': DeskComponent
  }
}
</script>
