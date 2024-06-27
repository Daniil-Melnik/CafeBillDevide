<template>
  <div class="persons-table1">
    <v-table>
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
            <v-btn @click="updRemove(p.id)" rounded="xs" class="del-btn">
              <v-icon>
                <img
                  :src="editImage"
                  alt="Delete"
                  style="width: 30px; height: 30px;"
                  rounded="0"
                />
              </v-icon>
            </v-btn>
          </td>
        </tr>
      </tbody>
    </v-table>
  </div>
</template>

<script>
import InpLbl from './InpLbl.vue';
import editImage from '../assets/delete2.svg'
import {
    mdiAccount,
    mdiDelete,
    mdiPencil,
    mdiShareVariant,
  } from '@mdi/js'
export default {
  name: 'PersonTable',
  props: ['persons'],
  data() {
    return {
      required_title: (value) => !!value || 'Не может быть пустым',
      mdiAccount,
      mdiPencil,
      mdiShareVariant,
      mdiDelete,
      editImage
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
  .del-btn{
    width: 31px;
    height: 31px;
  }
</style>