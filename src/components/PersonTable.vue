<template>
  <div>
    <v-table height="500px" theme="dark"  fixed-header class="width-table-persons">
      <thead>
        <tr>
          <th>Имя посетителя</th>
          <th>Потратил (рублей)</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(p) in persons" :key="p.id">
          <td class="d-flex align-center width-td-left">
            <v-btn @click="updRemove(p.id)" icon rounded="lg" class="del-btn hover-btn-red" size="x-small" color="#D22730">
              <v-icon>
                <img
                  :src="editImage"
                  alt="Удалить"
                  style="width: 30px; height: 30px;"
                  rounded="0"
                />
              </v-icon>
            </v-btn>
            <InpLbl :maintext="p.name" :id="p.id" :rule="required_title" type="text" :validMethod="isValidName" @senddata="setNewName" dens="compact"></InpLbl>
          </td>
          <td style="text-align: center;" class="width-td-right">{{ getPersonTotal(p.id) }}</td>
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
      // required_title: (value) => !!value || 'Не может быть пустым',
      required_title: [
        value => {
          var re = /^(?=.*[^\s])[\u0400-\u04FF0-9A-Za-z\s]+$/
          if (!re.test(value)){
            return 'Недопустимое имя'
          }
        },
      ],
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

    isValidName(value){
      var re = /^(?=.*[^\s])[\u0400-\u04FF0-9A-Za-z\s]+$/
      return re.test(value)
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