<template>
  <div class="wrapper">
    <button class="close" @click="close">close</button>
    <div class="header">{{ settings.header }}</div>
    <div class="content">
      <component :is="settings.name" :property="settings" />
    </div>
  </div>
</template>
<script>
import AddPayment from "./AddPayment.vue";

export default {
  components: { AddPayment },
  props: {
    settings: Object,
  },
  methods: {
    close() {
      this.$modal.hide();
      this.$router.push({ name: "Dashboard" });
    },
  },
  created() {
    this.$router.push({ name: "AddPaymentOpen", query: { data: "edit" } });
  },
};
</script>

<style scoped>
.wrapper {  
  width: 45%;
  padding: 20px;
  background: #62a0bd;
  z-index: 200;
  position: fixed;
  top: 220px;
  right: 72px;
  margin-left: 28px;
}

.close {
  background: rgb(230, 2, 199);
  width: 75px;
  color: white;
  position: absolute;
  right: 21px;
  transition: 1.5s;
  cursor: pointer;
  padding: 6px;
  border: none;
  outline: none;
}

.close:hover {
  background: rgb(121, 67, 113);
}
</style>
