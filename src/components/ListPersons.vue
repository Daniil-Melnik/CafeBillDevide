<template>
    <v-container>
        <v-table>
          <tr>
            <th>Имя</th>
            <th>Потратил</th>
            <th></th>
          </tr>
          <tr v-for="p in persons" v-bind:key="p.id">
            <td>{{ p.name }}</td>
            <td>{{ this.getPersonTotal(p.name) }}</td>
            <td>
              <v-btn @click="updRemove(p.name)">Удалить</v-btn>
            </td>
          </tr>
        </v-table>
        <v-text-field label="Имя товарища"  v-on:input="this.personInput = $event.target.value"></v-text-field>
        <v-btn @click="updAdd(this.personInput)">Добавить</v-btn>
    </v-container>
  </template>
  <script>
  export default {
    name: 'ListPersons',
    computed: {
      persons() {
        return this.$store.getters.PERSONS;
      }
    },
    data() {
      return {
        personInput: "",
      }
    },
    methods: {
      getPersWithReceipts(){
        return this.$store.getters.getPersWithRec
      },
      updRemove(name){
        this.$store.commit('updRemove', {name: name})
      },
      updAdd(){
        console.log(this.personInput)
        this.$store.commit('updAdd', {name: this.personInput})
      },
      controlText(str){
        this.personInput = str;
      },

      getPersonTotal(name){
        var persWithReceipt = this.getPersWithReceipts();
        var reSum = 0
        for (var i in persWithReceipt){
          var pWR = persWithReceipt[i]
          var currReceipt = this.$store.getters.getCheckByName(pWR);
          for (var p in currReceipt.products){
            var currProd = currReceipt.products[p]
            if (currProd.eatPersons.filter((cP) => cP == name).length != 0){
              var persLen = currProd.eatPersons.length
              reSum += Math.ceil(currProd.price / persLen)
            }
          }
        }
        console.log(name + " " + reSum)
        return reSum;
      },
    }
    
  };
  </script>