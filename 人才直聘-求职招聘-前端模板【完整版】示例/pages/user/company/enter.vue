<template>
	<view class="content reg-page">
		<view class="navbar" :style="{ height: totalHeight + 'px' }"><text :style="{ 'margin-top': statusBarHeight + 'px' }">公司入驻</text></view>
		<view class="input-group" :style="{ 'margin-top': totalHeight + 'px' }">
			<view class="notice border-bottom-1px">
				<text class="yzb yzb-tixing"></text>
				<text>温馨提示：</text>
				<text>如公司已入驻，输入全称搜索即可！</text>
			</view>
			<view class="input-row border-bottom-1px" @click="uploadImgs()">
				<view class="header">
					<text class="title">公司Logo</text>
					<text class="tip">公司Logo将出现在公司主页、公司职位等位置！</text>
				</view>
				<view class="head-img"><image :src="company.logo || '/static/img/head.png'"></image></view>
			</view>
			<view class="input-column border-bottom-1px">
				<text class="title">公司全称</text>
				<view class="input-item">
					<!-- <input class="padding-10" placeholder="请输入公司全称" v-model="company.fullName" /> -->
					<yzb-select-input
						the-style="margin: 20upx auto;font-size: 46upx;"
						:value="company.fullName"
						item-key="value"
						placeholder="请输入公司全称"
						@list="getData"
						@select="select"
						overflow="hide"
					></yzb-select-input>
				</view>
			</view>
			<view class="input-column border-bottom-1px">
				<text class="title">公司简称</text>
				<view class="input-item"><input class="padding-10" :disabled="disabled" placeholder="请输入公司简称" v-model="company.name" /></view>
			</view>
			<view class="input-column border-bottom-1px" @click="disabled==false && toIndustry()">
				<text class="title">所在行业</text>
				<view class="space-between-algin row padding-height-20">
					<input class="padding-10" disabled="true" placeholder="请选择所在行业" :value="company.industryName" />
					<text class="yzb yzb-next"></text>
				</view>
			</view>
			<view class="input-column border-bottom-1px">
				<text class="title">公司性质</text>
				<view class="picker">
					<picker @change="bindNaturePickerChange" :disabled="disabled" :value="company.nature" :range="natures">
						<input class="padding-10" disabled="true" placeholder="请选择公司性质" :value="company.nature" />
					</picker>
					<text class="yzb yzb-next"></text>
				</view>
			</view>
			<view class="input-column border-bottom-1px">
				<text class="title">人员规模</text>
				<view class="picker">
					<picker @change="bindPickerChange" :disabled="disabled" :value="company.staffSize" :range="array">
						<input class="padding-10" disabled="true" placeholder="请选择人员规模" :value="company.staffSize" />
					</picker>
					<text class="yzb yzb-next"></text>
				</view>
			</view>
			<view class="input-column border-bottom-1px">
				<text class="title">担任职位</text>
				<view class="input-item"><input class="padding-10" placeholder="请输入职位,如总经理/招聘人员等" v-model="company.postName" /></view>
			</view>
		</view>
		<view class="btn-row row">
			<button type="warn" class="btn-delete" @tap="remove">再想想</button>
			<button type="primary" class="btn-save" :class="id ? 'width-55' : 'width-90'" @tap="register">保存</button>
		</view>
	</view>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex';
import { formatDate, calCurrentYear } from '@/common/date';
import uploadImage from '@/common/ossutil/uploadFile';
import formRuleConfig from '@/config/formRule.config.js';
import graceChecker from '@/common/graceChecker.js';
import yzbSelectInput from '@/components/yzb/yzb-select-input.vue';
export default {
	components: { yzbSelectInput },
	computed: {
		...mapState(['userInfo']),
		...mapGetters(['hasLogin'])
	},
	data() {
		return {
			array: ['0-20人', '20-99人', '100-499人', '500-999人', '1000-9999人', '10000人以上'],
			natures: ['外资企业', '中外合资企业', '私营/民营企业', '国有企业', '国内上市公司', '跨国公司', '政府/非盈利机构', '事业单位', '其他'],
			company: {
				logo: null,
				name: null,
				fullName: null,
				industryId: null,
				industryName: null,
				staffSize: null
			},
			navBarHeight: 0,

			statusBarHeight: 0,
			navigatorHeight: 0,
			menu: {},
			totalHeight: 0,
			menuHeight: 0,
			menuTop: 0,
			system: {},

			query: {
				page: 1,
				limit: 20,
				keyword: ''
			},
			candidates: [],
			disabled:false,
		};
	},
	created() {
		this.navBarHeight = uni.getMenuButtonBoundingClientRect().bottom;
		this.system = uni.getSystemInfoSync();
		//获取胶囊信息
		this.menu = uni.getMenuButtonBoundingClientRect();
		//计算组件高度
		this.statusBarHeight = this.system.statusBarHeight; //状态栏高度
		this.navigatorHeight = (this.menu.top - this.system.statusBarHeight) * 2 + this.menu.height; //导航栏高度
		this.totalHeight = this.statusBarHeight + this.navigatorHeight; //总高度
		this.menuHeight = this.menu.height; //胶囊高度
		this.menuTop = this.menu.top; //胶囊与顶部的距离
	},
	onLoad(query) {
		console.log(query);
	},
	methods: {
		async getData(e) {
			console.log(e);
			this.company.fullName = e.value;
			this.query.keyword = e.value;
			let res = await this.$apis.getCompanyListForSelect(this.query);
			console.log('res==', res);
			this.candidates = res.data;
			let data = [];
			this.candidates.forEach(item => {
				item.value = item.fullName;
				console.log(item);
				if (item.value.indexOf(e.value) > -1) {
					data.push(item);
				}
			});
			e.callback(data);
		},

		select(item) {
			this.company.id=item.id;
			this.company.fullName = item.value;
			this.company.name = item.name;
			this.company.industryId = item.industryId;
			this.company.industryName = item.industryName;
			this.company.staffSize = item.staffSize;
			this.company.logo = item.logo;
			this.company.nature = item.nature;
			if(item.verifyStatus==3){
				this.disabled=true;
			}
			console.log(item);
		},

		bindPickerChange: function(e) {
			this.company.staffSize = this.array[e.target.value];
		},

		bindNaturePickerChange: function(e) {
			this.company.nature = this.natures[e.target.value];
			this.$forceUpdate();
		},

		toIndustry() {
			this.$mRouter.push({
				route: this.$mRoutesConfig.industry,
				query: {
					id: 1
				}
			});
		},

		// 选择图片
		uploadImgs() {
			let that = this;
			uni.chooseImage({
				success(res) {
					let tempFilePaths = res.tempFilePaths;
					that.tmpImageUrl = tempFilePaths[0];
					that.uploadFile();
				}
			});
		},

		// 上传图片
		uploadFile() {
			uni.showLoading({
				title: '图片上传中'
			});
			uploadImage(0, this.tmpImageUrl, 'hjy/user/', result => {
				console.log('图片上传结果：', result);
				this.company.logo = result;
				uni.hideLoading();
			});
		},

		// 点击注册按钮
		async register() {
			let checkRes = graceChecker.check(this.company, formRuleConfig.regCompanyRule);
			if (!checkRes) {
				uni.showToast({
					title: graceChecker.error,
					icon: 'none'
				});
				return;
			}
			let res = await this.$apis.updateCompany(this.company);
			if (res) {
				uni.navigateBack({
					delta: 1
				});
			}
		},

		async remove() {
			let that = this;
			uni.showModal({
				title: '',
				content: '确定切换到求职？',
				success: res => {
					if (res.confirm) {
						that.doswitch(1);
					}
				}
			});
		},

		async doswitch() {
			let res = await this.$apis.switchRole({ role: 0 });
			if (res.result) {
				uni.showToast({
					icon: 'none',
					title: '切换成功'
				});
				uni.navigateBack({
					delta: 1
				});
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.navbar {
	position: fixed;
	top: 0;
	width: 100%;
	background-color: $main-color;
	z-index: 99;
	align-items: center;
	display: flex;
	justify-content: center;
	text {
		color: #fff;
		font-size: $font-base-more;
	}
}
input {
	width: 90%;
}
.input-group {
	border-radius: 10upx;
	margin-top: 10upx;
	overflow: hidden;
	margin-bottom: 140upx;
}

.notice {
	display: flex;
	flex-direction: row;
	align-items: center;
	padding: 20upx;
	.yzb-tixing {
		margin-right: 10upx;
		color: $uni-color-warning;
		font-weight: bold;
		font-size: $font-size-40;
	}
	text:last-child {
		color: $font-color-666;
	}
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
		right: 20upx;
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
		padding: 30upx 0;
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
}

.btn-row {
	position: fixed;
	z-index: 999;
	bottom: 0upx;
	padding: 20upx;
	background-color: #ffffff;
	width: 100%;
	box-sizing: border-box;
	display: flex;
	flex-direction: row;
	align-items: center;
	box-sizing: border-box;
	.btn-delete {
		background-color: $bg-grey;
		height: 90upx;
		line-height: 90upx;
		margin-right: 20upx;
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
</style>
