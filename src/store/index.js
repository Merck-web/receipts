import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    receiptList: [
      { label: 'еда', miniDescription: "Lorem ipsum лдвяоавы", description: 'Lorem ipsum мсчс Lorem ipsum ыу Lorem ipsum мм' },
      { label: 'еда 1', miniDescription: "Lorem ipsum длвосдляс", description: 'Lorem ipsum ыЧ Lorem ipsum лт Lorem ipsum мм' },
      { label: 'еда 2', miniDescription: "Lorem ipsum орсыспяо", description: 'Lorem ipsum яыс Lorem ipsum hui Lorem ipsum от' },
      { label: 'еда 3', miniDescription: "Lorem ipsum фылов", description: 'Lorem ipsum ыва Lorem ipsum бт Lorem ipsum дд' },
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
    CHANGE_RECEIPT_LIST: (state, payload) => state.receiptList = payload,

    EDIT_RECEIPT_LIST: (state, {index, newValue}) => Vue.set(state.receiptList, index, newValue),

    DELETE_RECEIPT: (state, index) => state.receiptList.slice(index, 1),
  },
  actions: {
    getReceiptList({commit}, payload) {
      try {
        const response  = [
          {label: 'лор'},
          {label: 'лолорт'},
          {label: 'олрлор'},
        ]

        commit('CHANGE_RECEIPT_LIST', response);
      }
      catch (error) {
        console.error(error)
      }
    },
    saveEditReceipt({commit}, {index, newValue}) {
      try {
        commit('EDIT_RECEIPT_LIST', {index, newValue})
      }
      catch (error) {
        console.error(error)
      }
    },
    deleteReceipt({commit}, index) {
      try {
        commit('DELETE_RECEIPT', index)
      }
      catch (error) {
        console.error(error)
      }
    },
  },
  modules: {
  }
})
