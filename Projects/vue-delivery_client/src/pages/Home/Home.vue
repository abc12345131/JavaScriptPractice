<template>
    <section class="home">
        <!--Header-->
        <Header :title="address.formatted_address">
            <router-link class="header_search" slot="search" to="/search">
                <i class="iconfont icon-yangshi_icon_tongyong_search"></i>
            </router-link>
            <router-link class="header_login" slot="login" :to="userInfo._id ? '/userinfo' : '/login'">
                <span class="header_login_text" v-if="!userInfo._id">
                    Login/Register
                </span>
                <span class="header_login_text" v-else>
                    <i class="iconfont icon-yangshi_icon_tongyong_user"></i>
                </span>
            </router-link>
        </Header>
        <!--Home Navigator-->
        <nav class="home_nav">
            <div class="swiper-container" v-if="categoryArr.length">
                <div class="swiper-wrapper">
                    <div class="swiper-slide" v-for="(pageArr,index) in categoryArr" :key="index">
                        <a href="javascript:"  class="link_to_food" v-for="(category,index) in pageArr" :key="index">
                            <div class="food_container">
                                <img :src="baseImageUrl+category.image_url">
                            </div>
                            <span>{{category.title}}</span>
                        </a>
                    </div>
                </div>
                <div class="swiper-pagination"></div>
            </div>
            <img src="../../assets/images/home_back.svg" alt="back" v-else/>
        </nav>
        <!--Home Nearby Shop-->
        <div class="home_shop_list">
            <div class="shop_header">
                <i class="iconfont icon-yangshi_icon_tongyong_more_services"></i>
                <span class="shop_header_title">Nearby Shop</span>
            </div>
        <ShopList/>
        </div>
    </section>
</template>

<script>

    import { mapState } from 'vuex' 

    import Swiper from 'swiper'
    import SwiperCore, { Navigation, Pagination } from 'swiper/core'
    import 'swiper/swiper-bundle.css'

    import Header from '../../components/Header/Header.vue'
    import ShopList from '../../components/ShopList/ShopList.vue'

    export default {

        mounted() {

            this.$store.dispatch('getFoodCategories'),
            this.$store.dispatch('getShops'),
            SwiperCore.use([Navigation, Pagination])
        },

        data() {
            return {
                baseImageUrl: 'https://fuss10.elemecdn.com'
            }
        },

        components: {
            Header,
            ShopList
        },

        computed: {
            ...mapState(['address', 'foodCategories', 'userInfo', 'shops']),

            categoryArr() {
                const { foodCategories } = this

                const totalArr = []
                let pageArr = []

                foodCategories.forEach(c => {
                    if(pageArr.length===8) {
                        pageArr=[]
                    }

                    if(pageArr.length===0) {
                        totalArr.push(pageArr)
                    }

                    pageArr.push(c)
                });

                return totalArr
            }

        },

        watch: {
            foodCategories(value) {
                this.$nextTick(()=>{
                    new Swiper('.swiper-container', {
                        loop: true,
                        pagination: {
                            el: '.swiper-pagination',
                        }
                    })
                })
            }
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