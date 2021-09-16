<template>
    <section class="order">
        <!--Header-->
        <Header title="Order"/>
        <section class="order_no_login" v-if="!userInfo">
            <img src="../../assets/images/order/person.png">
            <h3>Check order after login</h3>
            <button>Login now</button>
        </section>
    </section> 
</template>

<script>
    import { mapState } from 'vuex' 
    import Header from '../../components/Header/Header.vue'
    export default {
        components: {
            Header
        },

        computed: {
            ...mapState(['userInfo'])
		},
    }
</script>

<style lang="sass" scoped>
    @import "../../assets/sass/mixins"
    .order
        width: 100%
        .order_no_login
            padding-top: 140px
            width: 60%
            margin: 0 auto
            text-align: center
            >img
                display: block
                width: 100%
                height: 30%
            >h3
                padding: 10px 0
                font-size: 17px
                color: #6a6a6a
            >button
                display: inline-block
                background: #02a774
                font-size: 14px
                color: #fff
                border: 0
                outline: none
                border-radius: 5px
                padding: 10px 20px
</style>