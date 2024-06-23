<template>
    <v-container>
      <PersonTable 
        :persons="persons">
      </PersonTable>
        <!-- <v-text-field label="Имя товарища"  v-on:input="this.personInput = $event.target.value"></v-text-field>
        <v-btn @click="updAdd(this.personInput)">Добавить</v-btn> -->
      <SingleForm
        :title = title
        @senddata = "updAdd"
      ></SingleForm>
    </v-container>
  </template>
  <script>
  import PersonTable from './PersonTable.vue';
  import SingleForm from './SingleForm.vue'
  export default {
    name: 'ListPersons',
    computed: {
      persons() {
        return this.$store.getters.PERSONS;
      },
    },
    data() {
      return {
        title: "Имя товарища"
      }
    },
    methods: {
      updAdd(newPers){
        this.$store.commit('updAdd', {name: newPers})
      },
    },

    components: {
      PersonTable,
      SingleForm
    }
    
  };
  </script>