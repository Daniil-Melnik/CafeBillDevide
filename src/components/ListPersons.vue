<template>
    <v-container>
        <v-data-table :items="persons"></v-data-table>
    </v-container>
  </template>
  <script>
  export default {
    name: 'ListPersons',
    computed: {
      persons() {
        return this.$store.getters.PERSONS;
      }
    }
  };
  </script>