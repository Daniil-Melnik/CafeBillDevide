<template>
  <v-card
    title="Карточка продукта"
    variant="tonal"
    class="margin-top-10"
  >
    <InpLbl
      :maintext="p.prodTitle"
      subtext="Название продукта:"
      :id="p.id"
      :rule="required_title"
      type="text"
      @senddata="setNewTitleRecv"
    ></InpLbl>
    <InpLbl
      :maintext="p.price"
      subtext="Цена:"
      :id="p.id"
      :rule="required"
      type="number"
      @senddata="setNewPriceRecv"
    ></InpLbl>
    <RecTableList
      :eatPersons="p.eatPersons"
      :currPerson="currPerson"
      :prodId="p.id"
    ></RecTableList>
    <AddCombo
      :comboItems="notEatPersons(p.id)"
      comboLabel="Выберите человека"
      :addId="p.id"
      @senddata="addEatenPersonRecv"
    ></AddCombo>
    <v-btn @click="remProdSend(p.id)">Удалить</v-btn>
  </v-card>
</template>

<script>
import InpLbl from './InpLbl.vue'
import AddCombo from './AddCombo.vue'
import RecTableList from './RecTableList.vue'

export default {
  name: 'TableRow',

  props: ['p', 'currPerson'],

  methods: {

    setNewTitleRecv(newTitle, id) {
      this.$store.commit('setNewProdTitle', { checkName: this.currPerson.id, setProdID: id, newProdTitle: newTitle });
    },

    setNewPriceRecv(newPrice, id) {
      this.$store.commit('setNewPrice', { checkName: this.currPerson.id, setProdID: id, newPrice: Number(newPrice) });
    },

    addEatenPersonRecv(prodID, addPersName) {
      this.$store.commit('addEatenPerson', { checkPersId: this.currPerson.id, prodID: prodID, addPersName: addPersName });
    },

    remProdSend(id) {
      this.$emit('remProdSend', id);
    },

    personsId() {
      return this.$store.getters.PERSONS.map(person => person.id);
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
  },

  components: {
    InpLbl,
    RecTableList,
    AddCombo
  }
}
</script>

<style lang="scss">
@import './variables.scss';
</style>