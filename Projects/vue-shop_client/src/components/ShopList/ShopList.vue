<template>
    <div class="shop_container">
        <ul class="shop_list" v-if="shops.length">
            <li class="shop_li border-1px" v-for="(shop, index) in shops" :key="index">
                <a>
                    <div class="shop_left">
                        <img class="shop_img" :src="baseImageUrl+shop.image_path">
                    </div>
                    <div class="shop_right">
                        <section class="shop_detail_header">
                            <h4 class="shop_title ellipsis">{{shop.name}}</h4>
                            <ul class="shop_detail_ul">
                                <li class="supports" v-for="(support, index) in shop.supports" :key="index">{{support.icon_name}}</li>
                            </ul>
                        </section>
                        <section class="shop_rating_order">
                            <section class="shop_rating_order_left">
                                <Star :score="shop.rating" :size="24"/>
                                <div class="rating_section">
                                    {{shop.rating}}
                                </div>
                                <div class="order_section">
                                    Sold {{shop.recent_order_num}} this month
                                </div>
                            </section>
                            <section class="shop_rating_order_right">
                                <span class="delivery_style delivery_right">{{shop.delivery_mode.text}}</span>
                            </section>
                        </section>
                        <section class="shop_distance">
                            <p class="shop_delivery_msg">
                                <span>Starting at ${{shop.float_minimum_order_amount}}</span>
                                <span class="segmentation">/</span>
                                <span>delivery fee: ${{shop.float_delivery_fee}}</span>
                            </p>
                        </section>
                    </div>
                </a>
            </li>
        </ul>
        <ul v-else>
            <li v-for="index in 5" :key="index">
                <img src="../../assets/images/shop_back.svg" alt="back"/>
            </li>
        </ul>
    </div>
</template>

<script>

    import { mapState } from 'vuex'
    import Star from '../Star/Star.vue'

    export default {

        mounted() {

            this.$store.dispatch('getShops')
        },

        data() {
            return {
                baseImageUrl: 'http://cangdu.org:8001/img/'
            }
        },

        computed: {
            ...mapState(['shops'])
        },

        components: {
            Star
        }
    }
</script>

<style lang="sass" scoped>
    @import "../../assets/sass/mixins"
    .shop_container
        margin-bottom: 50px
        .shop_list
            .shop_li
                @include bottom-border-1px(#f1f1f1)
                width: 100%
                >a
                    @include clearFix
                    display: block
                    box-sizing: border-box
                    padding: 15px 8px
                    width: 100%
                    .shop_left
                        float: left
                        box-sizing: border-box
                        width: 23%
                        height: 75px
                        padding-right: 10px
                        .shop_img
                            display: block
                            width: 100%
                            height: 100%
                    .shop_right
                        float: right
                        width: 77%
                        .shop_detail_header
                            @include clearFix
                            width: 100%
                            .shop_title
                                float: left
                                width: 200px
                                color: #333
                                font-size: 16px
                                line-height: 16px
                                font-weight: 700
                                &::before
                                    content: 'Brand'
                                    display: inline-block
                                    font-size: 11px
                                    line-height: 11px
                                    color: #333
                                    background-color: #ffd930
                                    padding: 2px 2px
                                    border-radius: 2px
                                    margin-right: 5px
                            .shop_detail_ul
                                float: right
                                margin-top: 3px
                                .supports
                                    float: left
                                    font-size: 10px
                                    color: #999
                                    border: 1px solid #f1f1f1
                                    padding: 0 2px
                                    border-radius: 2px
                        .shop_rating_order
                            @include clearFix
                            width: 100%
                            margin-top: 18px
                            margin-bottom: 8px
                            .shop_rating_order_left
                                float: left
                                color: #ff9a0d
                                .star //2ximg 3ximg
                                    float: left
                                    font-size: 0
                                    .star-item
                                        display: inline-block
                                        background-repeat: no-repeat
                                    &.star-48
                                        .star-item
                                            width: 20px
                                            height: 20px
                                            margin-right: 22px
                                            background-size: 20px 20px
                                            &:last-child
                                                margin-right: 0
                                            &.on
                                                @include bg-image('../../assets/images/stars/star48_on')
                                            &.half
                                                @include bg-image('../../assets/images/stars/star48_half')
                                            &.off
                                                @include bg-image('../../assets/images/stars/star48_off')
                                    &.star-36
                                        .star-item
                                            width: 15px
                                            height: 15px
                                            margin-right: 6px
                                            background-size: 15px 15px
                                            &:last-child
                                                margin-right: 0
                                            &.on
                                                @include bg-image('../../assets/images/stars/star36_on')
                                            &.half
                                                @include bg-image('../../assets/images/stars/star36_half')
                                            &.off
                                                @include bg-image('../../assets/images/stars/star36_off')
                                    &.star-24
                                        .star-item
                                            width: 10px
                                            height: 10px
                                            margin-right: 3px
                                            background-size: 10px 10px
                                            &:last-child
                                                margin-right: 0
                                            &.on
                                                @include bg-image('../../assets/images/stars/star24_on')
                                            &.half
                                                @include bg-image('../../assets/images/stars/star24_half')
                                            &.off
                                                @include bg-image('../../assets/images/stars/star24_off')
                                .rating_section
                                    float: left
                                    font-size: 10px
                                    color: #ff6000
                                    margin-left: 4px
                                .order_section
                                    float: left
                                    font-size: 10px
                                    color: #666
                                    transform: scale(.8)
                            .shop_rating_order_right
                                float: right
                                font-size: 0
                                .delivery_style
                                    transform-origin: 35px 0
                                    transform: scale(.7)
                                    display: inline-block
                                    font-size: 12px
                                    padding: 1px
                                    border-radius: 2px
                                .delivery_left
                                    color: #fff
                                    margin-right: -10px
                                    background-color: #02a774
                                    border: 1px solid #02a774
                                .delivery_right
                                    color: #02a774
                                    border: 1px solid #02a774
                        .shop_distance
                            @include clearFix
                            width: 100%
                            font-size: 12px
                            .shop_delivery_msg
                                float: left
                                transform-origin: 0
                                transform: scale(.9)
                                color: #666
                            .segmentation
                                color: #ccc
</style>