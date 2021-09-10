<template>
    <div class="cartcontrol">
        <transition name="move">
            <i class="iconfont icon-yangshi_icon_tongyong_remove" v-if="food.count" @click.stop="updateFoodCount(false)"></i>
        </transition>
        <div class="cart-count" v-if="food.count">{{food.count}}</div>
        <i class="iconfont icon-yangshi_icon_tongyong_add" @click.stop="updateFoodCount(true)"></i>
    </div>
</template>

<script>

    export default {
        props: {
            food: Object
        },

        methods: {
            updateFoodCount(isAdd) {
                this.$store.dispatch('updateFoodCount', {isAdd, food: this.food})
            }            
        }
    }
</script>

<style lang="sass" scoped>
    @import "../../assets/sass/mixins"
    .cartcontrol
        font-size: 0
        .cart-decrease
            display: inline-block
            padding: 6px
            line-height: 24px
            font-size: 24px
            color: rgb(0, 160, 220)
        .icon-yangshi_icon_tongyong_remove
            display: inline-block
            padding: 6px
            line-height: 24px
            font-size: 24px
            color: $green
            &.move-enter-active, &.move-leave-active
                transition: all .3s
            &.move-enter, &.move-leave-to
                opacity: 0
                transform: translateX(15px) rotate(180deg)
        .cart-count
            display: inline-block
            vertical-align: top
            width: 12px
            padding-top: 6px
            line-height: 24px
            text-align: center
            font-size: 10px
            color: rgb(147, 153, 159)
        .icon-yangshi_icon_tongyong_add
            display: inline-block
            padding: 6px
            line-height: 24px
            font-size: 24px
            color: $green
</style>