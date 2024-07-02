<!-- Таблица денежных отношений между посетителями из ListRelat.vue -->

<template>
  <div class="relat-table">
    <div v-if="persFromObj != null">
      <v-table v-if="getCurrMoneyRelat().length != 0">
        <thead>
          <tr>
            <th>{{ tableLbl }}</th>
            <th>Сколько</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(pMR, index) in getCurrMoneyRelat()" :key="index">
            <td class="left-td" v-if="radios == 1">{{ getPersNameById(pMR.nameTo) }}</td>
            <td class="left-td" v-if="radios == 2">{{ getPersNameById(pMR.nameFrom) }}</td>
            <td class="right-td">{{ pMR.money }}</td>
          </tr>
        </tbody>
      </v-table>
      <v-alert
        v-else
        border="start"
        close-label="Закрыть"
        title="Опа!"
        variant="tonal"
        class="margin-top-15 color-neon-fuchsia"
      >
        <p class="text-medium margin-top-10">{{ tableLbl == 'Кому' ? 'Никому посетитель не должен!' : 'Никто посетителю не должен' }}</p>
      </v-alert>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RelatTable',
  props: ['persFromObj', 'radios', 'tableLbl', 'alert'],

  data(){
    return{
    }
  },

  methods: {
    getPersWithReceipts(){ // получение посетителей с чеками
      return this.$store.getters.getPersWithRec
    },
    getPersNameById(id) { // получение посетителя по id
      var person = this.$store.getters.getPersonById(id);
      return person.name;
    },
    getCurrMoneyRelat() { // получение денежных отношений по типу кто-кому или кому-кто
      var objRelat = this.getNRepMoneyRelat();
      var res = [];
      for (var i in objRelat) {
        var rO = objRelat[i];
        if (rO.nameFrom == this.persFromObj.id && this.radios == 1) res.push(rO);
        if (rO.nameTo == this.persFromObj.id && this.radios == 2) res.push(rO);
      }
      return res;
    },
    getNRepMoneyRelat() { // получение всех денежных отношений дез зеркальных повторов
      var persAdr = this.getPersWithReceipts();
      var allPers = this.$store.getters.PERSONS;
      var res = [];
      for (var i in persAdr) {
        var currReceipt = this.$store.getters.getCheckByName(persAdr[i].id);
        var currProducts = currReceipt.products;
        for (var a in allPers) {
          var sum = 0;
          for (var cP in currProducts) {
            if (currProducts[cP].eatPersons.indexOf(allPers[a].id, 0) != -1) {
              var persLen = currProducts[cP].eatPersons.length;
              sum += currProducts[cP].price / persLen;
            }
          }
          if (sum != 0 && allPers[a].name != persAdr[i].name) {
            res.push({nameFrom: allPers[a].id, nameTo: persAdr[i].id, money: Math.ceil(sum)});
          }
        }
      }
      res = this.checkRepets(res); 
      return res;
    },
    checkRepets(objRelat) { // удаление отношений вида g1-g2 = g2-g1 (повторы)
      let resObjRelat = objRelat.slice(); 
      let addList = [];
      for (let oR of objRelat) {
        let o2L = objRelat.filter(o => o.nameFrom === oR.nameTo && o.nameTo === oR.nameFrom);
        let o2 = o2L[0];
        if (o2 != null) {
          let cond1 = resObjRelat.filter(rO => rO.nameFrom === oR.nameFrom && rO.nameTo === oR.nameTo);
          let cond2 = resObjRelat.filter(rO => rO.nameFrom === oR.nameTo && rO.nameTo === oR.nameFrom);
          if (cond1.length !== 0 || cond2.length !== 0) {
            if (o2.money > oR.money) addList.push({nameFrom: o2.nameFrom, nameTo: o2.nameTo, money: o2.money - oR.money});
            if (oR.money > o2.money) addList.push({nameFrom: oR.nameFrom, nameTo: oR.nameTo, money: oR.money - o2.money});
            resObjRelat = this.removeFromArr(resObjRelat, oR);
            resObjRelat = this.removeFromArr(resObjRelat, o2);
          }
        }
      }
      resObjRelat = resObjRelat.concat(addList);
      return resObjRelat;
    },
    removeFromArr(arr, o) {
      return arr.filter(el => !(el.nameFrom === o.nameFrom && el.nameTo === o.nameTo && el.money === o.money));
    }
  }
};
</script>

<style lang="scss">
  //@import '../scss/variables.scss';
</style>