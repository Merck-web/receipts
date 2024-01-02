import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    receiptList: [
      { label: 'govno', miniDescription: "Lorem ipsum hui", description: 'Lorem ipsum hui Lorem ipsum hui Lorem ipsum hui' },
      { label: 'govno', miniDescription: "Lorem ipsum hui", description: 'Lorem ipsum hui Lorem ipsum hui Lorem ipsum hui' },
      { label: 'govno', miniDescription: "Lorem ipsum hui", description: 'Lorem ipsum hui Lorem ipsum hui Lorem ipsum hui' },
      { label: 'govno', miniDescription: "Lorem ipsum hui", description: 'Lorem ipsum hui Lorem ipsum hui Lorem ipsum hui' },
    ],
    categoryList: [
      { label: 'Суши' },
      { label: 'Пиццы' },
      { label: 'Салаты' },
      { label: 'Супы' },
    ],
  },
  getters: {
    getReceiptList: state => state.receiptList,

    getCategoryList: state => state.categoryList,
  },
  mutations: {
    CHANGE_RECEIPT_LIST: (state, payload) => state.receiptList = payload
  },
  actions: {
    getReceiptList({commit}, payload) {
      try {
        const response  = [
          {label: 'govno2'},
          {label: 'govno2'},
          {label: 'govno2'},
        ]

        commit('CHANGE_RECEIPT_LIST', response);
      }
      catch (error) {
        console.error(error)
      }
    }
  },
  modules: {
  }
})
