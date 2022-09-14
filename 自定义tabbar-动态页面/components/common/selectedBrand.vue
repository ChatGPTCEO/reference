<!-- 限时活动抽取模板 -->
<template>
	<view   class="selected-brand-contatiner">
		<view   class="hot-brand-box">
			<view   class="title" :style="'text-align: '+titleAlign+';'">
				<text>预约订制</text>
			</view>
			<view   class="u-p-l-50 u-p-r-30 u-m-t-30">
				<u-row>
					<u-col :span="3" v-for="(brand,index2) in brandList" :key="index2">
						<view   class="u-flex u-row-center u-col-center brand-item">
							<view   class="u-m-l-4">
								<u-image :src="brand.logo" width="119rpx" height="119rpx" border-radius="16">
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
		name: "selectedBrand",
		props:{
			brandList:{
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
			clickBrand:function(brand){
				this.$emit("clickBrand",brand);
			}
		}
	}
</script>

<style scoped lang="scss">
	.selected-brand-contatiner{
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
				//background-color: #f3f4f6;
				border-radius: 16rpx;
				margin-bottom: 10rpx;
				padding: 10rpx;
			}
		}
	}
</style>
