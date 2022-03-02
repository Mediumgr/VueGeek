export default {
     fetchData({
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
                         "category": "Sport",
                         "value": 50
                     }, {
                         "id": 3,
                         "date": "22.03.2020",
                         "category": "Education",
                         "value": 450
                     }, {
                         "id": 4,
                         "date": "23.03.2020",
                         "category": "Transport",
                         "value": 969
                     }, {
                         "id": 5,
                         "date": "24.03.2020",
                         "category": "Health",
                         "value": 1500
                     }, {
                         "id": 6,
                         "date": "25.03.2020",
                         "category": "Entertainment",
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
                     resolve(['Food', 'Sport', 'Education', 'Transport', 'Health', 'Entertainment'])
                 }, 100)
             }).then(res => {
                 commit('setCategoryList', res)
             })
         }
}