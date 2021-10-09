<template>
  <div id="app">
    <header>
      <h1>My personal cost</h1>
    </header>   
    <main>
      <dashboard></dashboard>
    </main>   
    <context-menu />
    <transition name="fade">
      <modal-window v-if="modalSettings.name" :settings="modalSettings"/>
    </transition>
    </div>
</template>

<script>
export default {
  name: "App",
  components: {
    Dashboard:  () =>
      import(/* webpackChunkName: 'Dashboard' */ "./components/Dashboard.vue"),
    ModalWindow: () =>
      import(/* webpackChunkName: 'ModalWindow' */ "./components/ModalWindow.vue"),
    ContextMenu:  () =>
      import(/* webpackChunkName: 'ContextMenu' */ "./components/ContextMenu.vue"),
  },
  data() {
    return {
      modalSettings: {},
    };
  },
  methods: {
    onShown(settings) {
      this.modalSettings = settings;
    },
    onHide() {
      this.modalSettings = {};
    },
  },
  mounted() {
    this.$modal.EventBus.$on("shown", this.onShown); 
    this.$modal.EventBus.$on("hide", this.onHide); 
  },
  beforeDestroy() {
    this.$modal.EventBus.$off("shown", this.onShown);
    this.$modal.EventBus.$off("hide", this.onHide);
  },
};
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 20px;
  padding-left: 20px;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
  opacity: 0;
}
</style>>