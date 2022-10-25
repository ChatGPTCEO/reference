<template>
	<view>
		<view class="text-center" style="background: #1296db;">
			<image src="/static/img/logo.png" mode="widthFix" style="width: 50%;"></image>
		</view>
		<view class="u-p-30">
			<u-parse :html="content"></u-parse>
		</view>
		<!--#ifdef MP-WEIXIN -->
		<view class="kefu" >
			<button type="default" open-type="contact" style="background: inherit">
				<u-icon name="server-man" size="100" color="#1296DB" label="客服" label-pos="bottom" class="u-p-10"></u-icon>
			</button>
		</view>
		<!--#endif -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				content: ` <pre style="padding-bottom:200rpx;white-space: pre-wrap;text-align:justify">
悉地吧-同城信息发布平台！作为国内领先的生活服务平台，集本地信息发布与社交互动于一体，业务覆盖招聘、房产、汽车、二手、本地生活服务及商务服务等各个领域。在用户服务层面，不仅是一个信息交互的平台，更是一站式的生活服务平台，同时也逐步为商家建立全方位的市场营销解决方案。


<h4>免费发布</h4>
用户注册登录后，通过手机验证即可在小程序端或手机web端免费发布同城分类信息及分享本地动态，不会收取任何费用。

<h4>均等展示</h4>
系统平台运用算法排序，对每个用户发布的内容提供均等曝光机会。机会面前人人平等！

<h4>涵盖范围广</h4>
本地分类信息涵盖了几乎所有领域的信息发布，包括但不局限于房产、汽车、二手、招工、求职，征婚，宠物，拼车等，

<h4>本地化社交</h4>
同时提供动态分享发布，是本地分享朋友圈的第二阵营！本地实时互动，评论点赞加关注，让你的朋友圈实时展示在全城范围

<h4>运营团队</h4>
专业的平台运营团队提供全方位精细化运营指导，帮助合作伙伴更好的提升经济效益和运营效果。

<h4>品牌推广</h4>
平台针对有需要的客户可以提供有针对性的网络推广营销服务。让营销更有价值！</pre>`

			}
		},
		methods: {

		}
	}
</script>

<style>
	button::after{
		border: none;
	}
	.kefu {
		position: fixed;
		bottom: 40rpx;
		right: 40rpx;
		z-index: 1;
	}
</style>
