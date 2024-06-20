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

    

     getAllMoneyRelat(){
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
            if (currProducts[cP].eatPersons.indexOf(allPers[a].name, 0) != -1){
              persLen = currProducts[cP].eatPersons.length
              sum += currProducts[cP].price / persLen;
            }
          }
          if (sum != 0 && allPers[a].name != persAdr[i]){
            res.push({nameFrom : allPers[a].name, nameTo: persAdr[i], money: Math.ceil(sum)})
          }
        }
      }
      return res
     },

     getCurrMoneyRelat(){
      var objRelat = this.getAllMoneyRelat();
      var rO = null;
      var res = []
      for (var i in objRelat){
        rO = objRelat[i]
        if (rO.nameFrom == this.persFromName && this.radios == 1) res.push(rO)
        if (rO.nameTo == this.persFromName && this.radios == 2) res.push(rO)
      }
      return res
     },


// Починить
     checkRepets(objRelat){
      var resObjRelat = objRelat
      var o1 = null
      var o2 = null
      // console.log(ob)
      for (var oR in objRelat){
        o1 = objRelat[oR];
        // o2 = objRelat.filter(o => o.nameFrom == o1.nameTo && o.nameTo == o1.nameFrom)
        o2 = objRelat.filter((o) => o.nameFrom == o1.nameTo && o.nameTo == o1.nameFrom)
        // o2 = objRelat.filter((el) => el.nameFrom == 'Илья Планков')
        if (o2[0] != null){
          console.log(o1.nameFrom + ' ' + o1.nameTo)
          console.log(o2[0].nameFrom + ' ' + o2[0].nameTo)
          // console.log (o1)
          // console.log('o2')
          // console.log (o2L[0])
          // if (o2.money > o1.money) resObjRelat.push({nameFrom : o2.nameFrom, nameTo: o2.nameTo, money: o2.money - o1.money})
          // if (o1.money > o2.money) resObjRelat.push({nameFrom : o1.nameFrom, nameTo: o1.nameTo, money: o1.money - o2.money})
          // resObjRelat = resObjRelat.filter( rO => rO.nameFrom != o1.nameFrom && rO.nameTo != o1.nameTo)
          // resObjRelat = resObjRelat.filter( rO => rO.nameFrom != o2.nameFrom && rO.nameTo != o2.nameTo)
        }
      }
      return resObjRelat
    },
    }
    
  };
  </script>