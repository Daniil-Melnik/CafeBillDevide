<template>
  <div class="receipt-head">
    <div v-if="this.currPerson != null" class="d-flex-column">
      <h3 class="text-medium">Посетитель: {{this.currPerson.name}}</h3>
      <h3 v-if="this.currCheck != null">Итог: {{ getCheckSum() }} руб.</h3>
    </div>
    <div v-if="this.currCheck == null && this.currPerson != null">
      <p class="text-medium">Посетитель не оформлял чека. Добавить?</p>
      <v-btn @click="sendPack()">Добавить</v-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ReceiptHead',
  props: ['currPerson', 'currCheck'],
  methods: {
    sendPack() {
      this.$emit('senddata');
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
@import './variables.scss';
</style>