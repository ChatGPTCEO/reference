<template>
	<block>
		<!-- gc_school/pages/article/my.wxml -->
		<cu-custom bgColor="bgmain" :isBack="true">
			<view slot="content">我的发布</view>
		</cu-custom>

		<view class="cate_item_box flex">
			<block key="index" v-for="(item, index) in cateList" :key="index">
				<view @tap="cateChange" :data-index="index"
					:class="'cate_item ' + (cate_index == index ? 'cate_active' : '')">{{ item.name }}</view>
			</block>
		</view>
		<view class="padding" style="padding-top: 0">
			<!-- 文章列表 -->
			<view class="padding-bottom">
				<block v-if="dataList.length == 0">
					<view class="text-center margin-top text-df">暂无数据~</view>
				</block>
				<block v-else>
					<block key="index" v-for="(item, index) in dataList" :key="index">
						<view class="article_box padding" @tap="toDetail" :data-id="item.info_id">
							<view class="item text-lg text-bold">{{ item.title }}</view>
							<view v-if="item.media_type == '1'" class="margin-top">
								<video style="width: 100%" :src="item.video"></video>
							</view>
							<view v-else-if="item.media_type == '2'" class="margin-top">
								<block v-for="(img, index1) in item.image" :key="index1">
									<image mode="aspectFill" @tap.stop.prevent="preview" :data-img="img"
										:data-list="item.img" class="item_img" :src="img"></image>
								</block>
							</view>
							<view class="item flex align-center text-bold">
								<image class="icon" src="../../../static/icon/lost/location.png"></image>
								{{item.type==1?'拾物地点':'丢失地点'}}：<text class="val">{{ item.address }}</text>
							</view>
							<view class="item flex align-center text-bold" v-if="item.pick_date">
								<image class="icon" src="../../../static/icon/lost/date.png"></image>
								{{item.type==1?'拾物时间':'丢失时间'}}：<text class="val">{{ item.pick_date }}</text>
							</view>
							<view class="item flex align-center text-bold" v-if="item.phone">
								<image class="icon" src="../../../static/icon/lost/phone.png"></image>
								联系电话：<text class="val">{{ item.phone }}</text>
							</view>
							<view class="margin-top-sm flex text-sm operate align-center" style="line-height: 40rpx">
								<view class="text-df">{{ item.createtime }}</view>
								<view @tap.stop.prevent="del" :data-id="item.info_id" class="text-orange margin-left del_btn">删除
								</view>
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
				cateList: [{
						name: '失物招领'
					},
					{
						name: '寻物启事'
					}
				],
				cate_index: 0,
				dataList: [],
				type: 1,
				is_loadmore: true,
				page: 1,
				img: ''
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
			cateChange(e) {
				this.setData({
					cate_index: e.currentTarget.dataset.index,
					type: e.currentTarget.dataset.index+1,
					page: 1,
					is_loadmore: true,
					dataList: []
				});
				this.getLst();
			},
			//进入详情页面
			toDetail(e) {
				console.log(e.currentTarget.dataset.id);
				uni.navigateTo({
					url: '/gc_school/pages/lost/detail?id=' + e.currentTarget.dataset.id
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
					url: 'ZhInfo/getMyInformationList',
					method: 'GET',
					data: {
						s_id: uni.getStorageSync('schoolId'),
						page: that.page,
						type:that.type,
						limit:10
					},

					success(res) {
						console.log(res.data.data.list);

						if (res.data.data.list.length < 5) {
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

			//删除评论
			del(e) {
				console.log(e)
				var self = this;
				console.log(e.currentTarget.dataset.id);
				uni.showModal({
					content: '确认删除该条信息吗？',

					success(res) {
						if (res.confirm) {
							app.globalData.util.request({
								url: 'ZhInfo/delete',
								data: {
									info_id: e.currentTarget.dataset.id,
									s_id: uni.getStorageSync('schoolId'),
								},

								success(result) {
									console.log(result)
									if (result.data.status == 200) {
										uni.showToast({
											title: result.data.message
										});
										app.globalData.isload = true;
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
		background: #F7F5F6;
	}

	/* 分类 */
	.cate_item_box {
		background-color: white;
		margin-right: 20rpx;
		/* width: 75%; */
		overflow: scroll;
		height: 60rpx;
		width: 100%;
	}

	.cate_item {
		margin: 0 30rpx;
		font-size: 34rpx;
		color: #666666;
		position: relative;
		flex-shrink: 0;
		height: 40rpx;
		/* width: 50%; */
		/* text-align: center; */
	}

	.cate_active {
		color: black;
		font-weight: bold;
		font-size: 34rpx;
	}

	.cate_active::after {
		position: absolute;
		content: '';
		width: 40rpx;
		height: 6rpx;
		background: #ff6344;
		bottom: -20rpx;
		left: 0;
		right: 0;
		margin: 0 auto;
		border-radius: 20rpx;
	}

	/* 文章列表 */
	.article_box {
		margin-top: 40rpx;
		background-color: white;
		/* box-shadow: 0px 4px 20px 0px rgba(153, 153, 153, 0.1); */
		border-radius: 20rpx;
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
	.item {
	    font-size: 30rpx;
	    /* line-height: 50rpx; */
	    margin: 20rpx 0;
	}
	.icon{
		width: 30rpx;
		height: 30rpx;
		margin-right: 10rpx;
	}
	.val{
		color: #666666;
		font-size: 28rpx;
		/* font-weight: 200; */
	}
	.operate{
		margin-top: 10rpx;
		padding-top: 20rpx;
		border-top: 1rpx solid #EEEEEE;
	}
	.del_btn{
		background-color: #FF4C4D;
		width: 120rpx;
		height: 52rpx;
		line-height: 52rpx;
		color: white;
		border-radius: 26rpx;
		text-align: center;
		margin-left: auto;
	}
</style>
