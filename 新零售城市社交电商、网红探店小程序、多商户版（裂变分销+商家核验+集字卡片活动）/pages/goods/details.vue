<template>
	<view>
		<!-- swiper -->
		<view class="swiper">
			<u-swiper :list="swiperBanner" height="500" img-mode="scaleToFill"></u-swiper>
		</view>
		<!-- seckill -->
		<view class="seckill-amout" v-if="type == 1">
			<view class="sk-price">
				<text class="i-red">
					<text class="small">¥</text>
					{{ info.price }}
				</text>
				<text class="i-del">¥{{ info.ot_price }}</text>
			</view>
			<view class="sk-right">
				<text class="text">距离结束</text>
				<u-count-down :timestamp="date"></u-count-down>
			</view>
		</view>
		<!-- info -->
		<view class="info-box">
			<text class="info-title">{{ info.store_name }}</text>
			<text class="info-label">{{ info.store_info }}</text>
			<view class="info-tag" v-if="type != 1">
				<view class="i-tag-box" v-if="info.vip_price">
					<text class="ts-1">会员</text>
					<text class="ts-2">优惠{{ Number(info.price - info.vip_price).toFixed(2) }}元</text>
				</view>
			</view>
			<view class="info-price" v-if="type != 1">
				<view class="i-price-left">
					<text class="i-red">¥{{ info.price }}</text>
					<text class="i-del">¥{{ info.ot_price }}</text>
				</view>
				<view class="i-rins">
					<text class="text">已售 {{ info.sales }} · 仅剩 {{ info.stock }}</text>
				</view>
			</view>
			<view class="get-coupon" @click="showGetCoupon = true">
				<text class="g-title">优惠券</text>
				<view class="max-ing">
					<view class="g-activity" v-for="(item, index) in couponList.slice(0, 2)" :key="index">
						<text>满{{ item.use_min_price }}减{{ item.coupon_price }}</text>
					</view>
				</view>
				<view class="g-icon">
					<u-icon name="arrow-right" size="28" color="#666"></u-icon>
				</view>
			</view>
			<view class="info-cell">
				<view class="u-margin-right-20">
					<u-icon name="error-circle" label="凭兑换码到店使用" label-size="20" margin-left="10"></u-icon>
				</view>
				<view class="u-margin-right-20">
					<u-icon name="error-circle" label="平台认证" label-size="20" margin-left="10"></u-icon>
				</view>
				<!-- <view class="u-margin-right-20">
          <u-icon name="error-circle" label="10月1日-10月8日不可用" label-size="20" margin-left="10"></u-icon>
        </view> -->
			</view>
		</view>
		<!-- vip card -->
		<template v-if="!hasLogin || (userInfo.group_id < 1 && Boolean(info.price - info.vip_price))">
			<view class="join-vip">
				<u-icon name="/static/icon/index_icon_rank_0.png" size="28" label="vip会员" label-size="20" label-color="#fadbad"></u-icon>
				<text class="text" v-if="info.vip_price">加入会员，下单立减{{ Number(info.price - info.vip_price).toFixed(2) }}元</text>
				<view class="ml-auto" @click="
						toRoute({
							url: 'pages/member/member',
							type: 'tab'
						})
					">
					<text class="text">立即加入</text>
					<u-icon name="arrow-right" color="#fadbad"></u-icon>
				</view>
			</view>
		</template>
		<template v-else>
			<view class="join-vip">
				<u-icon name="/static/icon/index_icon_rank_0.png" size="28" label="vip会员" label-size="20" label-color="#fadbad"></u-icon>
				<text class="text">您已经是VIP会员，本单立减{{ Number(info.price - info.vip_price).toFixed(2) }}元</text>
			</view>
		</template>
		<!-- 邀请好友 -->
		<view class="invite-friends" v-if="false">
			<view class="inv-top">
				<view class="inv-cards">
					<text class="inv-text">他们都在逛</text>
					<view class="inv-avatar">
						<u-avatar src="" size="50" style="margin-left: -10rpx"></u-avatar>
						<u-avatar src="" size="50" style="margin-left: -10rpx"></u-avatar>
						<u-avatar src="" size="50" style="margin-left: -10rpx"></u-avatar>
						<u-avatar src="" size="50" style="margin-left: -10rpx"></u-avatar>
						<u-avatar src="" size="50" style="margin-left: -10rpx"></u-avatar>
					</view>
				</view>
				<view class="iv-btn">
					<button type="default" class="btn-item-share" open-type="share">
						<u-icon name="share-fill" label="邀请好友一起抢" label-color="#333" color="#333"></u-icon>
					</button>
				</view>
			</view>
			<view class="inv-bottom">
				<u-cell-group :border="false">
					<u-cell-item icon="/static/icon/grid-5.png" icon-size="80" title="高精尖人士聚集地" label="添加客服微信,邀您进入会员福利群" center :arrow="false"
					 :border-bottom="false" padding="20rpx 0 10rpx" hover-class="none">
						<u-button shape="circle" type="success" size="mini">立即添加</u-button>
					</u-cell-item>
				</u-cell-group>
			</view>
		</view>
		<u-gap height="10" bg-color="#f8f8f8"></u-gap>
		<!-- 店铺 -->
		<view class="shop-card">
			<view class="shopcard-info">
				<u-cell-group :border="false">
					<u-cell-item :icon="info.merchant.mer_avatar" icon-size="80" :title="info.merchant.mer_name" value="进店逛逛" center
					 padding="20rpx 0" @click="
							toRoute({
								url: 'pages/goods/store',
								params: {
									id: info.mer_id
								}
							})
						">
						<view slot="label">
							<text>服务: {{ info.merchant.service_score }} 商品: {{ info.merchant.product_score }} 物流: {{ info.merchant.postage_score }}</text>
						</view>
					</u-cell-item>
				</u-cell-group>
			</view>
			<view class="shopcard-area">
				<view class="vtops">
					<!-- <text class="shopname u-line-1">{{ info.merchant.mer_name }}</text> -->
					<!-- <view class="">
            
          </view> -->
					<view class="vbots">
						<text class="text">·营业时间: {{ info.merchant.service_date || '-' }}</text>
						<text class="text">·商家电话: {{ info.merchant.service_phone || '-' }}</text>
						<text class="text">· {{ info.merchant.mer_address || '-' }}</text>
					</view>
					<view class="vicons ml-auto">
						<view class="vt-ico" @click="callPhone(info.merchant.service_phone || '')">
							<!-- <u-icon name="phone-fill" size="28"></u-icon> -->
							拨打
						</view>
						<view class="vt-ico" @click="openLocation">
							<!-- <u-icon name="map-fill" size="28"></u-icon> -->
							导航
						</view>
					</view>
				</view>
			</view>
		</view>
		<u-gap height="10" bg-color="#f8f8f8"></u-gap>
		<!-- 须知 -->
		<view class="info-content">
			<view class="ic-title"><text class="text">购买须知</text></view>
			<view class="ic-content" v-if="info.content">
				<u-parse :html="info.content.buy_know" show-with-animation lazy-load></u-parse>
			</view>
		</view>
		<u-gap height="10" bg-color="#f8f8f8"></u-gap>
		<!-- 详情 -->
		<view class="info-content">
			<view class="ic-title"><text class="text">商品详情</text></view>
			<view class="ic-content">
				<u-parse :html="info.content.content" show-with-animation lazy-load></u-parse>
			</view>
		</view>
		<u-gap height="10" bg-color="#f8f8f8"></u-gap>
		<!-- 评价 -->
		<view class="info-content">
			<view class="ic-title"><text class="text">商品评价</text></view>
			<view class="ic-comment">
				<view class="ic-list">
					<template v-if="commentList.length">
						<view v-for="(item, index) in commentList" :key="index">
							<comment-item :src="item.avatar" :name="item.nickname" :rate="item.rate" :content="item.comment" :like-num="item.likeNum"
							 :is-like="item.isLike" @like="getLike(index)"></comment-item>
						</view>
					</template>
					<template v-else>
						<view class="u-padding-30">
							<u-empty text="暂时没有评价" mode="message"></u-empty>
						</view>
					</template>
				</view>
				<view class="ic-momre">
					<u-button type="default" ripple shape="circle" size="mini" :custom-style="{ backgroundColor: '#fff' }" @click="
							toRoute({
								url: 'pages/goods/comment',
								params: {
									id: id
								}
							})
						">
						全部评价
					</u-button>
				</view>
			</view>
		</view>
		<u-gap height="10" bg-color="#f8f8f8"></u-gap>
		<!-- 说明 -->
		<view class="info-content">
			<view class="ic-title"><text class="text">价格说明</text></view>
			<view class="ic-content">
				<text class="text">
					<text class="t-an">划线价格：</text>
					商品的原价、吊牌价、正品零售价、厂商指导价或该商品的曾经展示过的销售价等，并非原价，仅供参考。
				</text>
				<text class="text">
					<text class="t-an">未划线价格：</text>
					商品的实时标价，不因表述的差异改变性质。具体成交价格根据商品参加活动，或会员使用优惠券、积分等发生变化，最终以订单结算页价格为准。
				</text>
				<text class="t-an">此说明仅当出现价格比较时有效，若商家单独对划线价格进行说明的，以商家的表述为准。</text>
			</view>
		</view>
		<u-gap height="10" bg-color="#f8f8f8"></u-gap>
		<!-- 猜你喜欢 -->
		<view class="info-content">
			<view class="ic-title"><text class="text">猜你喜欢</text></view>
			<view class="goods-inbox">
				<view class="goods-initem" v-for="(item, index) in goodLikeList" :key="index" @click="
						toRoute({
							url: 'pages/goods/details',
							params: {
								id: item.product_id
							}
						})
					">
					<goods-item :src="item.image" :title="item.store_name" :price="item.price" o-price=" " :show-btn="false"></goods-item>
				</view>
			</view>
		</view>
		<u-gap height="10" bg-color="#f8f8f8"></u-gap>
		<!-- submit -->
		<view class="navigation-bar">
			<view class="navigation">
				<view class="left">
					<button class="item btn-item-share" @click="onIndex">
						<u-icon name="home" :size="40" color="'#333'"></u-icon>
						<view class="text u-line-1">主页</view>
					</button>

					<button class="item btn-item-share" @click="onStar">
						<u-icon :name="!info.isRelation ? 'star' : 'star-fill'" :size="40" :color="!info.isRelation ? '#333' : '#ffdd00'"></u-icon>
						<view class="text u-line-1">收藏</view>
					</button>
					<button class="item btn-item-share" @click="fenxiang">
						<u-icon name="share" size="40" color="#333"></u-icon>
						<view class="text u-line-1">分享</view>
					</button>
				</view>
				<view class="right">
					<u-button type="warning" shape="circle" size="medium" :custom-style="{
							color: '#333 !important',
							width: '100%'
						}"
					 ripple style="width: 100%;" :disabled="type == 1 && date <= 0" @click="showAgreement = true">
						{{ type == 1 ? (date <= 0 ? '秒杀已结束' : '立即秒杀') : '立即购买' }}
					</u-button>
				</view>
			</view>
		</view>
		<!-- 规格 -->

		<echone-sku :show="showAgreement" theme-color="#fbc909" :combinations="combinations" :specifications="specifications"
		 :img="swiperBanner[0] || ' '" @close="showAgreement = false" @confirm="toCreate"></echone-sku>
		<!-- <u-popup v-model="showAgreement" mode="bottom" length="60%" border-radius="20" safe-area-inset-bottom>
      <ProductSpecifications 
        :guige-list="[{}]" :selggdic="{}" :buynum="1">
      </ProductSpecifications>
    </u-popup> -->

		<!-- 领取优惠券 -->
		<u-popup v-model="showGetCoupon" mode="bottom" length="54%" border-radius="20" safe-area-inset-bottom closeable>
			<view class="" style="height: 100%;">
				<view class="coupon-title"><text>领取优惠券</text></view>
				<scroll-view scroll-y="true" style="height:calc(100% - 196rpx)">
					<template v-if="couponList.length">
						<view class="cliitems" v-for="(item, index) in couponList" :key="index">
							<coupon-item :amount="item.coupon_price" :label="`满${item.use_min_price}可用`" :rule-text="`领取后${item.coupon_time}天内可用`"
							 :title="item.coupon_title" :type-text="typeText[item.type]" :btn-text="item.issue ? '已领取' : '立即领取'" :btn-style="{ background: '#999' }"
							 @click="onGetCoupon(item)"></coupon-item>
						</view>
					</template>
					<template v-else>
						<view class="u-padding-top-30">
							<u-empty text="暂无可用优惠券" mode="coupon"></u-empty>
						</view>
					</template>
				</scroll-view>
				<view class="coupon-oper">
					<u-button type="warning" shape="circle" size="medium" :custom-style="{
							color: '#333',
							width: '100%'
						}"
					 ripple style="width: 100%" @click="showGetCoupon = false">
						确定
					</u-button>
				</view>
			</view>
		</u-popup>
		<!-- 购买须知 -->
		<u-popup mode="bottom" length="60%" border-radius="20" safe-area-inset-bottom>
			<view class="agreement-box">
				<view class="agree-title"><text>购买须知</text></view>
				<scroll-view scroll-y="true" style="height: calc(100% - 150rpx);">
					<view>
						<view class="info-box">
							<view class="info-cell">
								<view class="u-margin-right-20">
									<u-icon name="error-circle" label="凭兑换码到店使用" label-size="20" margin-left="10"></u-icon>
								</view>
								<view class="u-margin-right-20">
									<u-icon name="error-circle" label="平台认证" label-size="20" margin-left="10"></u-icon>
								</view>
								<!-- <view class="u-margin-right-20">
                  <u-icon name="error-circle" label="10月1日-10月8日不可用" label-size="20" margin-left="10"></u-icon>
                </view> -->
							</view>
						</view>
						<!-- image -->
						<view class=""></view>
						<!-- info -->
						<view class="">内容须知</view>
					</view>
				</scroll-view>
				<!-- button -->
				<view class="oper-button">
					<u-button type="warning" shape="circle" size="medium" :custom-style="{
							color: '#333',
							width: '100%'
						}"
					 ripple style="width: 100%;" @click="
							toRoute({
								url: 'pages/order/create',
								params: {
									id: id
								}
							})
						">
						同意并且购买
					</u-button>
				</view>
			</view>
		</u-popup>
		<!-- 分享 -->
		<u-popup v-model="atShowShare" mode="bottom" border-radius="30">
			<view class="share-box">
				<u-grid :col="2" :border="false">
					<u-grid-item :border-bottom="false">
						<button class="no-btn" open-type="share">
							<u-icon name="weixin-circle-fill" :size="70" color="#999"></u-icon>
							<view class="grid-text u-margin-top-20">分享好友</view>
						</button>
					</u-grid-item>
					<u-grid-item :border-bottom="false" @click="qrcode()">
						<u-icon name="download" :size="70" color="#999"></u-icon>
						<view class="grid-text u-margin-top-20">{{ imgtxt }}</view>
					</u-grid-item>
				</u-grid>
				<view class="share-cancel" @click="atShowShare = false"><text>取消</text></view>
			</view>
		</u-popup>
		<!-- 海报 -->
		<!-- 		<view class="share-fixed" v-if="atShowShare && propic">
			<image :src="propic" mode="aspectFit" class="share-image"></image>
		</view> -->
		<qrcode-poster ref="poster" :title='info.store_name' :subTitle="info.store_info" :headerImg="info.image" :price="info.price"
		 :vipprice="info.vip_price" :userImg="userInfo.avatar" :userNmae="userInfo.nickname">
		</qrcode-poster>
	</view>
</template>

<script>
	import QrcodePoster from "@/components/qrcode-poster/qrcode-poster.vue"
	export default {
		components: {
			QrcodePoster
		},
		data() {
			return {
				type: 0, // 0普通商品，1秒杀
				id: 0,
				info: {
					merchant: {},
					content: {}
				},
				goodLikeList: [],
				swiperBanner: [],
				commentList: [],
				showAgreement: false,
				combinations: [],
				specifications: [],
				showGetCoupon: false,
				couponList: [],
				typeText: ['店铺券', '商品券', '品类券'],
				timestamp: 0,
				atShowShare: false,
				uid: '',
				propic: '',
				imgtxt: '生成海报',
				is_show_model: false

			};
		},
		computed: {
			hasLogin() {
				return this.$store.state.hasLogin;
			},
			userInfo() {
				return this.$store.state.userInfo
			},
			date() {
				return this.timestamp - Date.parse(new Date()) / 1000;
			}
		},
		onLoad(options) {
			
			//console.log('options', options)
			//console.log('userInfo', this.userInfo)
			this.type = options.type || 0;
			if (!options.scene) {
				this.id = options.id;
				this.spread_id = options.spread_id;
			} else {
				var scene = decodeURIComponent(options.scene);
				var obj = this.parseQuery(scene)
				this.id = obj.id;
				this.spread_id = obj.spread_id;

			}

			if (this.spread_id) {
				uni.setStorage({
					key: 'spread_id',
					data: this.spread_id
				});
			}
			if (this.type == 1) {
				this.timestamp = options.date;
			}
			this.getInfo();
			this.getComment();
		},
		onShareAppMessage(res) {
			this.atShowShare = false;
			//console.log('detailsurl', 'pages/goods/details?id=' + this.id + '&spread_id=' + (this.userInfo.uid || '') + '&type=' + this.type)
			return {
				title: "【柘吃这喝】" + this.info.store_name,
				path: 'pages/goods/details?id=' + this.id + '&spread_id=' + (this.userInfo.uid || '') + '&type=' + this.type
			};
		},
		onShareTimeline(res) {
			if (res.from === 'button') { // 来自页面内分享按钮
				console.log(res.target)
			}
			return {
				title: "【柘吃这喝】" + this.info.store_name,
				path: 'pages/goods/details?id=' + this.id + '&spread_id=' + (this.userInfo.uid || '') + '&type=' + this.type
			}
		},
		methods: {
			parseQuery(query) {
				var reg = /([^=&\s]+)[=\s]*([^&\s]*)/g;
				var obj = {};
				while (reg.exec(query)) {
					obj[RegExp.$1] = RegExp.$2;
				}
				return obj;
			},
			getCouponList(id) {
				this.$u.get(`/api/coupon/store/${id}`).then(({
					data
				}) => {
					this.couponList = this.couponList.concat(data);
				});
				this.$u
					.get('/api/coupon/product', {
						ids: this.id
					})
					.then(({
						data
					}) => {
						this.couponList = this.couponList.concat(data);
					});
			},
			onGetCoupon(item) {
				if (item.issue) {
					uni.showToast({
						title: '优惠券已领取',
						icon: 'none'
					});
				} else {
					this.$u.post(`/api/coupon/receive/${item.coupon_id}`).then(res => {
						uni.showToast({
							title: res.message
						});
						item.issue = true;
					});
				}
			},
			toCreate(e) {
				if (this.hasLogin) {
					this.$u.route({
						url: 'pages/order/create',
						params: {
							id: this.id,
							unique: e.unique,
							nums: e.count,
							sku: e.sku
						}
					});
				} else {
					this.$u.route({
						url: 'pages/login/login'
					});
				}
			},
			onStar() {
				if (!this.info.isRelation) {
					this.$u
						.post('/api/user/relation/create', {
							type: 1,
							type_id: this.id
						})
						.then((res) => {
							this.getInfo();
						});
				} else {
					this.$u
						.post('/api/user/relation/delete', {
							type: 1,
							type_id: this.id
						})
						.then(() => {
							this.getInfo();
						});
				}
			},

			onIndex() {
				this.$u.route({
					url: 'pages/index/index',
					type: 'tab'
				});
			},

			openLocation() {
				let longitudelatitude = this.info.merchant.longitudelatitude;
				if (longitudelatitude) {
					longitudelatitude = longitudelatitude.split(',');
					uni.openLocation({
						latitude: Number(longitudelatitude[0]) || 0,
						longitude: Number(longitudelatitude[1]) || 0,
						name: this.info.merchant.mer_address
					});
				} else {
					uni.showToast({
						title: '商家未设地址',
						icon: 'none'
					});
					// uni.openLocation({
					//   name: this.info.mer_address
					// })
				}
			},
			callPhone(phone) {
				if (phone) {
					uni.makePhoneCall({
						phoneNumber: phone
					});
				} else {
					uni.showToast({
						title: '商家未设置号码',
						icon: 'none'
					});
				}
			},
			getComment() {
				this.$u.get(`/api/store/product/reply/lst/${this.id}`).then(({
					data
				}) => {
					this.commentList = data.list;
				});
			},
			getInfo() {
				let url = `/api/store/product/detail/${this.id}`;
				if (this.type == 1) {
					url = `/api/store/product/seckill/detail/${this.id}`;
				}
				this.$u
					.get(url)
					.then(({
						data
					}) => {
						this.info = data;
						this.swiperBanner = data.slider_image;
						this.goodLikeList = data.merchant.recommend;
						for (let i = 0; i < data.sku.length; i++) {
							this.combinations.push(data.sku[i].sku);
						}
						this.specifications = data.attr;
						if (this.combinations.length == 1 && !data.attr.length) {
							this.specifications = [{
								id: data.product_id,
								attr_name: '',
								attr_values: ['']
							}];
						}
						this.getCouponList(this.info.mer_id);
					})
					.catch(() => {
						uni.navigateBack();
					});
			},
			onSharePage() {
				// #ifndef MP
				uni.share({});
				// #endif
			},
			toRoute(params) {
				this.$u.route(params);
			},
			qrcode() {

				// uni.showLoading({
				// 	title: '生成中...'
				// });
				this.$u
					.get(`/api/store/product/qrcode/${this.id}`, {
						type: 'routine'
					})
					.then(({
						data
					}) => {
						//this.propic = data.url;
						//console.log('二维码',data.url)
						//获取带参数二维码
						this.is_show_model = false
						this.$refs.poster.showCanvas(data.url)
						this.propic = data.url;
						this.atShowShare = false;
					});


			},

			fenxiang() {

				if (!this.hasLogin) {
					this.$u.route({
						url: 'pages/login/login'
					});
					return false;
				}
				this.atShowShare = true;


			}
		}
	};
</script>

<style lang="scss">
	.info-box {
		position: relative;
		padding: $gutter;
		display: flex;
		flex-direction: column;

		.info-title {
			font-size: $uni-font-size-xl;
			color: #333;
			padding-bottom: 10rpx;
		}

		.info-label {
			font-size: $uni-font-size-sm;
			color: #999;
		}

		.info-tag {
			display: flex;
			align-items: center;
			margin-top: $gutter;

			.i-tag-box {
				border-radius: 200rpx;
				background-color: #333;
				color: $color;
				font-size: 20rpx;
				height: 36rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				margin-right: 10rpx;
				padding: 0 10rpx;
			}
		}

		.info-price {
			display: flex;
			align-items: center;

			.i-price-left {
				.i-red {
					color: $uni-color-error;
					font-size: $uni-font-size-xl;
				}

				.i-del {
					margin-left: 10rpx;
					font-size: 20rpx;
					color: #999;
					text-decoration: line-through;
				}
			}

			.i-rins {
				margin-left: auto;
				font-size: 20rpx;
				color: #999;
			}
		}

		.info-cell {
			display: flex;
			align-items: center;
			margin-top: 50rpx;
		}
	}

	.join-vip {
		background-color: #333;
		border-radius: $uni-border-radius-base;
		margin: $gutter;
		padding: 10rpx $gutter;
		color: $color;
		display: flex;
		align-items: center;
		font-size: $uni-font-size-sm;

		.text {
			margin-left: 10rpx;
		}
	}

	.invite-friends {
		margin: $gutter;
		padding: $gutter;
		border-radius: $uni-border-radius-base;
		box-shadow: 0 0 10rpx rgba($color: #000000, $alpha: 0.2);

		.inv-top {
			display: flex;
			align-items: center;
			border-bottom: 1rpx solid #eee;
			padding-bottom: 10rpx;
		}

		.inv-cards {
			display: flex;
			flex-direction: column;
			font-size: $uni-font-size-base;
			color: #333;
		}

		.inv-avatar {
			padding-left: 10rpx;
			margin-top: 10rpx;
		}

		.iv-btn {
			background: linear-gradient(to bottom, #ffdd00, #f29100);
			border-radius: 200rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			width: 300rpx;
			height: 80rpx;
			margin-left: auto;
		}
	}

	.shop-card {
		padding: $gutter;

		.shopcard-area {
			display: flex;
			flex-direction: column;
			padding: $gutter 0 0;

			.vtops {
				display: flex;
				padding-bottom: 10rpx;
			}

			.vbots {
				font-size: $uni-font-size-base;
				color: #999;
				display: flex;
				flex-direction: column;
				max-width: 600rpx;

				.text {
					margin-bottom: 10rpx;
				}
			}

			.shopname {
				font-size: $uni-font-size-lg;
				color: #333;
				flex: 1;
			}

			.vicons {
				display: flex;
				align-items: center;
				flex-direction: column;
				padding-top: 36rpx;
			}

			.vt-ico {
				// border-radius: 50%;
				// border: 1rpx solid #333;
				width: auto;
				height: 50rpx;
				background-color: #ffdd00;
				color: #333;
				display: flex;
				align-items: center;
				justify-content: center;
				padding: 0 10rpx;
				margin-left: $gutter;
				margin-bottom: 10rpx;
				border-radius: 10rpx;
				font-size: $uni-font-size-sm;
			}
		}
	}

	.info-content {
		padding: $gutter;

		.ic-title {
			font-size: $uni-font-size-xl;
			color: #333;
			padding: $gutter;
			display: flex;
			align-items: center;
			justify-content: center;
			position: relative;

			.text {
				&::after {
					content: '';
					position: absolute;
					left: 50%;
					bottom: 16rpx;
					background-color: $uni-color-warning;
					height: 16rpx;
					width: 180rpx;
					margin-left: -90rpx;
					z-index: -1;
				}
			}
		}

		.ic-content {
			padding: $gutter 0;
			display: flex;
			flex-direction: column;

			.text {
				padding: $gutter 0;
				font-size: $uni-font-size-base;
				color: #333;
			}

			.t-an {
				color: rgba($color: #bcb51d, $alpha: 0.6);
			}
		}
	}

	.goods-inbox {
		position: relative;
		display: flex;
		flex-wrap: wrap;
		margin: $gutter (-$gutter) 0;

		.goods-initem {
			width: 345rpx;
			margin-left: $gutter;
			margin-bottom: $gutter;
		}
	}

	.ic-comment {
		.ic-momre {
			display: flex;
			justify-content: center;
			align-items: center;
			padding: $gutter 0;
		}
	}

	.navigation-bar {
		height: 110rpx;

		.navigation {
			display: flex;
			border-top: solid 2rpx #f2f2f2;
			background-color: #ffffff;
			padding: 16rpx $gutter;
			height: 110rpx;
			position: fixed;
			bottom: 0;
			left: 0;
			width: 100%;
			z-index: 99;

			.left {
				display: flex;
				font-size: 20rpx;

				.item {
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					margin: 0 30rpx;
					font-size: 24rpx;

					.text {
						line-height: 1;
						margin-top: 4rpx;
					}

					&.car {
						text-align: center;
						position: relative;

						.car-num {
							position: absolute;
							top: -10rpx;
							right: -10rpx;
						}
					}
				}
			}

			.right {
				flex: 1;
				display: flex;
				font-size: 28rpx;
				align-items: center;
				margin-left: auto;
			}
		}
	}

	.btn-item-share {
		border: none;
		padding: 0;
		background: none !important;
		height: auto;

		&::after {
			display: none;
		}
	}

	.agreement-box {
		padding: $gutter $gutter 0;
		position: relative;
		height: 100%;

		.agree-title {
			font-size: 32rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			height: 50rpx;
		}

		.info-cell {
			margin-top: $gutter;
		}

		.info-box {
			padding-left: 0;
			padding-right: 0;
		}

		.oper-button {
			display: flex;
			align-items: center;
			height: 100rpx;
			border-top: 1rpx solid #f8f8f8;
		}
	}

	.seckill-amout {
		display: flex;
		align-items: center;
		padding: $gutter $gutter;
		background-color: $uni-color-warning;
		color: #333;

		.sk-price {
			flex: 1;
			display: flex;
			align-items: flex-end;

			.small {
				font-size: 32rpx;
			}

			.i-red {
				font-size: 48rpx;
				color: red;
			}

			.i-del {
				margin-left: 10rpx;
				margin-bottom: 10rpx;
				font-size: 24rpx;
				color: rgba($color: #000000, $alpha: 0.5);
				text-decoration: line-through;
			}
		}

		.sk-right {
			display: flex;
			flex-direction: column;
			width: 180rpx;
		}
	}

	.get-coupon {
		padding: 0 $gutter;
		border-top: 1rpx solid #f5f5f5;
		border-bottom: 1rpx solid #f5f5f5;
		margin-top: $gutter;
		height: 96rpx;
		font-size: 30rpx;
		color: #82848f;
		display: flex;
		align-items: center;

		.max-ing {
			display: flex;
			align-items: center;
			max-width: 560rpx;
		}

		.g-activity {
			height: 48rpx;
			padding: 0 24rpx;
			border: 1rpx solid #f2857b;
			color: #e93323;
			font-size: 24rpx;
			line-height: 48rpx;
			position: relative;
			margin: 22rpx 0 22rpx 18rpx;
			max-width: 280rpx;
			white-space: nowrap;

			&::before {
				content: ' ';
				position: absolute;
				width: 4px;
				height: 6px;
				border-radius: 0 4px 4px 0;
				border: 1px solid #f2857b;
				background-color: #fff;
				bottom: 50%;
				left: -1px;
				margin-bottom: -3px;
				border-left-color: #fff;
			}

			&::after {
				content: ' ';
				position: absolute;
				width: 4px;
				height: 6px;
				border-radius: 4px 0 0 4px;
				border: 1px solid #f2857b;
				background-color: #fff;
				right: -1px;
				bottom: 50%;
				margin-bottom: -3px;
				border-right-color: #fff;
			}
		}

		.g-icon {
			margin-left: auto;
		}
	}

	.coupon-title {
		padding: 28rpx 0;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 28rpx;
		color: #666;
	}

	.cliitems {
		box-shadow: 0 4rpx 5rpx rgba($color: #000000, $alpha: 0.2);
		margin: 20rpx $gutter 30rpx;
		border-radius: 10rpx;
		overflow: hidden;
	}

	.coupon-oper {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 90rpx;
		padding: 0 $gutter;

		.textbox {
			font-size: 24rpx;
			color: #666;
		}

		.red {
			color: red;
		}
	}

	.share-box {
		display: flex;
		flex-direction: column;

		.grid-text {
			font-size: 28rpx;
		}

		.share-cancel {
			margin-top: auto;
			text-align: center;
			border-top: 1rpx solid #f8f8f8;
			height: 80rpx;
			font-size: 28rpx;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}

	.share-fixed {
		position: fixed;
		top: 60rpx;
		left: 50%;
		width: 500rpx;
		height: 700rpx;
		margin-left: -250rpx;
		z-index: 9999999;

		.share-image {
			width: 100%;
			height: 100%;
		}
	}

	.no-btn {
		background-color: transparent;
		background: none;
		border: none;
		height: auto;
		padding-left: 0;
		padding-right: 0;
		line-height: inherit;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

		.grid-text {
			font-size: 28rpx;
			font-weight: normal;
		}

		&::after {
			display: none;
		}
	}
</style>
