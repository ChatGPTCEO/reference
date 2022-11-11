<template>
	<view>
		<form @submit="formSubmit" report-submit='true'>
			<view class='evaluate-con' v-if="productInfo.product">
				<view class='goodsStyle acea-row row-between'>
					<view class='pictrue'>
						<image :src='productInfo.product.image'></image>
					</view>
					<view class='text acea-row row-between'>
						<view class='name line2'>{{productInfo.product.store_name}}</view>
						<view class='money'>
							<view>￥{{productInfo.productAttr.price}}</view>
							<view class='num'>x{{cart_num}}</view>
						</view>
					</view>
				</view>
				<view class='score'>
					<view class='item acea-row row-middle' v-for="(item,indexw) in scoreList" :key="indexw">
						<view>{{item.name}}</view>
						<view class='starsList'>
							<u-icon v-for="(itemn, indexn) in item.stars" :key="indexn" :name="item.index >= indexn? 'star-fill':'star'"
							 size="40" :color="item.index >= indexn ? '#ffdd00' : '#999'" @click="stars(indexn, indexw)">
							</u-icon>
						</view>
						<text class='evaluate'>{{item.index === -1 ? "" : item.index + 1 + "分"}}</text>
					</view>
					<view class='textarea'>
						<textarea placeholder='商品满足你的期待么？说说你的想法，分享给想买的他们吧~' name="comment" placeholder-class='placeholder'></textarea>
						<view class='list acea-row row-middle'>
							<view class='pictrue' v-for="(item,index) in pics" :key="index">
								<image :src='item'></image>
								<view class="iconfont icon-guanbi1 font-color">
									<u-icon name="close-circle-fill" size="40" color="#ffdd00" @click="DelPic(index)"></u-icon>
								</view>
							</view>
							<view class='pictrue acea-row row-center-wrapper row-column' @click='uploadpic' v-if="pics.length < 6">
								<!-- <text class='iconfont icon-icon25201'></text> -->
								<u-icon name="plus" size="50" color="#999"></u-icon>
								<view>上传图片</view>
							</view>
						</view>
					</view>
					<button class='evaluateBnt bg-color' formType="submit">立即评价</button>
				</view>
			</view>
		</form>
	</view>
</template>

<script>
	export default {
		components: {},
		data() {
			return {
				pics: [],
				scoreList: [{
						name: "商品质量",
						stars: ["", "", "", "", ""],
						index: -1
					},
					{
						name: "服务态度",
						stars: ["", "", "", "", ""],
						index: -1
					},
					{
						name: "物流服务",
						stars: ["", "", "", "", ""],
						index: -1
					}
				],
				orderId: '',
				unique: '',
				productInfo: {},
				cart_num: 0,
				isAuto: false, //没有授权的不会自动授权
				isShowAuth: false //是否隐藏授权
			};
		},
		computed: {
			hasLogin() {
				return this.$store.state.hasLogin
			}
		},
		onLoad(options) {
			if (!options.uni && options.order_id) return this.$util.Tips({
				title: '缺少参数'
			}, {
				tab: 3,
				url: 1
			});
			this.unique = options.uni;
			this.orderId = options.order_id;
			if (this.hasLogin) {
				this.getOrderProduct();
			} else {
				// #ifdef H5 || APP-PLUS
				toLogin();
				// #endif 
				// #ifdef MP
				this.isAuto = true;
				this.$set(this, 'isShowAuth', true)
				// #endif
			}
		},
		methods: {
			onLoadFun() {
				this.isShowAuth = false;
				this.getOrderProduct();
			},
			// 授权关闭
			authColse: function(e) {
				this.isShowAuth = e
			},
			/**
			 * 获取某个产品详情
			 * 
			 */
			getOrderProduct() {
				this.$u.get(`/api/reply/product/${this.unique}`)
					.then(res => {
						this.$set(this, 'productInfo', res.data.cart_info);
						this.cart_num = res.data.product_num;
					})
			},
			stars: function(indexn, indexw) {
				this.scoreList[indexw].index = indexn;
			},
			/**
			 * 删除图片
			 * 
			 */
			DelPic: function(index) {
				let that = this,
					pic = this.pics[index];
				that.pics.splice(index, 1);
				that.$set(that, 'pics', that.pics);
			},

			/**
			 * 上传文件
			 * 
			 */
			uploadpic: function() {
				let that = this;
				that.$util.uploadImageOne('upload/image', function(res) {
					console.log(res);
					that.pics.push(res.data.path);
					that.$set(that, 'pics', that.pics);
				});
			},

			/**
			 * 立即评价
			 */
			formSubmit: function(e) {
				let formId = e.detail.formId,
					value = e.detail.value,
					that = this,
					product_score = that.scoreList[0].index + 1 === 0 ? "" : that.scoreList[0].index + 1,
					service_score = that.scoreList[1].index + 1 === 0 ? "" : that.scoreList[1].index + 1,
					logistics_score = that.scoreList[2].index + 1 === 0 ? "" : that.scoreList[2].index + 1;
				if (!value.comment) return uni.showToast({
					title: '请填写你对宝贝的心得！',
					icon: 'none'
				});
				value.product_score = product_score;
				value.service_score = service_score;
				value.postage_score = logistics_score;
				value.pics = that.pics;
				uni.showLoading({
					title: "正在发布评论……"
				});
				this.$u.post(`/api/reply/${this.unique}`, value)
					.then(res => {
						uni.hideLoading();
						uni.showToast({
							title: '感谢您的评价!'
						})
						setTimeout(() => {
							uni.switchTab({
								url: '../user/user'
							})
						})
					})
			}
		}
	}
</script>

<style lang="scss">
	.evaluate-con .score {
		background-color: #fff;
		border-top: 1rpx solid #f5f5f5;
		font-size: 28rpx;
		color: #282828;
		padding: 48rpx 30rpx 65rpx 30rpx;
	}

	.evaluate-con .score .item~.item {
		margin-top: 30rpx;
	}

	.evaluate-con .score .item .starsList {
		padding: 0 35rpx 0 40rpx;
	}

	.evaluate-con .score .item .starsList .iconfont {
		font-size: 40rpx;
		color: #aaa;
	}

	.evaluate-con .score .item .starsList .iconfont~.iconfont {
		margin-left: 20rpx;
	}

	.evaluate-con .score .item .evaluate {
		color: #aaa;
		font-size: 24rpx;
	}

	.evaluate-con .score .textarea {
		width: 690rpx;
		background-color: #fafafa;
		border-radius: 10rpx;
		margin-top: 48rpx;
	}

	.evaluate-con .score .textarea textarea {
		font-size: 28rpx;
		padding: 38rpx 30rpx 0 30rpx;
		width: 100%;
		box-sizing: border-box;
		height: 160rpx;
	}

	.evaluate-con .score .textarea .placeholder {
		color: #bbb;
	}

	.evaluate-con .score .textarea .list {
		margin-top: 25rpx;
		padding-left: 5rpx;
	}

	.evaluate-con .score .textarea .list .pictrue {
		width: 140rpx;
		height: 140rpx;
		margin: 0 0 35rpx 25rpx;
		position: relative;
		font-size: 22rpx;
		color: #bbb;
	}

	.evaluate-con .score .textarea .list .pictrue:nth-last-child(1) {
		border: 1rpx solid #ddd;
		box-sizing: border-box;
	}

	.evaluate-con .score .textarea .list .pictrue image {
		width: 100%;
		height: 100%;
		border-radius: 3rpx;
	}

	.evaluate-con .score .textarea .list .pictrue .icon-guanbi1 {
		font-size: 45rpx;
		position: absolute;
		top: -20rpx;
		right: -20rpx;
	}

	.evaluate-con .score .textarea .list .pictrue .icon-icon25201 {
		color: #bfbfbf;
		font-size: 50rpx;
	}

	.evaluate-con .score .evaluateBnt {
		font-size: 30rpx;
		color: #333;
		width: 690rpx;
		height: 86rpx;
		border-radius: 43rpx;
		text-align: center;
		line-height: 86rpx;
		margin-top: 45rpx;
	}


	.goodsStyle {
		margin-top: 1rpx;
		background-color: #fff;
		padding: 22rpx 30rpx
	}

	.goodsStyle .pictrue {
		width: 120rpx;
		height: 120rpx
	}

	.goodsStyle .pictrue image {
		width: 100%;
		height: 100%;
		border-radius: 6rpx
	}

	.goodsStyle .text {
		width: 545rpx;
		font-size: 28rpx;
		color: #999
	}

	.goodsStyle .text .name {
		width: 360rpx;
		color: #282828
	}

	.goodsStyle .text .money {
		text-align: right
	}

	.goodsStyle .text .money .num {
		margin-top: 7rpx
	}

	.goodWrapper .item {
		margin-left: 30rpx;
		padding-right: 30rpx;
		border-bottom: 2rpx solid #f0f0f0;
		height: 180rpx
	}

	.goodWrapper .item .pictrue {
		width: 130rpx;
		height: 130rpx
	}

	.goodWrapper .item .pictrue image {
		width: 100%;
		height: 100%;
		border-radius: 6rpx
	}

	.goodWrapper .item .text {
		width: 537rpx;
		position: relative
	}

	.goodWrapper .item .text .name {
		font-size: 28rpx;
		color: #282828;
		width: 453rpx
	}

	.goodWrapper .item .text .num {
		font-size: 26rpx;
		color: #868686
	}

	.goodWrapper .item .text .attr {
		font-size: 20rpx;
		color: #868686;
		margin-top: 7rpx
	}

	.goodWrapper .item .text .money {
		font-size: 26rpx;
		margin-top: 17rpx
	}

	.goodWrapper .item .text .evaluate {
		position: absolute;
		width: 114rpx;
		height: 46rpx;
		border: 1rpx solid #bbb;
		border-radius: 4rpx;
		text-align: center;
		line-height: 46rpx;
		right: 0;
		bottom: -5rpx
	}

	.goodWrapper .item .text .evaluate.userEvaluated {
		font-size: 26rpx;
		color: #aaa;
		background-color: #f7f7f7;
		border-color: #f7f7f7
	}


	.acea-row {
		display: flex;
		flex-wrap: wrap
	}

	.acea-row.row-middle {
		align-items: center
	}

	.acea-row.row-top {
		align-items: flex-start
	}

	.acea-row.row-bottom {
		align-items: flex-end
	}

	.acea-row.row-center {
		justify-content: center
	}

	.acea-row.row-right {
		justify-content: flex-end
	}

	.acea-row.row-left {
		justify-content: flex-start
	}

	.acea-row.row-between {
		justify-content: space-between
	}

	.acea-row.row-around {
		justify-content: space-around;
	}

	.acea-row.row-column-around {
		flex-direction: column;
		justify-content: space-around;
	}

	.acea-row.row-column {
		flex-direction: column
	}

	.acea-row.row-column-between {
		flex-direction: column;
		justify-content: space-between
	}

	.bg-color {
		background-color: $uni-color-warning;
	}

	.row-center-wrapper {
		justify-content: center;
		align-items: center;
	}
</style>
