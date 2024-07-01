<template>
  <div class="d-flex align-center">
    <v-btn @click="sendPack" icon rounded="lg" size="x-small" class="back-color-neon-blue edit-btn hover-btn-blue" color="#4D4DFF">
      <v-icon>
        <img
          :src="editImage"
          alt="Удалить"
          style="width: 25px; height: 25px;"
          rounded="0"
        />
      </v-icon>
    </v-btn>
    <div class="d-flex align-center margin-left-5">
      <p v-if="subtext != null" class="margin-right-5 width-subtitle-inpLbl">{{ subtext != null ? subtext: "" }}</p>
      <v-text-field
        v-if="isEditable"
        v-model="personName"
        :rules="rules"
        :type="type"
        :hint="this.hint"
        :density="this.dens"
        class="input-field"
        style="margin: 0; padding: 0;"
      ></v-text-field>
      <p v-else class="margin-left-5 width-title-inpLbl">{{ personName }}</p>
    </div>
  </div>
</template>

<script>
import editImage from '../assets/edit-2.svg'
export default {
  name: 'InpLbl',
  props: ['maintext', 'id', 'rule', 'type', 'subtext', 'validMethod', 'hint', 'dens'],
  data() {
    return {
      isEditable: false,
      personName: this.maintext,
      rules: this.rule,
      editImage
    };
  },
  methods: {
    sendPack() {
      if (this.validMethod(this.personName)){
        if (this.isEditable) {
            this.$emit('senddata', this.personName, this.id);
          }
        this.isEditable = !this.isEditable;
      }
    },
  },
};
</script>

<style lang="scss">
@import '../scss/variables.scss';

  .edit-btn {
    margin-right: $margin-right-1-0;
  }

  .display-text {
    margin: 0;
    line-height: 1.5em; /* Adjust this line-height to match the height of your input field */
  }
</style>