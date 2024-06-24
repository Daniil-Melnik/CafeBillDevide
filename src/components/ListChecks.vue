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
      personsId(){
        var arr = this.$store.getters.PERSONS
        var eArr = []
        for (var i = 0; i < arr.length; i++){
          eArr.push(arr[i].id)
        }
        return eArr
      },

      personsName(){
        var arr = this.$store.getters.PERSONS
        var eArr = []
        for (var i = 0; i < arr.length; i++){
          eArr.push(arr[i].name)
        }
        return eArr
      },

      notEatPersons(prodID){
        var eatPersons = this.$store.getters.getCheckProductById(this.currPerson.id, prodID);
        var allPersons = this.personsId();
        var notEatPersId = allPersons.filter((el) => !eatPersons.includes(el))
        var notEatPers = []
        for (var i in notEatPersId){
          var newPers = this.$store.getters.getPersonById(notEatPersId[i])
          notEatPers.push(newPers.name)
        }
        return notEatPers
      },

      onItemChange(value) {
        this.currPerson = this.$store.getters.getPersonByName(value)
        this.currCheck = this.$store.getters.getCheckByName(this.currPerson.id)
      },

      addEatenPerson(checkPersId, prodID, addPersName){
        this.$store.commit('addEatenPerson', {checkPersId : checkPersId, prodID : prodID, addPersName : addPersName})
      },

      remEatenPerson(checkPersId, prodID, remPersId){
        this.$store.commit('remEatenPerson', {checkName : checkPersId, prodID : prodID, remPersId : remPersId})
        // console.log(checkName + " " + prodID + " " + remPersName)
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

      setNewPrice(id){
        this.$store.commit('setNewPrice', {checkName: this.checkPersName, setProdID : id, newPrice : this.testTxt[id]})
      },

      setNewTitle(id){
        this.$store.commit('setNewProdTitle', {checkName: this.checkPersName, setProdID : id, newProdTitle : this.prodTitles[id]})
      },

      onChange(event) {
          console.log(event.target.value)
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