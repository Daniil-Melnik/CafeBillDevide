import { createStore } from 'vuex'

export default createStore({
  state: {
    persons: [
      {name : "Илья Планков", totalMoney: 2550},
      {name : "Алексей Лечов", totalMoney: 50},
      {name : "Никита Варданов", totalMoney: 850}
    ],

    checks: [
      {
        person: "Илья Планков",
        products: [
          {
            id: 0,
            prodTitle: "Молоко",
            price: 355,
            eatPersons: ['Алексей Лечов', 'Никита Варданов']
          },

          {
            id: 1,
            prodTitle: "Вода",
            price: 53,
            eatPersons: ['Алексей Лечов', 'Илья Планков']
          }
        ]
      }
    ]
  },
  getters: {
    PERSONS: state => {
      return state.persons;
    },

    getPersonByName: (state) => (name) => {
      return state.persons.find(person => person.name === name);
    },

    getCheckByName: (state) => (person) => {
      return state.checks.find(check => check.person === person);
    },
  },

  mutations: {
    updAdd(state, data){
      state.persons.push({name : data.name, totalMoney: 0})
    },
    updRemove(state, data){
      state.persons = state.persons.filter(p => p.name != data.name)
    },

    addEatenPerson(state, data){
      var i = 0;
      var j = 0;
      while ((state.checks[i].person != data.person) && (i < state.checks.length)){
        i++
      }

      if (state.checks[i].person == data.person){
        while ((state.checks[i].products[j].prodTitle != data.prodTitle) && (j < state.checks[i].products.length)){
          j++;
        }
        if (state.checks[i].products[data.index].eatPersons.filter(p => p.name != data.name).length == 0){
          state.checks[i].products[data.index].eatPersons.push(data.name)
        }
        // if (state.checks[i].products[j].prodTitle == data.prodTitle){
        //   if (state.checks[i].products[j].eatPersons.filter(p => p.name != data.name).length == 0){
        //     state.checks[i].products[j].eatPersons.push(data.name)
        //   }
        // }
      }
    }
  },

  actions: {
  },
  modules: {
  },

  getCheck(person){
    return this.state.checks.filter(ch => ch.person != person)
  },

})
