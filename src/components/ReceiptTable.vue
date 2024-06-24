<template>
  <div class="receipt-table">
    <v-table v-if="currCheck != null">
      <thead>
        <tr>
          <th>Продукт</th>
          <th>Цена</th>
          <th>Ели</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <TableRow
          v-for="(p) in currCheck.products"
          :key="p.id"
          :p="p"
          :currPerson="currPerson"
          @remProdSend="remProdTranciv"
        ></TableRow>
      </tbody>
    </v-table>
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

.receipt-table {
  v-table {
    width: 100%;
    border-collapse: collapse;

    thead {
      background-color: $table-header-bg;
      th {
        padding: $padding;
        font-size: $font-size;
      }
    }

    tbody {
      tr {
        background-color: $table-row-bg;
        &:hover {
          background-color: $table-row-hover-bg;
        }
        td {
          padding: $padding;
          font-size: $font-size;
        }
      }
    }
  }
}
</style>