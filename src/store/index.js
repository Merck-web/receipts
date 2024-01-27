import Vue from 'vue'
import Vuex from 'vuex'
// import axios from 'axios';

Vue.use(Vuex);

const dataDefault = [
    {
        "id": "1",
        "name": "еда 1",
        "categoryId": 1,
        "shortDescription": "shortDescription shortDescription",
        "fullDescription": "fullDescription fullDescription fullDescription fullDescription fullDescription",
        "dateCreate": "11.01.2024"
    },
    {
        "id": "2",
        "name": "еда 2",
        "categoryId": 2,
        "shortDescription": "shortDescription shortDescription",
        "fullDescription": "fullDescription fullDescription fullDescription fullDescription fullDescription",
        "dateCreate": "12.01.2024"
    },
    {
        "id": "3",
        "name": "еда 3",
        "categoryId": 3,
        "shortDescription": "shortDescription shortDescription",
        "fullDescription": "fullDescription fullDescription fullDescription fullDescription fullDescription",
        "dateCreate": "13.01.2024"
    },
    {
        "id": "4",
        "name": "еда 4",
        "categoryId": 4,
        "shortDescription": "shortDescription shortDescription",
        "fullDescription": "fullDescription fullDescription fullDescription fullDescription fullDescription",
        "dateCreate": "14.01.2024"
    },
    {
        "id": "5",
        "name": "еда 5",
        "categoryId": 1,
        "shortDescription": "shortDescription shortDescription",
        "fullDescription": "fullDescription fullDescription fullDescription fullDescription fullDescription",
        "dateCreate": "15.01.2024"
    },
    {
        "id": "6",
        "name": "еда 6",
        "categoryId": 1,
        "shortDescription": "shortDescription shortDescription",
        "fullDescription": "fullDescription fullDescription fullDescription fullDescription fullDescription",
        "dateCreate": "16.01.2024"
    },
]

export default new Vuex.Store({
    state: {
        receiptList: [],
        categoryList: [
            {value: 1, text: 'Суши'},
            {value: 2, text: 'Пиццы'},
            {value: 3, text: 'Салаты'},
            {value: 4, text: 'Супы'},
        ],

        activeCategory: 1
    },
    getters: {
        getReceiptList: (state, getters) => {
            return state.receiptList.filter(item => item.categoryId === getters.getActiveCategory)
        },

        getCategoryList: state => state.categoryList,

        getActiveCategory: state => state.activeCategory,
    },
    mutations: {
        CHANGE_RECEIPT_LIST: (state, payload) => state.receiptList = payload,

        EDIT_RECEIPT_LIST: (state, {index, newValue}) => {
            const indexTargetObject = state.receiptList.findIndex(item => item.id === newValue.id)
            Vue.set(state.receiptList, indexTargetObject, newValue);
            const changedObject = state.receiptList[indexTargetObject];

            const receipts = JSON.parse(localStorage.getItem('receipts'));
            const indexReceiptsObject = receipts.findIndex(item => item.id === newValue.id)
            receipts[indexReceiptsObject] = changedObject;

            localStorage.setItem("receipts", JSON.stringify(receipts))
        },

        DELETE_RECEIPT: (state, {index, id}) => {
            const receipts = JSON.parse(localStorage.getItem('receipts'));
            const receiptIndex = state.receiptList.findIndex(item => item.id === id)
            const newReceipts = receipts.filter(item => item.id !== id);
            state.receiptList.splice(receiptIndex, 1);
            localStorage.setItem('receipts', JSON.stringify(newReceipts))
        },

        ADD_RECEIPT: (state, payload) => {
            let newId = -1;
            for (const receipt of state.receiptList){
                if (+receipt.id > newId) {
                    newId = +receipt.id
                }
            }
            newId = String(newId + 1);
            const receipts = JSON.parse(localStorage.getItem('receipts'));

            state.receiptList.push({
                ...payload,
                id: newId
            })

            receipts.push({
                ...payload,
                id: newId
            })

            localStorage.setItem('receipts', JSON.stringify(receipts))

            // if (state.activeCategory === payload.categoryId) {
            //     state.receiptList.push(payload)
            // }
        },
        SET_NEW_CATEGORY: (state, payload) => state.activeCategory = payload
    },
    actions: {
        async getReceiptList({commit, getters}) {
            try {
                const receipts = localStorage.getItem('receipts')
                let data
                if (receipts === null) {
                    localStorage.setItem('receipts', JSON.stringify(dataDefault))
                    data = dataDefault
                }
                else {
                    data = JSON.parse(receipts)
                }

                // const {data} = await axios.post("api/recipes/show", {
                //     category: getters.getActiveCategory

                commit('CHANGE_RECEIPT_LIST', data);
            } catch (error) {
                console.error(error)
            }
        },
        async saveEditReceipt({commit}, {index, newValue}) {
            try {
                // await axios.post('api/recipes/updateRecipe', newValue)
                commit('EDIT_RECEIPT_LIST', {index, newValue})
            } catch (error) {
                console.error(error)
            }
        },
        async deleteReceipt({commit}, {index, id}) {
            try {
                // await axios.post('api/recipes/deleteRecipe', {
                //     id: id
                // })
                commit('DELETE_RECEIPT', {index, id})
            } catch (error) {
                console.error(error)
            }
        },
        async addNewReceipt({commit}, payload) {
            try {
                // await axios.post('api/recipes/addRecipe', payload)
                commit('ADD_RECEIPT', payload)
            } catch (error) {
                console.error(error)
            }
        },
        setNewCategory({commit}, payload) {
            commit('SET_NEW_CATEGORY', payload)
        }
    },
    modules: {}
})
