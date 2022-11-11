<template>
	<view class="pageCont">
		<z-paging ref="paging" @query="queryList" :list.sync="newsList" style="height: 100%;width: 100%;">
			<view slot="loading">
				<view class="ymref">
					<view class="">
						<u-loading mode="circle" color="#f44c01" size="80"></u-loading>
					</view>
				</view>
			</view>
			<view class="list">
				<view class="list-item" v-for="(item,index) in newsList" :key="index"
					@click="$u.route('/pagesNews/newsmain/newsmain',{id:item.id})">
					<view class="list-item-left" :style="{marginRight:item.images.length<3?'20rpx':'0'}">
						<view class="list-item-title">
							<text>{{item.title}}</text>
						</view>
						<view class="list-item-imgs" v-if="item.images.length>=3">
							<u-image width="230rpx" height="185rpx" :src="item.images[0]"></u-image>
							<u-image width="230rpx" height="185rpx" :src="item.images[1]"></u-image>
							<u-image width="230rpx" height="185rpx" :src="item.images[2]"></u-image>
						</view>
						<view class="list-item-cate">
							<text>{{item.author}}</text>
							<text>{{item.createtime_text}}</text>
						</view>
					</view>
					<view class="list-item-right" v-if="item.images.length<3">
						<u-image width="220rpx" height="185rpx" :src="item.images[0]"></u-image>
						<!-- <view class="icon" v-if="item.is_video">
							<u-icon name="play-circle" size="40"></u-icon>
						</view> -->
					</view>
				</view>
			</view>
		</z-paging>
	</view>
</template>

<script>
	import {
		APP_NAME
	} from '../../env.js'
	export default {
		data() {
			return {
				newsList: [],
				search: {
					page: 1,
				}
			}
		},
		onShareAppMessage() {
			return {
				title: APP_NAME,
				path: '/pages/news/news'
			}
		},
		methods: {
			queryList(pageNo, pageSize) {
				//这里的pageNo和pageSize会自动计算好，直接传给服务器即可
				//通过this.$refs.paging.complete(请求回来的数组);将请求结果传给z-paging
				this.search.page = pageNo;
				this.$u.get('/addons/hicity/news/list', this.search).then(res => {
					this.$refs.paging.complete(res)
				}).catch(err => {
					this.$refs.paging.complete(false)
				})
			}
		}
	}
</script>
<style>
	page {
		background-color: white;
	}
</style>
<style lang="scss" scoped>
	.pageCont {
		height: 100%;
		width: 100%;
		/* 父节点建议开启flex布局 */
		display: flex;
		flex-direction: column;
		overflow: hidden;
	}

	.list {
		background-color: white;
		.list-item {
			display: flex;
			flex-direction: row;
			align-items: center;
			padding: 20rpx;
			border-bottom: 1rpx solid #e6e6e6;

			.list-item-left {
				display: flex;
				flex-direction: column;
				min-height: 185rpx;
				justify-content: space-between;
				flex: 1;

				.list-item-title {
					font-size: 32rpx;
					color: #333333;
				}

				.list-item-cate {
					display: flex;
					flex-direction: row;
					align-items: center;
					margin-top: 18rpx;
					justify-content: space-between;
					color: #666666;
					font-size: 28rpx;
				}

				.list-item-imgs {
					display: flex;
					flex-direction: row;
					align-items: center;
					justify-content: space-between;
					margin-top: 20rpx;
				}
			}

			.list-item-right {
				position: relative;

				.icon {
					position: absolute;
					bottom: 20rpx;
					right: 20rpx;
					background-color: rgba($color: #ffffff, $alpha: 0.7);
					border-radius: 50%;
					display: flex;
					flex-direction: row;
					align-items: center;
					justify-content: center;
				}
			}
		}
	}
</style>
