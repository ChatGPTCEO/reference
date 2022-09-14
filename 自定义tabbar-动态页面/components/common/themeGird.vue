<!-- 限时活动抽取模板 -->
<template>
	<view   class="theme-gird-contatiner">
		<view   class="gridBox">
			<view   class="ac-info" v-if="titleShow">
				<view   class="left u-m-l-20">
					<view   style="font-size:34rpx;font-weight: bold; color:#333333;">{{girdTitle}}</view>
				</view>
				<view   class="right">
					<text class="u-m-r-4">更多</text>
					<u-icon name="play-right-fill"></u-icon>
				</view>
			</view>
			<view  >
				<u-grid :col="column" :border="false" align="center" hover-class="none">
					<u-grid-item v-for="(item,girdIndex) in themeGirdList" :key="girdIndex" :bg-color="bgColor"
								@click="themeGirdClick(item)"	:custom-style='girdCustomStyle'>
						<u-icon :name="item.iconPath" :size="64"></u-icon>
						<view  >{{item.title}}</view>
					</u-grid-item>
				</u-grid>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "themeGird",
		props:{
			themeGirdList:{
				default:[],
				type:Array
			},
			titleShow:{
				default:true,
				type:Boolean
			},
			girdTitle:{
				default:'主题精选',
				type:String
			},
			column:{
				default:4,
				type:Number
			},
			bgColor:{
				default:'#ffffff',
				type:String
			}
		},
		data() {
			return {
				primaryColor:'',
				themeType:'',
				girdCustomStyle: {
					color: '#363132',
					padding: '20rpx 0'
				},
			};
		},
		mounted: function() {
			
		},
		methods: {
			themeGirdClick:function(girdItem){
				console.log("通知父组件去跳转主题商品列表");
				this.$emit("themeGirdClick",girdItem);
			},
		}
	}
</script>

<style scoped lang="scss">
	.theme-gird-contatiner{
		.gridBox {
			border-radius: 20rpx;
			background-color: #FFFFFF;
			.ac-info {
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				align-items: center;
				padding: 4rpx 0rpx;
				.left {
					height: 60rpx;
					display: flex;
					flex-direction: row;
					justify-content: flex-start;
					align-items: center;
				}
				.right {
				
				}
			}
			.grid-text {
				font-size: 10px;
				font-family: SourceHanSansSC-Normal, SourceHanSansSC;
				font-weight: 400;
				color: #363132;
				margin-top: 2rpx;
			}
		}
	}
</style>
