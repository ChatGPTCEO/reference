<template>
	<view class="u-p-30">
		<u-form :model="model" :rules="rules" ref="uForm">
			<u-form-item prop="content" label-width="0">
				<u-input type="textarea" height="200" placeholder="在此输入内容(140字以内)" v-model="model.content" />
			</u-form-item>
			<u-form-item prop="images" label-width="0">
				<u-upload width="160" height="160" ref="upload" max-count="3" @on-error="uploadError" :show-tips="false" :action="action" :form-data="{type:model.type}" :header="{token:vuex_token}" :beforeRemove="beforeRemove"
					:size-type="['compressed']"></u-upload>
			</u-form-item>
			<u-form-item label="所属分类" prop="category" label-width="150" v-if="model.type==1||model.type==3">
				<u-input type="select" :select-open="selectShow" v-model="model.category" placeholder="请选择" @click="selectShow = true"></u-input>
			</u-form-item>
			<u-form-item label="显示电话" prop="show_mobile" label-width="150" v-if="model.type==1">
				<u-radio-group v-model="radio" @change="radioGroupChange">
					<u-radio shape="circle" v-for="(item, index) in radioList" :key="index" :name="item.value">{{ item.name }}</u-radio>
				</u-radio-group>
			</u-form-item>
		</u-form>
		<view class="agreement">
			<u-checkbox v-model="check" @change="checkboxChange"></u-checkbox>
			<view class="agreement-text">
				<text>发布即代表同意悉地吧</text>
				<text class="text-blue" @click="toProtocol">《用户协议》</text>
				</view>
		</view>
		<view class="u-m-t-60">
			<u-button type="primary" shape="circle" @click="submit">立即发布</u-button>
		</view>
		<u-select mode="single-column" value-name="id" label-name="name" :list="categories" v-model="selectShow" @confirm="selectConfirm"></u-select>
		<u-modal v-model="show" :show-cancel-button="true" content="发布内容需要手机认证" @cancel="cancel">
				<!-- #ifdef MP-WEIXIN -->
				<view slot="confirm-button">
				<button class="register" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">认证</button>
				</view>
				<!-- #endif -->
		</u-modal>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				categories: [],
				action: this.$u.http.config.baseUrl + '/api/operate/upload',
				radioList: [{
						value: 0,
						name: '不显示',
					},
					{
						value: 1,
						name: '仅对会员',
					},
					{
						value: 2,
						name: '对所有人',
					}
				],
				radio: '0',
				model: {
					show_mobile: 0,
					content: '',
					agreement: true,
					category_id: '',
					category: '',
					images: '',
					type: null
				},
				rules: {
					content: [{
							required: true,
							message: '请输入内容',
							trigger: ['change'],
						},
						{
							max: 140,
							message: '内容140字以内',
							trigger: ['change'],
						}
					],
					category: [{
						required: true,
						message: '请选择所属分类',
						trigger: 'change',
					}],
				},
				check: true,
				selectShow: false,
				show:false
			}
		},
		async onLoad(e) {
			this.model.type = e.type
			uni.setNavigationBarTitle({
				title: '发布'+['帖子','动态','文章'][this.model.type-1]
			})
			if (this.model.type == 1) {
				const res = await this.$u.api.category()
				this.categories = res.data.category
			}
		},
		onShow() {
			if(this.vuex_token){
				if(this.vuex_user.verify==0)
				return this.show=true;
			}else{
				this.utils.isLogin()
			}
		},
		onReady() {
			this.$refs.uForm.setRules(this.rules);
		},
		methods: {
			//#ifdef MP-WEIXIN
			 async getPhoneNumber(e){
				 if(e.detail.errMsg.indexOf('fail')!=-1){
					 uni.navigateBack({})
					 return false;
				 }
				const res = await this.$u.api.getPhone(e.detail)
				if(res.code==1){
					this.utils.updateUser()
					setTimeout(()=>{
						uni.showToast({title:res.msg})
					},100)
				}
			},
			//#endif
			uploadError(res) {
				this.$u.toast(res)
			},
			async beforeRemove(index, lists) {
				if(lists[index].response){
					const res = await this.$u.api.deleteImg(lists[index].response.data)
					if (res.code == 0) {
						return false
					}
				}
			},

			radioGroupChange(e) {
				this.model.show_mobile = e;
			},
			submit() {
				this.$refs.uForm.validate(async valid => {
					if (valid) {
						if (!this.model.agreement) return this.$u.toast('请勾选协议');
						let files = this.$refs.upload.lists.filter(val => {
							return val.progress == 100;
						})
						if (files.length > 0) {
							files.forEach(item => {
								this.model.images += item.response.data.url + ','
							})
							this.model.images = this.model.images.slice(0, this.model.images.length - 1)}
						const res = await this.$u.api.publish(this.model)
						if (res.code == 1) {
							uni.showToast({
								title: res.msg
							})
							setTimeout(() => {
								uni.reLaunch({
									url: this.model.type == 1 ? '../index/index' :
										'../square/square'
								})
							}, 1500)
						}
					}
				})
			},
			// 勾选版权协议
			checkboxChange(e) {
				this.model.agreement = e.value;
			},
			selectConfirm(e) {
				this.model.category_id = e[0].value;
				this.model.category = e[0].label;
			},
			toProtocol(){
				uni.navigateTo({
					url:'../other/protocol'
				})
			},
			cancel(){
				uni.navigateBack({})
			}
		}
	};
</script>

<style scoped lang="scss">
	.register{
		background: inherit;
		color: #1296DB;
		padding-top: 10rpx;
	}
	.register::after{
		border: none;
	}
	.agreement {
		display: flex;
		align-items: center;
		margin: 40rpx 0;
		.agreement-text {
			padding-left: 8rpx;
			color: $u-tips-color;
		}
	}
</style>
