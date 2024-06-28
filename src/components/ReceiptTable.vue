<template>
  <div class="receipt-table">
    <div v-if="currCheck != null">
    <!-- <v-table v-if="currCheck != null">
      <thead>
        <tr>
          <th>Продукт</th>
          <th>Цена</th>
          <th>Ели</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody> -->
        <TableRow
          v-for="(p) in currCheck.products"
          :key="p.id"
          :p="p"
          :currPerson="currPerson"
          @remProdSend="remProdTranciv"
        ></TableRow>
        </div>
      <!-- </tbody>
    </v-table> -->
  </div>
</template>

<script>
import TableRow from './TableRow.vue'

export default {
  name: 'ReceiptTable',

  props: ['currCheck', 'currPerson'],

  data() {
    return {
      isTitleEditable: [],
      isPriceEditable: [],
      selectedPersons: [],
    }
  },
  methods: {
    remProdTranciv(id) {
      this.$emit('remProdSend', id);
    },
  },

  components: {
    TableRow,
  }
}
</script>

<style lang="scss">
@import './variables.scss';
</style>