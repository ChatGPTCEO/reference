<template>
	<view class="warp" v-if="resume">
		<view class="user">
			<text class="name">{{resume.name}}</text>
			<view class="cell">
				<text class="ful">简历状态：</text>
				<view class="sub" v-if="current=='2'">
					<text>审核中</text>
				</view>
				<view style="width: 200rpx;" v-else>
					<u-subsection :list="list" mode="subsection" height="60" active-color="#f44c01" @change="change"
						:current="current">
					</u-subsection>
				</view>
			</view>
			<view class="cont">
				<text class="cont-title">基本信息</text>
				<text class="ful">性别：{{resume.gender_text}}</text>
				<text class="ful">年龄：{{resume.age}}岁</text>
				<text class="ful">工作经验：{{resume.work_exp_text}}</text>
				<text class="ful">学历：{{resume.edu_text}}</text>
				<text class="ful">期望职位：{{resume.jobcategory.name}}</text>
				<text class="ful">联系电话：{{resume.person_mobile}}</text>
			</view>
		</view>
		<view class="cont">
			<text class="cont-title">自我介绍</text>
			<text class="cont-text">{{resume.content}}</text>
		</view>
		<view style="height: 120rpx;"></view>
		<botbtn btntext="编辑简历" @confirem="submit"></botbtn>
	</view>
	<view class="warp" v-else>
		<u-empty text="你还没有创建简历哦!" marginTop="50" mode="list"></u-empty>
		<view style="height: 120rpx;"></view>
		<botbtn btntext="立即创建" @confirem="submit"></botbtn>
	</view>
</template>

<script>
	import botbtn from '@/components/Botbtn/Botbtn.vue'
	export default {
		components: {
			botbtn,
		},
		data() {
			return {
				list: [{
						value: '1',
						name: '公开'
					},
					{
						value: '3',
						name: '隐藏'
					}
				],
				current: 0,
				resume: null,
			};
		},
		onShow() {
			this.getResume()
		},
		methods: {
			getResume() {
				this.$u.get('/addons/hicity/resume/resume', {

				}).then(res => {
					if (res) {
						this.resume = res;
						if (res.status == '1') {
							this.current = 0;
						}
						if (res.status == '3') {
							this.current = 1;
						}
						if (res.status == '2') {
							this.current = 2;
						}
					}
				})
			},
			submit() {
				this.$u.route('/pagesPush/resume/resume')
			},
			change(e) {
				let type = this.list[e].value;
				this.$u.get('/addons/hicity/resume/upResume', {
					type: type
				}).then(res => {
					this.$u.toast('更新成功')
				}).catch(err => {
					if (e == 0) {
						this.current = 1;
					} else {
						this.current = 0;
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.warp {
		padding: 20rpx;
		background-color: white;
		.user {
			display: flex;
			flex-direction: column;

			.name {
				font-size: 32rpx;
				font-weight: bold;
			}

			.cell {
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: space-between;
				margin: 20rpx 0;
			}

			.ful {
				font-size: 28rpx;
				margin-top: 10rpx;
				line-height: 50rpx;
			}

			.sub {
				width: 120rpx;
				height: 50rpx;
				background-color: #e1e1e1;
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: center;
				border-radius: 10rpx;
			}
		}

		.cont {
			display: flex;
			flex-direction: column;
			margin-top: 20rpx;

			.cont-title {
				font-size: 35rpx;
				color: #333333;
				font-weight: bold;
			}

			.cont-text {
				margin-top: 20rpx;
				color: #666666;
				font-size: 28rpx;
				line-height: 45rpx;
			}
		}
	}
</style>
