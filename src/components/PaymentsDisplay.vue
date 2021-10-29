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
            Value
        </div>
        <div class="div"></div>
      </div>
      <transition-group name="animation" tag="div">
        <div v-for="item in list" :key="item.id" class='elements'>
            <div class="idx">{{item.id}} </div>
            <div class="element">{{ item.date }} </div>
            <div class="element category">{{ item.category }} </div>
            <div class="element">{{ item.value }}</div>
            <div class="contextMenu" @click="contextMenuClick($event, item)">
                <img src="../assets/solid.svg" alt="...">
            </div>
        </div>
        </transition-group>
        <div class="emptyEelements" v-if="length === 0">Список пуст</div>
     <div class="total-block">
         <div class="total">Total: {{total}}</div>
     </div>
  </div>
</template>

<script>
export default {
    name: "PaymentsDisplay",
    props: {
        length: {
            type: Number,
            default: 0
        }, 
        list: {
            type: Array,
            default: ()=>[] 
        }, 
        total: {
            type: Number
        }
    },
    methods: {
        contextMenuClick(event, item) { 
            const items = [
                { text: "Edit", src: 'edit.svg', action: function () {this.actionEdit(item)}.bind(this)},
                //можно так: function () {this.actionEdit(item)}.bind(this) или так action: () => this.actionEdit(item)
                { text: "Delete", src: 'trash.svg', action: () => this.actionDelete(item)}
            ];
            this.$context.show({event,items});
        },
        actionEdit(item) {
            this.$modal.show('AddPayment',{header:"Add new data", editedItem:item})
        },
        actionDelete(item) {
            this.$store.commit('deletItem', item)
            this.$context.close()
        }
    },
    watch: {
        length() {
            if (this.length === 3) {
                this.$router.push({name: 'PagesPagination', params: {id: 1}})
                this.$store.commit('paginate', 1)//переход к первой странице
            }    
        }
    }
};  
</script>

<style scoped>

.elements {
    display: flex;
    justify-content: space-between;    
    padding: 20px 0 20px;
    width: 50%;
    border-bottom: 1px solid grey;
    /* Для анимации c  'background: linear-gradient' */
    position: relative;
    background: none;
    z-index: 10;
}

.elements::before {
/* Для анимации c  'background: linear-gradient' */
  content: "";
  display: block;
  opacity: 0;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, #a1ecff 35%, #40DBFF 65%, #52dfff 100%);
  transition: opacity 0.8s ease-in-out;
  z-index: -10;
}

.elements:hover::before {
/* Для анимации c  'background: linear-gradient' */
  opacity: 1;
}

.emptyEelements {
    display: flex;
    justify-content: center;    
    padding: 20px 0 20px;
    width: 50%;
    border-bottom: 1px solid grey; 
}

.element {
    text-align: start;
    flex-basis: 20%;
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
    width: 50%;
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
    flex-basis: 20%;
}

.total {
    text-align: start;
    text-transform: uppercase;
    color: red;
    font-size: 19px;

}

.total-block {
    display: flex;
    justify-content: flex-end; 
    padding: 20px 0 20px;
    width: 50%;
}

.contextMenu {
    width: 4.6px;
    cursor: pointer;
}

.animation-enter-active, .animation-leave-active {
    transition: 1s all;
}

.animation-enter, .animation-leave-to {
    transform: translateX(-50px);
}
</style>