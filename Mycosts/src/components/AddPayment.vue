<template>
  <div>
      <div class="add">
        <button @click="hide=!hide">Add New Cost +</button>
      </div>
      <div v-show="hide">
        <input v-model="date" placeholder="date"/>
        <input v-model.trim="category" placeholder="category"/>
        <input v-model.number="value" type="number" placeholder="value"/>
        <button @click="onClick">Add Data</button>
      </div>
  </div>
</template>

<script>
export default {
    name: "AddPayment",
    data(){
        return {
            date: "",
            category: "",
            value: null,
            hide: false
        }
    },
    methods: {
        onClick(){
            const { category, value } = this
            const data = {
                date: this.date || this.getCurrentDate,
                category,
                value
            }
            this.$emit('addNewPayment', data)
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
    }
}
</script>

<style>
.add {
    margin-bottom: 20px;
}

input {
    width: 175px;
    height: 22px;
    padding: 0 5px;
    margin-right: 10px
}

button {
    width: 175px;
    height: 26px;
    background: powderblue;
    color: darkcyan;
    border: none;
}
</style>