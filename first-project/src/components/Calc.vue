<template>
    <div class="div">
        <div>
        <input v-model.number.trim="operand1"/>
        <input v-model.number.trim="operand2"/>
        = {{result}}
      </div>
      <div class="keyboard">
        <button @click="Sum">+</button>
        <button @click="Subtraction">-</button>
        <button @click="Divide">/</button>
        <button @click="Multiply">*</button>
        <button @click="Exponentiation">Степень</button>
        <button @click="IntegerDivision">Цел.деление</button>
      </div>
        <input type="checkbox" id="checkbox" v-model="checked">
        <label for="checkbox">{{status}}</label>
      <div>
          <button v-for="btn in buttons" :key='btn' @click="changeInput(btn)" v-show="checked">{{btn}}</button>
      </div>
        <input type="radio" id="one" value="Операнд1" v-model="picked">
        <label for="one">Операнд1</label>
        <input type="radio" id="two" value="Операнд2" v-model="picked">
        <label for="two">Операнд2</label>
    </div>
</template>

<script>
export default {
  name: 'calculator',
  data () {
    return {
      operand1: '',
      operand2: '',
      result: '',
      checked: false,
      status: 'Отобразить клавиатуру',
      buttons: [1, 2, 3, 4, 5, 6, 7, 8, 9, 'убрать один символ'],
      picked: 'Операнд1'
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
    },
    changeInput (number) {
      if (number !== this.buttons[9]) {
        this.operand1 = parseInt(`${this.operand1}` + number)
      } if (number === this.buttons[9]) {
        console.log(this.operand1.slice(lastIndexOf(this.operand1)))
      }
    }
  }
}

</script>

<style scoped lang="scss">

</style>
