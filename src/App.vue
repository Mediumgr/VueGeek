<template>
  <div>
    <div id="app" v-if="showIt" :class="[substrate ? styleActive : '']">
      <div class="date">{{ date | date('datetime') }}</div>
      <header>
        <transition appear name="fadeName">
          <h1>My personal cost</h1>
        </transition>
      </header>
      <main>
        <dashboard></dashboard>
      </main>
      <transition name="fade">
        <context-menu />
      </transition>
      <transition name="fade">
        <modal-window v-if="modalSettings.name" :settings="modalSettings" />
      </transition>
    </div>
    <page404 v-else />
  </div>
</template>

<script>
export default {
  name: "App",
  components: {
    Dashboard: () => import("./components/Dashboard.vue"),
    ModalWindow: () => import("./components/ModalWindow.vue"),
    ContextMenu: () => import("./components/ContextMenu.vue"),
    Page404: () => import("./components/Page404.vue"),
  },
  data() {
    return {
      modalSettings: {},
      showIt: true,
      substrate: false,
      styleActive: "active",
      interval: null,
      date: new Date(),
    };
  },
  methods: {
    onShown(settings) {
      this.modalSettings = settings;
      this.substrate = true;
    },
    onHide() {
      this.modalSettings = {};
      this.substrate = false;
    },
  },
  watch: {
    $route(toR) {
      if (toR.name === "NotFound") {
        this.showIt = false;
      }
    },
  },
  mounted() {
    this.$modal.EventBus.$on("shown", this.onShown);
    this.$modal.EventBus.$on("hide", this.onHide);
    this.interval = setInterval(() => {
      this.date = new Date()
    }, 1000)
  },
  beforeDestroy() {
    this.$modal.EventBus.$off("shown", this.onShown);
    this.$modal.EventBus.$off("hide", this.onHide);
    clearInterval(this.interval)
  },
};
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  padding-left: 20px;
  padding-top: 16px;
  margin: 0 auto;
}

.date {
  display: flex;
  justify-content: flex-end;
  margin: 0 20px 0 0;
  color: rgb(55, 202, 221);
  font-weight: 700;
}

.active {
  background: linear-gradient(to top left, powderblue, pink);
  z-index: 1;
  height: 97vh;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.fadeName-enter-active,
.fadeName-leave-active {
  transition: all 2s ease-in;
}
.fadeName-enter,
.fadeName-leave-to {
  opacity: 0;
}
</style>
