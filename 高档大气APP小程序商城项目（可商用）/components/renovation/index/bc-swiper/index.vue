<template>
	<view class="">
		<swiper-picture :swiperList="pictrueInfo.swiperInfo" :bannerList="bannerList"></swiper-picture>
	</view>
</template>

<script>
	import swiperPicture from '@/components/renovation/index/bc-swiper/swiper-picture';
	export default {
		components:{
			swiperPicture
		},
		data(){
			return{
				swiperList:''
			}
		},
		props:{
			pictrueInfo: {
				type: [String, Object],
				default: () => {
					return {};
				}
			},
			bannerList:{
				type:Array,
				default: () => {
					return [];
				}
			}
		}
	}
</script>

<style>
</style>