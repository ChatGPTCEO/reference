<template>
	<view class="content">
		<view class="body">
			<uni-forms ref="form" :modelValue="formData" :rules="rules">
				<view class="title">同城跑腿小程序</view>
				<uni-forms-item label="报价金额:" name="price" required><uni-easyinput type="digit" v-model="formData.price" placeholder="请输入报价金额" /></uni-forms-item>
				<uni-forms-item label="开发工期:" name="timeLimit" required><uni-easyinput v-model="formData.timeLimit" placeholder="请输入开发工期(天)" /></uni-forms-item>
				<uni-forms-item label="联系方式:" name="phone" required><uni-easyinput v-model="formData.phone" placeholder="请输入联系方式" /></uni-forms-item>
			</uni-forms>
			<button class="btn" @click="submit">立即报名</button>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			taskId:null,
			formData: {
				price: null,
				timeLimit: null,
				phone: null,
				taskId:null,
			},
			rules: {
				price: {
					rules: [
						{
							required: true,
							errorMessage: '请输入报价金额'
						},
						{ format: 'number', errorMessage: '金额必须为数字' }
					]
				},
				timeLimit: {
					rules: [
						{
							required: true,
							errorMessage: '请输入开发工期'
						}
					]
				},
				phone: {
					rules: [
						{
							required: true,
							errorMessage: '请输入联系方式'
						}
					]
				}
			}
		};
	},
	
	
	onLoad(options) {
		this.taskId=options.id;
	},
	
	methods: {
		// 触发提交表单
		submit() {
			this.$refs.form
				.validate()
				.then(res => {
					console.log('表单数据信息：', res);
					this.applyTask();
				})
				.catch(err => {
					console.log('表单错误信息：', err);
				});
		},
		
		async applyTask(){
			this.formData.taskId=this.taskId;
			console.log("applyTask",this.formData);
			let res = await this.$apis.applyTask(this.formData);
			console.log('res====', res);
			if (res) {
				uni.showModal({
					content:'报名成功',
					showCancel:false,
					success() {
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

.title {
	font-size: 34upx;
	font-weight: bold;
	padding: 10upx 0 30upx 0;
}
</style>
