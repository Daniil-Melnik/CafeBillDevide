<template>
  <v-container>
    <h2 class="text-center text-h3 py-3">Чек посетителя</h2>
    <v-select
      :items="persons()"
      v-model="checkPersName"
      @update:modelValue="onItemChange"
      label="Select an item"
    ></v-select>
    <p>{{this.currPerson.name}}</p>

    <v-table>
      <thead>
        <tr>
          <th>Продукт</th>
          <th>Цена</th>
          <th>Ели</th>
          <th></th>
        </tr>
      </thead>
      <tbody v-if="this.currCheck != null">
        <tr v-for="(p) in currCheck.products" :key="p.id">
          <td>
            <v-text-field
              v-if="isTitleEditable[p.id]"
              label="" v-model="prodTitles[p.id]"
              v-on:input="setNewTitle(p.id)"
              :rules="[rules.required_title]">
            </v-text-field>
            <p v-else>{{ prodTitles[p.id] }}</p>
            <v-btn @click="isTitleEditable[p.id] = !isTitleEditable[p.id]">Редактировать</v-btn>
          </td> <!-- Продолжить добавление редактирования-->
          <td><v-text-field
            v-if="isPriceEditable[p.id]"
            label="" v-model="testTxt[p.id]"
            v-on:input="setNewPrice(p.id)"
            :rules="[rules.required]"
            type="number">
          </v-text-field>
          <p v-else>{{p.price}}</p>
          <v-btn @click="isPriceEditable[p.id] = !isPriceEditable[p.id]">Редактировать</v-btn>
        </td>
          <td>
            <v-list-item
              v-for="(pN, ppIndex) in p.eatPersons"
              :key="ppIndex"
            >
              <v-list-item-content>
                <v-list-item-title>{{ pN }}<v-btn @click="remEatenPerson(checkPersName, p.id, pN)">Удалить</v-btn></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </td>
          <td>
            <v-select
              :items="persons()"
              v-model="selectedPersons[p.id]"
              @update:modelValue="console.log(this.selectedPersons)"
              label="Select an item"
            ></v-select>
            <v-btn @click="addEatenPerson(checkPersName, p.id, selectedPersons[p.id])">Добавить</v-btn>
          </td>
          <td><v-btn @click="remProd(p.id)">Удалить</v-btn></td>
        </tr>
      </tbody>
    </v-table>
 
    <v-form fast-fail @submit.prevent>
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
      min="0"
      max="50000"
      v-model="newProdPrice"
    ></v-number-input>
      <v-btn class="mt-2" @click="addNewProd()" block>Добавить</v-btn>
    </v-form>
  </v-container>
</template>
  <script>
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
      currPerson : {name: ""},
      currCheck : {person: ""},
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
        this.currCheck = this.$store.getters.getCheckByName(value)
        console.log('Selected item:', value);
      },

      addEatenPerson(checkName, prodID, addPersName){
        this.$store.commit('addEatenPerson', {checkName : checkName, prodID : prodID, addPersName : addPersName})
      },

      remEatenPerson(checkName, prodID, remPersName){
        this.$store.commit('remEatenPerson', {checkName : checkName, prodID : prodID, remPersName : remPersName})
        // console.log(checkName + " " + prodID + " " + remPersName)
      },

      addNewProd(){
        var prodLen = this.$store.getters.getCheckByName(this.checkPersName).products.length
        
        var newID = prodLen != 0 ? this.$store.getters.getCheckByName(this.checkPersName).products[prodLen - 1].id + 1 : 0
        this.$store.commit('addProdToCheck', {newID: newID, checkName: this.checkPersName, prodTitle : this.newProdTitle, price: this.newProdPrice})
        // console.log(this.newProdTitle + " " + this.newProdPrice)
      },

      remProd(id){
        this.$store.commit('remProdFromCheck', {checkName: this.checkPersName, remProdID : id})
        this.currCheck = this.$store.getters.getCheckByName(this.checkPersName)
        var newLen = this.currCheck.products.length;
        this.testTxt = this.testTxt.slice(0, newLen);
        this.prodTitles = this.prodTitles.slice(0, newLen)
      },

      setNewPrice(id){
        this.$store.commit('setNewPrice', {checkName: this.checkPersName, setProdID : id, newPrice : this.testTxt[id]})
        // console.log(this.checkPersName + " " + id + " " + this.testTxt[id])
      },

      setNewTitle(id){
        this.$store.commit('setNewProdTitle', {checkName: this.checkPersName, setProdID : id, newProdTitle : this.prodTitles[id]})
      },

      onChange(event) {
          console.log(event.target.value)
      },
    },
  }
  </script>