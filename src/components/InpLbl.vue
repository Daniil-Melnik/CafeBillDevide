<template>
  <div class="d-flex align-center">
    <v-btn @click="sendPack" icon rounded="lg" size="x-small" class="edit-btn" color="#4D4DFF">
      <v-icon>
        <img
          :src="editImage"
          alt="Удалить"
          style="width: 25px; height: 25px;"
          rounded="0"
        />
      </v-icon>
    </v-btn>
    <v-text-field
      v-if="isEditable"
      label=""
      v-model="personName"
      :rules="[rules.required_title]"
      :type="type"
      class="input-field"
    ></v-text-field>
    <p v-else>{{ personName }}</p>
  </div>
</template>

<script>
import editImage from '../assets/edit-2.svg'
export default {
  name: 'InpLbl',
  props: ['maintext', 'id', 'rule', 'type'],
  data() {
    return {
      isEditable: false,
      personName: this.maintext,
      rules: {
        required_title: this.rule,
      },
      editImage
    };
  },
  methods: {
    sendPack() {
      if (this.isEditable) {
        this.$emit('senddata', this.personName, this.id);
      }
      this.isEditable = !this.isEditable;
    },
  },
};
</script>

<style lang="scss">
  @import './variables.scss';
  .edit-btn{
    margin-right: $margin-right-1-0;
  }
</style>