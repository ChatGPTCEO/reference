<template>
	<view v-if="newLoadshow" class="fullloading" :style="{backgroundColor: bgcolor}">
		<image :src="loadingImg" :style="{width:iconwidth+'rpx',height:iconheight+'rpx'}"></image>
		<view class="text" v-if="text" :style="{fontSize:textsize+'rpx',color:textcolor}">{{text}}</view>
	</view>
</template>
<script>
import loadingIcon from '@/static/img/loading.gif'
	export default {
		props: {
			text: {
				type: String,
				default() {
					return ''
				}
			},
			iconwidth: {
				type: [Number, String],
				default() {
					return 110
				}
			},
			iconheight: {
				type: [Number, String],
				default() {
					return 110
				}
			},
			textcolor: {
				type: String,
				default() {
					return '#000000'
				}
			},
			textsize: {
				type: [Number, String],
				default() {
					return 30
				}
			},
			bgcolor: {
				type: String,
				default() {
					return 'rgba(0,0,0,.6)'
				}
			},
			loadshow: {
				type: Boolean,
				default() {
					return true
				}
			},
		},
		data() {
			return {
				loadingImg: loadingIcon,
				errorImg: '',
				// TODO 这里关闭loading动画，要是用的话把上面的newLoadshow换成loadshow
				newLoadshow:false,
				/*loadshow:false,*/
			}
		},
		methods: {
		}
	}
</script>
<style scoped>
	.fullloading{
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		background-color: #fff;
		text-align: center;
		z-index: 99999;
	}
	.fullloading image{
		width: 110rpx;
		height: 110rpx;
		margin-top: 50%;
	}
</style>
