<template>
  <div id="app">
    <header>
      <h1>My personal cost</h1>
    </header>
    <main>
      <AddPayment @addNewPayment="addData" :selectCategory="selectCategory"/>
      <div class="flex">
        <CategorySelect :categories="categories" />
        <PutCategory /> 
       </div>
      <PaymentsDisplay :list="paymentsList" :total="getFPV"/>
      <PagesPagination />
    </main>
  </div>
</template>

<script>
import PaymentsDisplay from "./components/PaymentsDisplay.vue";
import CategorySelect from "./components/CategorySelect.vue";
import PagesPagination from "./components/PagesPagination.vue";
import PutCategory from "./components/PutCategory.vue"


import AddPayment from "./components/AddPayment.vue";
import { mapMutations, mapGetters, mapActions } from 'vuex'
export default {
  name: "App",
  components: {
    PaymentsDisplay,
    CategorySelect,
    AddPayment,
    PagesPagination,
    PutCategory
  },
  methods: {
    ...mapMutations([
      'setPaymentListData',
      'addDataToPaymentsList',
      'addSelected',
      'addDataToForm'
    ]),
    ...mapActions([
      'fetchData',
      'fetchCategory'
    ]),
    addData(data){
      console.log("push to state",data)
      this.addDataToPaymentsList(data)
    }, 
  },
  computed: {
    ...mapGetters({
      paymentsList:'getPaymentList',
      categories: 'getCategoryList',
      selectCategory: 'addSelectedToList'
    }),
    getFPV(){
      return this.$store.getters.getFullPyamentValue
    },
  },
  created(){
     this.$store.dispatch('fetchDataFromApp')
    if(!this.categories.length) {
      this.fetchCategory()
    }
  }
}
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 20px;
  padding-left: 20px;
}
.total {
  padding: 50px;
}
.flex {
  display: flex;
}
</style>>