import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        paymentsList: [],
        categoryList: [],
        selectOption: '',
        currentPage: 1,
        displayedItems: 3
    },

    mutations: {
        setPaymentListData(state, payload) {
            state.paymentsList = payload
        },
        addDataToPaymentsList(state, payload) {
            state.paymentsList.push(payload)
        },
        changeDataItemPaymentsList(state, payload) {
            state.paymentsList[payload.id - 1] = payload
            state.paymentsList = [...state.paymentsList]
        },
        deletItem(state, payload) {
            state.paymentsList.splice(state.paymentsList.indexOf(payload), 1)
            /* для каждого элемента массива paymentsList меняем его id и делаем равным его индексу, увеличенным  на 1 для отображения каждого элемента по id, начиная с 1*/
            state.paymentsList.forEach((item, index) => {
                item.id = index + 1
            });
            state.paymentsList = [...state.paymentsList]
        },
        setCategoryList(state, payload) {
            state.categoryList = payload
        },
        addSelected(state, payload) {
            state.selectOption = payload
        },
        addDataToForm(state, payload) {
            state.categoryList.push(payload)
        },
        paginate(state, payload) {
            state.currentPage = payload
        }
    },
    actions: {
        fetchDataFromApp({
            commit
        }) {
            return new Promise((resolve) => {
                setTimeout(() => {
                    const items = [{
                        "id": 1,
                        "date": "20.03.2020",
                        "category": "Food",
                        "value": 171
                    }, {
                        "id": 2,
                        "date": "21.03.2020",
                        "category": "Navigation",
                        "value": 50
                    }, {
                        "id": 3,
                        "date": "22.03.2020",
                        "category": "Sport",
                        "value": 450
                    }, {
                        "id": 4,
                        "date": "23.03.2020",
                        "category": "Entertaiment",
                        "value": 969
                    }, {
                        "id": 5,
                        "date": "24.03.2020",
                        "category": "Education",
                        "value": 1500
                    }, {
                        "id": 6,
                        "date": "25.03.2020",
                        "category": "Food",
                        "value": 200
                    }]
                    resolve(items)
                }, 500)
            }).then(res => {
                commit('setPaymentListData', res)
            })
        },
        /* fetchData({
            commit, 
        }, payload) {
            return new Promise((resolve) => {
                setTimeout(() => {
                    const items = [{
                        "page1": [{
                            "id": 1,
                            "date": "20.03.2020",
                            "category": "Food",
                            "value": 171
                        }, {
                            "id": 2,
                            "date": "21.03.2020",
                            "category": "Navigation",
                            "value": 50
                        }, {
                            "id": 3,
                            "date": "22.03.2020",
                            "category": "Sport",
                            "value": 450
                        }],
                        "page2": [{
                            "id": 4,
                            "date": "23.03.2020",
                            "category": "Entertaiment",
                            "value": 969
                        }, {
                            "id": 5,
                            "date": "24.03.2020",
                            "category": "Education",
                            "value": 1500
                        }, {
                            "id": 6,
                            "date": "25.03.2020",
                            "category": "Food",
                            "value": 200
                        }]
                    }]
                    let displayPage = items[0][payload.pageNumber]
                    resolve(displayPage)
                }, payload.timeoutDelay)
            }).then(displayPage => {
                commit('paymentListWithFetchData', displayPage)
            })
        }, */
        fetchCategory({
            commit
        }) {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve(['Food', 'Sport', 'Education', 'Transport', 'Health', 'Family', 'Entertainment'])
                }, 100)
            }).then(res => {
                commit('setCategoryList', res)
            })
        }
    },

    getters: {
        getPaymentList: state => state.paymentsList,

        getFullPyamentValue: state => {
            return state.paymentsList.reduce((result, current) => result + current.value, 0)
        },

        getCategoryList: state => state.categoryList,

        addSelectedToList: state => state.selectOption,

        paginatePages: state => state.currentPage,

        displayedPage: state => state.displayedItems,

    }
})