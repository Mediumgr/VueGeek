export default {
        //addData для теста addData в AddPayment
            addData({commit}, payload) {
            console.log(commit, payload)
         },
        // addToForm для теста addToForm в PutCategory 
            addForTest({
                    commit
                }, payload) {
            console.log(commit, payload)
        },
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
}