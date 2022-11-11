<template>
	<view>
		<view class='sign-record'>
			<view class='list' v-for="(item,index) in signList" :key="index">
				<view class='item'>
					<view class='data'>{{item.month}}</view>
					<view class='listn'>
						<view class='itemn acea-row row-between-wrapper' v-for="(itemn,indexn) in item.list"
							:key="indexn">
							<view>
								<view class='name line1'>{{itemn.integral_title}}</view>
								<view>{{itemn.create_time}}</view>
							</view>
							<view class='num font-color'>+{{itemn.integral_change}}</view>
						</view>
					</view>
				</view>
			</view>
			<view class='loadingicon acea-row row-center-wrapper'>
				<text class='loading iconfont icon-jiazai' :hidden='loading==false'></text>{{loadtitle}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				loading: false,
				loadend: false,
				loadtitle: '加载更多',
				page: 1,
				limit: 8,
				signList: [],
				isAuto: false, //没有授权的不会自动授权
				isShowAuth: false //是否隐藏授权
			};
		},
		computed: {
			hasLogin() {
				return this.$store.state.hasLogin
			},
			UserInfo() {
				return this.$store.state.userInfo
			}
		},
		onLoad() {
			if (this.hasLogin) {
				this.getSignMoneList();
			} else {
				this.isAuto = true;
				this.$set(this, 'isShowAuth', true)
			}
		},
		onReachBottom: function() {
			this.getSignMoneList();
		},
		methods: {
			/**
			 * 
			 * 授权回调
			 */
			onLoadFun: function() {
				this.isShowAuth = false;
				this.getSignMoneList();
			},
			// 授权关闭
			authColse: function(e) {
				this.isShowAuth = e
			},
			/**
			 * 获取签到记录列表
			 */
			getSignMoneList: function() {
				let that = this;
				if (that.loading) return;
				if (that.loadend) return;
				that.loading = true;
				that.loadtitle = "";
				that.$u.post('/api/sign/month', {
					userid:that.UserInfo.uid,
					page: that.page,
					limit: that.limit,
					integral_type: 1
				}).then(res => {
					if (res) {
						let list = res.data;
						let loadend = list.length < that.limit;
						that.signList = that.$util.SplitArray(list, that.signList);
						that.$set(that, 'signList', that.signList);
						that.loadend = loadend;
						that.loading = false;
						that.loadtitle = loadend ? "哼😕~我也是有底线的~" : "加载更多"
					} else {
						that.loading = false;
						that.loadtitle = '加载更多';
					}
				})
			},
		}
	}
</script>
<style lang="scss">
	page {
		font-size: 14px;
		color: #333;
		background-color: #f5f5f5;
	}

	.sign-record {
		//margin: 20rpx;
	}

	.loadingicon {
		width: 100%;
		height: 42px;
		overflow: hidden;
	}

	.data {
		height: 42px;
		line-height: 42px;
		padding: 0 16px;
		font-size: 12px;
		color: #666;
	}

	.num {
		font-size: 19px;
		font-family: Guildford Pro;
	}

	.font-color {
		color: #fc4141 !important;
	}

	.name {
		width: 208px;
		font-size: 14px;
		color: #282828;
		margin-bottom: 5px;
	}

	.listn {
		background-color: #fff;
		font-size: 12px;
		color: #999;
	}

	.itemn {
		height: 64px;
		border-bottom: 1px solid #eee;
		padding-right: 16px;
		margin-left: 16px;
	}
</style>
