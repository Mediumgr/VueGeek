<template>
  <div class="block">
    <div @click="onClick(currentPage - 1)" class="common">
      -
    </div>
    <transition-group name="animation" class="flex">
      <div
        v-for="num in amount"
        :key="num"
        @click="onClick(num)"
        :class="[{ active: currentPage === num }]"
        class="button"
      >
        {{ num }}
      </div>
    </transition-group>
    <div @click="onClick(currentPage + 1)" class="common">
      +
    </div>
  </div>
</template>

<script>
export default {
  name: "Pages",
  props: {
    length: {
      type: Number,
      default: null,
    },
    displayedItems: {
      type: Number,
      default: null,
    },
    currentPage: {
      type: Number,
      default: null,
    },
  },
  methods: {
    onClick(page) {
      if (page < 1 || page > this.amount) {
        return;
      }
      this.$emit("current-page", page);
      this.$router.push({ name: "PagesPagination", params: { id: page } });
    },
  },
  computed: {
    amount() {
      return Math.ceil(this.length / this.displayedItems);
    },
  },
  created() {
    if (this.$route.params.id) {
      const page = +this.$route.params.id;
      this.$emit("current-page", page);
    }
  }
};
</script>

<style scoped>
.block {
  display: flex;
  flex-wrap: wrap;
  max-width: 410px;
}

.flex {
  display: flex;
}

.common {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 26px;
  margin: 20px 10px 20px;
  cursor: pointer;
}

.button {
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 25px;
  height: 26px;
  margin: 20px 10px 20px;
  background: rgb(55, 202, 221);
  color: rgb(235, 235, 235);
  border: none;
  cursor: pointer;
  text-transform: uppercase;
}

.active {
  background: rgb(230, 2, 199);
}

.animation-enter-active,
.animation-leave-active {
  transition: 1s all;
}

.animation-enter,
.animation-leave-to {
  transform: translateX(-35px);
}
</style>
