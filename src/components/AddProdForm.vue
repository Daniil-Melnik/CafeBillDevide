<!-- Компонент-форма для добавления продукта в чек -->
<template>
  <div class="width-prod-form">
    <p class="text-medium">Добавить продукт</p>
    <v-form fast-fail @submit.prevent title="Добавить продукт" class="margin-top-15" theme="dark">
      <v-text-field
        v-model="newProdTitle"
        label="Новый продукт"
        hint="Любая последовательность букв и цифр"
        :rules="is_valid_title"
        @update:modelValue="alert = false"
        style="margin: 0; padding: 0;"
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
        style="padding: 0;"
        class="margin-top-5"
      ></v-number-input>
      <v-btn @click="sendPack()" rounded="lg" class="back-color-neon-green width-prod-form hover-btn-green">
        <v-icon>
          <img
            :src="addImage"
            alt="Удалить"
            style="width: 25px; height: 25px;"
            rounded="0"
          />
        </v-icon>
      </v-btn>
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
import addImage from '../assets/add/add-basket-green.png'
export default {
  name: 'AddProdForm',
  props: [],
  data() {
    return {
      newProdTitle: "",
      newProdPrice: 0,
      alert: false,
      addImage,

      is_valid_price: [ // проверка корректности цены
        value => {
          if (value == null) return 'Не может быть пустым'
        },
      ],

      is_valid_title: [ // проверка корректности названия
        value => {
          var re = /^(?=.*[^\s])[\u0400-\u04FF0-9A-Za-z\s]+$/ // хотя бы один непробельный символ,
                                                              // последовательность из латиницы, кириллицы и пробелов
          if (!re.test(value)){
            return 'Недопустимое название'
          }
        }
      ]
    };
  },
  methods: {
    isValidTitle(){ // метод для провеки корректности названия продукта
      var re = /^(?=.*[^\s])[\u0400-\u04FF0-9A-Za-z\s]+$/
      return (re.test(this.newProdTitle))
    },

    isValidPrice(){ // метод для проверки корректности цены продукта
      return (this.newProdPrice != null)
    },

    sendPack() { // отправка нового продукта в ListChecks.vue
      if (this.isValidTitle() && this.isValidPrice()){
        this.$emit('senddata', this.newProdPrice, this.newProdTitle);
        this.alert = false
        this.newProdTitle = ""
        this.newProdPrice = 0
      }
      else this.alert = true
    }
  }
};
</script>

<style lang="scss">
  @import '../scss/_top.scss';
</style>