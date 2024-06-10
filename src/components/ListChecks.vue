<template>
  <v-container>
    <h2 class="text-center text-h3 py-3">Чек посетителя</h2>
    <v-select
      :items="persons()"
      v-model="selectedItem"
      @update:modelValue="onItemChange"
      label="Select an item"
    ></v-select>
    <p>{{this.currPerson.name}}</p>

    <v-table>
      <thead>
        <tr>
          <th>Продукт</th>
          <th>Цена</th>
          <th>Ели</th>
          <th></th>
        </tr>
      </thead>
      <tbody v-if="this.currCheck != null">
        <tr v-for="(p, index) in currCheck.products" :key="p.id">
          <td>{{ p.prodTitle }}</td>
          <td>{{ p.price }}</td>
          <td>
            <v-list-item
              v-for="(pp, ppIndex) in p.eatPersons"
              :key="ppIndex"
            >
              <v-list-item-content>
                <v-list-item-title>{{ pp }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </td>
          <td>
            <v-select
              :items="persons()"
              v-model="selectedPersons[p.id]"
              @update:modelValue="console.log(this.selectedPersons)"
              label="Select an item"
            ></v-select>
          </td>
          <td><v-btn >Добавить</v-btn></td>
          <!-- @click="" -->
        </tr>
      </tbody>
    </v-table>
  </v-container>
</template>
  <script>
  export default {
    name: 'ListChecks',
    computed: () => ({
      
    }),
    data: () => ({
      currPerson : {name: ""},
      currCheck : {person: ""},
      selectedItem: null,
      addPersons : [],
      selectedPersons: []
    }),

    methods: {
      persons(){
        var arr = this.$store.getters.PERSONS
        var eArr = []
        for (var i = 0; i < arr.length; i++){
          eArr.push(arr[i].name)
        }
        return eArr
      },

      onItemChange(value) {
        this.currPerson = this.$store.getters.getPersonByName(value)
        this.currCheck = this.$store.getters.getCheckByName(value)
        console.log('Selected item:', value);
      },

      onChange(event) {
          console.log(event.target.value)
      },
    },
  }
  </script>