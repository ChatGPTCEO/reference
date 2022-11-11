<template>
	<view class="container">
		<view class="qaconfigBox boxMargin" v-if="!hideAns">
			<card-item @freshAllData="freshAllData" @refreshData="onRefreshData" :hideAnimation="hideAnimation" :info="ansData" :isLogin="isLogin"></card-item>
		</view>
		<view @tap="jumpToConfigList" class="finish ptp_exposure_card" data-ptpid="dfj3-fkg2-fu35-1jfg" v-else>
			<view class="left">
				<image lazyLoad src="https://qiniu-image.qtshe.com/newHomePage/2020_logo.png"></image>
				<view class="word">全部题目已答完，明日再来哦～</view>
			</view>
			<view class="iconfont iconarrow"></view>
		</view>
		<center-swiper :resourseFrom="recommendList"></center-swiper>
		<view class="boxMargin featuredCardBox">
			<featured-card
				:cardDes="item.cardDes"
				:cardFontStyle="item.cardFontStyle"
				:cardImage="item.cardImage"
				:cardIndex="index"
				:cardTitle="item.title"
				v-for="(item, index) in cardItem"
				:key="item.title"
			></featured-card>
		</view>
		<view class="second-part">
			<featured-title @handlerMore="jumpToMore" featuredTitle="青团公益" :hasMore="true" v-if="welfareTenBeansList.length"></featured-title>
			<featured-welfare :welfareTenBeansList="welfareTenBeansList" v-if="welfareTenBeansList.length"></featured-welfare>
			<block v-if="tagList.length > 0">
				<view class="tag-list-title">“大家都在看”</view>
				<inner-slider :list="tagList" ptpId="taglist"></inner-slider>
			</block>
			<featured-title featuredTitle="精品兼职" v-if="jobsList.length"></featured-title>
			<paging :isEnd="isEnd" :isLoading="isLoading" v-if="jobsList.length"><taste-job :resourseFrom="jobsList"></taste-job></paging>
		</view>
	</view>
</template>

<script>
import cardItem from './components/indexCard/index';
import centerSwiper from './components/centerSwiper/index';
import featuredCard from './components/featuredCard/index';
import featuredWelfare from './components/featuredWelfare/index';
import featuredTitle from './components/featuredTitle/index';
import tasteJob from './components/tasteJob/index';
import paging from '@/components/paging/index';
import innerSlider from '@/components/innerSlider/index';

var app = getApp();

export default {
	components: {
		cardItem,
		centerSwiper,
		featuredCard,
		featuredWelfare,
		featuredTitle,
		tasteJob,
		paging,
		innerSlider
	},
	data() {
		return {
			cardItem: [
				{
					title: '早起打卡',
					cardDes: '每日瓜分200000+青豆',
					cardImage: 'https://qiniu-image.qtshe.com/featured/featureLeft.png',
					cardFontStyle: '#007B56'
				},
				{
					title: '步数兑换',
					cardDes: '每天走一走 好物都在手',
					cardImage: 'https://qiniu-image.qtshe.com/featured/featureRight.png',
					cardFontStyle: '#143598'
				}
			],
			hideAns: false,
			jobsList: [
				{
					businessId: 0,
					businessType: 0,
					color: '',
					contentId: 521898,
					groupId: 1030,
					groupResourceId: 1374,
					image: 'https://qiniu-image.qtshe.com/1619595938773_345.jpg',
					jumpKey: 'USER_PART_JOB_TAG_PAGE',
					param:
						'[{"key":"tagId","name":"标签id","type":"String","value":"1564"},{"key":"tagTitle","name":"标签名称","type":"String","value":""},{"key":"from","name":"填写(固定值):label","type":"String","value":"label"},{"key":"flutterUrl","name":"flutter","type":"String","value":"partJob/tag"},{"key":"jumpUserType","name":"用户类型","type":"String","value":"1"}]',
					salaryDesc: '',
					sourceId: 1030010001,
					subTitle: '宅家赚钱 200元/天',
					tagDesc: '',
					title: '精神食粮发货啦！'
				}
			],
			hideAnimation: false,
			ansScore: '2青豆',
			ansData: {
				id: 43950,
				title: '荷兰性工作是合法的吗？',
				participate: false,
				type: 1,
				endTime: '2021-11-29 23:59:59',
				degreeHeat: 14634,
				salary: '2青豆',
				score: 2,
				showOption: true,
				optionList: ['A、是的', 'B、不是'],
				optionDetailList: [
					{
						content: 'A、是的',
						num: 1,
						percentage: '72.12',
						count: 644
					},
					{
						content: 'B、不是',
						num: 2,
						percentage: '27.88',
						count: 249
					}
				],
				headImgs: [
					'https://qiniu-image.qtshe.com/1575466524064_943.png',
					'https://qiniu-image.qtshe.com/1575466438843_844.png',
					'https://qiniu-image.qtshe.com/1575466438843_844.png'
				],
				ipIcon: 'https://qiniu-image.qtshe.com/1587556348629_414.png',
				ipName: '世界真奇妙',
				voterTurnout: 893,
				firstAnswer: true,
				logo: '',
				sourceId: 1025010001
			},
			welfareTenBeansList: [
				{
					businessId: 1172702,
					businessType: 1,
					color: '',
					contentId: 523409,
					groupId: 1028,
					groupResourceId: 2086,
					image: 'https://qiniu-image.qtshe.com/1635488644595_598.png',
					jumpKey: 'USER_PART_JOB_DETAIL_PAGE',
					param: '[{"key":"partJobId","name":"兼职id","type":"String","value":1172702},{"key":"jumpUserType","name":"用户类型","type":"String","value":1}]',
					salaryDesc: '',
					sourceId: 1028010001,
					subTitle: '校园公益活动',
					tagDesc: '',
					title: '电影文化传播志愿者招募'
				},
				{
					businessId: 476484,
					businessType: 1,
					color: '',
					contentId: 522290,
					groupId: 1028,
					groupResourceId: 1937,
					image: 'https://qiniu-image.qtshe.com/1630659108973_669.png',
					jumpKey: 'USER_PART_JOB_DETAIL_PAGE',
					param: '[{"key":"partJobId","name":"兼职id","type":"String","value":"476484"},{"key":"jumpUserType","name":"用户类型","type":"String","value":1}]',
					salaryDesc: '',
					sourceId: 1028010002,
					subTitle: '关爱星星的孩子',
					tagDesc: '',
					title: '自闭症线上公益志愿者招募'
				},
				{
					businessId: 1012916,
					businessType: 1,
					color: '',
					contentId: 522137,
					groupId: 1028,
					groupResourceId: 1509,
					image: 'https://qiniu-image.qtshe.com/1615521089160_676.png',
					jumpKey: 'USER_PART_JOB_DETAIL_PAGE',
					param: '[{"key":"partJobId","name":"兼职id","type":"String","value":1012916},{"key":"jumpUserType","name":"用户类型","type":"String","value":"1"}]',
					salaryDesc: '',
					sourceId: 1028010003,
					subTitle: '招募生态保护志愿者',
					tagDesc: '',
					title: '中国绿化基金会'
				},
				{
					businessId: 428331,
					businessType: 1,
					color: '',
					contentId: 522145,
					groupId: 1028,
					groupResourceId: 293,
					image: 'https://qiniu-image.qtshe.com/1597922406210_793.png',
					jumpKey: 'USER_PART_JOB_DETAIL_PAGE',
					param: '[{"key":"partJobId","name":"兼职id","type":"String","value":428331},{"key":"jumpUserType","name":"用户类型","type":"String","value":"1"}]',
					salaryDesc: '',
					sourceId: 1028010004,
					subTitle: '传递“指尖上的幸福”',
					tagDesc: '',
					title: '“蓝信封”公益大使招募 '
				},
				{
					businessId: 657781,
					businessType: 1,
					color: '',
					contentId: 521387,
					groupId: 1028,
					groupResourceId: 44,
					image: 'https://qiniu-image.qtshe.com/1595474313015_198.png',
					jumpKey: 'USER_PART_JOB_DETAIL_PAGE',
					param: '[{"key":"partJobId","name":"兼职id","type":"String","value":657781}]',
					salaryDesc: '',
					sourceId: 1028010005,
					subTitle: '为聋人群体出一份力',
					tagDesc: '',
					title: '无声陪伴志愿者招募'
				}
			],
			firstEntrance: {
				type: 2,
				image: 'https://qiniu-image.qtshe.com/featured/firstEntrance.png',
				jumpPath: '/pages/labelList/labelList?tagId=1200'
			},
			secondEntrance: {
				type: 2,
				image: 'https://qiniu-image.qtshe.com/featured/secondEntrance.png',
				jumpPath: '/sundry/experienceEvaluationList/index'
			},
			thirdEntrance: {
				type: 3,
				image: 'https://qiniu-image.qtshe.com/featured/thirdEntrance.png',
				jumpPath: 'https://m.qtshe.com/app/evaluation?tab=3'
			},
			isEnd: true,
			pageNum: 1,
			tagList: [],
			isLogin: '',
			recommendList: [],
			isLoading: false
		};
	},
	onLoad: function(t) {
		this.getJobListData();
	},
	onShow: function() {
		this.getAnsItem();
		this.getFeaturedData();
	},
	onPullDownRefresh: function() {},
	onReachBottom: function() {},
	methods: {
		freshAllData: function() {},

		onRefreshData: function() {},

		jumpToConfigList: function() {},

		getAnsItem: function() {},

		stopRefresh: function() {},

		getFeaturedData: function() {},

		getJobListData: function() {},

		jumpToMore: function() {},

		loadMore: function() {}
	}
};
</script>
<style lang="scss" scoped>
@import './featured.scss';
</style>
