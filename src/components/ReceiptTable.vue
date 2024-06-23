<template>
  <div>
    <v-table v-if="currCheck != null">
      <thead>
        <tr>
          <th>Продукт</th>
          <th>Цена</th>
          <th>Ели</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(p) in currCheck.products" :key="p.id">
          <td>
            <InpLbl
              :maintext = p.prodTitle
              :id = p.id
              :rule = required_title
              type = "text"
              @senddata = "setNewTitleRecv"
            >
            </InpLbl>
          </td>
          <td>
            <InpLbl
              :maintext = p.price
              :id = p.id
              :rule = required
              type = "number"
              @senddata = "setNewPriceRecv"
            >
            </InpLbl>
          </td>
          <td>
            <RecTableList
              :eatPersons = "p.eatPersons"
              :currPerson = "this.currPerson"
              :prodId = "p.id"
            >
          </RecTableList>
          </td>
          <td>
            <v-select
              :items="notEatPersons(p.id)"
              v-model="selectedPersons[p.id]"
              @update:modelValue="console.log(this.selectedPersons)"
              label="Select an item"
            ></v-select>
            <v-btn @click="addEatenPerson(currPerson.id, p.id, selectedPersons[p.id])">Добавить</v-btn>
          </td>
          <td>
            <v-btn @click="remProdSend(p.id)">Удалить</v-btn>
          </td>
        </tr>
      </tbody>
    </v-table>
  </div>
</template>

<script>
  import InpLbl from './InpLbl.vue'
  import RecTableList from './RecTableList.vue'
    export default {
      name: 'ReceiptTable',

      props: ['currCheck', 'currPerson'],

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
      },

      data(){
        return {
          isTitleEditable: [],
          isPriceEditable: [],
          selectedPersons: [],
        }
      },
      methods: {
        personsId(){
          var arr = this.$store.getters.PERSONS
          var eArr = []
          for (var i = 0; i < arr.length; i++){
            eArr.push(arr[i].id)
          }
          return eArr
        },

        sendPack(){
            this.$emit('senddata', this.textInput);
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

        getPersonById(id){
          return this.$store.getters.getPersonById(id)
        },

        remProdSend(id){
          this.$emit('remProdSend', id);

          var newLen = this.currCheck.products.length;
          this.testTxt = this.testTxt.slice(0, newLen);
        },

        setNewTitleRecv(newTitle, id){
          this.$store.commit('setNewProdTitle', {checkName: this.currPerson.id, setProdID : id, newProdTitle : newTitle})
        },

        setNewPriceRecv(newPrice, id){
          this.$store.commit('setNewPrice', {checkName: this.currPerson.id, setProdID : id, newPrice : Number(newPrice)})
        },
      },

      components: {
        InpLbl,
        RecTableList
      }
    }
</script>