<template>
	<view class="container">
		<!-- 城市列表 -->
		<view class="city-search-wrap">
			<view class="search">
				<view class="searchCon">
					<view class="searchView">
						<uni-icons type="search" size="16" color="#8e8f97" class="searchIcon"></uni-icons>
						<input
							v-if="isReach"
							class="input-search"
							type="text"
							:value="inputValue"
							placeholder="输入城市名或拼音"
							placeholder-style="color:#8E8F97"
							:focus="searchFocus"
							@input="searchChange"
						/>
						<input v-show="!isReach" class="input-search" type="text" placeholder="输入城市名或拼音" placeholder-style="color:#8E8F97" @focus="isReach = true" />
					</view>
					<uni-icons v-if="isReach" type="closeempty" size="16" color="#8e8f97" @click="inputClear"></uni-icons>
				</view>
				<button class="r-cancel" open-type="navigateBack" delta="1" @click="isReach = false">取消</button>
			</view>
			<!-- 搜索列表  -->
			<view class="reach-content" v-show="isReach">
				<block v-show="searchData.length">
					<view class="li" v-for="item in searchData" :key="item.code" @click="citySearchList(item)">{{ item.city }}</view>
				</block>
				<view class="has-no-data" v-show="hasNoData">没有找到匹配数据~</view>
			</view>
		</view>
		<view v-show="!isReach">
			<scroll-view class="scroll-view" scroll-y scroll-with-animation="true" enable-back-to-top="true" :scroll-into-view="toIndex" @scroll="scrollHandle">
				<view class="block">
					<!-- 当前定位 -->
					<view class="area list-item" id="location">
						<view class="title-wrapp">
							<view class="title"><text>当前定位</text></view>
						</view>
						<view class="ul">
							<view v-if="location.city" class="li" @click="selectCurrentCity(location)">{{ location.city }}</view>
							<view v-else class="li relocation" @click="reLocation()">点击重新定位</view>
						</view>
					</view>
					<!-- 热门城市 -->
					<view class="area list-item" id="hot">
						<view class="title-wrapp">
							<view class="title"><text>热门城市</text></view>
						</view>
						<view class="ul" v-if="hotcites.length">
							<view class="li" hover-class="hover" v-for="item in hotcites" :key="item.code" @click="selectOpenCity(item)">{{ item.city }}</view>
						</view>
					</view>
				</view>
				<!-- 城市列表  -->
				<view class="city-list">
					<view class="list list-item" v-for="(item, key) of cities" :key="key" :id="key">
						<view class="title">{{ key }}</view>
						<view class="item" hover-class="hover" v-for="innerItem in item" :key="innerItem.code" @click="selectCity(innerItem)">{{ innerItem.city }}</view>
					</view>
				</view>
			</scroll-view>

			<!-- 字母列表 -->
			<view class="alphabet" @touchstart="touchStart" @touchend="touchEnd" @touchmove.stop="touchMove">
				<view v-for="(item, index) in alphabet" :key="index" @touchstart="getLetter" @touchend="setLetter" :id="item">
					<view class="item" :class="{ active: currentLetter == item }">{{ item }}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import amap from '@/common/amap-wx.js';
export default {
	// props: {
	// 	hotcites: Array,
	// 	cities:Array,
	// 	alphabet:Array
	// },
	data() {
		return {
			isIPX: null,
			regionId: null, //区域ID
			isReach: false,
			inputValue: '',
			searchData: [], //搜索的数据
			cityId: null, //城市ID
			cityName: null, //城市名
			location: { city: '北京', code: '370322' }, //定位城市
			hotcites: [], //热门城市,模拟数据请自行修改
			cities: [], //城市列表,拟数据请自行修改
			alphabet: [], //字母列表
			toIndex: '', //跳转的索引的字母
			tipsLetter: '', //滑动显示字母
			timer: null,
			hasNoData: false,
			searchFocus: false,
			letterDetails: [],
			currentLetter: ''
		};
	},
	watch: {
		// 城市搜索输入框
		inputValue(newVal) {
			if (this.timer) {
				clearTimeout(this.timer);
			}

			if (!this.inputValue) {
				this.searchData = [];
				return;
			}
			this.timer = setTimeout(() => {
				const result = [];
				for (let i in this.cities) {
					this.cities[i].forEach(item => {
						if (item.py.includes(this.inputValue) || item.city.includes(this.inputValue)) {
							result.push(item);
						}
					});
				}
				this.searchData = result;
				if (this.searchData.length === 0) {
					this.hasNoData = true;
				} else {
					this.hasNoData = false;
				}
			});
		},
		isReach(val) {
			this.searchFocus = val;
		}
	},
	created() {
		this.location = getApp().globalData.currentLocation;
		this.location.code=this.location.citycode;
		this.location.pcode=this.location.pcitycode;
		this.getCityList();
	},
	methods: {
		reLocation() {
			//高德地图插件
			let myAmapFun = new amap.AMapWX({
				key: '102dcab15e743584f73d383dea7530e7'
			});
			let that = this;
			myAmapFun.getRegeo({
				success: function(data) {
					//成功回调
					console.log('定位信息：', data);
					let mlocation = {
						latitude: data[0].latitude,
						longitude: data[0].longitude,
						pcity: data[0].regeocodeData.addressComponent.city,
						city: data[0].regeocodeData.addressComponent.district,
						citycode: data[0].regeocodeData.addressComponent.adcode + '000000',
						pcitycode: data[0].regeocodeData.addressComponent.adcode.substr(0, 4) + '00000000'
					};
					getApp().globalData.location = mlocation;
					getApp().globalData.currentLocation = mlocation;
					that.location = getApp().globalData.currentLocation;
				},
				fail: function(info) {
					//失败回调
					console.log(info);
				}
			});
		},

		async getCityList() {
			uni.showLoading();
			let res = await this.$apis.getCityList(this.query);
			console.log('getCityList', res);
			this.hotcites = res.hotcity;
			this.alphabet = res.alphabet;
			this.cities = res.citys;
			uni.hideLoading();
		},

		//列表滚动，和右边字母表对应
		scrollHandle(e) {
			let view = uni
				.createSelectorQuery()
				.in(this)
				.selectAll('.list-item');
			view.boundingClientRect(d => {
				let top = d[0].top;
				d.forEach(item => {
					item.top = item.top - top;
					item.bottom = item.bottom - top;
					this.letterDetails.push({
						id: item.id,
						top: item.top,
						bottom: item.bottom
					});
				});
			}).exec();

			const scrollTop = e.detail.scrollTop;
			this.letterDetails.some(item => {
				if (scrollTop >= item.top && scrollTop <= item.bottom - 20) {
					this.currentLetter = item.id;
					return true;
				}
			});
		},

		//搜索
		searchChange(e) {
			let { value } = e.detail;
			this.inputValue = value;
		},

		//搜索结果列表数据
		citySearchList(item) {
			console.log('选择的城市：', item);
			this.$emit('selectCity', item);
		},
		inputClear(e) {
			this.isReach = false;
			this.inputValue = '';
		},
		selectCurrentCity(loc) {
			console.log('selectCurrentCity==', loc);
			this.$emit('selectCity', loc);
		},
		selectOpenCity(item) {
			this.$emit('selectCity', item);
		},
		selectCity(item) {
			this.$emit('selectCity', item);
			//当前项目是需要选择到区域，所以选择城市后回到区县的地方
			this.toIndex = 'area';
			setTimeout(() => {
				this.toIndex = '';
			}, 1000);
		},

		//触发开始
		touchStart(e) {
			console.log(e);
		},
		//移动时
		touchMove(e) {
			// uni.vibrateShort();
			let y = e.touches[0].clientY;
			let offsettop = e.currentTarget.offsetTop;
			//判断选择区域,只在选择区才会生效
			if (y > offsettop) {
				let num = parseInt((y - offsettop) / 15); //右边每个字母元素的高度
				let letter = this.alphabet[num];
				this.tipsLetter = letter;
				let curentLetter = this.letterTransform(letter);
				uni.showToast({
					title: curentLetter,
					icon: 'none',
					duration: 1000
				});
			}
		},
		//触发结束
		touchEnd() {
			this.toIndex = this.tipsLetter;
		},
		//移动开始获取字母，并放大提示
		getLetter(e) {
			// uni.vibrateShort();
			let { id } = e.currentTarget;
			this.tipsLetter = id;

			let curentLetter = this.letterTransform(id);
			uni.showToast({
				title: curentLetter,
				icon: 'none',
				duration: 1000
			});
		},
		//移动结束设置字母，赋值到toIndex
		setLetter() {
			this.toIndex = this.tipsLetter;
		},
		//提示字母转换
		letterTransform(letter) {
			let str = letter;
			return str;
		}
	}
};
</script>

<style lang="scss" scoped>
button::after {
	border: none;
}

.container {
	// padding-top: 20rpx;
}

.city-search-wrap {
	width: 100%;
	// padding: 0 30rpx;
	box-sizing: border-box;
	// margin-bottom: 20rpx;
	background-color: #ffffff;
	// padding: 10upx 20upx;
	.search {
		padding: 10upx 20upx;
		width: 100%;
		background-color: $main-color;
		display: flex;
		align-items: center;
		justify-content: space-between;
		color: #222;
		box-sizing: border-box;

		.searchCon {
			flex: 1;
			background: #f4f5f9;
			border-radius: 60rpx;
			padding: 10rpx 30rpx;
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;

			.searchView {
				display: flex;
				flex-direction: row;
				align-items: center;

				.input-search {
					padding-left: 20rpx;
					font-size: 28rpx;
				}
			}
		}

		.r-cancel {
			margin-left: 28rpx;
			padding-right: 30rpx;
			padding: 0;
			font-size: 30rpx;
			background: transparent;
			color: #ffffff;
		}
	}
}

.reach-content {
	padding: 10rpx 20rpx;

	.li {
		font-size: 32rpx;
		color: #333;
		padding: 20rpx 0;
		border-bottom: 2rpx solid #eaeaea;
	}
}

.block {
	padding: 0 30rpx;
	box-sizing: border-box;
}

.scroll-view {
	width: 100%;
	height: calc(100vh - 80rpx);
	box-sizing: border-box;
}

.area {
	margin-top: 20rpx;

	.title-wrapp {
		position: sticky;
		top: 0;
		left: 0;
		background: #fff;
	}

	.title {
		width: 100%;
		box-sizing: border-box;
		font-size: 40rpx;
		font-weight: 500;
		color: #222;
		font-size: 30rpx;
		font-weight: 500;
		// margin-bottom: 10rpx;
		display: inline-flex;
		justify-content: space-between;
		align-items: center;

		.r {
			font-size: 24rpx;
			color: #8e8f97;
			display: inline-block;
			align-items: center;

			.iconfont {
				font-size: 24rpx;
			}
		}
	}

	.ul {
		display: flex;
		flex-wrap: wrap;
		.li {
			width: 202rpx;
			padding: 0 10rpx;
			box-sizing: border-box;
			height: 65rpx;
			line-height: 65rpx;
			text-align: center;
			font-size: 26rpx;
			color: #222;
			border-radius: 10rpx;
			margin: 20rpx 20rpx 0 0;
			background: #f4f5f9;
		}

		.hover {
			background: #c1c2cd;
		}

		.relocation {
			color: $main-color;
		}
	}
}

.city-list {
	width: 677rpx;
	margin-top: 30rpx;

	.title {
		height: 60rpx;
		line-height: 60rpx;
		font-size: 30rpx;
		font-weight: 500;
		color: #272636;
		background: #f4f5f9;
		margin-bottom: 20rpx;
		padding-left: 30rpx;
		position: sticky;
		top: 0;
		left: 0;
		z-index: 2;
	}

	.item {
		padding: 24rpx 0 24rpx 30rpx;
		color: #333;
		font-size: 32rpx;
		font-weight: 500;

		&::after {
			left: 30rpx;
			width: calc(100% - 30rpx);
			background: #d2d2d2;
		}
	}

	.hover {
		background: #f4f5f9;
	}
}

.alphabet {
	position: fixed;
	right: 0;
	bottom: 10%;
	width: calc(750rpx - 680rpx);
	text-align: center;
	font-size: 20rpx;
	color: #999;

	.item {
		height: 35rpx;
		line-height: 35rpx;
	}

	.active {
		font-weight: 700;
		color: $main-color;
	}
}

.has-no-data {
	font-size: 24rpx;
	text-align: center;
	color: #8e8f97;
	margin-top: 50rpx;
}
</style>
