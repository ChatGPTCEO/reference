<template>
	<view class="wrap">
		<view class="orange-box">
			<orange-longswiper :list="listData" :config="configData"  @tapMore="tapMore" @tapList="tapList"></orange-longswiper>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				listData:[
					{
						id:1,
						img:"/static/orange-longswiper/1.jpg",
						subject:"城池营垒",
					},
					{
						id:2,
						img:"/static/orange-longswiper/2.jpg",
						subject:"金山伏魔传",
					},
					{
						id:3,
						img:"/static/orange-longswiper/3.jpg",
						subject:"名门绅士",
					},
					{
						id:4,
						img:"/static/orange-longswiper/4.jpg",
						subject:"拆弹专家2",
					},
					{
						id:5,
						img:"/static/orange-longswiper/5.jpg",
						subject:"正青春",
					}
				],
				configData:{
					title:'我看过的',
					titlemore:'全部>',
					listmore:'查看更多',
					moreurl:'url',
					multiple:3,
					radius:10,
					height:140,
					nextMargin:80
				},
			}
		},
		onLoad() {
			
		},
		methods: {
			tapMore(moreurl){
				console.log(moreurl);
			},
			tapList(e){
				console.log(e.id,e.index);
			}
		}
	}
</script>

<style>
.orange-box{
	padding: 30rpx 0 30rpx 30rpx;
}
</style>
