<template>
	<block>
		<!-- gc_school/pages/article/my.wxml -->
		<cu-custom bgColor="bgmain" :isBack="true">
			<view slot="content">我的收藏</view>
		</cu-custom>

		<view class="tab_bar flex padding-lr padding-tb-sm">
			<view class="tab" :class="type == 0?'cur':''" @tap="type=0">圈子</view>
			<view class="tab" :class="type == 1?'cur':''" @tap="type=1">商品</view>
		</view>

		<!-- 文章列表 -->
		<view class="padding-bottom margin-lr" style="padding-bottom: 100rpx" v-if="type==0">
			<block v-if="dataList.length == 0">
				<view class="text-center margin-top text-df">暂无数据~</view>
			</block>
			<block v-for="(item,index) in dataList" :key="index">
				<view class="article padding" @tap="toDetail" :data-id="item.article_id">
					<view class="flex row">
						<image v-if="item.is_anonymous==0" class="avatar"
							:src="item.avatar ? item.avatar : 'https://test.fkynet.net/wximage/avatar.jpg'"
							mode="scaleToFill" />
						<image v-else class="avatar" src="https://test.fkynet.net/wximage/avatar.jpg"
							mode="scaleToFill" />
						<view class="nickname">{{ item.is_anonymous==1?"匿名用户":item.nickname }}</view>
						<view class="date">{{ item.createtime }}</view>
						<image class="top" src="/static/icon/top.png" v-if="item.is_top==1" />
					</view>
					<view class="content margin-tb">
						{{item.content}}
					</view>
					<view class="imgs row  margin-bottom" v-if="item.image.length>0">
						<block v-for="(image,index) in item.image" :key="index">
							<image class="img" :src="image" mode="aspectFill" />
						</block>
					</view>
					<view class="footer row">
						<!--  v-if="item.class_name" -->
						<view class="class_name">
							{{item.class_name}}
						</view>


						<view class="comment">
							<image class="icon" src="/static/icon/comment.png" mode="scaleToFill" />
							{{item.comments_num}}
						</view>
						<view class="love cur" @click.stop="cancel(item.article_id)">
							<image class="icon" src="/static/icon/love.png" mode="scaleToFill" />
							{{item.likes_num}}
						</view>
					</view>

				</view>
			</block>
		</view>

		<!-- 商品列表 -->
		<view class="padding-bottom" style="padding-bottom: 100rpx" v-if="type==1">
			<block v-if="goodsList.length == 0">
				<view class="text-center margin-top text-df">暂无数据~</view>
			</block>
			<view class="goods_line" v-else>
				<block v-for="(item, index) in goodsList" :key="index">
					<view class="goods_item" @click="go('/gc_school/pages/secondhand/detail?id='+item.m_id)">
						<image :src="item.image" mode="aspectFill"></image>
						<view class="name">{{ item.title }}</view>
						<view class="oldArrangement">
							{{item.degree}}
						</view>
						<view class="price">
							<view class="price_item"><text class="Company">￥</text>{{ item.pay }}</view>
							<view class="">￥{{ item.price }}</view>
						</view>
						<view class="userInfo">
							<view class="left">
								<image :src="item.user.avatar" class="avatar"></image>
								<view class="nickname">{{ item.user.nickname }}</view>
							</view>
							<view>
								<text class="cuIcon-likefill text-orange"></text>
								{{ item.con }}
							</view>
						</view>
					</view>
				</block>
			</view>
		</view>

	</block>
</template>

<script>
	// gc_school/pages/article/index.js
	var app = getApp();
	export default {
		data() {
			return {
				url: '',
				info: [1, 2, 3],
				index_swiperCurrent: 0,
				cateList: [],
				cate_index: 0,
				dataList: [],
				type: 0,
				is_loadmore: true,
				page: 1,
				page_good:1,
				is_loadmore_good: true,
				img: '',
				goodsList:[]
				// type: 0
			};
		}
		/**
		 * 生命周期函数--监听页面加载
		 */
		,
		onLoad: function(options) {
			this.getLst();
			this.getGoodsLst()
		},
		/**
		 * 生命周期函数--监听页面初次渲染完成
		 */
		onReady: function() {},
		/**
		 * 生命周期函数--监听页面显示
		 */
		onShow: function() {},
		/**
		 * 生命周期函数--监听页面隐藏
		 */
		onHide: function() {},
		/**
		 * 生命周期函数--监听页面卸载
		 */
		onUnload: function() {},
		/**
		 * 页面相关事件处理函数--监听用户下拉动作
		 */
		onPullDownRefresh: function() {},
		/**
		 * 页面上拉触底事件的处理函数
		 */
		// onShareAppMessage: function () {
		// }
		onReachBottom: function() {
			if(this.type==0)
			{
				if (this.is_loadmore) {
					this.setData({
						page: this.page + 1
					});
					this.getLst();
				} else {
					uni.showToast({
						title: '没有更多数据了~',
						icon: 'none'
					});
				}
			}
			else{
				if (this.is_loadmore_good) {
					this.setData({
						page_good: this.page_good + 1
					});
					this.getGoodsLst();
				} else {
					uni.showToast({
						title: '没有更多数据了~',
						icon: 'none'
					});
				}
			}
		},
		/**
		 * 用户点击右上角分享
		 */
		methods: {
			//进入详情页面
			toDetail(e) {
				console.log(e.currentTarget.dataset.id);
				uni.navigateTo({
					url: '/gc_school/pages/article/detail?id=' + e.currentTarget.dataset.id
				});
			},

			//图片预览
			preview(e) {
				uni.previewImage({
					current: e.currentTarget.dataset.img,
					urls: e.currentTarget.dataset.list
				});
			},

			//获取文章列表
			getLst() {
				var that = this;
				app.globalData.util.request({
					url: 'ZhArticles/getMyFavArticle',
					method: 'GET',
					data: {
						s_id: uni.getStorageSync('schoolId'),
						page: that.page,
						limit: 10
					},

					success(res) {
						console.log(res.data.data, 1213);

						if (res.data.data.length < 10) {
							that.setData({
								is_loadmore: false
							});
						}

						for (var i = 0; i < res.data.data.length; i++) {
							that.dataList.push(res.data.data[i]);
							that.setData({
								dataList: that.dataList
							});
						}
					}
				}, true);
			},
			
			//取消收藏
			cancel(id) {
				var self = this;
				uni.showModal({
					title:'是否取消收藏',
					success(res) {
						if(res.confirm)
						{
							app.globalData.util.request({
								url: 'ZhGiveThumbsUp/giveUp',
								data: {
									article_id: id,
									s_id: uni.getStorageSync('schoolId'),
								},
								success(result) {
									if (result.data.status == 200) {
										self.page = 1
										self.is_loadmore = true
										self.dataList = []
										self.getLst()
									}
								}
							}, true);
						}
					}
				})
			},
			
			getGoodsLst()
			{
				var self = this
				app.globalData.util.request({
					url: 'Dmhgoodsstay/index',
					data: {
						page: self.page_good,
						s_id: uni.getStorageSync('schoolId'),
						limit:10
					},
				
					success(res) {
						if (res.data.data.list.length < 10) {
							self.setData({
								is_loadmore_good: false
							});
						}
				
						self.setData({
							goodsList: res.data.data.list
						});
						console.log("商品列表", res.data.data.list)
					}
				},true);
			},

			//删除评论
			del(e) {
				var self = this;
				console.log(e);
				uni.showModal({
					content: '确认删除该文章吗？',

					success(res) {
						if (res.confirm) {
							app.globalData.util.request({
								url: 'ZhArticles/delete',
								data: {
									article_id: e.currentTarget.dataset.id,
									s_id: uni.getStorageSync('schoolId')
								},

								success(result) {
									if (result.data.status == 200) {
										uni.showToast({
											title: result.data.message
										});
										setTimeout(function() {
											self.setData({
												page: 1,
												dataList: [],
												is_loadmore: true
											});
											self.getLst();
										}, 1000);
									}
								}
							}, true);
						} else {
							console.log('取消删除');
						}
					}
				});
			},

			jump(e) {
				console.log(e);
				uni.navigateTo({
					url: e.currentTarget.dataset.url
				});
			}
		}
	};
</script>
<style>
	/* gc_school/pages/article/my.wxss */
	page {
		background: white;
	}

	.bgmain {
		background-color: #ff6444;
		color: white;
	}

	/* 文章列表 */
	.article_box {
		margin-top: 40rpx;
		box-shadow: 0px 4px 20px 0px rgba(153, 153, 153, 0.1);
		border-radius: 10rpx;
	}

	.article_box .avatar {
		width: 75rpx;
		height: 75rpx;
		border-radius: 50%;
		margin-right: 20rpx;
	}

	.article_box .nickname {
		font-size: 30rpx;
		font-weight: bold;
	}

	.article_box .date {
		font-size: 24rpx;
		color: #999999;
	}

	.icon_item image {
		width: 35rpx;
		height: 35rpx;
	}

	.icon_item text {
		margin-left: 10rpx;
		color: #999999;
	}

	.btn {
		background: #ff6344;
		color: white;
		width: 70%;
		margin-left: 15%;
		padding: 30rpx;
		border-radius: 50rpx;
		position: fixed;
		bottom: 20rpx;
	}

	.post_img {
		width: 100rpx;
		height: 100rpx;
		position: fixed;
		right: 0;
		bottom: 30%;
		background: white;
		border-radius: 50%;
	}

	.item_img {
		width: 180rpx;
		height: 180rpx;
		margin-right: 20rpx;
	}
	
	/* 最新上架 */
	.goods_line {
		display: flex;
		justify-content: space-between;
		margin-top: 20rpx;
		flex-flow: wrap;
		padding: 0 30rpx;
	}
	
	.goods_item {
		/* padding: 20rpx 20rpx 30rpx; */
		width: 49%;
		box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.07);
		border: 10rpx;
		margin-top: 20rpx;
		border-radius: 10rpx;
		background-color: #FFFFFF;
	}
	
	.goods_item image {
		width: 100%;
		height: 300rpx;
		border-top-left-radius: 10rpx;
		border-top-right-radius: 10rpx;
	}
	
	.goods_item .name {
		padding: 30rpx 30rpx 0 20rpx;
		font-size: 30rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		font-weight: bold;
	}
	.goods_item .oldArrangement{
		background-color: #F7F5F6;
		border-radius: 16px;
		font-size: 20rpx;
		color: #666666;
		width: 98rpx;
		text-align: center;
		height: 32rpx;
		line-height: 32rpx;
		margin: 20rpx;
	}
	
	.goods_item .price {
		padding: 0rpx 20rpx 10rpx;
		display: flex;
		align-items: flex-end;
		color: #919191;
	
		font-size: 28rpx;
	}
	
	.goods_item .price view {
		text-decoration: line-through;
		font-size:28rpx ;
	}
	
	.goods_item .price .price_item {
		color: #ff6344 !important;
		text-decoration: none !important;
		font-weight: bold;
		font-size: 40rpx !important;
		margin-right: 23rpx;
	}
	.goods_item .price .price_item .Company{
		font-size:28rpx
	}
	
	.goods_item .userInfo {
		padding: 10rpx 20rpx 30rpx;
		display: flex;
		font-size: 22rpx;
		align-items: center;
		justify-content: space-between;
	}
	
	.goods_item .userInfo .left {
		display: flex;
		align-items: center;
	}
	
	.goods_item .userInfo .avatar {
		width: 35rpx;
		height: 35rpx;
		border-radius: 50%;
		margin-right: 10rpx;
		flex-shrink: 0;
	}
	
	.goods_item .userInfo .nickname {
		/* font-size: 26rpx; */
		max-width: 140rpx;
		/* overflow: hidden; */
		/* white-space: nowrap; */
		/* text-overflow: ellipsis; */
	}
</style>

<style lang="scss">
	@import "./main.scss";

	.tab_bar {
		background-color: #fff;

		.tab {
			margin-right: 40rpx;

			&:after {
				z-index: 9999;
				bottom: -20rpx;
			}
		}
	}

	.comment {
		margin-left: auto !important;
	}
</style>
