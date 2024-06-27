<template>
  <div class="add-combo">
    <v-select
      :items="comboItems"
      v-model="selectedItem"
      :label="comboLabel"
    ></v-select>
    <v-btn @click="sendPack()">Добавить</v-btn>
  </div>
</template>

<script>
export default {
  name: 'AddCombo',
  props: ['comboItems', 'comboLabel', 'addId'],
  data() {
    return {
      selectedItem: ""
    };
  },
  methods: {
    sendPack() {
      this.$emit('senddata', this.addId, this.selectedItem);
      this.selectedItem = "";
    }
  }
};
</script>

<style lang="scss">
@import './variables.scss';
</style>