<!-- 限时活动抽取模板 -->
<template>
	<view   class="selected-application-contatiner">
		<view   class="hot-brand-box">
			<view   class="title" :style="'text-align: '+titleAlign+';'">
				<u-icon v-if="showTitleIcon" style="margin-right: 10rpx;" name="a-bianzu2"custom-prefix="custom-icon"color="#FCA235"size="48"></u-icon>
				<text>今日有货</text>
			</view>
			<view   class="u-p-l-10 u-p-r-10">
				<u-row>
					<u-col :span="6" v-for="(item,index2) in appList" :key="index2">
						<view   class="u-flex u-row-between u-col-center brand-item" style="height: 120rpx;" @click="loadApp(item)">
							<view  >{{item.name}}</view>
							<view  >
								<u-image :src="item.imageUrl" width="99rpx" height="99rpx" border-radius="16">
									<u-loading slot="loading"></u-loading>
								</u-image>
							</view>
						</view>
					</u-col>
				</u-row>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "selectedApplication",
		props:{
			appList:{
				default:[],
				type:Array
			},
			titleAlign:{
				default:'center'
			},
			showTitleIcon:{
				default:false,
				type:Boolean
			}
		},
		data() {
			return {

			};
		},
		mounted: function() {

		},
		methods: {
			loadApp:function(app){
				this.$emit("loadApp",app);
			}
		}
	}
</script>

<style scoped lang="scss">
	.selected-application-contatiner{
		.hot-brand-box {
			background-color: #FFFFFF;
			border-radius: 20rpx;
			padding-top: 20rpx;
			padding-bottom: 30rpx;

			.title {
				text-align: center;
				font-size: 36rpx;
				font-weight: bold;
				margin-bottom: 30rpx;
				padding-left: 20rpx;
			}

			.brand-item {
				background-color: #fafafa;
				border-radius: 16rpx;
				margin-bottom: 16rpx;
				padding: 16rpx;
			}
		}
	}
</style>
