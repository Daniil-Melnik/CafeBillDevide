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
</style>