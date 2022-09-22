<template>
	<view class="pageCont">
		<z-paging ref="paging" @query="queryList" :list.sync="commentList" style="height: 100%;width: 100%;">
			<view slot="loading">
				<view class="ymref">
					<view class="">
						<u-loading mode="circle" color="#f44c01" size="80"></u-loading>
					</view>
				</view>
			</view>
			<view class="comment">
				<view class="comlist" v-for="(item,index) in commentList" :key="index">
					<view class="user">
						<u-image width="100rpx" height="100rpx" shape="circle"
							:src="item.user.avatar"></u-image>
						<view class="userinfo">
							<text>{{item.user.nickname}}</text>
							<text>{{item.createtime_text}}</text>
						</view>
						<text>评分：{{item.score}}</text>
					</view>
					<text class="comcont">{{item.content}}</text>
					<view class="comimg">
						<u-image v-for="(it,ix) in item.images" :key="ix" width="213rpx" height="213rpx"
							style="margin: 5rpx;" :src="it">
						</u-image>
					</view>
				</view>
			</view>
		</z-paging>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				commentList: [],
				search: {
					page: 1,
					store_id: '',
				}
			};
		},
		onLoad(e) {
			if (e.store_id) {
				this.search.store_id = e.store_id;
			}
		},
		methods: {
			queryList(pageNo, pageSize) {
				//这里的pageNo和pageSize会自动计算好，直接传给服务器即可
				//通过this.$refs.paging.complete(请求回来的数组);将请求结果传给z-paging
				this.search.page = pageNo;
				this.$u.get('/addons/hicity/store/commentList', this.search).then(res => {
					this.$refs.paging.complete(res)
				}).catch(err => {
					this.$refs.paging.complete(false)
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.pageCont {
		height: 100%;
		width: 100%;
		/* 父节点建议开启flex布局 */
		display: flex;
		flex-direction: column;
		overflow: hidden;
		background-color: #F8F8F8;
	}

	.comment {
		display: flex;
		flex-direction: column;
		background-color: white;
		border-radius: 10rpx;
		margin: 0 20rpx;

		.comlist {
			display: flex;
			flex-direction: column;
			padding: 20rpx;
			border-bottom: 1rpx solid #e6e6e6;

			.user {
				display: flex;
				flex-direction: row;
				align-items: center;

				.userinfo {
					display: flex;
					flex-direction: column;
					line-height: 45rpx;
					flex: 1;
					margin-left: 20rpx;
				}
			}

			.comcont {
				font-size: 28rpx;
				margin-top: 20rpx;
			}

			.comimg {
				margin-top: 15rpx;
				display: flex;
				flex-direction: row;
				align-items: center;
				flex-wrap: wrap;
			}
		}
	}
</style>
