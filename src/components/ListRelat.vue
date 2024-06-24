<template>
    <v-container>
        <h2>Распределение {{checkboxLbl }}</h2>
        <!-- выделить в коммпонент -->
        <v-radio-group v-model="radios" @update:modelValue="updLabels"> 
          <v-radio label="Кто - кому" value = 1></v-radio>
          <v-radio label="Кому - кто" value= 2 ></v-radio>
        </v-radio-group>
        <div v-if="radios != 0">
          <v-select
            :items="persons()"
            v-model="persFromName"
            @update:modelValue="persFromObj = this.$store.getters.getPersonByName(persFromName)"
            label= "Выберите человека"
          ></v-select>
          <RelatTable
            :persFromObj= "persFromObj"
            :radios= "radios"
            :tableLbl= "tableLbl"
          >
          </RelatTable>
        </div>
    </v-container>
  </template>
  <script>
  import RelatTable from './RelatTable.vue'
  export default {
    name: 'ListRelat',
    computed: {
      
    },
    data() {
      return {
        persFromName: "",
        persFromObj : null,
        radios: 0,
        checkboxLbl: "",
        tableLbl: ""
      }
    },
    methods: {
     updLabels(){
      if (this.radios == 1){
        this.checkboxLbl = ": Кто должен"
        this.tableLbl = "Кому"
      }
      if (this.radios == 2){
        this.checkboxLbl = ": Кому должны"
        this.tableLbl = "Кто"
      }
     },

     persons(){
        var arr = this.$store.getters.PERSONS
        var eArr = [""]
        for (var i = 0; i < arr.length; i++){
          eArr.push(arr[i].name)
        }
        return eArr
      },

    },
    components: {
      RelatTable
    }
  };
  </script>