<template>
	<div class="app">
		<router-view/>
		<FooterGuide v-show="$route.meta.showFooter"/>
	</div>
</template>

<script>

    import { mapActions } from 'vuex' 

	import FooterGuide from './components/FooterGuide/FooterGuide.vue'

	export default {

		mounted() {

			this.getLocation(),
			this.getAddress(),
			this.getUserInfo()
		},

		methods: {
      		...mapActions(['getLocation', 'getAddress', 'getUserInfo'])
    	},	

		components: {
			FooterGuide
		}
	}
</script>

<style lang='sass'>
	.app 
		width: 100%
		height: 100%
		background: #f5f5f5
</style>
