<template>
    <v-container>
        <v-table>
          <tr>
            <th>ID</th>
            <th>Имя</th>
            <th>Потратил</th>
            <th></th>
          </tr>
          <tr v-for="p in persons" v-bind:key="p.id">
            <td>{{ p.id }}</td>
            <td>{{ p.name }}</td>
            <td>{{ p.totalMoney }}</td>
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
      updRemove(name){
        this.$store.commit('updRemove', {name: name})
      },
      updAdd(){
        console.log(this.personInput)
        this.$store.commit('updAdd', {name: this.personInput})
      },
      controlText(str){
        this.personInput = str;
      }
    }
    
  };
  </script>