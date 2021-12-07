<template>
  <div>
    <div id="app" v-if="showIt" :class="[substrate ? styleActive : '']">
      <header>
        <transition appear name="fadeName">
          <h1>My personal cost</h1>
        </transition>
      </header>
      <main>
        <router-link
          :to="{ name: 'AddPaymentOpen', query: { value: 200 } }"
        ></router-link>
        <dashboard></dashboard>
      </main>
      <transition name="fade">
        <context-menu />
      </transition>
      <transition name="fade">
        <modal-window v-if="modalSettings.name" :settings="modalSettings" />
      </transition>
    </div>
    <page404 v-else-if="showPage404" />
  </div>
</template>

<script>
export default {
  name: "App",
  components: {
    Dashboard: () =>
      import(/* webpackChunkName: 'Dashboard' */ "./components/Dashboard.vue"),
    ModalWindow: () =>
      import(
        /* webpackChunkName: 'ModalWindow' */ "./components/ModalWindow.vue"
      ),
    ContextMenu: () =>
      import(
        /* webpackChunkName: 'ContextMenu' */ "./components/ContextMenu.vue"
      ),
    Page404: () =>
      import(/* webpackChunkName: 'Page404' */ "./components/Page404.vue")
  },
  data() {
    return {
      modalSettings: {},
      showIt: true,
      showPage404: false,
      substrate: false,
      styleActive: "active"
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
    }
  },
  watch: {
    $route(toR) {
      if (toR.name === "NotFound") {
        this.showIt = false;
        this.showPage404 = true;
      }
    }
  },
  mounted() {
    this.$modal.EventBus.$on("shown", this.onShown);
    this.$modal.EventBus.$on("hide", this.onHide);
  },
  beforeDestroy() {
    this.$modal.EventBus.$off("shown", this.onShown);
    this.$modal.EventBus.$off("hide", this.onHide);
  }
};
</script>

<style scoped>
.flex {
  display: flex;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  padding-left: 20px;
  padding-top: 20px;
  margin: 0 auto;
  font-family: serif;
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
