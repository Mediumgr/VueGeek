<template>
  <div>
      <div class="add">
        <button @click="hide=!hide" class="button">Add<span class="cross">+</span></button>
      </div>
      <div v-show="hide" class="display">
        <input v-model="date" placeholder="date" class="input"/>
        <input v-model.trim="category" placeholder="category" class="input"/>
        <input v-model.number="value" type="number" placeholder="value" class="input"/>
        <button @click="onClick" class="button" :disabled="!category || !value">Add Data</button>
      </div>
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
            this.$store.commit('addDataToPaymentsList', data)
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
        if (this.$route.name === 'AddPaymentOpen') {
            this.hide = true
        }
        if (this.$route.params.categoryId) {
            this.hide = true
            this.category = this.$store.state.selectCategory  = this.$route.params.categoryId
        }
        if (this.$route.query.value) {
            this.value = parseInt(this.$route.query.value)
        }
  /*    if (window.location.search) {
            const search = parseInt(window.location.search.split("").slice(7, 11).join(""))
            this.value = search
        } */
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
</style>