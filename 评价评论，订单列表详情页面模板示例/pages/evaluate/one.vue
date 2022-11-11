<template>
	<view class="page_pingjia1">
		<view class="jianjie" v-for="(item,index) in pro">
			<view class="touxiang">
				<u--image :showLoading="true" :src="item.src" width="80px" height="80px" @click="click"></u--image>
			</view>
			<view class="zhuti">
				<view class="name">{{item.title}}</view>
				<view class="heti">
					<view class="jiage">{{item.other}}</view>
					<view class="shuzi">{{item.price}}</view>
				</view>
			</view>
		</view>
		<view class="pingjia">
			<view class="dianping" v-for="(item,index) in rate">
				<view class="taidu">
					<view style="width: 120px;">{{item.name}}</view>
					<view>
						<start :count="item.count" activeColor="#ffee00" v-model="item.value" @change="change"></start>
					</view>
				</view>
			</view>
			<view class="shuru">
				<u--textarea height="170" v-model="value1" placeholder="其他想说的..."></u--textarea>
			</view>
		</view>
		<view v-for="(item,index) in button">
			<u-button class="anniu" color="#6cd9a1" size="normal" type="success" style="width: 80vw;">{{item.name}}
			</u-button>
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
				value1: "",
				pro: [{
					src: require('@/tupian/touxiang.jpg'),
					title: "春色家政-专业冰箱清洗",
					price: "238.00",
					other: "￥"
				}],
				rate: [{
						name: "商品评价",
						count: 5,
						value: "0",
						type: ""
					},
					{
						name: "物流评价",
						count: 5,
						value: "0",
						type: ""
					},
					{
						name: "服务评价",
						count: 5,
						value: "0",
						type: ""
					},
				],
				button: [{
					name: "确认"
				}],
				theme: [{
					first: '#ffaa00',
					second: '#0055ff',
					three: '#ffffff'
				}],
			}
		},
		methods: {
			change(e) {
				console.log('change', e);
			},
		}
	}
</script>

<style lang="scss">
	.page_pingjia1 {
		background-color: #F4F4F6;
		width: 100vw;
		height: 100vh;
		padding-top: 30px;
		padding-left: 20px;

		.jianjie {
			background-color: #ffffff;
			width: 85vw;
			height: 15vh;
			border-radius: 10px;
			display: flex;
			padding-left: 17px;

		}

		.anniu {
			margin-left: 15px;
			margin-top: 20px;
		}

		.zhiliang {
			margin-top: 30px;
			display: flex;
			justify-content: space-around;
		}

		.taidu {
			padding-top: 25px;

			display: flex;
			justify-content: space-around;
		}

		.shuru {
			width: 75vw;
			margin-top: 30px;
			margin-left: 27px;


		}

		.shangmen {
			padding-top: 30px;
			margin-left: 25px;
		}

		.xx {
			margin-left: 175px;
			margin-top: -20px;
		}

		.pingjia {
			height: 60vh;
			background-color: #ffffff;
			width: 90vw;
			margin-top: 20px;
			border-radius: 10px;
		}

		.shuzi {
			color: #ff0000;
		}

		.jiage {
			font-size: 12px;
			color: #ff0000;
		}

		.heti {
			margin-top: 20px;
			display: flex;
		}

		.name {
			font-weight: 900;
		}

		.touxiang {
			margin-top: 10px;

		}

		.zhuti {
			margin-left: 45px;
			margin-top: 20px;
		}

	}
</style>
