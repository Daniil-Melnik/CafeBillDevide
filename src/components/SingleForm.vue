<!-- Компонент-форма для добавления элемента в сисок ListPersons.vue -->

<template>
  <div class="d-flex flex-column">
    <v-form class="form-main">
      <v-text-field
      clearable
      :label="title"
      v-model="textInput"
      hint="Введите имя посетителя"
      class="name-input"
      :rules="required_title"
      :error="error"
      >
    </v-text-field>
      <v-btn @click="sendPack()" class="add-btn hover-btn-green" color="#44D62C">
        <v-icon>
          <img
            :src="addImage"
            alt="Удалить"
            style="width: 30px; height: 30px;"
            rounded="0"
          />
        </v-icon>
      </v-btn>
    </v-form>
  </div>
</template>

<script>
import addImage from '../assets/add/add1-green.png'
export default {
  name: 'SingleForm',
  props: ['title'],
  data() {
    return {
      textInput: '',
      error: false,
      required_title: [
        value => {
          var re = /^(?=.*[^\s])[\u0400-\u04FF0-9A-Za-z\s]+$/
          if (!re.test(value)){
            return 'Недопустимое имя'
          }
        },
      ],
      addImage,
    };
  },
  methods: {
    sendPack() { // отправка формы
      var re = /^(?=.*[^\s])[\u0400-\u04FF0-9A-Za-z\s]+$/
      if (re.test(this.textInput) && (this.textInput != null) && (this.textInput != '')){
        this.$emit('senddata', this.textInput);
        this.textInput = ''
      }
    },
  },
};
</script>

<style lang="scss">
  @import '../scss/_top.scss';
</style>