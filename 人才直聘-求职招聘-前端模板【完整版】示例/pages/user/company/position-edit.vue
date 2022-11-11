<template>
	<view class="content reg-page">
		<view class="input-group">
			<!-- <view class="input-row border-bottom-1px">
				<text class="title">职位种类</text>
				<uni-data-checkbox selectedColor="#12ae85" mode="button" v-model="position.positionType" :localdata="positionTypes"></uni-data-checkbox>
			</view> -->
			<view class="input-row border-bottom-1px">
				<text class="title">职位类型</text>
				<uni-data-checkbox mode="button" selectedColor="#12ae85" v-model="position.ifParttime" :localdata="ifParttime"></uni-data-checkbox>
			</view>
			<view class="input-column border-bottom-1px" @click="toPost()">
				<text class="title">职位名称</text>
				<view class="space-between-algin row padding-height-20">
					<input class="padding-10" disabled="true" placeholder="请选择职位名称" :value="selectPost.name" />
					<text class="yzb yzb-next"></text>
				</view>
			</view>
			<!-- <view class="input-column border-bottom-1px">
				<text class="title">职位名称</text>
				<view class="space-between-algin row padding-height-20">
					<input class="padding-10" placeholder="请先选择职位名称" :value="selectPost.name" />
					<text class="yzb yzb-next"></text>
				</view>
			</view> -->
			<view class="input-column border-bottom-1px">
				<text class="title">学历</text>
				<view class="picker">
					<picker @change="bindPickerChange2" :value="position.minEducation" :range="educations">
						<input class="padding-10" disabled="true" placeholder="请选择学历" :value="position.minEducation" />
					</picker>
					<text class="yzb yzb-next"></text>
				</view>
			</view>
			<view class="input-column border-bottom-1px">
				<text class="title">经验要求</text>
				<view class="picker">
					<picker @change="bindPickerChange3" :value="position.expRequire" :range="expRequires">
						<input placeholder="请选择经验要求" disabled="true" :value="position.expRequire" />
					</picker>
					<text class="yzb yzb-next"></text>
				</view>
			</view>
			<view class="input-column border-bottom-1px">
				<text class="title">薪资要求</text>
				<view class="picker">
					<picker @change="bindPickerChange" :value="position.salary" :range="salaeyArray">
						<input disabled="true" placeholder="请选择薪资要求" :value="position.salary" />
					</picker>
					<text class="yzb yzb-next"></text>
				</view>
			</view>

			<view class="input-column border-bottom-1px" v-if="position.positionType == 3">
				<text class="title">共享日期</text>
				<view class="row space-between-algin">
					<picker mode="date" :value="position.startDate" :start="startDate" :end="endDate" @change="bindDate1Change">
						<input class="padding-10" disabled="true" placeholder="请选择开始日期" :value="formatDates(position.startDate)" />
					</picker>
					至
					<picker mode="date" :value="position.endDate" :start="startDate" :end="endDate" @change="bindDate2Change">
						<input class="padding-10" disabled="true" style="text-align: center;" placeholder="请选择结束日期" :value="formatDates(position.endDate)" />
					</picker>
				</view>
			</view>
			<view class="input-column border-bottom-1px" v-if="position.positionType == 3">
				<text class="title">可用工期</text>
				<view class="space-between-algin row padding-height-20">
					<input class="padding-10" disabled="true" placeholder="选择共享日期自动计算(天)" :value="position.workDays" />
					<text class="yzb yzb-next"></text>
				</view>
			</view>
			<view class="input-column border-bottom-1px" v-if="position.positionType == 3">
				<text class="title">共享人数</text>
				<view class="space-between-algin row padding-height-20">
					<input class="padding-10" placeholder="请输入共享人数" v-model="position.shareNumber" />
					<text class="yzb yzb-next"></text>
				</view>
			</view>

			<view class="input-column border-bottom-1px">
				<text class="title">分享佣金</text>
				<view class="space-between-algin row padding-height-20">
					<input class="padding-10" placeholder="请输入分享佣金,如无佣金则默认0,单位元" v-model="position.shareMoney" />
					<text class="yzb yzb-next"></text>
				</view>
			</view>

			<view class="input-column border-bottom-1px" @click="toWorkContent">
				<text class="title" v-if="position.positionType == 3">用工描述</text>
				<text class="title" v-else>职位描述</text>
				<view class="space-between-algin row padding-height-20">
					<input class="padding-10" disabled="true" placeholder="请输入描述信息" v-model="position.descr" />
					<text class="yzb yzb-next"></text>
				</view>
			</view>

			<view class="input-column border-bottom-1px">
				<text class="super-title">职位关键词</text>
				<view class="skill-item">
					<view class="center-algin skill-item-item" v-for="(item, index) in keys" :key="index">
						<text class="item text-blue" @click="select(index)">{{ item }}</text>
						<view class="img_delete center-algin" @click="deleteImg(index)"><text class="text-white text-size-base text-color-inverse">X</text></view>
					</view>
					<text class="item text-normal" @click="confirmDialog">+ 添加</text>
				</view>
			</view>
			<view class="input-column border-bottom-1px" @click="selectAddress">
				<text class="title">工作地点</text>
				<view class="input-item">
					<input class="padding-10" placeholder="请选择工作地点" disabled="true" v-model="position.addressName" />
					<text class="yzb yzb-next"></text>
				</view>
				<text class="padding-width-10 text-color-grey text-size-base">{{ position.address }}</text>
			</view>
			<view class="input-column border-bottom-1px">
				<text class="title">工作点门牌号</text>
				<view class="input-item"><input class="padding-10" placeholder="请输入门牌号" v-model="position.addressHouse" /></view>
			</view>
		</view>
		<view class="btn-row row top-line">
			<button v-if="id" type="warn" class="btn-delete" @tap="remove">删除</button>
			<button type="primary" class="btn-save" :class="id ? 'width-55' : 'width-90'" @tap="register">保存</button>
		</view>

		<!-- 提交信息 -->
		<uni-popup id="dialogInput" ref="dialogInput" type="dialog">
			<uni-popup-dialog
				id="dialogInput2"
				ref="dialogInput2"
				mode="input"
				title="添加关键词"
				value=""
				placeholder="请输入内容(2-8字)"
				@confirm="dialogInputConfirm"
			></uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script>
import { mapState } from 'vuex';
import graceChecker from '@/common/graceChecker.js';
import formRuleConfig from '@/config/formRule.config.js';
import { formatDate, calDay } from '@/common/date';
import amap from '@/common/amap-wx.js';
export default {
	components: {},
	computed: {
		...mapState(['openId', 'customerInfo']),

		startDate() {
			return this.getDate('start');
		},
		endDate() {
			return this.getDate('end');
		}
	},

	data() {
		return {
			position: {
				positionType: null,
				postId: 0,
				postName: '',
				minEducation: '',
				expRequire: '',
				phone: '',
				salary: '',
				descr: '',
				address: '',
				addressName: '',
				addressHouse: '',
				latitude: '',
				longitude: '',
				startDate: null,
				endDate: null,
				shareNumber: null,
				shareMoney: 0,
				ifParttime:0,
			},
			id: 0,
			selectPost: {
				name: '',
				id: ''
			},
			current: 0,
			ifParttime: [
				{
					text: '全职',
					value: 0
				},
				{
					text: '兼职',
					value: 1
				}
			],
			salaryValue: null,
			salaeyArray: ['面议', '1-3K', '3-5K', '5-8K', '8-12K', '12-15K', '15-20K', '20K以上'],
			expRequires: ['不限', '1年以内', '1-3年', '3-5年', '5-10年', '10年以上'],
			keys: [],
			educations: ['高中以下', '高中', '中专/技校', '大专', '本科', '硕士', '博士'],
			positionTypes: [
				{
					text: '普通职位',
					value: 1
				},
				// {
				// 	text: '灵活用工',
				// 	value: 2
				// },
				{
					text: '共享用工',
					value: 3
				}
			]
		};
	},
	onLoad(query) {
		console.log(query);
		this.id = query.id;
		console.log(this.id);
		if (this.id) {
			this.getDetail();
		} else {
			this.getCompanyDetail();
		}
	},
	methods: {
		async getDetail() {
			let res = await this.$apis.getPositionDetail({ id: this.id });
			console.log('res====', res);
			if (res) {
				this.position = res;
				this.selectPost.name = res.postName;
				this.selectPost.id = res.postId;
				if (res.skill) {
					this.keys = res.skill.split(',');
				}
			}
		},

		async getCompanyDetail() {
			let res = await this.$apis.getCompanyDetail();
			if (res) {
				this.position.address = res.address;
				this.position.addressName = res.addressName;
				this.position.addressHouse = res.addressHouse;
				this.position.latitude = res.latitude;
				this.position.longitude = res.longitude;
				
				this.position.city = res.city;
				this.position.citycode = res.citycode;
				this.position.pcity = res.pcity;
				this.position.pcitycode = res.pcitycode;
			}
		},

		/**
		 * 打开提交信息
		 */
		confirmDialog() {
			if (this.keys.length == 8) {
				uni.showToast({
					icon: 'none',
					title: '最多添加8个职位关键词'
				});
				return;
			}
			this.dialogTitle = '添加职位关键词';
			this.$refs.dialogInput2.init();
			this.$refs.dialogInput.open();
		},

		/**
		 * 输入对话框的确定事件
		 */
		dialogInputConfirm(val) {
			console.log(val);
			if (!val) {
				uni.showToast({
					icon: 'none',
					title: '请输入内容'
				});
				return;
			}
			if (val.length < 2 || val.length > 8) {
				uni.showToast({
					icon: 'none',
					title: '请输入2-8个字'
				});
				return;
			}
			this.keys.push(val);
			this.$refs.dialogInput.close();
		},

		select(index) {
			this.value = this.keys[index];
			this.$refs.dialogInput.open();
		},

		deleteImg(index) {
			this.keys.splice(index, 1);
		},

		selectAddress() {
			uni.chooseLocation({
				success: res => {
					console.log('选择详细地址结果');
					console.log(res);
					console.log(res.name);
					console.log(res.address);
					if (res.address == '') {
						this.address = '请选择详细地址';
						return;
					}
					this.position.addressName = res.name;
					this.position.address = res.address;
					this.position.latitude = res.latitude;
					this.position.longitude = res.longitude;
					
					this.reLocation(res.latitude,res.longitude);
				}
			});
		},
		
		reLocation(lat,lng) {
			//高德地图插件
			let myAmapFun = new amap.AMapWX({
				key: '102dcab15e743584f73d383dea7530e7'
			});
			let that = this;
			myAmapFun.getRegeo({
				location: lng+','+lat,
				success: function(data) {
					//成功回调
					that.position.pcity = data[0].regeocodeData.addressComponent.city;
					if(that.position.pcity.length==0){
						that.position.pcity = data[0].regeocodeData.addressComponent.province;
					}
					that.position.city = data[0].regeocodeData.addressComponent.district;
					that.position.citycode = data[0].regeocodeData.addressComponent.adcode+"000000";
					that.position.pcitycode = data[0].regeocodeData.addressComponent.adcode.substr(0, 4) + '00000000';
				},
				fail: function(info) {
					//失败回调
					console.log(info);
				}
			});
		},

		toWorkContent() {
			this.$mRouter.push({
				route: this.$mRoutesConfig.editProContent,
				query: {
					type: 5,
					content: this.position.descr
				}
			});
		},

		toPost() {
			this.$mRouter.push({
				route: this.$mRoutesConfig.post,
				query: {
					id: 1
				}
			});
		},

		bindPickerChange2: function(e) {
			this.position.minEducation = this.educations[e.target.value];
		},

		bindPickerChange3: function(e) {
			this.position.expRequire = this.expRequires[e.target.value];
		},

		bindPickerChange: function(e) {
			this.position.salary = this.salaeyArray[e.target.value];
		},

		// 点击注册按钮
		async register() {
			console.log(this.position);
			let skill = '';
			for (let i in this.keys) {
				skill = skill + ',' + this.keys[i];
			}
			skill = skill.substr(1, skill.length);
			this.position.postId = this.selectPost.id;
			this.position.postName = this.selectPost.name;
			this.position.skill = skill;
			let checkRes = graceChecker.check(this.position, formRuleConfig.regPositionRule);
			if (!checkRes) {
				uni.showToast({
					title: graceChecker.error,
					icon: 'none'
				});
				return;
			}
			if (this.id && this.id != 0) {
				this.position.id = this.id;
			}
			let res = await this.$apis.updatePosition(this.position);
			if (res) {
				uni.navigateBack({
					delta: 1
				});
			}
		},

		async remove() {
			uni.showModal({
				title: '提示',
				content: '确定要删除吗？',
				success: res => {
					if (res.confirm) {
						this.$apis
							.deletePositionById({
								id: this.id
							})
							.then(() => {
								uni.showToast({
									title: '操作成功'
								});
								setTimeout(() => {
									this.$mRouter.back();
								}, 1000);
							});
					}
				}
			});
		},

		formatDates(time) {
			if (time == null || time === '') {
				return null;
			}
			let str = time.replace(/-/g, '/');
			let date = new Date(str);
			return formatDate(date, 'yyyy-MM-dd');
		},

		getDate(type) {
			const date = new Date();
			let year = date.getFullYear();
			let month = date.getMonth() + 1;
			let day = date.getDate();
			if (type === 'start') {
				year = year - 10;
			} else if (type === 'end') {
				year = year + 10;
			}
			month = month > 9 ? month : '0' + month;
			day = day > 9 ? day : '0' + day;
			return `${year}-${month}-${day}`;
		},

		bindDate1Change: function(e) {
			console.log(e.target.value);
			this.position.startDate = e.target.value;
			this.calDays();
		},
		bindDate2Change: function(e) {
			this.position.endDate = e.target.value;
			this.calDays();
		},
		calDays() {
			if (this.position.startDate && this.position.endDate) {
				let days = calDay(this.position.startDate, this.position.endDate);
				console.log('间隔天数：', days);
				this.position.workDays = days + 1; //加上结尾这一天
			} else {
				console.log('日期未配置');
			}
		}
	}
};
</script>

<style lang="scss" scoped>
input {
	width: 80%;
}
.input-group {
	border-radius: 10upx;
	margin-top: 10upx;
	overflow: hidden;
	margin-bottom: 160upx;
}

.input-row {
	display: flex;
	flex-direction: row;
	position: relative;
	background: #fff;
	justify-content: space-between;
	align-items: center;
	padding: 15upx 10upx;
}

.input-row .title {
	width: 25%;
	padding: 20upx 0;
	padding-left: 20upx;
	line-height: 50upx;
}

.border-bottom-1px {
	position: relative;

	&::after {
		position: absolute;
		z-index: 1;
		right: 0;
		bottom: 0;
		left: 20upx;
		height: 1upx;
		content: '';
		-webkit-transform: scaleY(0.5);
		transform: scaleY(0.5);
		background-color: #e2e2e2;
	}
}

.header {
	display: flex;
	flex-direction: column;
	.tip {
		font-size: $uni-font-size-sm;
		color: $font-color-666;
		margin-left: 20upx;
	}
}

.head-img {
	margin-right: 15upx;
	image {
		width: 160upx;
		height: 160upx;
		border-radius: 50%;
	}
}

radio-group {
	margin-right: 10upx;
}

.radio {
	margin-left: 20upx;
}

.input-column {
	display: flex;
	flex-direction: column;
	background-color: $bgcolor_white;
	padding: 30upx 20upx 10upx 20upx;

	.title {
		margin-left: 10upx;
	}

	.input-item {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}

	.picker {
		padding: 20upx 0;
		margin-left: 10upx;
		position: relative;
		picker {
			font-size: $uni-font-size-lg;
			width: 100%;
			position: absolute;
		}
	}
	.yzb-next {
		float: right;
		color: $font-color-999;
	}
}

.content {
	background: $bgcolor_white;
	margin-bottom: 120upx;
}

.btn-row {
	position: fixed;
	z-index: 999;
	bottom: 0upx;
	padding: 20upx 0;
	background-color: #ffffff;
	width: 100%;
	box-sizing: border-box;
	.btn-delete {
		background-color: $bg-grey;
		height: 90upx;
		line-height: 90upx;
		font-size: $font-size-34;
		color: $font-color-333;
		width: 30%;
	}

	.btn-save {
		background-color: $main-color;
		height: 90upx;
		line-height: 90upx;
		font-size: $font-size-34;
	}
	.width-55 {
		width: 55%;
	}

	.width-90 {
		width: 90%;
	}
}

.text-blue {
	color: $main-color;
	border: 1upx solid $main-color;
	background-color: $main-color;
	color: #ffffff;
}
.text-normal {
	color: $font-color-666;
	border: 1upx solid $border-color-base;
}

.skill-item {
	padding: 20upx;
	flex-wrap: wrap;
	display: flex;
	.skill-item-item {
		position: relative;
		margin-right: 20upx;
	}
	.item {
		font-size: $uni-font-size-sm;
		padding: 12upx 20upx;
		margin-right: 20upx;
		margin-bottom: 20upx;
		// background-color: $border-color-base;
		border-radius: 8upx;
		// color: $font-color-666;
	}
}

.img_delete {
	width: 45upx;
	height: 45upx;
	border-radius: 50%;
	background: rgba(234, 178, 178, 0.5);
	position: absolute;
	right: -15upx;
	top: -15upx;
	z-index: 10;
	align-items: center;
}
</style>
