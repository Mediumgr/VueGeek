export default {
    getPaymentList: state => state.paymentsList,

    getFullPyamentValue: state => {
        return state.paymentsList.reduce((result, current) => result + current.value, 0)
    },

    getCategoryList: state => state.categoryList,

    addSelectedToList: state => state.selectOption,

    paginatePages: state => state.currentPage,

    displayedPage: state => state.displayedItems,
}