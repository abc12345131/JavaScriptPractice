<template>
    <section class="home">
        <!--Header-->
        <Header title="Your Location">
            <span class="header_search" slot="search">
                <i class="iconfont icon-yangshi_icon_tongyong_search"></i>
            </span>
            <span class="header_login" slot="login">
                <span class="header_login_text">Login/Register</span>
            </span>
        </Header>
        <!--Home Navigator-->
        <nav class="home_nav">
            <div class="swiper-container">
                <div class="swiper-wrapper">
                    <div class="swiper-slide">
                        <a href="javascript:"  class="link_to_food">
                            <div class="food_container">
                                <img src="../../assets/images/nav/1.jpg">
                            </div>
                            <span>Snacks</span>
                        </a>
                        <a href="javascript:" class="link_to_food">
                            <div class="food_container">
                                <img src="../../assets/images/nav/2.jpg">
                            </div>
                            <span>Tasty food</span>
                        </a>
                        <a href="javascript:" class="link_to_food">
                            <div class="food_container">
                                <img src="../../assets/images/nav/3.jpg">
                            </div>
                            <span>Drug Store</span>
                        </a>
                        <a href="javascript:" class="link_to_food">
                            <div class="food_container">
                                <img src="../../assets/images/nav/4.jpg">
                            </div>
                            <span>Healthy food</span>
                        </a>
                        <a href="javascript:"  class="link_to_food">
                            <div class="food_container">
                                <img src="../../assets/images/nav/5.jpg">
                            </div>
                            <span>Seafood</span>
                        </a>
                        <a href="javascript:" class="link_to_food">
                            <div class="food_container">
                                <img src="../../assets/images/nav/6.jpg">
                            </div>
                            <span>Breakfast</span>
                        </a>
                        <a href="javascript:" class="link_to_food">
                            <div class="food_container">
                                <img src="../../assets/images/nav/7.jpg">
                            </div>
                            <span>Desserts & drinks</span>
                        </a>
                        <a href="javascript:" class="link_to_food">
                            <div class="food_container">
                                <img src="../../assets/images/nav/8.jpg">
                            </div>
                            <span>Foodies recommendation</span>
                        </a>
                    </div>
                    <div class="swiper-slide">
                        <a href="javascript:"  class="link_to_food">
                            <div class="food_container">
                                <img src="../../assets/images/nav/9.jpg">
                            </div>
                            <span>Fruits and vegetables</span>
                        </a>
                    </div>
                </div>
                <div class="swiper-pagination"></div>
            </div>
        </nav>
        <!--Home Nearby Shop-->
        <div class="home_shop_list">
            <div class="shop_header">
                <i class="iconfont icon-yangshi_icon_tongyong_more_services"></i>
                <span class="shop_header_title">Nearby Shop</span>
            </div>
        <ShopList></ShopList>
        </div>
    </section>
</template>

<script>
    import Swiper from 'swiper'
    import SwiperCore, { Navigation, Pagination } from 'swiper/core'
    import 'swiper/swiper-bundle.css'

    import Header from '../../components/Header/Header.vue'
    import ShopList from '../../components/ShopList/ShopList.vue'
    export default {
        mounted() {
            SwiperCore.use([Navigation, Pagination])
            new Swiper('.swiper-container', {
                loop: true,
                pagination: {
                    el: '.swiper-pagination',
                }
            })    
        },
        components: {
            Header,
            ShopList
        }
    }
</script>

<style lang="sass" scoped>
    @import "../../assets/sass/mixins"
    .home
        width: 100%
        .home_nav
            @include bottom-border-1px($grey)
            margin-top: 45px
            height: 200px
            background: #fff
            .swiper-container
                width: 100%
                height: 100%
                .swiper-wrapper
                    width: 100%
                    height: 100%
                    .swiper-slide
                        display: flex
                        justify-content: center
                        align-items: flex-start
                        flex-wrap: wrap
                        .link_to_food
                            width: 25%
                            .food_container
                                display: block
                                width: 100%
                                text-align: center
                                padding-bottom: 10px
                                font-size: 0
                                img
                                    display: inline-block
                                    width: 50px
                                    height: 50px
                            span
                                display: block
                                width: 100%
                                text-align: center
                                font-size: 13px
                                color: #666
                .swiper-pagination
                    >span.swiper-pagination-bullet-active
                        background: #02a774
        .home_shop_list
            @include top-border-1px($grey)
            margin-top: 10px
            background: #fff
            .shop_header
                padding: 10px 10px 0
                .icon-yangshi_icon_tongyong_more_services
                    margin-left: 5px
                    margin-right: 5px
                    color: #999
                .shop_header_title
                    color: #999
                    font-size: 14px
                    line-height: 20px
</style>