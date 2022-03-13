import Vue from 'vue'

export default {
    setPaymentListData(state, payload) {
        state.paymentsList = payload
    },
    addDataToPaymentsList(state, payload) {
        state.paymentsList.push(payload)
    },
    changeDataItemPaymentsList(state, payload) {
        Vue.set(state.paymentsList, [payload.id - 1], payload)
    },
    deleteItem(state, payload) {
        state.paymentsList.splice(state.paymentsList.indexOf(payload), 1)
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
    }
}
