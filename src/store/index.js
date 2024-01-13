import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    receiptList: [

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
      if (state.activeCategory === payload.categoryId) {
        state.receiptList.push(payload)
      }
    },
    SET_NEW_CATEGORY: (state, payload) => state.activeCategory = payload
  },
  actions: {
    async getReceiptList({commit, getters}) {
      try {
        const { data } = await axios.post("api/recipes/show", {
          category: getters.getActiveCategory
        })

        commit('CHANGE_RECEIPT_LIST', data.message);
      }
      catch (error) {
        console.error(error)
      }
    },
    async saveEditReceipt({commit}, {index, newValue}) {
      try {
        await axios.post('api/recipes/updateRecipe', newValue)
        commit('EDIT_RECEIPT_LIST', {index, newValue})
      }
      catch (error) {
        console.error(error)
      }
    },
    async deleteReceipt({commit}, {index, id}) {
      try {
        await axios.post('api/recipes/deleteRecipe', {
          id: id
        })
        commit('DELETE_RECEIPT', index)
      }
      catch (error) {
        console.error(error)
      }
    },
    async addNewReceipt({commit}, payload) {
      try {
        await axios.post('api/recipes/addRecipe', payload)
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
