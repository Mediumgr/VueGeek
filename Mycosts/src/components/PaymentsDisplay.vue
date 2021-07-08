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
      </div>
     <div v-for="(item, idx) in list" :key="idx" class="elements">
         <div class="idx">{{idx + 1}} </div>
         <div class="element">{{ item.date }} </div>
         <div class="element category">{{ item.category }} </div>
         <div class="element">{{ item.value }}</div>
     </div>
  </div>
</template>

<script>
export default {
    name: "PaymentsDisplay",
    props: {
        list: {
            type: Array,
            default: ()=>[] 
        }
    },
    data(){
        return {
        
        }
    }
}
</script>

<style scoped>
.elements {
    display: flex;
    justify-content: space-between;    
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
    font-weight: 700;
    flex-basis: 20%;
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

</style>