<template>
  <v-container>
    <h2 class="text-center text-h3 py-3">Чек посетителя</h2>
    <v-select
      :items="personsName()"
      v-model="checkPersName"
      @update:modelValue="onItemChange"
      label="Select an item"
    ></v-select>
    <p v-if="this.currPerson != null">{{this.currPerson.name}} Итог: {{ getCheckSum() }}</p>
    <ReceiptTable
      v-if = "currCheck != null"
      :currCheck = "currCheck"
      :currPerson = "currPerson"
      @remProdSend = "remProdRecv"
    >
    </ReceiptTable>
    <div v-if="this.currCheck == null && this.currPerson != null">
      <h3>Добавить?</h3>
      <v-btn @click="addNewCheck()">Добавить</v-btn>
    </div>
 
    <v-form fast-fail @submit.prevent v-if="currCheck != null">
      <v-text-field
        v-model="newProdTitle"
        label="Новый продукт"
      ></v-text-field>

      <v-number-input
      :reverse="false"
      controlVariant="split"
      label="Цена"
      :hideInput="false"
      :inset="false"
      min = 0
      max = 50000
      v-model="newProdPrice"
    ></v-number-input>
      <v-btn class="mt-2" @click="addNewProd()" block>Добавить</v-btn>
    </v-form>
  </v-container>
</template>
  <script>
  import ReceiptTable from './ReceiptTable.vue'
  export default {
    name: 'ListChecks',
    computed: {
      testTxt() {
        var arr = []
        if (this.currCheck != null){
          for (var i = 0; i < this.currCheck.products.length; i++){
            arr[i] = this.currCheck.products[i].price
          }
        }
        return arr
      },

      prodTitles(){
        var arr = []
        if (this.currCheck != null){
          for (var i = 0; i < this.currCheck.products.length; i++){
            arr[i] = this.currCheck.products[i].prodTitle
          }
        }
        return arr
      }
    },
    data: () => ({
      currPerson : null,
      currCheck : null,
      checkPersName: null,
      addPersons : [],
      selectedPersons: [],
      isPriceEditable: [],
      isTitleEditable: [],
      newProdTitle: "",
      newProdPrice: 0,

      rules: {
        required: value => !!value || 'Должно быть число',
        required_title: value => !!value || 'Не может быть пустым',
      },
    }),

    methods: {
      personsName(){
        var arr = this.$store.getters.PERSONS
        var eArr = []
        for (var i = 0; i < arr.length; i++){
          eArr.push(arr[i].name)
        }
        return eArr
      },

      onItemChange(value) {
        this.currPerson = this.$store.getters.getPersonByName(value)
        this.currCheck = this.$store.getters.getCheckByName(this.currPerson.id)
      },

      addNewProd(){
        var check = this.$store.getters.getCheckByName(this.currPerson.id)
        var prodLen = check != null ? check.products.length : 0
        
        var newID = prodLen != 0 ? check.products[prodLen - 1].id + 1 : 0
        this.$store.commit('addProdToCheck', {newID: newID, checkName: this.currPerson.id, prodTitle : this.newProdTitle, price: this.newProdPrice})
      },

      remProdRecv(id){
        this.$store.commit('remProdFromCheck', {checkName: this.currPerson.id, remProdID : id})
        this.currCheck = this.$store.getters.getCheckByName(this.currPerson.id)
      },

      addNewCheck(){
        this.$store.commit('addNewCheck', {checkPersId: this.currPerson.id})
        this.currCheck = this.$store.getters.getCheckByName(this.currPerson.id)
      },

      getCheckSum(){
        var sum = 0
        if (this.currCheck != null){
          var prodList = this.currCheck.products
          for (var p in this.currCheck.products){
            sum += prodList[p].price;
          }
        }
        return sum;
      },

      getPersonById(id){
        return this.$store.getters.getPersonById(id)
      }
    },

    components: {
      ReceiptTable
    }
  }
  </script>