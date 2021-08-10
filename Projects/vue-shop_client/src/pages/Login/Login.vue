<template>
    <section class="loginContainer">
        <div class="loginInner">
            <div class="login_header">
                <h2 class="login_logo">BW Delivery</h2>
                <div class="login_header_title">
                    <a href="javascript:;" class="on">SMS Login</a>
                    <a href="javascript:;">Password Login</a>
                </div>
            </div>
            <div class="login_content">
                <form>
                    <div class="on">
                        <section class="login_message">
                            <input type="tel" maxlength="11" placeholder="Phone Number">
                            <button disabled="disabled" class="get_verification">Get verification code</button>
                        </section>
                        <section class="login_verification">
                            <input type="tel" maxlength="8" placeholder="Verification code">
                        </section>
                        <section class="login_hint">
                            Reminder: If this phone number have not registered with us, it will be automatically registered when you log in, and this means that you have agreed to
                            <a href="javascript:;">《User Service Agreement》</a>
                        </section>
                    </div>
                    <div>
                        <section>
                            <section class="login_message">
                                <input type="tel" maxlength="11" placeholder="Phone Number">
                            </section>
                            <section class="login_verification">
                                <input type="tel" maxlength="8" placeholder="Passwords">
                                <div class="switch_button off">
                                    <div class="switch_circle"></div>
                                    <span class="switch_text">...</span>
                                </div>
                            </section>
                            <section class="login_message">
                                <input type="text" maxlength="11" placeholder="Verification code">
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
    </section>
</template>

<script>
    export default {

    }
</script>

<style lang="sass" scoped>

</style>