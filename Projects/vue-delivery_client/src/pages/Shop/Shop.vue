<template>
    <div>
        <ShopHeader/>
        <div class="tab">
            <div class="tab-item">
                <router-link to="/shop/goods" replace>Food</router-link>
            </div>
            <div class="tab-item">
                <router-link to="/shop/ratings" replace>Rating</router-link>
            </div>
            <div class="tab-item">
                <router-link to="/shop/infos" replace>About</router-link>
            </div>
        </div>
        <keep-alive>
            <router-view/>
        </keep-alive>
    </div>
</template>

<script>
    import ShopHeader from '../../components/ShopHeader/ShopHeader.vue'
    import {mapState} from 'vuex'
    export default {

        mounted() {
            this.$store.dispatch('getShopInfos', {place_id: this.place_id})
        },

        components: {
            ShopHeader
        },

        computed: {
            ...mapState(['place_id'])
        }

    }
</script>

<style lang="sass" scoped>
    @import "../../assets/sass/mixins"
    .tab
        height: 40px
        line-height: 40px
        background: #fff
        @include bottom-border-1px(rgba(7, 17, 27, 0.1))
        .tab-item
            float: left
            width: 33.33333%
            text-align: center
            font-size: 14px
            color: rgb(77, 85, 93)
            a
                display: block
                position: relative
                &.router-link-active
                    color: #02a774
                    &::after
                        content: ''
                        position: absolute
                        left: 50%
                        bottom: 1px
                        width: 35px
                        height: 2px
                        transform: translateX(-50%)
                        background: #02a774
</style>