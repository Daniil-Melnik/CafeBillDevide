<template>
  <v-card
    variant="tonal"
    class="margin-top-10"
  >
  <div class="width-rec-card height-rec-card">
    <div class="table-row-main">
      <div class="width-70-pers d-flex-column align-content-space-around flex-wrap margin-inpLbl-div">
        <InpLbl
          :maintext="p.prodTitle"
          subtext="Продукт:"
          :id="p.id"
          :rule="is_valid_title"
          :validMethod="isValidTitle"
          hint="Последовательность из букв и цифр"
          type="text"
          dens="default"
          @senddata="setNewTitleRecv"
          class="text-medium margin-left-5"
        >
        </InpLbl>
        <InpLbl
          :maintext="p.price"
          subtext="Цена (руб):"
          :id="p.id"
          :rule="is_valid_price"
          :validMethod="isValidPrice"
          hint="Не более 50000 рублей"
          type="number"
          @senddata="setNewPriceRecv"
          class="margin-top-35 margin-left-5 text-medium"
        >
        </InpLbl>
      </div>
      <div class="d-flex width-30-pers margin-left-35 margin-top-25 table-rec-list">
        <div>
          <RecTableList
            :eatPersons="p.eatPersons"
            :currPerson="currPerson"
            :prodId="p.id"
          >
          </RecTableList>
          <AddCombo
            :comboItems="notEatPersons(p.id)"
            comboLabel="Выберите человека"
            :addId="p.id"
            @senddata="addEatenPersonRecv"
          >
          </AddCombo>
        </div>
      </div>
    </div>
  </div>
  <div class="del-prod-btn">
    <v-btn @click="remProdSend(p.id)" class="back-color-neon-red color-pale-red hover-btn-red">Удалить</v-btn>
  </div>
  </v-card>
</template>

<script>
import InpLbl from './InpLbl.vue'
import AddCombo from './AddCombo.vue'
import RecTableList from './RecTableList.vue'

export default {
  name: 'TableRow',

  props: ['p', 'currPerson'],

  data(){
    return{
      is_valid_price: [
        value => {
          var re = /^[0-9]+$/
          if (!re.test(value) || value > 50000){
            return 'Недопустимое значение'
          }
        },
      ],

      is_valid_title: [
        value => {
          var re = /^[\u0400-\u04FF0-9A-Za-z ]+$/
          if (!re.test(value)){
            return 'Недопустимое название'
          }
        },
      ],
    }
  },

  methods: {

    isValidTitle(value){
      var re = /^[\u0400-\u04FF0-9A-Za-z ]+$/
      return re.test(value)
    },

    isValidPrice(value){
      var re = /^[0-9]+$/
      return re.test(value)
    },

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
@import '../scss/_top.scss';
</style>