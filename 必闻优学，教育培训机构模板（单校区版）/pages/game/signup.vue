<template>
	<view class="body-wrap">
		<!-- 活动信息 -->
		<view class="game-info-wrap">
			<!-- 头图 -->
			<u-image src="https://cdn.huiwenhuiyi.com/uploads/20220317/Fu10Im8UBsjMbuUgzjmtCYONcRvC.png"
				mode="aspectFill" width="100%" height="400rpx"></u-image>
			<!-- 核心信息 -->
			<view class="data-info-wrap box-shadow">
				<view class="title-wrap">
					<u-badge value="HOT" bgColor="#fa3534"></u-badge>
					<text class="title u-line-1">出炉啦！梨丁拉丝塔塔手作甜到你心</text>
				</view>
				<view class="tags-wrap">
					<view class="tag">
						<text class="tag-icon" style="background-color: #47D174;">退</text>
						<text class="u-m-l-5">支持退款</text>
					</view>
					<view class="tag">
						<text class="tag-icon" style="background-color: #47D174;">保</text>
						<text class="u-m-l-5">交易保障</text>
					</view>
				</view>
				<view class="data-info">
					<view class="date">
						<u-icon name="clock" size="16"></u-icon>
						<text class="u-m-l-5">2022年2月22日</text>
					</view>
					<view class="data">
						<view class="favorite">
							<u-icon name="star" size="16"></u-icon>
							<text class="u-m-l-5">999+</text>
						</view>
						<view class="like">
							<u-icon name="heart" size="16"></u-icon>
							<text class="u-m-l-5">999+</text>
						</view>
					</view>
				</view>
			</view>

		</view>

		<view class="form-wrap">
			<u-form labelPosition="top" labelWidth="80" labelAlign="left" :borderBottom="true" :model="signupFormModel"
				ref="signupForm" :labelStyle="{ fontSize: '26rpx' }">
				<u-form-item label="姓名：" prop="signupInfo.relname" required>
					<u-input v-model="signupFormModel.signupInfo.relname" placeholder="请填写您的真实姓名" maxlength="10"
						border="bottom" fontSize="26rpx"></u-input>
				</u-form-item>
				<u-form-item label="手机号：" prop="signupInfo.mobile" required>
					<u-input v-model="signupFormModel.signupInfo.mobile" placeholder="请填写您的手机号" maxlength="10"
						border="bottom" fontSize="26rpx"></u-input>
				</u-form-item>
				<u-form-item label="备注：" prop="signupInfo.remark">
					<u-textarea v-model="signupFormModel.signupInfo.remark" placeholder="请填写商家要求的其他备注信息"
						fontSize="26rpx"></u-textarea>
					<!-- <u-input v-model="signupFormModel.signupInfo.remark" placeholder="请填写商家要求的其他备注信息" maxlength="10"
						border="none" fontSize="26rpx" type="textarea"></u-input> -->
				</u-form-item>
			</u-form>
			<u-button type="success" text="提交" @click="submit"></u-button>
		</view>


	</view>
</template>

<script>
	export default {
		data() {
			return {
				content: `<img src="https://cdn.huiwenhuiyi.com/uploads/20220317/FgN7Fze_S1Oty8t5KLpmlS0LYzKV.jpg">`,
				signupFormPopupShow: false,
				signupFormModel: {
					signupInfo: {
						relname: null, // 真实姓名
						mobile: null, // 手机号
						remark: null, // 其他备注信息
					}
				},
				signupFormRules: {
					'signupInfo.relname': {
						type: 'string',
						required: true,
						message: '请填写真实姓名',
						trigger: ['blur', 'change']
					},
					'signupInfo.mobile': [{
							type: 'string',
							required: true,
							message: '请填写手机号码',
							trigger: ['blur', 'change']
						},
						{
							validator: (rule, value, callback) => {
								return uni.$u.test.mobile(value);
							},
							message: '手机号码不正确',
							trigger: ['change', 'blur']
						}
					],
				}
			}
		},
		// 必须要在onReady生命周期，因为onLoad生命周期组件可能尚未创建完毕
		onReady() {
			this.$refs.signupForm.setRules(this.signupFormRules);
		},
		methods: {
			submit() {
				this.$refs.signupForm
					.validate()
					.then(res => {
						uni.$u.toast('校验成功');
					})
					.catch(errors => {
						uni.$u.toast('校验失败');
					});
			}
		}
	}
</script>

<style lang="scss">
	.body-wrap {
		min-height: auto;
	}
	.game-info-wrap {
		background-color: #FFFFFF;
		padding-bottom: 12rpx;
		margin-bottom: 24rpx;

		.data-info-wrap {
			position: relative;
			margin: -80rpx auto 20rpx;
			border-radius: 20rpx;
			width: 650rpx;
			padding: 24rpx;
			background-color: #FFFFFF;
			display: flex;
			flex-direction: column;
			align-items: flex-start;

			.title-wrap {
				display: flex;
				align-items: center;
				justify-content: left;
				margin-bottom: 10rpx;

				.title {
					color: $u-main-color;
					font-size: $u-p;
					margin-left: 10rpx;
					font-weight: bold;
				}
			}

			.tags-wrap {
				display: flex;
				align-items: center;
				justify-content: left;
				margin-bottom: 20rpx;
				color: #47D174;
				font-size: $u-p3;

				.tag {
					display: flex;
					align-items: center;
					justify-content: left;
					margin-right: 10rpx;

					.tag-icon {
						width: 36rpx;
						padding: 4rpx 0rpx;
						text-align: center;
						border-radius: 6rpx;
						color: #ffffff;
						font-size: 20rpx;
						line-height: 24rpx;
						margin-left: 5rpx;
					}
				}
			}

			.data-info {
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: space-between;

				.date,
				.data {
					display: flex;
					align-items: center;
					color: $u-tips-color;
					font-size: $u-p3;

					.favorite,
					.like {
						display: flex;
						align-items: center;
					}
				}
			}

		}

	}

	.form-wrap {
		background-color: #FFFFFF;
		padding: 24rpx 32rpx;
	}
</style>
