<template>
    <div class="div">
      <input v-model.number.trim="operand1"/>
       <input v-model.number.trim="operand2"/>
       = {{result}}
    <div class="keyboard">
   <button @click="Sum">+</button>
   <button @click="Subtraction">-</button>
   <button @click="Divide">/</button>
   <button @click="Multiply">*</button>
   <button @click="Exponentiation">Степень</button>
   <button @click="IntegerDivision">Цел.деление</button>
 </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      operand1: '',
      operand2: '',
      result: ''
    }
  },
  methods: {
    Sum () {
      this.result = this.operand1 + this.operand2
    },
    Subtraction () {
      this.result = this.operand1 - this.operand2
    },
    Divide () {
      if (this.operand2 !== 0) {
        this.result = this.operand1 / this.operand2
      } else this.result = 'Ошибка: На ноль делить нельзя'
    },
    Multiply () {
      this.result = this.operand1 * this.operand2
    },
    Exponentiation () {
      this.result = this.operand1 ** this.operand2
    },
    IntegerDivision () {
      if (this.operand2 !== 0) {
        this.result = Math.floor(this.operand1 / this.operand2)
      } else this.result = 'Ошибка: На ноль делить нельзя'
    }
  }
}
</script>

<style scoped lang="scss">

</style>
