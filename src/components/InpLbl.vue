<template>
  <div class="inp-lbl">
    <v-text-field
      v-if="isEditable"
      label=""
      v-model="personName"
      :rules="[rules.required_title]"
      :type="type"
      class="input-field"
    ></v-text-field>
    <p v-else>{{ personName }}</p>
    <v-btn @click="sendPack" class="btn">{{ isEditable ? 'Сохранить' : 'Редактировать' }}</v-btn>
  </div>
</template>

<script>
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
</style>