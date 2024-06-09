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
            prodTitle: "Молоко",
            price: 355,
            eatPersons: ['Алексей Лечов', 'Никита Варданов']
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
