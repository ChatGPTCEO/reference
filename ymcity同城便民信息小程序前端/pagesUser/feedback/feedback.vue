<template>
	<view class="bodycont">
		<u-form :model="form" ref="uForm" label-position="top">
			<u-form-item label="请选择类型">
				<u-radio-group active-color="#f44c01" :wrap="true" v-model="form.type">
					<u-radio v-for="(item, index) in radioList" :key="index" :name="item.name"
						:disabled="item.disabled">
						{{ item.label }}
					</u-radio>
				</u-radio-group>
			</u-form-item>
			<u-form-item label="反馈描述">
				<u-input type="textarea" v-model="form.content" maxlength="-1" />
			</u-form-item>
			<u-form-item label="相关图片">
				<u-upload width="160" height="160" :action="action" max-count="6" :file-list="imglist"
					@on-success="imgSuccess" @on-remove="imgRemove"></u-upload>
			</u-form-item>
			<u-form-item label="联系方式">
				<u-input type="number" v-model="form.phone" placeholder="请输入" />
			</u-form-item>
		</u-form>
		<u-button type="primary" style="margin-top: 30rpx;" @click="submit">提交</u-button>
	</view>
</template>

<script>
	import {
		API_URL
	} from '@/env.js'
	export default {
		data() {
			return {
				radioList: [{
						name: 'product',
						label: '产品功能问题反馈',
						disabled: false
					},
					{
						name: 'feedback',
						label: '建议及意见反馈',
						disabled: false
					},
					{
						name: 'complaint',
						label: '投诉客服其他问题',
						disabled: false
					}
				],
				form: {
					type: '',
					content: '',
					images: '',
					phone: ''
				},
				action: API_URL + '/addons/hicity/index/upload',
				imglist: [],
			};
		},
		methods: {
			imgRemove(index, lists, name) {
				let banner = [];
				lists.map((item) => {
					banner.push(item.response.data.url);
				})
				if (banner.length > 0) {
					this.form.images = banner.join(',');
				} else {
					this.form.images = '';
				}
			},
			imgSuccess(data, index, lists, name) {
				let banner = [];
				lists.map((item) => {
					banner.push(item.response.data.url);
				})
				if (banner.length > 0) {
					this.form.images = banner.join(',');
				}
			},
			submit() {
				if(this.form.type==''){
					return this.$u.toast('请选择类型');
				}
				if(this.form.content==''){
					return this.$u.toast('请填写反馈描述');
				}
				uni.showLoading({
					title:'提交中'
				})
				this.$u.post('/addons/hicity/user/addFeedback', this.form).then(res => {
					uni.hideLoading();
					this.$u.toast('提交成功');
					setTimeout(()=>{
						uni.navigateBack({
							
						})
					},1500)
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.bodycont {
		padding: 30rpx 20rpx;
		background-color: white;
	}
</style>
