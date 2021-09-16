<template>
    <section class="search">
        <Header title="Search"/>
        <form class="search_form" @submit.prevent="search">
            <input type="search" placeholder="Please input shop name" class="search_input" v-model="keyword">
            <input type="submit" class="search_submit"/>
        </form>
        <section class="list" v-if="!noSearchShops">
            <ul class="list_container">
                <router-link :to="{name:'ShopDetail', params:{place_id:shop.place_id}}" tag="li"
                            v-for="shop in searchShops" :key="shop.place_id" class="list_li">
                    <section class="shop_left">
                        <img class="shop_img" :src="baseImageUrl+shop.photos[0].photo_reference+'&maxwidth=75&key=GOOGLE_API_KEY'">
                    </section>
                    <section class="shop_right">
                        <div class="shop_right_text">
                            <div>
                                <span>{{shop.name}}</span>
                            </div>
                            <Star :score="shop.rating" :size="24"/>
                            <div>
                                {{shop.rating}}
                            </div>
                            <div>
                                Total Review Number: {{shop.user_ratings_total}}
                            </div>
                        </div>
                    </section>
                </router-link>
            </ul>
        </section>
        <div class="search_none" v-else>Sorry！No result</div>
    </section>
</template>

<script>
    import {mapState} from 'vuex'
    import Header from '../../components/Header/Header.vue'
    import Star from '../../components/Star/Star.vue'
    export default {

        components: {
            Header,
            Star
        },

        data() {
            return {
                keyword: '',
                noSearchShops: false,
                baseImageUrl: 'https://maps.googleapis.com/maps/api/place/photo?photo_reference='
            }
        },

        computed: {
            ...mapState(['searchShops'])
        },

        methods: {
            search() {
                const keyword = this.keyword.trim()
                if(keyword) {
                    this.$store.dispatch('searchShops', {keyword})
                }
            }  
        },

        watch: {
            searchShops(value) {
                if(!value.length) {
                    this.noSearchShops = true
                } else {
                    this.noSearchShops = false
                }
            }
        }

    }
</script>

<style lang="sass" scoped>
    @import "../../assets/sass/mixins"
    .search
        width: 100%
        height: 100%
        overflow: hidden
        .search_form
            @include clearFix
            margin-top: 45px
            background-color: #fff
            padding: 12px 8px
            input
                height: 35px
                padding: 0 4px
                border-radius: 2px
                font-weight: bold
                outline: none
                &.search_input
                    float: left
                    width: 79%
                    border: 4px solid #f2f2f2
                    font-size: 14px
                    color: #333
                    background-color: #f2f2f2
                &.search_submit
                    float: right
                    width: 20%
                    border: 4px solid #02a774
                    font-size: 16px
                    color: #fff
                    background-color: #02a774
        .list
            .list_container
                background-color: #fff
                .list_li
                    display: flex
                    justify-content: center
                    padding: 10px
                    border-bottom: 1px solid $grey
                    .shop_left
                        margin-right: 10px
                        .shop_img
                            width: 50px
                            height: 50px
                            display: block
                    .shop_right
                        font-size: 12px
                        flex: 1
                        .shop_right_text
                            p
                                line-height: 12px
                                margin-bottom: 6px
                                &:last-child
                                    margin-bottom: 0
        .search_none
            margin: 0 auto
            color: #333
            background-color: #fff
            text-align: center
            margin-top: 0.125rem
            font-size: 24px
</style>