<template>
	<view class="flex-1 row-ac-fw" :style="modulMTop">
		<view class="nav-height row-a-j-fc" :style="navWidth" v-for="(item,index) in navInfo.list" :key="index" @click="navTo(item)">
			<image :src="item.cover" mode="" class="nav-cover" :style="coverSize"></image>
			<view class="font-s-3 mt">{{ item.cname }}</view>
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return{}
		},
		props: {
			navInfo: {
				type: [String, Object],
				default () {
					return []
				}
			}
		},
		computed:{
			navWidth(){
				if(this.navInfo.type === 'fourRows'){
					return `width: 25%;`
				}
				if(this.navInfo.type === 'fiveRows'){
					return `width: 20%;`
				}
			},
			modulMTop() {
				this.modulMT = this.navInfo.modulMT
				return `margin-top:${this.modulMT}rpx;`
			},
			coverSize(){
				this.coverWidth = this.navInfo.coverWidth
				this.coverHeight = this.navInfo.coverHeight
				this.coverRadius = this.navInfo.coverRadius
				return `width:${this.coverWidth}rpx;height:${this.coverHeight}rpx;border-radius:${this.coverRadius}%;`
			}
		},
		methods:{
			navTo(item){
				uni.navigateTo({
					url: item.url,
				});
			}
		}
	}
</script>

<style lang="scss">
	.nav-height{
		height: 150rpx;
	}
	.nav-cover{
		width: 90rpx;
		height: 90rpx;
		border-radius: 0;
	}
</style>
