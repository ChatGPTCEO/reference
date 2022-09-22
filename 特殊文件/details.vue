<template>
	<view >
		<!-- 轮播图 -->
		<view >
			<swiper
				indicator-dots="true"
				autoplay="autoplay"
				circular="ture"
				indicator-color="rgba(255,255,255, 0.3)"
				indicator-active-color="rgba(255,255,255, 0.8)"
				interval="5000"
				duration="150"
				easing-function="linear"
			>
				<swiper-item>
					<view><image mode="widthFix" src="/static/image/lunbo1.jpg"></image></view>
					<view><image mode="widthFix" src="/static/image/lunbo2.jpg"></image></view>
				</swiper-item>
			</swiper>
		</view>

		<!-- 主内容 -->
		<view >
			<view >
				<!-- 发布者 -->
				<view >
					<view >
						<view ><image mode="aspectFill" src="/static/image/6.jpg"></image></view>
						<view >
							<view><text>用户昵称</text></view>
							<view><text>发布时间</text></view>
						</view>
					</view>
					<view >
						<view><uni-icons type="more-filled" size="20"></uni-icons></view>
						<view v-if="0">已关注</view>
						<view v-else>+关注</view>
					</view>
				</view>

				<!-- <video v-if="topic.video" :src="topic.video.url"></video> -->
				<video
					v-if="0"
					src="https://q.zhuige.com/wp-content/uploads/2022/07/ec0c93da05f8d4bf8ae48e74928d3a37.mp4"
					poster="https://ss2.meipian.me/users/181373/277b57effeec4cc4bff7d67a07414e98.jpg?imageView2/2/w/750/h/1400/q/80"
					object-fit="cover"
					:style="{
						width: parseInt(4) > parseInt(3) ? '674rpx' : (parseInt(4) / parseInt(3)) * 674 + 'rpx',
						height: parseInt(4) < parseInt(3) ? '674rpx' : (parseInt(3) / parseInt(4)) * 674 + 'rpx'
					}"
				></video>

				<!-- 主内容区 -->
				<view >
					<text>
						如果 exec 方法没有找到匹配，则它返回 null。如果它找到匹配，则 exec 方法返回一个数组，并且更新全局 RegExp
						对象的属性，以反映匹配结果。数组的0元素包含了完整的匹配，而第1到n元素中包含的是匹配中出现的任意一个子匹配。这相当于没有设置全局标志 (g) 的` match 方法。
					</text>
				</view>
				<!-- 地址信息 -->
				<view v-if="1">
					<view>
						<uni-icons type="location-filled" size="20"></uni-icons>
						<view>深圳市龙岗区工业区510号</view>
					</view>
				</view>

				<!-- 话题 -->
				<view v-if="1" >
					<view @click="uni.navigateTo('./pages/index/index')">
						<image mode="aspectFill" src="/static/image/topic.png"></image>
						<view>供应/需求/问题/行情/文章</view>
					</view>
				</view>
			</view>
		</view>

		<!-- 分享 -->
		<view v-if="1">
			<view>
				<view v-if="1" >
					<view >- 3人点赞 -</view>
					<view >
						<!-- 遍历出点赞用户头像 -->
						<view><image mode="aspectFill" src="/static/image/6.jpg"></image></view>
					</view>
				</view>
				<view >
					<!-- 分享海报（见追格detail.vue）：@click="clickPoster()" -->
					<!-- 
					<view>
						<text>分享海报</text>
						<image mode="aspectFill" src="/static/image/poster.png"></image>
					</view> 
					-->

					<!-- 打赏作者（见追格detail.vue）：@click="clickReward" -->
					<view v-if="1">
						<text>打赏作者</text>
						<image mode="aspectFill" src="/static/image/packet.png"></image>
					</view>
				</view>
			</view>
		</view>

		<!-- 评价列表 -->
		<view >
			<view >
				<view >
					<view>近期回复</view>
					<!-- （需添加@click="xxx"） -->
					<view>我要回复</view>
				</view>

				<template v-if="1">
					<!-- 用户评论组件/需要：①遍历出评论列表 ②自定义事件传参  @clickReply="clickReply" -->
					<zhuige-reply></zhuige-reply>
					<!-- 通用无信息 -->
					<view >没有更多数据了</view>
				</template>
				<template v-else>
					<!-- 无内容提示 -->
					<view >
						<image mode="aspectFill" src="/static/image/404.png"></image>
						<view>暂无评论，抢个沙发</view>
					</view>
				</template>
			</view>
		</view>

		<!-- 图片广告 -->
		<view v-if="1" >
			<!-- 要@click跳转 -->
			<view><image mode="aspectFill" src="/static/image/ad-image.jpg"></image></view>
		</view>

		<!-- 相关推荐 -->
		<!--
		<view v-if="topic && topic.recs && topic.recs.length > 0" class="zhuige-detail-recom">
			<zhuige-topic v-for="(topic, index) in topic.recs" :key="index" :topic="topic"></zhuige-topic>
		</view>  
		-->

		<!-- 底部按钮组 -->
		<view v-if="1" >
			<view >
				<uni-icons type="phone-filled" size="16"></uni-icons>
				<text>打电话</text>
			</view>
			<view >
				<uni-icons type="chatboxes-filled" size="16"></uni-icons>
				<text>在线聊</text>
			</view>
			<view >
				<!-- 需添加点击事件 -->
				<view>
					<uni-badge :offset="[0, 12]" :text="8" :inverted="false" type="error" absolute="rightTop">
						<uni-icons :type="1 == 1 ? 'chat-filled' : 'chat'" :color="1 == 1 ? '#fd6531' : '#444444'" size="28"></uni-icons>
					</uni-badge>
				</view>
				<!-- 需添加点击事件 -->
				<view>
					<uni-badge :offset="[0, 12]" :text="12" :inverted="false" type="error" absolute="rightTop">
						<uni-icons :type="1 == 1 ? 'hand-up-filled' : 'hand-up'" :color="1 == 1 ? '#fd6531' : '#444444'" size="28"></uni-icons>
					</uni-badge>
				</view>
				<!-- 需添加点击事件 -->
				<view>
					<uni-badge :offset="[0, 12]" :text="15" :inverted="false" type="error" absolute="rightTop">
						<uni-icons :type="1 == 1 ? 'star-filled' : 'star'" :color="1 == 1 ? '#fd6531' : '#444444'" size="28"></uni-icons>
					</uni-badge>
				</view>
			</view>
		</view>

		<!-- 弹窗 -->
		<uni-popup ref="popup" type="bottom">
			<view>
				<view><textarea maxlength="140" placeholder="友善是交流的起点......" fixed="true"></textarea></view>
				<view >
					<!-- 字数需computer方法 -->
					<text>12/140</text>
					<!-- 需添加点击事件 -->
					<view>确定</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	}
};
</script>

<style lang="scss"></style>
