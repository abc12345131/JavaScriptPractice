<template>
    <div class="shop-infos">
        <div class="infos-content">
            <section class="section">
                <h3 class="section-title">Delivery Information</h3>
                <div class="delivery">
                    <div>
                        <span class="delivery-icon">{{infos.description}}</span>
                        <span>BW Dedicated delivery</span>
                    </div>
                    <div class="delivery-money">
                        <span>{{infos.distance}} from your location, takes about {{infos.deliveryTime}}mins on average</span><br>
                        <span>Deliver Fee: ${{infos.deliveryPrice}}</span>
                    </div>
                </div>
            </section>
            <div class="split"></div>
            <section class="section">
                <h3 class="section-title">Activities&Services</h3>
                <div class="activity" v-if="infos.supports.length">
                    <div class="activity-item" v-for="(support, index) in infos.supports" :key="index"
                        :class="supportClasses[support.type]">
                        <span class="content-tag">
                            <span class="mini-tag">{{support.name}}</span>
                        </span>
                        <span class="activity-content">{{support.content}}</span>
                    </div>
                </div>
            </section>
            <div class="split"></div>
            <section class="section">
                <h3 class="section-title">Photos</h3>
                <div class="pic-wrapper">
                    <ul class="pic-list" ref="picsUl" v-if="infos.pics.length">
                        <li class="pic-item" v-for="(pic, index) in infos.pics" :key="index">
                            <img width="120" height="90" :src="pic"/>
                        </li>
                    </ul>
                </div>
            </section>
            <div class="split"></div>
            <section class="section">
                <h3 class="section-title">Shop Information</h3>
                <ul class="detail">
                    <li><span class="bold">Category</span> <span>{{infos.category}}</span></li>
                    <li><span class="bold">Phone Number</span> <span>{{infos.phone}}</span></li>
                    <li><span class="bold">Address</span> <span>{{infos.address}}</span></li>
                    <li><span class="bold">Business hours</span> <span>{{infos.workTime}}</span></li>
                </ul>
            </section>
        </div>
    </div>
</template>

<script>
    import BScroll from 'better-scroll'
    import {mapState} from 'vuex'
    export default {
        
        mounted() {
            if(!this.infos.pics) {
                return
            } else {
                this._initScroll()
            }
        },

        data() {
            return {
                supportClasses: ['activity-green', 'activity-red', 'activity-orange']
            }
        },

        computed: {
            ...mapState(['infos'])
        },

        methods: {
            _initScroll() {
                new BScroll('.shop-infos')
                const ul = this.$refs.picsUl
                const liWidth = 120
                const space = 6
                const count = this.infos.pics.length
                ul.style.width = (liWidth + space) * count - space + 'px'
                new BScroll('.pic-wrapper', {
                    scrollX: true
                })
            }
        },

        watch: {
            infos() {
                this.$nextTick(() => {
                    this._initScroll()
                })
            }
        }
    }
</script>

<style lang="sass" scoped>
    @import "../../../assets/sass/mixins"
    .shop-infos
        position: absolute
        top: 195px
        bottom: 0
        left: 0
        width: 100%
        background: #fff
        overflow: hidden
        .section
            padding: 16px 14px 14px
            font-size: 16px
            background-color: #fff
            color: #666
            border-bottom: 1px solid #eee
            position: relative
            .section-title
                color: #000
                font-weight: 700
                line-height: 16px
                > .iconfont
                    float: right
                    color: #ccc
            .delivery
                margin-top: 16px
                font-size: 13px
                line-height: 18px
                .delivery-icon
                    width: 55px
                    font-size: 11px
                    margin-right: 10px
                    display: inline-block
                    text-align: center
                    color: #fff
                    background-color: #0097ff
                    padding: 1px 0
                    border-radius: 4px
                .delivery-money
                    margin-top: 5px
            .activity
                margin-top: 16px
                .activity-item
                    margin-bottom: 12px
                    display: flex
                    font-size: 13px
                    align-items: center
                    &.activity-green
                        .content-tag
                            background-color: rgb(112, 188, 70)
                    &.activity-red
                        .content-tag
                            background-color: rgb(240, 115, 115)
                    &.activity-orange
                        .content-tag
                            background-color: rgb(241, 136, 79)
                    .content-tag
                        display: inline-block
                        border-radius: 2px
                        width: 80px
                        height: 18px
                        margin-right: 10px
                        color: #fff
                        font-style: normal
                        position: relative
                        .mini-tag
                            position: absolute
                            left: 0
                            top: 0
                            right: -100%
                            bottom: -100%
                            font-size: 20px
                            transform: scale(.5)
                            transform-origin: 0 0
                            display: flex
                            align-items: center
                            justify-content: center
            .pic-wrapper
                width: 100%
                overflow: hidden
                white-space: nowrap
                margin-top: 16px
                .pic-list
                    font-size: 0
                    .pic-item
                        display: inline-block
                        margin-right: 6px
                        width: 120px
                        height: 90px
                        &:last-child
                            margin: 0
            .detail
                margin-bottom: -16px
                > li
                    display: flex
                    justify-content: space-between
                    align-items: center
                    margin-right: -10px
                    padding: 16px 12px 16px 0
                    line-height: 16px
                    @include bottom-border-1px(#ddd)
                    font-size: 13px
                    > .bold
                        font-weight: 700
                        color: #333
                    &:last-child
                        border: 0
        .split
            width: 100%
            height: 16px
            border-top: 1px solid rgba(7, 17, 27, 0.1)
            border-bottom: 1px solid rgba(7, 17, 27, 0.1)
            background: #f3f5f7
</style>