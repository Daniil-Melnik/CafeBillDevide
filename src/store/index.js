import { createStore } from 'vuex'

export default createStore({
  state: {
    persons: [
      {id: 1, name : "Илья Планков", totalMoney: 2550},
      {id: 2, name : "Алексей Лечов", totalMoney: 50},
      {id: 3, name : "Никита Варданов", totalMoney: 850}
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
      while ((state.checks[i].person != data.checkName) && (i < state.checks.length)){
        i++
      }

      if (state.checks[i].person == data.checkName){
        if (state.checks[i].products[data.prodID].eatPersons.filter(p => p == data.addPersName).length == 0){
          state.checks[i].products[data.prodID].eatPersons.push(data.addPersName)
        }
      }
    },

    remEatenPerson(state, data){
      var i = 0;
      while ((state.checks[i].person != data.checkName) && (i < state.checks.length)){
        i++
      }

      if (state.checks[i].person == data.checkName){
        if (state.checks[i].products[data.prodID].eatPersons.filter(p => p == data.remPersName).length != 0){
          state.checks[i].products[data.prodID].eatPersons = state.checks[i].products[data.prodID].eatPersons.filter(p => p != data.remPersName)
        }
      }
    },

    addProdToCheck(state, data){
      var i = 0;
      while ((state.checks[i].person != data.checkName) && (i < state.checks.length)){
        i++;
      }

      if (state.checks[i].person == data.checkName){
        state.checks[i].products.push({id: data.newID, prodTitle: data.prodTitle, price: data.price, eatPersons: []})
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
