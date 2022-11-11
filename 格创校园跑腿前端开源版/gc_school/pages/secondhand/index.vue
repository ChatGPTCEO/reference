<template>
	<block>
		<view class="Highlight">
			<cu-custom bgColor="bgmain" :isBack="true">
				<view slot="content">二手市场</view>
			</cu-custom>
			<view class="search_bg">
				<view class="search_box" data-id="9999">
					<input @input="setKeyWord" placeholder="输入您要搜索的内容" />
					<text class="cuIcon-search text-black"></text>
				</view>
			</view>


			<view class="cate_box">
				<view :class="'cate_item ' + (current_cate == 9999 ? 'cate_active' : '')" @tap="changeTab"
					data-index="9999" data-id="9999">全部</view>
				<block v-for="(item, index) in cateList" :key="index">
					<view :class="'cate_item ' + (current_cate == item.id ? 'cate_active' : '')" @tap="changeTab"
						:data-index="index" :data-id="item.id">
						{{ item.title }}
					</view>
				</block>
			</view>
			<view class="filterList">
				<view class="filter">
					<view class="filterItem" @tap="sotrFlag = !sotrFlag,oldDegreeFlag=false">
						<text class="names">排序</text>
						<image src="/static/images/downGrayIcon.png" mode="" class="downGrayIcon"></image>
					</view>
					<view class="filterItem" @tap="setfilter('priceFlag' , !priceFlag)">
						<text class="names">价格</text>
						<image src="/static/images/downUpGrayIcon.png" mode="" class="downUpGrayIcon"></image>
					</view>
					<view class="filterItem" @tap="oldDegreeFlag = !oldDegreeFlag,sotrFlag=false">
						<text class="names">新旧</text>
						<image src="/static/images/downGrayIcon.png" mode="" class="downGrayIcon"></image>
					</view>
				</view>
				<view class="sortList" v-if="sotrFlag || oldDegreeFlag">
					<block v-if="sotrFlag">
						<view class="sotrTitle">
							<view :class="{active:sotrvalue == item}" v-for="(item , index) in sotrList" :key="index"
								@tap="setfilter('sotrvalue' , item)">
								{{item}}
							</view>
						</view>

					</block>

					<block v-if="oldDegreeFlag">
						<view class="">
							<view class="oldtitle">
								<view :class="{active:oldDegreeValue == item}" v-for="(item , index) in oldDegree"
									:key="index" @tap="oldDegreeValue = item">
									{{item}}
								</view>
								<view class="nulls"></view>
								<view class="nulls"></view>
							</view>
							<view class="Button">
								<view class="Reset" @tap="setfilter('oldDegreeValue' , '')">
									重置
								</view>
								<view class="sure" @tap="setfilter('oldDegreesureValue',oldDegreeValue)">
									确认
								</view>
							</view>
						</view>

					</block>
				</view>
			</view>
		</view>
		<view class="modality" v-if="sotrFlag || oldDegreeFlag"></view>


		<!-- 最新上架 -->
		<view class="newest">
			<!-- <h2>最新上架</h2> -->
			<view class="goods_line">
				<block  v-for="(item, index) in goodsList" :key="index">
					<view class="goods_item" @click="toDetail(item.m_id)" :data-id="item.m_id">
						<image :src="item.image" mode="aspectFill"></image>
						<view class="name">{{ item.title }}</view>
						<view class="oldArrangement">
							{{ item.degree }}
						</view>
						<view class="price">
							<view class="price_item"><text class="Company">￥</text>{{ item.pay }}</view>
							<view class="">￥{{ item.price }}</view>
						</view>
						<view class="userInfo">
							<view class="left">
								<image :src="item.avatar" class="avatar"></image>
								<view class="nickname">{{ item.nickname }}</view>
							</view>
							<view>
								<image src="../../../static/images/xihuans.png" v-if="item.stay == 1" class="xihuan">
								<image src="../../../static/images/xihuan.png" v-else class="xihuan">
								{{ item.con }}
							</view>
						</view>
					</view>
				</block>
			</view>
			<view v-if="!loadmore && goodsList.length > 0" class="nomore">暂无更多数据~</view>
		</view>

		<view class="nocontent" v-if="goodsList.length == 0">
			<image lazyLoad mode="aspectFit" src="/static/images/empty.png"></image>
			<view class="blank_text">暂无数据哦~</view>
		</view>

		<view class="allEntry">
			<image src="/static/images/entryoperation.png" mode="widthFix" class="entryoperation" @tap="seeOperation = !seeOperation"></image>
			<view :class="{OpenOperation:seeOperation}">
				<image src="/static/images/entryorder.png" mode="widthFix" class="entryorder childImage" @tap="dingdan"></image>
				<image src="/static/images/entryrelease.png" mode="widthFix" class="entryrelease childImage"
					@tap="publish"></image>
				<image src="/static/images/entryadmin.png" mode="widthFix" class="entryadmin childImage" @tap="my">
				</image>
			</view>
		</view>
	</block>
</template>

<script>
	//index.js
	//获取应用实例
	var app = getApp();
	export default {
		data() {
			return {
				common: '通用',
				oldDegree: ['全新', '9成新', '8成新', '7成新', '6成新', '5成新以下'],
				sotrList: ['综合', '最新', '最热'],
				cateList: [],
				goodsList: [],
				islog: false,
				searchName: "",
				page: 1,
				current_cate: 9999,
				priceFlag:false,//价格状态
				sotrvalue: "", //排序选中的值
				oldDegreesureValue: "", //新旧选中的值
				oldDegreeValue: "", //第一次选中
				sotrFlag: false,
				oldDegreeFlag: false,
				loadmore: true,
				 
				seeOperation:false,
				onshows:0,
				uids:0,
				es:0,

			};
		},
		onLoad: function(options) {
			console.log(options); // wx.getStorageSync("schoolId")

			console.log(uni.getStorageSync('schoolId'));

			if (!uni.getStorageSync('schoolId')) {
				if (options.s_id) {
					uni.setStorageSync('schoolId', options.s_id);
				}
			}
			this.getCate();

			this.setData({
				goodsList: [],
				page: 1,
				loadmore: true
			});

			if (uni.getStorageSync('openid')) {
				this.setData({
					islog: true
				});
			}
			if (uni.getStorageSync('token')) {
				this.getUids();
				// this.footprints(options.id);
				// this.views(options.id);
			}
		},
		onShow() {
			
			if(this.onshows == 1){
				this.getCate();
				
				this.setData({
					goodsList: [],
					page: 1,
					loadmore: true
				});
				
				if (uni.getStorageSync('openid')) {
					this.setData({
						islog: true
					});
				}
			}else{
				this.onshows = 1;
			}
			
		},
		onReachBottom: function() {
			if(this.loadmore){
				this.setData({
					page: this.page + 1
				})
			  this.getGoods()
			}
		},
		onShareAppMessage: function() {
			return {
				path: '/gc_school/pages/secondhand/index?s_id=' + uni.getStorageSync('schoolId')
			};
		},
		onShareTimeline() {
			return {
				title: '二手市场',
				query: 's_id=' + uni.getStorageSync('schoolId')
			};
		},
		methods: {
			changeTab(e) {
				if (e.currentTarget.dataset.id != this.current_cate) {
					this.setData({
						current_cate: e.currentTarget.dataset.id,
						page: 1,
						loadmore: true,
						goodsList: []
					});
					// this.priceFlag = '';
					// this.sotrvalue = '';
					// this.degree = '';
					this.es = 3;
					this.getGoods(3);
				}
			},
			dingdan(){
				// console.log(123)
				uni.navigateTo({
					url:'/gc_school/pages/secondhand/mybuy'
				})
			},
			getUids() {
				var self = this;
				app.globalData.util.request({
			  url: 'Dmhmarketgoods/uids',
					data: {},
			
					success(res) {
			 		console.log(res.data.data);
			  	self.setData({
							uids: res.data.data.uids,
							// rotation:JSON.parse(res.data.data.rotation),
						});
					}
				}, true);
			},
			getGoods(e) {
				var self = this;
				if(uni.getStorageSync('token')){
					let param = {
						page: self.page,
						s_id: uni.getStorageSync('schoolId'),
					}
					console.log(e,'状态');
					if(this.es == 1){
						// 搜索框搜索
							param.keywords = self.searchName
					}
					if(this.es == 2){
						// 排序按钮
							// param.sotrvalue = self.sotrvalue
							if(self.priceFlag){
								param.priceFlag = self.priceFlag
							}else{
								param.priceFlag = self.priceFlag
								console.log('--没有111')
							}
							if(self.sotrvalue){
								param.sotrvalue = self.sotrvalue
								console.log('--没有222')
							}
							if(self.oldDegreesureValue){
								param.degree = self.oldDegreesureValue
								console.log('--没有333')
							}
							
							
					}
					if(this.es == 3){
						// 商品分类
						if(self.current_cate == 9999){
							
						}else{
							param.cid = self.current_cate 
						}
					 		
					}
					param.uid = self.uids 
					// if (self.current_cate == 9999) {
					// 	param.type = 1
					// } else {
					// 	if (self.current_cate == -1) {
					// 		param.type = 3;
					// 		param.keywords = self.searchName
					// 		param.priceFlag = self.priceFlag
					// 		console.log(111)
					// 	} else {
					
					// 		param.type = 2;
					// 		param.cid = self.current_cate 
					// 		param.keywords = self.searchName
					// 		param.priceFlag = self.priceFlag
					// 		param.sotrvalue = self.sotrvalue
					// 		console.log(222)
					// 	}
					// }
					// this.priceFlag = '';
					// this.sotrvalue = '';
					// this.degree = '';
					// param.priceFlag = self.priceFlag
					// param.sotrvalue = self.sotrvalue
					// param.degree = self.oldDegreesureValue
					
					app.globalData.util.request({
						url: 'Dmhmarketgoods/index',
						data: param,
					
						success(res) {
							if (res.data.data.list.length < 10) {
								self.setData({
									loadmore: false
								});
							}else{
								self.setData({
									loadmore: true
								});
							}
							if(self.page==1)
							{
								self.setData({
									goodsList: res.data.data.list
								});
							}
							else{
								var goodsList = [...self.goodsList,...res.data.data.list]
								self.setData({
									goodsList: goodsList
								});
							}
							console.log("商品列表", self.goodsList)
						}
					});
				}else{
					let param = {
						page: self.page,
						s_id: uni.getStorageSync('schoolId'),
					}
					console.log(e,'状态');
					if(e == 1){
						// 搜索框搜索
							param.keywords = self.searchName
					}
					if(e == 2){
						// 排序按钮
							// param.sotrvalue = self.sotrvalue
							if(self.priceFlag){
								param.priceFlag = self.priceFlag
							}else{
								console.log('--没有111')
							}
							if(self.sotrvalue){
								param.sotrvalue = self.sotrvalue
								console.log('--没有222')
							}
							if(self.oldDegreesureValue){
								param.degree = self.oldDegreesureValue
								console.log('--没有333')
							}
							
							
					}
					if(e == 3){
						// 商品分类
						if(self.current_cate == 9999){
							
						}else{
							param.cid = self.current_cate 
						}
					 		
					}
					
					// if (self.current_cate == 9999) {
					// 	param.type = 1
					// } else {
					// 	if (self.current_cate == -1) {
					// 		param.type = 3;
					// 		param.keywords = self.searchName
					// 		param.priceFlag = self.priceFlag
					// 		console.log(111)
					// 	} else {
					
					// 		param.type = 2;
					// 		param.cid = self.current_cate 
					// 		param.keywords = self.searchName
					// 		param.priceFlag = self.priceFlag
					// 		param.sotrvalue = self.sotrvalue
					// 		console.log(222)
					// 	}
					// }
					// this.priceFlag = '';
					// this.sotrvalue = '';
					// this.degree = '';
					// param.priceFlag = self.priceFlag
					// param.sotrvalue = self.sotrvalue
					// param.degree = self.oldDegreesureValue
					
					app.globalData.util.request({
						url: 'Dmhmarketgoods/index',
						data: param,
					
						success(res) {
							if (res.data.data.list.length < 10) {
								self.setData({
									loadmore: false
								});
							}
					
							self.setData({
								goodsList: res.data.data.list
							});
							console.log("商品列表", res.data.data.list)
						}
					});
				}
			
			},

			getCate() {
				var self = this;
				app.globalData.util.request({
					url: 'Dmhmarketcategory/index',
					data: {
						s_id: uni.getStorageSync('schoolId')
					},
					success(res) {
						console.log(res.data.data)
						self.setData({
							cateList: res.data.data.list,
							page:1
						});

						if (res.data.data.list.length > 0) {
							this.es = 3;
							self.getGoods(3);
						}
					}
				}, true);
			},
			// 排序和新旧选择
			setfilter(key, value) {
				console.log(key, value)
				this.priceFlag = '';
				this.sotrvalue = '';
				this.degree = '';
				this.setData({
					[key]: value,
					sotrFlag: false,
					oldDegreeFlag: false,
					page:1
				})
				if (key == 'oldDegreeValue' && !value) {
					this.setData({
						oldDegreesureValue: '',
					})

				}
				this.es = 2;
				this.getGoods(2);
			},
			setKeyWord({detail:{value}}){
				this.setData({
					searchName:value,
					current_cate:-1,
					page:1
				});
				// this.priceFlag = '';
				// this.sotrvalue = '';
				// this.degree = '';
				this.es = 1;
				this.getGoods(1);
			},





			//进入详情
			toDetail(e) {
				// console.log(e,'---')
				uni.navigateTo({
					url: '/gc_school/pages/secondhand/detail?id=' + e
				});
			},

			publish() {
				if (!uni.getStorageSync('token')) {
					uni.showToast({
						title: '请登录后发布',
						icon: 'none'
					});
					// setTimeout(function() {
					// 	uni.switchTab({
					// 		url: '/gc_school/pages/user/index'
					// 	});
					// }, 1000);
					// return;
					setTimeout(function() {
						uni.navigateTo({
							url: '/gc_school/pages/user/index'
						});
					}, 1000);
					return;
				}

				uni.navigateTo({
					url: '/gc_school/pages/addsecond/index'
				});
			},

			my() {
				if (!uni.getStorageSync('token')) {
					uni.showToast({
						title: '请登录后查看',
						icon: 'none'
					});
					// setTimeout(function() {
					// 	uni.switchTab({
					// 		url: '/gc_school/pages/user/index'
					// 	});
					// }, 1000);
					// return;
					setTimeout(function() {
						uni.navigateTo({
							url: '/gc_school/pages/user/index'
						});
					}, 1000);
					return;
				}

				uni.navigateTo({
					url: '/gc_school/pages/secondhand/my'
				});
			},



		}
	};
</script>
<style>
	page {
		background: #f2f2f2;
	}

	.Highlight {
		position: relative;
		z-index: 2;
	}

	.modality {
		background-color: rgba(0, 0, 0, .5);
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		z-index: 1;
	}

	.bgmain {
		background-color: #ffffff;
		color: #121212;
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

	.search_bg {
		background-color: #ffffff;
		padding: 30rpx;
	}

	.search_box {
		/* display: flex; */
		background: #F7F5F6;
		border-radius: 44rpx;
		/* justify-content: space-around; */
		position: relative;
	}

	.search_box input {
		line-height: 88rpx;
		height: 88rpx;
		width: 100%;
		padding-left: 93rpx;
	}

	.cuIcon-search {
		position: absolute;
		left: 36rpx;
		top: 50%;
		transform: translateY(-50%);
		font-size: 34rpx;
	}

	/* 分类 */
	.cate_box {
		display: flex;
		background: white;
		overflow: scroll;
		/* padding: 0 0 0 0; */
		/* padding-left: 30rpx; */

	}

	.cate_item {
		width: 25%;
		height: 80rpx;
		flex-shrink: 0;
		/* margin-right: ; */
		font-size: 34rpx;
		line-height: 70rpx;
		text-align: center;
		position: relative;
	}
	.cate_item.cate_active{
		font-weight: bold;
	}
	.cate_item.cate_active::before {
		content: "";
		position: absolute;
		bottom: 18rpx;
		width: 72rpx;
		height: 12rpx;
		background: #FF4C4D;
		opacity: .6;
		border-radius: 6px;
		left: 50%;
		transform: translateX(-50%);
	}

	/* 筛选排序 */
	.filterList {
		position: relative;
	}

	.filter {
		display: flex;
		align-items: center;
		background-color: #FFFFFF;
		justify-content: space-between;
		padding: 0 30rpx;
		height: 70rpx;
	}

	.filter .filterItem {
		display: flex;
		align-items: center;
	}

	.filter .filterItem .names {

		color: #666666;
		font-size: 28rpx;
	}

	.filter .filterItem .downUpGrayIcon {

		width: 10rpx;
		margin-left: 11px;
		height: 16rpx;
	}

	.filter .filterItem .downGrayIcon {
		width: 12rpx;
		height: 8rpx;
		margin-left: 11px;
	}

	.filterList .sortList {
		position: absolute;
		background-color: #FFFFFF;
		padding: 10px 30rpx 40rpx;
		line-height: 70rpx;
		border-radius: 0px 0px 20rpx 20rpx;
		width: 100%;
	}

	.sortList .sotrTitle {

		font-size: 28rpx;
		color: #232323;
	}

	.sortList .sotrTitle .active {
		color: #FF4C4D;
	}

	.sortList .oldtitle {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
	}

	.sortList .Button {

		display: flex;
		justify-content: space-between;
		margin-top: 20px;
	}

	.sortList .Button .Reset {
		width: 32%;
		text-align: center;
		font-size: 32rpx;
		border: 1px solid #1B1B1B;
		border-radius: 34rpx;

	}

	.sortList .Button .sure {
		width: 60%;
		text-align: center;
		background-color: #FF4C5C;
		color: #FFFFFF;
		font-size: 32rpx;
		border-radius: 34rpx;

	}

	.sortList .oldtitle view {
		width: 24%;
		height: 64rpx;
		line-height: 64rpx;
		text-align: center;
		background: #F7F5F6;
		border-radius: 10px;
		margin-top: 20px;
	}

	.sortList .oldtitle view.active {
		border: 1px solid #FF4C5C;
		color: #FF4C4D;
		background-color: #FAF1F1;
	}

	.sortList .oldtitle .nulls {
		background-color: transparent;
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
		font-size: 32rpx !important;
		margin-right: 23rpx;
	}
	.goods_item .price .price_item .Company{
		font-size:26rpx
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

	.text-orange {
		color: #ff6344;
		margin-right: 10rpx;
		font-size: 28rpx;
	}

	.tab-on {
		color: #7acfa6;
		font-size: 32rpx !important;
		font-weight: 600;
		/* border-bottom: 4rpx solid #7acfa6!important; */
	}

	.list_author {
		padding-top: 10rpx;
		width: 100%;
		font-size: 27rpx;
		letter-spacing: 3rpx;
		line-height: 40rpx;
		color: rgb(129, 129, 129);
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	.nocontent {
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		box-sizing: border-box;
		background: white;
		padding-bottom: 20rpx;
	}

	.nomore {
		text-align: center;
		font-size: 30rpx;
	}

	.nocontent image {
		width: 150rpx;
		height: 150rpx;
	}

	.blank_text {
		padding-top: 10rpx;
		font-size: 32rpx;
		letter-spacing: 2rpx;
		color: #c6c6c8;
	}

	/* 底部操作功能 */
	.allEntry {
		position: fixed;
		right: 0;
		bottom: 0;

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

		right: 170rpx;
		bottom: 150rpx;
	}

	.allEntry .OpenOperation .entryadmin {
		right: 232rpx;
		bottom: 0;
	}
	.xihuan {
		width: 23rpx !important;
		height: 21rpx !important;
		margin-right: 7rpx !important;
	}
</style>
