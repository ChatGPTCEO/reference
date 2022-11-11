<template>
	<view>
		<view class="swaloading flex justify-center align-center" :style="hasTopbar?('top:'+CustomBar+'px;height:calc(100% - '+CustomBar+'px)'):''" :class="'bg-'+bgColor">
			<view class="text-empty">
				<view class="cu-load loading load-cuIcon">加载中</view>
			</view>
		</view>
	</view>
</template>

<script>
	
	export default {
		name: 'swaload',
		data() {
			return {
				CustomBar: this.CustomBar
			};
		},
		props: {
			bgColor: {
				type: String,
				default: 'white'
			},
			hasTopbar:{
				type: [Boolean, String],
				default: false
			}
		}
	}
</script>

<style>
	.swaloading{position: absolute;z-index: 998; width: 100%; height: 100%; top: 0; left: 0;}
</style>