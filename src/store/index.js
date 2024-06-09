import { createStore } from 'vuex'

export default createStore({
  state: {
    persons: [
      {name : "Илья Планков", totalMoney: 2550},
      {name : "Алексей Лечов", totalMoney: 50},
      {name : "Никита Варданов", totalMoney: 850}
    ]
  },
  getters: {
    PERSONS: state => {
      return state.persons;
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
  }
})
