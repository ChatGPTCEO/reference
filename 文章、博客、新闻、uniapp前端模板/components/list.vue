<template>
	<view>
		<view class="" v-for="(item,index) in 10" :key="index">
			<u-card :title="title" :sub-title="subTitle" :full="true" :border="false" :padding="20" margin="10rpx" :footBorderTop="false" :footStyle="footStyle" @click="toDetail">
				<view class="" slot="body">
					<view class="u-body-item u-flex u-border-bottom u-col-between u-p-t-0">
						<view class="u-body-item-title u-font-sm u-line-3">{{content}}</view>
						<image src="https://img11.360buyimg.com/n7/jfs/t1/94448/29/2734/524808/5dd4cc16E990dfb6b/59c256f85a8c3757.jpg" mode="aspectFill"></image>
					</view>
				</view>
				<view class="" slot="foot">
					<u-icon name="thumb-up-fill" size="32" color="#2BC3C8" label="30 点赞" labelSize="24" class="u-m-r-30"></u-icon>
					<u-icon name="eye-fill" size="32" color="#2BC3C8" label="30 浏览" labelSize="24"></u-icon>
				</view>
			</u-card>
			<u-gap bgColor="#ededed" height="20"></u-gap>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				footStyle:{
					'paddingTop':'0rpx'
				},
				title: '素胚勾勒出青花，笔锋浓转淡，笔锋浓转淡',
				subTitle: '2020-05-15',
				content:'瓶身描绘的牡丹一如你初妆，冉冉檀香透过窗心事我了然，宣纸上走笔至此搁一半瓶身描绘的牡丹一如你初妆，冉冉檀香透过窗心事我了然，宣纸上走笔至此搁一半'
			}
		},
		onLoad() {

		},
		methods: {
			toDetail() {
				this.$common.navigateTo('/pages/index/detail')
			},
		}
	}
</script>

<style lang="scss" scoped>
	.u-card-wrap {
		background-color: $u-bg-color;
		padding: 1px;
	}

	.u-body-item {
		font-size: 32rpx;
		color: #333;
		padding: 20rpx 10rpx;
	}

	.u-body-item image {
		width: 120rpx;
		flex: 0 0 120rpx;
		height: 120rpx;
		border-radius: 8rpx;
		margin-left: 12rpx;
	}
</style>
