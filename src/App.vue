<template>
  <div>
    <div id="app" v-if="showIt" :class="[substrate ? styleActive : '']">
      <div class="date">{{ date | date("datetime") }}</div>
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
      <div class="bottom">
        <div class="year">&copy;{{ new Date().getFullYear() }}</div>
        <a href="https://github.com/Mediumgr" target="blank">
          <span class="myName">Ruslan Guseinov</span>
          <img
            :src="require('/src/assets/logo.png')"
            alt="github"
            class="github"
          />
        </a>
      </div>
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
    $route(to) {
      if (to.name === "NotFound") {
        this.showIt = false;
      }
    },
  },
  mounted() {
    this.$modal.EventBus.$on("shown", this.onShown);
    this.$modal.EventBus.$on("hide", this.onHide);
    this.interval = setInterval(() => {
      this.date = new Date();
    }, 1000);
  },
  beforeDestroy() {
    this.$modal.EventBus.$off("shown", this.onShown);
    this.$modal.EventBus.$off("hide", this.onHide);
    clearInterval(this.interval);
  },
};
</script>

<style scoped>
a {
  text-decoration: none;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  padding-left: 20px;
  padding-top: 16px;
  margin: 0 auto;
  box-sizing: border-box;
}

.date {
  display: flex;
  justify-content: flex-end;
  margin: 0 20px 0 0;
  color: rgb(55, 202, 221);
  font-weight: 700;
}

.active {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
}

.bottom {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 0;
  left: 45%;
}

.myName {
  color: rgb(55, 202, 221);
  font-size: 17px;
  font-weight: 800;
}

.year {
  color: rgb(55, 202, 221);
  font-weight: 800;
  margin-right: 10px;
}

.github {
  position: relative;
  top: 2px;
  padding-left: 14px;
  width: 19px;
  height: 19px;
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
