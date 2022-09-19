<template>
	<view class="wf-item-page">
		<image :src="item.urlsList[0]" mode="widthFix" class="item-img" />
		<view style="margin-left: 20rpx;">{{item.zcontent}}</view>
		<view class="item-info">

			<view class="info-nickname">
				<image :src="item.zava" mode="aspectFill" class="info-avatar" />
				<view style="    width: 120rpx;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;">{{item.zname}}<u-icon v-if="item.zgender == '男'" size="25" name="../../../static/boy.png"></u-icon>
				<u-icon v-if="item.zgender == '女'" size="25" name="../../../static/girl.png"></u-icon></view>
				
			</view>
			<view>
				<u-icon name="eye"></u-icon>{{item.view}}
			</view>

		</view>

	</view>
</template>

<script>
	export default {
		
		props: {
			item: {
				type: Object,
				require: true
			}
		}
	}
</script>

<style lang="scss" scoped>
	.wf-item-page {
		background: #fff;
		overflow: hidden;
		border-radius: 5px;
	}

	.item-img {
		width: 100%;
	}

	.item-info {
		display: flex;
		align-items: center;
		padding: 5px;
		justify-content: space-between;
	}

	.info-avatar {
		width: 25px;
		height: 25px;
		border-radius: 50%;
		margin-right: 5px;
	}

	.info-nickname {
		font-size: 12px;
		color: #333;
		display: flex;
		align-items: center;
	}
</style>
