<template>
	<view>
		<view class="" v-if="signature_id>0">
			<view class="u-p-30" v-if="show">
				您已经提交过申请，<text class="text-blue" @click="toRecord">查看记录</text>
			</view>
			<view v-if="!show">
				<u-cell-group>
					<u-cell-item title="签约人" :value="record.name" :arrow="false"></u-cell-item>
					<u-cell-item title="联系电话" :value="record.mobile" :arrow="false"></u-cell-item>
					<u-cell-item title="擅长领域" :value="record.domain" :arrow="false"></u-cell-item>
					<u-cell-item title="专栏名称" :value="record.topic" :arrow="false"></u-cell-item>
					<u-cell-item title="备注" :value="record.remarks?record.remarks:'无'" :arrow="false"></u-cell-item>
					<u-cell-item title="申请状态" :value="record.status==0?'审核中':record.status==1?'已批准':'未通过'" :arrow="false"></u-cell-item>
					<u-cell-item title="申请日期" :value="$u.timeFormat(record.createtime)" :arrow="false"></u-cell-item>
				</u-cell-group>
			</view>

		</view>
		<view v-else>
			<view class="text-center u-p-30 " style="background: #1296DB;">
				<text class="text-xl text-white">栏目作者在线签约</text>
				<view class="u-light-color u-m-t-30">选择自己擅长的领域（如健康，科技等）进行签约后方可专栏投稿，请真实填写如下信息</view>
			</view>
			<view class="u-p-40">
				<u-form :model="form" ref="uForm">
					<u-form-item label="签约人:" prop="name" label-width="160" required>
						<u-input v-model="form.name" placeholder="请输入签约人姓名" />
					</u-form-item>
					<u-form-item label="联系电话:" prop="mobile" label-width="160" required>
						<u-input v-model="form.mobile" placeholder="请输入联系电话" />
					</u-form-item>
					<u-form-item label="擅长领域:" prop="domain" label-width="160" required>
						<u-input v-model="form.domain" placeholder="请填写擅长领域(如科技,健康等)" />
					</u-form-item>
					<u-form-item label="专栏名称:" prop="topic" label-width="160" required>
						<u-input v-model="form.topic" placeholder="给自己的专栏起个名字,如健康百科等" />
					</u-form-item>
					<u-form-item label="备注:" prop="remarks" label-width="160">
						<u-input v-model="form.remarks" placeholder="可选填" />
					</u-form-item>
					<u-form-item label="相关资质证明(可选)" label-width="160">
						<u-upload ref="upload" height="160" width="160" max-count=2 :action="action" :header="{token:vuex_token}" :form-data="{signature:1}"></u-upload>
					</u-form-item>
				</u-form>
				<view class="u-m-t-60">
					<u-button type="primary" shape="circle"  @click="submit">提交</u-button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				form: {
					name: '',
					mobile: '',
					domain: '',
					topic: '',
					remarks: '',
					images: ''
				},
				signature_id: '',
				show: true,
				record: {},
				action: this.$u.http.config.baseUrl + '/api/operate/upload'
			}
		},
		onLoad(e) {
			this.signature_id = uni.getStorageSync('signature_id') ? uni.getStorageSync('signature_id') : '';

		},
		methods: {
			async toRecord() {
				const res = await this.$u.api.record({
					id: this.signature_id,
					type:1
				})
				this.record = res.data
				this.show = !this.show
			},
			async submit() {
				if (!this.$u.test.chinese(this.form.name))
					return this.$u.toast('姓名请输入汉字')
				if (!this.$u.test.mobile(this.form.mobile))
					return this.$u.toast('请输入正确的手机号')
				if (this.$u.test.isEmpty(this.form.domain))
					return this.$u.toast('擅长领域不能为空')
				if (this.$u.test.isEmpty(this.form.topic))
					return this.$u.toast('专栏名称不能为空')
				let files = this.$refs.upload.lists.filter(val => {
					return val.progress == 100;
				})
				if (files.length > 0) {
					files.forEach(item => {
						this.form.images += item.response.data.url + ','
					})
					this.form.images = this.form.images.slice(0, this.form.images.length - 1)
				}
				const res = await this.$u.api.signature(this.form)
				if (res.code == 1) {
					uni.showModal({
						title:res.msg,
						showCancel:false,
						 success: function (res) {
						        if (res.confirm) {
									uni.switchTab({
										url: '/pages/add/add'
									})
						        }}
					})
					uni.setStorage({
						key: 'signature_id',
						data: res.data
					})

				}
			}
		}
	}
</script>

<style>

</style>
