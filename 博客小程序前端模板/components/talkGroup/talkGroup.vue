<template>
	<!-- 交流群组件 -->
	<view class="talk-container">
		<view class="talk-title">技术交流群</view>
		<view class="talk-content">
			<image src="https://code-grade-server-prd.oss-cn-shenzhen.aliyuncs.com/smart-config-img/talk.png" class="talk-image"></image>
			<view class="right-content-talk">
				<view class="numbers">技术交流群-1群 {{num}}</view>
				<view class="question">
					<scroll-view style="height: 30rpx;">
						<swiper autoplay vertical>
							<swiper-item v-for="(item, index) in propleData" :key="index">{{item.name}}</swiper-item>
						</swiper>
					</scroll-view>

				</view>
			</view>
		</view>
		<view class="talk-footer">
			<image src="https://code-grade-server-prd.oss-cn-shenzhen.aliyuncs.com/smart-config-img/ic_chat_people.png" class="header-image"></image>
			<view class="people-nums">{{peopleNum}}</view>
			<view class="example-title">人正在热聊热门技术</view>
			<view class="empty"></view>
			<button class="join-btn">立刻加入</button>
		</view>
	</view>

</template>

<script>
	var talkArr = [{
			name: "森：这个楼盘怎么样，值得买吗？"
		},
		{
			name: "时光机：挺不错的啊"
		},
		{
			name: "随心：现场有优惠活动，可以去看看"
		},
		{
			name: "Lucas：周边环境还可以"
		},
		{
			name: "小鱼鱼：值得入手"
		},
		{
			name: "贤：我老婆挺喜欢的"
		},
		{
			name: "旧念何挽：这个楼盘好不好？"
		},
		{
			name: "C.yy：对比周边，性价比高"
		},
		{
			name: "约瑟：准备入手一套"
		},
		{
			name: "孔龙飞：户型采光好"
		},
		{
			name: "黛子：你买了哪个户型啊"
		},
		{
			name: "小丸子：大家组团去看看呀"
		},
		{
			name: "董董：谁来点评下这个盘？"
		},
		{
			name: "小石头：地段还行"
		},
		{
			name: "七七妈：性价比高"
		},
		{
			name: "春暖花开：未来升值空间还是有的"
		},
		{
			name: "阿霞：周末一起约看房呀"
		},
		{
			name: "大头明：售楼处美眉不错，哈哈"
		}
	];
	export default {
		name: "buyHouseTalk",
		data() {
			return {
				propleData: [],
				peopleNum: '',
				num: ''
			};
		},
		created() {
			var arrIndex = Math.floor(Math.random() * 3);
			this.propleData = talkArr.slice(arrIndex * 6, 6 + (arrIndex * 6))
			this.peopleNum = Math.floor(Math.random() * 7000) + 3000;
			this.num = Math.floor(Math.random() * 300) + 200;
		},
		props: {
			cityName: {
				type: String,
				value: '深圳'
			},
			groupNum: {
				type: Number,
				value: ''
			},
			getPhoneNumbers: {
				type: String,
				default: ""
			},
			liuzi_info: {
				type: Object,
				value: {},
			},
		},
		methods: {
			getPhoneNumber: function(e) {
				console.log("获取用户电话号码点击", e)
				if (this.liuzi_info && this.liuzi_info.type) {
					this.$emit('buyHouseGetPhoneNumber', {
						phone: e,
						liuzi_info: this.liuzi_info
					})
					return
				}
				this.$emit("buyHouseGetPhoneNumber", e)
			},
			joinBuyGroup: function(e) {
				console.log("点击加入button")

				if (this.liuzi_info && this.liuzi_info.type) {
					this.$emit('buyHouseJoinGroup', {
						liuzi_info: this.liuzi_info,
						e: e
					})
					return
				}
				this.$emit('buyHouseJoinGroup', e);

			}

		}
	}
</script>

<style scoped>
	@import url("./talkGroup.css");
</style>
