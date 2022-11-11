<template>
	<view>
		<z-paging ref="paging" v-model="addRessList" @query="getPage" :auto="false">
			<cu-custom slot="top" bgColor="bg-red" :isBack="true">
				<block slot="backText">返回</block>
				<block slot="content">收货地址</block>
			</cu-custom>
			<view class="cu-list menu-avatar">
				<view class="cu-item" :class="modalName=='move-box-'+ index?'move-cur':''"
					v-for="(item,index) in addRessList" :key="index" @touchstart="ListTouchStart"
					@touchmove="ListTouchMove" @touchend="ListTouchEnd" :data-target="'move-box-' + index"
					@tap="selectAddRess(item)">
					<view class="cu-avatar round bg-red">
						<text>{{getNameFirst(item.addresseeName)}}</text>
					</view>
					<view class="content">
						<view class="text-grey">{{item.addresseeName}} <text>{{item.telephone}}</text>
							<view v-if="item.isDefault == '1'" class='cu-tag light bg-red'>默认</view>
						</view>
						<view class="text-gray text-sm">
							<text class="cuIcon-locationfill text-red  margin-right-xs"></text>
							{{item.provinceName +' ' +item.cityName +' ' + item.countyName  +' ' + item.detailAddress}}
						</view>
					</view>
					<view class="move">
						<view class="bg-grey" @tap="edit(item)">编辑</view>
						<view class="bg-red" @tap="del(item)">删除</view>
					</view>
				</view>
			</view>
			<view slot="bottom" class="cu-bar bg-white tabbar padding-lr" style="display: block !important">
				<button class="cu-btn shadow-blur block margin-sm round bottom-btn bg-red" @tap="addSub">添加新地址</button>
			</view>
		</z-paging>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				theme: getApp().globalData.theme,
				listTouchStart: 0,
				listTouchDirection: null,
				modalName: null,
				addRessList: [],
				isChoose: false,
			}
		},
		onLoad(option) {
			this.isChoose = option.isChoose
		},
		onShow() {
			getApp().initPage().then(res => {
				this.$nextTick(function() {
					this.$refs.paging.reload();
				})
			})
		},
		methods: {
			// ListTouch触摸开始
			ListTouchStart(e) {
				this.listTouchStart = e.touches[0].pageX
			},

			// ListTouch计算方向
			ListTouchMove(e) {
				this.listTouchDirection = e.touches[0].pageX - this.listTouchStart > 0 ? 'right' : 'left'
			},

			// ListTouch计算滚动
			ListTouchEnd(e) {
				if (this.listTouchDirection == 'left') {
					this.modalName = e.currentTarget.dataset.target
				} else {
					this.modalName = null
				}
				this.listTouchDirection = null
			},
			/**
			 * 获取收货人名称第一位
			 */
			getNameFirst(name) {
				let str = name.substr(0, 1);
				return str;
			},
			/**
			 * 分页查询
			 */
			getPage(pageNo, pageSize) {
				uni.$myRequest.addressPage({
					current: pageNo,
					size: pageSize,
					descs: 'create_time'
				}).then(res => {
					this.$refs.paging.complete(res.data.records);
				});
			},
			/**
			 * 选择收货地址
			 */
			selectAddRess(item) {
				if (this.isChoose) {
					var pages = getCurrentPages(); // 获取页面栈
					var prevPage = pages[pages.length - 2]; // 上一个页面
					prevPage.$vm.setUserAddress(item); //调用上一个页面的 setUserAddress 方法
					uni.navigateBack();
				}
			},
			/**
			 * 添加新地址事件
			 */
			addSub() {
				uni.navigateTo({
					url: '/pages/user/user-address/form/index?type=add'
				})
			},
			/**
			 * 编辑收货地址
			 */
			edit(row) {
				//跳转修改收货地址页
				uni.navigateTo({
					url: '/pages/user/user-address/form/index?userAddress=' + encodeURIComponent(JSON
						.stringify(row)) + "&type=edit"
				})
			},
			/**
			 * 删除收货地址
			 */
			del(row) {
				uni.showModal({
					content: '确认将这个地址删除吗？',
					cancelText: '我再想想',
					confirmColor: '#ff0000',
					success(res) {
						if (res.confirm) {
							uni.$myRequest.delUserAddress(row.id).then(res => {
								this.$refs.paging.reload();
							})
						}
					}

				});

			}
		}
	}
</script>

<style lang="scss">

</style>
