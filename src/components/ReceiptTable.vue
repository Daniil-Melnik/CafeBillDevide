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
            <AddCombo
              :comboItems= "notEatPersons(p.id)"
              comboLabel= "Выберите человека"
              :addId= "p.id"
              @senddata= "addEatenPersonRecv"
            ></AddCombo>
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
  import AddCombo from './AddCombo.vue'
    export default {
      name: 'ReceiptTable',

      props: ['currCheck', 'currPerson'],

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
        },

        setNewTitleRecv(newTitle, id){
          this.$store.commit('setNewProdTitle', {checkName: this.currPerson.id, setProdID : id, newProdTitle : newTitle})
        },

        setNewPriceRecv(newPrice, id){
          this.$store.commit('setNewPrice', {checkName: this.currPerson.id, setProdID : id, newPrice : Number(newPrice)})
        },

        addEatenPersonRecv(prodID, addPersName){
          this.$store.commit('addEatenPerson', {checkPersId : this.currPerson.id, prodID : prodID, addPersName : addPersName})
        },
      },

      components: {
        InpLbl,
        RecTableList,
        AddCombo
      }
    }
</script>