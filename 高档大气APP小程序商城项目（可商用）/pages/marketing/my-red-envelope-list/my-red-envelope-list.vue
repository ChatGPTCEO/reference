<template>
	<view>
		<view class="fixed-top bg-white w-100 row-ac" style="height: 80rpx;">
			<view class="flex-1 row-a-j-fc" v-for="(item, index) in switchState" :key="index" @click="switchClick(index)" :class="{ active: switchIndex == index }">
				<view>{{ item.name }}</view>
				<view class="order-underline  mt-1 "></view>
			</view>
		</view>

		<view class="red-envelope-list w-710">
			<view class="red-envelope-item bg-white w-100" v-for="(item, index) in myRedEnvelopeList" :key="index">
				<view class="flex-1 mx-3 row-ac-sb h-100">
					<view class="row-a-j-fc" style="color: #FC6104;">
						<view class="envelopes-money font-s-7 font-w">
							{{ item.red_envelopes_money }}
							<text class="font-s-1">元</text>
						</view>
						<view class="font-s-1" v-if="item.products[0] == 0">全场商品可用</view>
						<view v-else class="font-s-1">部分商品可用</view>
					</view>
					<view class="row-a-j-fc" v-if="item.status != 1">
						<view class="font-s-4 font-w" >
							<view style="color: #007D05;" v-if="item.time.hou">倒计时{{ item.time.hou }}:{{ item.time.min }}:{{ item.time.sec }}</view>
							<view style="color: #FE4F3B;" v-else>已过使用期</view>
						</view>
						<view class="font-s-1 text-light-grey mt">满{{item.full_money}}可用</view>
					</view>
					<view class="use-status iconfont icon-yishiyong" style="font-size: 310rpx;" v-if="item.status==1" ></view>
					<view class="use-status " v-else>未使用</view>
				</view>
			</view>
			<!-- <view v-for="item in myRedEnvelopeList">
				<view>满多少可用{{item.full_money}}</view>
				<view>红包金额{{item.red_envelopes_money}}</view>
				<view>使用截止时间{{item.used_end_time}}</view>
				<view>状态
					<view v-if="item.status==1">已使用</view>
					<view v-else>未使用</view>
				</view>
				<view>
					<view v-if="item.time.hou">时{{item.time.hou}}
						分{{item.time.min}}
						秒{{item.time.sec}}</view>
					<view v-else>已过期</view>
				</view>
				<view>
					<view v-if="item.products[0] == 0">全场商品可用</view>
					<view v-else>部分商品可用</view>
				</view>
			</view> -->
		</view>
	</view>
</template>

<script>
import { getMyRedEnvelopeListUrl } from '@/api/index';
import { countDownUtil } from '@/utils/util';
export default {
	data() {
		return {
			switchState: [
				{
					id: 0,
					name: '全部'
				},
				{
					id: 1,
					name: '未使用'
				},
				{
					id: 2,
					name: '已使用'
				},
				{
					id: 3,
					name: '已过期'
				}
			],
			switchIndex: 0,
			queryInfo: {
				status: '',
				pageSize: 10,
				page: 1,
				field: '',
				desc: ''
			},
			myRedEnvelopeList: []
		};
	},
	onLoad() {
		this.initData();
	},
	methods: {
		initData() {
			this.getRedEnvelopeList();
		},
		// 获取红包列表
		getRedEnvelopeList() {
			this.$R.get(getMyRedEnvelopeListUrl, this.queryInfo).then(res => {
				this.myRedEnvelopeList = res.data.list;
				if (res.data.list.length > 0) {
					this.myRedEnvelopeList.forEach(item => {
						let time = countDownUtil(item.used_end_time);
						this.$set(item, 'time', time);
					});
				}
				console.log(this.myRedEnvelopeList);
			});
		},
		switchClick(index) {
			switch (index) {
				case 0:
					this.switchIndex = index;
					this.queryInfo.status = '';
					this.queryInfo.page = 1;
					this.getRedEnvelopeList();
					break;
				case 1:
					this.switchIndex = index;
					this.queryInfo.status = 0;
					this.queryInfo.page = 1;
					this.getRedEnvelopeList();
					break;
				case 2:
					this.switchIndex = index;
					this.queryInfo.status = 1;
					this.queryInfo.page = 1;
					this.getRedEnvelopeList();
					break;
				case 3:
					this.switchIndex = index;
					this.queryInfo.status = 2;
					this.queryInfo.page = 1;
					this.getRedEnvelopeList();
					break;
			}
		}
	}
};
</script>

<style lang="scss">
page {
	background-color: #f6f6fa;
}
/* #ifdef H5 */
.fixed-top {
	top: 80rpx;
}
/* #endif */
.order-underline {
	width: 80rpx;
	height: 6rpx;
}
.active .order-underline {
	background-color: $bg-main-color;
}
.red-envelope-list {
	margin-top: 100rpx;
	.red-envelope-item {
		height: 196rpx;
		border-radius: 16rpx;
		margin-bottom: 25rpx;
		.envelopes-money {
			text {
			}
		}
		.use-status{
			color: #FD5C3E;
		}
	}
}
</style>
