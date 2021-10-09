<template>
  <div class="wrapper">
   <button class="close" @click='close'>close</button> 
    <div class="header">{{ settings.header }}</div>
    <div class="content">
          <component :is="settings.name" :property="settings"/>
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
    close(){
      this.$modal.hide()
      this.$router.push({name: 'Dashboard'})
    }
  },
  created() {
    this.$router.push({name: 'AddPaymentOpen', query: { data: 'edit' }})
    },
};
</script>

<style scoped lang="scss">
.wrapper {
    width: 34%;
    padding: 20px;
    position: absolute;
    top: 211px;
    background: #62a0bd;
    z-index: 20;
}

.close {
    background: rgb(230, 2, 199);
    color: white;
    position: absolute;
    right: 21px;
    transition: 1.5s;
    cursor: pointer
}

.close:hover {
  background: rgb(121, 67, 113);
}
</style>
