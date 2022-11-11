<template>
	<view>
		<view class="cu-custom" :style="'height:'+Custom_Bar+'px'">
			<view class="cu-bar fixed" :style="style" :class="[bgImage!=''?'none-bg text-white bg-img':'',bgColor,Barborder]">
				<view class="action" @tap="BackPage" v-if="isBack">
					<text class="cuIcon-back"></text>
				</view>
				<slot name="left"></slot>
				<view class="content" :style="'top:'+Status_Bar+'px'">
					<slot name="content"></slot>
				</view>
				<slot name="right"></slot>
			</view>
		</view>
	</view>
</template>

<script>
	import core from "@/core.js"
	
	export default {
		data() {
			return {
				Status_Bar: this.StatusBar,
				Custom_Bar: this.CustomBar
			};
		},
		name: 'cu-custom',
		computed: {
			style() {
				var StatusBar= this.Status_Bar;
				var CustomBar= this.Custom_Bar;
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
				default: function(){
					return core.style.navbg;
				}
			},
			isBack: {
				type: [Boolean, String],
				default: false
			},
			bgImage: {
				type: String,
				default: ''
			},
			Barborder:{
				type: String,
				default: ''
			}
		},
		methods: {
			BackPage() {
				core.back();
			}
		}
	}
</script>

<style>

</style>
