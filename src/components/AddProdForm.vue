<template>
  <div class="add-prod-form">
    <v-form fast-fail @submit.prevent>
      <v-text-field
        v-model="newProdTitle"
        label="Новый продукт"
        hint="Любая последовательность букв и цифр"
        :rules="is_valid_title"
      ></v-text-field>

      <v-number-input
        :reverse="false"
        controlVariant="split"
        clearable
        label="Цена"
        hint="Максимум 50000 рублей"
        :hideInput="false"
        :inset="false"
        :rules="not_null"
        min="0"
        max="50000"
        v-model="newProdPrice"
      ></v-number-input>
      <v-btn class="mt-2" @click="sendPack()" block>Добавить</v-btn>
    </v-form>
  </div>
</template>

<script>
export default {
  name: 'AddProdForm',
  props: [],
  data() {
    return {
      newProdTitle: "",
      newProdPrice: 0,
      not_null: [
        value => {
          if (value == null) return 'Не может быть пустым'
        },
      ],
      is_valid_title: [
        value => {
          var re = /^[\u0400-\u04FF0-9A-Za-z]+$/
          if (!re.test(value)){
            return 'Недопустимое название'
          }
        }
      ]
    };
  },
  methods: {
    sendPack() {
      this.$emit('senddata', this.newProdPrice, this.newProdTitle);
    }
  }
};
</script>

<style lang="scss">
@import './variables.scss';
</style>