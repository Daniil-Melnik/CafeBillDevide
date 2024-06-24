<template>
    <div>
      <v-table>
        <thead>
          <tr>
            <th>{{ tableLbl }}</th>
            <th>Сколько</th>
          </tr>
        </thead>
        <tbody v-if="persFromObj != null">
          <tr v-for="(pMR, index) in getCurrMoneyRelat()" :key="index">
            <td v-if="radios == 1">{{  getPersNameById(pMR.nameTo) }}</td>
            <td v-if="radios == 2">{{ getPersNameById(pMR.nameFrom) }}</td>
            <td>{{ pMR.money }}</td>
          </tr>
        </tbody>
      </v-table>
    </div>
</template>

<script>
  export default {

    name: 'RelatTable',

    props: ['persFromObj', 'radios', 'tableLbl'],

    data(){
      return {
        selectedItem: "",
      }
    },
    methods: {
      getPersWithReceipts(){
        return this.$store.getters.getPersWithRec
      },

      getPersNameById(id){
        var person = this.$store.getters.getPersonById(id);
        return person.name
      },

      getCurrMoneyRelat(){
      var objRelat = this.getNRepMoneyRelat();
      var rO = null;
      var res = []
      for (var i in objRelat){
        rO = objRelat[i]
        if (rO.nameFrom == this.persFromObj.id && this.radios == 1) res.push(rO)
        if (rO.nameTo == this.persFromObj.id && this.radios == 2) res.push(rO)
      }
      return res
    },

    getNRepMoneyRelat(){
      var persAdr = this.getPersWithReceipts()
      var allPers = this.$store.getters.PERSONS;
      var persLen = 0;
      var res = [];
      for (var i in persAdr){
        var currReceipt = this.$store.getters.getCheckByName(persAdr[i].id);
        var currProducts = currReceipt.products
        for (var a in allPers){
          var sum = 0;
          for (var cP in currProducts){
            if (currProducts[cP].eatPersons.indexOf(allPers[a].id, 0) != -1){
              persLen = currProducts[cP].eatPersons.length
              sum += currProducts[cP].price / persLen;
            }
          }
          if (sum != 0 && allPers[a].name != persAdr[i].name){
            res.push({nameFrom : allPers[a].id, nameTo: persAdr[i].id, money: Math.ceil(sum)})
          }
        }
      }
      console.log(res)
      res = this.checkRepets(res) // Очистка от зеркальных пар
      console.log(res)
      return res
     },

     removeFromArr(arr, o){
      return arr.filter(el => !(el.nameFrom === o.nameFrom && el.nameTo === o.nameTo && el.money === o.money));
    },

     checkRepets(objRelat) {
      let resObjRelat = objRelat.slice();  // Создаем копию массива, чтобы не изменять оригинал
      let addList = [];
      let o1 = null;
      let o2 = null;
      let o2L = null;

      for (let oR of objRelat) {
          o1 = oR;
          o2L = objRelat.filter((o) => o.nameFrom === o1.nameTo && o.nameTo === o1.nameFrom);
          o2 = o2L[0];

          if (o2 != null) {
              let cond1 = resObjRelat.filter((rO) => rO.nameFrom === o1.nameFrom && rO.nameTo === o1.nameTo);
              let cond2 = resObjRelat.filter((rO) => rO.nameFrom === o1.nameTo && rO.nameTo === o1.nameFrom);

              if (cond1.length !== 0 || cond2.length !== 0) {
                  if (o2.money > o1.money) addList.push({ nameFrom: o2.nameFrom, nameTo: o2.nameTo, money: o2.money - o1.money });
                  if (o1.money > o2.money) addList.push({ nameFrom: o1.nameFrom, nameTo: o1.nameTo, money: o1.money - o2.money });

                  console.log("****");
                  resObjRelat = this.removeFromArr(resObjRelat, o1);
                  resObjRelat = this.removeFromArr(resObjRelat, o2);
              }
          }
      }
      resObjRelat = resObjRelat.concat(addList);
      return resObjRelat;
    }
		}      
  }
</script>

<!-- <template>
  <div class="relat-table">
    <v-table>
      <thead>
        <tr>
          <th>{{ tableLbl }}</th>
          <th>Сколько</th>
        </tr>
      </thead>
      <tbody v-if="persFromObj != null">
        <tr v-for="(pMR, index) in getCurrMoneyRelat()" :key="index">
          <td class="left-td" v-if="radios == 1">{{ getPersNameById(pMR.nameTo) }}</td>
          <td class="left-td" v-if="radios == 2">{{ getPersNameById(pMR.nameFrom) }}</td>
          <td class="right-td">{{ pMR.money }}</td>
        </tr>
      </tbody>
    </v-table>
  </div>
</template>

<script>
export default {
  name: 'RelatTable',
  props: ['persFromObj', 'radios', 'tableLbl'],
  methods: {
    getPersWithReceipts(){
      return this.$store.getters.getPersWithRec
    },
    getPersNameById(id) {
      var person = this.$store.getters.getPersonById(id);
      return person.name;
    },
    getCurrMoneyRelat() {
      var objRelat = this.getNRepMoneyRelat();
      var res = [];
      for (var i in objRelat) {
        var rO = objRelat[i];
        if (rO.nameFrom == this.persFromObj.id && this.radios == 1) res.push(rO);
        if (rO.nameTo == this.persFromObj.id && this.radios == 2) res.push(rO);
      }
      return res;
    },
    getNRepMoneyRelat() {
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
    checkRepets(objRelat) {
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
.relat-table {
  margin-top: 20px;
  width: 100%;

  .right-td{
    width: 20%;
    background-color: #3498db;
  }

  .left-td{
    width: 80%;
    background-color: aliceblue;
  }

  .v-table {
    width: 100%;
    th, td {
      padding: 15px;
      text-align: left;
      font-size: 16px;
    }
    th {
      background-color: #3498db;
      color: #fff;
    }
    td {
      background-color: #f9f9f9;
    }
  }
}
</style> -->