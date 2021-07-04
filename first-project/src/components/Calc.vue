<template>
    <div class="div">
        <div>
        <input v-model.number.trim="operand1"/>
        <input v-model.number.trim="operand2"/>
        = {{result}}
        </div>
        <div class="error">
          {{error}}
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
      <div class="button">
          <button v-for="btn in buttons" :key='btn' @click="changeInput(btn)" v-show="checked">{{btn}}</button>
      </div>
        <input type="radio" id="one" value="operand1" v-model="picked">
        <label for="one">Операнд1</label>
        <input type="radio" id="two" value="operand2" v-model="picked">
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
      error: '',
      checked: false,
      status: 'Отобразить клавиатуру',
      buttons: [1, 2, 3, 4, 5, 6, 7, 8, 9, 'убрать один символ'],
      picked: ''
    }
  },
  methods: {
    Sum () {
      this.error = ''
      this.result = this.operand1 + this.operand2
    },
    Subtraction () {
      this.error = ''
      this.result = this.operand1 - this.operand2
    },
    Divide () {
      if (this.operand2 !== 0) {
        this.error = ''
        this.result = this.operand1 / this.operand2
      } else {
        this.error = 'Ошибка: На ноль делить нельзя'
        this.result = 'Error'
      }
    },
    Multiply () {
      if (this.operand2 !== 0) {
        this.error = ''
        this.result = this.operand1 * this.operand2
      } else {
        this.error = 'Ошибка: На ноль умножать нельзя'
        this.result = 'Error'
      }
    },
    Exponentiation () {
      this.error = ''
      this.result = this.operand1 ** this.operand2
    },
    IntegerDivision () {
      if (this.operand2 !== 0) {
        this.error = ''
        this.result = Math.floor(this.operand1 / this.operand2)
      } else {
        this.error = 'Ошибка: На ноль делить нельзя'
        this.result = 'Error'
      }
    },
    changeInput (number) {
      if (number !== this.buttons[9] && this.picked === 'operand1') {
        this.operand1 = parseInt(`${this.operand1}` + number)
      } else if (number === this.buttons[9] && this.picked === 'operand1') {
        const array = this.operand1.toString().split('').map(int => parseInt(int))
        array.pop()
        this.operand1 = parseInt(array.join(''))
      }
      if (number !== this.buttons[9] && this.picked === 'operand2') {
        this.operand2 = parseInt(`${this.operand2}` + number)
      } else if (number === this.buttons[9] && this.picked === 'operand2') {
        const array = this.operand2.toString().split('').map(int => parseInt(int))
        array.pop()
        this.operand2 = parseInt(array.join(''))
      }
    }
  }
}

</script>

<style scoped lang="scss">
.div {
  margin:250px 100px;
  align-items: center;
  text-align: center;
}
.error {
  color:red;
}
.keyboard {
  padding: 10px 0;
}
.button {
  padding: 15px 0;
}
</style>
