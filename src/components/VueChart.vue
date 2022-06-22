<template>
  <div class="container">
    <canvas ref="canvas" id="myChart" width="425" height="425"></canvas>
  </div>
</template>

<script>
import { Doughnut } from "vue-chartjs";
import { mapGetters } from 'vuex';

export default {
 name: "VueChart",
 extends: Doughnut,
  data: () => ({
    options: { maintainAspectRatio: true },
  }),
  props: {
    paymentsList: {
      type: Array,
      default: () => [],
    },
  },
    methods: {
    render() {
      this.renderChart(
        {
          labels: this.getCategoryList,
          datasets: [
            {
              label: "expenses by category",
              data: this.getCategoryList.map((category) => {
                return this.paymentsList.reduce((total, element) => {
                  if (element.category === category) {
                    total += element.value;
                  }
                  return total;
                }, 0);
              }),
              backgroundColor: [
                "#D460CF",
                "#F26D93",
                "#b6d2e6",
                "#E1FA71",
                "#60D6A9",
                "#FFC573",
                "#19c9c8",
                "#08e600",
                "#000ce6",
                "#b9da83",
                "#8a5abc",
                "#bc8e5a",
                "#b0ff00",
                "#ffc900",
                "#314e01",
                "#5e2cd7",
              ],
              borderWidth: 0.1,
            },
          ],
        },
        this.options
      );
    },
    getValue(newValue) {
      this.render(newValue);
    },
  },
  computed: {
    ...mapGetters(["getCategoryList"]),
  },
  mounted() {
    this.render();
  },
  watch: {
    paymentsList: {
      handler: "getValue",
      deep: true,
    },
  },
};
</script>

<style scoped>
.container {
  padding: 0 120px 0 100px;
}
</style>
