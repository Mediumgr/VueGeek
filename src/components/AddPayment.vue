<template>
  <div>
    <div>
      <transition appear name="btn">
        <button @click="hide = !hide" class="button" name="btn">
          {{ hide === false ? "Add" : "Hide" }}
          <span class="cross">
            {{ hide === false ? "+" : "-" }}
          </span>
        </button>
      </transition>
    </div>
    <transition appear name="fade">
      <div v-show="hide" class="display">
        <input
          v-model="date"
          type="date"
          placeholder="Date"
          class="input testJest"
        />
        <input
          v-model="category"
          placeholder="Category"
          class="input testJest2"
        />
        <input
          v-model.number="value"
          type="number"
          placeholder="Amount in ₽ only"
          class="input testJest3"
        />
        <button
          @click="onClick()"
          class="button"
          :disabled="!category || value <= 0"
        >
          {{ message }}
        </button>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "AddPayment",
  props: {
    selectCategory: String,
    length: Number,
  },
  data() {
    return {
      message: "Add Data",
      date: "",
      category: "",
      value: null,
      hide: false,
      id: 0,
    };
  },
  methods: {
    onClick() {
      let idNum = this.length;
      const data = {
        id: ++idNum,
        date: this.date || this.getCurrentDate,
        category: this.selectCategory,
        value: +this.value.toFixed(2),
      };
      if (data.category && data.value >= 0) {
        this.message = "Added";
        this.$store.commit("addDataToPaymentsList", data);
        this.value = null;
        this.date = "";
        setTimeout(() => {
          this.message = "Add";
        }, 2500);
      }
      if (this.$attrs.property) {
        const data = {
          id: this.$attrs.property.editedItem.id,
          date: this.date,
          category: this.category,
          value: this.value,
        };
        this.$store.commit("changeDataItemPaymentsList", data);
        this.$modal.hide();
        this.$context.close();
        this.$router.push({ name: "Dashboard" });
      }
    },
  },
  computed: {
    getCurrentDate() {
      const today = new Date();
      const d = today.getDate();
      const m = today.getMonth() + 1;
      const y = today.getFullYear();
      return `${d}.${m}.${y}`;
    },
  },
  created() {
    if (
      this.$route.name === "AddPaymentOpen" ||
      this.$route.query.data === "edit"
    ) {
      this.hide = true;
    }
    if (
      this.$route.name === "AddPayment" &&
      this.$route.params.categoryId !== ""
    ) {
      this.hide = true;
      const categoryRoute = this.$route.params.categoryId;
      this.category =
        categoryRoute.charAt(0).toUpperCase() + categoryRoute.slice(1);
      this.$emit("add-to-category-select", this.category);
    }
    if (this.$route.name === "AddPayment" && this.$route.query.value) {
      this.value = +this.$route.query.value;
    }
    if (this.$attrs.property) {
      this.hide = true;
      this.date = this.$attrs.property.editedItem.date;
      this.category = this.$attrs.property.editedItem.category;
      this.value = this.$attrs.property.editedItem.value;
      this.id = this.$attrs.property.editedItem.id;
    }
  },
  watch: {
    selectCategory() {
      this.category = this.selectCategory;
    },
    $route(toR) {
      if (toR.name === "AddPaymentOpen") {
        this.hide = true;
      }
      if (toR.name === "AddPayment" && toR.params.categoryId) {
        this.hide = true;
        const categoryRoute = this.$route.params.categoryId;
        this.category =
          categoryRoute.charAt(0).toUpperCase() + categoryRoute.slice(1);
        this.$emit("add-to-category-select", this.category);
      }
      if (toR.name === "AddPayment" && toR.query.value) {
        this.value = parseInt(toR.query.value);
      }
    },
  },
};
</script>

<style scoped>
.display {
  margin-bottom: 20px;
}

.input {
  width: 175px;
  height: 22px;
  padding: 0 5px;
  margin-right: 10px;
  border: 1px solid black;
}

.input:hover {
  border: 1px solid rgb(55, 202, 221);
}

.input:focus {
  outline: none;
}

.button {
  width: 105px;
  height: 26px;
  margin: 10px 0;
  background: rgb(55, 202, 221);
  color: white;
  border: none;
  cursor: pointer;
  text-transform: uppercase;
  transition: 1.5s;
}

.button:hover {
  background: rgb(20, 6, 100);
  color: white;
}

.button[disabled] {
  background: rgb(107, 107, 107);
}

.cross {
  padding: 0 0 0 15px;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 1.5s ease;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.btn-enter,
.btn-leave-to {
  transform: translateX(-50px);
}
.btn-enter-active,
.btn-leave-active {
  transition: all 1.5s ease;
}
</style>
