<template>
  <div>
    <tr>
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
  </div>
</template>

<script>
  import InpLbl from './InpLbl.vue'
  import AddCombo from './AddCombo.vue'
  import RecTableList from './RecTableList.vue'
  export default {
    name: 'TableRow',

    props: ['p', 'currPerson'],

    data(){
      return {
        
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

      setNewTitleRecv(newTitle, id){
        this.$store.commit('setNewProdTitle', {checkName: this.currPerson.id, setProdID : id, newProdTitle : newTitle})
      },

      setNewPriceRecv(newPrice, id){
        this.$store.commit('setNewPrice', {checkName: this.currPerson.id, setProdID : id, newPrice : Number(newPrice)})
      },

      addEatenPersonRecv(prodID, addPersName){
        this.$store.commit('addEatenPerson', {checkPersId : this.currPerson.id, prodID : prodID, addPersName : addPersName})
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

      remProdSend(id){
          this.$emit('remProdSend', id);
        },
    },

    components: {
      InpLbl,
      RecTableList,
      AddCombo
    }
  }
</script>