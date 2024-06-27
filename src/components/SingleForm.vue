<template>
  <div>
    <v-form style="width: 600px; height: 80px" class="form-main">
      <v-text-field
      clearable
      :label="title"
      v-model="textInput"
      hint="Введите имя посетителя"
      class="name-input"
      >
    </v-text-field>
      <v-btn @click="sendPack()" class="add-btn" color="#44D62C">
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
import addImage from '../assets/add1-green.png'
export default {
  name: 'SingleForm',
  props: ['title'],
  data() {
    return {
      textInput: '',
      addImage,
    };
  },
  methods: {
    sendPack() {
      this.$emit('senddata', this.textInput);
    },
  },
};
</script>

<style lang="scss">
  @import './variables.scss';
  .name-input {
    width: $single-form-input;
  }

  .add-btn {
    width: 600px;
    height: 60px;
    margin-top: $margin-top-1-0;
  }

  .form-main{
    margin-top: $margin-top-1-0;
  }
</style>