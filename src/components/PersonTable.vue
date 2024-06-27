<template>
  <div>
    <v-table height="500px" theme="dark"  fixed-header style="width: 600px;">
      <thead>
        <tr>
          <th style="width: 400px; text-align: center;">Имя посетителя</th>
          <th style="width: 200px; text-align: center;">Потратил (рублей)</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(p) in persons" :key="p.id">
          <td class="d-flex align-center" style="width: 400px;">
            <v-btn @click="updRemove(p.id)" icon rounded="lg" class="del-btn" size="x-small" color="#D22730">
              <v-icon>
                <img
                  :src="editImage"
                  alt="Удалить"
                  style="width: 30px; height: 30px;"
                  rounded="0"
                />
              </v-icon>
            </v-btn>
            <InpLbl :maintext="p.name" :id="p.id" :rule="required_title" type="text" @senddata="setNewName"></InpLbl>
          </td>
          <td style="width: 200px; text-align: center;">{{ getPersonTotal(p.id) }}</td>
        </tr>
      </tbody>
    </v-table>
  </div>
</template>

<script>
import InpLbl from './InpLbl.vue';
import editImage from '../assets/delete2-red-3.svg'
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
  @import './variables.scss';
  .del-btn{
    margin-right: $margin-right-1-0;
  }
</style>