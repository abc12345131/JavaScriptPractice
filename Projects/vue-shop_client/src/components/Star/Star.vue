<template>
    <div class="star" :class="'star-'+size">
        <span class="star-item" v-for="(starState, index) in starArr" :class="starState" :key="index"></span>
    </div> 
</template>

<script>

    import { mapState } from 'vuex'

    export default {

        props:{
            score: Number,
            size: Number
        },

        computed: {
            starArr() {
                const { score } = this
                const ssArr = []
                const scoreInt = Math.floor(score)
                for(let i =0; i<scoreInt; i++) {
                    ssArr.push('on')
                }
                if(score*10-scoreInt*10>=5) {
                    ssArr.push('half')
                }
                while(ssArr.length<5) {
                    ssArr.push('off')
                }
                return ssArr
            }
        }
    }
</script>

<style lang="sass" scoped>
    @import "../../assets/sass/mixins"
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
</style>