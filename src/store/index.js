import { createStore } from 'vuex'

export default createStore({
  state: {
    persons: [
      {id: 1, name : "Илья Планков", totalMoney: 2550},
      {id: 2, name : "Алексей Лечов", totalMoney: 50},
      {id: 3, name : "Никита Варданов", totalMoney: 850}
    ]
  },
  getters: {
    PERSONS: state => {
      return state.persons;
    },
  },

  mutations: {
    updAdd(state, data){
      state.persons.push(data.person)
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
