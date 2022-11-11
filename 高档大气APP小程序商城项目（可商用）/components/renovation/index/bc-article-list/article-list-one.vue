<template>
	<view class="flex-1" :style="modulMTop">
		<view class="flex-1 row-ac-fw">
			<view class="category-item" v-for="(item,index) in articleClass" :key="index" v-if="index < articleListInfo.articleClassList.quantity">
				<view class="flex-1 mx-2" @click="toCategory(item)">
					<view class="category-title font-s-5 font-w mt-2">{{ item.title }}</view>
					<view class="row-ac-sb">
						<view class="font-s-1 text-light-grey">{{ item.title }}</view>
						<view class="category-icon">
							<image :src="item.icon" mode="aspectFill"></image>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { getArticleClassificationUrl } from '@/api/index.js';
	export default {
		data(){
			return{
				ClassificationQueryInfo:{
					pid:1,
					isOpen:1
				},
				articleClass:[]
			}
		},
		props: {
			articleListInfo: {
				type: [String, Object],
				default () {
					return {};
				},
			}
		},
		computed: {
			modulMTop() {
				this.modulMT = this.articleListInfo.articleClassList.modulMT
				return `margin-top:${this.modulMT}rpx;`
			},
		},
		mounted() {
			this.initData()
		},
		methods:{
			initData(){
				this.getArticleClass()
			},
			getArticleClass(){
				this.$R.get(getArticleClassificationUrl,this.ClassificationQueryInfo).then(res=>{
					this.articleClass = res.data
				})
			},
			toCategory(item){
				uni.navigateTo({
					url: '/pages/article/article-mall'
				});
			}
		}
	}
</script>

<style lang="scss">
	.category-item{
		width: 224rpx;
		height: 112rpx;
		background-color: #F4F4F4;
		margin-right: 9rpx;
		margin-bottom: 9rpx;
		.category-title{
			color: #364A2B;
		}
		.category-icon{
			width: 30rpx;
			height: 30rpx;
		}
	}
	.category-item:nth-child(3n){
		margin-right: 0;
	}
</style>