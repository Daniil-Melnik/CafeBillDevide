<template>
  <div>
    <p v-if="this.currPerson != null">{{this.currPerson.name}} Итог: {{ getCheckSum() }}</p>
    <div v-if="this.currCheck == null && this.currPerson != null">
      <h3>Добавить?</h3>
      <v-btn @click="sendPack()">Добавить</v-btn>
    </div>
  </div>
</template>

<script>
  export default {

    name: 'ReceiptHead',

    props: ['currPerson', 'currCheck'],

    data(){
      return {
        
      }
    },
    methods: {
			personsName(){
        var arr = this.$store.getters.PERSONS
        var eArr = []
        for (var i = 0; i < arr.length; i++){
          eArr.push(arr[i].name)
        }
        return eArr
      },

      sendPack(){
        this.$emit('senddata');
      },
      
      getCheckSum(){
        var sum = 0
        if (this.currCheck != null){
          var prodList = this.currCheck.products
          for (var p in this.currCheck.products){
            sum += prodList[p].price;
          }
        }
        return sum;
      },
		}      
  }
</script>