<template>
  <v-container>
    <h2 class="text-center text-h3 py-3">Чек посетителя</h2>
    <v-combobox
        label="Посетитель"
        :items="persons()"
    ></v-combobox>
  </v-container>
</template>
  <script>
  export default {
    name: 'ListChecks',
    computed: () => ({

    }),
    data: () => ({
     
    }),

    methods: {
      persons(){
        var arr = this.$store.getters.PERSONS
        var eArr = []
        for (var i = 0; i < arr.length; i++){
          eArr.push(arr[i].name)
        }
        return eArr
      }
    },
  }
  </script>