export default {
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
            /* для каждого элемента массива paymentsList меняем его id и делаем равным его индексу, увеличенным  на 1 для отображения каждого элемента по id, начиная с 1:*/
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
}