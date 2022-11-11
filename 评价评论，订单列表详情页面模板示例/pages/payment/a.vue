<template>
	<view>
		<!-- 地址 -->
		<navigator url="/pages/address/address?source=1" class="address-section">
			<view class="order-content" v-for="(item,index) in pro">
				<text class="yticon icon-shouhuodizhi"></text>
				<view class="cen">
					<view class="top">
						<text class="name">{{item.name}}</text>
						<text class="mobile">{{item.mobile}}</text>
					</view>
					<text class="address">{{item.address}}</text>
				</view>
				<text class="yticon icon-you"></text>
			</view>
		</navigator>
		<view class="H10"></view>
		<view class="tuanzhang" v-for="(item,index) in pro">
			<view class="tz-l">
				<checkbox-group>
					<label>
						<checkbox value="cb" style="transform:scale(0.7)" />
					</label>
				</checkbox-group>
			</view>
			<view class="tz-m">该团由团长代收包裹（免运费）</view>
			<view class="tz-r">团长：{{item.r}}</view>
		</view>
		<view class="H10"></view>
		<view class="uni-list">
			<radio-group @change="radioChange">
				<label class="uni-list-cell uni-list-cell-pd">
					<view class="tuanzhang">
						<view class="tz-l">
							<radio value="1" style="transform:scale(0.7)" />
						</view>
						<view class="tz-m">快递配送</view>
						<view class="tz-r"></view>
					</view>
				</label>
				<label class="uni-list-cell uni-list-cell-pd">
					<view class="tuanzhang">
						<view class="tz-l">
							<radio value="2" style="transform:scale(0.7)" />
						</view>
						<view class="tz-m">同城配送</view>
						<view class="tz-r"></view>
					</view>
				</label>
				<label class="uni-list-cell uni-list-cell-pd">
					<view class="tuanzhang">
						<view class="tz-l">
							<radio value="3" style="transform:scale(0.7)" />
						</view>
						<view class="tz-m">到店自提</view>
						<view class="tz-r"></view>
					</view>
				</label>
			</radio-group>
		</view>
		<view class="ztdz">

		</view>
		<view class="goods-section">

			<view class="g-item" v-for="(item,index) in pro">
				<image src="../../tupian/zhuti.jpg"></image>
				<view class="right">
					<text class="title clamp">{{item.title}}</text>

					<text class="spec">￥{{item.price}}</text>
					<view class="price-box">
					</view>
				</view>
			</view>
		</view>
		<view class="yt-list" v-for="(item,index) in pro">
			<view class="jr">
				<view class="jr_tit">为您加入仅差{{item.num}}人的团，支付后即可拼购成功</view>
				<view class="jr_img">
					<view class="img_01 img_01_border">
						<img src="../../tupian/xiongmao.jpg"></img>
						<view class="zhicheng">团长</view>
					</view>
					<view class="img_01">
						<img src="../../tupian/touxiang.jpg"></img>
						<view class="zhicheng">自己</view>
					</view>
					<view class="img_01">
						<img src="../../tupian/maomi.jpg"></img>
						<view class="zhicheng">待支付</view>
					</view>
					<view class="img_01 img_01_borderx">
						?
					</view>
				</view>
			</view>
		</view>
		<view class="yt-list">
			<view class="yt-list-cell b-b" @click="toggleMask('show')">
				<view class="cell-icon">
					券
				</view>
				<text class="cell-tit clamp">优惠券</text>
				<text class="cell-tip active">
					{{coupon_text}}
				</text>
				<text class="cell-more wanjia wanjia-gengduo-d"></text>
			</view>
		</view>
		<view class="yt-list" v-for="(item,index) in pro">
			<view class="yt-list-cell b-b">
				<text class="cell-tit clamp">商品金额</text>
				<text class="cell-tip">￥{{item.price}}</text>
			</view>
			<view class="yt-list-cell b-b">
				<text class="cell-tit clamp">优惠金额</text>
				<text class="cell-tip red">-￥{{item.coupon_money}}</text>
			</view>
			<view class="yt-list-cell b-b">
				<text class="cell-tit clamp">运费</text>
				<text class="cell-tip">￥{{item.yunfei_money}}</text>
			</view>

			<view class="yt-list-cell desc-cell">
				<text class="cell-tit clamp">备注</text>
				<input class="desc" type="text"  placeholder="请填写备注信息"
					placeholder-class="placeholder" />
			</view>
		</view>
		<!-- 底部 -->
		<view class="footer" v-for="(item,index) in pro">
			<view class="price-content">
				<text>实付款</text>
				<text class="price-tip">￥</text>

				<text class="price">{{item.price}}</text>
			</view>
			<text class="submit" @click="submit">提交订单</text>
		</view>

	
			<view class="mask-content">
				<scroll-view class="scroll" scroll-y>
					<view class="coupon-item">
						<block>
							<view class="con">
								<view class="left">
									<text class="title">减56356</text>
									<text class="title">满4563 减4563</text>
									<!-- <text class="time"></text> -->
								</view>
								<view class="right">
									<text class="price">4563</text>
									<!-- <text>满{{item.full}}可用</text> -->
								</view>

								<view class="circle l"></view>
								<view class="circle r"></view>
							</view>
							<view class="use" style="display: flex;justify-content: space-between;">
								<text class="tips">有效期至456365</text>
								<view class="tips2">去使用</view>
								<view class="tips3">不可用</view>
							</view>
						</block>
					</view>
				</scroll-view>


				<view class="btn" @click="cancel_use">不使用优惠券</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				pro: [{
					name: "二楼",
					mobile: "1365486541",
					address: "河北省 石家庄市长安区",
					r: "朱元章",
					title: "外卖点餐商城",
					spec: "368.00",
					num: "1",
					price: "368.00",
					coupon_money: "0",
					yunfei_money: "免运费"
				}],
				coupon_text:""
			}
		},

	}
</script>

<style lang="scss">
	page {
		background: #f8f8f8;
		padding-bottom: 100upx;
	}
	.black {
		.container {
			background-color: #000000;
			position: fixed;
			top: 0;
			opacity: 0.6;
			width: 100%;
			height: 100%;
			z-index: 999;
		}
	}

	.t_con {
		background-color: #fff;
		position: fixed;
		top: 120px;
		left: 10%;
		width: 80%;
		padding: 20px;
		border-radius: 5px;
		z-index: 1999;
		overflow: hidden;

		.t_c_tit {
			font-size: 16px;
			text-align: center;
			font-weight: 600;
			padding-bottom: 10px;
		}

		.t_c_con {
			font-size: 14px;
			max-height: 280px;
			min-height: 120px;
			overflow-y: scroll;
			width: 100%;
			overflow-x: hidden;
		}

		.t_c_more {
			text-align: center;
			color: #868686;
			padding: 15px 0 10px;
			font-size: 14px;

			span {
				color: #4B73CE;
			}
		}

		.t_c_btn {
			display: flex;
			justify-content: space-between;

			.t_c_btn_01 {
				height: 35px;
				line-height: 35px;
				color: #fff;
				border-radius: 20px;
				text-align: center;
				width: 47%;
				font-size: 14px;
				margin-top: 10px;
			}

			.bg_red {
				background-color: #FF7900;
			}

			.bg_gery {
				background-color: #CCCCCC;
			}
		}
	}

	.H10 {
		height: 10px;
	}

	.ztdz {
		padding: 10px 0 10px 20px;
		color: #777;
		background-color: #fff;
		font-size: 14px;
	}

	.tuanzhang {
		background: #fff;
		padding: 3px 10px;
		display: flex;
		font-size: 12px;

		.tz-l {
			width: 30px;

			input {
				border: 1px solid #000;
			}
		}

		.tz-m {
			flex-grow: 1;
			color: #FF8D42;
			padding-top: 2px;
		}

		.tz-r {
			padding-top: 3px;
		}
	}

	.jr {
		padding: 10px;
		font-size: 14px;

		.jr_tit {
			font-weight: 600;
			text-align: center;
			padding-bottom: 10px;
		}

		.jr_img {
			display: flex;
			justify-content: center;

			.img_01 {
				position: relative;
				border-radius: 50%;
				margin: 0 7px;
				width: 44px;
				height: 44px;

				img {
					width: 40px;
					height: 40px;
					border-radius: 50%;
				}

				.zhicheng {
					position: absolute;
					bottom: -5px;
					left: 0;
					background-color: #E93B3D;
					color: #fff;
					font-size: 12px;
					border-radius: 10px;
					width: 40px;
					text-align: center;
				}
			}

			.img_01_border {
				border: 2px solid #E93B3D;
			}

			.img_01_borderx {
				border: 2px dashed #E6E6E6;
				text-align: center;
				line-height: 44px;
				color: #E6E6E6;
			}
		}
	}

	.address-section {
		padding: 30upx 0;
		background: #fff;
		position: relative;

		.order-content {
			display: flex;
			align-items: center;
		}

		.icon-shouhuodizhi {
			flex-shrink: 0;
			display: flex;
			align-items: center;
			justify-content: center;
			width: 90upx;
			color: #888;
			font-size: 44upx;
		}

		.cen {
			display: flex;
			flex-direction: column;
			flex: 1;
			font-size: 28upx;
			color: #303133;
		}

		.name {
			font-size: 34upx;
			margin-right: 24upx;
		}

		.address {
			margin-top: 16upx;
			margin-right: 20upx;
			color: #909399;
		}

		.icon-you {
			font-size: 32upx;
			color: #909399;
			margin-right: 30upx;
		}

		.a-bg {
			position: absolute;
			left: 0;
			bottom: 0;
			display: block;
			width: 100%;
			height: 5upx;
		}
	}

	.goods-section {
		margin-top: 16upx;
		background: #fff;
		padding-bottom: 1px;
		padding-top: 10px;

		.g-header {
			display: flex;
			align-items: center;
			height: 84upx;
			padding: 0 30upx;
			position: relative;
		}

		.logo {
			display: block;
			width: 50upx;
			height: 50upx;
			border-radius: 100px;
		}

		.name {
			font-size: 30upx;
			color: #606266;
			margin-left: 24upx;
		}

		.g-item {
			display: flex;
			margin: 20upx 30upx;

			image {
				flex-shrink: 0;
				display: block;
				width: 140upx;
				height: 140upx;
				border-radius: 4upx;
			}

			.right {
				flex: 1;
				padding-left: 24upx;
				overflow: hidden;
			}

			.title {
				font-size: 30upx;
				color: #303133;
			}

			.spec {
				font-size: 26upx;
				color: #909399;
			}

			.price-box {
				display: flex;
				align-items: center;
				font-size: 32upx;
				color: #303133;
				padding-top: 10upx;

				.price {
					margin-bottom: 4upx;
				}

				.number {
					font-size: 26upx;
					color: #606266;
					margin-left: 20upx;
				}
			}

			.step-box {
				position: relative;
			}
		}
	}

	.yt-list {
		margin-top: 16upx;
		background: #fff;
	}

	.yt-list-cell {
		display: flex;
		align-items: center;
		padding: 10upx 30upx 10upx 40upx;
		line-height: 70upx;
		position: relative;

		&.cell-hover {
			background: #fafafa;
		}

		&.b-b:after {
			left: 30upx;
		}

		.cell-icon {
			height: 32upx;
			width: 32upx;
			font-size: 22upx;
			color: #fff;
			text-align: center;
			line-height: 32upx;
			background: #f85e52;
			border-radius: 4upx;
			margin-right: 12upx;

			&.hb {
				background: #ffaa0e;
			}

			&.lpk {
				background: #3ab54a;
			}

		}

		.cell-more {
			align-self: center;
			font-size: 24upx;
			color: #909399;
			margin-left: 8upx;
			margin-right: -10upx;
		}

		.cell-tit {
			flex: 1;
			font-size: 26upx;
			color: #909399;
			margin-right: 10upx;
		}

		.cell-tip {
			font-size: 26upx;
			color: #303133;

			&.disabled {
				color: #909399;
			}

			&.active {
				color: #fa436a;
			}

			&.red {
				color: #fa436a;
			}
		}

		&.desc-cell {
			.cell-tit {
				max-width: 90upx;
			}
		}

		.desc {
			flex: 1;
			font-size: 28upx;
			color: #303133;
		}
	}

	/* 支付列表 */
	.pay-list {
		padding-left: 40upx;
		margin-top: 16upx;
		background: #fff;

		.pay-item {
			display: flex;
			align-items: center;
			padding-right: 20upx;
			line-height: 1;
			height: 110upx;
			position: relative;
		}

		.icon-weixinzhifu {
			width: 80upx;
			font-size: 40upx;
			color: #6BCC03;
		}

		.icon-alipay {
			width: 80upx;
			font-size: 40upx;
			color: #06B4FD;
		}

		.icon-xuanzhong2 {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 60upx;
			height: 60upx;
			font-size: 40upx;
			color: #fa436a;
		}

		.tit {
			font-size: 32upx;
			color: #303133;
			flex: 1;
		}
	}

	.footer {
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 995;
		display: flex;
		align-items: center;
		width: 100%;
		height: 90upx;
		justify-content: space-between;
		font-size: 30upx;
		background-color: #fff;
		z-index: 998;
		color: #606266;
		box-shadow: 0 -1px 5px rgba(0, 0, 0, .1);

		.price-content {
			padding-left: 30upx;
		}

		.price-tip {
			color: #fa436a;
			margin-left: 8upx;
		}

		.price {
			font-size: 36upx;
			color: #fa436a;
		}

		.submit {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 280upx;
			height: 100%;
			color: #fff;
			font-size: 32upx;
			background-color: #fa436a;
		}
	}

	/* 优惠券面板 */
	.mask {
		display: flex;
		align-items: flex-end;
		position: fixed;
		left: 0;
		top: var(--window-top);
		bottom: 0;
		width: 100%;
		background: rgba(0, 0, 0, 0);
		z-index: 9995;
		transition: .3s;

		.mask-content {
			width: 100%;
			min-height: 30vh;
			max-height: 70vh;
			padding: 20px 0px 60px;
			background: #f3f3f3;
			transform: translateY(100%);
			transition: .3s;
			overflow-y: scroll;
		}

		.btn {
			position: fixed;
			bottom: 0;
			width: 95%;
			text-align: center;
			border: 1px solid #FA436A;
			background-color: #FA436A;
			color: #FFFFFF;
			border-radius: 20px;
			margin: 10px;
			padding: 5px;
		}


		&.none {
			display: none;
		}

		&.show {
			background: rgba(0, 0, 0, .4);

			.mask-content {
				transform: translateY(0);
			}
		}
	}

	.scroll {
		max-height: 55vh;
	}

	/* 优惠券列表 */
	.coupon-item {
		display: flex;
		flex-direction: column;
		margin: 3upx 24upx;
		background: #fff;

		.con {
			display: flex;
			align-items: center;
			position: relative;
			height: 120upx;
			padding: 0 30upx;


			/* &:after {
				position: absolute;
				left: 0;
				bottom: 10;
				content: '';
				width: 100%;
				height: 0;
				border-bottom: 1px dashed #f3f3f3;
				transform: scaleY(50%);
			} */
		}

		.left {
			display: flex;
			flex-direction: column;
			justify-content: center;
			flex: 1;
			overflow: hidden;
			height: 100upx;
		}

		.title {
			font-size: 32upx;
			color: #303133;
			margin-bottom: 10upx;
		}

		.time {
			font-size: 24upx;
			color: #909399;
		}

		.right {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			font-size: 26upx;
			color: #606266;
			height: 100upx;
		}

		.price {
			font-size: 44upx;
			color: #fa436a;

			&:before {
				content: '￥';
				font-size: 34upx;
			}
		}

		.tips {
			font-size: 24upx;
			color: #909399;
			line-height: 60upx;
			white-space: nowrap;
			padding-left: 30upx;
		}

		.tips2 {
			font-size: 24upx;
			color: #909399;
			line-height: 50upx;
			;
			height: 50upx;
			;
			text-align: center;
			margin: 5upx 10px 0 0;
			width: 80px;
			border: 1px solid #FA436A;
			background-color: #FA436A;
			color: #FFFFFF;
			border-radius: 25px;
		}

		.tips3 {
			font-size: 24upx;
			color: #909399;
			line-height: 50upx;
			;
			height: 50upx;
			;
			text-align: center;
			margin: 5upx 10px 0 0;
			width: 80px;
			border: 1px solid #C0C0C0;
			background-color: #C0C0C0;
			color: #FFFFFF;
			border-radius: 25px;
		}

		.circle {
			position: absolute;
			left: -6upx;
			bottom: -10upx;
			z-index: 10;
			width: 20upx;
			height: 20upx;
			background: #f3f3f3;
			border-radius: 100px;

			&.r {
				left: auto;
				right: -6upx;
			}
		}

	}
</style>
