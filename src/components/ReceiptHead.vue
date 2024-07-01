<!-- Компонент-голова чека в ListChecks.vue -->

<template>
  <div class="receipt-head">
    <div v-if="this.currPerson != null" class="d-flex-column">
      <h3 class="text-medium">Посетитель: {{this.currPerson.name}}</h3>
      <h3 v-if="this.currCheck != null">Итог: {{ getCheckSum() }} руб.</h3>
    </div>
    <v-alert
      v-model="alert"
      border="start"
      close-label="Закрыть"
      color="#04D9FF"
      title="Чек не создан"
      variant="tonal"
      class="margin-top-15"
    >
      <p class="text-medium margin-top-10">Посетитель не оформлял чека. Добавить?</p>
      <v-btn @click="sendPack()" class="margin-top-10">Добавить</v-btn>
    </v-alert>
  </div>
</template>

<script>
export default {
  name: 'ReceiptHead',
  props: ['currPerson', 'currCheck'],

  computed: {
      alert() {
        return (this.currCheck == null && this.currPerson != null);
      },
    },

  data(){
    return{
    }
  },

  methods: {
    sendPack() {
      this.$emit('senddata');
      this.alert = false
    },
    getCheckSum() {
      var sum = 0;
      if (this.currCheck != null) {
        var prodList = this.currCheck.products;
        for (var p in this.currCheck.products) {
          sum += prodList[p].price;
        }
      }
      return sum;
    }
  }
};
</script>

<style lang="scss">
  @import '../scss/_top.scss';
</style>