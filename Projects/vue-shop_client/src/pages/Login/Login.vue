<template>
    <section class="loginContainer">
        <div class="loginInner">
            <div class="login_header">
                <h2 class="login_logo">BW Delivery</h2>
                <div class="login_header_title">
                    <a href="javascript:;" :class="{on: loginSMS}" @click="loginSMS=true">SMS Login</a>
                    <a href="javascript:;" :class="{on: !loginSMS}" @click="loginSMS=false">Password Login</a>
                </div>
            </div>
            <div class="login_content">
                <form @submit.prevent="login">
                    <div :class="{on: loginSMS}">
                        <section class="login_message">
                            <input type="tel" maxlength="14" placeholder="Phone Number" v-model="phone">
                            <button
                                :disabled="!validPhone"
                                class="get_verification"
                                :class="{verified: validPhone}"
                                @click.prevent="getVerificationCode"
                            >
                                {{countDown? `Code Sent(${countDown}s)`:'Get verification code'}}
                            </button>
                        </section>
                        <section class="login_verification">
                            <input type="text" maxlength="8" placeholder="SMS Verification Code" v-model="code">
                        </section>
                        <section class="login_hint">
                            Reminder: If this phone number have not registered with us, it will be automatically registered when you log in, and this means that you have agreed to
                            <a href="javascript:;">《User Service Agreement》</a>
                        </section>
                    </div>
                    <div :class="{on: !loginSMS}">
                        <section>
                            <section class="login_message">
                                <input type="text" maxlength="14" placeholder="Phone Number" v-model="name">
                            </section>
                            <section class="login_verification">
                                <input :type="showPwd ? 'text': 'password'" maxlength="16" placeholder="Passwords" v-model="pwd">
                                <div class="switch_button off" :class="showPwd ? 'on': 'off'" @click="showPwd=!showPwd">
                                    <div class="switch_circle" :class="{right: showPwd}"></div>
                                    <span class="switch_text">{{showPwd ? 'abc': '...'}}</span>
                                </div>
                            </section>
                            <section class="login_message">
                                <input type="text" maxlength="11" placeholder="Captcha Code" v-model="captcha">
                                <img class="get_verification" src="../../assets/images/captcha.svg" alt="captcha">
                            </section>
                        </section>
                    </div>
                    <button class="login_submit">Login</button>
                </form>
                <a href="javascript:;" class="about_us">About us</a>
            </div>
            <a href="javascript:" class="go_back" @click="$router.back()">
                <i class="iconfont icon-yangshi_icon_tongyong_back"></i>
            </a>
        </div>
        <AlertTip :alertText="alertText" v-show="showAlert"/>
    </section>
</template>

<script>

    import AlertTip from '../../components/AlertTip/AlertTip.vue'
    export default {

        components: {
            AlertTip
        },

        data() {
            return {
                loginSMS: true,
                countDown: 0,
                showPwd: true,
                phone: '',
                code: '',
                name: '',
                pwd: '',
                captcha: '',
                alertText: '',
                showAlert: false
            }
        },

        methods: {
            getVerificationCode() {
                if(!countDownId) {

                    this.countDown = 30
                    const countDownId = setInterval(() => {
                        this.countDown--
                        if(this.countDown<=0) {
                            clearInterval(countDownId)
                        }

                    }, 1000)
                    //send SMS Verification Code

                }
            },

            login() {
                if(loginSMS) {
                    const { validPhone, phone, code } = this
                    if(validPhone) {

                    } else if(/^\d{6}$/.test(code)) {

                    } else {}
                } else {
                    const { name, pwd, captcha } = this
                    if(/^\w{6,14}$/.test(name)) {

                    } else if(/^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{6,12}$/.test(pwd)) {

                    } else if(/^[\da-zA-Z]{4}$/.test(captcha)) {

                    }
                }
            }
        },

        computed: {
            validPhone() {
                return /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/.test(this.phone)
            } 
        }
    }
</script>

<style lang="sass" scoped>
    @import "../../assets/sass/mixins"
    .loginContainer
        width: 100%
        height: 100%
        background: #fff
        .loginInner
            padding-top: 60px
            width: 80%
            margin: 0 auto
            .login_header
                .login_logo
                    font-size: 40px
                    font-weight: bold
                    color: #02a774
                    text-align: center
                .login_header_title
                    padding-top: 40px
                    text-align: center
                    >a
                        color: #333
                        font-size: 14px
                        padding-bottom: 4px
                        &:first-child
                            margin-right: 40px
                        &.on
                            color: #02a774
                            font-weight: 700
                            border-bottom: 2px solid #02a774
            .login_content
                >form
                    >div
                        display: none
                        &.on
                            display: block
                        input
                            width: 100%
                            height: 100%
                            padding-left: 10px
                            box-sizing: border-box
                            border: 1px solid #ddd
                            border-radius: 4px
                            outline: 0
                            font: 400 14px Arial
                            &:focus
                                border: 1px solid #02a774
                        .login_message
                            position: relative
                            margin-top: 16px
                            height: 48px
                            font-size: 14px
                            background: #fff
                            .get_verification
                                position: absolute
                                top: 50%
                                right: 10px
                                transform: translateY(-50%)
                                border: 0
                                color: #ccc
                                font-size: 14px
                                background: transparent
                                &.verified
                                    color: black
                        .login_verification
                            position: relative
                            margin-top: 16px
                            height: 48px
                            font-size: 14px
                            background: #fff
                            .switch_button
                                font-size: 12px
                                border: 1px solid #ddd
                                border-radius: 8px
                                transition: background-color .3s,border-color .3s
                                padding: 0 6px
                                width: 30px
                                height: 16px
                                line-height: 16px
                                color: #fff
                                position: absolute
                                top: 50%
                                right: 10px
                                transform: translateY(-50%)
                                &.off
                                    background: #fff
                                    .switch_text
                                        float: right
                                        color: #ddd
                                &.on
                                    background: #02a774
                                    .switch_text
                                        float: left
                                >.switch_circle
                                    //transform translateX(27px)
                                    position: absolute
                                    top: -1px
                                    left: -1px
                                    width: 16px
                                    height: 16px
                                    border: 1px solid #ddd
                                    border-radius: 50%
                                    background: #fff
                                    box-shadow: 0 2px 4px 0 rgba(0,0,0,.1)
                                    transition: transform .3s
                                    &.right
                                        transform: translateX(26px)
                        .login_hint
                            margin-top: 12px
                            color: #999
                            font-size: 14px
                            line-height: 20px
                            >a
                                color: #02a774
                    .login_submit
                        display: block
                        width: 100%
                        height: 42px
                        margin-top: 30px
                        border-radius: 4px
                        background: #4cd96f
                        color: #fff
                        text-align: center
                        font-size: 16px
                        line-height: 42px
                        border: 0
                .about_us
                    display: block
                    font-size: 12px
                    margin-top: 20px
                    text-align: center
                    color: #999
            .go_back
                position: absolute
                top: 5px
                left: 5px
                width: 30px
                height: 30px
                >.iconfont
                    font-size: 20px
                    color: #999
</style>