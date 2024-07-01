<!-- Компонент-СТРАНИЦА для просмотра посетителей -->
<template>
  <v-container class="d-flex flex-column justify-center align-center">
    <PersonTable :persons="persons"></PersonTable>
    <SingleForm title="Имя посетителя" @senddata="updAdd"></SingleForm>
    <p></p>
  </v-container>
</template>
  
<script>
  import PersonTable from './PersonTable.vue';
  import SingleForm from './SingleForm.vue';
  export default {
    name: 'ListPersons',
    computed: {
      persons() { // список посетителей
        return this.$store.getters.PERSONS;
      },
    },
    methods: {
      updAdd(newPers) { // перехват для добавления посетителя
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