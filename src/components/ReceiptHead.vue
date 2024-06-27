<template>
  <div class="receipt-head">
    <p v-if="this.currPerson != null">{{this.currPerson.name}} Итог: {{ getCheckSum() }}</p>
    <div v-if="this.currCheck == null && this.currPerson != null">
      <h3>Добавить?</h3>
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