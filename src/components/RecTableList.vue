<template>
  <div class="rec-table-list">
    <v-list lines="one">
      <v-list-item
        v-for="(pN, ppIndex) in eatPersons"
        :key="ppIndex"
      >
        <v-list-item-content>
          <v-list-item-title>
            {{ getPersonById(pN).name }}
            <v-btn @click="remEatenPerson(currPerson.id, prodId, pN)">Удалить</v-btn>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
export default {
  name: 'RecTableList',

  props: ['eatPersons', 'currPerson', 'prodId'],

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

.rec-table-list {
  .v-list-item {
    padding: $padding;
    .v-btn {
      background-color: $primary-color;
      color: $text-color;
      border-radius: $border-radius;
      &:hover {
        background-color: darken($primary-color, 10%);
      }
    }
  }
}
</style>