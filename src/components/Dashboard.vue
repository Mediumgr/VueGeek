<template>
  <div class="flexDash">
    <div class="group" v-if="paymentsList.length !== 0">
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
    <div v-else class="deletedPaymentsList">Вы удалили все данные. Обновите страницу, чтобы создать шаблон затрат</div>
    <vue-chart
      v-if="categories.length !== 0"
      :paymentsList="paymentsList"
    >
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
    VueChart: () => import("@/components/VueChart.vue"),
  },
  data() {
    return {
      page: "",
      currentPage: 1,
      displayedItems: 3,
      categoryTransfer: "",
    };
  },
  methods: {
    ...mapActions(["fetchCategory", "fetchData"]),
    getCurrentPage(page) {
      this.currentPage = page;
    },
    categoryOption(category) {
      this.categoryTransfer = category;
    },
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
    if (
      localStorage.getItem("my-paymentsList") !== null &&
      this.paymentsList.length !== 0
    ) {
      let existedPaymentsList = JSON.parse(
        localStorage.getItem("my-paymentsList")
      );
      this.$store.commit("getExistedPaymentsList", existedPaymentsList);
      let existedCategory = [];
      JSON.parse(localStorage.getItem("my-paymentsList")).forEach((element) => {
        existedCategory.push(element.category);
      });
      this.$store.commit("myCategoryList", existedCategory);
    } else {
      this.fetchData();
      this.fetchCategory();
    }
  },
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
.deletedPaymentsList {
  margin: 200px auto;
  font-size: 19px;
  color: red;
  font-weight: bold;
}
</style>
