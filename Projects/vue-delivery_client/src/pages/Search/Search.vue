<template>
    <section class="search">
		<!--Header-->
		<Header title="Search"/>
        <form class="search_form" action="#">
            <input type="search" name="search" placeholder="Please input keywords" class="search_input">
            <input type="submit" name="submit" class="search_submit">
        </form>
    </section>
</template>

<script>
    import Header from '../../components/Header/Header.vue'
    export default {
        components: {
            Header
        }
    }
</script>

<style lang="sass" scoped>
    @import "../../assets/sass/mixins"
    .search
        width: 100%
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
                    width: 18%
                    border: 4px solid #02a774
                    font-size: 16px
                    color: #fff
                    background-color: #02a774
</style>