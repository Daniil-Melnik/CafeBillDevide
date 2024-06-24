<template>
  <v-container class="list-persons-container">
    <PersonTable :persons="persons"></PersonTable>
    <SingleForm title="Имя товарища" @senddata="updAdd"></SingleForm>
  </v-container>
</template>
  
<script>
  import PersonTable from './PersonTable.vue';
  import SingleForm from './SingleForm.vue';
  export default {
    name: 'ListPersons',
    computed: {
      persons() {
        return this.$store.getters.PERSONS;
      },
    },
    methods: {
      updAdd(newPers) {
        this.$store.commit('updAdd', { name: newPers });
      },
    },
    components: {
      PersonTable,
      SingleForm,
    },
  };
  </script>
  
  <style lang="scss">
  .list-persons-container {
    padding: 20px;
    background-color: #f5f5f5;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  </style>