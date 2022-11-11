<template>
	<view>
		<!-- 加载动画 -->
		<orange-fullloading
			text="加载中"
			:loadshow="loadingStatus">
		</orange-fullloading>
		<view class="page-tip bg-success">长按可对地址进行操作</view>
		<view class="bg-white ml-2 mr-2 mt-2 rounded"
					v-for="(item,index) in userReceivingAddress" :key="item.id" @tap="listTap(item)"
					@longpress="addressLongClick($event,item)" :class="{'active':pickerAddressIndex==index}"
		>
			<view class="row-ac-sb">
				<view class="ml-2 font-s-5 pt-2">收货地址:<text v-if="item.is_default" class="ml-3 default-address text-main-color font-s-3">默认地址</text></view>
				<view class="iconfont icon-icon- text-light-grey font-s-7 mr-2 mt-2" @tap.stop="toEditAddress(item)"></view>
			</view>
			<view class="row-ac-sb  pt-2 pb-3">
				<view class="row-ac">
					<view class="iconfont icon-dizhi1 rounded-50 row bg-primary ml-2 font-s-8" style="width: 80rpx;height: 80rpx; "></view>
					<view class="ml-2">
						<view>{{item.contact_name}} <text class="ml-3">{{item.contact_phone}}</text></view>
						<view class="text-secondary font-s-3">{{item.province}}{{item.city}}{{item.district}}{{item.address}}</view>
					</view>
				</view>
			</view>
		</view>
		<view class="w-100 bg-color rounded row font-s-5 fixed-bottom" style="height: 90rpx;" @click="toAddAddress">
			新增收货地址
		</view>
		<view class="shade" v-show="showShade" @tap="hidePop">
			<view class="pop" :style="popStyle" :class="{'show':showPop}">
				<view v-for="(item,index) in popButton" :key="index" @tap.stop="pickerMenu" :data-index="index">{{item}}</view>
			</view>
		</view>
	</view>
</template>

<script>
import {getUserReceivingAddressUrl,deleteUserReceivingAddressUrl,setDefaultUserReceivingAddressUrl} from '@/api/index'
export default {
	components: {

	},
	data(){
		return{
			userReceivingAddress:[],
			/* 选择的地址的下标 */
			pickerAddressIndex: -1,
			/* 窗口尺寸 */
			winSize: {},
			/* 显示遮罩 */
			showShade: false,
			/* 显示操作弹窗 */
			showPop: false,
			/* 弹窗按钮列表 */
			popButton: ["删除地址", "设为默认地址"],
			/* 弹窗定位样式 */
			popStyle: "",
			// 长按选中的id
			longTapItemId:'',
			pageType:'',
			// 长按是否是默认地址
			isDefaultAddress:false,
			loadingStatus: true
		}
	},
	onLoad(options) {
		this.initData(options);
		this.getWindowSize();
		this.chooseAddressType(options)
		// #ifdef H5
		document.onLong = function(e) {
			var e = e || window.event;
			e.preventDefault();
		};
		// #endif
	},
	onShow(){
		this.initData();
		this.getWindowSize();
		// #ifdef H5
		document.onLong = function(e) {
			var e = e || window.event;
			e.preventDefault();
		};
		// #endif
	},
	methods:{
		async initData(options){
			await this.getUserReceivingAddressList()
			// 异步延迟加载
			setTimeout(() => {
				this.loadingStatus = false
			}, 100)
		},
		// 如果是从选择地址页面进来的
		chooseAddressType(options){
			console.log(options)
			if(options.type === 'chooseAddress'){
				this.pageType = 'chooseAddress'
			}
		},
		// 获取用户地址列表
		getUserReceivingAddressList(){
			this.$R.get(getUserReceivingAddressUrl).then(res=>{
				this.userReceivingAddress = res.data

				if(this.userReceivingAddress.length>0){
					// 把默认地址放在第一个
					let defaultAddress = ''
					for(let i =0; i<this.userReceivingAddress.length;i++){
						if(this.userReceivingAddress[i].is_default == 1){
							defaultAddress= this.userReceivingAddress.splice(i,1)
							// 把默认地址放到缓存中，用于后面调用
							uni.setStorage({
								key: 'defaultAddress',
								data: defaultAddress[0],
							})
							this.userReceivingAddress.splice(0,0,defaultAddress[0])
						}
					}

				}

			})
		},

		/* 列表触摸事件 */
		listTap(addressInfo) {
			/* 因弹出遮罩问题，所以需要在遮罩弹出的情况下阻止列表事件的触发 */
			if (this.showShade) {
				return;
			}
			// 如果是从创建订单页面列表点击进入
			if(this.pageType === 'chooseAddress'){
					// 把选中的地址加到store中
					this.$store.commit('toOnceChooseAddressChange',addressInfo)
					// 关闭当前页面，返回上一页
					uni.navigateBack({
						delta: 1
					})
			}
		},
		/* 获取窗口尺寸 */
		getWindowSize() {
			uni.getSystemInfo({
				success: (res) => {
					this.winSize = {
						"witdh": res.windowWidth,
						"height": res.windowHeight
					}
				}
			})
		},
		/* 长按监听 */
		addressLongClick(e,addressItem) {
			let [touches, style, index] = [e.touches[0], "", e.currentTarget.dataset.index];
			this.isDefaultAddress = false
			/* 因 非H5端不兼容 style 属性绑定 Object ，所以拼接字符 */
			if (touches.clientY > (this.winSize.height / 2)) {
				style = `bottom:${this.winSize.height-touches.clientY}px;`;
			} else {
				style = `top:${touches.clientY}px;`;
			}
			if (touches.clientX > (this.winSize.witdh / 2)) {
				style += `right:${this.winSize.witdh-touches.clientX}px`;
			} else {
				style += `left:${touches.clientX}px`;
			}
			console.log(addressItem)
			this.popStyle = style;
			this.pickerAddressIndex = Number(index);
			this.showShade = true;
			this.longTapItemId = addressItem.id
			// 如果长按的是默认地址
			if(addressItem.is_default){
				this.isDefaultAddress =true
			}
			this.$nextTick(() => {
				setTimeout(() => {
					this.showPop = true;
				}, 10);
			});
		},
		/* 隐藏弹窗 */
		hidePop() {
			this.showPop = false;
			this.pickerAddressIndex = -1;
			setTimeout(() => {
				this.showShade = false;
			}, 250);
		},
		/* 选择菜单 */
	 async pickerMenu(e) {
		 let index = Number(e.currentTarget.dataset.index);
		 if(index === 0){
			 // 第一个按钮删除地址事件
				let that = this;
				uni.showModal({
					title: '提示',
					content: '确定要从删除该地址吗？',
					success: function (res) {
						console.log(res)
						if (res.confirm) {
							that.$R.get(deleteUserReceivingAddressUrl, {address_id:that.longTapItemId}).then(res => {
								// 如果删除的是默认地址，把storage中的地址删除掉
								if(that.isDefaultAddress){
									uni.removeStorageSync('defaultAddress');
								}
								that.getUserReceivingAddressList();
							});
						}
					}
				});
			}else {
				// 第二个按钮设为默认地址点击事件
				this.$R.get(setDefaultUserReceivingAddressUrl, {address_id:this.longTapItemId}).then(res => {
					uni.showToast({
						title: '设置默认地址成功',
						icon: 'none',
						duration: 3000
					})
					this.getUserReceivingAddressList();
				});
			}
			/*
       因为隐藏弹窗方法中会将当前选择的用户下标还原为-1,
       如果行的菜单方法存在异步情况，请在隐藏之前将该值保存，或通过参数传入异步函数中
       */
			this.hidePop();
		},
		toEditAddress(item){
			item = JSON.stringify(item)
			uni.navigateTo({
				url: '/pages/user/configure/editaddress?addressData='+item,
			});
		},
		toAddAddress(){
			uni.navigateTo({
				url: '/pages/user/configure/editaddress',
			});
		}
	}
}
</script>

<style lang="scss">
	page{
		background-color: $uni-bg-color-grey;
	}
	.default-address{
		padding: 2rpx 4rpx;
		border: 1rpx solid;
		border-radius: 4rpx;
	}
	.page-tip{
		height: 60rpx;
		line-height: 60rpx;
		margin-bottom: 20rpx;
		text-align: center;
		color: #FFFFFF;
	}
	/* 遮罩 */
	.shade {
		position: fixed;
		z-index: 100;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		-webkit-touch-callout: none;

		.pop {
			position: fixed;
			z-index: 101;
			width: 260upx;
			box-sizing: border-box;
			font-size: 28upx;
			text-align: left;
			color: #333;
			background-color: #fff;
			box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
			line-height: 80upx;
			transition: transform 0.15s ease-in-out 0s;
			user-select: none;
			-webkit-touch-callout: none;
			transform: scale(0, 0);

			&.show {
				transform: scale(1, 1);
			}

			&>view {
				padding: 0 20upx;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				user-select: none;
				-webkit-touch-callout: none;

				&:active {
					background-color: #f3f3f3;
				}
			}
		}
	}
</style>
