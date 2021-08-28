<template>
    <section class="profile">
		<!--Header-->
		<Header title="Profile"/>
        <section class="profile-number">
            <router-link :to="userInfo._id ? '/userinfo' : '/login'" class="profile-link">
                <div class="profile_image">
                    <i class="iconfont icon-yangshi_icon_tongyong_user"></i>
                </div>
                <div class="user-info">
                    <p class="user-info-top" v-if="!userInfo.phone">{{userInfo.username || 'Login/Register'}}</p>
                    <p>
                        <span class="user-icon">
                            <i class="iconfont icon-yangshi_icon_tongyong_phone"></i>
                        </span>
                        <span class="icon-mobile-number">{{userInfo.phone || 'Not Applicable'}}</span>
                    </p>
                </div>
                <span class="arrow">
                    <i class="iconfont icon-yangshi_icon_tongyong_enter"></i>
                </span>
            </router-link>
        </section>
        <section class="profile_info_data border-1px">
            <ul class="info_data_list">
                <a href="javascript:" class="info_data_link">
                    <span class="info_data_top"><span>0.00</span>CAD</span>
                    <span class="info_data_bottom">My Balance</span>
                </a>
                <a href="javascript:" class="info_data_link">
                    <span class="info_data_top"><span>0</span>offers</span>
                    <span class="info_data_bottom">My Offer</span>
                </a>
                <a href="javascript:" class="info_data_link">
                    <span class="info_data_top"><span>0</span>points</span>
                    <span class="info_data_bottom">My Points</span>
                </a>
            </ul>
        </section>
        <section class="profile_my_order border-1px">
            <!-- My Order -->
            <a href='javascript:' class="my_order">
                <span>
                    <i class="iconfont icon-yangshi_icon_tongyong_trips"></i>
                </span>
                <div class="my_order_div">
                    <span>My Order</span>
                    <span class="my_order_icon">
                        <i class="iconfont icon-yangshi_icon_tongyong_enter"></i>
                    </span>
                </div>
            </a>
			<!-- Points Mall-->
			<a href='javascript:' class="my_order">
				<span>
					<i class="iconfont icon-yangshi_icon_tongyong_benefits"></i>
				</span>
				<div class="my_order_div">
					<span>Points Mall</span>
					<span class="my_order_icon">
						<i class="iconfont icon-yangshi_icon_tongyong_enter"></i>
					</span>
				</div>
			</a>
			<!-- VIP centre -->
			<a href="javascript:" class="my_order">
				<span>
					<i class="iconfont icon-yangshi_icon_tongyong_premium"></i>
				</span>
				<div class="my_order_div">
					<span>VIP Centre</span>
					<span class="my_order_icon">
						<i class="iconfont icon-yangshi_icon_tongyong_enter"></i>
					</span>
				</div>
			</a>
        	<!-- service centre -->
            <a href="javascript:" class="my_order">
                <span>
                    <i class="iconfont icon-yangshi_icon_tongyong_customer_service"></i>
                </span>
                <div class="my_order_div">
                    <span>Service Centre</span>
                    <span class="my_order_icon">
                        <i class="iconfont icon-yangshi_icon_tongyong_enter"></i>
                    </span>
                </div>
            </a>
        </section>
		<section class="profile_info_data border-1px">
			<mt-button type="danger" style="width: 100%" v-if="userInfo._id" @click="logout">Logout</mt-button>
		</section>
    </section>  
</template>

<script>

    import { mapState } from 'vuex' 
	import { MessageBox, Toast } from 'mint-ui'
    import Header from '../../components/Header/Header.vue'

    export default {

        components: {
            Header
        },

		computed: {
            ...mapState(['userInfo'])
		},

		methods: {
			logout() {
				MessageBox.confirm('Notice', 'Are you sure to log out?')
					.then(
						action => {
							this.$store.dispatch('logout')
							Toast('Log out completed!')
						},
						action => {
							console.log('Log out cancelled!')
						}
					)				
			}
		}
    }
</script>

<style lang="sass" scoped>
	@import "../../assets/sass/mixins"
	.profile
		width: 100%
		overflow: hidden
		.profile-number
			margin-top: 45.5px
			.profile-link
				@include clearFix
				position: relative
				display: block
				background: #02a774
				padding: 20px 10px
				.profile_image
					float: left
					width: 60px
					height: 60px
					border-radius: 50%
					overflow: hidden
					.icon-yangshi_icon_tongyong_user
						vertical-align: middle
						line-height: 1
						background: #e4e4e4
						font-size: 62px
				.user-info
					float: left
					margin-top: 8px
					margin-left: 15px
					p
						font-weight: 700
						font-size: 18px
						color: #fff
						&.user-info-top
							padding-bottom: 8px
						.user-icon
							display: inline-block
							margin-left: -15px
							margin-right: 5px
							width: 20px
							height: 20px
							.icon-yangshi_icon_tongyong_phone
								font-size: 20px
								vertical-align: text-top
						.icon-mobile-number
							font-size: 14px
							color: #fff
				.arrow
					width: 12px
					height: 12px
					position: absolute
					right: 15px
					top: 40%
					.icon-yangshi_icon_tongyong_enter
						color: #fff
						font-size: 20px
		.profile_info_data
			@include bottom-border-1px($grey)
			width: 100%
			background: #fff
			overflow: hidden
			.info_data_list
				@include clearFix
				.info_data_link
					float: left
					width: 33%
					text-align: center
					border-right: 1px solid #f1f1f1
					.info_data_top
						display: block
						width: 100%
						font-size: 14px
						color: #333
						padding: 15px 5px 10px
						span
							display: inline-block
							font-size: 30px
							color: #f90
							font-weight: 700
							line-height: 30px
					.info_data_bottom
						display: inline-block
						font-size: 14px
						color: #666
						font-weight: 400
						padding-bottom: 10px
				.info_data_link:nth-of-type(2)
					.info_data_top
						span
							color: #ff5f3e
				.info_data_link:nth-of-type(3)
					border: 0
					.info_data_top
						span
							color: #6ac20b
		.profile_my_order
			@include top-border-1px($grey)
			margin-top: 10px
			background: #fff
			.my_order
				display: flex
				align-items: center
				padding-left: 15px
				>span
					display: flex
					align-items: center
					width: 20px
					height: 20px
					>.iconfont
						margin-left: -10px
						font-size: 30px
					.icon-yangshi_icon_tongyong_trips
						color: #02a774
					.icon-yangshi_icon_tongyong_benefits
						color: #ff5f3e
					.icon-yangshi_icon_tongyong_premium
						color: #f90
					.icon-yangshi_icon_tongyong_customer_service
						color: #02a774
				.my_order_div
					width: 100%
					border-bottom: 1px solid #f1f1f1
					padding: 18px 10px 18px 0
					font-size: 16px
					color: #333
					display: flex
					justify-content: space-between
					span
						display: block
					.my_order_icon
						width: 10px
						height: 10px
						.icon-yangshi_icon_tongyong_enter
							color: #bbb
							font-size: 10px
</style>