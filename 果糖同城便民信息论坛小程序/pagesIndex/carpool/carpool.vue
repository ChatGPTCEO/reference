<template>
	<view>
		<u-swiper :list="initData.car_banner" height="400"></u-swiper>
		<view class="carcont">
			<view class="cartab">
				<view class="tab" @click="changeTab(0)"
					:style="{'background':currentTab==0?'':'url('+leftbtn+')','background-size':currentTab==0?'':'100% 120rpx','color':currentTab==0?'#00c4cc':'white'}">
					<text>车找人</text>
				</view>
				<view class="tab" @click="changeTab(1)"
					:style="{'background':currentTab==1?'':'url('+rightbtn+')','background-size':currentTab==1?'':'100% 120rpx','color':currentTab==1?'#ff7115':'white'}">
					<text>人找车</text>
				</view>
			</view>
			<view class="contbox">
				<view class="form">
					<view class="cell">
						<u-image width="30rpx" height="30rpx" :src="require('../images/start.png')"></u-image>
						<text class="label">出发城市</text>
						<u-input v-model="form.start_area" @click="startAreaShow = true" disabled placeholder="请输入" />
					</view>
					<view class="cell">
						<u-image width="30rpx" height="30rpx" :src="require('../images/end.png')"></u-image>
						<text class="label">到达城市</text>
						<u-input v-model="form.end_area" @click="endAreaShow = true" disabled placeholder="请输入" />
					</view>
				</view>
				<view class="change">
					<u-image width="80rpx" height="80rpx" @click="swichArea" :src="require('../images/switch.png')">
					</u-image>
				</view>
			</view>
			<view class="btnbox" v-if="currentTab==0">
				<view class="btn" @click="toSelect" style="background-color: #00c4cc;">
					<text>查询车主</text>
				</view>
			</view>
			<view class="btnbox" v-if="currentTab==1">
				<view class="btn" @click="toSelect" style="background-color: #ff7115;">
					<text>查询乘客</text>
				</view>
			</view>
		</view>
		<view class="list" v-for="(item,index) in listData" :key="index" @click="$u.route('/pagesIndex/carpoolmain/carpoolmain',{id:item.id})">
			<text class="time">出发时间：{{item.go_time_text}}</text>
			<view class="cell" v-if="currentTab==0">
				<u-image width="30rpx" height="30rpx" :src="require('../images/path.png')"></u-image>
				<text class="label">车主信息：</text>
				<text>{{item.person_name}}</text>
			</view>
			<view class="cell">
				<u-image width="30rpx" height="30rpx" :src="require('../images/start.png')"></u-image>
				<text class="label">出发城市：</text>
				<text>{{item.start_area}}-{{item.start_address}}</text>
			</view>
			<view class="cell">
				<u-image width="30rpx" height="30rpx" :src="require('../images/end.png')"></u-image>
				<text class="label">到达城市：</text>
				<text>{{item.end_area}}-{{item.end_address}}</text>
			</view>
			<view class="bot" v-if="currentTab==0">
				<view class="cell">
					<u-image width="30rpx" height="30rpx" :src="require('../images/path.png')"></u-image>
					<text class="label">空余座位：</text>
					<text>{{item.seat_num}}个</text>
				</view>
				<view class="btn">
					<text>电话联系</text>
				</view>
			</view>
			<view class="bot" v-else>
				<view class="cell">
					<u-image width="30rpx" height="30rpx" :src="require('../images/path.png')"></u-image>
					<text class="label">乘车人数：</text>
					<text>{{item.person_num}}人</text>
				</view>
				<view class="btn">
					<text>电话联系</text>
				</view>
			</view>
		</view>
		<u-loadmore :status="status" />
		<block v-if="areaSelector.length>0">
			<u-select v-model="startAreaShow" mode="mutil-column-auto" value-name="id" label-name="name"
				:list="areaSelector" @confirm="startAreaConfirm"></u-select>
			<u-select v-model="endAreaShow" mode="mutil-column-auto" value-name="id" label-name="name"
				:list="areaSelector" @confirm="endAreaConfirm"></u-select>
		</block>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				status: 'loadmore',
				currentTab: 0,
				endAreaShow: false,
				startAreaShow: false,
				areaSelector: [],
				list: [{
						image: 'https://cdn.uviewui.com/uview/swiper/1.jpg',
						title: '昨夜星辰昨夜风，画楼西畔桂堂东'
					},
					{
						image: 'https://cdn.uviewui.com/uview/swiper/2.jpg',
						title: '身无彩凤双飞翼，心有灵犀一点通'
					},
					{
						image: 'https://cdn.uviewui.com/uview/swiper/3.jpg',
						title: '谁念西风独自凉，萧萧黄叶闭疏窗，沉思往事立残阳'
					}
				],
				leftbtn: require('../images/position-title-left.png'),
				rightbtn: require('../images/position-title-right.png'),
				form: {
					type: '1',
					start_area: '',
					end_area: '',
					start_area_id: '',
					end_area_id: '',
					page: 1,
				},
				initData: {
					car_banner: []
				},
				listData: [],
			};
		},
		onLoad() {
			if (!uni.getStorageSync('initData')) {
				this.$u.get('/addons/hicity/index/init', {

				}).then(res => {
					this.initData = res;
					uni.setStorageSync('initData', res);
				})
			} else {
				let res = uni.getStorageSync('initData');
				this.initData = res;
			}
			this.getCity()
			this.getList()
		},
		onReachBottom() {
			if (this.status != 'nomore') {
				this.form.page++;
				this.getList();
			}
		},
		onShareAppMessage() {
		
		},
		methods: {
			getCity() {
				this.$u.get('/addons/hicity/index/getCity', {

				}).then(res => {
					this.areaSelector = res;
				})
			},
			changeTab(index) {
				this.currentTab = index;
				this.form.type = index + 1;
				this.form.page = 1;
				this.listData = [];
				this.getList()
			},
			getList() {
				this.status = 'loading';
				this.$u.get('/addons/hicity/carpool/list', this.form).then(res => {
					this.listData = this.listData.concat(res);
					if (res.length < 10) {
						this.status = 'nomore'
					} else {
						this.status = 'loadmore'
					}

				})
			},
			toSelect() {
				this.form.page = 1;
				this.listData = [];
				this.getList()
			},
			startAreaConfirm(e) {
				this.form.start_area_id = e[2].value;
				this.form.start_area = e[2].label;
			},
			endAreaConfirm(e) {
				this.form.end_area_id = e[2].value;
				this.form.end_area = e[2].label;
			},
			swichArea() {
				let start_area = this.form.start_area;
				let start_area_id = this.form.start_area_id;
				let end_area = this.form.end_area;
				let end_area_id = this.form.end_area_id;
				this.form.start_area = end_area;
				this.form.start_area_id = end_area_id;
				this.form.end_area = start_area;
				this.form.end_area_id = start_area_id;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.carcont {
		background-color: white;
		margin-left: 20rpx;
		margin-right: 20rpx;
		margin-top: -100rpx;
		z-index: 10;
		position: relative;
		border-radius: 20rpx;

		.cartab {
			display: flex;
			flex-direction: row;
			align-items: center;
			border-radius: 20rpx;

			.tab {
				flex: 1;
				height: 120rpx;
				background-color: white;
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: center;
				border-radius: 20rpx;
				font-size: 32rpx;
			}
		}

		.contbox {
			position: relative;

			.form {
				display: flex;
				flex-direction: column;

				.cell {
					display: flex;
					flex-direction: row;
					align-items: center;
					margin-left: 20rpx;
					margin-right: 20rpx;
					padding: 20rpx;
					border-bottom: 1rpx solid #e6e6e6;

					.label {
						padding-left: 20rpx;
						padding-right: 20rpx;
						font-size: 30rpx;
					}
				}
			}

			.change {
				position: absolute;
				right: 20rpx;
				top: 70rpx;
				background-color: white;
			}
		}

		.btnbox {
			margin: 30rpx 20rpx;
			padding-bottom: 30rpx;

			.btn {
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: center;
				height: 100rpx;
				border-radius: 50rpx;
				color: white;
			}
		}
	}

	.list {
		display: flex;
		flex-direction: column;
		background-color: white;
		margin-left: 20rpx;
		margin-right: 20rpx;
		margin-bottom: 20rpx;
		padding: 20rpx;
		border-radius: 20rpx;

		.time {
			font-size: 35rpx;
			font-weight: 600;
			padding: 10rpx;
		}

		.cell {
			display: flex;
			flex-direction: row;
			align-items: center;
			padding: 10rpx;

			.label {
				padding-left: 20rpx;
				padding-right: 10rpx;
				font-size: 30rpx;
			}
		}

		.bot {
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: space-between;

			.btn {
				border: 1px solid #fe9c01;
				padding: 8rpx 20rpx;
				border-radius: 30rpx;
				color: #fe9c01;
			}
		}
	}
</style>
