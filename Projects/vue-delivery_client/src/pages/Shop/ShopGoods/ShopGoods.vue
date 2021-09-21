<template>
    <div>
        <div class="goods">
            <div class="menu-wrapper">
                <ul>
                    <li class="menu-item" v-for="(good, index) in goods" :key="index"
                        :class="{current: index===currentIndex}" @click="clickMenuItem(index)">
                        <span class="text bottom-border-1px">
                        <img class="icon" :src="good.icon" v-if="good.icon">
                        {{good.name}}
                        </span>
                    </li>
                </ul>
            </div>
            <div class="foods-wrapper">
                <ul ref="foodsUl">
                    <li class="food-list-hook" v-for="(good, index) in goods" :key="index">
                        <h1 class="title">{{good.name}}</h1>
                        <ul>
                            <li class="food-item bottom-border-1px" v-for="(food, index) in good.foods"
                                :key="index" @click="showFood(food)">
                                <div class="icon">
                                    <img width="57" height="57" :src="food.icon">
                                </div>
                                <div class="content">
                                    <h2 class="name">{{food.name}}</h2>
                                    <p class="desc">{{food.description}}</p>
                                    <div class="extra">
                                        <span class="count">{{food.sellCount}} orders this month</span>
                                        <span>Commend Rate: {{food.rating}}%</span>
                                    </div>
                                    <div class="price">
                                        <span class="now">${{food.price}}</span>
                                        <span class="old" v-if="food.oldPrice">${{food.oldPrice}}</span>
                                    </div>
                                    <div class="cartcontrol-wrapper">
                                        <CartControl :food="food"/>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
            <ShopCart/>
        </div>
        <Food :food="food" ref="food"/>
    </div>
</template>

<script>
    import BScroll from 'better-scroll'
    import {mapState} from 'vuex'
    import CartControl from '../../../components/CartControl/CartControl.vue'
    import Food from '../../../components/Food/Food.vue'
    import ShopCart from '../../../components/ShopCart/ShopCart.vue'
    export default {

        mounted() {
            this.$store.dispatch('savePlaceId', {place_id: this.$route.params.place_id})
            this.$store.dispatch('getShopGoods', {place_id: this.place_id}).then(() => {
                this.$nextTick(()=>{
                    this._initScroll()
                    this._initTop()
                })
            })  
        },

        components: {
            CartControl,
            Food,
            ShopCart
        },

        data() {
            return {
                scrollY: 0, //scroll down position of the food list
                tops: [], //array of tops of food list
                food: {}
            }
        },

        computed: {
            ...mapState(['place_id', 'goods']),
            //get index of current food category
            currentIndex() {
                const {scrollY, tops} = this
                const index = tops.findIndex((top, index)=>{
                    return scrollY >= top && scrollY < tops[index+1]
                })
                return index
            }
        },

        methods: {
            //initialization method add '_' infront 
            _initScroll() {
                new BScroll('.menu-wrapper', {
                    click: true
                })
                this.foodsScroll = new BScroll('.foods-wrapper', {
                    probeType: 3,
                    click: true
                })

                this.foodsScroll.on('scroll', ({x, y}) => {
                    this.scrollY = Math.abs(y)
                })
            },

            _initTop() {
                const tops = []
                let top = 0
                tops.push(top)
                const lists = this.$refs.foodsUl.getElementsByClassName('food-list-hook')
                Array.prototype.slice.call(lists).forEach(list => {
                    top +=list.clientHeight
                    tops.push(top)
                })
                this.tops = tops
            },

            clickMenuItem(index) {
                //change the menu selection right away
                this.scrollY = this.tops[index]
                //change the list with 250ms transition 
                this.foodsScroll.scrollTo(0, -this.scrollY, 250) 
            },

            showFood(food) {
                this.food = food
                this.$refs.food.toggleShow()
            }
        }
    }
</script>

<style lang="sass" scoped>
    @import "../../../assets/sass/mixins"
    .goods
        display: flex
        position: absolute
        top: 195px
        bottom: 46px
        width: 100%
        background: #fff
        overflow: hidden
        .menu-wrapper
            flex: 0 0 80px
            width: 88px
            background: #f3f5f7
            .menu-item
                display: table
                height: 54px
                width: 66px
                padding: 0 12px
                line-height: 14px
                &.current
                    position: relative
                    z-index: 10
                    margin-top: -1px
                    background: #fff
                    color: $green
                    font-weight: 700
                    .text
                        border: 0
                .icon
                    display: inline-block
                    vertical-align: top
                    width: 12px
                    height: 12px
                    margin-right: 2px
                    background-size: 12px 12px
                    background-repeat: no-repeat
                .text
                    display: table-cell
                    width: 56px
                    vertical-align: middle
                    @include bottom-border-1px(rgba(7, 17, 27, 0.1))
                    font-size: 12px
        .foods-wrapper
            flex: 1
            .title
                padding-left: 14px
                height: 26px
                line-height: 26px
                border-left: 2px solid #d9dde1
                font-size: 12px
                color: rgb(147, 153, 159)
                background: #f3f5f7
            .food-item
                display: flex
                margin: 18px
                padding-bottom: 18px
                @include bottom-border-1px(rgba(7, 17, 27, 0.1))
                &:last-child
                    border: 0
                    margin-bottom: 0
                .icon
                    flex: 0 0 57px
                    margin-right: 10px
                .content
                    flex: 1
                    .name
                        margin: 2px 0 8px 0
                        height: 14px
                        width: 192px
                        line-height: 14px
                        font-size: 14px
                        overflow: hidden
                        text-overflow: ellipsis
                        white-space: nowrap
                        color: rgb(7, 17, 27)
                    .desc,.extra
                        line-height: 10px
                        font-size: 10px
                        color: rgb(147, 153, 159)
                    .desc
                        line-height: 12px
                        margin-bottom: 8px
                    .extra
                        .count
                            margin-right: 12px
                    .price
                        font-weight: 700
                        line-height: 24px
                        .now
                            margin-right: 8px
                            font-size: 14px
                            color: rgb(240, 20, 20)
                        .old
                            text-decoration: line-through
                            font-size: 10px
                            color: rgb(147, 153, 159)
                    .cartcontrol-wrapper
                        position: absolute
                        right: 0
                        bottom: 12px
</style>