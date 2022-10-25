<template>
	<view>
		<view class="" v-if="apply_id>0">
			<view class="u-p-30" v-if="show">
				您已经提交过申请，<text class="text-blue" @click="toRecord">查看记录</text>
			</view>
			<view  v-if="!show">
				<u-cell-group>
					<u-cell-item title="申请城市" :value="record.city" :arrow="false"></u-cell-item>
					<u-cell-item title="申请人" :value="record.name" :arrow="false"></u-cell-item>
					<u-cell-item title="联系电话" :value="record.mobile" :arrow="false"></u-cell-item>
					<u-cell-item title="单位名称" :value="record.company?record.company:'无'" :arrow="false"></u-cell-item>
					<u-cell-item title="备注" :value="record.remarks?record.remarks:'无'" :arrow="false"></u-cell-item>
					<u-cell-item title="申请状态" :value="record.status==0?'审核中':record.status==1?'已批准':'未通过'" :arrow="false"></u-cell-item>
					<u-cell-item title="申请日期" :value="$u.timeFormat(record.createtime)" :arrow="false"></u-cell-item>
				</u-cell-group>
			</view>

		</view>
		<view v-else>
			<view class="text-center u-p-30" style="background: #1296DB;">
				<text class="text-xl text-white">城市代理权在线申请</text>
				<view class="u-light-color u-m-t-30">您当前申请代理的城市为<text class="text-red">{{form.city}}</text>，请真实填写如下信息</view>
			</view>
			<view class="u-p-40">
				<u-form :model="form" ref="uForm">
					<u-form-item label="申请人:" prop="name" label-width="160" required>
						<u-input v-model="form.name" placeholder="请输入申请人姓名" />
					</u-form-item>
					<u-form-item label="联系电话:" prop="mobile" label-width="160" required>
						<u-input v-model="form.mobile" placeholder="请输入联系电话" />
					</u-form-item>
					<u-form-item label="单位名称:" prop="company" label-width="160">
						<u-input v-model="form.company" placeholder="请输入单位名称(若无可不填)" />
					</u-form-item>
					<u-form-item label="备注:" prop="remarks" label-width="160">
						<u-input v-model="form.remarks" placeholder="可选填" />
					</u-form-item>
				</u-form>
				<view class="u-m-t-50">
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
					city:'',
					name: '',
					mobile: '',
					company: '',
					remarks: ''
				},
				apply_id: '',
				show:true,
				record:{}
			}
		},
		onLoad(e) {
			this.form.city = e.city;
			this.apply_id = uni.getStorageSync('apply_id') ? uni.getStorageSync('apply_id') : '';
		
		},
		methods: {
			async toRecord() {
				const res = await this.$u.api.record({id:this.apply_id})
				this.record = res.data
				this.show=!this.show
			},
			async submit() {
				if (!this.$u.test.chinese(this.form.name))
					return this.$u.toast('姓名请输入汉字')
				if (!this.$u.test.mobile(this.form.mobile))
					return this.$u.toast('请输入正确的手机号')
				const res = await this.$u.api.apply(this.form)
				if (res.code == 1) {
					uni.showModal({
						title:res.msg,
						showCancel:false,
						 success: function (res) {
						        if (res.confirm) {
									uni.switchTab({
										url: '/pages/index/index'
									})
						        }}
					})
					uni.setStorage({
						key: 'apply_id',
						data: res.data
					})
				}
			}
		}
	}
</script>

<style>

</style>
