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
      { value: 1, text: 'Суши' },
      { value: 2, text: 'Пиццы' },
      { value: 3, text: 'Салаты' },
      { value: 4, text: 'Супы' },
    ],

    activeCategory: 1
  },
  getters: {
    getReceiptList: state => state.receiptList,

    getCategoryList: state => state.categoryList,

    getActiveCategory: state => state.activeCategory,
  },
  mutations: {
    CHANGE_RECEIPT_LIST: (state, payload) => state.receiptList = payload,

    EDIT_RECEIPT_LIST: (state, {index, newValue}) => Vue.set(state.receiptList, index, newValue),

    DELETE_RECEIPT: (state, index) => state.receiptList.splice(index, 1),

    ADD_RECEIPT: (state, payload) => {
      if (state.activeCategory === payload.category) {
        state.receiptList.push(payload)
      }
    },
    SET_NEW_CATEGORY: (state, payload) => state.activeCategory = payload
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
    addNewReceipt({commit}, payload) {
      try {
        commit('ADD_RECEIPT', payload)
      }
      catch (error) {
        console.error(error)
      }
    },
    setNewCategory({commit}, payload) {
      commit('SET_NEW_CATEGORY', payload)
    }
  },
  modules: {
  }
})
