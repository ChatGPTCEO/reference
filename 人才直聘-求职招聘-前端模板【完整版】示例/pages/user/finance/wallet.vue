<template>
	<view class="content">
		<view class="account">
			<view class="item">
				<text class="money">{{account.balanceWithdraw}}</text>
				<text>可提现金额（元）</text>
			</view>
			<view class="bottom">
				<view class="btn" @click="toWithdraw">提现</view>
				<view class="btn" @click="toRule">说明</view>
			</view>
		</view>
		<view class="list"  v-for="(list, list_i) in severList" :key="list_i">
			<view class="li" v-for="(li, li_i) in list" @tap="toPage(list_i, li_i)" v-bind:class="{ noborder: li_i == list.length - 1 }" hover-class="hover" :key="li.name">
				<view class="left">
					<view class="icons" >
						<!-- <text class="yzb" :class="li.icon" :style="{ color: li.color }"></text> -->
						<image :src="li.icon"></image>
					</view>
					<view class="text">{{ li.name }}</view>
				</view>
				<view class="right">
					<text class="right-text">{{li.text}}</text>
					<text class="yzb yzb-next" v-if="li.show"></text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				account:{
					balanceWithdraw:0,
					totalMoney:0,
				},
				severList: [
					[
						{ name: '本月收入',text:'￥0.00', show: false, icon: '/static/img/my/qianbao.png', color: '#FF9552', url:null },
						{ name: '提现申请', show: true, icon: '/static/img/my/zhuanzhang.png', color: '#FCB138', url: this.$mRoutesConfig.withdrawLog },
					],
					[
						{ name: '收入记录', show: true, icon: '/static/img/my/money.png', color: '#FCB138', url: this.$mRoutesConfig.records },
						{ name: '提现记录', show: true, icon: '/static/img/my/zhuanzhang.png', color: '#FCB138', url: this.$mRoutesConfig.records },
						{ name: '交易明细', show: true, icon: '/static/img/my/list.png', color: '#FF8948', url: this.$mRoutesConfig.records },
						{ name: '提现规则', show: true, icon: '/static/img/my/help.png', color: '#FF8948', url: this.$mRoutesConfig.rule },
					]
				],
			}
		},
		
		onShow() {
			this.getAccount();
		},
		
		methods: {
			async getAccount() {
				let res = await this.$apis.getAccountDetail();
				console.log('res=====', res);
				if (res) {
					this.account=res;
					this.severList[0][0].text="￥"+res.totalMoney;
				}
			},
			
			//用户点击列表项
			toPage(list_i, li_i) {
				let that = this;
				if (this.severList[list_i][li_i].name == '收入记录') {
					this.$mRouter.push({
						route: this.severList[list_i][li_i].url,
						query: {
							type: 1
						}
					});
					return;
				}
				if (this.severList[list_i][li_i].name == '提现记录') {
					this.$mRouter.push({
						route: this.severList[list_i][li_i].url,
						query: {
							type: 2
						}
					});
					return;
				}
				this.$mRouter.push({
					route: this.severList[list_i][li_i].url,
					query: {
						id: 1
					}
				});
			},
			
			toWithdraw(){
				this.$mRouter.push({
					route: this.$mRoutesConfig.withdraw,
				});
			},
			
			toRule(){
				this.$mRouter.push({
					route: this.$mRoutesConfig.rule,
				});
			}
			
			
		}
	}
</script>

<style lang="scss">

.account{
	display: flex;
	flex-direction: column;
	background-color: $main-color;
	.item{
		padding: 30upx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		text{
			color: #ffffff;
		}
		.money{
			font-size: 60upx;
		}
	}
	.bottom{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		.btn{
			padding: 15upx 0;
			display: flex;
			align-items: center;
			justify-content: center;
			color: #ffffff;
			width: 50%;
			background: rgba(255, 255, 255, 0.15);
			font-size: $uni-font-size-lg;
		}
		:first-child{
			border-right:solid 1upx #FF822B;
		}
	}
}

.list {
	width: 100%;
	border-bottom: solid 26upx #f1f1f1;
	display: flex;
	flex-direction: column;
	.li {
		width: 92%;
		height: 100upx;
		padding: 0 4%;
		border-bottom: solid 1upx #ebeef5;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		&.noborder {
			border-bottom: 0;
		}
		.left{
			display: flex;
			flex-direction: row;
			align-items: center;
		}
		.icons {
			display: flex;
			align-items: center;
			margin-right: 20upx;
			align-items: center;
			text{
				font-size: 40upx;
			}
			image{
				width: 40upx;
				height: 40upx;
			}
		}
		.text {
			// padding-left: 20upx;
			width: 100%;
			color: #666;
		}
		.to {
			flex-shrink: 0;
			width: 40upx;
			height: 40upx;
		}
		.icon-next {
			font-size: $font-size-34;
			color: $font-color-999;
		}
	}
	.right{
		width: 300upx;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: flex-end;
		.right-text{
			color: $font-color-999;
			margin-right: 10upx;
		}
	}
}
</style>
