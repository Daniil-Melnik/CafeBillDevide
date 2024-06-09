<template>
  <v-container>
    <h2 class="text-center text-h3 py-3">Чек посетителя</h2>
    <v-select
      :items="persons()"
      v-model="selectedItem"
      @update:modelValue="onItemChange"
      label="Select an item"
    ></v-select>
    <p>{{this.currPerson.name}}</p>
  </v-container>
</template>
  <script>
  export default {
    name: 'ListChecks',
    computed: () => ({

    }),
    data: () => ({
     currPerson : {name: "AAAA"},
     selectedItem: null
    }),

    methods: {
      persons(){
        var arr = this.$store.getters.PERSONS
        var eArr = []
        for (var i = 0; i < arr.length; i++){
          eArr.push(arr[i].name)
        }
        return eArr
      },

      onItemChange(value) {
        this.currPerson = this.$store.getters.getPersonByName(value)
        
        console.log('Selected item:', this.currPerson);
      },

      onChange(event) {
          console.log(event.target.value)
      }
    },
  }
  </script>