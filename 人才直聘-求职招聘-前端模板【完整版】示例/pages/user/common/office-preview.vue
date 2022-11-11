<template>
	<view>
		<!-- <office-preview :fileUrl="fileUrl" v-model="showPreview"></office-preview> -->
	</view>
</template>

<script>
	import officePreview from '@/components/m-previewOffce/m-previewOffce.vue'
	export default {
		components:{
			officePreview,
		},
		data() {
			return {
				// https://qingkonglan.oss-cn-hangzhou.aliyuncs.com/wp/20220528/26bab5d203bc4d5b97eef6056dd9b137.doc
				// fileUrl:'https://bendao.oss-cn-shenzhen.aliyuncs.com/job/20220527/00bbe5da03d74db782ba7dbec00efa60.doc',
				// showPreview:true,
			}
		},
		
		onLoad(options) {
			// if(options.url){
			// 	this.fileUrl=options.url;
			// }
			// console.log(this.fileUrl);
			wx.downloadFile({
				url:'https://qingkonglan.oss-cn-hangzhou.aliyuncs.com/wp/20220528/05fa11c511d74c78a5e31addd18fdfd3.pdf',
			  // url: 'https://h5plugin.mumudev.top/public/previewOffce/333.docx',
			  success: function (res) {
				console.log(res);
			    const filePath = res.tempFilePath
				console.log(filePath);
			    wx.openDocument({
			      filePath: filePath,
			      success: function (res) {
			        console.log('打开文档成功')
			      }
			    })
			  }
			})
		},
		
		methods: {
			
		}
	}
</script>

<style>

</style>
