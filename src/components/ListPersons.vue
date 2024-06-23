<template>
    <v-container>
      <PersonTable 
        :persons="persons">
      </PersonTable>
        <v-text-field label="Имя товарища"  v-on:input="this.personInput = $event.target.value"></v-text-field>
        <v-btn @click="updAdd(this.personInput)">Добавить</v-btn>
    </v-container>
  </template>
  <script>
  import PersonTable from './PersonTable.vue';
  export default {
    name: 'ListPersons',
    computed: {
      persons() {
        return this.$store.getters.PERSONS;
      },
    },
    data() {
      return {
        personInput: "",
      }
    },
    methods: {
      updAdd(){
        this.$store.commit('updAdd', {name: this.personInput})
        console.log(this.$store.getters.PERSONS)
      },
    },

    components: {
      PersonTable
    }
    
  };
  </script>