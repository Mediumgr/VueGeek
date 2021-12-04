<div>
    <canvas ref="canvas" id="myChart" class="chart"></canvas>
</div>

<script>
import { Doughnut, mixins } from "vue-chartjs";
const { reactiveProp, reactiveData } = mixins;

export default {
  name: "VueChart",
  extends: Doughnut,
  mixins: [reactiveProp, reactiveData],
  /*   data() {
    return {
      commonCategoryValue: 0
    };
  }, */
  props: {
    options: {
      type: Object,
      default: null,
    },
    chartData: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    render() {
      this.renderChart(
        {
          labels: this.label,
          datasets: [
            {
              label: "expenses by category",
              data: this.getData,
              backgroundColor: [
                "#D460CF",
                "#F26D93",
                "#9A6AD6",
                "#E1FA71",
                "#60D6A9",
                "#FFC573",
              ],
              borderColor: [
                "##4671D5",
                "#4671D5",
                "r#4671D5",
                "#4671D5",
                "#4671D5",
                "#4671D5",
              ],
              borderWidth: 0.2,
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
  mounted() {
    this.render();
  },
  computed: {
    label() {
      const result = [];
      const duplicatesIndices = [];

      this.chartData.forEach((current, index) => {
        if (duplicatesIndices.includes(index)) return;

        result.push(current);

        // Сравниваем каждый элемент в массиве с последующим
        for (
          let comparisonIndex = index + 1;
          comparisonIndex < this.chartData.length;
          comparisonIndex++
        ) {
          const comparison = this.chartData[comparisonIndex];
          let valuesEqual = true;
          if (current.category !== comparison.category) {
            valuesEqual = false;
          }

          if (valuesEqual) duplicatesIndices.push(comparisonIndex);
        }
      });
      return result.map((item) => item.category);
    },
    getData() {
      const result = [];
      const duplicatesIndices = [];

      this.chartData.forEach((current, index) => {
        
        if (duplicatesIndices.includes(index)) return;

        result.push(current);
        // Сравниваем каждый элемент в массиве с последующим
        for (
          let comparisonIndex = index + 1;
          comparisonIndex < this.chartData.length;
          comparisonIndex++
        ) {
          const comparison = this.chartData[comparisonIndex];
          let valuesEqual = true;
          if (current.category !== comparison.category) {
            valuesEqual = false;
          }
          if (valuesEqual) {
            debugger
            result[index].value = current.value + comparison.value;
            duplicatesIndices.push(comparisonIndex);
          }
        }
      });
      debugger;
      return result.map((item) => item.value);
    },
  },
  watch: {
    chartData: {
      handler: "getValue",
      deep: true,
    },
  },
};
</script>
