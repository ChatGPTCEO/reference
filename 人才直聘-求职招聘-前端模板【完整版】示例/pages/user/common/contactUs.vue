<template>
	<view class="column with-100">
		<view class="bg-white column padding-height-20 margin-bottom-20">
			<view class="contact-content">
				<image class="logo" :src="item.logo"></image>
				<text class="name">{{item.name}}</text>
				<uni-list class="list">
					<uni-list-item title="联系电话" @click="call(item.servicePhone)" showArrow clickable="true" :rightText="item.servicePhone" thumb="/static/img/phone.png"
					thumb-size="sm" />
					<uni-list-item title="客服微信" @click="copyText(item.wechatNumber)" showArrow clickable="true" :rightText="item.wechatNumber" thumb="/static/img/wechat.png"
					thumb-size="sm"/>
					<uni-list-item title="客服QQ"  @click="copyText(item.qqNumber)" showArrow clickable="true" :rightText="item.qqNumber" thumb="/static/img/qq.png"
					thumb-size="sm"/>
					<uni-list-item title="邮箱地址"  @click="copyText(item.email)" showArrow clickable="true" :rightText="item.email" thumb="/static/img/email.png"
					thumb-size="sm"/>
					<uni-list-item title="公司官网" @click="copyText(item.website)" showArrow clickable="true" :rightText="item.website" thumb="/static/img/website.png"
					thumb-size="sm"/>
				</uni-list>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			opinion: '',
			aboutus: '',
			item:{
				logo:'/static/logo.png',
				name:'xxx网络科技有限公司',
				servicePhone:'15888888888',
				wechatNumber:'232323232',
				qqNumber:'2342342323',
				email:'123123123213@qq.com',
				website:'www.baidu.com'
				
			}
		};
	},
	onLoad() {
		this.getContactUs();
	},
	methods: {
		
		async getContactUs(){
			this.item = await this.$apis.getContactUs();
			console.log(this.item)
		},
		
		/**
		 * banner加载后触发的回调
		 */
		onqueryload(data) {
			console.log('onqueryload==', data);
		},

		opinionInput(e) {
			this.opinion = e.detail.value;
		},
		
		call(phone){
			console.log("拨打电话：",phone);
			uni.makePhoneCall({
				phoneNumber:phone
			})
		},

		copyText(content) {
			console.log('copyText==', content);
			uni.setClipboardData({
				data: content,
				success: function(res) {
					uni.getClipboardData({
						success: function(res) {
							uni.showToast({
								title: '复制成功',
								duration: 2000
							});
						}
					});
				}
			});
		}
	}
};
</script>

<style lang="scss">
	
.contact-content{
	display: flex;
	flex-direction: column;
	align-items: center;
	
	.logo{
		width: 200upx;
		height: 200upx;
		padding: 30upx 0;
	}
	
	.list{
		margin-top: 50upx;
		width: 100%;
	}
}


</style>
