<template>
    <v-container class="d-flex-column">
      <h2 class="header">Чек посетителя</h2>
      <v-select
        :items="personsName()"
        v-model="checkPersName"
        @update:modelValue="onItemChange"
        label="Выберите посетителя"
      ></v-select>
      <ReceiptHead
        :currPerson="currPerson"
        :currCheck="currCheck"
        @senddata="addNewCheckRecv"
      ></ReceiptHead>
      <div class="d-flex justify-space-between">
        <ReceiptTable
        v-if="currCheck != null"
        :currCheck="currCheck"
        :currPerson="currPerson"
        @remProdSend="remProdRecv"
      ></ReceiptTable>
      <AddProdForm
        v-if="currCheck != null"
        @senddata="addNewProdRecv"
      ></AddProdForm>
      </div>
      
    </v-container>
  </template>
  
  <script>
  import ReceiptTable from './ReceiptTable.vue';
  import AddProdForm from './AddProdForm.vue';
  import ReceiptHead from './ReceiptHead.vue';
  export default {
    name: 'ListChecks',
    computed: {
      testTxt() {
        var arr = [];
        if (this.currCheck != null) {
          for (var i = 0; i < this.currCheck.products.length; i++) {
            arr[i] = this.currCheck.products[i].price;
          }
        }
        return arr;
      },
  
      prodTitles() {
        var arr = [];
        if (this.currCheck != null) {
          for (var i = 0; i < this.currCheck.products.length; i++) {
            arr[i] = this.currCheck.products[i].prodTitle;
          }
        }
        return arr;
      }
    },
    data: () => ({
      currPerson: null,
      currCheck: null,
      checkPersName: ""
    }),
  
    methods: {
      personsName() {
        var arr = this.$store.getters.PERSONS;
        var eArr = [];
        for (var i = 0; i < arr.length; i++) {
          eArr.push(arr[i].name);
        }
        return eArr;
      },
  
      onItemChange(value) {
        this.currPerson = this.$store.getters.getPersonByName(value);
        this.currCheck = this.$store.getters.getCheckByName(this.currPerson.id);
      },
  
      addNewProdRecv(newProdPrice, newProdTitle) {
        var check = this.$store.getters.getCheckByName(this.currPerson.id);
        var prodLen = check != null ? check.products.length : 0;
  
        var newID = prodLen != 0 ? check.products[prodLen - 1].id + 1 : 0;
        this.$store.commit('addProdToCheck', {
          newID: newID,
          checkName: this.currPerson.id,
          prodTitle: newProdTitle,
          price: newProdPrice
        });
      },
  
      remProdRecv(id) {
        this.$store.commit('remProdFromCheck', {
          checkName: this.currPerson.id,
          remProdID: id
        });
        this.currCheck = this.$store.getters.getCheckByName(this.currPerson.id);
      },
  
      addNewCheckRecv() {
        this.$store.commit('addNewCheck', {
          checkPersId: this.currPerson.id
        });
        this.currCheck = this.$store.getters.getCheckByName(this.currPerson.id);
      }
    },
  
    components: {
      ReceiptTable,
      AddProdForm,
      ReceiptHead
    }
  };
  </script>
  
  <style lang="scss">
  @import './variables.scss';
  </style>