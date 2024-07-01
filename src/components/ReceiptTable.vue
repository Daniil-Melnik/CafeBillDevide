<template>
  <div class="d-flex justify-center">
    <div v-if="currCheck != null">
      <TableRow
        v-for="(p) in currCheck.products"
        :key="p.id"
        :p="p"
        :currPerson="currPerson"
        @remProdSend="remProdTranciv"
      ></TableRow>
    </div>
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
  @import '../scss/_top.scss';
</style>