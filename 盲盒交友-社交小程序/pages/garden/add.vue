<template>
	<view class="u-page">
		<view class="u-demo-block">
			<view class="u-demo-block__content">
				<u--textarea placeholder="不低于10个字" v-model="intro" :formatter="formatter" ref="textarea" count  maxlength="500" height="200"></u--textarea>
				<view class="u-alert-item">
					<u-alert
					    :description=description
					    type="primary"
					    showIcon
						@click="location"
					></u-alert>
				</view>
				<u-button type="primary" text="提交" customStyle="margin-top: 20px" @click="submit"></u-button>
			</view>
			<view class="shuo">说明：虽说好心态对于人来说很重要，但是生活在快节奏的时代，我们总是容易心烦意乱，焦虑不安。当心情不好时，又该如何去“倾诉”呢？这里的“倾诉”，我理解为情绪的出口，即释放负面情绪。</view>
		</view>
	</view>
</template>

<script>
		import debounces from '../../util/debounces.js'
	export default {
		data() {
			return {
				uid:0,
				intro: '',
				longitude:'',
				latitude:'',
				description:"请给纸条定个位"
			}
		},
		onLoad() {
			uni.hideShareMenu({
				menus: ['shareAppMessage', 'shareTimeline']
			})
		},
		onShow() {
			const userInfo = uni.getStorageSync('userInfo');
			if (userInfo) {
				this.uid=userInfo.id;
			}
			this.location();
		},
		methods: {

			submit() {
				let intro=this.intro;
				if(this.uid>0){
					if(intro.length>9){
						if(this.longitude!=""){
							uni.showLoading({title: '发布中',mask:true});
							debounces(() => {
								uni.$u.http.post('Note/add',{
									uid:this.uid,
									contents: this.intro,
									longitude:this.longitude,
									latitude:this.latitude,
								})
								 .then(res => {
									// console.log(res)
									if (res.code == 200) {
										uni.hideLoading();
										uni.showToast({
											title:"发布成功" 
										})
										setTimeout(() => {
											// 返回上一页并刷新数据方法
											let pages = getCurrentPages(); // 当前页面
											let beforePage = pages[pages.length - 2]; // 上一页
											beforePage.data.refreshIfNeeded = true;
											// 返回上一页 delta返回的页面数 如果delta大于现有页面数，则返回首页
										  uni.navigateBack({
											delta: 1
										  })
										}, 800);
										
									} else {
										uni.showToast({
											title:res.msg
										})
									}
								})
							},1500)
						}else{
							uni.$u.toast('纸条经纬度不可为空')
						}
					}else{
						uni.$u.toast('纸条不低于10个字')
					}
				}else{
					uni.$u.toast('未登录不可发布')
				}
				
			},
			location() {
				// console.log('开始获取地址');
				let than=this
				uni.getLocation({
					type: 'gcj02',
					success: res => {
						console.log('地址获取成功,切换到目标点nvue', res);
						than.longitude=res.longitude
						than.latitude=res.latitude
						than.description="经度："+res.longitude+"，维度："+res.latitude
					},
					fail: (res) => {
						// console.log('地理位置获取失败',res);
					}
				});
			},

		},
	}
</script>

<style lang="scss">
.shuo{
	margin-top: 30rpx;
	// text-indent:2em;
	 letter-spacing:2rpx;
	font-size: 30rpx;
	color: #aaaaff;
	line-height: 50rpx;
}
.u-alert-item{
	margin-top: 10rpx;
}
</style>
