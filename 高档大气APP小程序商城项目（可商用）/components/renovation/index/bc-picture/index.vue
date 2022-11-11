<template>
	<view class=""> 
		<template v-if="pictrueInfo.type == 0">
			<picture-one :pictureList="pictrueInfo.pictureInfo"></picture-one>
		</template>
		<template v-if="pictrueInfo.type == 1">
			<picture-two :pictureList="pictrueInfo.pictureInfo"></picture-two>
		</template>
		<template v-if="pictrueInfo.type == 2">
			<picture-three :pictureList="pictrueInfo.pictureInfo"></picture-three>
		</template>
	</view>
</template>

<script>
	import pictureOne from '@/components/renovation/index/bc-picture/picture-one';  //单张图片  如果上传多张的话，会自动按竖排列
	import pictureTwo from '@/components/renovation/index/bc-picture/picture-two';  //一排两张图片 ，如果上传多张的话会自动分行
	import pictureThree from '@/components/renovation/index/bc-picture/picture-three'; //左右两排图片  左边为大图，右边为竖排小图，右边会按照左图的高设定高度
	export default {
		data(){
			return{
			}
		},
		components:{
			pictureOne,
			pictureTwo,
			pictureThree
		},
		props:{
			pictrueInfo: {
				type: [String, Object],
				default: () => {
					return {};
				}
			},
		}
	}
</script>

<style lang="scss">
</style>
