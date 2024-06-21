<template>
    <v-container>
        <h2>Распределение {{checkboxLbl }}</h2>
        <v-radio-group v-model="radios" @update:modelValue="updLabels">
          <v-radio label="Кто - кому" value = 1></v-radio>
          <v-radio label="Кому - кто" value= 2 ></v-radio>
        </v-radio-group>
        <div v-if="radios != 0">
          <v-select
            :items="persons()"
            v-model="persFromName"
            @update:modelValue="null"
            label= "Выберите человека"
          ></v-select>
          <v-table>
            <thead>
              <tr>
                <th>{{ tableLbl }}</th>
                <th>Сколько</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(pMR, index) in getCurrMoneyRelat()" :key="index">
                <td v-if="radios == 1">{{ pMR.nameTo }}</td>
                <td v-if="radios == 2">{{ pMR.nameFrom }}</td>
                <td>{{ pMR.money }}</td>
              </tr>
            </tbody>
          </v-table>
        </div>
    </v-container>
  </template>
  <script>
  export default {
    name: 'ListRelat',
    computed: {
      
    },
    data() {
      return {
        persFromName: "",
        radios: 0,
        checkboxLbl: "",
        tableLbl: ""
      }
    },
    methods: {
     getPersWithReceipts(){
        return this.$store.getters.getPersWithRec
     },

     updLabels(){
      if (this.radios == 1){
        this.checkboxLbl = ": Кто должен"
        this.tableLbl = "Кому"
      }
      if (this.radios == 2){
        this.checkboxLbl = ": Кому должны"
        this.tableLbl = "Кто"
      }
     },

     persons(){
        var arr = this.$store.getters.PERSONS
        var eArr = [""]
        for (var i = 0; i < arr.length; i++){
          eArr.push(arr[i].name)
        }
        return eArr
      },

     getNRepMoneyRelat(){
      var persAdr = this.getPersWithReceipts();
      var allPers = this.$store.getters.PERSONS;
      var persLen = 0;
      var res = [];
      for (var i in persAdr){
        var currReceipt = this.$store.getters.getCheckByName(persAdr[i]);
        var currProducts = currReceipt.products
        for (var a in allPers){
          var sum = 0;
          for (var cP in currProducts){
            if (currProducts[cP].eatPersons.indexOf(allPers[a].id, 0) != -1){
              persLen = currProducts[cP].eatPersons.length
              sum += currProducts[cP].price / persLen;
            }
          }
          if (sum != 0 && allPers[a].name != persAdr[i]){
            res.push({nameFrom : allPers[a].name, nameTo: persAdr[i], money: Math.ceil(sum)})
          }
        }
      }
      console.log(res)
      res = this.checkRepets(res) // Очистка от зеркальных пар
      console.log(res)
      return res
     },


     getCurrMoneyRelat(){
      var objRelat = this.getNRepMoneyRelat();
      var rO = null;
      var res = []
      for (var i in objRelat){
        rO = objRelat[i]
        if (rO.nameFrom == this.persFromName && this.radios == 1) res.push(rO)
        if (rO.nameTo == this.persFromName && this.radios == 2) res.push(rO)
      }
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
  };
  </script>