<template>
    <div class="ratings" ref="ratings">
        <div class="ratings-content">
            <div class="overview">
                <div class="overview-left">
                    <h1 class="score">{{infos.score}}</h1>
                    <div class="title">Overall Rating</div>
                    <div class="rank">Higher than 92% surrounding businesses</div>
                </div>
                <div class="overview-right">
                    <div class="score-wrapper">
                        <span class="title">Service Attitude:</span>
                        <Star :score="infos.serviceScore" :size="36" />
                        <span class="score">{{infos.serviceScore}}</span>
                    </div>
                    <div class="score-wrapper">
                        <span class="title">Food Rating:</span>
                        <Star :score="infos.foodScore" :size="36" />
                        <span class="score">{{infos.foodScore}}</span>
                    </div>
                    <div class="delivery-wrapper">
                        <span class="title">Delivery Time:</span>
                        <span class="delivery">{{infos.deliveryTime}} mins</span>
                    </div>
                </div>
            </div>
            <div class="split"></div>
            <div class="ratingselect">
                <div class="rating-type border-1px">
                    <span class="block positive" :class="{active: selectType===2}" @click="setSelectType(2)">
                        Total<span class="count">{{ratings.length}}</span>
                    </span>
                    <span class="block positive" :class="{active: selectType===0}" @click="setSelectType(0)">
                        Satisfied<span class="count">{{positiveSize}}</span>
                    </span>
                    <span class="block negative" :class="{active: selectType===1}" @click="setSelectType(1)">
                        Unsatisfied<span class="count">{{ratings.length-positiveSize}}</span>
                    </span>
                </div>
                <div class="switch" :class="{on: onlyShowText}" @click="toggleOnlyShowText">
                    <span class="iconfont icon-yangshi_icon_tongyong_selected"></span>
                    <span class="text">Reviews with content only</span>
                </div>
            </div>
            <div class="rating-wrapper">
                <ul>
                    <li class="rating-item" v-for="(rating, index) in filterRatings" :key="index">
                        <div class="avatar">
                            <img width="28" height="28" :src="rating.avatar">
                        </div>
                        <div class="content">
                            <h1 class="name">{{rating.username}}</h1>
                            <div class="star-wrapper">
                                <Star :score="rating.score" :size="24" />
                                <span class="delivery">{{rating.deliveryTime+(rating.deliveryTime? ' mins': '')}}</span>
                            </div>
                            <p class="text">{{rating.text}}</p>
                            <div class="recommend">
                                <span class="iconfont" :class="rating.rateType===0 ? 'icon-thumb_up' : 'icon-thumb_down'"></span>
                                <span class="item" v-for="(item, index) in rating.recommend" :key="index">{{item}}</span>
                            </div>
                            <div class="time">{{rating.rateTime | date-format}}</div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import BScroll from 'better-scroll'
    import {mapState, mapGetters} from 'vuex'
    import Star from '../../../components/Star/Star.vue'
    export default {

        data() {
            return {
                onlyShowText: false,
                selectType: 2
            }
        },

        components: {
            Star
        },

        mounted() {
            this.$store.dispatch('getShopRatings', {place_id: this.place_id}).then(() => {
                this.$nextTick(() => {
                    new BScroll(this.$refs.ratings, {
                        click: true
                    })
                })
            })  
        },

        computed: {
            ...mapState(['place_id', 'infos', 'ratings']),
            ...mapGetters(['positiveSize']),
            filterRatings() {
                const { ratings, onlyShowText, selectType} = this
                return ratings.filter(rating => {
                    return (selectType===2 || selectType===rating.rateType) && (!onlyShowText || rating.text.length>0)
                })
            }
        },

        methods: {
            toggleOnlyShowText() {
                this.onlyShowText = !this.onlyShowText
            },

            setSelectType(selectType) {
                this.selectType = selectType
            }
        }
    }
</script>

<style lang="sass" scoped>
    @import "../../../assets/sass/mixins"
    .ratings
        position: absolute
        top: 195px
        bottom: 0
        left: 0
        width: 100%
        overflow: hidden
        background: #fff
        .overview
            display: flex
            padding: 18px 0
            .overview-left
                flex: 0 0 137px
                padding: 6px 0
                width: 137px
                border-right: 1px solid rgba(7, 17, 27, 0.1)
                text-align: center
                @media only screen and (max-width: 320px)
                    flex: 0 0 120px
                    width: 120px
                .score
                    margin-bottom: 6px
                    line-height: 28px
                    font-size: 24px
                    color: rgb(255, 153, 0)
                .title
                    margin-bottom: 8px
                    line-height: 12px
                    font-size: 12px
                    color: rgb(7, 17, 27)
                .rank
                    line-height: 10px
                    font-size: 10px
                    color: rgb(147, 153, 159)
            .overview-right
                flex: 1
                padding: 6px 0 6px 24px
                @media only screen and (max-width: 320px)
                    padding-left: 6px
                .score-wrapper
                    margin-bottom: 8px
                    font-size: 0
                    .title
                        display: inline-block
                        margin: 0 5px
                        line-height: 18px
                        vertical-align: top
                        font-size: 12px
                        color: rgb(7, 17, 27)
                    .star
                        display: inline-block
                        margin: 0
                        vertical-align: top
                    .score
                        display: inline-block
                        line-height: 18px
                        vertical-align: top
                        font-size: 12px
                        color: rgb(255, 153, 0)
                .delivery-wrapper
                    font-size: 0
                    .title
                        line-height: 18px
                        font-size: 12px
                        color: rgb(7, 17, 27)
                    .delivery
                        margin-left: 12px
                        font-size: 12px
                        color: rgb(147, 153, 159)
        .split
            width: 100%
            height: 16px
            border-top: 1px solid rgba(7, 17, 27, 0.1)
            border-bottom: 1px solid rgba(7, 17, 27, 0.1)
            background: #f3f5f7
        .ratingselect
            .rating-type
                padding: 18px 0
                margin: 0 18px
                @include bottom-border-1px(rgba(7, 17, 27, 0.1))
                font-size: 0
                .block
                    display: inline-block
                    padding: 8px 12px
                    margin-right: 8px
                    line-height: 16px
                    border-radius: 1px
                    font-size: 12px
                    color: rgb(77, 85, 93)
                    background: rgba(77, 85, 93, 0.2)
                    &.active
                        background: $green
                        color: #fff
                    .count
                        margin-left: 2px
                        font-size: 8px
            .switch
                padding: 12px 18px
                line-height: 24px
                border-bottom: 1px solid rgba(7, 17, 27, 0.1)
                color: rgb(147, 153, 159)
                font-size: 0
                &.on
                    .icon-yangshi_icon_tongyong_selected
                        color: $green
                .icon-yangshi_icon_tongyong_selected
                    display: inline-block
                    vertical-align: top
                    margin-right: 4px
                    font-size: 24px
                .text
                    display: inline-block
                    vertical-align: top
                    font-size: 12px
        .rating-wrapper
            padding: 0 18px
            .rating-item
                display: flex
                padding: 18px 0
                @include bottom-border-1px(rgba(7, 17, 27, 0.1))
                .avatar
                    flex: 0 0 28px
                    width: 28px
                    margin-right: 12px
                    img
                        border-radius: 50%
                .content
                    position: relative
                    flex: 1
                    .name
                        margin-bottom: 4px
                        line-height: 12px
                        font-size: 10px
                        color: rgb(7, 17, 27)
                    .star-wrapper
                        margin-bottom: 6px
                        height: 12px
                        .star
                            display: inline-block
                            margin-right: 6px
                            vertical-align: top
                        .delivery
                            display: inline-block
                            vertical-align: top
                            line-height: 12px
                            font-size: 10px
                            color: rgb(147, 153, 159)
                    .text
                        margin-bottom: 8px
                        text-align: left
                        line-height: 18px
                        color: rgb(7, 17, 27)
                        font-size: 12px
                    .recommend
                        line-height: 16px
                        font-size: 0
                        .icon-thumb_up, .icon-thumb_down, .item
                            display: inline-block
                            margin: 0 8px 4px 0
                            font-size: 9px
                        .icon-thumb_up
                            color: $yellow
                        .icon-thumb_down
                            color: rgb(147, 153, 159)

                        .item
                            padding: 0 6px
                            border: 1px solid rgba(7, 17, 27, 0.1)
                            border-radius: 1px
                            color: rgb(147, 153, 159)
                            background: #fff
                    .time
                        position: absolute
                        top: 0
                        right: 0
                        line-height: 12px
                        font-size: 10px
                        color: rgb(147, 153, 159)
</style>