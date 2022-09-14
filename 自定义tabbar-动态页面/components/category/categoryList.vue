<template>
	<view  >
		<view   class="long-categories">
<!-- 左边商品类别 -->
			<view   class="left">
				<scroll-view  class="left-scroll"	:scroll-with-animation="true" scroll-y  :style="'height:'+(scrollViewHeight-15)+'px'">
					<view     v-for="(item,index) in list" :key="index"
							class="left-item u-line-1"  :class="{'left-item-active': index == active }"
							@click="categoryClick(item, index)">
						<text :style="item.gcName.length>5?'font-size:26rpx':''">{{ item.gcName }}</text>
					</view>
				</scroll-view>
			</view>
<!-- 右边商品列表 -->
			<view   class="right">
				<!--  @scroll="scroll"   -->
				<scroll-view scroll-y class="right-scroll"
					:style="'height:'+scrollViewHeight+'px'"
					scroll-with-animation  :scroll-into-view="cIndex"
					:lower-threshold="10"  @scrolltolower="scrollToBottom">
					<view   class="right-container" v-for="(item,index) in list" :key="index">
						<!-- 类别名称,不能删,索引在此 -->
						<view   class="category-name" :id="`cid${ item.gcId }`">
							<view  >
								<text style="color: red;font-weight: bold;margin-right: 10rpx;">|</text>
								<text class="txt">{{item.gcName}}</text>
							</view>
						</view>
						<!-- 商品列表 -->
						<view   class="category-content" v-if="item.children!=null&&item.children.length>0">
							<view   	v-for="(child, index1) in item.children"  :key="index1"  class="right-item"	 @tap="checkedItem(child)"
									:class="{'right-item-active': child.gcId==currentSelectId, 'right-item-disable': child.enabled==false}">
									<!-- 商品头像 -->
									<view   class="good-img"  :style="'width:'+goodImageSize+'px;height:'+goodImageSize+'px'">
										<!-- :src="child.gcPic" -->
										<u-image border-radius="10"  width="100%" height="100%"
												:fade="true" duration="500"
												:src="'/static/image/birthdayCake/'+index1+'.jpg'" >
											<u-loading slot="loading"></u-loading>
										</u-image>
									</view>
									<!-- 商品名称 -->
									<view    class="good-name" :class="{'good-name-disable': child.enabled==false}">{{ child['gcName'] }}</view>
							</view>
						</view>
						<view   v-else class="activityEmpty">
							<view   style="color:#C0C4CC;">亲，暂无展示</view>
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "category",
		data() {
			return {
				height: 0,
				active: 0,
				cIndex: '',
				topList: [],
				currentSelectId:"",
				selectedGoods:[],
				goodImageSize:0,
			}
		},
		props: {
			scrollViewHeight: {
				type: [Number],
				default:uni.getSystemInfoSync().screenHeight-230
			},
			list: {
				type: Array,
				default: () => {
					return []
				}
			},
			maxSelected: {
				type: [String, Number],
				default: '-1'
			}
		},
		methods: {
			//点击分类
			categoryClick(category, index) {
				console.log("category.id",category.gcId);
				console.log("index",index);
				this.$nextTick(() => {
					this.cIndex = `cid${ category.gcId }`
				})
				this.cIndex = '';
				this.active = index;
			},
			//选中商品
			checkedItem:function(childItem){
				//console.log("触摸",childItem);
				if(this.currentSelectId!==childItem.gcId){
					this.currentSelectId=childItem.gcId;
				}
				this.$emit('change',JSON.parse(JSON.stringify(childItem)))
			},
			//滑动到底部
			scrollToBottom () {
				console.log("到底部了");
				return;
				setTimeout(()=>{
					this.active = this.list.length - 1
				}, 50)
			},

		},
		mounted() {
			let windowWidth= this.$u.sys().windowWidth;
			let rightAreaWidth= windowWidth*0.8;
			let imageWidth=rightAreaWidth*0.25*0.8;
			console.log("imageWidth",parseInt(imageWidth));
			this.goodImageSize=imageWidth;
		}
	}
</script>

<style lang="less" scoped>
	.long-categories {
		display: flex;
		width: 100%;
		flex-wrap: wrap;
		color: #363132;
		font-family: SourceHanSansCN-Regular, SourceHanSansCN;
		//border: 1px solid red;
	}

	.left {
		width: 25%;
		background: #FFFFFF;
		padding-left: 2rpx;
		border-top: 1px solid #d8d8d8;
		border-right: 1px solid #d8d8d8;
		padding-top: 30rpx;
		.left-scroll{
			::-webkit-scrollbar{
				display: none;
				width: 0;
				height: 0;
			}
		}
	}

	.left-item {
		height: 60upx;
		font-size: 30upx;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		margin-bottom: 40rpx;
		border-radius: 50%;
		margin-left: 10rpx;
		margin-right: 10rpx;
	}

	.left-item-active {
		background: red;
		color: #ffffff;
		//font-weight: bold;
		border-radius: 24upx;
	}

	.right {
		width: 75%;
		background: #FFFFFF;
		border-top: 1px solid #d8d8d8;
		//border-left: 1px solid #d8d8d8;
		.right-scroll{
			::-webkit-scrollbar{
				display: none;
				width: 0;
				height: 0;
			}
		}
	}

	.right-container {
		.category-name {
			padding: 20upx;
			text-align: left;
			.txt {
				padding: 0 8upx;
				display: inline-block;
				vertical-align: middle;
				font-weight: bold;
				letter-spacing: 1px;
				font-size: 32rpx;
				//color:#909399 ;
			}
		}
		.category-content {
			display: flex;
			flex-direction: row;
			justify-content: flex-start;
			align-items: center;
			flex-wrap: wrap;
		}

		.activityEmpty{
			margin: 0rpx 20rpx;
			padding: 20rpx;
			background-color: #F7f7F7;
			display: flex;
			flex-direction: column;
			justify-content: space-around;
			align-items: center;
		}

	}

	.right-item {
		margin-left: 12upx;
	//	margin-bottom: 32upx;
		margin-bottom: 20upx;
		background: #FFFFFF;
	//	border: 1rpx solid #f9f9f9;
		border-radius: 16upx;
		font-size: 28upx;
		padding: 2px;
	//	height: 260rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
		//align-items:  flex-start;;

		.good-img{
			//width: 88%;
			margin: 4rpx 5%;
			//border: 1px solid red;
			//margin: 0rpx 5%;
			//height: 70%;
			//border: 1px solid black;
		}

		.good-name{
			//border: 1px solid red;
			text-align: center;
			width: 100%;
			//font-weight: bold;
			font-size: 24rpx;
			overflow: hidden;
			word-break: break-all;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 2;
		}
		.good-name-disable{
			opacity: 0.4;
		}
	}
	.right-item-active {
		border-color: #DCDFE6;
	}

	.right-item-disable {
		border-color: #f3f4f6;
		opacity: 0.8;
	}

	.active {
		color: #F24544;
	}
</style>
