<template>
  <div>
      <div class="add">
        <button @click="hide=!hide" class="button">Add<span class="cross">+</span></button>
      </div>
      <div v-show="hide">
        <input v-model="date" placeholder="date"/>
        <input v-model.trim="category" placeholder="category"/>
        <input v-model.number="value" type="number" placeholder="value"/>
        <button @click="onClick" class="button">Add Data</button>
      </div>
  </div>
</template>

<script>
export default {
    name: "AddPayment",
    props: {
        selectCategory: String
    },
    data() {
        return {
            date: "",
            category: '',
            value: null,
            hide: false
        }
    },
    methods: {
        onClick(){
            const data = {
                date: this.date || this.getCurrentDate,
                category: this.selectCategory,
                value: this.value
            }
            console.log('add', data)
            console.log(this.category)
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
    watch: {
        selectCategory () {
            this.category = this.selectCategory
        }
    }
}
</script>

<style scoped>
.add {
    margin-bottom: 20px;
}

input {
    width: 175px;
    height: 22px;
    padding: 0 5px;
    margin-right: 10px
}

.button {
    width: 105px;
    height: 26px;
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

.cross {
    padding: 0 0 0 15px;
}
</style>