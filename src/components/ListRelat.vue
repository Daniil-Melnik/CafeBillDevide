<template>
    <v-container>
        <h2>Кто кому что должен</h2>
        <v-table>
          <thead>
            <tr>
              <th>Имя</th>
              <th>Потратил</th>
              <th></th>
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
     }
    }
    
  };
  </script>