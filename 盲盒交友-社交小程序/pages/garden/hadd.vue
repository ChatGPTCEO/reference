<template>
	<view class="u-page">
		<view class="u-demo-block">
			<view class="u-demo-block__content">
				<u--textarea placeholder="不低于10个字" v-model="intro" :formatter="formatter" ref="textarea" count  maxlength="100" height="150"></u--textarea>
				<view class="u-demo-block">
					<text class="u-demo-block__title">上传图片</text>
					<view class="u-demo-block__content">
						<view class="u-page__upload-item">
						<u-upload
							:fileList="fileList1"
							@afterRead="afterRead"
							@delete="deletePic"
							name="1"
							multiple
							:maxCount="9"
						></u-upload>
						</view>
					</view>
				</view>
				<u-button type="primary" text="提交" customStyle="margin-top: 20px" @click="submit"></u-button>
			</view>
		</view>
	</view>
</template>

<script>
		import debounces from '../../util/debounces.js'
	export default {
		data() {
			return {
				fileList1: [],
				uid:0,
				labelsid:0,
				intro: '',
				longitude:'',
				latitude:'',
				description:"请给纸条定个位"
			}
		},
		onLoad(e) {
			this.labelsid = e.id
			uni.hideShareMenu({
				menus: ['shareAppMessage', 'shareTimeline']
			})
		},
		onShow() {
			const userInfo = uni.getStorageSync('userInfo');
			if (userInfo) {
				this.uid=userInfo.id;
			}
		},
		methods: {
// 删除图片
			deletePic(event) {
				this[`fileList${event.name}`].splice(event.index, 1)
			},
			// 新增图片
			async afterRead(event) {
				// 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
				let lists = [].concat(event.file)
				let fileListLen = this[`fileList${event.name}`].length
				lists.map((item) => {
					this[`fileList${event.name}`].push({
						...item,
						status: 'uploading',
						message: '上传中'
					})
				})
				for (let i = 0; i < lists.length; i++) {
					const result = await this.uploadFilePromise(lists[i].url)
					// console.log("result",result)
					let item = this[`fileList${event.name}`][fileListLen]
					this[`fileList${event.name}`].splice(fileListLen, 1, Object.assign(item, {
						status: 'success',
						message: '',
						url: result
					}))
					fileListLen++
				}
			},
			uploadFilePromise(url) {
				return new Promise((resolve, reject) => {
					let a = uni.uploadFile({
						url: 'https://www.xiexinfeng.top/testb/upload/imges', // 仅为示例，非真实的接口地址
						filePath: url,
						name: 'file',
						success: (res) => {
							setTimeout(() => {
								// console.log("111",JSON.parse(res.data).data)
								resolve(JSON.parse(res.data).data)
							}, 1000)
						}
					});
				})
			},
			submit() {
				let intro=this.intro;
				// console.log("111",this.fileList1)
				let picture="";
				for (let i=0;i<this.fileList1.length;i++) {
					if(i==0){
						picture=this.fileList1[i].url
					}else(
						picture=picture+","+this.fileList1[i].url
					)
				}
				if(this.uid>0){
					if(intro.length>9){
						if(this.fileList1.length>0){
							
							uni.showLoading({title: '发布中',mask:true});
							debounces(() => {
								uni.$u.http.post('Forum/add',{
									uid:this.uid,
									content: this.intro,
									labelsid:this.labelsid,
									picture:picture
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
							uni.$u.toast('图片不可为空')
						}
					}else{
						uni.$u.toast('纸条不低于10个字')
					}
				}else{
					uni.$u.toast('未登录不可发布')
				}
				
			},
			
		},
	}
</script>

<style lang="scss">
.u-alert-item{
	margin-top: 10rpx;
}
.u-demo-block__title{
	margin-top: 10rpx;
}
</style>
