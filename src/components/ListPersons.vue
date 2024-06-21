<template>
    <v-container>
        <v-table>
          <tr>
            <th>Имя</th>
            <th>Потратил</th>
            <th></th>
          </tr>
          <tr v-for="(p, index) in persons" v-bind:key="index">
            <td>
              <v-text-field
                v-if="isNameEditable[index]"
                label="" v-model="personsName[index]"
                v-on:input="setNewName(p.name, index)"
                :rules="[rules.required_title]">
              </v-text-field>
              <p v-else>{{ personsName[index] }}</p>
              <v-btn @click="isNameEditable[index] = !isNameEditable[index]">Редактировать</v-btn>
            </td>

            <td>{{ this.getPersonTotal(personsName[index]) }}</td>
            <td>
              <v-btn @click="updRemove(personsName[index])">Удалить</v-btn>
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
      },

      personsName(){
        var persons = this.$store.getters.PERSONS;
        var res = []
        for (var p in persons){
          res.push(persons[p].name)
        }
        return res
      }
    },
    data() {
      return {
        personInput: "",
        isNameEditable : [],

        rules: {
          required: value => !!value || 'Должно быть число',
          required_title: value => !!value || 'Не может быть пустым',
        },
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

      setNewName(oldName, index){
        this.$store.commit('updSetNewName', {newName: this.personsName[index], oldName: oldName})
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