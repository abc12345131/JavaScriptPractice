<template>
  <div>
        <h1>Sum: {{$store.state.sum}}</h1>
        <h2>BigSum: {{$store.getters.bigSum}}</h2>
        <select v-model="n">
            <option :value='1'>1</option>
            <option :value='2'>2</option>
            <option :value='3'>3</option>
        </select>
        <button @click="increment">+</button>
        <button @click="decrement">-</button>
        <button @click="incrementOdd">+ if odd</button>
        <button @click="incrementWait">+ after a while</button>
  </div>
</template>

<script>
    export default {
        name:'Count',
        data() {
            return {
                n: 1
            }
        },
        methods: {
            increment() {
                this.$store.dispatch('add', this.n)
            },
            decrement() {
                this.$store.dispatch('minus', this.n)
            },
            incrementOdd() {
                this.$store.dispatch('addOdd', this.n)
            },
            incrementWait() {
                this.$store.dispatch('addWait', this.n)
            },
        },

    }
</script>

<style lang="less" scoped>

</style>>

</style>