import Vue from 'vue'

export default {
    setPaymentListData(state, payload) {
        state.paymentsList = payload
        localStorage.setItem('my-paymentsList', JSON.stringify(state.paymentsList))
    },
    addDataToPaymentsList(state, payload) {
        state.paymentsList.push(payload)
        localStorage.setItem('my-paymentsList', JSON.stringify(state.paymentsList))
    },
    changeDataItemPaymentsList(state, payload) {
        Vue.set(state.paymentsList, [payload.id - 1], payload)
        localStorage.setItem('my-paymentsList', JSON.stringify(state.paymentsList))
    },
    deleteItem(state, payload) {
        state.paymentsList.splice(state.paymentsList.indexOf(payload), 1)
        state.paymentsList.forEach((item, index) => {
            item.id = index + 1
        });
        state.paymentsList = [...state.paymentsList]
        localStorage.setItem('my-paymentsList', JSON.stringify(state.paymentsList))
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
}
