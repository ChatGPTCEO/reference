<template>
	<block>
		<cu-custom bgColor="bgmain" :isBack="true">
			<view slot="content">失物招领</view>
		</cu-custom>
		<view class="padding-top-sm padding-bottom-sm padding bg-white">
			<view class="search_box" @tap="jumps" data-url="/gc_school/pages/lost/search">
				<text class="cuIcon-search"></text>
				搜索
				<!-- <input  placeholder="请输入关键词"  /> -->
			</view>

		</view>
		<view class="slide_box padding" style="padding-top: 0;" v-if="slideList.length > 0">
			<swiper circular :autoplay="autoplay" class="swiper-box" @change="index_swiperChange" :duration="duration">
				<swiper-item v-for="(item, index) in slideList" :key="index">
					<image @tap="slideJump" :data-url="item.url" :data-type="item.url_type"
						:class="index_swiperCurrent == index ? 'on slide-image' : ' slide-image'" :data-index="index"
						:lazyLoad="true" :src="item.img"></image>
				</swiper-item>
			</swiper>
			<view class="indicator-dots">
				<block v-for="(item, index) in slideList" :key="index">
					<view :class="index_swiperCurrent == index ? 'dots_on' : ''"></view>
				</block>
			</view>
		</view>
		<view class="padding-top-sm padding bg-white">
			<!-- 分类 -->
			<view class="cate_item_box flex">
				<block key="index" v-for="(item, index) in cateList" :key="index">
					<view @tap="cateChange" :data-index="index"
						:class="'cate_item ' + (cate_index == index ? 'cate_active' : '')">{{ item.name }}</view>
				</block>
			</view>

		</view>

		<!-- 文章列表 -->
		<view class="padding-bottom" style="padding-bottom: 100rpx">
			<block v-if="dataList.length == 0">
				<view class="text-center margin-top text-df">暂无数据~</view>
			</block>
			<block v-else>
				<block key="index" v-for="(item, index) in dataList" :key="index">
					<view class="article_box padding margin" @tap="toDetail" :data-id="item.info_id">
						<view class="flex align-center">
							<image class="avatar" :src="item.avatar ? item.avatar : '/images/code/c17.png'"></image>
							<view class="nickname">{{ item.nickname }}</view>
							<view class="date">{{ item.createtime }}</view>
						</view>
						<view class="item text-lg text-bold">{{ item.title }}</view>
						<view v-if="item.media_type == '1'" class="margin-top">
							<video @tap.stop.prevent="play" style="width: 100%" :src="item.video"></video>
						</view>
						<view v-else-if="item.media_type == '2'" class="margin-top">
							<block v-for="(img, index1) in item.image" :key="index1">
								<image @tap.stop.prevent="preview" mode="aspectFill" :data-img="img"
									:data-list="item.image" class="item_img" :src="img"></image>
							</block>
						</view>
						<view class="item flex align-center text-bold">
							<image class="icon" src="../../../static/icon/lost/location.png"></image>
							{{item.type==1?'拾物地点':'丢失地点'}}：<text class="val">{{ item.address }}</text>
						</view>
						<!-- <view class="item" v-if="item.type == 2">丢失地点：{{ item.address }}</view> -->
						<!-- <view class="item" v-if="item.dates">时间：{{ item.pick_date }}</view> -->
						<view class="item flex align-center text-bold" v-if="item.pick_date">
							<image class="icon" src="../../../static/icon/lost/date.png"></image>
							{{item.type==1?'拾物时间':'丢失时间'}}：<text class="val">{{ item.pick_date }}</text>
						</view>
						<view class="item flex align-center text-bold" v-if="item.phone">
							<image class="icon" src="../../../static/icon/lost/phone.png"></image>
							联系电话：<text class="val">{{ item.phone }}</text>
						</view>
						<!-- <view class="item" v-if="item.claim_method && item.type == 1">认领方式：{{ item.claim_method }}</view>
                            <view class="content item" v-if="item.remarks">备注：{{ item.remarks }}</view>
                            <view class="flex justify-between margin-top">
                                <view></view>
                                <view class="flex icon_item">
                                    <text>查看详情>>></text>
                                </view>
                            </view> -->
					</view>
				</block>
			</block>
		</view>

		<!-- <image @tap="jump" data-url="/gc_school/pages/lost/my" class="post_img" src="/static/images/article/my.png"></image>

            <view class="publish publish_item text-center" @tap="jump" data-url="/gc_school/pages/lost/post">
                <image src="/static/images/article/fabu.png"></image>
                <view class="text-white text-df">一键发布</view>
            </view> -->

		<view class="allEntry">
			<image src="/static/icon/lost/operate.png" mode="widthFix" class="entryoperation"
				@tap="seeOperation = !seeOperation"></image>
			<view :class="{OpenOperation:seeOperation}">
				<!-- <image src="/static/images/entryorder.png" mode="widthFix" class="entryorder childImage"></image> -->
				<image src="/static/icon/lost/fabu.png" mode="widthFix" class="entryrelease childImage"
					@click="go('/gc_school/pages/lost/post')" />
				<image src="/static/icon/lost/manage.png" mode="widthFix" class="entryadmin childImage"
					@click="go('/gc_school/pages/lost/my')" />
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
				slideList: [],
				freshen: true,
				autoplay: 0,
				duration: '',
				img: '',
				seeOperation: false
			};
		}
		/**
		 * 生命周期函数--监听页面加载
		 */
		,
		onLoad: function(options) {
			if (!uni.getStorageSync('schoolId')) {
				if (options.s_id) {
					uni.setStorageSync('schoolId', options.s_id);
				}
			}

			this.getLst();
			this.getSlide();
		},
		/**
		 * 生命周期函数--监听页面初次渲染完成
		 */
		onReady: function() {},
		/**
		 * 生命周期函数--监听页面显示
		 */
		onShow: function() {
			console.log('是否需要重新加载', app.globalData.isload); // if(this.data.freshen)
			// {
			//列表是否需要重新加载，首页切换学校的话列表需要重新加载
			// if(app.globalData.isload)
			// {
			// this.getLst()
			// this.setData({
			//   dataList:[],
			//   page:1,
			//   cate_index:0
			// })
			// }

			app.globalData.isload = false; // }
			// else{
			//   this.setData({
			//     freshen:true
			//   })
			// }
			// console.log("赋值",this.data.freshen)
		},
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
		onReachBottom: function() {
			if (this.is_loadmore) {
				this.setData({
					page: this.page + 1
				});
				this.getLst(this.cateList[this.cate_index]['id']);
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
		onShareAppMessage: function() {
			return {
				path: '/gc_school/pages/lost/index?s_id=' + uni.getStorageSync('schoolId')
			};
		},
		onShareTimeline() {
			return {
				title: '失物招领',
				query: 's_id=' + uni.getStorageSync('schoolId')
			};
		},
		methods: {
			//获取轮播图
			getSlide() {
				var that = this;
				app.globalData.util.request({
					url: 'Slide/index',
					// method: 'POST',
					data: {
						s_id: uni.getStorageSync('schoolId'),
						show_type: 4
					},
					success(res) {
						that.slideList = res.data.data.list
					}
				});
			},

			play() {},

			//进入详情页面
			toDetail(e) {
				console.log(e.currentTarget.dataset.id);
				uni.navigateTo({
					url: '/gc_school/pages/lost/detail?id=' + e.currentTarget.dataset.id
				});
			},

			//轮播图跳转
			slideJump(e) {
				console.log(e);

				if (e.currentTarget.dataset.type == 1) {
					uni.navigateTo({
						url: e.currentTarget.dataset.url
					});
				} else {
					if (e.currentTarget.dataset.type == 2) {
						console.log('appid是', e.currentTarget.dataset.url);
						uni.navigateToMiniProgram({
							appId: e.currentTarget.dataset.url,
							path: '',
							extraData: {
								foo: 'bar'
							},
							envVersion: 'release',

							success(res) {
								console.log('打开成功');
							}
						});
					} else if (e.currentTarget.dataset.type == 3) {
						uni.navigateTo({
							url: '/gc_school/pages/webview/index?url=' + e.currentTarget.dataset.url
						});
					}
				}
			},

			//图片预览
			preview(e) {
				this.setData({
					freshen: false
				});
				uni.previewImage({
					current: e.currentTarget.dataset.img,
					urls: e.currentTarget.dataset.list
				});
			},

			//获取文章列表
			getLst() {
				var that = this;
				app.globalData.util.request({
					url: 'ZhInfo/getInformationList',
					method: 'GET',
					data: {
						s_id: uni.getStorageSync('schoolId'),
						type: that.cate_index + 1,
						page: that.page,
						limit: 5
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
				});
			},

			cateChange(e) {
				this.setData({
					cate_index: e.currentTarget.dataset.index,
					page: 1,
					is_loadmore: true,
					dataList: []
				});
				this.getLst(this.cateList[e.currentTarget.dataset.index]['id']);
			},

			upload() {
				var that = this;
				uni.chooseMedia({
					success(res) {
						console.log(res);
						console.log(res.type);
						console.log(res.tempFiles[0]['tempFilePath']);
						that.setData({
							url: res.tempFiles[0]['tempFilePath']
						}); // console.log(res)
						// console.log(res.tempFilePaths[0])
					}
				});
			},

			index_swiperChange: function(e) {
				this.setData({
					index_swiperCurrent: e.detail.current
				});
			},

			async jump(e) {
				await this.login().then((res) => {
					console.log("您已登陆！");
				})

				uni.navigateTo({
					url: e.currentTarget.dataset.url
				});
			},
			jumps(e) {
				uni.navigateTo({
					url: e.currentTarget.dataset.url
				});
			}
		}
	};
</script>
<style>
	page {
		background: #F7F5F6;
	}

	.contents {
		padding: 70rpx 0 30rpx 0;
		color: white;
		font-size: 30rpx;
		text-align: center;
		background: #ff6444;
		/* background: white; */
		/* background-image: linear-gradient(to right, #0396FF, #23AFE4, #ABDCFF) !important; */
	}

	.slide_box {
		position: relative;
		/* padding:20rpx 0; */
		background-color: white;
	}

	.swiper-box {
		/* padding: 10rpx 20rpx 10rpx 20rpx; */
	}

	.indicator-dots {
		width: 100%;
		position: absolute;
		bottom: 30rpx;
		left: 0;
		display: flex;
		justify-content: center;
	}

	.indicator-dots view {
		width: 12rpx;
		height: 12rpx;
		background: #d1d1d1;
		margin: 0 5rpx;
		border-radius: 50%;
	}

	.indicator-dots view.dots_on {
		background: white;
	}

	/* 分类 */
	.cate_box {}

	.cate_item_box {
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
		width: 130rpx;
		height: 10rpx;
		background: #ff6344;
		bottom: -5rpx;
		left: 0;
		right: 0;
		margin: 0 auto;
		border-radius: 20rpx;
	}

	.label_box {
		/* width: 25%; */
		flex-shrink: 0;
	}

	.label_item {
		border: 2rpx solid #ff6344;
		padding: 5rpx 15rpx;
		color: #ff6344;
	}

	.label_item_active {
		background: #ff6344;
		color: white;
	}

	/* 文章列表 */
	.article_box {
		margin-top: 40rpx;
		box-shadow: 0px 4px 20px 0px rgba(153, 153, 153, 0.1);
		border-radius: 20rpx;
		background-color: white;
	}

	.article_box .avatar {
		width: 75rpx;
		height: 75rpx;
		border-radius: 50%;
		margin-right: 20rpx;
		flex-shrink: 0;
	}

	.article_box .nickname {
		font-size: 30rpx;
		font-weight: bold;
	}

	.article_box .date {
		font-size: 28rpx;
		color: #888888;
		margin-left: auto;
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
		width: 90rpx;
		height: 90rpx;
		position: fixed;
		right: 0;
		bottom: 32%;
		background: #00bb69;
		border-radius: 50%;
		padding: 20rpx;
	}

	.item_img {
		width: 180rpx;
		height: 180rpx;
		margin-right: 20rpx;
	}

	.my_fixed {
		width: 90rpx;
		height: 90rpx;
		position: fixed;
		right: 0;
		bottom: 20%;
		background: #ff6344;
		border-radius: 50%;
		line-height: 90rpx;
		text-align: center;
		color: white;
	}

	.publish {
		position: fixed;
		bottom: -110rpx;
		/* left: 10%; */
		/* width: 80%; */
		left: 50%;
		transform: translateX(-50%);
	}

	.publish_item {
		background: #ff6444;
		width: 220rpx;
		height: 220rpx;
		border-radius: 50%;
	}

	.my {
		width: 50rpx !important;
		height: 50rpx !important;
		margin: 10rpx 0 5rpx;
	}

	.publish image {
		width: 65rpx;
		height: 65rpx;
	}

	.item {
		font-size: 30rpx;
		/* line-height: 50rpx; */
		margin: 20rpx 0;
	}

	.icon {
		width: 30rpx;
		height: 30rpx;
		margin-right: 10rpx;
	}

	.val {
		color: #666666;
		font-size: 28rpx;
		/* font-weight: 200; */
	}

	.search_box {
		/* border: 1rpx solid #FF6444; */
		height: 70rpx;
		width: 100%;
		border-radius: 50rpx;
		margin: 10rpx auto 10rpx;
		background: #f2f2f2;
		text-align: center;
		line-height: 70rpx;
		font-size: 28rpx;
		color: gray;
	}

	/* 底部操作功能 */
	.allEntry {
		position: fixed;
		right: 0;
		bottom: 10rpx;

		width: 148rpx;
		height: 148rpx;
	}

	.allEntry .entryoperation {
		width: 148rpx;
		height: 148rpx;
	}

	.allEntry .childImage {
		width: 168rpx;
		height: 168rpx;
		position: absolute;
	}

	.allEntry .OpenOperation .entryorder {
		right: 0;
		bottom: 200rpx;
	}

	.allEntry .OpenOperation .entryrelease {

		right: 110rpx;
		bottom: 150rpx;
	}

	.allEntry .OpenOperation .entryadmin {
		right: 210rpx;
		bottom: 0;
	}
	.slide-image{
		border-radius: 20rpx;
	}
</style>
