<template>
	<view>
		<cu-custom bgColor="bg-red" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">{{type=='add' ?'添加收货地址' :'修改收货地址'}}</block>
		</cu-custom>
		<form @submit="saveSub">
			<view class="cu-form-group">
				<view class="title">收货人</view>
				<input placeholder="请输入收货人姓名" class="text-right" v-model="form.addresseeName"></input>
				<!-- 	name="addresseeName"
					:value="form.addresseeName" -->
			</view>
			<view class="cu-form-group">
				<view class="title">联系电话</view>
				<input placeholder="请输入联系电话" class="text-right" v-model="form.telephone"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">邮政编码</view>
				<input placeholder="请输入邮政编码" class="text-right" v-model="form.postalCode"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">收货地址</view>
				<region-picker @change="regionChange" :value="region">
					<view class="picker">{{region[0]+','+ region[1]+','+region[2] }}</view>
				</region-picker>
			</view>
			<view class="cu-form-group">
				<view class="title">详细地址</view>
				<input placeholder="请输入详细地址" class="text-right" v-model="form.detailAddress"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">默认地址</view>
				<switch @change="isDefaultChange" :class="form.isDefault =='1'?'checked':''"
					:checked="form.isDefault  =='1'?true:false">
				</switch>
			</view>
			<view class="compile">
				<button class="cu-btn shadow-blur block margin-sm round bottom-btn bg-red" formType="submit">保存</button>
			</view>
		</form>
	</view>
</template>

<script>
	import regionPicker from "@/components/region-picker/region-picker.vue"
	import validate from '@/utils/validate'
	export default {
		components: {
			regionPicker
		},
		data() {
			return {
				theme: getApp().globalData.theme,
				form: {},
				type: 'add',
				isChoose: false,
				region: ['请选择省', '市', '区'],

			}
		},
		onLoad(option) {
			this.type = option.type
			if (option.userAddress) {
				this.form = JSON.parse(decodeURIComponent(option.userAddress));
				this.region[0] = this.form.provinceName
				this.region[1] = this.form.cityName
				this.region[2] = this.form.countyName

			}
		},
		methods: {
			isDefaultChange(e) {
				if (e.detail.value) {
					this.form.isDefault = '1'
				} else {
					this.form.isDefault = '0'
				}
			},
			regionChange(e) {
				this.region = e.detail.value;
			},
			/**
			 * 提交保存
			 */
			saveSub(e) {
				if (!this.form.addresseeName) {
					uni.showToast({
						title: '请输入收货人姓名',
						icon: 'none',
						duration: 3000
					});
					return;
				}
				if (!this.form.telephone) {
					uni.showToast({
						title: '请输入联系电话',
						icon: 'none',
						duration: 3000
					});
					return;
				}
				if (!validate.validateMobile(this.form.telephone)) {
					uni.showToast({
						title: '请输入正确联系电话',
						icon: 'none',
						duration: 3000
					});
					return;
				}

				if (this.region[0] == '请选择省') {
					uni.showToast({
						title: '请选择收货地址',
						icon: 'none',
						duration: 3000
					});
					return;
				}
				if (!this.form.detailAddress) {
					uni.showToast({
						title: '请输入详细地址',
						icon: 'none',
						duration: 3000
					});
					return;
				}
				this.form.provinceName = this.region[0];
				this.form.cityName = this.region[1];
				this.form.countyName = this.region[2];
				uni.$myRequest.saveOrUpdateAddress(this.form).then(res => {
					uni.navigateBack();
				})
			}
		}
	}
</script>

<style lang="scss">
	.cu-form-group .title {
		min-width: calc(4em + 15px);
	}
</style>
