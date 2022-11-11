<template>
	<view class="page-container">
		<view class="top-contarier">
			<submitView title="项目名称" rightShow=" " :needBottomSpLine="false" :shouldInput="true">
				<template v-slot:buttom>
					<u--input placeholder="请输入项目名称" border="surround" v-model="projectCustom.projectName"></u--input>
				</template>
			</submitView>
			<submitView title="项目简介" :submitType="2" :leftTitleWidth="200" :rightContentFlex="0" :shouldInput="true"
				:needBottomSpLine="false">
			</submitView>
			<view style="margin: 0 30rpx;">
				<u--textarea v-model="projectCustom.projectModule" placeholder="请输入项目简介" count autoHeight></u--textarea>
			</view>
			<submitView title="项目周期" rightShow=" " :needBottomSpLine="false" :shouldInput="true">
				<template v-slot:buttom>
					<uni-datetime-picker v-model="range" type="daterange" @maskClick="maskClick" start="2022-04-2" />
				</template>
			</submitView>
			<submitView title="是否加急" rightShow=" " :needBottomSpLine="false" :shouldInput="false" submitType="2">
				<template>
					<mySwich v-model="projectCustom.urgent" :activeValue="0" :inactive-value="1" leftText="否"
						rightText="是"></mySwich>
				</template>
			</submitView>
			<submitView title="环境搭建" rightShow=" " :needBottomSpLine="false" :shouldInput="false" submitType="2">
				<template>
					<mySwich v-model="projectCustom.environment" :activeValue="0" :inactive-value="1" leftText="否"
						rightText="是"></mySwich>
				</template>
			</submitView>
			<submitView title="代码讲解" rightShow=" " :needBottomSpLine="false" :shouldInput="false" submitType="2">
				<template>
					<mySwich v-model="projectCustom.code" :activeValue="0" :inactive-value="1" leftText="否"
						rightText="是"></mySwich>
				</template>
			</submitView>
			<submitView title="预算" rightShow=" " :needBottomSpLine="false" :shouldInput="true">
				<template v-slot:buttom>
					<u--input placeholder="请输入预算" type="number" border="surround" v-model="projectCustom.budget">
					</u--input>
				</template>
			</submitView>
			<submitView title="联系方式" rightShow=" " :needBottomSpLine="false" :shouldInput="false">
				<template v-slot:buttom>
					<u--input placeholder="请输入联系方式" border="surround" v-model="projectCustom.tel"></u--input>
				</template>
			</submitView>
			<button class="parse-url-btn" @tap="save">保存</button>
		</view>
	</view>
</template>

<script>
	import Util from '@/utils/util.js'
	import uniDatetimePicker from '@/uni/uni-datetime-picker/uni-datetime-picker.vue'
	import userApi from '@/api/userApi.js'
	var app = getApp()
	export default {
		components: {
			uniDatetimePicker
		},
		data() {
			return {
				range: '',
				projectCustom: {
					projectModule: '',
					urgent: true,
					environment: true,
					code: true
				}
			}
		},
		onShow() {
			if (!app.globalData.isLogin) {
				uni.showToast({
					title: '尚未登录',
					icon: 'none',
					duration: 2000,
					success: () => {
						uni.navigateTo({
							url: '/pages/login/login'
						})
					}
				});
			}
		},
		methods: {
			save: async function(e) {
				if (this.range && this.range.length > 0) {
					this.projectCustom.startTime = this.range[0] + " 00:00:00"
					this.projectCustom.endTime = this.range[1] + " 00:00:00"
				}
				if (Util.stringIsEmpty(this.projectCustom.projectName)) {
					Util.showMyToast('请输入项目名称');
					return;
				}
				if (Util.stringIsEmpty(this.projectCustom.projectModule)) {
					Util.showMyToast('请输入功能模块');
					return;
				}
				if (Util.stringIsEmpty(this.projectCustom.startTime)) {
					Util.showMyToast('请选择项目周期');
					return;
				}
				if (Util.stringIsEmpty(this.projectCustom.endTime)) {
					Util.showMyToast('请选择项目周期');
					return;
				}
				if (Util.stringIsEmpty(this.projectCustom.budget)) {
					Util.showMyToast('请输入预算');
					return;
				}
				let param = this.projectCustom
				param.urgent = this.projectCustom.urgent ? 0 : 1
				param.environment = this.projectCustom.environment ? 0 : 1
				param.code = this.projectCustom.code ? 0 : 1
				let res = await userApi.saveCustom(param)
				uni.switchTab({
					url: '/pages/mine/mine'
				})
			},
			maskClick() {
				console.log(this.range)
			}

		}
	}
</script>
<style>
	.top-contarier {
		display: flex;
		flex-direction: column;
		background: #FFFFFF;
		border-radius: 0px 0px 20rpx 20rpx;
		padding-bottom: 60rpx;
	}

	.comes-icon {
		width: 22rpx;
		height: 22rpx;
		margin-right: 10rpx;
	}

	.comes-tip {
		font-size: 30rpx;
		font-weight: 400;
		color: #55aaff;
	}

	.tip-icon {
		width: 23rpx;
		height: 23rpx;
		margin-right: 10rpx;
	}

	.url-tip {
		font-size: 24rpx;
		font-weight: 400;
		color: #9B9BA3;
	}

	.house-url-input {
		width: calc(100vw - 120rpx);
		height: 300rpx;
		background: #F5F6F9;
		border-radius: 8rpx;
		margin-left: 30rpx;
		padding: 30rpx;
	}

	.input-recomand {
		width: 100%;
		height: 100%;
	}

	.input-recomand-placeholder {
		font-size: 30rpx;
		font-weight: 400;
		color: #9B9BA3;
	}

	.length-limit {
		position: absolute;
		z-index: 6;
		right: 30rpx;
		bottom: 20rpx;
		font-size: 24rpx;
		font-weight: 400;
		color: #55aaff;
	}

	.place-holder {
		font-size: 30rpx;
		font-weight: 400;
		color: #9B9BA3;
	}

	.parse-url-btn {
		width: calc(100vw - 60rpx);
		height: 78rpx;
		background: #55aaff;
		border-radius: 39rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 40rpx 30rpx;
		font-size: 30rpx;
		font-weight: 400;
		color: #FFFFFF;
	}

	.parseing-container {
		height: calc(100vh - 88px);
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		background: #FFFFFF;
	}

	.parse-url-icon {
		width: 540rpx;
		height: 326rpx;
		margin-top: 153rpx;
		margin-bottom: 33rpx;
	}

	.parse-url-tip {
		font-size: 30rpx;
		font-weight: 400;
		color: #55aaff;
	}

	.add-continue-btn {
		width: 240rpx;
		height: 78rpx;
		background: #55aaff;
		border-radius: 39rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-top: 108rpx;
		font-size: 30rpx;
		font-weight: 400;
		color: #FFFFFF;
	}

	.task-list-btn {
		width: 240rpx;
		height: 78rpx;
		background-color: #FFFFFF;
		border: 1rpx solid #55aaff;
		border-radius: 39rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-top: 30rpx;
		font-size: 30rpx;
		font-weight: 400;
		color: #55aaff;
	}

	.end-record-btn {
		width: 240rpx;
		height: 78rpx;
		background-color: #FFFFFF;
		border: 1rpx solid #808080;
		border-radius: 39rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-top: 30rpx;
		font-size: 30rpx;
		font-weight: 400;
		color: #808080;
	}
</style>
