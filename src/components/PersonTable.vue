<template>
  <div class="persons-table">
    <v-simple-table>
      <thead>
        <tr>
          <th>Имя</th>
          <th>Потратил</th>
          <th>Действия</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(p) in persons" :key="p.id">
          <td>
            <InpLbl :maintext="p.name" :id="p.id" :rule="required_title" type="text" @senddata="setNewName"></InpLbl>
          </td>
          <td>{{ getPersonTotal(p.id) }}</td>
          <td>
            <v-btn color="error" @click="updRemove(p.id)">Удалить</v-btn>
          </td>
        </tr>
      </tbody>
    </v-simple-table>
  </div>
</template>

<script>
import InpLbl from './InpLbl.vue';
export default {
  name: 'PersonTable',
  props: ['persons'],
  data() {
    return {
      required_title: (value) => !!value || 'Не может быть пустым',
    };
  },
  methods: {
    getPersonTotal(persId) {
      var persWithReceipt = this.getPersWithReceipts();
      var reSum = 0;
      for (var i in persWithReceipt) {
        var pWR = persWithReceipt[i].id;
        var currReceipt = this.$store.getters.getCheckByName(pWR);

        for (var p in currReceipt.products) {
          var currProd = currReceipt.products[p];
          if (currProd.eatPersons.filter((cP) => cP == persId).length != 0) {
            var persLen = currProd.eatPersons.length;
            reSum += Math.ceil(currProd.price / persLen);
          }
        }
      }
      return reSum;
    },
    getPersWithReceipts() {
      return this.$store.getters.getPersWithRec;
    },
    setNewName(newName, id) {
      this.$store.commit('updSetNewName', { newName, id });
    },
    updRemove(id) {
      this.$store.commit('updRemove', { id });
    },
  },
  components: {
    InpLbl,
  },
};
</script>

<style lang="scss">
.persons-table {
  margin-top: 20px;

  .v-simple-table {
    th, td {
      padding: 10px;
      text-align: left;
    }
    th {
      background-color: #3498db;
      color: #fff;
    }
    td {
      background-color: #f9f9f9;
    }

    .v-btn {
      color: #fff;

      &.error {
        background-color: #e74c3c;

        &:hover {
          background-color: darken(#e74c3c, 10%);
        }
      }
    }
  }
}
</style>