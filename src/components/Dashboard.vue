<template>
  <div class="flexDash">
    <div class="group">
      <transition-group appear name="fade">
        <add-payment :selectCategory="selectCategory" :length="paymentsList.length" key="AddPayment"/>
        <div class="flex" key="div">
          <category-select :categories="categories" key="CategorySelect" />
          <put-category />
        </div>
        <payments-display v-if="paymentsList.length" :length="paymentsList.length" :list="currentElements" :total="getFPV" key="PaymentsDisplay"/>
        <pages-pagination :displayedItems="displayedItems" :length="paymentsList.length" :currentPage="currentPage" key="PagesPagination"/>
      </transition-group>
    </div>
    <vue-chart-container :items="chart"></vue-chart-container>
  </div>
</template>

<script>
import PaymentsDisplay from "@/components/PaymentsDisplay.vue";
import CategorySelect from "@/components/CategorySelect.vue";
import PagesPagination from "@/components/PagesPagination.vue";
import PutCategory from "@/components/PutCategory.vue";
import AddPayment from "@/components/AddPayment.vue";
import VueChartContainer from "@/components/VueChartContainer.vue";

import { mapMutations, mapGetters, mapActions } from "vuex";

export default {
  name: "Dashboard",
  components: {
    PaymentsDisplay,
    CategorySelect,
    AddPayment,
    PagesPagination,
    PutCategory,
    VueChartContainer
  },
  data() {
    return {
      page: ""
    };
  },
  methods: {
    ...mapMutations([
      "setPaymentListData",
      "addDataToPaymentsList",
      "addSelected",
      "addDataToForm",
      "setCategoryList",
      "paymentListWithFetchData",
      "paginate",
      "changeDataItemPaymentsList"
    ]),
    ...mapActions(["fetchCategory", "fetchDataFromApp"])
  },
  computed: {
    ...mapGetters({
      paymentsList: "getPaymentList",
      categories: "getCategoryList",
      selectCategory: "addSelectedToList",
      currentPage: "paginatePages",
      displayedItems: "displayedPage"
    }),
    getFPV() {
      return this.$store.getters.getFullPyamentValue;
    },
    currentElements() {
      const { displayedItems, currentPage } = this;
      return this.paymentsList.slice(displayedItems * (currentPage - 1),displayedItems * (currentPage - 1) + displayedItems
      );
    },
    chart() {
      return this.$store.getters.getPaymentList
    }
  },
  created() {
    this.$store.dispatch("fetchDataFromApp");
    if (!this.categories.length) {
      /*  this.$store.dispatch('fetchCategory') */
      this.fetchCategory();
    }
  },
  mounted() {
    const page = parseInt(this.$route.params.id) || 1;
    this.$store.state.currentPage = page;
  }
};
</script>

<style scoped>
.total {
  padding: 50px;
}

.group {
  width: 610px;
}

.flexDash {
  display: flex;
  justify-content: space-between;
}

.flex {
  display: flex;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 2s ease;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}</style
>>
