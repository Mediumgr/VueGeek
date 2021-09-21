<template>
  <div id="app">
    <header>
      <h1>My personal cost</h1>
    </header>
    <main>
      <router-link :to="{name: 'AddPaymentOpen', query: {value: 200}}"></router-link>
      <AddPayment :selectCategory="selectCategory" :length="paymentsList.length"/> 
      <div class="flex">
      <CategorySelect :categories="categories" />
      <PutCategory /> 
      </div>
      <PaymentsDisplay :list="currentElements" :total="getFPV"/>
      <PagesPagination :displayedItems="displayedItems" :length="paymentsList.length" :currentPage="currentPage"/>
      <!-- <router-view></router-view> -->
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
  data(){
    return {
      page: '',
     /*  currentPage: 1, */
     /*  displayedItems: 3, */
    }
  },
  methods: {
    ...mapMutations([
      'setPaymentListData',
      'addDataToPaymentsList',
      'addSelected',
      'addDataToForm',
      'setCategoryList',
      'paymentListWithFetchData',
      'paginate'
    ]),
    ...mapActions([
      'fetchData',
      'fetchCategory',
      'fetchDataFromApp'
    ]),
/*     addData(data){
      console.log("push to state",data)
      this.addDataToPaymentsList(data)
    }, */
/*     changePage(page) {
      this.currentPage = page
    }  */
  },
  computed: {
    ...mapGetters({
      paymentsList: 'getPaymentList',
      categories: 'getCategoryList',
      selectCategory: 'addSelectedToList',
      currentPage :'paginatePages',
      displayedItems: 'displayedPage'
    }),
    getFPV() {
      return this.$store.getters.getFullPyamentValue
    },
    currentElements(){
      const { displayedItems, currentPage } = this      
      return this.paymentsList.slice(displayedItems * (currentPage - 1), displayedItems * (currentPage - 1) + displayedItems)
    }
  },
  created(){
     this.$store.dispatch('fetchDataFromApp')
    if(!this.categories.length) {
      this.fetchCategory()
    }
  },
  mounted() {
    const page = parseInt(this.$route.params.id) || 1
    this.$store.state.currentPage = page
    this.paymentsList.length = this.$store.state.paymentsList.length
  }
/*    watch: {
        $route(toR) {
            this.$store.state.currentPage = toR.params.id
        }
    }  */
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