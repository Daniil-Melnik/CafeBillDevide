<template>
    <div>
      <v-table>
        <tr>
          <th>Имя</th>
          <th>Потратил</th>
          <th></th>
        </tr>
        <tr v-for="(p) in persons" v-bind:key="p.id">
          <td>
            <InpLbl :maintext = p.name
              :id = p.id
              :rule = required_title
              type = "text"
              @senddata = "setNewName">
            </InpLbl>
          </td>
          <td>{{ this.getPersonTotal(p.id) }}</td>
          <td>
            <v-btn @click="updRemove(p.id)">Удалить</v-btn>
          </td>
        </tr>
      </v-table>
    </div>
</template>

<script>
    import InpLbl from './InpLbl.vue';
    export default {
      name: 'PersonTable',

      props: ['persons'],

      data(){
        return {
          required_title: value => !!value || 'Не может быть пустым',
        }
      },
      methods: {
        getPersonTotal(persId){
        var persWithReceipt = this.getPersWithReceipts();
        var reSum = 0
        for (var i in persWithReceipt){
          var pWR = persWithReceipt[i].id
          var currReceipt = this.$store.getters.getCheckByName(pWR);

          for (var p in currReceipt.products){
            var currProd = currReceipt.products[p]
            if (currProd.eatPersons.filter((cP) => cP == persId).length != 0){
              var persLen = currProd.eatPersons.length
              reSum += Math.ceil(currProd.price / persLen)
            }
          }
        }
        return reSum;
      },

      getPersWithReceipts(){
        return this.$store.getters.getPersWithRec
      },

      setNewName(newName, id){
        this.$store.commit('updSetNewName', {newName: newName, id: id})
      },

      updRemove(id){
        this.$store.commit('updRemove', {id: id})
      },
      },
      
      components: {
        InpLbl,
      }
    }
</script>