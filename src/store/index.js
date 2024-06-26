//  файл-менеджер состояний vuex

import { createStore } from 'vuex'

export default createStore({
  state: { // состояния
    persons: [ // список посетителей
      {id: 1, name : "Илья Планков", totalMoney: 0},
      {id: 2, name : "Алексей Лечов", totalMoney: 0},
      {id: 3, name : "Никита Варданов", totalMoney: 0},
      {id: 4, name : "Александр Протоиреев", totalMoney: 0},
      {id: 5, name : "Евгений Белов", totalMoney: 0},
      {id: 6, name : "Томиил Данилов", totalMoney: 0},
      {id: 7, name : "Иван Семонов", totalMoney: 0},
      {id: 8, name : "Даниил Мукомол", totalMoney: 0},      
    ],

    checks: [ // список чеков
      {
        person: 1, // id посетителя-владельца
        products: [
          {
            id: 0, // id продукта
            prodTitle: "Молоко", // название продукта
            price: 300, // цена продукта
            eatPersons: [5, 3] // список id персон-едоков продукта
          },

          {
            id: 1,
            prodTitle: "Вода",
            price: 53,
            eatPersons: [2, 1]
          },

          {
            id: 2,
            prodTitle: "Напиток ягодный",
            price: 66,
            eatPersons: [1, 4]
          },
        ]
      },

      {
        person: 5,
        products: [
          {
            id: 0,
            prodTitle: "Картошка",
            price: 355,
            eatPersons: [6, 1]
          },

          {
            id: 1,
            prodTitle: "Морковка",
            price: 53,
            eatPersons: [4, 8]
          },

          {
            id: 2,
            prodTitle: "Селёдка",
            price: 66,
            eatPersons: [7, 4]
          },

          {
            id: 3,
            prodTitle: "Бифштекс",
            price: 66,
            eatPersons: [8]
          },
        ]
      },

      {
        person: 4,
        products: [
          {
            id: 0,
            prodTitle: "Двойной циплёнок",
            price: 355,
            eatPersons: [1, 3]
          },

          {
            id: 1,
            prodTitle: "Морс двойной",
            price: 53,
            eatPersons: [5, 8]
          },
        ]
      }
    ]
  },
  getters: { // геттеры
    PERSONS: state => { // получение всех посетителей
      return state.persons;
    },

    getPersWithRec: (state) => { // получение посетителей-владельцев чеков
      var res = []
      for (var i in state.checks){
        var person = state.persons.find(person => person.id === state.checks[i].person)
        res.push(person)
      }
      return res;
    },

    getPersonByName: (state) => (name) => { // получение посетителя по имени
      return state.persons.find(person => person.name === name);
    },

    getPersonById: (state) => (id) => { // получение посетителя по id
      return state.persons.find(person => person.id === id);
    },

    getCheckByName: (state) => (person) => { // получение чека по id владельца
      return state.checks.find(check => check.person === person);
    },

    getCheckProductById: (state) => (person, prodID) => { // получение продукта из определённого чека по id-продукта
      var check = state.checks.find(check => check.person === person)
      var product = check.products[prodID]
      return product.eatPersons;
    },


  },

  mutations: {
    updAdd(state, data){ // добавление посетителя
      var perlLen = state.persons.length
      var newId = perlLen != 0 ? state.persons[perlLen - 1].id + 1 : 0
      state.persons.push({id: newId, name : data.name, totalMoney: 0})
    },

    updRemove(state, data){ // удаление посетителя
      var remPersId = data.id;
      for (var rC in state.checks){
        for (var p in state.checks[rC].products){
          let newProducts = state.checks[rC].products[p].eatPersons.filter((c) => c != remPersId);
          state.checks[rC].products[p].eatPersons = newProducts
        }
      }
      var newRec = state.checks.filter((ch) => ch.person != remPersId)
      state.checks = newRec

      var newPersons = state.persons.filter(p => p.id != remPersId)
      state.persons = newPersons
    },
    
    addEatenPerson(state, data){ // добавление едока к продукту в определённом чеке
      var i = 0;
      console.log(state.checks[0])
      while ((state.checks[i].person != data.checkPersId) && (i < state.checks.length - 1)){
        i++
      }

      if (state.checks[i].person == data.checkPersId){
        var addPers = state.persons.find(pers => pers.name == data.addPersName)
        if (state.checks[i].products[data.prodID].eatPersons.filter(p => p == addPers.id).length == 0){
          state.checks[i].products[data.prodID].eatPersons.push(addPers.id)
        }
      }
    },

    remEatenPerson(state, data){ // удаление полесителя-едока
      var i = 0;
      while ((state.checks[i].person != data.checkName) && (i < state.checks.length)){
        i++
      }

      if (state.checks[i].person == data.checkName){
        if (state.checks[i].products[data.prodID].eatPersons.filter(p => p == data.remPersId).length != 0){
          state.checks[i].products[data.prodID].eatPersons = state.checks[i].products[data.prodID].eatPersons.filter(p => p != data.remPersId)
        }
      }
    },

    addProdToCheck(state, data){ // добавление продукта в чек
      var i = 0;
      while ((i < state.checks.length) && (state.checks[i].person != data.checkName)){
        i++;
      }

      if (state.checks[i].person == data.checkName){
        state.checks[i].products.push({id: data.newID, prodTitle: data.prodTitle, price: data.price, eatPersons: []})
      }
    },

    remProdFromCheck(state, data){ // удаление продукта из чека
      var i = 0;
      var j =0;
      while ((state.checks[i].person != data.checkName) && (i < state.checks.length - 1)){
        i++;
      }

      if (state.checks[i].person == data.checkName){
        state.checks[i].products = state.checks[i].products.filter(p => p.id != data.remProdID)
      }

      for (j = 0; j < state.checks[i].products.length; j++){
        state.checks[i].products[j].id = j;
      }
    },

    setNewPrice(state, data){ // установка новой цены для продукта
      var i = 0;
      while ((state.checks[i].person != data.checkName) && (i < state.checks.length)){
        i++;
      }
      if (state.checks[i].person == data.checkName){
        state.checks[i].products[data.setProdID].price = data.newPrice
      }
    },

    setNewProdTitle(state, data){ // установка нового названия продукта
      var i = 0;
      while ((state.checks[i].person != data.checkName) && (i < state.checks.length)){
        i++;
      }
      if (state.checks[i].person == data.checkName){
        state.checks[i].products[data.setProdID].prodTitle = data.newProdTitle
      }
    },

    addNewCheck(state, data){ // добавление нового чека
      state.checks.push({
            person: data.checkPersId,
            products: []
          })
    },

    updSetNewName(state, data){ // установка нового имени посетителю
      var i = 0;
      while (state.persons[i].id != data.id && i < state.persons.length){
        i++;
      }
      if (state.persons[i].id == data.id){
        state.persons[i].name = data.newName
      }
    }
  }, 
 
  

  actions: {
  },
  modules: {
  },

  getCheck(person){ // ??
    return this.state.checks.filter(ch => ch.person != person)
  },

})
