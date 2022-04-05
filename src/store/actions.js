export default {
    fetchData({
        commit
    }) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const items = [{
                    "id": 1,
                    "date": "20.03.2022",
                    "category": "Food",
                    "value": 8500
                }, {
                    "id": 2,
                    "date": "21.03.2022",
                    "category": "Sport",
                    "value": 12500
                }, {
                    "id": 3,
                    "date": "22.03.2022",
                    "category": "Education",
                    "value": 15000
                }, {
                    "id": 4,
                    "date": "23.03.2022",
                    "category": "Transport",
                    "value": 3000
                }, {
                    "id": 5,
                    "date": "24.03.2022",
                    "category": "Health",
                    "value": 7000
                }, {
                    "id": 6,
                    "date": "25.03.2022",
                    "category": "Entertainment",
                    "value": 1000
                }, {
                    "id": 7,
                    "date": "13.03.2022",
                    "category": "Travelling",
                    "value": 50000
                }, {
                    "id": 8,
                    "date": "13.03.2022",
                    "category": "Shopping",
                    "value": 9000
                }, {
                    "id": 9,
                    "date": "14.03.2022",
                    "category": "Credit",
                    "value": 25000
                }, {
                    "id": 10,
                    "date": "15.03.2022",
                    "category": "Other",
                    "value": 5000
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
                resolve(['Food', 'Sport', 'Education', 'Transport', 'Health', 'Entertainment', 'Travelling', 'Shopping', 'Credit', 'Other'])
            }, 100)
        }).then(res => {
            commit('setCategoryList', res)
        })
    },
/*     async fetchCurrency() {
        const key = process.env.VUE_APP_FIXER
        const res = await fetch(`http://data.fixer.io/api/latest?access_key=${key}&symbols=USD,EUR,RUB`)
        return await res.json()
    } */
}