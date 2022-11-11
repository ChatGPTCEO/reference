<template>
	<view class="content">
		<view class="body">
			<uni-forms ref="form" :modelValue="withdraw" :rules="rules">
				<view class="balance">
					<text>
						可提余额：
						<text class="money">{{account.balanceWithdraw}}</text>
						元
					</text>
					<text class="btn-w" @click="withdrawAll">全部提现</text>
				</view>
				<uni-forms-item label="提现金额:" name="money" required><uni-easyinput type="digit" v-model="withdraw.money" placeholder="请输入提现金额" /></uni-forms-item>
				<uni-forms-item label="提现方式:" name="type" required><uni-data-checkbox selectedColor="#12ae85" v-model="withdraw.type" :localdata="types" /></uni-forms-item>
				<uni-forms-item label="提现账号:" name="account" required><uni-easyinput v-model="withdraw.withdrawAccount" placeholder="请输入支付宝账号" /></uni-forms-item>
				<uni-forms-item label="提现实名:" name="realname" required><uni-easyinput v-model="withdraw.withdrawName" placeholder="请输入支付宝认证的真实姓名" /></uni-forms-item>
			</uni-forms>
			<button class="btn" @click="submit">确认提现</button>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			withdraw: {
				money: null,
				withdrawAccount: null,
				withdrawName: null,
				type: 1
			},
			account:{
				balanceWithdraw:0,
			},
			types: [
				{
					text: '支付宝',
					value: 1
				}
				// {
				// 	text: '银联',
				// 	value: 2
				// }
			],

			rules: {
				// 对name字段进行必填验证
				money: {
					rules: [
						{
							required: true,
							errorMessage: '请输入提现金额',
						},
						{ format: 'number', errorMessage: '金额必须为数字' }
					]
				},
				account: {
					rules: [
						{
							required: true,
							errorMessage: '请输入提现账号'
						}
					]
				},
				realname: {
					rules: [
						{
							required: true,
							errorMessage: '请输入支付宝认证的真实姓名'
						}
					]
				}
			}
		};
	},
	
	onShow() {
		this.getAccount();
	},
	
	methods: {
		
		async getAccount() {
			let res = await this.$apis.getAccountDetail();
			if (res) {
				this.account=res;
			}
		},
		
		withdrawAll(){
			this.withdraw.money=this.account.balanceWithdraw;
		},
		
		// 触发提交表单
		submit() {
			this.$refs.form
				.validate()
				.then(res => {
					if(this.withdraw.money<100){
						uni.showToast({
							icon:"none",
							title:'提现金额不能低于100元',
						})
					}else{
						this.doWithdraw();
					}
				})
				.catch(err => {
					console.log('表单错误信息：', err);
				});
		},
		
		async doWithdraw(){
			let res = await this.$apis.withdrawApply(this.withdraw);
			console.log('res=====', res);
			if (res) {
				uni.showModal({
					showCancel:false,
					content:'提交成功，等待后台审核',
					success:function(){
						uni.navigateBack({
							delta:1
						})
					}
				})
			}
		},
	}
};
</script>

<style lang="scss">
.body {
	padding: 20upx;
}

.btn {
	background-color: $main-color;
	color: #ffffff;
	font-size: 30upx;
}

.balance {
	display: flex;
	flex-direction: row;
	align-items: center;
	padding: 20upx 0;
	margin-left: 10upx;
	:first-child {
		color: #999;
	}
	.money {
		color: $main-color;
		font-size: 34upx;
		font-weight: bold;
		padding: 0 10upx;
	}

	.btn-w {
		margin-left: 40upx;
		color: $main-color;
	}
}
</style>
