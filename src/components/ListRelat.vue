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
              <tr v-for="(pMR, index) in getMoneyRelat()" :key="index">
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

     getMoneyRelat(){
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
            if (allPers[a].name == this.persFromName && this.radios == 1) res.push({nameFrom : allPers[a].name, nameTo: persAdr[i], money: Math.ceil(sum)})
            if (persAdr[i] == this.persFromName && this.radios == 2) res.push({nameFrom : allPers[a].name, nameTo: persAdr[i], money: Math.ceil(sum)})
          }
        }
      }
      console.log(res);
      return res
     }
    }
    
  };
  </script>