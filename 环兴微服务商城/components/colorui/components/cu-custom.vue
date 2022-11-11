<template>
	<view>
		<view class="cu-custom" :style="[{height:CustomBar + 'px'}]">
			<view class="cu-bar fixed" :style="style" :class="[bgImage!=''?'none-bg text-white bg-img':'',bgColor]">
				<view class="action" @tap="BackPage" v-if="isNotBack && isBack">
					<text class="cuIcon-back"></text>
					<slot name="backText"></slot>
				</view>
				<view class="action" @tap="GoHome" v-else-if="!isNotBack && isBack">
					<text class="cuIcon-home">首页</text>
				</view>
				<view class="content" :style="[{top:StatusBar + 'px'}]">
					<slot name="content"></slot>
				</view>
				<slot name="right"></slot>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar,
				isNotBack: true,
			};
		},
		name: 'cu-custom',
		computed: {
			style() {
				var StatusBar = this.StatusBar;
				var CustomBar = this.CustomBar;
				var bgImage = this.bgImage;
				var style = `height:${CustomBar}px;padding-top:${StatusBar}px;`;
				if (this.bgImage) {
					style = `${style}background-image:url(${bgImage});`;
				}
				return style
			}
		},
		props: {
			bgColor: {
				type: String,
				default: ''
			},
			isBack: {
				type: [Boolean, String],
				default: false
			},
			bgImage: {
				type: String,
				default: ''
			},
		},
		mounted: function() {
			let pages = getCurrentPages()
			/**
			 * 判断是否能返回
			 */
			if (pages.length <= 1 || pages[pages.length - 1].route == 'pages/login/index') {
				this.isNotBack = false
			} else {
				this.isNotBack = true
			}
		},
		methods: {
			BackPage() {
				uni.navigateBack({
					delta: 1
				});
			},
			/**
			 * 跳转首页
			 */
			GoHome() {
				uni.switchTab({
					url: '/pages/home/index'
				});
			}
		}
	}
</script>

<style>

</style>
