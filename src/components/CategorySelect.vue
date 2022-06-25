<template>
  <div>
    <select v-model="selected" class="selected">
      <option v-for="option in categories" :key="option">
        {{ option }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: "CategorySelect",
  props: {
    categories: {
      type: Array,
      default: () => [],
    },
    categoryTransfer: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      selected: "",
    };
  },
  watch: {
    selected() {
      if (this.selected) {
        this.$store.commit("addSelected", this.selected);
      }
    },
  },
  created() {
    if (this.categoryTransfer) {
      this.selected = this.categoryTransfer;
    }
  },
};
</script>

<style>
.selected:hover {
  outline: none;
}
.selected {
  background-color: white;
  outline: none;
  width: 107px;
  height: 27px;
  border: 1px solid rgb(55, 202, 221);
  border-radius: 3px;
}
</style>
