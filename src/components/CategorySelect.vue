<template>
  <div>
      <select v-model="selected" class="selected">
          <option v-for="(option, idx) in categories" :key="idx">
              {{option}}
          </option>
      </select>
  </div>
</template>

<script>
export default {
    name: "CategorySelect",
    props: {
        categories: {
            type: Array,
            default: ()=>[]
        }
    },
    data(){
        return {
            selected: ''
        }
    },
    watch: {
        selected () {
            if (this.selected) {
                this.$store.commit('addSelected', this.selected)
                }
            }
        },
    created() {
        if (!this.selected) {
        this.selected = this.$store.state.selectCategory
            }
        }
    }
</script>

<style>
.selected:hover {
    outline: none;
}
.selected {
    outline: none;
    width: 105px;
    height: 22px;
    border: 1px solid grey;
    border-radius: 3px;
}
</style>