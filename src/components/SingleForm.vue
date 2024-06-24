<template>
  <div class="single-form">
    <v-text-field :label="title" v-model="textInput" class="input-field"></v-text-field>
    <v-btn @click="sendPack()" class="btn">Добавить</v-btn>
  </div>
</template>

<script>
export default {
  name: 'SingleForm',
  props: ['title'],
  data() {
    return {
      textInput: '',
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
.single-form {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 20px;

  .input-field {
    margin-bottom: 10px;
    width: 100%;
  }

  .btn {
    background-color: #2ecc71;
    color: #fff;
    align-self: flex-end;

    &:hover {
      background-color: darken(#2ecc71, 10%);
    }
  }
}
</style>