<template>
	<view class="page_pingjia3">
		<view class="biaoti" v-for="(item,index) in por">
			<view class="bt">{{item.title}}</view>
			<view class="ziti">{{item.other}}</view>
		</view>
		<view class="kuang">
			<view class="kongzhi" v-for="(item,index) in por1">
				<view class="touxiang">
					<u--image :showLoading="true" shape="circle" :src="item.src" width="60px" height="60px"
						@click="click">
					</u--image>
				</view>
				<view class="bh">{{item.title}}</view>
				<view class="xx">
					<start :count="item.count" v-model="item.value" inactiveColor="#b9b9b9" activeColor="#ffaa00"
						size="40">
					</start>
				</view>
				<view class="hui">{{item.other}}</view>
			</view>
			<view class="danjia" v-for="(item,index) in por2">
				<u-cell :value="item.price" style="height: 40px;">
					<view slot="title" class="u-slot-title">
						<text class="u-cell-text">{{item.title}}</text>
						</u-tag>
					</view>
				</u-cell>
			</view>
		</view>

	</view>
</template>

<script>
	import start from '../../common/components/uni-rate.vue'
	export default {
		components: {
			start
		},
		data() {
			return {

				por: [{
					title: '行程结束',
					price: '',
					other: '请评价'
				}],
				por1: [{
					src: require('@/tupian/touxiang.jpg'),
					title: '司机编号:201',
					other: '对此次行程做个评价吧？',
					count: 5,
					value: 0,
				}],
				por2: [{
						title: "单价",
						price: "￥3/min"
					},
					{
						title: "距离",
						price: "4.5km",
					},
					{
						title: "优惠",
						price: "￥6",
					},
					{
						title: "总价",
						price: "￥36",
					}
				],
			}
		},
	}
</script>

<style lang="scss">
	.page_pingjia3 {
		height: 100vh;
		width: 100vw;
		background-color: #b8aaff;

		.danjia {
			margin-top: 20px;
		}
		.xx {
			margin-top: 20px;
			margin-left: 35px;
		}
		.bh {
			margin-top: 5px;
		}
		.touxiang {
			width: 25%;
			margin: 0 auto;
			text-align: center;
		}
		.kongzhi {
			width: 80%;
			margin: 0 auto;
			text-align: center;
		}
		.hui {
			color: #707070;
			font-size: 14px;
			margin-top: 20px;
			margin-left: 10px;
		}
		.biaoti {
			width: 80%;
			margin: 0 auto;
			text-align: center;
			height: 10vh;
			padding-top: 20px;


		}

		.ziti {
			color: #818181;
		}

		.bt {
			font-size: 18px;
		}

		.kuang {
			height: 64.5vh;
			width: 85vw;
			background-color: #ffffff;
			margin-left: 30px;
			padding-top: 20px;
			border-radius: 10px;
			box-shadow: 5px 5px 5px #8f8f8f;
		}
	}
</style>
