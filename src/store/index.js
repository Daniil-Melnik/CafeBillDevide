import { createStore } from 'vuex'

export default createStore({
  state: {
    persons: [
      {name: "Илья Планков", totalMoneY: 856},
      {name: "Алексей Лечов", totalMoneY: 10},
      {name: "Никита Варданов", totalMoneY: 300},
      {name: "Александр Протоиреев", totalMoneY: 150}
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
  },

  actions: {
  },
  modules: {
  }
})
