<template>
  <div class="payments-list">
    <div class="title">
      <div class="titleId">
        #
      </div>
      <div class="titleDate">
        Date
      </div>
      <div class="titleCategory">
        Category
      </div>
      <div class="titleValue">
        Amount
        <div class="flexBtns">
          <button
            v-for="cur in exchange"
            :key="cur.currency"
            @click="onClick(cur)"
            :class="['btn', { active: cur.currency === btnCurrency }]"
          >
            {{ cur.currency }}
          </button>
        </div>
      </div>
    </div>
    <transition-group name="animation" tag="div">
      <div v-for="item in list" :key="item.id" class="elements">
        <div class="idx">{{ item.id }}</div>
        <div class="element">{{ item.date }}</div>
        <div class="element category">{{ item.category }}</div>
        <div class="element">{{ item.value }} {{ btnCurrency }}</div>
        <div class="contextMenu" @click="contextMenuClick($event, item)">
          <img src="../assets/solid.svg" alt="..." />
        </div>
      </div>
    </transition-group>
    <div class="emptyElements" v-if="!length">
      Список пуст
    </div>
    <div class="total-block">
      <div class="total">Total: {{ total.toFixed(2) }} {{ btnCurrency }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PaymentsDisplay",
  props: {
    length: {
      type: Number,
      default: null,
    },
    list: {
      type: Array,
      default: () => [],
    },
    total: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      exchange: [{ currency: "€" }, { currency: "$" }, { currency: "₽" }],
      btnCurrency: "₽",
    };
  },
  methods: {
    contextMenuClick(event, item) {
      const items = [
        {
          text: "Edit",
          src: "edit.svg",
          action: function() {
            this.actionEdit(item);
          }.bind(this),
        },
        {
          text: "Delete",
          src: "trash.svg",
          action: () => this.actionDelete(item),
        },
      ];
      this.$context.show({ event, items });
    },
    actionEdit(item) {
      this.$modal.show("AddPayment", {
        header: "Add new data",
        editedItem: item,
      });
    },
    actionDelete(item) {
      this.$store.commit("deleteItem", item);
      this.$context.close();
    },
    onClick(value) {
      this.btnCurrency = value.currency;
      this.$store.commit("exchangeCurrency", this.btnCurrency);
    },
  },
  watch: {
    length() {
      if (this.length % 3 === 0) {
        let num = this.length / 3; // выводим по 3 элемента на каждой странице
        this.$emit("current-page", num);
      }
      if (this.length % 3 === 1) {
        let num = Math.floor(this.length / 3) + 1;
        this.$router.push({ name: "PagesPagination", params: { id: num } });
        this.$emit("current-page", num);
      }
    },
  },
};
</script>

<style scoped>
.payments-list {
  margin-left: 0;
  height: 314px;
}

.elements {
  display: flex;
  justify-content: space-between;
  padding: 20px 0 20px;
  border-bottom: 1px solid grey;
  /* для .animation-leave-active (техника FLIP) https://ru.vuejs.org/v2/guide/transitions.html*/
  transition: all 1s;
  /* Для анимации c  'background: linear-gradient' */
  position: relative;
  background: none;
  z-index: 10;
}

/* Для анимации c  'background: linear-gradient' */
.elements::before {
  content: "";
  display: block;
  opacity: 0;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, #a1ecff 35%, #40dbff 65%, #52dfff 100%);
  transition: all 0.8s ease-in-out;
  z-index: -10;
}

/* Для анимации c  'background: linear-gradient' */
.elements:hover::before {
  opacity: 1;
}

.element {
  text-align: start;
  flex-basis: 20%;
}

.emptyElements {
  display: flex;
  justify-content: center;
  padding: 20px 0 20px;
  border-bottom: 1px solid grey;
}

.idx {
  text-align: start;
}

.category {
  min-width: 55px;
}

.title {
  display: flex;
  justify-content: space-between;
  padding: 20px 0 20px;
  border-bottom: 1px solid grey;
  font-weight: 600;
}

.div {
  width: 4.6px;
}

.titleDate {
  flex-basis: 20%;
}

.titleCategory {
  flex-basis: 20%;
  min-width: 55px;
}

.titleValue {
  flex-basis: 30%;
}

.total {
  text-transform: uppercase;
  color: red;
  font-size: 19px;
  flex-basis: 30%;
}

.total-block {
  display: flex;
  justify-content: flex-end;
  padding: 20px 0 20px;
}

.contextMenu {
  width: 4.6px;
  cursor: pointer;
}

.flexBtns {
  display: flex;
  flex-wrap: wrap;
}
.btn {
  width: 18px;
  height: 16px;
  margin: 0 1px;
  background: rgb(55, 202, 221);
  color: white;
  border: none;
  cursor: pointer;
  transition: 1.5s;
}
.active {
  background: rgb(230, 2, 199);
}

.animation-enter-active {
  transition: all 1.3s;
}

.animation-enter,
.animation-leave-to {
  opacity: 0;
  transform: scale(0.4);
}
/* FLIP animation */
.animation-leave-active {
  position: absolute;
}
</style>
