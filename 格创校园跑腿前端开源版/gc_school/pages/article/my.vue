<template>
	<block>
		<!-- gc_school/pages/article/my.wxml -->
		<cu-custom bgColor="bgmain" :isBack="true">
			<view slot="content">我的圈子</view>
		</cu-custom>

		<view class="tab_bar flex padding-lr padding-tb-sm">
			<view class="tab" :class="type == 0?'cur':''" @tap="change_type(0)">全部</view>
			<view class="tab" :class="type == 1?'cur':''" @tap="change_type(1)">审核中</view>
		</view>

		<!-- 文章列表 -->
		<view class="padding-bottom margin-lr" style="padding-bottom: 100rpx">
			<block v-if="dataList.length == 0">
				<view class="text-center margin-top text-df">暂无数据~</view>
			</block>
			<block v-for="(item,index) in dataList" :key="index">
				<view class="article padding" @tap="toDetail" :data-id="item.article_id">
					<view class="quan"></view>
					<view class="flex row">
						<!-- <image
                                class="avatar" 
                                :src="item.avatar ? item.avatar : 'https://gcwe7.link1024.com/web/img/avatar.png'"
                                mode="scaleToFill"
                            /> -->
						<!-- <view class="nickname">{{ item.nickname }}</view> -->
						<view class="date flex">{{ item.createtime }}
							<view class="status flex" @click.stop="open(item.article_id)">{{type_list[item.status]}}
								<image class="all" src="/static/icon/all.png" mode="scaleToFill" />
							</view>

						</view>
						<image class="top" src="/static/icon/top.png" v-if="item.is_top==1" />
					</view>
					<view class="content margin-bottom" >
						<text space="nbsp" style="word-break: break-word;" :decode="true">{{item.content}}</text>
						<!-- <rich-text :nodes="item.content"></rich-text> -->
					</view>
					<view class="imgs row  margin-bottom" v-if="item.image.length>0">
						<block v-for="(image,index) in item.image" :key="index">
							<image class="img" :src="image" mode="aspectFill" />
						</block>
					</view>
					<view v-if="item.video" @click.stop="">
						<video :src="item.video" style="width: 100%;" class="margin-bottom"></video>
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
						<view class="love" :class="item.is_fav==1?'cur':''">
							<image class="icon" src="/static/icon/love.png" mode="scaleToFill" />
							{{item.likes_num}}
						</view>
					</view>
					<view class="handle row" @click.stop="" v-show="item.article_id==flg_id">

						<view class="btns" @click="del">
							<image class="icon" src="/static/icon/del.png" mode="scaleToFill" />
							删除
						</view>
						<view class="btns" @click="go('/gc_school/pages/article/shang?art_id='+flg_id)">
							<image class="icon" src="/static/icon/shangnum.png" mode="scaleToFill" />
							打赏数
						</view>
						<!-- <view class="btns">
                                <image
                                    class="icon"
                                    src="/static/icon/edit.png"
                                    mode="scaleToFill"
                                />
                               编辑
                            </view> -->
						<image class="close" src="/static/icon/cha.png" mode="scaleToFill" @click="open(0)" />

					</view>
				</view>

			</block>


			<block key="index" v-for="(item, index) in dataList" :key="index" v-if="1==2">
				<view class="article_box padding" @tap="toDetail" :data-id="item.article_id">
					<view class="flex">
						<block v-if="item.is_anonymous == 0">
							<image class="avatar"
								:src="item.avatar ? item.avatar : 'https://gcwe7.link1024.com/web/img/avatar.png'">
							</image>
							<view class="">
								<view class="nickname">{{ item.nickname }}</view>
								<view class="date">{{ item.createtime }}</view>
							</view>
						</block>
						<block v-else>
							<image class="avatar" src="https://gcwe7.link1024.com/web/img/avatar.png"></image>
							<view class="">
								<view class="nickname">匿名用户</view>
								<view class="date">{{ item.createtime }}</view>
							</view>
						</block>
					</view>
					<view class="content margin-top">{{ item.content }}</view>
					<view v-if="item.media_type == '1'" class="margin-top">
						<video @tap.stop.prevent="play" style="width: 100%" :src="item.video"></video>
					</view>
					<view v-else-if="item.media_type == '2'" class="margin-top">
						<block v-for="(img, index1) in item.image" :key="index1">
							<image mode="aspectFill" @tap.stop.prevent="preview" :data-img="img" :data-list="item.image"
								class="item_img" :src="img"></image>
						</block>
					</view>
					<view class="flex justify-between margin-top">
						<view class="flex icon_item">
							<image src="/static/images/article/share.png"></image>
							<text>{{ item.collections_num }}</text>
						</view>
						<view class="flex icon_item">
							<image src="/static/images/article/comment.png"></image>
							<text>{{ item.comments_num }}</text>
						</view>
						<view class="flex icon_item">
							<image src="/static/images/article/fav.png"></image>
							<text>{{ item.likes_num }}</text>
						</view>
					</view>
				</view>
			</block>
		</view>
		<view class="padding" style="padding-top: 0" v-if="1==2">
			<!-- 文章列表 -->
			<view class="padding-bottom">
				<block v-if="dataList.length == 0">
					<view class="text-center margin-top text-df">暂无数据~</view>
				</block>
				<block v-else>
					<block key="index" v-for="(item, index) in dataList" :key="index">
						<view class="article_box padding" @tap="toDetail" :data-id="item.article_id">
							<view class="content">{{ item.content }}</view>
							<view v-if="item.media_type == '1'" class="margin-top">
								<video style="width: 100%" :src="item.video"></video>
							</view>
							<view v-else-if="item.media_type == '2'" class="margin-top">
								<block v-for="(img, index1) in item.image" :key="index1">
									<image mode="aspectFill" @tap.stop.prevent="preview" :data-img="img"
										:data-list="item.img" class="item_img" :src="img"></image>
								</block>
							</view>
							<view class="flex justify-between margin-top">
								<view class="flex icon_item">
									<image src="/static/images/article/share.png"></image>
									<text>{{ item.collections_num }}</text>
								</view>
								<view class="flex icon_item">
									<image src="/static/images/article/comment.png"></image>
									<text>{{ item.comments_num }}</text>
								</view>
								<view class="flex icon_item">
									<image src="/static/images/article/fav.png"></image>
									<text>{{ item.likes_num }}</text>
								</view>
							</view>
							<view class="margin-top-sm flex text-sm" style="line-height: 40rpx">
								<view class="">{{ item.createtime }}</view>
								<view class="margin-left">
									{{ item.status == 0 ? '待审核' : (item.status == 1 ? '通过' : '拒绝') }}</view>
								<view @tap.stop.prevent="del" :data-id="item.article_id"
									class="text-orange margin-left">删除</view>
							</view>
						</view>
					</block>
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
				// type: 1,
				type: 0,
				is_loadmore: true,
				page: 1,
				img: '',
				type_list: ['待审核', '已通过', '已拒绝'],
				flg_id: 0
			};
		}
		/**
		 * 生命周期函数--监听页面加载
		 */
		,
		onLoad: function(options) {
			this.getLst();
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
		},
		/**
		 * 用户点击右上角分享
		 */
		methods: {
			change_type(type)
			{
				this.type = type
				this.page = 1
				this.dataList = []
				this.is_loadmore = true
				this.getLst()
			},
			close() {
				this.flg_id = 0
			},
			open(id) {
				this.flg_id = id
			},
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
				var type = that.type==1?0:1;
				app.globalData.util.request({
					url: 'ZhArticles/getMyArticle',
					method: 'GET',
					data: {
						s_id: uni.getStorageSync('schoolId'),
						page: that.page,
						limit:10,
						status:type
					},

					success(res) {
						console.log(res.data.data, 1213);
						console.log(res.data.data.list.length)
						if (res.data.data.list.length < 10) {
							that.setData({
								is_loadmore: false
							});
						}

						for (var i = 0; i < res.data.data.list.length; i++) {
							that.dataList.push(res.data.data.list[i]);
							that.setData({
								dataList: that.dataList
							});
						}
					}
				}, true);
			},

			//删除文章
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
									article_id: self.flg_id,
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
		/* background: #000 */
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

	.date {
		margin-left: 0px !important;
		width: 100%;
	}

	.article {
		padding-left: 50rpx;
		position: relative;

		.quan {
			width: 32rpx;
			height: 32rpx;
			background: #FEEDED;
			border-radius: 50%;
			display: flex;
			align-items: center;
			justify-content: center;
			position: absolute;
			left: -16rpx;
			top: 60rpx;

			&::after {
				width: 16rpx;
				height: 16rpx;
				background: #FF4C4D;
				border-radius: 50%;
				content: "";
			}
		}
	}
</style>
