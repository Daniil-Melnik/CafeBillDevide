<template>
  <div>
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
        min = 0
        max = 50000
        v-model="newProdPrice"
      ></v-number-input>
      <v-btn class="mt-2" @click="sendPack()" block>Добавить</v-btn>
    </v-form>
  </div>
</template>

<script>
  export default {

    name: 'AddProdForm',

    props: [],

    data(){
      return {
        newProdTitle: "",
        newProdPrice: 0
      }
    },
    methods: {
			sendPack(){
        this.$emit('senddata', this.newProdPrice, this.newProdTitle);
      },
		}      
  }
</script>