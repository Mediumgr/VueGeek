<template>
    <div class="block">
        <div @click="onClick(currentPage - 1)" class="common">
            -
        </div>
      <!--   <button @click="pageClick('page1')" class="button">Page 1</button>
        <button @click="pageClick('page2')" class="button">Page 2</button> -->
        <div v-for="num in amount" :key="num" @click="onClick(num)" :class="[{active:currentPage === num}]" class="button">{{ num }}         
        </div>
        <div @click="onClick(currentPage + 1)" class="common">
            +
        </div>
    </div>
</template>

<script>
export default {
    name: "Pages",
    props: {
        length: Number,
        displayedItems: Number,
        currentPage: Number
  },
    methods: {
    /*     pageClick(page) {
            this.$store.dispatch('fetchData', {
                pageNumber: page, timeoutDelay: 100
                })
        }, */
        onClick(page) {
                if (page < 1 || page > this.amount/*  || page === this.currentPage */) {
                return
            }
            this.$store.commit('paginate', page)
              /*   this.$emit('paginate', page) */
        }
    },
    computed: {
        amount () {
            return Math.ceil(this.length / this.displayedItems)
    }
  }
}

</script>

<style scoped>

.block {
    display: flex;
    flex-wrap: wrap;
    max-width: 410px;
}

.common {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 26px;
    margin: 20px 10px 20px;
    cursor: pointer;
}

.active {
      background: rgb(230, 2, 199);
    }

.button {
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 25px;
    height: 26px;
    margin: 20px 10px 20px;
    background: rgb(55, 202, 221);;
    color: rgb(235, 235, 235);
    border: none;
    cursor: pointer;
    text-transform: uppercase;
}

.active {
      background: rgb(230, 2, 199);
}
</style>