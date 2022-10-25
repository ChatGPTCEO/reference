<template>
	<view>
			<view class="text-center u-p-30">
				<text class="text-xl">问题或意见反馈</text>
				<view class="u-light-color u-m-t-30">请尽量详细描述问题或意见，我们会第一时间处理</view>
			</view>
			<view class="u-p-40">
				<u-input type="textarea" v-model="content" :border="true" height="200" placeholder="请在此输入问题或意见反馈"></u-input>
			<view  class="u-m-t-20">
					<u-input type="number" v-model="phone" :border="true"  placeholder="联系方式（手机）"></u-input>
			</view>
				<view class="u-m-t-20">
					<u-upload ref="upload" height="160" width="160" max-count=3 :action="action" :header="{token:vuex_token}" :form-data="{feedback:1}" v-if="vuex_token" ></u-upload>
				</view>
				<view class="u-m-t-60">
					<u-button type="primary" shape="circle"  @click="submit">提交</u-button>
				</view>
			</view>
		</view>
</template>

<script>
	export default {
		data() {
			return {
				action: this.$u.http.config.baseUrl + '/api/operate/upload',
				phone:'',
				content:'',
				images:''
			}
		},
		
		methods: {
			async submit() {
				if (this.$u.test.isEmpty(this.content))
					return this.$u.toast('内容不能为空')
					if(!this.$u.test.isEmpty(this.phone)&&!this.$u.test.mobile(this.phone)){
						return this.$u.toast('手机号不正确')
					}
					if(this.vuex_token){
						let files = this.$refs.upload.lists.filter(val => {
							return val.progress == 100;
						})
						if (files.length > 0) {
							files.forEach(item => {
								this.images += item.response.data.url + ','
							})
							this.images = this.images.slice(0, this.images.length - 1)
						}
					}
			
				const params = {
					phone:this.phone,
					content:this.content,
					images:this.images
				}
				const res = await this.$u.api.feedback(params)
				if (res.data == 1) {
					uni.showToast({
						title:res.msg
					})
					setTimeout(()=>{
						uni.navigateBack({})
					},1500)
				}
			}
		}
	}
</script>

