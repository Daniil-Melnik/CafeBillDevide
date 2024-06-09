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
    methods: {
      updRemove(name){
        this.$store.commit('updRemove', {name: name})
      }
    }
    
  };
  </script>