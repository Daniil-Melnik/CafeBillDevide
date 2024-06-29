<template>
  <div class="width-card-rec">
    <v-form fast-fail @submit.prevent>
      <v-text-field
        v-model="newProdTitle"
        label="Новый продукт"
        hint="Любая последовательность букв и цифр"
        :rules="is_valid_title"
        @update:modelValue="alert = false"
      ></v-text-field>

      <v-number-input
        :reverse="false"
        controlVariant="split"
        clearable
        label="Цена"
        hint="Максимум 50000 рублей"
        :hideInput="false"
        :inset="false"
        :rules="is_valid_price"
        min="0"
        max="50000"
        v-model="newProdPrice"
        @update:modelValue="alert = false"
      ></v-number-input>
      <v-btn class="mt-2" @click="sendPack()" block>Добавить</v-btn>
    </v-form>
    <v-alert
      v-model="alert"
      border="start"
      close-label="Закрыть"
      color="#BC13FE"
      title="Продукт некорректен"
      variant="tonal"
      class="margin-top-15"
      closable
    >
    Проверте {{ !isValidTitle() ? "наименование" : "" }} {{ (!isValidPrice() && !isValidTitle()) ? "и" : "" }} {{ !isValidPrice() ? "цену" : "" }}
    </v-alert>
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
      alert: false,

      is_valid_price: [
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
    isValidTitle(){
      var re = /^[\u0400-\u04FF0-9A-Za-z]+$/
      return (re.test(this.newProdTitle))
    },

    isValidPrice(){
      return (this.newProdPrice != null)
    },

    sendPack() {
      if (this.isValidTitle() && this.isValidPrice()){
        this.$emit('senddata', this.newProdPrice, this.newProdTitle);
        this.alert = false
      }
      else this.alert = true
    }
  }
};
</script>

<style lang="scss">
@import './variables.scss';
</style>