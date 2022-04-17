<template>
  <div class="flexDash">
    <div class="group">
      <transition-group appear name="fade">
        <add-payment
          :selectCategory="selectCategory"
          :length="paymentsList.length"
          @add-to-category-select="categoryOption"
          key="AddPayment"
        />
        <div class="flex" key="div">
          <category-select
            :categories="categories"
            :categoryTransfer="categoryTransfer"
            key="CategorySelect"
          />
          <put-category />
        </div>
        <payments-display
          :length="paymentsList.length"
          :list="currentElements"
          @current-page="getCurrentPage"
          :total="getFPV"
          key="PaymentsDisplay"
        />
        <pages-pagination
          :displayedItems="displayedItems"
          :length="paymentsList.length"
          @current-page="getCurrentPage"
          :currentPage="currentPage"
          key="PagesPagination"
        />
      </transition-group>
    </div>
    <vue-chart v-if="categories.length" :items="paymentsList" :categories="categories">
    </vue-chart>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Dashboard",
  components: {
    PaymentsDisplay: () => import("@/components/PaymentsDisplay.vue"),
    CategorySelect: () => import("@/components/CategorySelect.vue"),
    AddPayment: () => import("@/components/AddPayment.vue"),
    PagesPagination: () => import("@/components/PagesPagination.vue"),
    PutCategory: () => import("@/components/PutCategory.vue"),
    VueChart: () => import("@/components/VueChart.vue")
  },
  data() {
    return {
      page: "",
      currentPage: 1,
      displayedItems: 3,
      categoryTransfer: ""
    };
  },
  methods: {
    ...mapActions(["fetchCategory", "fetchData"]),
    getCurrentPage(page) {
      this.currentPage = page;
    },
    categoryOption(category) {
      this.categoryTransfer = category;
    }
  },
  computed: {
    ...mapGetters({
      paymentsList: "getPaymentList",
      categories: "getCategoryList",
      selectCategory: "addSelectedToList",
      getFPV: "getFullPaymentValue",
    }),
    currentElements() {
      const { displayedItems, currentPage } = this;
      return this.paymentsList.slice(
        displayedItems * (currentPage - 1),
        displayedItems * (currentPage - 1) + displayedItems
      );
    },
  },
  created() {
    JSON.parse(localStorage.getItem('my-paymentsList')) ?? this.fetchData();
    this.fetchCategory();
  },
  /* async  mounted() {
    this.currency = await this.$store.dispatch('fetchCurrency')
  } */
};
</script>

<style scoped>
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
}
</style>
