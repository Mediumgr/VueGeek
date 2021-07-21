import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        paymentsList: [],
        categoryList: [],
        selectOption: ''
    },

    mutations: {
        setPaymentListData(state, payload) {
            state.paymentsList = payload
        },

        addDataToPaymentsList(state, payload) {
            state.paymentsList.push(payload)

        },
        setCategoryList(state, payload) {
            state.categoryList = payload
        },
        addSelected(state, payload) {
            state.selectOption = payload
        },
        addDataToForm(state, payload) {
            state.categoryList.push(payload)
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
                        "value": 169
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
        fetchData({
            commit
        }, payload) {
            return new Promise((resolve) => {
                setTimeout(() => {
                    const items = [{
                        "page1": [{
                            "id": 1,
                            "date": "20.03.2020",
                            "category": "Food",
                            "value": 169
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
                commit('setPaymentListData', displayPage)
            })
        },
        fetchCategory({
            commit
        }) {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve(['Food', 'Sport', 'Education', 'Auto', 'Health', 'Family'])
                }, 1000)
            }).then(res => {
                commit('setCategoryList', res)
            })
        }
    },

    getters: {
        getPaymentList: state => state.paymentsList,

        getFullPyamentValue: state => {
            return state.paymentsList.reduce((res, cur) => res + cur.value, 0)
        },
        getCategoryList: state => state.categoryList,
        addSelectedToList: state => state.selectOption
    }
})

// как правильно читать такую запись state => state.categoryList, например для getCategoryList? полная запись: getCategoryList: state => state.categoryList.