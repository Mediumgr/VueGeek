<template>
    <div>
        <button @click="pageClick('page1')" class="button">Page 1</button>
        <button @click="pageClick('page2')" class="button">Page 2</button>
    </div>
</template>

<script>
export default {
    name: "Pages",
    data() {
        return {

        }
    },
    methods: {
        pageClick(page) {
            this.$store.dispatch('fetchData', {
                pageNumber: page, timeoutDelay: 100
                })
        }
    }
}

</script>

<style scoped>
.button {
    width: 85px;
    height: 26px;
    margin: 20px 10px 20px;
    background: rgb(55, 202, 221);;
    color: rgb(235, 235, 235);
    border: none;
    cursor: pointer;
    text-transform: uppercase;
}

.button:hover {
    background: rgb(20, 6, 100);
    color: white
}
</style>