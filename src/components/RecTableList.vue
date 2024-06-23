<template>
  <div>
    <v-list lines="one">
      <v-list-item
        v-for="(pN, ppIndex) in eatPersons"
        :key="ppIndex"
      >
        <v-list-item-content>
          <v-list-item-title>{{ getPersonById(pN).name }}<v-btn @click="remEatenPerson(this.currPerson.id, this.prodId, pN)">Удалить</v-btn></v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
  export default {

    name: 'RecTableList',

    props: ['eatPersons', 'currPerson', 'prodId'],

    data(){
			return {
			}
		},
    methods: {
      sendPack(){
        if (this.isEditable){
          this.$emit('senddata', this.personName, this.id);
        }
        this.isEditable = !this.isEditable
      },

      getPersonById(id){
          return this.$store.getters.getPersonById(id)
      },

      remEatenPerson(checkPersId, prodID, remPersId){
        this.$store.commit('remEatenPerson', {checkName : checkPersId, prodID : prodID, remPersId : remPersId})
      },
		}      
  }
</script>