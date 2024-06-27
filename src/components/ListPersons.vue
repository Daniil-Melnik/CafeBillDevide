<template>
  <v-container class="list-persons-container1">
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
  </style>