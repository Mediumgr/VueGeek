<template>
  <div>
    <router-link :to="{name: 'AddPaymentOpen', query: {value: 200}}"></router-link>
    <add-payment :selectCategory="selectCategory" :length="paymentsList.length"/> 
    <div class="flex">
      <category-select :categories="categories" />
      <put-category /> 
    </div>
    <payments-display :length="paymentsList.length" :list="currentElements" :total="getFPV"/>
    <pages-pagination :displayedItems="displayedItems" :length="paymentsList.length" :currentPage="currentPage"/>
  </div>
</template>

<script>
import PaymentsDisplay from "@/components/PaymentsDisplay.vue";
import CategorySelect from "@/components/CategorySelect.vue";
import PagesPagination from "@/components/PagesPagination.vue";
import PutCategory from "@/components/PutCategory.vue"
import AddPayment from "@/components/AddPayment.vue";

import { mapMutations, mapGetters, mapActions } from 'vuex'

export default {
  name: "Dashboard",
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
      'paginate',
      'changeDataItemPaymentsList'
    ]),
    ...mapActions([
      'fetchData',
      'fetchCategory',
      'fetchDataFromApp'
    ]),
  },
  computed: {
    ...mapGetters({
      paymentsList: 'getPaymentList',
      categories: 'getCategoryList',
      selectCategory: 'addSelectedToList',
      currentPage :'paginatePages',
      displayedItems: 'displayedPage',
    }),
    getFPV() {
      return this.$store.getters.getFullPyamentValue
    },
    currentElements() {
      const { displayedItems, currentPage } = this      
      return this.paymentsList.slice(displayedItems * (currentPage - 1), displayedItems * (currentPage - 1) + displayedItems)
    },
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
  }
} 
</script>

<style scoped>
.total {
  padding: 50px;
}
.flex {
  display: flex;
}
</style>>