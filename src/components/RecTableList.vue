<template>
  <div class="rec-table-list">
    <v-list lines="one" max-height="150px" class="width-300">
      <v-list-item
        v-for="(pN, ppIndex) in eatPersons"
        :key="ppIndex"
      >
        <v-list-item-content>
          
          <v-list-item-title>
            <v-btn @click="remEatenPerson(currPerson.id, prodId, pN)"
            icon
            rounded="lg"
            class="back-color-neon-red"
            size="x-small">
              <v-icon>
                <img
                  :src="delImage"
                  alt="Удалить"
                  style="width: 30px; height: 30px;"
                  rounded="0"
                />
              </v-icon>
            </v-btn>
            {{ getPersonById(pN).name }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
import delImage from '../assets/delete2-red-3.svg'
export default {
  name: 'RecTableList',

  props: ['eatPersons', 'currPerson', 'prodId'],

  data(){
    return {
      delImage
    }
  },

  methods: {
    getPersonById(id) {
      return this.$store.getters.getPersonById(id);
    },

    remEatenPerson(checkPersId, prodID, remPersId) {
      this.$store.commit('remEatenPerson', { checkName: checkPersId, prodID: prodID, remPersId: remPersId });
    },
  }
}
</script>

<style lang="scss">
@import './variables.scss';
</style>