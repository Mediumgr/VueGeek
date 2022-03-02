<template>
  <div class="container">
    <vue-chart
      :paymentsList="items"
      :options="options"
      :categories="categories"/>
  </div>
</template>

<script>
import VueChart from "@/components/VueChart.vue";

export default {
  name: "VueChartContainer",
  components: { VueChart },
  data: () => ({
    options: { maintainAspectRatio: true },
  }),
  props: {
    items: {
      type: Array,
      default: null,
    },
    categories: {
      type: Array,
      default: null,
    },
  },
};
</script>

<style scoped>
.container {
  padding: 0 120px 0 0;
  width: 410px;
  height: 410px;
}
</style>
