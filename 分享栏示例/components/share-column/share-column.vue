<template>
	<view class="">
		<view class="choose_share_type_wrap" :class="{animation_in:is_show_share_box,animation_out:is_show_share_box === false}">
			<view class="share_to">分享到</view>
			<view class='choose_share_type1'>
				<view v-for="(item,index) in provider_list" @click="shareFn(item.name)" :key='index'>
					<image :src='item.url' />
					<view>{{item.name}}</view>
				</view>
			</view>
		</view>
		<view v-if="is_show_share_box" class="mask" @click="hideColumn"></view>
	</view>
</template>

<script>
		import { get_provider } from '@/utils/common.js'
	export default {
		props: {
			// canvas 宽度
			is_show_share_box: {
				type: Boolean,
				default: false
			},
		},
		data() {
			return {
			
	
			
				provider_list: [],
			
				
			};
		},
		methods:{
			shareFn(type){
				this.$emit('share', type)
			},
			hideColumn(){
				this.$emit('hideColumn')
			}
		},
		
		mounted() {
			get_provider().then( res => {
							 this.provider_list = res
			})
		}
		
	};
</script>

<style lang="scss">
	.choose_share_type_wrap {
		transform: translateY(120%);
		position: fixed;
		bottom: 0;
		background-color: #fff;
		width: 100%;
		z-index: 888;
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
	
		.share_to {
			text-align: center;
			padding-top: 15rpx;
			font-size: 28rpx;
			color: #333;
		}
	}
	.choose_share_type1 {
		height: 240rpx;
		width: 100%;
		background-color: #fff;
	
		z-index: 999;
	}
	
	.choose_share_type1 {
		display: flex;
		align-items: center;
		justify-content: space-around;
	
		view {
			display: flex;
			flex-direction: column;
			align-items: center;
	
			image {
				/* width:118rpx;
				height:118rpx; */
				width: 100rpx;
				height: 100rpx;
				border-radius: 50%;
				margin-bottom: 15rpx;
			}
	
			view {
				font-size: 24rpx;
				font-family: Microsoft YaHei;
				font-weight: 400;
				color: rgba(34, 24, 21, 1);
			}
		}
	}
	.mask {
		top: 0;
		width: 100%;
		height: 100%;
		position: fixed;
		z-index: 777;
		background-color: rgba(0, 0, 0, 0.4);
		/* display: none; */
	}
	@keyframes showLayer {
		0% {
			transform: translateY(120%);
		}
	
		100% {
			transform: translateY(0%);
		}
	}
	
	.animation_in {
		animation: showLayer 0.2s linear both;
	}
	@keyframes showLayerout {
		0% {
			transform: translateY(0%);
		}
	
		100% {
			transform: translateY(120%);
		}
	}
	
	.animation_out {
		animation: showLayerout 0.2s linear both;
	}
</style>
