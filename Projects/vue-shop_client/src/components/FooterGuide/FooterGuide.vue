<template>
    <div class="footer_guide">
        <a href="javascript:" class="guide_item" :class="{on: '/home'===$route.path}" @click="goTo('/home')">
            <span class="item_icon">
                <i class="iconfont icon-yangshi_icon_tongyong_home"></i>
            </span>
            <span>Home</span>
        </a>
        <a href="javascript:" class="guide_item" :class="{on: '/search'===$route.path}" @click="goTo('/search')">
            <span class="item_icon">
                <i class="iconfont icon-yangshi_icon_tongyong_search"></i>
            </span>
            <span>Search</span>
        </a>
        <a href="javascript:" class="guide_item" :class="{on: '/order'===$route.path}" @click="goTo('/order')">
            <span class="item_icon">
                <i class="iconfont icon-yangshi_icon_tongyong_trips"></i>
            </span>
            <span>Order</span>
        </a>
        <a href="javascript:" class="guide_item" :class="{on: '/profile'===$route.path}" @click="goTo('/profile')">
            <span class="item_icon">
                <i class="iconfont icon-yangshi_icon_tongyong_my_account"></i>
            </span>
            <span>Profile</span>
        </a>
    </div>
</template>

<script>
    export default {
        methods: {
            goTo(path) {
                this.$router.replace(path)
            }
        }
    }
</script>

<style lang="sass" scoped>
    @import "../../assets/sass/mixins"
    .footer_guide
        @include top-border-1px($grey)
        position: fixed
        z-index: 100
        left: 0
        right: 0
        bottom: 0
        background-color: #fff
        width: 100%
        height: 50px
        display: flex
        .guide_item
            display: flex
            flex: 1
            text-align: center
            flex-direction: column
            align-items: center
            margin: 5px
            color: #999999
            &.on
                color: #02a774
            span
                font-size: 12px
                margin-top: 2px
                margin-bottom: 2px
                .iconfont
                    font-size: 22px
</style>