<div>
    <canvas ref="canvas" id="myChart"></canvas>
</div>

<script>
import { Doughnut } from "vue-chartjs";

export default {
  name: "VueChart",
  extends: Doughnut,
  props: {
    options: {
      type: Object,
      default: null,
    },
    paymentsList: {
      type: Array,
      default: () => [],
    },
    categories: {
      type: Array,
      default: () => [],
    }
  },
  methods: {
    render() {
      this.renderChart(
        {
          labels: this.labels(),
          datasets: [
            {
              label: "expenses by category",
              data: this.categories.map((category) => {
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
    labels() {
      if (this.paymentsList.length) {
        return this.categories
      }
    },
    getValue(newValue) {
      this.render(newValue);
    },
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
