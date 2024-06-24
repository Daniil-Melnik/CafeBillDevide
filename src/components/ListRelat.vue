<template>
    <v-container>
        <h2>Распределение {{checkboxLbl }}</h2>
        <RadioSelect
          @senddata= "updLabelsRecv"
        >
        </RadioSelect>
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
  import RadioSelect from './RadioSelect.vue'
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
     updLabelsRecv(radios){
      this.radios = radios
      this.checkboxLbl = (radios == 1) ? ": Кто должен" : ": Кому должны"
      this.tableLbl = (radios == 1) ? "Кому" : "Кто"
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
      RelatTable,
      RadioSelect
    }
  };
  </script>