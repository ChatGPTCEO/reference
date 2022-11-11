<template>
	<view>
		<com-header :bg="tempColor" color="#ffffff" title="供求信息网"></com-header>
		<plugin-home-header></plugin-home-header>
		<plugin-home-icon></plugin-home-icon>
		
		<view class="mt16">
			<plugin-home-ad title="童装招商"></plugin-home-ad>
		</view>
		<view class="mt16">
			<plugin-home-ad title="女装招商"></plugin-home-ad>
		</view>
		<view class="mt16">
			<plugin-home-product></plugin-home-product>
		</view>
		<plugin-home-notice></plugin-home-notice>
		<com-powerby></com-powerby>
		<com-footer model="index"></com-footer>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				
			}
		},
		onLoad(){
			
		},
		onShow(){
			
		},
		methods:{
			
		}
	}
</script>

<style>
</style>
