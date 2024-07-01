<template>
  <div class="d-flex-column">
    <v-select
      :items="comboItems"
      v-model="selectedItem"
      :label="comboLabel"
      hide-details
      density="compact"
      class="width-300 margin-top-10"
    ></v-select>
    <v-btn @click="sendPack()" class="width-300 back-color-neon-green margin-top-5 hover-btn-green">
      <v-icon>
        <img
          :src="addImage"
          alt="Удалить"
          style="width: 30px; height: 30px;"
          rounded="0"
        />
      </v-icon>
    </v-btn>
  </div>
</template>

<script>
import addImage from '../assets/add1-green.png'
export default {
  name: 'AddCombo',
  props: ['comboItems', 'comboLabel', 'addId'],
  data() {
    return {
      selectedItem: "",
      addImage
    };
  },
  methods: {
    sendPack() {
      if((this.selectedItem != null) && (this.selectedItem != "")){
        this.$emit('senddata', this.addId, this.selectedItem);
        this.selectedItem = "";
      }
    }
  }
};
</script>

<style lang="scss">
  @import '../scss/_top.scss';
</style>