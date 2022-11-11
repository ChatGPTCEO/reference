<template>
	<view class="page_pingjia5">
		<view class="kuang" v-for="(item,index) in pro">
			<view class="zhong">
				<view class="touxiang">
					<u--image :showLoading="true" shape="circle" :src="item.src" width="70px" height="70px"
						@click="click">
					</u--image>
				</view>
				<view class="zhuti">{{item.title}}</view>
			</view>
			<view class="xx">
				<start :count="item.count" v-model="item.value" activeIcon="heart-fill" inactiveIcon="heart" size="40">
				</start>
			</view>
			<view class="yuju">{{item.other}}</view>
			<view class="biaoqian" style="display: flex;">
				<view class="u-page__tag-item" v-for="(item, index) in checkboxs" :key="index">
					<u-tag :text="item.name" :plain="!item.checked" type="warning" :name="index" @click="checkboxClick"
						shape="circle" style="height: 35px;width: 23vw;" color="#000000" plainFill>
					</u-tag>
				</view>
			</view>
			<view class="anniu" v-for="(item,index) in button">
				<u-button type="warning">{{item.name}}</u-button>
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
				pro: [{
					src: require('@/tupian/touxiang.jpg'),
					title: "灯火阑珊",
					other: '不错不错，还是挺满意的！',
					count: 5,
					value: 0,
				}],
				button: [{
					name: '发布',
				}],
				checkboxs: [{
						name: "专业强度高",
						checked: false
					},
					{
						name: "态度非常好",
						checked: false
					},
					{
						name: "沟融能力强",
						checked: false
					},
				],
			}
		},
		methods: {
			radioClick(name) {
				this.radios.map((item, index) => {
					item.checked = index === name ? true : false
				})
			},
			checkboxClick(name) {
				this.checkboxs[name].checked = !this.checkboxs[name].checked
			},

		}
	}
</script>

<style lang="scss">
	.page_pingjia5 {
		width: 100vw;
		height: 95vh;
		background-color: #ffffff;

		.biaoqian {
			margin-top: 35px;
			margin-left: 5px;
		}

		.anniu {
			margin-top: 180px;

		}

		.u-page__tag-item {

			margin-right: 30px;
		}

		.yuju {
			margin-left: 10px;
			text-align: center;
			margin-top: 20px;
			color: #da9100;
		}

		.touxiang {
			width: 20%;
			margin: 0 auto;
			text-align: center;
			margin-top: 30px;
		}

		.xx {
			
			padding-left: 21%;
			padding-top: 20px;
		}

		.zhuti {
			
			margin: 0 auto;
			text-align: center;
			margin-top: 10px;
		}

		.kuang {
			width: 90vw;
			height: 90vh;
			background-color: #ffffff;
			margin-left: 20px;
		}
	}
</style>
