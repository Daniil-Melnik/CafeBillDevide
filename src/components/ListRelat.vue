<template>
    <v-container>
        <h2>Кто кому что должен</h2>
        <v-table>
          <thead>
            <tr>
              <th>Кто</th>
              <th>Кому</th>
              <th>Сколько</th>
            </tr>
          </thead>
          <tbody v-for="(pC, index) in getPersWithReceipts()" :key="index">
            <tr v-for="p in 3" v-bind:key="p">
              <td>{{ pC }}</td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </v-table>
        <p>{{ getMoneyRelat() }}</p>
    </v-container>
  </template>
  <script>
  export default {
    name: 'ListRelat',
    computed: {
      
    },
    data() {
      return {
        
      }
    },
    methods: {
     getPersWithReceipts(){
        return this.$store.getters.getPersWithRec
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
          res.push({nameFrom : allPers[a].name, nameTo: persAdr[i], money: sum})
        }
      }
      console.log(res);
      return 1;
     }
    }
    
  };
  </script>