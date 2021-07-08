<template>
  <div id="app">
    <header>
      <h1>My personal cost</h1>
    </header>
    <main>
      <AddPayment @addNewPayment="addData"/>
      <br/>
      <PaymentsDisplay :list="paymentsList" />
    </main>
  </div>
</template>

<script>
import PaymentsDisplay from "./components/PaymentsDisplay.vue";
import AddPayment from "./components/AddPayment.vue";

export default {
  name: "App",
  components: {
    PaymentsDisplay,
    AddPayment
  },
  data: () => ({
    paymentsList: []
  }),
  methods: {
    addData(data){
      this.paymentsList.push(data)
    }, 
    fetchData() {
      return [
        {
          date: "01.07.2021",
          category: "Food",
          value: 890
        },
        {
          date: "02.07.2021",
          category: "Sport",
          value: 400
        },
        {
          date: "03.07.2021",
          category: "Internet",
          value: 600
        },
        {
          date: "04.07.2021",
          category: "Cinema",
          value: 300
        },
        {
          date: "05.07.2021",
          category: "Lunch",
          value: 500
        },
      ];
    }
  },
  created(){
    this.paymentsList = this.fetchData()
  }
};
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 20px;
  padding-left: 20px;
}
</style>>