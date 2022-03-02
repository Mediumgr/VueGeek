export default {
    getPaymentList: state => state.paymentsList,

    getFullPaymentValue: state => {
        return state.paymentsList.reduce((result, current) => result + current.value, 0)
    },

    getCategoryList: state => state.categoryList,

    addSelectedToList: state => state.selectOption
}