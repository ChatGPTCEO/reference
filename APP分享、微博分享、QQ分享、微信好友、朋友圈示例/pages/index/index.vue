<template>
	<view class="content">
		<button type="default" @click="onShare()">APP分享-默认不设置type</button>
		<button type="default" @click="onShareType(0)">APP分享-图文</button>
		<button type="default" @click="onShareType(1)">APP分享-纯文字</button>
		<button type="default" @click="onShareType(2)">APP分享-纯图片</button>
		<button type="default" @click="onShareType(3)">APP分享-音乐</button>
		<button type="default" @click="onShareType(4)">APP分享-视频</button>
		<button type="default" @click="onShareType(5)">APP分享-小程序</button>
	</view>
</template>

<script>
	import appShare, { closeShare } from "@/utils/share.js"
	export default {
		data() {
			return {
				title: ''
			}
		},
		onLoad() {

		},
		methods: {
			onShare(){
				let shareData = {
					shareUrl:"https://kemean.com/",
					shareTitle:"分享的标题",
					shareContent:"分享的描述",
					shareImg:"http://qn.kemean.cn//upload/202004/18/1587189024467w6xj18b1.jpg",
					appId : "wxd0e0881530ee4444", // 默认不传type的时候，必须传appId和appPath才会显示小程序图标
					appPath : "pages/home/home",
					appWebUrl : "https://kemean.com/",
				};
				let shareObj = appShare(shareData,res => {
					console.log("分享成功回调",res);
					// 分享成功后关闭弹窗
					// 第一种关闭弹窗的方式
					closeShare();
				});
				setTimeout(() => {
					// 第二种关闭弹窗的方式
					shareObj.close();
				},5000); 
			},
			onShareType(type){
				let shareData = {
					shareUrl:"https://kemean.com/",
					shareTitle:"分享的标题",
					shareContent:"分享的描述",
					shareImg:"http://qn.kemean.cn//upload/202004/18/1587189024467w6xj18b1.jpg",
				};
				if(type == 3){
					shareData.mediaUrl = "http://qn.kemean.cn//upload/202004/18/1587189572683fync9eks.mp3";
					shareData.type = type;
				} else if(type == 4){
					shareData.mediaUrl = "https://www.w3school.com.cn/i/movie.mp4";
					shareData.type = type;
				}else if(type == 5){
					// 小程序必须是在微信开放平台与App绑定的才行
					shareData.appId = "wxd0e0881530ee4444";
					shareData.appPath = "pages/home/home";
					shareData.appWebUrl = "https://kemean.com/";
					shareData.type = type;
				}
				appShare(shareData,res => {
					console.log("分享成功回调",res);
				});
			}
		}
	}
</script>

<style>
	.content {
		padding-top: 30upx;
	}
	button {
		margin-bottom: 30upx;
		border: 0;
	}
</style>
