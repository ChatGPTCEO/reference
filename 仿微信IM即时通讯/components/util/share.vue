<template>
	<view class="sharepannel" :class="'share-'+platform">
		<view class="cu-modal sharemodal" :class="showshare?'show':''">
			<view class="text-white padding-xl center">
				<text class="text-xl">当前版本未支持分享功能</text>
				<view class="text-xl">
					请联系作者购买完整版本
				</view>
				<view class="padding-top flex flex-direction">
					<button @click="doclose()" class="cu-btn round line-white lg">返回</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import core from "@/core.js"
	
	export default {
		name: 'share',
		data(){
			return {
				inwechat:core.inwechat,
				logo:core.system.logo,
				theme:core.style,
				platform:core.platform
			}
		},
		mounted(){
		},
		props: {
			showshare:{
				type:Boolean,
				default:false
			},
			shareinfo : {
				type:Object,
				default:function(){
					return {
						title:'',
						summary:'',
						url:'',
						cover:''
					}
				}
			}
		},
		computed:{
			
		},
		methods:{
			doclose(){
				this.$emit('closeshare');
			}
		}
	}
</script>

<style>
	.sharemodal{z-index: 999; background: rgba(0, 0, 0, 0.8);}
	.sharemodal .center{vertical-align: middle; display: inline-block; text-align: left; line-height: 70upx;}
</style>
