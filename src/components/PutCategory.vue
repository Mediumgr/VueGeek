<template>
  <div class="block">
      Add to form: <input type="text" v-model="add" class="add">
      <button class="button" @click="addToForm">Add</button>
  </div>
</template>

<script>
/* import { mapActions }  для теста testPutCategory (см. method ниже)*/
import { mapActions } from 'vuex'

export default {
    name: "PutCategory",
    data(){
        return {
            add:'',
        }
    },
    methods: {
        addToForm() {
            if (this.add){
                console.log('ХУЙ')
                this.$store.commit('addDataToForm', this.add)
                this.add = ''
            }
            //для теста testPutCategory.test.js
            let data = this.add
            this.addForTest(data) 
        },
        //для теста testPutCategory.test.js
        ...mapActions(['addForTest']),
    }
}
</script>

<style scoped>
.block {
    margin-left: 15px;
}

.add {
    width:  100px;
    height: 20px;
    border-top: none; 
    border-left: none; 
    border-right: none; 
    border-bottom: 1px solid black;
    outline:none;
}

.add:hover {
    outline:none;
}

.button {
    height: 26px;
    width: 85px;
    border: none;
    outline: none;
    background: rgb(230, 2, 199);
    color: white;
    cursor: pointer;
    margin-left: 10px;
    transition: 1.5s;
}

.button:hover {
    background:  rgb(105, 2, 105);
    color: white;
}
</style>