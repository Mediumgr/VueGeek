<template>
  <div>
      <div class="add">
        <button @click="hide=!hide" class="button">Add<span class="cross">+</span></button>
      </div>
        <transition name="fade">
        <div v-show="hide" class="display">
            <input v-model="date" placeholder="date" class="input"/>
            <input v-model.trim="category" placeholder="category" class="input"/>
            <input v-model.number="value" type="number" placeholder="value" class="input"/>
            <button @click="onClick(); changeDataItem()" class="button" :disabled="!category || !value">Add Data</button>
        </div>
      </transition>
  </div>
</template>

<script>
export default {
    name: "AddPayment",
    props: {
        selectCategory: String,
        length: Number
    },
    data() {
        return {
            date: "",
            category: '',
            value: null,
            hide: false,
            id: 0
        }
    },
    methods: {
        onClick(){
            let idNum = this.length
            const data = {
                date: this.date || this.getCurrentDate,
                category: this.selectCategory,
                value: this.value,
                id: ++idNum
            }
            if (data.category !== undefined) {
                this.$store.commit('addDataToPaymentsList', data)
            }
        },
        changeDataItem() {
            const data = {
                date: this.date,
                category: this.category,
                value: this.value,
                id: this.$attrs.property.editedItem.id
            }
            this.$store.commit('changeDataItemPaymentsList', data)
            this.$modal.hide()
            this.$router.push({name: 'Dashboard'})
        }
    },
    computed: {
        getCurrentDate() {
            const today = new Date()
            const d = today.getDate()
            const m = today.getMonth() + 1
            const y = today.getFullYear()
            return `${d}.${m}.${y}`
        }
    },
    created(){
        if (this.$route.name === 'AddPaymentOpen' || this.$route.query.data === 'edit') {
            this.hide = true
        }
        if (this.$route.params.categoryId) {
            this.hide = true
            this.category = this.$store.state.selectCategory  = this.$route.params.categoryId
        }
        if (this.$route.query.value) {
            this.value = parseInt(this.$route.query.value)
        }
    },
    watch: {
        selectCategory () {
            this.category = this.selectCategory
        }
    },
}
</script>

<style scoped>

.display {
    margin-bottom: 20px;
}

.input {
    width: 175px;
    height: 22px;
    padding: 0 5px;
    margin-right: 10px
}

.button {
    width: 105px;
    height: 26px;
    margin: 10px 0;
    background: rgb(55, 202, 221);
    color: white;
    border: none;
    cursor: pointer;
    text-transform: uppercase;
    border: none;
    transition: 1.5s;
}

.button:hover {
    background: rgb(20, 6, 100);
    color: white
}

.button[disabled] {
    background: rgb(107, 107, 107);
}

.cross {
    padding: 0 0 0 15px;
}

.fade-enter-active, .fade-leave-active {
  transition: all 0.4s ease;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>