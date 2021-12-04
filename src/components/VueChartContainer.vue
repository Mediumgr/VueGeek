<template>
  <div class="container">
    <vue-chart
      v-if="getData.length"
      :chartData="items"
      :options="options"
    />
  </div>
</template>

<script>
import VueChart from "@/components/VueChart.vue";

export default {
  name: "VueChartContainer",
  components: { VueChart },
  data: () => ({
    options: { maintainAspectRatio: true }
  }),
  props: {
    items: {
      type: Array,
      default: null
    }
  },
  computed: {
    /* для первоначального ОК рендеринга */
    getData() {
      return this.items;
    }
  }
};
</script>

<style scoped>
.container {
  padding: 0 90px 0 0;
  width: 410px;
  height: 410px;
}
</style>
