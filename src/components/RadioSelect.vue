<!-- Компонент radio-кнопок для выбора кто/кому -->
<template>
  <div class="radio-select">
    <v-radio-group v-model="radios" @update:modelValue="updLabelsSend" class="radio-group">
      <v-radio label="Кто - кому" value="1"></v-radio>
      <v-radio label="Кому - кто" value="2"></v-radio>
    </v-radio-group>
  </div>
</template>

<script>
export default {
  name: 'RadioSelect',
  data() {
    return {
      radios: 0
    }
  },
  methods: {
    updLabelsSend() {
      this.$emit('senddata', this.radios);
    }
  }
};
</script>

<style lang="scss">
</style>