<template>
  <div class="context" v-if="shown" :style="styles">
      <div v-for="item in items" :key="item.text" class="context__item" @click="onClick(item)">
          <img :src='require(`../assets/${item.src}`)' alt="pic" class="images">
          {{item.text}}
      </div>
  </div>
</template>

<script>
export default {    
    name: "ContextMenu",
    data () {
        return {
            items: [],
            shown: false,
            xPos: 0,
            yPos: 0
        }
    },
    methods: {
        onClick(item){
            item.action()
        },
        onShow({ items, caller }) {
            this.items = items,
            this.shown = true,
            this.setPosition(caller)
        },
        setPosition(caller){ 
            this.xPos = caller.getBoundingClientRect().left
            this.yPos = caller.getBoundingClientRect().top
        },
        onClose(){
            this.items = [],
            this.shown = false
        }
    },
    computed: {
        styles(){
            return {
                top: `${this.yPos - 15}px`,
                left: `${this.xPos + 15}px`
            }
        }
    },
    mounted(){
        this.$context.EventBus.$on('shown', this.onShow)
        this.$context.EventBus.$on('close', this.onClose)
    },
    beforeDestroy(){
        this.$context.EventBus.$off('shown', this.onShow)
        this.$context.EventBus.$off('close', this.onClose)
    }
}
</script>

<style lang="scss" scoped>
.context {
    position: absolute;
    background: #eee;
    cursor: pointer;
    display: flex;
    justify-content: space-evenly;
    min-height: 50px;
    min-width: 80px;
    flex-direction: column;
    transition: 1s 0.15s;
}

.context:before {
    content: " ";
    position: absolute;
    left: -10px;
    top: 18px;
    border-style: solid;
    border-width: 7.5px 9.5px 7.5px 0;
    border-color: transparent #eee transparent transparent
}

.context__item {
    padding-left: 4px;
    transition: 1.5s;
}

.context__item:hover {
    background:cadetblue
}

.images {
    width: 15px
}
</style>    