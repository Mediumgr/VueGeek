<template>
  <div>
      <div class="add">
        <button @click="hide=!hide" class="button">{{hide === true? 'Hide' : 'Add'}}<span class="cross">{{hide === true? '-' : '+'}}</span></button>
      </div>
        <transition name="fade">
        <div v-show="hide" class="display">
            <input v-model="date" name="testJest" placeholder="date" class="input"/>
            <input v-model.trim="category" name="testJest2" placeholder="category" class="input"/>
            <input v-model.number="value" name="testJest3" type="number" placeholder="value" class="input"/>
            <button @click="onClick()" class="button testBtn" :disabled="!category || !value">{{message}}</button>
            <div class="text">{{text}}</div>
        </div>
      </transition>
  </div>
</template>

<script>
/* import { mapActions }  для теста (см. method ниже)*/
import { mapActions } from 'vuex'

export default {
    name: "AddPayment",
    props: {
        selectCategory: String,
        length: Number
    },
    data() {
        return {
            message: 'Add Data',
            date: "",
            category: '',
            value: null,
            hide: false,
            id: 0,
            text: ''
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

            if (data.category !== undefined && data.value >= 0) {
                this.message = 'Added'
                this.text = ''
                this.$store.commit('addDataToPaymentsList', data)
                setTimeout(() => {
                    this.message = 'Add'
                }, 3500);
            } else {
                this.text = "Вы ввели недопустимое значение стоимости затрат.."
            }
            //ModalWindow property:
            if (this.$attrs.property) {
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

            /* для теста testVuex.test.js при клике*/
            const someData = this.data
            this.addData(someData)
        },
        /* для теста testVuex.test.js*/
        ...mapActions(['addData']),
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

.text {
    width: 400px;
    background: #ccc;
}

.fade-enter-active, .fade-leave-active {
  transition: all 0.4s ease;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>