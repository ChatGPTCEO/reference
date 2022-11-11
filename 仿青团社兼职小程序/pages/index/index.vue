<template>
	<view>
		<page-meta :pageStyle="'overflow: ' + (listFilterVisitor ? 'hidden' : 'auto')"></page-meta>
		<view class="container">
			<view class="white-block" :style="'height:' + sysHeight + 'px'" v-if="isSearchFixed"></view>
			<view class="top-module">
				<big-banner :resourseFrom="bigBannerList"></big-banner>
				<word-swiper :list="wordList"></word-swiper>
				<view class="base-line"></view>
				<search
					@signClick="signClick"
					:cityName="townName"
					:clearWordChange="clearWordChange"
					:fixedHeight="sysHeight"
					:isLogin="isLogin"
					:isSearchFixed="isSearchFixed"
					:isSign="isSign"
					:list="searchList"
				></search>
				<choiceness-part :isSign="isSign" :resourseFrom="channels" v-if="channels.length > 0"></choiceness-part>
			</view>
			<view class="select-job-area" v-if="firstLoaded">
				<view class="title-box"><view class="new-page-title title2 ignoreT2">团子精选</view></view>
				<view class="base-line"></view>
				<view :class="'gradient-bg ' + (isFixed ? 'fixed white' : '') + ' ' + (tabList[jobItemType].key === '3' && showGuide ? 'white' : '')"
					:style="'top: ' + (isFixed ? sysHeight + 40 : '') + 'px'">
					<tab @tabChange="tabChange" :tabList="tabList"></tab>
					<view v-if="showFilter">
						<list-filter
							:areas="areas"
							@change="filterChange"
							class="filterRef"
							className="index-filter"
							:clearingList="clearingForms"
							:controlPop="controlPop"
							:jobtypeList="classifications"
							:ptpId="tabList[jobItemType].key"
							:sortRules="sortRules"
							:typeIndex="jobItemType"
							:userSex="userSex"
						></list-filter>
					</view>
				</view>

				<view
					:class="'school-life-job-list ' +(isFixed && showFilter ? 'padding206' : isFixed && !showFilter ? 'padding106' : tabList[jobItemType].key !== '1' ? 'padding16' : '') +' ' +(tabList[jobItemType].key === '4' ? 'padding0' : '')">
					<position-guide @handleTapGuide="locationHandle" v-if="tabList[jobItemType].key === '3' && showGuide"></position-guide>
					<regular-item
						@btnFresh="btFresh"
						:data="item"
						:index="index"
						:listIndex="tabList[jobItemType].key"
						:ptpId="'jfb2-dn2b-dn1b-718d-' + tabList[jobItemType].key"
						:type="jobItemType"
						v-for="(item, index) in homeList"
						:key="index"
					></regular-item>
					<view class="noneList" v-if="homeList.length === 0 && isLoading">
						<image lazyLoad mode="widthFix" src="https://qiniu-image.qtshe.com/719default-page1.png"></image>
						<text>此时内心是空荡荡的</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import bigBanner from './components/bigBanner/index';
// import brandJob from './components/brandJob/index';
import choicenessPart from './components/choicenessPart/index';
import listFilter from '../../components/newListFilter/index';
// import newBrandJob from './components/newBrandJob/index';
import positionGuide from './components/positionGuide/index';
import regularItem from '../../components/regularItem/index';
import search from './components/search/index';
import tab from './components/tab/index';
import wordSwiper from './components/wordSwiper/index';

var app = getApp();
export default {
	components: {
		bigBanner,
		// brandJob,
		choicenessPart,
		listFilter,
		// newBrandJob,
		positionGuide,
		regularItem,
		search,
		tab,
		wordSwiper
	},
	data() {
		return {
			townName: '茂名',
			wordList: [
				{
					title: '青团保障｜兼职无忧',
					subTitle: '11重岗位审核·1000万薪资保障·100%客服响应'
				}
			],
			tabList: [
				{
					key: '1',
					value: '推荐'
				},
				{
					key: '2',
					value: '在家做'
				},
				{
					key: '3',
					value: '在本地'
				},
				{
					key: '4',
					value: '主播'
				},
				{
					key: '5',
					value: '在线课程'
				},
				{
					key: '6',
					value: '文案编辑'
				},
				{
					key: '7',
					value: '服务员'
				},
				{
					key: '8',
					value: '导购'
				},
				{
					key: '9',
					value: '家教培训'
				},
				{
					key: '10',
					value: '全职'
				},
				{
					key: '11',
					value: '实习'
				}
			],
			channels: [
				{
					businessId: 0,
					businessType: 0,
					color: '',
					contentId: 522160,
					groupId: 1008,
					groupResourceId: 161,
					image: 'https://qiniu-image.qtshe.com/1618322211416_8.png',
					jumpKey: 'WORK_TAG_NEW',
					param: [
						{
							key: 'labelId',
							name: '标签Id',
							type: 'String',
							value: '10023'
						},
						{
							key: 'labelName',
							name: '标签名',
							type: 'String',
							value: ''
						},
						{
							key: 'jumpUserType',
							name: '用户类型',
							type: 'String',
							value: '1'
						}
					],
					salaryDesc: '',
					sourceId: 1008010001,
					subTitle: '赚钱',
					tagDesc: '',
					title: '宅家赚'
				},
				{
					businessId: 0,
					businessType: 0,
					color: '',
					contentId: 522163,
					groupId: 1008,
					groupResourceId: 32,
					image: 'https://qiniu-image.qtshe.com/1623044690803_898.png',
					jumpKey: 'WORK_TAG_NEW',
					param: [
						{
							key: 'labelId',
							name: '标签Id',
							type: 'String',
							value: '10204'
						},
						{
							key: 'labelName',
							name: '标签名',
							type: 'String',
							value: ''
						},
						{
							key: 'jumpUserType',
							name: '用户类型',
							type: 'String',
							value: '1'
						}
					],
					salaryDesc: '',
					sourceId: 1008010002,
					subTitle: '2',
					tagDesc: '',
					title: '学生专区'
				},
				{
					businessId: 0,
					businessType: 0,
					color: '',
					contentId: 521841,
					groupId: 1008,
					groupResourceId: 1285,
					image: 'https://qiniu-image.qtshe.com/1610538926655_802.png',
					jumpKey: 'USER_CLIENT_OPEN_MINI_APP',
					param: [
						{
							key: 'userName',
							name: '小程序name',
							type: 'String',
							value: 'gh_7c2bc00a6bf8'
						},
						{
							key: 'path',
							name: '页面路径',
							type: 'String',
							value: 'qaconfig/index/index'
						},
						{
							key: 'jumpUserType',
							name: '用户类型',
							type: 'String',
							value: '1'
						}
					],
					salaryDesc: '',
					sourceId: 1008010003,
					subTitle: '2',
					tagDesc: '',
					title: '答题赚青豆'
				},
				{
					businessId: 0,
					businessType: 0,
					color: '',
					contentId: 522395,
					groupId: 1008,
					groupResourceId: 1835,
					image: 'https://qiniu-image.qtshe.com/1610539044721_987.png',
					jumpKey: 'WORK_TAG_NEW',
					param: [
						{
							key: 'labelId',
							name: '标签Id',
							type: 'String',
							value: '10117'
						},
						{
							key: 'labelName',
							name: '标签名',
							type: 'String',
							value: ''
						},
						{
							key: 'jumpUserType',
							name: '用户类型',
							type: 'String',
							value: '1'
						}
					],
					salaryDesc: '',
					sourceId: 1008010004,
					subTitle: '主播专场',
					tagDesc: '',
					title: '日进斗金'
				},
				{
					businessId: 0,
					businessType: 0,
					color: '',
					contentId: 523849,
					groupId: 1008,
					groupResourceId: 1297,
					image: 'https://qiniu-image.qtshe.com/1638154632455_163.png',
					jumpKey: 'WORK_TAG_NEW',
					param: [
						{
							key: 'labelId',
							name: '标签Id',
							type: 'String',
							value: '10306'
						},
						{
							key: 'labelName',
							name: '标签名',
							type: 'String',
							value: ''
						},
						{
							key: 'jumpUserType',
							name: '用户类型',
							type: 'String',
							value: '1'
						}
					],
					salaryDesc: '',
					sourceId: 1008010005,
					subTitle: '',
					tagDesc: '',
					title: '青团严选'
				}
			],
			loinTotal: 0,
			isSign: false,
			pageNum: 1,
			pageSize: 20,
			isEnd: false,
			jobItemType: 0,
			prevItemType: 0,
			homeList: [
				{
					addressDetail: '不限工作地点',
					partJobId: 1143226,
					title: '周结招语音聊天（工作轻松）成年',
					titleSimple: '周结招语音聊天（工作轻松）成年',
					salary: '3000元/月',
					clearingForm: {
						key: '3',
						value: '月结'
					},
					welfare: '有提成,免费培训',
					companyName: '毛艺蓉 · 招聘者',
					logo: 'https://qiniu-image.qtshe.com/company_person_logo_default.png',
					dataSource: 5,
					jobLineType: 1,
					category: 1,
					entryCount: 1129,
					companyType: {
						key: '2',
						value: '个人'
					},
					companyLogo: '',
					parentClassId: 10139,
					classId: 10473,
					c1: 120000000,
					c2: 120103000,
					c3: 120103101,
					algorithmStrategyId: '1-100',
					labelList: {
						serviceLabels: [
							{
								labelId: 60,
								labelName: '实名认证',
								labelStyle: '{"id":11,"icon":"","color":"#00CF8A","borderColor":"#00CF8A","background":"#FFFFFF"}'
							}
						],
						descLabels: [
							{
								labelId: 9,
								labelName: '有提成',
								labelStyle: '{"id":6,"icon":"","color":"#FA5555","borderColor":"#FEEEEE","background":"#FEEEEE"}'
							},
							{
								labelId: 30,
								labelName: '完工结',
								labelStyle: '{"id":9,"icon":"https://qiniu-image.qtshe.com/newLabel/icon3.png","color":"#FF8000","borderColor":"#FFF2E5","background":"#FFF2E5"}'
							},
							{
								labelId: 32,
								labelName: '限女生',
								labelStyle: '{"id":7,"icon":"","color":"#838D99","borderColor":"#DFE3E9","background":"#FFFFFF"}'
							}
						]
					},
					listStyle: 1,
					newJobIntroduction: '无颜值要求，善于活跃气氛优先，直播要有安静的环境',
					ptpModParam: {
						algorithmStrategyId: '1-100',
						dataSource: 5
					}
				},
				{
					addressDetail: '不限工作地点',
					partJobId: 1172604,
					title: '0元手机试听 学习声音赚钱',
					titleSimple: '0元手机试听 学习声音赚钱',
					salary: '1000元/其他',
					clearingForm: {
						key: '0',
						value: '其他'
					},
					welfare: '名师授课,免费试听,进阶课折扣券',
					companyName: '成都环宇博睿教育咨询有限公司',
					logo: 'https://qiniu-image.qtshe.com/1635423876234_202.png',
					dataSource: 1,
					jobLineType: 1,
					category: 1,
					entryCount: 8545,
					companyType: {
						key: '1',
						value: '企业'
					},
					brandName: '环宇博睿',
					companyLogo: 'https://qiniu-image.qtshe.com/1635423876234_202.png',
					parentClassId: 10139,
					classId: 10471,
					c1: 118000000,
					c2: 118103000,
					c3: 118103101,
					algorithmStrategyId: '1-170',
					labelList: {
						serviceLabels: [
							{
								labelId: 61,
								labelName: '企业认证',
								labelStyle: '{"id":10,"icon":"","color":"#72AAFA","borderColor":"#72AAFA","background":"#FFFFFF"}'
							}
						],
						descLabels: [
							{
								labelId: 19,
								labelName: '最新发布',
								labelStyle: '{"id":6,"icon":"","color":"#FA5555","borderColor":"#FEEEEE","background":"#FEEEEE"}'
							}
						]
					},
					listStyle: 3,
					jobIntroduction: [
						{
							title: '你将获得',
							introductionDesc: '金牌课程免费试听；掌握技能变现技巧'
						},
						{
							title: '就业机会',
							introductionDesc: '成立个人工作室，时间自由，灵活就业'
						}
					],
					newJobIntroduction: '成立个人工作室，时间自由，灵活就业',
					ptpModParam: {
						algorithmStrategyId: '1-170',
						dataSource: 1
					}
				},
				{
					addressDetail: '不限工作地点',
					partJobId: 1187168,
					title: '招PS设计兼职 小白免费学',
					titleSimple: '招PS设计兼职 小白免费学',
					salary: '100元/天',
					clearingForm: {
						key: '1',
						value: '日结'
					},
					welfare: '兼职机会,软件素材包,进阶课折扣券,实习机会,软件安装包',
					companyName: '泉州市齐论设计有限公司',
					logo: 'https://qiniu-image.qtshe.com/company_logo_default.png',
					dataSource: 5,
					jobLineType: 1,
					category: 1,
					entryCount: 647,
					companyType: {
						key: '1',
						value: '企业'
					},
					brandName: '齐论设计',
					companyLogo: '',
					parentClassId: 10139,
					classId: 10465,
					c1: 118000000,
					c2: 118102000,
					c3: 118102101,
					algorithmStrategyId: '1-100',
					labelList: {
						serviceLabels: [
							{
								labelId: 61,
								labelName: '企业认证',
								labelStyle: '{"id":10,"icon":"","color":"#72AAFA","borderColor":"#72AAFA","background":"#FFFFFF"}'
							}
						],
						descLabels: [
							{
								labelId: 19,
								labelName: '最新发布',
								labelStyle: '{"id":6,"icon":"","color":"#FA5555","borderColor":"#FEEEEE","background":"#FEEEEE"}'
							},
							{
								labelId: 9,
								labelName: '有提成',
								labelStyle: '{"id":6,"icon":"","color":"#FA5555","borderColor":"#FEEEEE","background":"#FEEEEE"}'
							}
						]
					},
					listStyle: 3,
					jobIntroduction: [
						{
							title: '你将获得',
							introductionDesc: '熟练使用画图软件；GET兼职基本技能'
						},
						{
							title: '就业机会',
							introductionDesc: '成为工作室专业设计师，工作稳定，就业机会多'
						}
					],
					newJobIntroduction: '互联网行业专业设计师，高薪行业，发展空间大',
					ptpModParam: {
						algorithmStrategyId: '1-100',
						dataSource: 5
					}
				},
				{
					addressDetail: '不限工作地点',
					partJobId: 1027383,
					title: '招募美工设计PS兼职',
					titleSimple: '招募美工设计PS兼职',
					salary: '388元/其他',
					clearingForm: {
						key: '0',
						value: '其他'
					},
					welfare: ',软件安装包,实习机会,软件素材包,名师授课,兼职机会,免费试听,进阶课折扣券',
					companyName: '杭州君虹科技有限公司',
					logo: 'https://qiniu-image.qtshe.com/1616723163815_507.png',
					dataSource: 2,
					jobLineType: 1,
					category: 1,
					entryCount: 18365,
					companyType: {
						key: '1',
						value: '企业'
					},
					brandName: '君虹科技',
					companyLogo: 'https://qiniu-image.qtshe.com/1616723163815_507.png',
					parentClassId: 10139,
					classId: 10465,
					c1: 118000000,
					c2: 118102000,
					c3: 118102101,
					jobPicture: [
						{
							picture: 'https://qiniu-image.qtshe.com/1636625233618_759.jpg',
							pictureType: 0
						}
					],
					labelList: {
						serviceLabels: [
							{
								labelId: 61,
								labelName: '企业认证',
								labelStyle: '{"id":10,"icon":"","color":"#72AAFA","borderColor":"#72AAFA","background":"#FFFFFF"}'
							}
						]
					},
					labelRecommendNewList: {
						subwayLabels: [],
						rankingLabels: [
							{
								townId: 0,
								tagType: 4,
								tagParams: '{"exposure_num":869799,"label_name":"零基础技能变现","job_rnk":20}',
								icon: 'https://qiniu-image.qtshe.com/1615276852550_664.png',
								jumpKey: 'WORK_RANK',
								param:
									'[{"key":"labelId","name":"标签Id","type":"String","value":10070},{"key":"labelName","name":"标签名","type":"String","value":"在线课程"},{"key":"jumpUserType","name":"用户类型","type":"String","value":"1"}]',
								backgroundColor: '#FFF2E5'
							},
							{
								townId: 0,
								tagType: 4,
								tagParams: '{"exposure_num":869799,"label_name":"设计创作","job_rnk":7}',
								icon: 'https://qiniu-image.qtshe.com/1615276852550_664.png',
								jumpKey: 'WORK_RANK',
								param: '[{"key":"labelId","name":"标签Id","type":"String","value":10117},{"key":"labelName","name":"标签名","type":"String","value":"设计创作"}]',
								backgroundColor: '#FFF2E5'
							}
						]
					},
					listStyle: 3,
					jobIntroduction: [
						{
							title: '你将获得',
							introductionDesc: '掌握PS实用技能；熟练使用画图软件'
						},
						{
							title: '就业机会',
							introductionDesc: '专业图库网站兼职接单，内容简单，时间自由'
						}
					],
					newJobIntroduction: '互联网行业专业设计师，高薪行业，发展空间大',
					ptpModParam: {
						dataSource: 2
					}
				},
				{
					addressDetail: '汇丰大酒店(茂南区油城四路107号大院)',
					distance: '727米',
					partJobId: 1186811,
					title: '诚招小吃店服务员',
					titleSimple: '诚招小吃店服务员',
					salary: '15元/小时',
					clearingForm: {
						key: '1',
						value: '日结'
					},
					welfare: '包工作餐',
					companyName: '李伟珍 · 招聘者',
					logo: 'https://qiniu-image.qtshe.com/company_person_logo_default.png',
					dataSource: 1,
					jobLineType: 2,
					category: 1,
					entryCount: 5,
					companyType: {
						key: '2',
						value: '个人'
					},
					companyLogo: '',
					parentClassId: 10135,
					classId: 10153,
					c1: 101000000,
					c2: 101103000,
					c3: 0,
					algorithmStrategyId: '1-170',
					jobPicture: [
						{
							picture: 'https://qiniu-image.qtshe.com/1597839675522_967.jpg',
							pictureType: 0
						}
					],
					labelList: {
						serviceLabels: [
							{
								labelId: 60,
								labelName: '实名认证',
								labelStyle: '{"id":11,"icon":"","color":"#00CF8A","borderColor":"#00CF8A","background":"#FFFFFF"}'
							}
						],
						descLabels: [
							{
								labelId: 19,
								labelName: '最新发布',
								labelStyle: '{"id":6,"icon":"","color":"#FA5555","borderColor":"#FEEEEE","background":"#FEEEEE"}'
							},
							{
								labelId: 67,
								labelName: '工作证优先',
								labelStyle:
									'{"id":12,"icon":"https://qiniu-image.qtshe.com/newLabel/20210511-icon8.png","color":"#1677FF","borderColor":"#E7F0FF","background":"#E7F0FF"}'
							},
							{
								labelId: 31,
								labelName: '时薪',
								labelStyle: '{"id":6,"icon":"","color":"#FA5555","borderColor":"#FEEEEE","background":"#FEEEEE"}'
							}
						]
					},
					labelRecommend: [
						{
							townId: 205,
							tagType: 2,
							tagParams:
								'{"userNum":763,"labelStyle":"{\\"icon\\":\\"https://qiniu-image.qtshe.com/gateway/hot.png\\",\\"color\\":\\"#FA5555\\",\\"borderColor\\":\\"#FEEEEE\\",\\"background\\":\\"#FEEEEE\\"}","ranking":31,"schoolName":"广东茂名健康职业学院","schoolCode":"14556"}'
						}
					],
					labelRecommendNewList: {
						subwayLabels: [],
						rankingLabels: []
					},
					listStyle: 1,
					ptpModParam: {
						algorithmStrategyId: '1-170',
						dataSource: 1
					}
				},
				{
					addressDetail: '不限工作地点',
					partJobId: 1187612,
					title: '招PS设计兼职 小白免费学',
					titleSimple: '招PS设计兼职 小白免费学',
					salary: '399元/其他',
					clearingForm: {
						key: '0',
						value: '其他'
					},
					welfare: '软件安装包,兼职机会,软件素材包,实习机会,进阶课折扣券',
					companyName: '泉州市晟睿教育科技有限公司',
					logo: 'https://qiniu-image.qtshe.com/company_logo_default.png',
					dataSource: 1,
					jobLineType: 1,
					category: 1,
					entryCount: 420,
					companyType: {
						key: '1',
						value: '企业'
					},
					brandName: '晟睿教育',
					companyLogo: '',
					parentClassId: 10139,
					classId: 10465,
					c1: 118000000,
					c2: 118102000,
					c3: 118102101,
					algorithmStrategyId: '1-170',
					labelList: {
						serviceLabels: [
							{
								labelId: 61,
								labelName: '企业认证',
								labelStyle: '{"id":10,"icon":"","color":"#72AAFA","borderColor":"#72AAFA","background":"#FFFFFF"}'
							}
						],
						descLabels: [
							{
								labelId: 19,
								labelName: '最新发布',
								labelStyle: '{"id":6,"icon":"","color":"#FA5555","borderColor":"#FEEEEE","background":"#FEEEEE"}'
							}
						]
					},
					listStyle: 3,
					jobIntroduction: [
						{
							title: '你将获得',
							introductionDesc: '礼包限时免费领取；掌握画图基本技巧'
						},
						{
							title: '就业机会',
							introductionDesc: '成为原创设计师，时间自由，灵活就业'
						}
					],
					newJobIntroduction: '成为原创设计师，时间自由，灵活就业',
					ptpModParam: {
						algorithmStrategyId: '1-170',
						dataSource: 1
					}
				},
				{
					addressDetail: '沃尔玛(文化广场店)',
					distance: '1.82km',
					partJobId: 1136677,
					title: '沃尔玛招理货员',
					titleSimple: '沃尔玛招理货员',
					salary: '14元/小时',
					clearingForm: {
						key: '3',
						value: '月结'
					},
					welfare: '',
					companyName: '沃尔玛（中国）投资有限公司',
					logo: 'https://qiniu-image.qtshe.com/1574393395171_805.png',
					dataSource: 1,
					jobLineType: 2,
					category: 1,
					entryCount: 110,
					companyType: {
						key: '1',
						value: '企业'
					},
					brandName: '沃尔玛',
					companyLogo: 'https://qiniu-image.qtshe.com/1574393395171_805.png',
					parentClassId: 10136,
					classId: 10226,
					c1: 103000000,
					c2: 103103000,
					c3: 0,
					algorithmStrategyId: '1-170',
					labelList: {
						serviceLabels: [
							{
								labelId: 61,
								labelName: '企业认证',
								labelStyle: '{"id":10,"icon":"","color":"#72AAFA","borderColor":"#72AAFA","background":"#FFFFFF"}'
							}
						],
						descLabels: [
							{
								labelId: 5,
								labelName: '名企认证',
								labelStyle: '{"id":2,"icon":"https://qiniu-image.qtshe.com/newLabel/icon5.png","color":"#703E0F","borderColor":"#FEDEA9","background":"#FEDEA9"}'
							},
							{
								labelId: 22,
								labelName: '环境好',
								labelStyle: '{"id":6,"icon":"","color":"#FA5555","borderColor":"#FEEEEE","background":"#FEEEEE"}'
							},
							{
								labelId: 20,
								labelName: '简单易做',
								labelStyle: '{"id":6,"icon":"","color":"#FA5555","borderColor":"#FEEEEE","background":"#FEEEEE"}'
							},
							{
								labelId: 31,
								labelName: '时薪',
								labelStyle: '{"id":6,"icon":"","color":"#FA5555","borderColor":"#FEEEEE","background":"#FEEEEE"}'
							}
						]
					},
					labelRecommend: [
						{
							townId: 205,
							tagType: 2,
							tagParams:
								'{"userNum":269,"labelStyle":"{\\"icon\\":\\"https://qiniu-image.qtshe.com/gateway/hot.png\\",\\"color\\":\\"#FA5555\\",\\"borderColor\\":\\"#FEEEEE\\",\\"background\\":\\"#FEEEEE\\"}","ranking":1,"schoolName":"广东茂名农林科技职业学院","schoolCode":"14638"}'
						}
					],
					labelRecommendNewList: {
						subwayLabels: [],
						rankingLabels: [
							{
								townId: 205,
								tagType: 2,
								tagParams:
									'{"userNum":269,"labelStyle":"{\\"icon\\":\\"https://qiniu-image.qtshe.com/gateway/hot.png\\",\\"color\\":\\"#FA5555\\",\\"borderColor\\":\\"#FEEEEE\\",\\"background\\":\\"#FEEEEE\\"}","ranking":1,"schoolName":"广东茂名农林科技职业学院","schoolCode":"14638"}',
								icon: 'https://qiniu-image.qtshe.com/1615277014125_55.png',
								jumpKey: 'CIRCLE_RECOMMEND_JOBS',
								param:
									'[{"key": "pageType","name": "页面类型2校友 3商圈","type": "String","value":2},{"key": "circleCode","name": "业务id","type": "String","value":"14638"}]',
								backgroundColor: '#FEEEEE'
							}
						]
					},
					listStyle: 1,
					ptpModParam: {
						algorithmStrategyId: '1-170',
						dataSource: 1
					}
				},
				{
					addressDetail: '不限工作地点',
					partJobId: 1175400,
					title: '手机也可做配音学员/限时免费领取公开课程',
					titleSimple: '手机也可做配音学员/限时免费领取公开课程',
					salary: '100元/其他',
					clearingForm: {
						key: '0',
						value: '其他'
					},
					welfare: '名师授课,免费试听,软件安装包,进阶课折扣券',
					companyName: '四川睿知牛教育管理有限公司',
					logo: 'https://qiniu-image.qtshe.com/company_logo_default.png',
					dataSource: 1,
					jobLineType: 1,
					category: 1,
					entryCount: 2335,
					companyType: {
						key: '1',
						value: '企业'
					},
					brandName: '睿知牛',
					companyLogo: '',
					parentClassId: 10139,
					classId: 10471,
					c1: 118000000,
					c2: 118103000,
					c3: 118103101,
					algorithmStrategyId: '1-170',
					labelList: {
						serviceLabels: [
							{
								labelId: 61,
								labelName: '企业认证',
								labelStyle: '{"id":10,"icon":"","color":"#72AAFA","borderColor":"#72AAFA","background":"#FFFFFF"}'
							}
						],
						descLabels: [
							{
								labelId: 19,
								labelName: '最新发布',
								labelStyle: '{"id":6,"icon":"","color":"#FA5555","borderColor":"#FEEEEE","background":"#FEEEEE"}'
							},
							{
								labelId: 9,
								labelName: '有提成',
								labelStyle: '{"id":6,"icon":"","color":"#FA5555","borderColor":"#FEEEEE","background":"#FEEEEE"}'
							}
						]
					},
					labelRecommendNewList: {
						subwayLabels: [],
						rankingLabels: [
							{
								townId: 0,
								tagType: 4,
								tagParams: '{"exposure_num":443186,"label_name":"主持人","job_rnk":7}',
								icon: 'https://qiniu-image.qtshe.com/1615276852550_664.png',
								jumpKey: 'WORK_RANK',
								param:
									'[{"key":"labelId","name":"标签Id","type":"String","value":10008},{"key":"labelName","name":"标签名","type":"String","value":"主持人"},{"key":"jumpUserType","name":"用户类型","type":"String","value":"1"}]',
								backgroundColor: '#FFF2E5'
							}
						]
					},
					listStyle: 3,
					jobIntroduction: [
						{
							title: '你将获得',
							introductionDesc: '玩转才艺技能；实现技能变现'
						},
						{
							title: '就业机会',
							introductionDesc: '专业机构兼职接单，利用技能变现的好机会~'
						}
					],
					newJobIntroduction: '工作室兼职派单机会，副业增收的好机会',
					ptpModParam: {
						algorithmStrategyId: '1-170',
						dataSource: 1
					}
				},
				{
					componentName: 'refreshBtn',
					componentType: 1,
					partJobId: 345588
				},
				{
					addressDetail: '沃尔玛(文化广场店)',
					distance: '1.82km',
					partJobId: 1136682,
					title: '沃尔玛招通宵理货员',
					titleSimple: '沃尔玛招通宵理货员',
					salary: '20元/小时',
					clearingForm: {
						key: '3',
						value: '月结'
					},
					welfare: '',
					companyName: '沃尔玛（中国）投资有限公司',
					logo: 'https://qiniu-image.qtshe.com/1574393395171_805.png',
					dataSource: 1,
					jobLineType: 2,
					category: 1,
					entryCount: 34,
					companyType: {
						key: '1',
						value: '企业'
					},
					brandName: '沃尔玛',
					companyLogo: 'https://qiniu-image.qtshe.com/1574393395171_805.png',
					parentClassId: 10143,
					classId: 10162,
					c1: 103000000,
					c2: 103105000,
					c3: 0,
					algorithmStrategyId: '1-170',
					labelList: {
						serviceLabels: [
							{
								labelId: 61,
								labelName: '企业认证',
								labelStyle: '{"id":10,"icon":"","color":"#72AAFA","borderColor":"#72AAFA","background":"#FFFFFF"}'
							}
						],
						descLabels: [
							{
								labelId: 5,
								labelName: '名企认证',
								labelStyle: '{"id":2,"icon":"https://qiniu-image.qtshe.com/newLabel/icon5.png","color":"#703E0F","borderColor":"#FEDEA9","background":"#FEDEA9"}'
							},
							{
								labelId: 31,
								labelName: '时薪',
								labelStyle: '{"id":6,"icon":"","color":"#FA5555","borderColor":"#FEEEEE","background":"#FEEEEE"}'
							}
						]
					},
					labelRecommend: [
						{
							townId: 205,
							tagType: 2,
							tagParams:
								'{"userNum":269,"labelStyle":"{\\"icon\\":\\"https://qiniu-image.qtshe.com/gateway/hot.png\\",\\"color\\":\\"#FA5555\\",\\"borderColor\\":\\"#FEEEEE\\",\\"background\\":\\"#FEEEEE\\"}","ranking":3,"schoolName":"广东茂名农林科技职业学院","schoolCode":"14638"}'
						}
					],
					labelRecommendNewList: {
						subwayLabels: [],
						rankingLabels: [
							{
								townId: 205,
								tagType: 2,
								tagParams:
									'{"userNum":269,"labelStyle":"{\\"icon\\":\\"https://qiniu-image.qtshe.com/gateway/hot.png\\",\\"color\\":\\"#FA5555\\",\\"borderColor\\":\\"#FEEEEE\\",\\"background\\":\\"#FEEEEE\\"}","ranking":3,"schoolName":"广东茂名农林科技职业学院","schoolCode":"14638"}',
								icon: 'https://qiniu-image.qtshe.com/1615277014125_55.png',
								jumpKey: 'CIRCLE_RECOMMEND_JOBS',
								param:
									'[{"key": "pageType","name": "页面类型2校友 3商圈","type": "String","value":2},{"key": "circleCode","name": "业务id","type": "String","value":"14638"}]',
								backgroundColor: '#FEEEEE'
							}
						]
					},
					listStyle: 1,
					ptpModParam: {
						algorithmStrategyId: '1-170',
						dataSource: 1
					}
				}
			],
			showFilter: true,
			jobHomeList: [],
			isSearchFixed: false,
			isFixed: false,
			isLoading: true,
			firstLoaded: true,
			fixedClass: 'padding206',
			listGroupId: 1012,
			classifications: [
				{
					classificationId: 0,
					name: '全部类型',
					classifyDesc: '全部类型',
					classLevel: 1,
					secondClassifications: [
						{
							classificationId: 0,
							name: '全部',
							classifyDesc: '全部',
							classLevel: 1
						}
					]
				},
				{
					classificationId: 10135,
					logo: 'https://qiniu-image.qtshe.com/1496731274606_4452.jpg-100',
					name: '餐饮服务',
					classifyDesc: '新餐饮服务',
					classLevel: 1,
					memberType: 0,
					bgLogo: '',
					flagAnchorType: 0,
					logoList: '',
					secondClassifications: [
						{
							classificationId: 10135,
							logo: '1496731274606_4452.jpg',
							name: '全部',
							classLevel: 1,
							memberType: 0
						},
						{
							classificationId: 10153,
							logo: 'https://qiniu-image.qtshe.com/1495616404484_3033.jpg-100',
							name: '服务生',
							classifyDesc: '服务生',
							parentId: 10135,
							classLevel: 2,
							memberType: 0,
							bgLogo: '',
							flagAnchorType: 0,
							logoList:
								'1597839675126_496.jpg,1597839675446_246.jpg,1597839675514_207.jpg,1597839675522_967.jpg,1597839675525_517.jpg,1597839675565_368.jpg,1597839675589_410.jpg,1597839675571_911.jpg,1597839675682_584.jpg,1597839675677_692.jpg,1597839675701_699.jpg,1597839675690_19.jpg,1597839675753_243.jpg,1597839675708_170.jpg,1597839675817_275.jpg,1597839675828_24.jpg,1597839675130_473.jpg,1597839675142_566.jpg,1597839675072_601.jpg,1597839675127_908.jpg,1597839675142_855.jpg,1597839675225_345.jpg,1597839675274_775.jpg,1597839675283_125.jpg,1597839675289_976.jpg,1597839675293_88.jpg,1597839675316_644.jpg,1597839675368_88.jpg,1597839675418_531.jpg,1597839675434_88.jpg'
						},
						{
							classificationId: 10230,
							logo: 'https://qiniu-image.qtshe.com/1600775719446_27.jpg-100',
							name: '咖啡师',
							classifyDesc: '咖啡师',
							parentId: 10135,
							classLevel: 2,
							memberType: 0,
							bgLogo: '',
							flagAnchorType: 0,
							logoList:
								'1600775660027_108.jpg,1600775660026_949.jpg,1600775660029_985.jpg,1600775660026_994.jpg,1600775659958_991.jpg,1600775660026_399.jpg,1600775660101_466.jpg,1600775660056_385.jpg,1600775660084_884.jpg,1600775660098_449.jpg,1600775660117_547.jpg,1600775660108_671.jpg'
						},
						{
							classificationId: 10231,
							logo: '',
							name: '收银员',
							classifyDesc: '收银员',
							parentId: 10135,
							classLevel: 2,
							memberType: 0,
							bgLogo: '',
							flagAnchorType: 0,
							logoList: ''
						},
						{
							classificationId: 10232,
							logo: '',
							name: '奶茶店员',
							classifyDesc: '奶茶店员',
							parentId: 10135,
							classLevel: 2,
							memberType: 0,
							bgLogo: '',
							flagAnchorType: 0,
							logoList:
								'1597839692953_893.jpg,1597839692950_308.jpg,1597839693016_652.jpg,1597839693169_628.jpg,1597839693275_879.jpg,1597839693091_704.jpg,1597839693346_785.jpg,1597839693611_778.jpg,1597839693477_234.jpg,1597839693606_142.jpg,1597839693640_237.jpg,1597839693714_229.jpg,1597839693768_91.jpg,1597839692950_307.jpg,1597839692952_148.jpg,1597839693025_684.jpg,1597839693104_161.jpg,1597839693176_439.jpg,1597839693181_830.jpg,1597839693272_894.jpg,1597839693310_579.jpg,1597839693323_193.jpg,1597839693407_166.jpg,1597839693445_376.jpg,1597839693463_405.jpg,1597839693480_78.jpg,1597839693564_444.jpg,1597839693609_665.jpg,1597839693641_355.jpg,1597839693727_765.jpg'
						},
						{
							classificationId: 10154,
							logo: 'https://qiniu-image.qtshe.com/1495616435683_7245.jpg-100',
							name: '外卖配送',
							classifyDesc: '外卖配送',
							parentId: 10135,
							classLevel: 2,
							memberType: 0,
							bgLogo: '',
							flagAnchorType: 0,
							logoList: ''
						},
						{
							classificationId: 10155,
							logo: 'https://qiniu-image.qtshe.com/1495616466134_4169.jpg-100',
							name: '见习经理',
							classifyDesc: '见习经理',
							parentId: 10135,
							classLevel: 2,
							memberType: 0,
							bgLogo: '',
							flagAnchorType: 0,
							logoList: ''
						}
					]
				},
				{
					classificationId: 10136,
					logo: 'https://qiniu-image.qtshe.com/1496731614232_9816.jpg-100',
					name: '超市零售',
					classifyDesc: '新门店超市',
					classLevel: 1,
					memberType: 0,
					bgLogo: '',
					flagAnchorType: 0,
					logoList: '',
					secondClassifications: [
						{
							classificationId: 10136,
							logo: '1496731614232_9816.jpg',
							name: '全部',
							classLevel: 1,
							memberType: 0
						},
						{
							classificationId: 10156,
							logo: 'https://qiniu-image.qtshe.com/1495616500275_9953.jpg-100',
							name: '收银员',
							classifyDesc: '超市店员',
							parentId: 10136,
							classLevel: 2,
							memberType: 0,
							bgLogo: '',
							flagAnchorType: 0,
							logoList:
								'1597839739180_236.jpeg,1597839739092_684.jpg,1597839739337_604.jpg,1597839739173_347.jpg,1597839739332_357.jpg,1597839739111_494.jpg,1597839739465_964.jpg,1597839739470_939.jpg,1597839739481_893.jpeg,1597839739523_369.jpg,1597839739637_451.jpg,1597839739608_254.jpg,1597839739615_642.jpg,1597839739169_715.jpg,1597839739173_16.jpg,1597839739290_581.jpg,1597839739324_222.jpg,1597839739336_446.jpg,1597839739354_620.jpg,1597839739456_633.jpg,1600775546212_284.jpg,1600775546133_377.jpg,1600775546124_324.jpg,1600775546132_377.jpg,1600775546124_908.jpg,1600775546124_295.jpg,1600775546156_306.jpg,1600775546193_795.jpg,1600775546200_341.jpg,1600775546225_950.jpg,1600775546206_350.jpg,1600775546274_737.jpg,1600775546233_1.jpg,1600775546260_839.jpg,1600775546295_507.jpg,1600775546298_451.jpg'
						},
						{
							classificationId: 10226,
							logo: '',
							name: '理货员',
							classifyDesc: '理货员',
							parentId: 10136,
							classLevel: 2,
							memberType: 0,
							bgLogo: '',
							flagAnchorType: 0,
							logoList: ''
						},
						{
							classificationId: 10159,
							logo: 'https://qiniu-image.qtshe.com/1495616734602_1173.jpg-100',
							name: '店员导购',
							classifyDesc: '商场导购',
							parentId: 10136,
							classLevel: 2,
							memberType: 0,
							bgLogo: '',
							flagAnchorType: 0,
							logoList:
								'1597839715833_595.jpeg,1597839715745_33.jpg,1597839715824_151.jpg,1597839715907_378.jpg,1597839716060_473.jpg,1597839716068_894.jpg,1597839716068_242.jpg,1597839716142_312.jpeg,1597839716157_28.jpg,1597839716326_502.jpg,1597839716232_123.jpg,1597839716237_886.jpg,1597839715803_241.jpg,1597839715750_736.jpg,1597839715750_478.jpg,1597839715893_940.jpg,1597839715910_643.jpg,1597839715983_706.jpg,1597839715997_546.jpg,1600775528302_44.jpg,1600775528320_450.jpg,1600775528303_585.jpg,1600775528244_318.jpg,1600775528321_472.jpg,1600775528321_260.jpg,1600775528320_534.jpg,1600775528379_933.jpg,1600775528382_640.jpg,1600775528404_235.jpg,1600775528401_147.jpg,1600775528386_677.jpg,1600775528435_616.jpg,1600775528473_264.jpg,1600775528450_395.jpg,1600775528444_419.jpg'
						}
					]
				},
				{
					classificationId: 10137,
					logo: 'https://qiniu-image.qtshe.com/1496731586506_4905.jpg-100',
					name: '物流仓储',
					classifyDesc: '新物流仓储',
					classLevel: 1,
					memberType: 0,
					bgLogo: '',
					flagAnchorType: 0,
					logoList: '',
					secondClassifications: [
						{
							classificationId: 10137,
							logo: '1496731586506_4905.jpg',
							name: '全部',
							classLevel: 1,
							memberType: 0
						},
						{
							classificationId: 10160,
							logo: 'https://qiniu-image.qtshe.com/1495617067028_1741.jpg-100',
							name: '分拣员',
							classifyDesc: '打包分拣',
							parentId: 10137,
							classLevel: 2,
							memberType: 0,
							bgLogo: '',
							flagAnchorType: 0,
							logoList: ''
						},
						{
							classificationId: 10227,
							logo: '',
							name: '快递员',
							classifyDesc: '快递员',
							parentId: 10137,
							classLevel: 2,
							memberType: 0,
							bgLogo: '',
							flagAnchorType: 0,
							logoList: ''
						},
						{
							classificationId: 10228,
							logo: '',
							name: '仓库管理员',
							classifyDesc: '仓库管理员',
							parentId: 10137,
							classLevel: 2,
							memberType: 0,
							bgLogo: '',
							flagAnchorType: 0,
							logoList: ''
						},
						{
							classificationId: 10229,
							logo: '',
							name: '装卸搬运',
							classifyDesc: '装卸搬运',
							parentId: 10137,
							classLevel: 2,
							memberType: 0,
							bgLogo: '',
							flagAnchorType: 0,
							logoList: ''
						},
						{
							classificationId: 10161,
							logo: 'https://qiniu-image.qtshe.com/1495617443225_744.jpg-100',
							name: '司机/配送',
							classifyDesc: '物流配送',
							parentId: 10137,
							classLevel: 2,
							memberType: 0,
							bgLogo: '',
							flagAnchorType: 0,
							logoList: ''
						}
					]
				},
				{
					classificationId: 10133,
					logo: 'https://qiniu-image.qtshe.com/1496731213767_6088.jpg-100',
					name: '市场推广',
					classifyDesc: '新营销推广',
					classLevel: 1,
					memberType: 0,
					bgLogo: '',
					flagAnchorType: 0,
					logoList: '',
					secondClassifications: [
						{
							classificationId: 10133,
							logo: '1496731213767_6088.jpg',
							name: '全部',
							classLevel: 1,
							memberType: 0
						},
						{
							classificationId: 10144,
							logo: 'https://qiniu-image.qtshe.com/1495615830054_9107.jpg-100',
							name: '派单/拉访',
							classifyDesc: '派单宣传',
							parentId: 10133,
							classLevel: 2,
							memberType: 0,
							bgLogo: '',
							flagAnchorType: 0,
							logoList:
								'1605596833568_105.jpg,1605596833568_628.jpg,1605596833566_483.jpg,1605596833568_616.jpg,1605596833569_715.jpg,1605596833619_473.jpg,1605596833631_241.jpg,1605596833569_110.jpg'
						},
						{
							classificationId: 10191,
							logo: 'https://qiniu-image.qtshe.com/1495618347952_2551.jpg-100',
							name: '扫码推广',
							classifyDesc: '扫码推广',
							parentId: 10133,
							classLevel: 2,
							memberType: 0,
							bgLogo: '',
							flagAnchorType: 0,
							logoList:
								'1605596869300_297.jpg,1605596869302_851.jpg,1605596869305_696.jpg,1605596869305_156.jpg,1605596869306_876.jpg,1605596869369_326.jpg,1605596869302_107.jpg'
						},
						{
							classificationId: 10145,
							logo: 'https://qiniu-image.qtshe.com/1495615956478_1247.jpg-100',
							name: '校园代理',
							classifyDesc: '校园大使',
							parentId: 10133,
							classLevel: 2,
							memberType: 0,
							bgLogo: '',
							flagAnchorType: 0,
							logoList: ''
						},
						{
							classificationId: 10146,
							logo: 'https://qiniu-image.qtshe.com/1495615988667_1552.jpg-100',
							name: '销售',
							classifyDesc: '电话销售',
							parentId: 10133,
							classLevel: 2,
							memberType: 0,
							bgLogo: '',
							flagAnchorType: 0,
							logoList: ''
						},
						{
							classificationId: 10148,
							logo: 'https://qiniu-image.qtshe.com/1495616088846_5750.jpg-100',
							name: '促销',
							classifyDesc: '促销',
							parentId: 10133,
							classLevel: 2,
							memberType: 0,
							bgLogo: '',
							flagAnchorType: 0,
							logoList: ''
						},
						{
							classificationId: 10192,
							logo: 'https://qiniu-image.qtshe.com/1495618347952_2551.jpg-100',
							name: '问卷调查',
							classifyDesc: '问卷调查',
							parentId: 10133,
							classLevel: 2,
							memberType: 0,
							bgLogo: '',
							flagAnchorType: 0,
							logoList: ''
						},
						{
							classificationId: 10149,
							logo: 'https://qiniu-image.qtshe.com/1495616110602_5330.jpg-100',
							name: '其他推广',
							classifyDesc: '其他推广',
							parentId: 10133,
							classLevel: 2,
							memberType: 0,
							bgLogo: '',
							flagAnchorType: 0,
							logoList:
								'1605596971991_465.jpg,1605596972000_645.jpg,1605596972000_399.jpg,1605596971994_808.jpg,1605596971995_931.jpg,1605596971994_385.jpg,1605596985993_372.jpg,1605596985989_623.jpg'
						}
					]
				},
				{
					classificationId: 10134,
					logo: 'https://qiniu-image.qtshe.com/1496731259117_5122.jpg-100',
					name: '家教培训',
					classifyDesc: '新家教培训',
					classLevel: 1,
					memberType: 0,
					bgLogo: '',
					flagAnchorType: 0,
					logoList: '',
					secondClassifications: [
						{
							classificationId: 10134,
							logo: '1496731259117_5122.jpg',
							name: '全部',
							classLevel: 1,
							memberType: 0
						},
						{
							classificationId: 10150,
							logo: 'https://qiniu-image.qtshe.com/1495616327000_3919.jpg-100',
							name: '家教',
							classifyDesc: '家教',
							parentId: 10134,
							classLevel: 2,
							memberType: 0,
							bgLogo: '',
							flagAnchorType: 0,
							logoList:
								'1597839886493_34.jpg,1597839886416_294.jpg,1597839886493_433.jpg,1597839886799_511.jpg,1597839886595_829.jpg,1597839886429_463.jpg,1597839886618_248.jpg,1597839886649_382.jpg,1597839886727_760.jpg,1597839886686_977.jpg,1597839886726_689.jpg,1597839886764_295.jpg,1597839886496_918.jpg,1597839886496_793.jpg,1600774133726_449.jpg,1600774133740_545.jpg,1600774133743_772.jpg,1600774133804_459.jpg,1600774133799_932.jpg,1600774133826_497.jpg,1600774133793_120.jpg,1600774133789_836.jpg,1600774133726_24.jpg,1600774133828_894.jpg,1600774133881_276.jpg,1600774133870_952.jpg,1600774133858_978.jpg,1600774133893_316.jpg,1600774133880_501.jpg,1600774133917_30.jpg,1600774133907_422.jpg,1600774133726_329.jpg,1600774133740_662.jpg,1600774133661_587.jpg'
						},
						{
							classificationId: 10151,
							logo: 'https://qiniu-image.qtshe.com/1495616344440_2528.jpg-100',
							name: '助教',
							classifyDesc: '助教',
							parentId: 10134,
							classLevel: 2,
							memberType: 0,
							bgLogo: '',
							flagAnchorType: 0,
							logoList:
								'1597839900488_847.jpg,1597839900491_22.jpg,1597839900489_720.jpg,1597839900491_252.jpg,1597839900683_345.jpg,1597839900760_852.jpg,1597839900682_685.jpg,1597839900762_20.jpg,1597839900761_742.jpg,1597839900699_921.jpg,1597839900883_716.jpg,1597839900889_147.jpg,1597839900492_231.jpg,1597839900489_897.jpg,1600774164359_823.jpg,1600774164357_771.jpg,1600774164359_235.jpg,1600774164361_349.jpg,1600774164299_183.jpg,1600774164357_548.jpg,1600774164370_448.jpg,1600774164429_964.jpg,1600774164475_351.jpg,1600774164426_608.jpg,1600774164429_198.jpg,1600774164431_912.jpg,1600774164477_447.jpg,1600774164537_916.jpg,1600774164519_333.jpg,1600774164520_249.jpg,1600774164549_245.jpg,1600774164522_503.jpg,1600774164582_194.jpg,1600774164598_426.jpg'
						},
						{
							classificationId: 10152,
							logo: 'https://qiniu-image.qtshe.com/1495616374042_7505.jpg-100',
							name: '才艺老师',
							classifyDesc: '艺术老师',
							parentId: 10134,
							classLevel: 2,
							memberType: 0,
							bgLogo: '',
							flagAnchorType: 0,
							logoList: ''
						},
						{
							classificationId: 10195,
							logo: 'https://qiniu-image.qtshe.com/1495618347952_2551.jpg-100',
							name: '辅导培训',
							classifyDesc: '辅导培训',
							parentId: 10134,
							classLevel: 2,
							memberType: 0,
							bgLogo: '',
							flagAnchorType: 0,
							logoList:
								'1597839873049_580.jpg,1597839873049_190.jpg,1597839873051_172.jpg,1597839872995_390.jpg,1597839873311_217.jpg,1597839873004_460.jpg,1597839873313_40.jpg,1597839873049_789.jpg,1597839873313_918.jpg,1597839873312_445.jpg,1597839873258_254.jpg,1597839873442_552.jpg,1597839873343_694.jpg,1597839873508_952.jpg,1600773699185_299.jpg,1600773699182_575.jpg,1600773699186_120.jpg,1600773699182_919.jpg,1600773699211_623.jpg,1600773699288_863.jpg,1600773699289_248.jpg,1600773699367_310.jpg,1600773699293_991.jpg,1600773699294_762.jpg,1600773699378_607.jpg,1600773699381_670.jpg,1600773699386_202.jpg,1600773699477_952.jpg,1600773699390_756.jpg,1600773699479_30.jpg,1600773699480_906.jpg,1600773699839_489.jpg,1600773699481_555.jpg,1600773699478_423.jpg'
						}
					]
				},
				{
					classificationId: 10138,
					logo: 'https://qiniu-image.qtshe.com/1496731554588_8991.jpg-100',
					name: '展会演出',
					classifyDesc: '新展会演出',
					classLevel: 1,
					memberType: 0,
					bgLogo: '',
					flagAnchorType: 0,
					logoList: '',
					secondClassifications: [
						{
							classificationId: 10138,
							logo: '1496731554588_8991.jpg',
							name: '全部',
							classLevel: 1,
							memberType: 0
						},
						{
							classificationId: 10184,
							logo: 'https://qiniu-image.qtshe.com/1495622307257_4592.jpg-100',
							name: '活动协助/执行',
							classifyDesc: '活动协助',
							parentId: 10138,
							classLevel: 2,
							memberType: 0,
							bgLogo: '',
							flagAnchorType: 0,
							logoList: ''
						},
						{
							classificationId: 10185,
							logo: 'https://qiniu-image.qtshe.com/1495622334773_9167.jpg-100',
							name: '节目观众',
							classifyDesc: '节目观众',
							parentId: 10138,
							classLevel: 2,
							memberType: 0,
							bgLogo: '',
							flagAnchorType: 0,
							logoList: ''
						}
					]
				},
				{
					classificationId: 10139,
					logo: 'https://qiniu-image.qtshe.com/1496731480114_6916.jpg-100',
					name: '线上兼职',
					classifyDesc: '新线上兼职',
					classLevel: 1,
					memberType: 0,
					bgLogo: '',
					flagAnchorType: 0,
					logoList: '',
					secondClassifications: [
						{
							classificationId: 10139,
							logo: '1496731480114_6916.jpg',
							name: '全部',
							classLevel: 1,
							memberType: 0
						},
						{
							classificationId: 10464,
							logo: '',
							name: '教育培训',
							classifyDesc: '教培类岗位',
							parentId: 10139,
							classLevel: 2,
							memberType: 1,
							bgLogo: '',
							flagAnchorType: 0,
							logoList:
								'1599115811030_56.png,1599115810985_994.png,1599115811724_423.png,1599115811754_736.png,1599115811406_272.png,1599115811057_486.png,1599115811057_613.png,1599115811031_59.png,1599115811056_930.png,1599115811345_973.png,1599115811359_33.png,1599115811421_55.png,1607417843107_670.png,1607417843025_124.png,1607417843109_185.png,1607417843122_757.png,1607417843041_734.png,1607417843122_804.png'
						},
						{
							classificationId: 10199,
							logo: 'https://qiniu-image.qtshe.com/1495622254385_2993.jpg-100',
							name: '产品代理',
							classifyDesc: '产品代理',
							parentId: 10139,
							classLevel: 2,
							memberType: 1,
							bgLogo: '',
							flagAnchorType: 0,
							logoList: ''
						},
						{
							classificationId: 10180,
							logo: 'https://qiniu-image.qtshe.com/1495622170764_6681.jpg-100',
							name: '线上推广',
							classifyDesc: '线上推广',
							parentId: 10139,
							classLevel: 2,
							memberType: 1,
							bgLogo: '',
							flagAnchorType: 0,
							logoList: ''
						},
						{
							classificationId: 10179,
							logo: 'https://qiniu-image.qtshe.com/1495622149730_3263.jpg-100',
							name: '文案编辑',
							classifyDesc: '文案编辑',
							parentId: 10139,
							classLevel: 2,
							memberType: 1,
							bgLogo: '',
							flagAnchorType: 0,
							logoList:
								'1597841012828_989.png,1597841012756_328.png,1597841012827_708.png,1597841013154_461.png,1597841012854_934.png,1597841012828_860.png,1597841012788_889.png,1597841013152_758.png,1597841013167_969.png,1597841013203_656.png,1597841013284_963.png,1597841013367_543.png,1597841013487_604.png,1597841013489_140.png,1597841013535_51.png,1597841013671_60.png,1597841013719_974.png,1597923524288_776.png,1597923524292_619.png,1597923524286_468.png,1597923524382_390.png,1597923524312_365.png'
						},
						{
							classificationId: 10348,
							logo: '',
							name: '游戏主播',
							classifyDesc: '玩游戏~拿高薪！',
							parentId: 10139,
							classLevel: 2,
							memberType: 1,
							bgLogo: 'http://qiniu-image.qtshe.com/1594086818627_371.png',
							flagAnchorType: 1,
							logoList:
								'1607681694580_36.png,1607681694638_377.png,1607681694638_997.png,1607681694604_56.png,1607681694597_715.png,1607681694597_308.png,1607681694605_300.png,1607681694596_289.png,1607681694580_405.png,1607681694604_560.png,1607681694598_604.png,1607681694580_229.png'
						},
						{
							classificationId: 10349,
							logo: '',
							name: '颜值主播',
							classifyDesc: '有颜有才二选一',
							parentId: 10139,
							classLevel: 2,
							memberType: 1,
							bgLogo: 'http://qiniu-image.qtshe.com/1594087139033_781.png',
							flagAnchorType: 1,
							logoList:
								'1605505407703_56.png,1605505407783_458.png,1605505407783_337.png,1605505407880_5.png,1605505407886_642.png,1605505407918_966.png,1605505407895_857.png,1605505407904_672.png,1605505407920_347.png,1605505408001_567.png,1605505407990_548.png,1605505407780_260.png,1605505407782_846.png,1605505407782_231.png,1605505407807_761.png'
						},
						{
							classificationId: 10351,
							logo: '',
							name: '聊天主播',
							classifyDesc: '打字聊天轻松赚',
							parentId: 10139,
							classLevel: 2,
							memberType: 1,
							bgLogo: 'http://qiniu-image.qtshe.com/1594087706520_889.png',
							flagAnchorType: 1,
							logoList:
								'1607681530519_310.png,1607681530518_863.png,1607681530534_854.png,1607681530517_847.png,1607681530535_224.png,1607681530554_386.png,1607681530534_884.png,1607681530531_788.png,1607681530533_547.png,1607681530548_700.png,1607681530534_465.png,1607681530519_254.png,1607681530535_943.png,1607681530549_336.png,1607681530548_244.png'
						},
						{
							classificationId: 10352,
							logo: '',
							name: '带货主播',
							classifyDesc: '带货小能手，人形种草机',
							parentId: 10139,
							classLevel: 2,
							memberType: 1,
							bgLogo: 'http://qiniu-image.qtshe.com/1594087215912_801.png',
							flagAnchorType: 1,
							logoList: '1605505354840_371.png,1605505354833_800.png,1605505354917_324.png,1605505354834_251.png,1605505354830_552.png'
						},
						{
							classificationId: 10183,
							logo: 'https://qiniu-image.qtshe.com/1495622254385_2993.jpg-100',
							name: '声音主播',
							classifyDesc: '声音好听就能赚钱系列',
							parentId: 10139,
							classLevel: 2,
							memberType: 1,
							bgLogo: 'http://qiniu-image.qtshe.com/1594087335346_741.png',
							flagAnchorType: 1,
							logoList:
								'1607681613728_686.png,1607681613666_567.png,1607681613711_180.png,1607681613712_989.png,1607681613674_828.png,1607681613727_991.png,1607681613680_346.png,1607681613745_459.png,1607681613712_498.png,1607681613743_68.png,1607681613743_806.png,1607681613679_579.png,1607681613728_562.png,1607681613729_187.png,1607681613743_328.png'
						},
						{
							classificationId: 10181,
							logo: 'https://qiniu-image.qtshe.com/1495622197198_1488.jpg-100',
							name: '信息标注',
							classifyDesc: '信息标注',
							parentId: 10139,
							classLevel: 2,
							memberType: 1,
							bgLogo: '',
							flagAnchorType: 0,
							logoList: ''
						},
						{
							classificationId: 10198,
							logo: 'https://qiniu-image.qtshe.com/1495622254385_2993.jpg-100',
							name: '优惠券代理',
							classifyDesc: '优惠券代理',
							parentId: 10139,
							classLevel: 2,
							memberType: 1,
							bgLogo: '',
							flagAnchorType: 0,
							logoList: ''
						},
						{
							classificationId: 10182,
							logo: 'https://qiniu-image.qtshe.com/1495622223247_2480.jpg-100',
							name: '其他',
							classifyDesc: '其他',
							parentId: 10139,
							classLevel: 2,
							memberType: 1,
							bgLogo: '',
							flagAnchorType: 0,
							logoList: ''
						},
						{
							classificationId: 10222,
							logo: 'https://qiniu-image.qtshe.com/1496731213767_6088.jpg-100',
							name: '在线老师',
							classifyDesc: '在线老师',
							parentId: 10139,
							classLevel: 2,
							memberType: 1,
							bgLogo: '',
							flagAnchorType: 0,
							logoList: ''
						},
						{
							classificationId: 10465,
							logo: '',
							name: '设计创作',
							classifyDesc: '设计创作相关课程',
							parentId: 10139,
							classLevel: 2,
							memberType: 1,
							bgLogo: '',
							flagAnchorType: 0,
							logoList: ''
						},
						{
							classificationId: 10467,
							logo: '',
							name: 'IT互联网',
							classifyDesc: '发布IT相关课程',
							parentId: 10139,
							classLevel: 2,
							memberType: 1,
							bgLogo: '',
							flagAnchorType: 0,
							logoList: ''
						},
						{
							classificationId: 10468,
							logo: '',
							name: '电商营销',
							classifyDesc: '电商营销相关课程',
							parentId: 10139,
							classLevel: 2,
							memberType: 1,
							bgLogo: '',
							flagAnchorType: 0,
							logoList: ''
						},
						{
							classificationId: 10469,
							logo: '',
							name: '职业考证',
							classifyDesc: '职业考证类目',
							parentId: 10139,
							classLevel: 2,
							memberType: 1,
							bgLogo: '',
							flagAnchorType: 0,
							logoList: ''
						},
						{
							classificationId: 10470,
							logo: '',
							name: '升学考研',
							classifyDesc: '升学考验相关课程',
							parentId: 10139,
							classLevel: 2,
							memberType: 1,
							bgLogo: '',
							flagAnchorType: 0,
							logoList: ''
						},
						{
							classificationId: 10471,
							logo: '',
							name: '才艺技能',
							classifyDesc: '才艺技能相关课程',
							parentId: 10139,
							classLevel: 2,
							memberType: 1,
							bgLogo: '',
							flagAnchorType: 0,
							logoList: ''
						},
						{
							classificationId: 10472,
							logo: '',
							name: '语言留学',
							classifyDesc: '语言留学相关岗位',
							parentId: 10139,
							classLevel: 2,
							memberType: 1,
							bgLogo: '',
							flagAnchorType: 0,
							logoList: ''
						},
						{
							classificationId: 10473,
							logo: '',
							name: '其他',
							classifyDesc: '其他',
							parentId: 10139,
							classLevel: 2,
							memberType: 1,
							bgLogo: '',
							flagAnchorType: 0,
							logoList: ''
						}
					]
				},
				{
					classificationId: 10141,
					logo: 'https://qiniu-image.qtshe.com/1496731380348_9557.jpg-100',
					name: '才艺技能',
					classifyDesc: '新才艺技能',
					classLevel: 1,
					memberType: 0,
					bgLogo: '',
					flagAnchorType: 0,
					logoList: '',
					secondClassifications: [
						{
							classificationId: 10141,
							logo: '1496731380348_9557.jpg',
							name: '全部',
							classLevel: 1,
							memberType: 0
						},
						{
							classificationId: 10194,
							logo: 'https://qiniu-image.qtshe.com/1495618347952_2551.jpg-100',
							name: '美工设计',
							classifyDesc: '美工设计',
							parentId: 10141,
							classLevel: 2,
							memberType: 0,
							bgLogo: '',
							flagAnchorType: 0,
							logoList: ''
						},
						{
							classificationId: 10168,
							logo: 'https://qiniu-image.qtshe.com/1495618292312_4436.jpg-100',
							name: '摄影视频',
							classifyDesc: '设计摄影',
							parentId: 10141,
							classLevel: 2,
							memberType: 0,
							bgLogo: '',
							flagAnchorType: 0,
							logoList: ''
						},
						{
							classificationId: 10170,
							logo: 'https://qiniu-image.qtshe.com/1495618330417_7180.jpg-100',
							name: '其他才艺/技能',
							classifyDesc: '翻译',
							parentId: 10141,
							classLevel: 2,
							memberType: 0,
							bgLogo: '',
							flagAnchorType: 0,
							logoList: ''
						},
						{
							classificationId: 10173,
							logo: 'https://qiniu-image.qtshe.com/1495618401091_5369.jpg-100',
							name: '游戏测评',
							classifyDesc: '游戏测评',
							parentId: 10141,
							classLevel: 2,
							memberType: 0,
							bgLogo: '',
							flagAnchorType: 0,
							logoList: ''
						}
					]
				},
				{
					classificationId: 10142,
					logo: 'https://qiniu-image.qtshe.com/1496731626994_9979.jpg-100',
					name: '客服话务',
					classifyDesc: '新客服话务',
					classLevel: 1,
					memberType: 0,
					bgLogo: '',
					flagAnchorType: 0,
					logoList: '',
					secondClassifications: [
						{
							classificationId: 10142,
							logo: '1496731626994_9979.jpg',
							name: '全部',
							classLevel: 1,
							memberType: 0
						},
						{
							classificationId: 10163,
							logo: 'https://qiniu-image.qtshe.com/1495618118398_9370.jpg-100',
							name: '客服',
							classifyDesc: '客服',
							parentId: 10142,
							classLevel: 2,
							memberType: 0,
							bgLogo: '',
							flagAnchorType: 0,
							logoList: ''
						},
						{
							classificationId: 10164,
							logo: 'https://qiniu-image.qtshe.com/1495618140214_6490.jpg-100',
							name: '话务员',
							classifyDesc: '话务员',
							parentId: 10142,
							classLevel: 2,
							memberType: 0,
							bgLogo: '',
							flagAnchorType: 0,
							logoList: ''
						}
					]
				},
				{
					classificationId: 10187,
					logo: 'https://qiniu-image.qtshe.com/1495618347952_2551.jpg-100',
					name: '文员助理',
					classifyDesc: '文员助理',
					classLevel: 1,
					memberType: 0,
					bgLogo: '',
					flagAnchorType: 0,
					logoList: '',
					secondClassifications: [
						{
							classificationId: 10187,
							logo: '1495618347952_2551.jpg',
							name: '全部',
							classLevel: 1,
							memberType: 0
						},
						{
							classificationId: 10165,
							logo: 'https://qiniu-image.qtshe.com/1495618162191_1200.jpg-100',
							name: '行政/文员',
							classifyDesc: '文员',
							parentId: 10187,
							classLevel: 2,
							memberType: 0,
							bgLogo: '',
							flagAnchorType: 0,
							logoList: ''
						},
						{
							classificationId: 10188,
							logo: 'https://qiniu-image.qtshe.com/1495618347952_2551.jpg-100',
							name: '运营/助理',
							classifyDesc: '运营/运营助理',
							parentId: 10187,
							classLevel: 2,
							memberType: 0,
							bgLogo: '',
							flagAnchorType: 0,
							logoList: ''
						},
						{
							classificationId: 10189,
							logo: 'https://qiniu-image.qtshe.com/1495618347952_2551.jpg-100',
							name: '资料录入',
							classifyDesc: '资料录入',
							parentId: 10187,
							classLevel: 2,
							memberType: 0,
							bgLogo: '',
							flagAnchorType: 0,
							logoList: ''
						},
						{
							classificationId: 10190,
							logo: 'https://qiniu-image.qtshe.com/1495618347952_2551.jpg-100',
							name: '信息标注',
							classifyDesc: '信息标注',
							parentId: 10187,
							classLevel: 2,
							memberType: 0,
							bgLogo: '',
							flagAnchorType: 0,
							logoList: ''
						}
					]
				},
				{
					classificationId: 10353,
					logo: '',
					name: '线下主播',
					classifyDesc: '线下主播',
					classLevel: 1,
					memberType: 0,
					bgLogo: '',
					flagAnchorType: 0,
					logoList: '',
					secondClassifications: [
						{
							classificationId: 10353,
							logo: '',
							name: '全部',
							classLevel: 1,
							memberType: 0
						},
						{
							classificationId: 10354,
							logo: '',
							name: '游戏主播',
							classifyDesc: '玩游戏~拿高薪！',
							parentId: 10353,
							classLevel: 2,
							memberType: 1,
							bgLogo: 'http://qiniu-image.qtshe.com/1594086801945_55.png',
							flagAnchorType: 1,
							logoList:
								'1607681655089_565.png,1607681655093_393.png,1607681655090_913.png,1607681655093_717.png,1607681655103_428.png,1607681655180_756.png,1607681655093_683.png,1607681655089_448.png,1607681655178_208.png,1607681655103_471.png,1607681655090_26.png,1607681655093_422.png'
						},
						{
							classificationId: 10355,
							logo: '',
							name: '颜值主播',
							classifyDesc: '有颜有才二选一',
							parentId: 10353,
							classLevel: 2,
							memberType: 1,
							bgLogo: 'http://qiniu-image.qtshe.com/1594087125883_614.png',
							flagAnchorType: 1,
							logoList:
								'1605505318516_393.png,1605505318228_964.png,1605505318244_157.png,1605505318330_735.png,1605505318229_115.png,1605505318244_529.png,1605505318407_56.png,1605505318334_373.png,1605505318378_270.png,1605505318428_496.png,1605505318407_687.png,1605505318424_553.png,1605505318514_373.png,1605505318244_181.png,1605505318241_895.png'
						},
						{
							classificationId: 10356,
							logo: '',
							name: '声音主播',
							classifyDesc: '声音好听就能赚钱系列',
							parentId: 10353,
							classLevel: 2,
							memberType: 1,
							bgLogo: 'http://qiniu-image.qtshe.com/1594087287846_180.png',
							flagAnchorType: 1,
							logoList:
								'1607681575669_618.png,1607681575664_3.png,1607681575665_94.png,1607681575666_520.png,1607681575661_880.png,1607681575661_278.png,1607681575661_879.png,1607681575661_943.png,1607681575669_468.png,1607681575663_544.png,1607681575666_117.png,1607681575661_703.png,1607681575663_342.png,1607681575668_884.png,1607681575667_661.png'
						},
						{
							classificationId: 10357,
							logo: '',
							name: '聊天主播',
							classifyDesc: '打字聊天轻松赚',
							parentId: 10353,
							classLevel: 2,
							memberType: 1,
							bgLogo: 'http://qiniu-image.qtshe.com/1594087689023_199.png',
							flagAnchorType: 1,
							logoList:
								'1607681504016_566.png,1607681504002_474.png,1607681504029_582.png,1607681504016_990.png,1607681504009_30.png,1607681504001_931.png,1607681504016_403.png,1607681504025_811.png,1607681504001_561.png,1607681504026_147.png,1607681504037_150.png,1607681504015_164.png,1607681504038_13.png,1607681504025_57.png,1607681504037_510.png'
						},
						{
							classificationId: 10358,
							logo: '',
							name: '带货主播',
							classifyDesc: '带货小能手，人形种草机',
							parentId: 10353,
							classLevel: 2,
							memberType: 1,
							bgLogo: 'http://qiniu-image.qtshe.com/1594087199562_327.png',
							flagAnchorType: 1,
							logoList: '1605505262427_772.png,1605505262424_606.png,1605505262407_312.png,1605505262426_879.png,1605505262439_321.png'
						}
					]
				},
				{
					classificationId: 10143,
					logo: 'https://qiniu-image.qtshe.com/1496731635722_7046.jpg-100',
					name: '其他',
					classifyDesc: '新其他',
					classLevel: 1,
					memberType: 0,
					bgLogo: '',
					flagAnchorType: 0,
					logoList: '',
					secondClassifications: [
						{
							classificationId: 10143,
							logo: '1496731635722_7046.jpg',
							name: '全部',
							classLevel: 1,
							memberType: 0
						},
						{
							classificationId: 10162,
							logo: 'https://qiniu-image.qtshe.com/1495618020848_1399.jpg-100',
							name: '其他',
							classifyDesc: '其他',
							parentId: 10143,
							classLevel: 2,
							memberType: 0,
							bgLogo: '',
							flagAnchorType: 0,
							logoList: ''
						}
					]
				}
			],
			sortRules: [
				{
					key: '',
					value: '默认'
				},
				{
					key: '2',
					value: '离我近'
				},
				{
					key: '3',
					value: '最新'
				}
			],
			areas: [
				{
					areaId: 0,
					townId: 0,
					areaName: '不限'
				},
				{
					areaId: 1806,
					townId: 205,
					areaName: '茂南区'
				},
				{
					areaId: 1809,
					townId: 205,
					areaName: '高州市'
				},
				{
					areaId: 1810,
					townId: 205,
					areaName: '化州市'
				},
				{
					areaId: 1811,
					townId: 205,
					areaName: '信宜市'
				},
				{
					areaId: 2939,
					townId: 205,
					areaName: '电白区'
				}
			],
			clearingForms: [
				{
					key: '99',
					value: '不限'
				},
				{
					key: '1',
					value: '日结'
				},
				{
					key: '2',
					value: '周结'
				},
				{
					key: '3',
					value: '月结'
				},
				{
					key: '4',
					value: '完工结算'
				},
				{
					key: '0',
					value: '其他结算'
				}
			],
			userSex: '',
			classList: [],
			searchList: [
				{
					name: '服务员',
					hot: 0,
					sourceType: 1
				},
				{
					name: '超市零售',
					hot: 0,
					sourceType: 1
				},
				{
					name: '日结兼职',
					hot: 0,
					sourceType: 2
				},
				{
					name: '日结',
					hot: 0,
					sourceType: 2
				},
				{
					name: '寒假工',
					hot: 0,
					sourceType: 2
				},
				{
					name: '夜班',
					hot: 0,
					sourceType: 2
				},
				{
					name: '配音',
					hot: 0,
					sourceType: 2
				},
				{
					name: '奶茶',
					hot: 0,
					sourceType: 2
				},
				{
					name: '剪辑',
					hot: 0,
					sourceType: 2
				},
				{
					name: '发传单',
					hot: 0,
					sourceType: 2
				}
			],
			showGuide: false,
			commandFilterData: {
				classIds: '',
				parentClassIds: '',
				clearingForms: '',
				areaIds: '',
				sexRequire: '',
				sortRules: ''
			},
			controlPop: '',
			hostExistsJobIds: '',
			clearWordChange: false,
			collectImage: '',
			collectContentId: '',
			collectVisible: false,
			newUserTemplate: '',
			isCollectDialog: false,
			universeParam: {},
			refreshLocation: 17,
			firstPageJobNum: 10,
			waitRenderList: [
				{
					addressDetail: '不限工作地点',
					partJobId: 1176771,
					title: '需电脑/免费派单赚钱/免费学剪辑>20岁',
					titleSimple: '需电脑/免费派单赚钱/免费学剪辑>20岁',
					salary: '699元/其他',
					clearingForm: {
						key: '0',
						value: '其他'
					},
					welfare: '',
					companyName: '杭州智颀教育科技有限公司',
					logo: 'https://qiniu-image.qtshe.com/company_logo_default.png',
					dataSource: 1,
					jobLineType: 1,
					category: 1,
					entryCount: 10679,
					companyType: {
						key: '1',
						value: '企业'
					},
					brandName: '智颀教育',
					companyLogo: '',
					parentClassId: 10139,
					classId: 10473,
					c1: 118000000,
					c2: 118110000,
					c3: 118110101,
					algorithmStrategyId: '1-170',
					labelList: {
						serviceLabels: [
							{
								labelId: 61,
								labelName: '企业认证',
								labelStyle: '{"id":10,"icon":"","color":"#72AAFA","borderColor":"#72AAFA","background":"#FFFFFF"}'
							}
						],
						descLabels: [
							{
								labelId: 19,
								labelName: '最新发布',
								labelStyle: '{"id":6,"icon":"","color":"#FA5555","borderColor":"#FEEEEE","background":"#FEEEEE"}'
							},
							{
								labelId: 66,
								labelName: '免费培训',
								labelStyle: '{"id":2,"icon":"https://qiniu-image.qtshe.com/newLabel/icon5.png","color":"#703E0F","borderColor":"#FEDEA9","background":"#FEDEA9"}'
							}
						]
					},
					listStyle: 1,
					ptpModParam: {
						algorithmStrategyId: '1-170',
						dataSource: 1
					}
				},
				{
					addressDetail: '不限工作地点',
					partJobId: 1182470,
					title: '招线上聊天员限女生日结',
					titleSimple: '招线上聊天员限女生日结',
					salary: '200元/天',
					clearingForm: {
						key: '1',
						value: '日结'
					},
					welfare: '有提成,免费培训,任务奖',
					companyName: '临邑县八九互娱文化传媒有限公司',
					logo: 'https://qiniu-image.qtshe.com/company_logo_default.png',
					dataSource: 1,
					jobLineType: 1,
					category: 1,
					entryCount: 11968,
					companyType: {
						key: '1',
						value: '企业'
					},
					brandName: '八九互娱',
					companyLogo: '',
					parentClassId: 10139,
					classId: 10351,
					c1: 120000000,
					c2: 120102000,
					c3: 0,
					algorithmStrategyId: '1-170',
					jobPicture: [
						{
							picture: 'https://qiniu-image.qtshe.com/1607681530534_465.png',
							pictureType: 0
						}
					],
					labelList: {
						serviceLabels: [
							{
								labelId: 61,
								labelName: '企业认证',
								labelStyle: '{"id":10,"icon":"","color":"#72AAFA","borderColor":"#72AAFA","background":"#FFFFFF"}'
							}
						],
						descLabels: [
							{
								labelId: 19,
								labelName: '最新发布',
								labelStyle: '{"id":6,"icon":"","color":"#FA5555","borderColor":"#FEEEEE","background":"#FEEEEE"}'
							},
							{
								labelId: 9,
								labelName: '有提成',
								labelStyle: '{"id":6,"icon":"","color":"#FA5555","borderColor":"#FEEEEE","background":"#FEEEEE"}'
							},
							{
								labelId: 32,
								labelName: '限女生',
								labelStyle: '{"id":7,"icon":"","color":"#838D99","borderColor":"#DFE3E9","background":"#FFFFFF"}'
							}
						]
					},
					listStyle: 2,
					jobIntroduction: [
						{
							title: '岗位简介',
							introductionDesc: '无特殊才艺技能要求，喜欢聊天交友即可，性格开朗更佳'
						}
					],
					newJobIntroduction: '无颜值要求，打字聊天赚收益，工作简单，培训流程完善',
					ptpModParam: {
						algorithmStrategyId: '1-170',
						dataSource: 1
					}
				},
				{
					addressDetail: '不限工作地点',
					partJobId: 1173731,
					title: '需电脑/免费派单赚钱/免费学剪辑/满18',
					titleSimple: '需电脑/免费派单赚钱/免费学剪辑/满18',
					salary: '880元/其他',
					clearingForm: {
						key: '0',
						value: '其他'
					},
					welfare: '',
					companyName: '杭州学德慧教育科技有限公司',
					logo: 'https://qiniu-image.qtshe.com/company_logo_default.png',
					dataSource: 1,
					jobLineType: 1,
					category: 1,
					entryCount: 9696,
					companyType: {
						key: '1',
						value: '企业'
					},
					brandName: '学德慧',
					companyLogo: '',
					parentClassId: 10139,
					classId: 10473,
					c1: 118000000,
					c2: 118110000,
					c3: 118110101,
					algorithmStrategyId: '1-170',
					jobPicture: [
						{
							picture: 'https://qiniu-image.qtshe.com/1636679035703_809.jpg',
							pictureType: 0
						}
					],
					labelList: {
						serviceLabels: [
							{
								labelId: 61,
								labelName: '企业认证',
								labelStyle: '{"id":10,"icon":"","color":"#72AAFA","borderColor":"#72AAFA","background":"#FFFFFF"}'
							}
						],
						descLabels: [
							{
								labelId: 19,
								labelName: '最新发布',
								labelStyle: '{"id":6,"icon":"","color":"#FA5555","borderColor":"#FEEEEE","background":"#FEEEEE"}'
							},
							{
								labelId: 66,
								labelName: '免费培训',
								labelStyle: '{"id":2,"icon":"https://qiniu-image.qtshe.com/newLabel/icon5.png","color":"#703E0F","borderColor":"#FEDEA9","background":"#FEDEA9"}'
							}
						]
					},
					listStyle: 1,
					ptpModParam: {
						algorithmStrategyId: '1-170',
						dataSource: 1
					}
				},
				{
					addressDetail: '麦当劳(东信名苑店)',
					distance: '2.65km',
					partJobId: 1023565,
					title: '麦当劳招服务员（东信名苑店）',
					titleSimple: '麦当劳招服务员（东信名苑店）',
					salary: '10.1元/小时',
					clearingForm: {
						key: '3',
						value: '月结'
					},
					welfare: '',
					companyName: '深圳金拱门食品有限公司',
					logo: 'https://qiniu-image.qtshe.com/1604585038284_338.png',
					dataSource: 1,
					jobLineType: 2,
					category: 1,
					entryCount: 368,
					companyType: {
						key: '1',
						value: '企业'
					},
					brandName: '金拱门',
					companyLogo: 'https://qiniu-image.qtshe.com/1604585038284_338.png',
					parentClassId: 10135,
					classId: 10153,
					c1: 101000000,
					c2: 101103000,
					c3: 0,
					algorithmStrategyId: '1-170',
					jobPicture: [
						{
							picture: 'https://qiniu-image.qtshe.com/1597839675274_775.jpg',
							pictureType: 0
						}
					],
					labelList: {
						serviceLabels: [
							{
								labelId: 61,
								labelName: '企业认证',
								labelStyle: '{"id":10,"icon":"","color":"#72AAFA","borderColor":"#72AAFA","background":"#FFFFFF"}'
							}
						],
						descLabels: [
							{
								labelId: 5,
								labelName: '名企认证',
								labelStyle: '{"id":2,"icon":"https://qiniu-image.qtshe.com/newLabel/icon5.png","color":"#703E0F","borderColor":"#FEDEA9","background":"#FEDEA9"}'
							},
							{
								labelId: 67,
								labelName: '工作证优先',
								labelStyle:
									'{"id":12,"icon":"https://qiniu-image.qtshe.com/newLabel/20210511-icon8.png","color":"#1677FF","borderColor":"#E7F0FF","background":"#E7F0FF"}'
							},
							{
								labelId: 4,
								labelName: '周末兼职',
								labelStyle: '{"id":6,"icon":"","color":"#FA5555","borderColor":"#FEEEEE","background":"#FEEEEE"}'
							},
							{
								labelId: 31,
								labelName: '时薪',
								labelStyle: '{"id":6,"icon":"","color":"#FA5555","borderColor":"#FEEEEE","background":"#FEEEEE"}'
							}
						]
					},
					labelRecommend: [
						{
							townId: 205,
							tagType: 2,
							tagParams:
								'{"userNum":337,"labelStyle":"{\\"icon\\":\\"https://qiniu-image.qtshe.com/gateway/hot.png\\",\\"color\\":\\"#FA5555\\",\\"borderColor\\":\\"#FEEEEE\\",\\"background\\":\\"#FEEEEE\\"}","ranking":1,"schoolName":"广东茂名幼儿师范专科学校","schoolCode":"14587"}'
						}
					],
					labelRecommendNewList: {
						subwayLabels: [],
						rankingLabels: [
							{
								townId: 205,
								tagType: 2,
								tagParams:
									'{"userNum":337,"labelStyle":"{\\"icon\\":\\"https://qiniu-image.qtshe.com/gateway/hot.png\\",\\"color\\":\\"#FA5555\\",\\"borderColor\\":\\"#FEEEEE\\",\\"background\\":\\"#FEEEEE\\"}","ranking":1,"schoolName":"广东茂名幼儿师范专科学校","schoolCode":"14587"}',
								icon: 'https://qiniu-image.qtshe.com/1615277014125_55.png',
								jumpKey: 'CIRCLE_RECOMMEND_JOBS',
								param:
									'[{"key": "pageType","name": "页面类型2校友 3商圈","type": "String","value":2},{"key": "circleCode","name": "业务id","type": "String","value":"14587"}]',
								backgroundColor: '#FEEEEE'
							}
						]
					},
					listStyle: 1,
					ptpModParam: {
						algorithmStrategyId: '1-170',
						dataSource: 1
					}
				},
				{
					addressDetail: '不限工作地点',
					partJobId: 998296,
					title: '在家兼职手机创业淘宝>20岁',
					titleSimple: '在家兼职手机创业淘宝>20岁',
					salary: '5000元/月',
					clearingForm: {
						key: '3',
						value: '月结'
					},
					welfare: '',
					companyName: '桐乡市梧桐界频网络技术服务部',
					logo: 'https://qiniu-image.qtshe.com/company_logo_default.png',
					dataSource: 1,
					jobLineType: 1,
					category: 1,
					entryCount: 22679,
					companyType: {
						key: '1',
						value: '企业'
					},
					brandName: '梧桐界频',
					companyLogo: '',
					parentClassId: 10139,
					classId: 10473,
					c1: 117000000,
					c2: 117103000,
					c3: 117103102,
					algorithmStrategyId: '1-170',
					labelList: {
						serviceLabels: [
							{
								labelId: 61,
								labelName: '企业认证',
								labelStyle: '{"id":10,"icon":"","color":"#72AAFA","borderColor":"#72AAFA","background":"#FFFFFF"}'
							}
						],
						descLabels: [
							{
								labelId: 32,
								labelName: '限女生',
								labelStyle: '{"id":7,"icon":"","color":"#838D99","borderColor":"#DFE3E9","background":"#FFFFFF"}'
							}
						]
					},
					labelRecommendNewList: {
						subwayLabels: [],
						rankingLabels: [
							{
								townId: 0,
								tagType: 4,
								tagParams: '{"exposure_num":961462,"label_name":"学生兼职","job_rnk":24}',
								icon: 'https://qiniu-image.qtshe.com/1615276852550_664.png',
								jumpKey: 'WORK_RANK',
								param: '[{"key":"labelId","name":"标签Id","type":"String","value":10204},{"key":"labelName","name":"标签名","type":"String","value":"学生兼职"}]',
								backgroundColor: '#FFF2E5'
							},
							{
								townId: 0,
								tagType: 4,
								tagParams: '{"exposure_num":961462,"label_name":"批发代理","job_rnk":5}',
								icon: 'https://qiniu-image.qtshe.com/1615276852550_664.png',
								jumpKey: 'WORK_RANK',
								param: '[{"key":"labelId","name":"标签Id","type":"String","value":10206},{"key":"labelName","name":"标签名","type":"String","value":"批发代理"}]',
								backgroundColor: '#FFF2E5'
							}
						]
					},
					listStyle: 1,
					ptpModParam: {
						algorithmStrategyId: '1-170',
						dataSource: 1
					}
				},
				{
					addressDetail: '不限工作地点',
					partJobId: 463193,
					title: '招扫码推广员',
					titleSimple: '扫码推广员',
					salary: '5元/次',
					clearingForm: {
						key: '1',
						value: '日结'
					},
					welfare: '',
					companyName: '刘志鹏 · 招聘者',
					logo: 'https://qiniu-image.qtshe.com/company_person_logo_default.png',
					dataSource: 1,
					jobLineType: 2,
					category: 1,
					entryCount: 1088,
					companyType: {
						key: '2',
						value: '个人'
					},
					companyLogo: '',
					parentClassId: 10133,
					classId: 10191,
					c1: 109000000,
					c2: 109104000,
					c3: 0,
					algorithmStrategyId: '1-170',
					jobPicture: [
						{
							picture: 'https://qiniu-image.qtshe.com/1605596869306_876.jpg',
							pictureType: 0
						}
					],
					labelList: {
						serviceLabels: [
							{
								labelId: 60,
								labelName: '实名认证',
								labelStyle: '{"id":11,"icon":"","color":"#00CF8A","borderColor":"#00CF8A","background":"#FFFFFF"}'
							}
						]
					},
					labelRecommend: [
						{
							townId: 199,
							tagType: 2,
							tagParams:
								'{"userNum":5313,"labelStyle":"{\\"icon\\":\\"https://qiniu-image.qtshe.com/gateway/hot.png\\",\\"color\\":\\"#FA5555\\",\\"borderColor\\":\\"#FEEEEE\\",\\"background\\":\\"#FEEEEE\\"}","ranking":34,"schoolName":"深圳技术大学","schoolCode":"14655"}'
						}
					],
					labelRecommendNewList: {
						subwayLabels: [],
						rankingLabels: [
							{
								townId: 199,
								tagType: 4,
								tagParams: '{"exposure_num":236787,"label_name":"靠谱兼职","job_rnk":1}',
								icon: 'https://qiniu-image.qtshe.com/1615276852550_664.png',
								jumpKey: 'WORK_RANK',
								param: '[{"key":"labelId","name":"标签Id","type":"String","value":10000},{"key":"labelName","name":"标签名","type":"String","value":"工资日结"}]',
								backgroundColor: '#FFF2E5'
							}
						]
					},
					listStyle: 1,
					ptpModParam: {
						algorithmStrategyId: '1-170',
						dataSource: 1
					}
				},
				{
					addressDetail: '不限工作地点',
					partJobId: 1188990,
					title: '0基础学PS 兼职接单',
					titleSimple: '0基础学PS 兼职接单',
					salary: '1000元/其他',
					clearingForm: {
						key: '0',
						value: '其他'
					},
					welfare: '软件安装包,软件素材包,兼职机会,实习机会,进阶课折扣券',
					companyName: '看点（福州）文化传媒有限公司',
					logo: 'https://qiniu-image.qtshe.com/company_logo_default.png',
					dataSource: 1,
					jobLineType: 1,
					category: 1,
					entryCount: 711,
					companyType: {
						key: '1',
						value: '企业'
					},
					brandName: '看点教育',
					companyLogo: '',
					parentClassId: 10139,
					classId: 10465,
					c1: 118000000,
					c2: 118102000,
					c3: 118102101,
					algorithmStrategyId: '1-170',
					labelList: {
						serviceLabels: [
							{
								labelId: 61,
								labelName: '企业认证',
								labelStyle: '{"id":10,"icon":"","color":"#72AAFA","borderColor":"#72AAFA","background":"#FFFFFF"}'
							}
						],
						descLabels: [
							{
								labelId: 19,
								labelName: '最新发布',
								labelStyle: '{"id":6,"icon":"","color":"#FA5555","borderColor":"#FEEEEE","background":"#FEEEEE"}'
							}
						]
					},
					labelRecommendNewList: {
						subwayLabels: [],
						rankingLabels: [
							{
								townId: 0,
								tagType: 4,
								tagParams: '{"exposure_num":565463,"label_name":"设计创作","job_rnk":15}',
								icon: 'https://qiniu-image.qtshe.com/1615276852550_664.png',
								jumpKey: 'WORK_RANK',
								param: '[{"key":"labelId","name":"标签Id","type":"String","value":10117},{"key":"labelName","name":"标签名","type":"String","value":"设计创作"}]',
								backgroundColor: '#FFF2E5'
							}
						]
					},
					listStyle: 3,
					jobIntroduction: [
						{
							title: '你将获得',
							introductionDesc: '熟练使用画图软件；GET兼职基本技能'
						},
						{
							title: '就业机会',
							introductionDesc: '成为工作室专业设计师，工作稳定，就业机会多'
						}
					],
					newJobIntroduction: '专业图库网站兼职接单，内容简单，时间自由',
					ptpModParam: {
						algorithmStrategyId: '1-170',
						dataSource: 1
					}
				},
				{
					addressDetail: '不限工作地点',
					partJobId: 1053583,
					title: '诚招不露脸主播',
					titleSimple: '诚招不露脸主播',
					salary: '5000元/月',
					clearingForm: {
						key: '3',
						value: '月结'
					},
					welfare: '有提成,奖金奖励',
					companyName: '藏音工作室',
					logo: 'https://qiniu-image.qtshe.com/1606726957823_844.jpg',
					dataSource: 1,
					jobLineType: 2,
					category: 1,
					entryCount: 3381,
					companyType: {
						key: '1',
						value: '企业'
					},
					brandName: '藏音工作室',
					companyLogo: 'https://qiniu-image.qtshe.com/1606726957823_844.jpg',
					parentClassId: 10143,
					classId: 10162,
					c1: 120000000,
					c2: 120103000,
					c3: 120103105,
					algorithmStrategyId: '1-170',
					labelList: {
						serviceLabels: [
							{
								labelId: 61,
								labelName: '企业认证',
								labelStyle: '{"id":10,"icon":"","color":"#72AAFA","borderColor":"#72AAFA","background":"#FFFFFF"}'
							}
						],
						descLabels: [
							{
								labelId: 9,
								labelName: '有提成',
								labelStyle: '{"id":6,"icon":"","color":"#FA5555","borderColor":"#FEEEEE","background":"#FEEEEE"}'
							},
							{
								labelId: 32,
								labelName: '限女生',
								labelStyle: '{"id":7,"icon":"","color":"#838D99","borderColor":"#DFE3E9","background":"#FFFFFF"}'
							}
						]
					},
					listStyle: 1,
					newJobIntroduction: '无颜值要求，善于活跃气氛优先，直播要有安静的环境',
					ptpModParam: {
						algorithmStrategyId: '1-170',
						dataSource: 1
					}
				},
				{
					componentName: 'innerRankList',
					componentType: 1,
					componentData: {
						rankingList: []
					},
					partJobId: 116620
				},
				{
					addressDetail: '不限工作地点',
					partJobId: 1187619,
					title: '0基础学PS设计 轻松兼职赚钱',
					titleSimple: '0基础学PS设计 轻松兼职赚钱',
					salary: '999元/其他',
					clearingForm: {
						key: '0',
						value: '其他'
					},
					welfare: '软件安装包,软件素材包,进阶课折扣券,实习机会',
					companyName: '福州慧码教育科技有限公司',
					logo: 'https://qiniu-image.qtshe.com/company_logo_default.png',
					dataSource: 1,
					jobLineType: 1,
					category: 1,
					entryCount: 726,
					companyType: {
						key: '1',
						value: '企业'
					},
					brandName: '慧码教育',
					companyLogo: '',
					parentClassId: 10139,
					classId: 10465,
					c1: 118000000,
					c2: 118102000,
					c3: 118102101,
					algorithmStrategyId: '1-170',
					labelList: {
						serviceLabels: [
							{
								labelId: 61,
								labelName: '企业认证',
								labelStyle: '{"id":10,"icon":"","color":"#72AAFA","borderColor":"#72AAFA","background":"#FFFFFF"}'
							}
						],
						descLabels: [
							{
								labelId: 19,
								labelName: '最新发布',
								labelStyle: '{"id":6,"icon":"","color":"#FA5555","borderColor":"#FEEEEE","background":"#FEEEEE"}'
							}
						]
					},
					listStyle: 3,
					jobIntroduction: [
						{
							title: '你将获得',
							introductionDesc: '熟练使用画图软件；金牌讲师免费指导'
						},
						{
							title: '就业机会',
							introductionDesc: '出版社专业插画师，工作氛围有趣，发展前景好'
						}
					],
					newJobIntroduction: '成为工作室专业设计师，工作稳定，就业机会多',
					ptpModParam: {
						algorithmStrategyId: '1-170',
						dataSource: 1
					}
				},
				{
					addressDetail: '恒福尚城写字楼1座',
					distance: '3.28km',
					partJobId: 1024034,
					title: '招聘话务员',
					titleSimple: '招聘话务员',
					salary: '70元/天',
					clearingForm: {
						key: '1',
						value: '日结'
					},
					welfare: '包住,包吃,有提成',
					companyName: '茂名市恒鼎营销策划有限公司',
					logo: 'https://qiniu-image.qtshe.com/1616570437500_441.png',
					dataSource: 1,
					jobLineType: 2,
					category: 1,
					entryCount: 180,
					companyType: {
						key: '1',
						value: '企业'
					},
					brandName: '恒鼎',
					companyLogo: 'https://qiniu-image.qtshe.com/1616570437500_441.png',
					parentClassId: 10142,
					classId: 10164,
					c1: 105000000,
					c2: 105101000,
					c3: 0,
					algorithmStrategyId: '1-170',
					labelList: {
						serviceLabels: [
							{
								labelId: 61,
								labelName: '企业认证',
								labelStyle: '{"id":10,"icon":"","color":"#72AAFA","borderColor":"#72AAFA","background":"#FFFFFF"}'
							}
						],
						descLabels: [
							{
								labelId: 22,
								labelName: '环境好',
								labelStyle: '{"id":6,"icon":"","color":"#FA5555","borderColor":"#FEEEEE","background":"#FEEEEE"}'
							},
							{
								labelId: 4,
								labelName: '周末兼职',
								labelStyle: '{"id":6,"icon":"","color":"#FA5555","borderColor":"#FEEEEE","background":"#FEEEEE"}'
							},
							{
								labelId: 9,
								labelName: '有提成',
								labelStyle: '{"id":6,"icon":"","color":"#FA5555","borderColor":"#FEEEEE","background":"#FEEEEE"}'
							},
							{
								labelId: 7,
								labelName: '包吃',
								labelStyle: '{"id":6,"icon":"","color":"#FA5555","borderColor":"#FEEEEE","background":"#FEEEEE"}'
							},
							{
								labelId: 8,
								labelName: '包住',
								labelStyle: '{"id":6,"icon":"","color":"#FA5555","borderColor":"#FEEEEE","background":"#FEEEEE"}'
							}
						]
					},
					labelRecommend: [
						{
							townId: 205,
							tagType: 2,
							tagParams:
								'{"userNum":763,"labelStyle":"{\\"icon\\":\\"https://qiniu-image.qtshe.com/gateway/hot.png\\",\\"color\\":\\"#FA5555\\",\\"borderColor\\":\\"#FEEEEE\\",\\"background\\":\\"#FEEEEE\\"}","ranking":2,"schoolName":"广东茂名健康职业学院","schoolCode":"14556"}'
						}
					],
					labelRecommendNewList: {
						subwayLabels: [],
						rankingLabels: [
							{
								townId: 205,
								tagType: 2,
								tagParams:
									'{"userNum":763,"labelStyle":"{\\"icon\\":\\"https://qiniu-image.qtshe.com/gateway/hot.png\\",\\"color\\":\\"#FA5555\\",\\"borderColor\\":\\"#FEEEEE\\",\\"background\\":\\"#FEEEEE\\"}","ranking":2,"schoolName":"广东茂名健康职业学院","schoolCode":"14556"}',
								icon: 'https://qiniu-image.qtshe.com/1615277014125_55.png',
								jumpKey: 'CIRCLE_RECOMMEND_JOBS',
								param:
									'[{"key": "pageType","name": "页面类型2校友 3商圈","type": "String","value":2},{"key": "circleCode","name": "业务id","type": "String","value":"14556"}]',
								backgroundColor: '#FEEEEE'
							}
						]
					},
					listStyle: 1,
					ptpModParam: {
						algorithmStrategyId: '1-170',
						dataSource: 1
					}
				},
				{
					addressDetail: '不限工作地点',
					partJobId: 1172586,
					title: '宅家手机声音赚钱 小白免费试听',
					titleSimple: '宅家手机声音赚钱 小白免费试听',
					salary: '1000元/其他',
					clearingForm: {
						key: '0',
						value: '其他'
					},
					welfare: '名师授课,免费试听,软件安装包,进阶课折扣券',
					companyName: '成都环宇博睿教育咨询有限公司',
					logo: 'https://qiniu-image.qtshe.com/1635423876234_202.png',
					dataSource: 1,
					jobLineType: 1,
					category: 1,
					entryCount: 3028,
					companyType: {
						key: '1',
						value: '企业'
					},
					brandName: '环宇博睿',
					companyLogo: 'https://qiniu-image.qtshe.com/1635423876234_202.png',
					parentClassId: 10139,
					classId: 10471,
					c1: 118000000,
					c2: 118103000,
					c3: 118103101,
					algorithmStrategyId: '1-170',
					labelList: {
						serviceLabels: [
							{
								labelId: 61,
								labelName: '企业认证',
								labelStyle: '{"id":10,"icon":"","color":"#72AAFA","borderColor":"#72AAFA","background":"#FFFFFF"}'
							}
						],
						descLabels: [
							{
								labelId: 19,
								labelName: '最新发布',
								labelStyle: '{"id":6,"icon":"","color":"#FA5555","borderColor":"#FEEEEE","background":"#FEEEEE"}'
							}
						]
					},
					listStyle: 3,
					jobIntroduction: [
						{
							title: '你将获得',
							introductionDesc: '金牌课程免费试听；掌握技能变现技巧'
						},
						{
							title: '就业机会',
							introductionDesc: '成立个人工作室，时间自由，灵活就业'
						}
					],
					newJobIntroduction: '专业机构兼职接单，利用技能变现的好机会~',
					ptpModParam: {
						algorithmStrategyId: '1-170',
						dataSource: 1
					}
				},
				{
					addressDetail: '不限工作地点',
					partJobId: 1146665,
					title: '零基础招PS学徒 在家赚钱',
					titleSimple: '零基础招PS学徒 在家赚钱',
					salary: '399元/其他',
					clearingForm: {
						key: '0',
						value: '其他'
					},
					welfare: '软件安装包,进阶课折扣券,软件素材包,兼职机会,实习机会',
					companyName: '亲梓（天津）教育科技有限公司',
					logo: 'https://qiniu-image.qtshe.com/company_logo_default.png',
					dataSource: 1,
					jobLineType: 1,
					category: 1,
					entryCount: 11619,
					companyType: {
						key: '1',
						value: '企业'
					},
					brandName: '亲梓教育',
					companyLogo: '',
					parentClassId: 10139,
					classId: 10465,
					c1: 118000000,
					c2: 118102000,
					c3: 118102101,
					algorithmStrategyId: '1-170',
					jobPicture: [
						{
							picture: 'https://qiniu-image.qtshe.com/1636457364562_374.jpg',
							pictureType: 0
						}
					],
					labelList: {
						serviceLabels: [
							{
								labelId: 61,
								labelName: '企业认证',
								labelStyle: '{"id":10,"icon":"","color":"#72AAFA","borderColor":"#72AAFA","background":"#FFFFFF"}'
							}
						],
						descLabels: [
							{
								labelId: 9,
								labelName: '有提成',
								labelStyle: '{"id":6,"icon":"","color":"#FA5555","borderColor":"#FEEEEE","background":"#FEEEEE"}'
							}
						]
					},
					listStyle: 3,
					jobIntroduction: [
						{
							title: '你将获得',
							introductionDesc: '掌握PS实用技能；熟练使用画图软件'
						},
						{
							title: '就业机会',
							introductionDesc: '专业图库网站兼职接单，内容简单，时间自由'
						}
					],
					newJobIntroduction: '专业图库网站兼职接单，内容简单，时间自由',
					ptpModParam: {
						algorithmStrategyId: '1-170',
						dataSource: 1
					}
				},
				{
					addressDetail: '不限工作地点',
					partJobId: 1087967,
					title: '0基础学播音配音 宅家赚钱',
					titleSimple: '0基础学播音配音 宅家赚钱',
					salary: '600元/其他',
					clearingForm: {
						key: '0',
						value: '其他'
					},
					welfare: '名师授课,免费试听,0基础小白可学',
					companyName: '湖南国韵教育科技有限公司',
					logo: 'https://qiniu-image.qtshe.com/company_logo_default.png',
					dataSource: 1,
					jobLineType: 1,
					category: 1,
					entryCount: 432,
					companyType: {
						key: '1',
						value: '企业'
					},
					brandName: '国韵教育',
					companyLogo: '',
					parentClassId: 10139,
					classId: 10471,
					c1: 118000000,
					c2: 118103000,
					c3: 118103101,
					algorithmStrategyId: '1-170',
					labelList: {
						serviceLabels: [
							{
								labelId: 61,
								labelName: '企业认证',
								labelStyle: '{"id":10,"icon":"","color":"#72AAFA","borderColor":"#72AAFA","background":"#FFFFFF"}'
							}
						]
					},
					listStyle: 3,
					jobIntroduction: [
						{
							title: '你将获得',
							introductionDesc: '金牌讲师免费指导：尽早实现技能变现'
						},
						{
							title: '就业机会',
							introductionDesc: '工作室兼职派单机会，副业增收的好机会'
						}
					],
					newJobIntroduction: '成立个人工作室，时间自由，灵活就业',
					ptpModParam: {
						algorithmStrategyId: '1-170',
						dataSource: 1
					}
				},
				{
					addressDetail: '晨光文具阳光文创店',
					distance: '2.48km',
					partJobId: 1132343,
					title: '阳光文创百货商行招收银员',
					titleSimple: '阳光文创百货商行招收银员',
					salary: '2500元/月',
					clearingForm: {
						key: '3',
						value: '月结'
					},
					welfare: '加班补助,奖金奖励',
					companyName: '茂南区阳光文创百货商行',
					logo: 'https://qiniu-image.qtshe.com/company_logo_default.png',
					dataSource: 1,
					jobLineType: 2,
					category: 1,
					entryCount: 19,
					companyType: {
						key: '1',
						value: '企业'
					},
					brandName: '',
					companyLogo: '',
					parentClassId: 10136,
					classId: 10156,
					c1: 103000000,
					c2: 103101000,
					c3: 0,
					algorithmStrategyId: '1-170',
					jobPicture: [
						{
							picture: 'https://qiniu-image.qtshe.com/1597839739465_964.jpg',
							pictureType: 0
						}
					],
					labelList: {
						serviceLabels: [
							{
								labelId: 61,
								labelName: '企业认证',
								labelStyle: '{"id":10,"icon":"","color":"#72AAFA","borderColor":"#72AAFA","background":"#FFFFFF"}'
							}
						],
						descLabels: [
							{
								labelId: 22,
								labelName: '环境好',
								labelStyle: '{"id":6,"icon":"","color":"#FA5555","borderColor":"#FEEEEE","background":"#FEEEEE"}'
							}
						]
					},
					labelRecommend: [
						{
							townId: 205,
							tagType: 2,
							tagParams:
								'{"userNum":2645,"labelStyle":"{\\"icon\\":\\"https://qiniu-image.qtshe.com/gateway/hot.png\\",\\"color\\":\\"#FA5555\\",\\"borderColor\\":\\"#FEEEEE\\",\\"background\\":\\"#FEEEEE\\"}","ranking":9,"schoolName":"茂名职业技术学院","schoolCode":"13712"}'
						}
					],
					labelRecommendNewList: {
						subwayLabels: [],
						rankingLabels: [
							{
								townId: 205,
								tagType: 2,
								tagParams:
									'{"userNum":2645,"labelStyle":"{\\"icon\\":\\"https://qiniu-image.qtshe.com/gateway/hot.png\\",\\"color\\":\\"#FA5555\\",\\"borderColor\\":\\"#FEEEEE\\",\\"background\\":\\"#FEEEEE\\"}","ranking":9,"schoolName":"茂名职业技术学院","schoolCode":"13712"}',
								icon: 'https://qiniu-image.qtshe.com/1615277014125_55.png',
								jumpKey: 'CIRCLE_RECOMMEND_JOBS',
								param:
									'[{"key": "pageType","name": "页面类型2校友 3商圈","type": "String","value":2},{"key": "circleCode","name": "业务id","type": "String","value":"13712"}]',
								backgroundColor: '#FEEEEE'
							}
						]
					},
					listStyle: 1,
					ptpModParam: {
						algorithmStrategyId: '1-170',
						dataSource: 1
					}
				},
				{
					addressDetail: '不限工作地点',
					partJobId: 1068817,
					title: '招APP聊天员 日结',
					titleSimple: '招APP聊天员 日结',
					salary: '300元/天',
					clearingForm: {
						key: '1',
						value: '日结'
					},
					welfare: '流量扶持,免费培训,任务奖,有提成,奖金奖品',
					companyName: '杭州尚视传媒有限公司',
					logo: 'https://qiniu-image.qtshe.com/company_logo_default.png',
					dataSource: 1,
					jobLineType: 1,
					category: 1,
					entryCount: 5503,
					companyType: {
						key: '1',
						value: '企业'
					},
					brandName: '尚视传媒',
					companyLogo: '',
					parentClassId: 10139,
					classId: 10351,
					c1: 120000000,
					c2: 120102000,
					c3: 0,
					algorithmStrategyId: '1-170',
					jobPicture: [
						{
							picture: 'https://qiniu-image.qtshe.com/1607681530534_465.png',
							pictureType: 0
						}
					],
					labelList: {
						serviceLabels: [
							{
								labelId: 61,
								labelName: '企业认证',
								labelStyle: '{"id":10,"icon":"","color":"#72AAFA","borderColor":"#72AAFA","background":"#FFFFFF"}'
							}
						],
						descLabels: [
							{
								labelId: 9,
								labelName: '有提成',
								labelStyle: '{"id":6,"icon":"","color":"#FA5555","borderColor":"#FEEEEE","background":"#FEEEEE"}'
							},
							{
								labelId: 17,
								labelName: '日薪300元+',
								labelStyle: '{"id":8,"icon":"https://qiniu-image.qtshe.com/newLabel/icon2.png","color":"#FA5555","borderColor":"#FEEEEE","background":"#FEEEEE"}'
							},
							{
								labelId: 32,
								labelName: '限女生',
								labelStyle: '{"id":7,"icon":"","color":"#838D99","borderColor":"#DFE3E9","background":"#FFFFFF"}'
							}
						]
					},
					listStyle: 2,
					jobIntroduction: [
						{
							title: '岗位简介',
							introductionDesc: '一对一聊天兼职，文字聊、语音聊均有收益，时间自由'
						}
					],
					newJobIntroduction: '一对一聊天兼职，文字聊、语音聊均有收益，时间自由',
					ptpModParam: {
						algorithmStrategyId: '1-170',
						dataSource: 1
					}
				},
				{
					addressDetail: '高山东街137',
					distance: '2.40km',
					partJobId: 541471,
					title: '路安轮胎店招聘汽车维修工',
					titleSimple: '路安轮胎店汽车维修工',
					salary: '4000元/月',
					clearingForm: {
						key: '4',
						value: '完工结算'
					},
					welfare: '',
					companyName: '茂名市茂南车路安轮胎店',
					logo: 'https://qiniu-image.qtshe.com/company_logo_default.png',
					dataSource: 1,
					jobLineType: 2,
					category: 1,
					entryCount: 20,
					companyType: {
						key: '1',
						value: '企业'
					},
					brandName: '茂名市茂',
					companyLogo: '',
					parentClassId: 10207,
					classId: 10220,
					c1: 108000000,
					c2: 108101000,
					c3: 0,
					algorithmStrategyId: '1-170',
					labelList: {
						serviceLabels: [
							{
								labelId: 61,
								labelName: '企业认证',
								labelStyle: '{"id":10,"icon":"","color":"#72AAFA","borderColor":"#72AAFA","background":"#FFFFFF"}'
							}
						],
						descLabels: [
							{
								labelId: 30,
								labelName: '完工结',
								labelStyle: '{"id":9,"icon":"https://qiniu-image.qtshe.com/newLabel/icon3.png","color":"#FF8000","borderColor":"#FFF2E5","background":"#FFF2E5"}'
							}
						]
					},
					labelRecommend: [
						{
							townId: 205,
							tagType: 2,
							tagParams:
								'{"userNum":2645,"labelStyle":"{\\"icon\\":\\"https://qiniu-image.qtshe.com/gateway/hot.png\\",\\"color\\":\\"#FA5555\\",\\"borderColor\\":\\"#FEEEEE\\",\\"background\\":\\"#FEEEEE\\"}","ranking":12,"schoolName":"茂名职业技术学院","schoolCode":"13712"}'
						}
					],
					labelRecommendNewList: {
						subwayLabels: [],
						rankingLabels: [
							{
								townId: 205,
								tagType: 2,
								tagParams:
									'{"userNum":2645,"labelStyle":"{\\"icon\\":\\"https://qiniu-image.qtshe.com/gateway/hot.png\\",\\"color\\":\\"#FA5555\\",\\"borderColor\\":\\"#FEEEEE\\",\\"background\\":\\"#FEEEEE\\"}","ranking":12,"schoolName":"茂名职业技术学院","schoolCode":"13712"}',
								icon: 'https://qiniu-image.qtshe.com/1615277014125_55.png',
								jumpKey: 'CIRCLE_RECOMMEND_JOBS',
								param:
									'[{"key": "pageType","name": "页面类型2校友 3商圈","type": "String","value":2},{"key": "circleCode","name": "业务id","type": "String","value":"13712"}]',
								backgroundColor: '#FEEEEE'
							}
						]
					},
					listStyle: 1,
					ptpModParam: {
						algorithmStrategyId: '1-170',
						dataSource: 1
					}
				},
				{
					addressDetail: '不限工作地点',
					partJobId: 1188278,
					title: '需电脑/免费派单赚钱/免费学剪辑>20岁',
					titleSimple: '需电脑/免费派单赚钱/免费学剪辑>20岁',
					salary: '888元/其他',
					clearingForm: {
						key: '0',
						value: '其他'
					},
					welfare: '',
					companyName: '河南如嘉网络科技有限公司',
					logo: 'https://qiniu-image.qtshe.com/company_logo_default.png',
					dataSource: 1,
					jobLineType: 1,
					category: 1,
					entryCount: 126,
					companyType: {
						key: '1',
						value: '企业'
					},
					brandName: '如嘉',
					companyLogo: '',
					parentClassId: 10139,
					classId: 10473,
					c1: 118000000,
					c2: 118110000,
					c3: 118110101,
					algorithmStrategyId: '1-170',
					labelList: {
						serviceLabels: [
							{
								labelId: 61,
								labelName: '企业认证',
								labelStyle: '{"id":10,"icon":"","color":"#72AAFA","borderColor":"#72AAFA","background":"#FFFFFF"}'
							}
						],
						descLabels: [
							{
								labelId: 19,
								labelName: '最新发布',
								labelStyle: '{"id":6,"icon":"","color":"#FA5555","borderColor":"#FEEEEE","background":"#FEEEEE"}'
							},
							{
								labelId: 66,
								labelName: '免费培训',
								labelStyle: '{"id":2,"icon":"https://qiniu-image.qtshe.com/newLabel/icon5.png","color":"#703E0F","borderColor":"#FEDEA9","background":"#FEDEA9"}'
							}
						]
					},
					listStyle: 1,
					ptpModParam: {
						algorithmStrategyId: '1-170',
						dataSource: 1
					}
				},
				{
					addressDetail: '沃尔玛(文化广场店)',
					distance: '1.82km',
					partJobId: 1136673,
					title: '沃尔玛招收银员',
					titleSimple: '沃尔玛招收银员',
					salary: '14元/小时',
					clearingForm: {
						key: '3',
						value: '月结'
					},
					welfare: '',
					companyName: '沃尔玛（中国）投资有限公司',
					logo: 'https://qiniu-image.qtshe.com/1574393395171_805.png',
					dataSource: 1,
					jobLineType: 2,
					category: 1,
					entryCount: 88,
					companyType: {
						key: '1',
						value: '企业'
					},
					brandName: '沃尔玛',
					companyLogo: 'https://qiniu-image.qtshe.com/1574393395171_805.png',
					parentClassId: 10135,
					classId: 10231,
					c1: 101000000,
					c2: 101101000,
					c3: 0,
					algorithmStrategyId: '1-170',
					labelList: {
						serviceLabels: [
							{
								labelId: 61,
								labelName: '企业认证',
								labelStyle: '{"id":10,"icon":"","color":"#72AAFA","borderColor":"#72AAFA","background":"#FFFFFF"}'
							}
						],
						descLabels: [
							{
								labelId: 67,
								labelName: '工作证优先',
								labelStyle:
									'{"id":12,"icon":"https://qiniu-image.qtshe.com/newLabel/20210511-icon8.png","color":"#1677FF","borderColor":"#E7F0FF","background":"#E7F0FF"}'
							},
							{
								labelId: 31,
								labelName: '时薪',
								labelStyle: '{"id":6,"icon":"","color":"#FA5555","borderColor":"#FEEEEE","background":"#FEEEEE"}'
							}
						]
					},
					labelRecommend: [
						{
							townId: 205,
							tagType: 2,
							tagParams:
								'{"userNum":2813,"labelStyle":"{\\"icon\\":\\"https://qiniu-image.qtshe.com/gateway/hot.png\\",\\"color\\":\\"#FA5555\\",\\"borderColor\\":\\"#FEEEEE\\",\\"background\\":\\"#FEEEEE\\"}","ranking":6,"schoolName":"广东石油化工学院","schoolCode":"11656"}'
						}
					],
					labelRecommendNewList: {
						subwayLabels: [],
						rankingLabels: [
							{
								townId: 205,
								tagType: 2,
								tagParams:
									'{"userNum":2813,"labelStyle":"{\\"icon\\":\\"https://qiniu-image.qtshe.com/gateway/hot.png\\",\\"color\\":\\"#FA5555\\",\\"borderColor\\":\\"#FEEEEE\\",\\"background\\":\\"#FEEEEE\\"}","ranking":6,"schoolName":"广东石油化工学院","schoolCode":"11656"}',
								icon: 'https://qiniu-image.qtshe.com/1615277014125_55.png',
								jumpKey: 'CIRCLE_RECOMMEND_JOBS',
								param:
									'[{"key": "pageType","name": "页面类型2校友 3商圈","type": "String","value":2},{"key": "circleCode","name": "业务id","type": "String","value":"11656"}]',
								backgroundColor: '#FEEEEE'
							}
						]
					},
					listStyle: 1,
					ptpModParam: {
						algorithmStrategyId: '1-170',
						dataSource: 1
					}
				},
				{
					addressDetail: '不限工作地点',
					partJobId: 1176059,
					title: '日结线上聊天员限女生',
					titleSimple: '日结线上聊天员限女生',
					salary: '300元/天',
					clearingForm: {
						key: '1',
						value: '日结'
					},
					welfare: '有提成,免费培训,任务奖',
					companyName: '临邑县八九互娱文化传媒有限公司',
					logo: 'https://qiniu-image.qtshe.com/company_logo_default.png',
					dataSource: 1,
					jobLineType: 1,
					category: 1,
					entryCount: 13381,
					companyType: {
						key: '1',
						value: '企业'
					},
					brandName: '八九互娱',
					companyLogo: '',
					parentClassId: 10139,
					classId: 10351,
					c1: 120000000,
					c2: 120102000,
					c3: 0,
					algorithmStrategyId: '1-170',
					jobPicture: [
						{
							picture: 'https://qiniu-image.qtshe.com/1607681530534_465.png',
							pictureType: 0
						}
					],
					labelList: {
						serviceLabels: [
							{
								labelId: 61,
								labelName: '企业认证',
								labelStyle: '{"id":10,"icon":"","color":"#72AAFA","borderColor":"#72AAFA","background":"#FFFFFF"}'
							}
						],
						descLabels: [
							{
								labelId: 19,
								labelName: '最新发布',
								labelStyle: '{"id":6,"icon":"","color":"#FA5555","borderColor":"#FEEEEE","background":"#FEEEEE"}'
							},
							{
								labelId: 9,
								labelName: '有提成',
								labelStyle: '{"id":6,"icon":"","color":"#FA5555","borderColor":"#FEEEEE","background":"#FEEEEE"}'
							},
							{
								labelId: 17,
								labelName: '日薪300元+',
								labelStyle: '{"id":8,"icon":"https://qiniu-image.qtshe.com/newLabel/icon2.png","color":"#FA5555","borderColor":"#FEEEEE","background":"#FEEEEE"}'
							},
							{
								labelId: 32,
								labelName: '限女生',
								labelStyle: '{"id":7,"icon":"","color":"#838D99","borderColor":"#DFE3E9","background":"#FFFFFF"}'
							}
						]
					},
					listStyle: 2,
					jobIntroduction: [
						{
							title: '岗位简介',
							introductionDesc: '无颜值要求，打字聊天赚收益，工作简单，培训流程完善'
						}
					],
					newJobIntroduction: '手机聊天赚收益，还有额外礼物提成，随时随地赚零花',
					ptpModParam: {
						algorithmStrategyId: '1-170',
						dataSource: 1
					}
				},
				{
					addressDetail: '沃尔玛(茂名文化广场店)',
					distance: '2.56km',
					partJobId: 545688,
					title: '沃尔玛诚招店员(茂名文化广场店)',
					titleSimple: '诚店员',
					salary: '10元/小时',
					clearingForm: {
						key: '3',
						value: '月结'
					},
					welfare: '',
					companyName: '沃尔玛（中国）投资有限公司',
					logo: 'https://qiniu-image.qtshe.com/1574393395171_805.png',
					dataSource: 1,
					jobLineType: 2,
					category: 1,
					entryCount: 618,
					companyType: {
						key: '1',
						value: '企业'
					},
					brandName: '沃尔玛',
					companyLogo: 'https://qiniu-image.qtshe.com/1574393395171_805.png',
					parentClassId: 10136,
					classId: 10156,
					c1: 103000000,
					c2: 103101000,
					c3: 0,
					algorithmStrategyId: '1-170',
					jobPicture: [
						{
							picture: 'https://qiniu-image.qtshe.com/1597839739608_254.jpg',
							pictureType: 0
						}
					],
					labelList: {
						serviceLabels: [
							{
								labelId: 61,
								labelName: '企业认证',
								labelStyle: '{"id":10,"icon":"","color":"#72AAFA","borderColor":"#72AAFA","background":"#FFFFFF"}'
							}
						],
						descLabels: [
							{
								labelId: 5,
								labelName: '名企认证',
								labelStyle: '{"id":2,"icon":"https://qiniu-image.qtshe.com/newLabel/icon5.png","color":"#703E0F","borderColor":"#FEDEA9","background":"#FEDEA9"}'
							},
							{
								labelId: 22,
								labelName: '环境好',
								labelStyle: '{"id":6,"icon":"","color":"#FA5555","borderColor":"#FEEEEE","background":"#FEEEEE"}'
							},
							{
								labelId: 31,
								labelName: '时薪',
								labelStyle: '{"id":6,"icon":"","color":"#FA5555","borderColor":"#FEEEEE","background":"#FEEEEE"}'
							}
						]
					},
					labelRecommend: [
						{
							townId: 205,
							tagType: 2,
							tagParams:
								'{"userNum":2645,"labelStyle":"{\\"icon\\":\\"https://qiniu-image.qtshe.com/gateway/hot.png\\",\\"color\\":\\"#FA5555\\",\\"borderColor\\":\\"#FEEEEE\\",\\"background\\":\\"#FEEEEE\\"}","ranking":5,"schoolName":"茂名职业技术学院","schoolCode":"13712"}'
						}
					],
					labelRecommendNewList: {
						subwayLabels: [],
						rankingLabels: [
							{
								townId: 205,
								tagType: 2,
								tagParams:
									'{"userNum":2645,"labelStyle":"{\\"icon\\":\\"https://qiniu-image.qtshe.com/gateway/hot.png\\",\\"color\\":\\"#FA5555\\",\\"borderColor\\":\\"#FEEEEE\\",\\"background\\":\\"#FEEEEE\\"}","ranking":5,"schoolName":"茂名职业技术学院","schoolCode":"13712"}',
								icon: 'https://qiniu-image.qtshe.com/1615277014125_55.png',
								jumpKey: 'CIRCLE_RECOMMEND_JOBS',
								param:
									'[{"key": "pageType","name": "页面类型2校友 3商圈","type": "String","value":2},{"key": "circleCode","name": "业务id","type": "String","value":"13712"}]',
								backgroundColor: '#FEEEEE'
							}
						]
					},
					listStyle: 1,
					ptpModParam: {
						algorithmStrategyId: '1-170',
						dataSource: 1
					}
				},
				{
					addressDetail: '不限工作地点',
					partJobId: 1174252,
					title: '招影视剪辑特效/视频学徒 在家兼职',
					titleSimple: '招影视剪辑特效/视频学徒 在家兼职',
					salary: '600元/其他',
					clearingForm: {
						key: '0',
						value: '其他'
					},
					welfare: '',
					companyName: '成都轻备教育科技有限公司',
					logo: 'https://qiniu-image.qtshe.com/1622695194157_490.png',
					dataSource: 1,
					jobLineType: 1,
					category: 1,
					entryCount: 3524,
					companyType: {
						key: '1',
						value: '企业'
					},
					brandName: '轻备教育',
					companyLogo: 'https://qiniu-image.qtshe.com/1622695194157_490.png',
					parentClassId: 10139,
					classId: 10473,
					c1: 118000000,
					c2: 118110000,
					c3: 118110101,
					algorithmStrategyId: '1-170',
					labelList: {
						serviceLabels: [
							{
								labelId: 61,
								labelName: '企业认证',
								labelStyle: '{"id":10,"icon":"","color":"#72AAFA","borderColor":"#72AAFA","background":"#FFFFFF"}'
							}
						],
						descLabels: [
							{
								labelId: 19,
								labelName: '最新发布',
								labelStyle: '{"id":6,"icon":"","color":"#FA5555","borderColor":"#FEEEEE","background":"#FEEEEE"}'
							},
							{
								labelId: 66,
								labelName: '免费培训',
								labelStyle: '{"id":2,"icon":"https://qiniu-image.qtshe.com/newLabel/icon5.png","color":"#703E0F","borderColor":"#FEDEA9","background":"#FEDEA9"}'
							}
						]
					},
					labelRecommendNewList: {
						subwayLabels: [],
						rankingLabels: [
							{
								townId: 0,
								tagType: 4,
								tagParams: '{"exposure_num":1087959,"label_name":"足不出户赚零花","job_rnk":14}',
								icon: 'https://qiniu-image.qtshe.com/1615276852550_664.png',
								jumpKey: 'WORK_RANK',
								param: '[{"key":"labelId","name":"标签Id","type":"String","value":10200},{"key":"labelName","name":"标签名","type":"String","value":"线上兼职"}]',
								backgroundColor: '#FFF2E5'
							},
							{
								townId: 0,
								tagType: 4,
								tagParams: '{"exposure_num":1087959,"label_name":"学生兼职","job_rnk":19}',
								icon: 'https://qiniu-image.qtshe.com/1615276852550_664.png',
								jumpKey: 'WORK_RANK',
								param: '[{"key":"labelId","name":"标签Id","type":"String","value":10204},{"key":"labelName","name":"标签名","type":"String","value":"学生兼职"}]',
								backgroundColor: '#FFF2E5'
							}
						]
					},
					listStyle: 1,
					ptpModParam: {
						algorithmStrategyId: '1-170',
						dataSource: 1
					}
				},
				{
					addressDetail: '不限工作地点',
					partJobId: 1186281,
					title: '在家刷抖音短视频赚钱',
					titleSimple: '在家刷抖音短视频赚钱',
					salary: '300元/天',
					clearingForm: {
						key: '1',
						value: '日结'
					},
					welfare: '有提成,奖金奖励',
					companyName: '吉林省亿鑫合商贸有限公司',
					logo: 'https://qiniu-image.qtshe.com/company_logo_default.png',
					dataSource: 1,
					jobLineType: 1,
					category: 1,
					entryCount: 850,
					companyType: {
						key: '1',
						value: '企业'
					},
					brandName: '亿鑫合',
					companyLogo: '',
					parentClassId: 10139,
					classId: 10473,
					c1: 117000000,
					c2: 117103000,
					c3: 117103102,
					algorithmStrategyId: '1-170',
					labelList: {
						serviceLabels: [
							{
								labelId: 61,
								labelName: '企业认证',
								labelStyle: '{"id":10,"icon":"","color":"#72AAFA","borderColor":"#72AAFA","background":"#FFFFFF"}'
							}
						],
						descLabels: [
							{
								labelId: 19,
								labelName: '最新发布',
								labelStyle: '{"id":6,"icon":"","color":"#FA5555","borderColor":"#FEEEEE","background":"#FEEEEE"}'
							},
							{
								labelId: 9,
								labelName: '有提成',
								labelStyle: '{"id":6,"icon":"","color":"#FA5555","borderColor":"#FEEEEE","background":"#FEEEEE"}'
							},
							{
								labelId: 17,
								labelName: '日薪300元+',
								labelStyle: '{"id":8,"icon":"https://qiniu-image.qtshe.com/newLabel/icon2.png","color":"#FA5555","borderColor":"#FEEEEE","background":"#FEEEEE"}'
							}
						]
					},
					listStyle: 1,
					ptpModParam: {
						algorithmStrategyId: '1-170',
						dataSource: 1
					}
				},
				{
					addressDetail: '不限工作地点',
					partJobId: 1113649,
					title: '在家学PS修图 宅家即可赚钱/需电脑',
					titleSimple: '在家学PS修图 宅家即可赚钱/需电脑',
					salary: '288元/其他',
					clearingForm: {
						key: '0',
						value: '其他'
					},
					welfare: '软件安装包,软件素材包,兼职机会,实习机会,进阶课折扣券',
					companyName: '泉州市晟睿教育科技有限公司',
					logo: 'https://qiniu-image.qtshe.com/company_logo_default.png',
					dataSource: 1,
					jobLineType: 1,
					category: 1,
					entryCount: 26202,
					companyType: {
						key: '1',
						value: '企业'
					},
					brandName: '晟睿教育',
					companyLogo: '',
					parentClassId: 10139,
					classId: 10465,
					c1: 118000000,
					c2: 118102000,
					c3: 118102101,
					algorithmStrategyId: '1-170',
					jobPicture: [
						{
							picture: 'https://qiniu-image.qtshe.com/1636457238433_736.jpg',
							pictureType: 0
						}
					],
					labelList: {
						serviceLabels: [
							{
								labelId: 61,
								labelName: '企业认证',
								labelStyle: '{"id":10,"icon":"","color":"#72AAFA","borderColor":"#72AAFA","background":"#FFFFFF"}'
							}
						],
						descLabels: [
							{
								labelId: 9,
								labelName: '有提成',
								labelStyle: '{"id":6,"icon":"","color":"#FA5555","borderColor":"#FEEEEE","background":"#FEEEEE"}'
							},
							{
								labelId: 66,
								labelName: '免费培训',
								labelStyle: '{"id":2,"icon":"https://qiniu-image.qtshe.com/newLabel/icon5.png","color":"#703E0F","borderColor":"#FEDEA9","background":"#FEDEA9"}'
							}
						]
					},
					labelRecommendNewList: {
						subwayLabels: [],
						rankingLabels: [
							{
								townId: 0,
								tagType: 4,
								tagParams: '{"exposure_num":653022,"label_name":"零基础技能变现","job_rnk":27}',
								icon: 'https://qiniu-image.qtshe.com/1615276852550_664.png',
								jumpKey: 'WORK_RANK',
								param:
									'[{"key":"labelId","name":"标签Id","type":"String","value":10070},{"key":"labelName","name":"标签名","type":"String","value":"在线课程"},{"key":"jumpUserType","name":"用户类型","type":"String","value":"1"}]',
								backgroundColor: '#FFF2E5'
							},
							{
								townId: 0,
								tagType: 4,
								tagParams: '{"exposure_num":653022,"label_name":"设计创作","job_rnk":11}',
								icon: 'https://qiniu-image.qtshe.com/1615276852550_664.png',
								jumpKey: 'WORK_RANK',
								param: '[{"key":"labelId","name":"标签Id","type":"String","value":10117},{"key":"labelName","name":"标签名","type":"String","value":"设计创作"}]',
								backgroundColor: '#FFF2E5'
							}
						]
					},
					listStyle: 3,
					jobIntroduction: [
						{
							title: '你将获得',
							introductionDesc: '礼包限时免费领取；掌握画图基本技巧'
						},
						{
							title: '就业机会',
							introductionDesc: '成为原创设计师，时间自由，灵活就业'
						}
					],
					newJobIntroduction: '互联网行业专业设计师，高薪行业，发展空间大',
					ptpModParam: {
						algorithmStrategyId: '1-170',
						dataSource: 1
					}
				},
				{
					addressDetail: '麦当劳(明湖店)',
					distance: '806米',
					partJobId: 1163741,
					title: '诚招餐厅服务员',
					titleSimple: '诚招餐厅服务员',
					salary: '10元/小时',
					clearingForm: {
						key: '3',
						value: '月结'
					},
					welfare: '',
					companyName: '深圳金拱门食品有限公司',
					logo: 'https://qiniu-image.qtshe.com/1604585038284_338.png',
					dataSource: 1,
					jobLineType: 2,
					category: 1,
					entryCount: 31,
					companyType: {
						key: '1',
						value: '企业'
					},
					brandName: '金拱门',
					companyLogo: 'https://qiniu-image.qtshe.com/1604585038284_338.png',
					parentClassId: 10135,
					classId: 10153,
					c1: 101000000,
					c2: 101103000,
					c3: 0,
					algorithmStrategyId: '1-170',
					jobPicture: [
						{
							picture: 'https://qiniu-image.qtshe.com/1597839675316_644.jpg',
							pictureType: 0
						}
					],
					labelList: {
						serviceLabels: [
							{
								labelId: 61,
								labelName: '企业认证',
								labelStyle: '{"id":10,"icon":"","color":"#72AAFA","borderColor":"#72AAFA","background":"#FFFFFF"}'
							}
						],
						descLabels: [
							{
								labelId: 19,
								labelName: '最新发布',
								labelStyle: '{"id":6,"icon":"","color":"#FA5555","borderColor":"#FEEEEE","background":"#FEEEEE"}'
							},
							{
								labelId: 67,
								labelName: '工作证优先',
								labelStyle:
									'{"id":12,"icon":"https://qiniu-image.qtshe.com/newLabel/20210511-icon8.png","color":"#1677FF","borderColor":"#E7F0FF","background":"#E7F0FF"}'
							},
							{
								labelId: 31,
								labelName: '时薪',
								labelStyle: '{"id":6,"icon":"","color":"#FA5555","borderColor":"#FEEEEE","background":"#FEEEEE"}'
							}
						]
					},
					labelRecommend: [
						{
							townId: 205,
							tagType: 2,
							tagParams:
								'{"userNum":337,"labelStyle":"{\\"icon\\":\\"https://qiniu-image.qtshe.com/gateway/hot.png\\",\\"color\\":\\"#FA5555\\",\\"borderColor\\":\\"#FEEEEE\\",\\"background\\":\\"#FEEEEE\\"}","ranking":2,"schoolName":"广东茂名幼儿师范专科学校","schoolCode":"14587"}'
						}
					],
					labelRecommendNewList: {
						subwayLabels: [],
						rankingLabels: [
							{
								townId: 205,
								tagType: 2,
								tagParams:
									'{"userNum":337,"labelStyle":"{\\"icon\\":\\"https://qiniu-image.qtshe.com/gateway/hot.png\\",\\"color\\":\\"#FA5555\\",\\"borderColor\\":\\"#FEEEEE\\",\\"background\\":\\"#FEEEEE\\"}","ranking":2,"schoolName":"广东茂名幼儿师范专科学校","schoolCode":"14587"}',
								icon: 'https://qiniu-image.qtshe.com/1615277014125_55.png',
								jumpKey: 'CIRCLE_RECOMMEND_JOBS',
								param:
									'[{"key": "pageType","name": "页面类型2校友 3商圈","type": "String","value":2},{"key": "circleCode","name": "业务id","type": "String","value":"14587"}]',
								backgroundColor: '#FEEEEE'
							}
						]
					},
					listStyle: 1,
					ptpModParam: {
						algorithmStrategyId: '1-170',
						dataSource: 1
					}
				},
				{
					addressDetail: '不限工作地点',
					partJobId: 1185509,
					title: '需电脑/0基础学PS/接单赚钱',
					titleSimple: '需电脑/0基础学PS/接单赚钱',
					salary: '1000元/其他',
					clearingForm: {
						key: '0',
						value: '其他'
					},
					welfare: '软件安装包,软件素材包,兼职机会,实习机会,进阶课折扣券',
					companyName: '福建熊玖玖网络科技有限公司',
					logo: 'https://qiniu-image.qtshe.com/company_logo_default.png',
					dataSource: 1,
					jobLineType: 1,
					category: 1,
					entryCount: 1356,
					companyType: {
						key: '1',
						value: '企业'
					},
					brandName: '熊玖玖',
					companyLogo: '',
					parentClassId: 10139,
					classId: 10465,
					c1: 118000000,
					c2: 118102000,
					c3: 118102101,
					algorithmStrategyId: '1-170',
					labelList: {
						serviceLabels: [
							{
								labelId: 61,
								labelName: '企业认证',
								labelStyle: '{"id":10,"icon":"","color":"#72AAFA","borderColor":"#72AAFA","background":"#FFFFFF"}'
							}
						],
						descLabels: [
							{
								labelId: 19,
								labelName: '最新发布',
								labelStyle: '{"id":6,"icon":"","color":"#FA5555","borderColor":"#FEEEEE","background":"#FEEEEE"}'
							}
						]
					},
					listStyle: 3,
					jobIntroduction: [
						{
							title: '你将获得',
							introductionDesc: '熟练使用画图软件；金牌讲师免费指导'
						},
						{
							title: '就业机会',
							introductionDesc: '出版社专业插画师，工作氛围有趣，发展前景好'
						}
					],
					newJobIntroduction: '专业图库网站兼职接单，内容简单，时间自由',
					ptpModParam: {
						algorithmStrategyId: '1-170',
						dataSource: 1
					}
				},
				{
					addressDetail: '茂名市',
					distance: '735米',
					partJobId: 648132,
					title: '家电维修店招派单员',
					titleSimple: '家电维修店招派单员',
					salary: '80元/天',
					clearingForm: {
						key: '1',
						value: '日结'
					},
					welfare: '',
					companyName: '深圳市龙岗区易诚家电维修店',
					logo: 'https://qiniu-image.qtshe.com/company_logo_default.png',
					dataSource: 1,
					jobLineType: 2,
					category: 1,
					entryCount: 536,
					companyType: {
						key: '1',
						value: '企业'
					},
					brandName: '易诚家电',
					companyLogo: '',
					parentClassId: 10133,
					classId: 10144,
					c1: 109000000,
					c2: 109103000,
					c3: 0,
					algorithmStrategyId: '1-170',
					jobPicture: [
						{
							picture: 'https://qiniu-image.qtshe.com/1605596833568_616.jpg',
							pictureType: 0
						}
					],
					labelList: {
						serviceLabels: [
							{
								labelId: 61,
								labelName: '企业认证',
								labelStyle: '{"id":10,"icon":"","color":"#72AAFA","borderColor":"#72AAFA","background":"#FFFFFF"}'
							}
						],
						descLabels: [
							{
								labelId: 20,
								labelName: '简单易做',
								labelStyle: '{"id":6,"icon":"","color":"#FA5555","borderColor":"#FEEEEE","background":"#FEEEEE"}'
							}
						]
					},
					labelRecommend: [
						{
							townId: 205,
							tagType: 2,
							tagParams:
								'{"userNum":337,"labelStyle":"{\\"icon\\":\\"https://qiniu-image.qtshe.com/gateway/hot.png\\",\\"color\\":\\"#FA5555\\",\\"borderColor\\":\\"#FEEEEE\\",\\"background\\":\\"#FEEEEE\\"}","ranking":5,"schoolName":"广东茂名幼儿师范专科学校","schoolCode":"14587"}'
						}
					],
					labelRecommendNewList: {
						subwayLabels: [],
						rankingLabels: [
							{
								townId: 205,
								tagType: 2,
								tagParams:
									'{"userNum":337,"labelStyle":"{\\"icon\\":\\"https://qiniu-image.qtshe.com/gateway/hot.png\\",\\"color\\":\\"#FA5555\\",\\"borderColor\\":\\"#FEEEEE\\",\\"background\\":\\"#FEEEEE\\"}","ranking":5,"schoolName":"广东茂名幼儿师范专科学校","schoolCode":"14587"}',
								icon: 'https://qiniu-image.qtshe.com/1615277014125_55.png',
								jumpKey: 'CIRCLE_RECOMMEND_JOBS',
								param:
									'[{"key": "pageType","name": "页面类型2校友 3商圈","type": "String","value":2},{"key": "circleCode","name": "业务id","type": "String","value":"14587"}]',
								backgroundColor: '#FEEEEE'
							}
						]
					},
					listStyle: 1,
					ptpModParam: {
						algorithmStrategyId: '1-170',
						dataSource: 1
					}
				},
				{
					addressDetail: '不限工作地点',
					partJobId: 1176270,
					title: '0元手机试听-学习用声音赚钱',
					titleSimple: '0元手机试听-学习用声音赚钱',
					salary: '0元/其他',
					clearingForm: {
						key: '0',
						value: '其他'
					},
					welfare: '',
					companyName: '江西好学微客教育科技有限公司',
					logo: 'https://qiniu-image.qtshe.com/1612321091003_253.png',
					dataSource: 1,
					jobLineType: 1,
					category: 1,
					entryCount: 9634,
					companyType: {
						key: '1',
						value: '企业'
					},
					brandName: '好学微客教育',
					companyLogo: 'https://qiniu-image.qtshe.com/1612321091003_253.png',
					parentClassId: 10139,
					classId: 10471,
					c1: 118000000,
					c2: 118103000,
					c3: 118103101,
					algorithmStrategyId: '1-170',
					labelList: {
						serviceLabels: [
							{
								labelId: 61,
								labelName: '企业认证',
								labelStyle: '{"id":10,"icon":"","color":"#72AAFA","borderColor":"#72AAFA","background":"#FFFFFF"}'
							}
						],
						descLabels: [
							{
								labelId: 19,
								labelName: '最新发布',
								labelStyle: '{"id":6,"icon":"","color":"#FA5555","borderColor":"#FEEEEE","background":"#FEEEEE"}'
							}
						]
					},
					labelRecommendNewList: {
						subwayLabels: [],
						rankingLabels: [
							{
								townId: 0,
								tagType: 4,
								tagParams: '{"exposure_num":1190646,"label_name":"零基础技能变现","job_rnk":13}',
								icon: 'https://qiniu-image.qtshe.com/1615276852550_664.png',
								jumpKey: 'WORK_RANK',
								param:
									'[{"key":"labelId","name":"标签Id","type":"String","value":10070},{"key":"labelName","name":"标签名","type":"String","value":"在线课程"},{"key":"jumpUserType","name":"用户类型","type":"String","value":"1"}]',
								backgroundColor: '#FFF2E5'
							},
							{
								townId: 0,
								tagType: 4,
								tagParams: '{"exposure_num":1190646,"label_name":"主持人","job_rnk":2}',
								icon: 'https://qiniu-image.qtshe.com/1615276852550_664.png',
								jumpKey: 'WORK_RANK',
								param:
									'[{"key":"labelId","name":"标签Id","type":"String","value":10008},{"key":"labelName","name":"标签名","type":"String","value":"主持人"},{"key":"jumpUserType","name":"用户类型","type":"String","value":"1"}]',
								backgroundColor: '#FFF2E5'
							}
						]
					},
					listStyle: 3,
					jobIntroduction: [
						{
							title: '你将获得',
							introductionDesc: '金牌讲师免费指导：尽早实现技能变现'
						},
						{
							title: '就业机会',
							introductionDesc: '工作室兼职派单机会，副业增收的好机会'
						}
					],
					newJobIntroduction: '成立个人工作室，时间自由，灵活就业',
					ptpModParam: {
						algorithmStrategyId: '1-170',
						dataSource: 1
					}
				},
				{
					addressDetail: '上宾体育健身公园-足球场',
					distance: '2.13km',
					partJobId: 724795,
					title: '招辅导老师',
					titleSimple: '辅导老师',
					salary: '25元/小时',
					clearingForm: {
						key: '3',
						value: '月结'
					},
					welfare: '',
					companyName: '陈瑶瑶 · 招聘者',
					logo: 'https://qiniu-image.qtshe.com/company_person_logo_default.png',
					dataSource: 1,
					jobLineType: 2,
					category: 1,
					entryCount: 476,
					companyType: {
						key: '2',
						value: '个人'
					},
					companyLogo: '',
					parentClassId: 10134,
					classId: 10195,
					c1: 104000000,
					c2: 104103000,
					c3: 0,
					algorithmStrategyId: '1-170',
					jobPicture: [
						{
							picture: 'https://qiniu-image.qtshe.com/1600773699839_489.jpg',
							pictureType: 0
						}
					],
					labelList: {
						serviceLabels: [
							{
								labelId: 60,
								labelName: '实名认证',
								labelStyle: '{"id":11,"icon":"","color":"#00CF8A","borderColor":"#00CF8A","background":"#FFFFFF"}'
							}
						],
						descLabels: [
							{
								labelId: 22,
								labelName: '环境好',
								labelStyle: '{"id":6,"icon":"","color":"#FA5555","borderColor":"#FEEEEE","background":"#FEEEEE"}'
							},
							{
								labelId: 31,
								labelName: '时薪',
								labelStyle: '{"id":6,"icon":"","color":"#FA5555","borderColor":"#FEEEEE","background":"#FEEEEE"}'
							}
						]
					},
					labelRecommend: [
						{
							townId: 205,
							tagType: 2,
							tagParams:
								'{"userNum":763,"labelStyle":"{\\"icon\\":\\"https://qiniu-image.qtshe.com/gateway/hot.png\\",\\"color\\":\\"#FA5555\\",\\"borderColor\\":\\"#FEEEEE\\",\\"background\\":\\"#FEEEEE\\"}","ranking":6,"schoolName":"广东茂名健康职业学院","schoolCode":"14556"}'
						}
					],
					labelRecommendNewList: {
						subwayLabels: [],
						rankingLabels: [
							{
								townId: 205,
								tagType: 2,
								tagParams:
									'{"userNum":763,"labelStyle":"{\\"icon\\":\\"https://qiniu-image.qtshe.com/gateway/hot.png\\",\\"color\\":\\"#FA5555\\",\\"borderColor\\":\\"#FEEEEE\\",\\"background\\":\\"#FEEEEE\\"}","ranking":6,"schoolName":"广东茂名健康职业学院","schoolCode":"14556"}',
								icon: 'https://qiniu-image.qtshe.com/1615277014125_55.png',
								jumpKey: 'CIRCLE_RECOMMEND_JOBS',
								param:
									'[{"key": "pageType","name": "页面类型2校友 3商圈","type": "String","value":2},{"key": "circleCode","name": "业务id","type": "String","value":"14556"}]',
								backgroundColor: '#FEEEEE'
							}
						]
					},
					listStyle: 1,
					ptpModParam: {
						algorithmStrategyId: '1-170',
						dataSource: 1
					}
				},
				{
					addressDetail: '不限工作地点',
					partJobId: 742032,
					title: '聊天兼职',
					titleSimple: '聊天兼职',
					salary: '300元/天',
					clearingForm: {
						key: '1',
						value: '日结'
					},
					welfare: '有提成,免费培训,任务奖',
					companyName: '江西淘盟电子商务有限公司',
					logo: 'https://qiniu-image.qtshe.com/company_logo_default.png',
					dataSource: 1,
					jobLineType: 1,
					category: 1,
					entryCount: 57049,
					companyType: {
						key: '1',
						value: '企业'
					},
					brandName: '淘盟娱乐',
					companyLogo: '',
					parentClassId: 10139,
					classId: 10351,
					c1: 120000000,
					c2: 120102000,
					c3: 0,
					algorithmStrategyId: '1-170',
					jobPicture: [
						{
							picture: 'https://qiniu-image.qtshe.com/1607681530534_854.png',
							pictureType: 0
						}
					],
					labelList: {
						serviceLabels: [
							{
								labelId: 61,
								labelName: '企业认证',
								labelStyle: '{"id":10,"icon":"","color":"#72AAFA","borderColor":"#72AAFA","background":"#FFFFFF"}'
							}
						],
						descLabels: [
							{
								labelId: 9,
								labelName: '有提成',
								labelStyle: '{"id":6,"icon":"","color":"#FA5555","borderColor":"#FEEEEE","background":"#FEEEEE"}'
							},
							{
								labelId: 66,
								labelName: '免费培训',
								labelStyle: '{"id":2,"icon":"https://qiniu-image.qtshe.com/newLabel/icon5.png","color":"#703E0F","borderColor":"#FEDEA9","background":"#FEDEA9"}'
							},
							{
								labelId: 17,
								labelName: '日薪300元+',
								labelStyle: '{"id":8,"icon":"https://qiniu-image.qtshe.com/newLabel/icon2.png","color":"#FA5555","borderColor":"#FEEEEE","background":"#FEEEEE"}'
							},
							{
								labelId: 32,
								labelName: '限女生',
								labelStyle: '{"id":7,"icon":"","color":"#838D99","borderColor":"#DFE3E9","background":"#FFFFFF"}'
							}
						],
						commentLabels: [
							{
								labelId: 43,
								labelName: '手机聊天赚收益，还有额外礼物提成，随时随地赚零花',
								labelStyle: '{"id":1,"icon":"https://qiniu-image.qtshe.com/newLabel/icon6.png","color":"#703E0F","borderColor":"#FEDEA9","background":"#FEDEA9"}'
							}
						]
					},
					listStyle: 2,
					jobIntroduction: [
						{
							title: '岗位简介',
							introductionDesc: '无特殊才艺技能要求，喜欢聊天交友即可，性格开朗更佳'
						}
					],
					newJobIntroduction: '无颜值要求，打字聊天赚收益，工作简单，培训流程完善',
					ptpModParam: {
						algorithmStrategyId: '1-170',
						dataSource: 1
					}
				},
				{
					addressDetail: '麦当劳(高铁站店)',
					distance: '2.47km',
					partJobId: 1130744,
					title: '诚招餐厅兼职服务生',
					titleSimple: '诚招餐厅兼职服务生',
					salary: '10.1元/小时',
					clearingForm: {
						key: '3',
						value: '月结'
					},
					welfare: '交通补助,转正机会',
					companyName: '深圳金拱门食品有限公司',
					logo: 'https://qiniu-image.qtshe.com/1604585038284_338.png',
					dataSource: 1,
					jobLineType: 2,
					category: 1,
					entryCount: 62,
					companyType: {
						key: '1',
						value: '企业'
					},
					brandName: '金拱门',
					companyLogo: 'https://qiniu-image.qtshe.com/1604585038284_338.png',
					parentClassId: 10135,
					classId: 10153,
					c1: 101000000,
					c2: 101103000,
					c3: 0,
					algorithmStrategyId: '1-170',
					jobPicture: [
						{
							picture: 'https://qiniu-image.qtshe.com/1597839675142_566.jpg',
							pictureType: 0
						}
					],
					labelList: {
						serviceLabels: [
							{
								labelId: 61,
								labelName: '企业认证',
								labelStyle: '{"id":10,"icon":"","color":"#72AAFA","borderColor":"#72AAFA","background":"#FFFFFF"}'
							}
						],
						descLabels: [
							{
								labelId: 67,
								labelName: '工作证优先',
								labelStyle:
									'{"id":12,"icon":"https://qiniu-image.qtshe.com/newLabel/20210511-icon8.png","color":"#1677FF","borderColor":"#E7F0FF","background":"#E7F0FF"}'
							},
							{
								labelId: 31,
								labelName: '时薪',
								labelStyle: '{"id":6,"icon":"","color":"#FA5555","borderColor":"#FEEEEE","background":"#FEEEEE"}'
							}
						]
					},
					labelRecommend: [
						{
							townId: 205,
							tagType: 2,
							tagParams:
								'{"userNum":2645,"labelStyle":"{\\"icon\\":\\"https://qiniu-image.qtshe.com/gateway/hot.png\\",\\"color\\":\\"#FA5555\\",\\"borderColor\\":\\"#FEEEEE\\",\\"background\\":\\"#FEEEEE\\"}","ranking":2,"schoolName":"茂名职业技术学院","schoolCode":"13712"}'
						}
					],
					labelRecommendNewList: {
						subwayLabels: [],
						rankingLabels: [
							{
								townId: 205,
								tagType: 2,
								tagParams:
									'{"userNum":2645,"labelStyle":"{\\"icon\\":\\"https://qiniu-image.qtshe.com/gateway/hot.png\\",\\"color\\":\\"#FA5555\\",\\"borderColor\\":\\"#FEEEEE\\",\\"background\\":\\"#FEEEEE\\"}","ranking":2,"schoolName":"茂名职业技术学院","schoolCode":"13712"}',
								icon: 'https://qiniu-image.qtshe.com/1615277014125_55.png',
								jumpKey: 'CIRCLE_RECOMMEND_JOBS',
								param:
									'[{"key": "pageType","name": "页面类型2校友 3商圈","type": "String","value":2},{"key": "circleCode","name": "业务id","type": "String","value":"13712"}]',
								backgroundColor: '#FEEEEE'
							}
						]
					},
					listStyle: 1,
					ptpModParam: {
						algorithmStrategyId: '1-170',
						dataSource: 1
					}
				},
				{
					addressDetail: '不限工作地点',
					partJobId: 975623,
					title: '0元手机试听/学习用声音赚钱',
					titleSimple: '0元手机试听/学习用声音赚钱',
					salary: '0元/其他',
					clearingForm: {
						key: '0',
						value: '其他'
					},
					welfare: ',0元试听,名师授课,免费试听,自由职业',
					companyName: '江西好学微客教育科技有限公司',
					logo: 'https://qiniu-image.qtshe.com/1612321091003_253.png',
					dataSource: 1,
					jobLineType: 1,
					category: 1,
					entryCount: 56072,
					companyType: {
						key: '1',
						value: '企业'
					},
					brandName: '好学微客教育',
					companyLogo: 'https://qiniu-image.qtshe.com/1612321091003_253.png',
					parentClassId: 10139,
					classId: 10471,
					c1: 118000000,
					c2: 118103000,
					c3: 118103101,
					algorithmStrategyId: '1-170',
					jobPicture: [
						{
							picture: 'https://qiniu-image.qtshe.com/1636530077667_925.png',
							pictureType: 0
						}
					],
					labelList: {
						serviceLabels: [
							{
								labelId: 61,
								labelName: '企业认证',
								labelStyle: '{"id":10,"icon":"","color":"#72AAFA","borderColor":"#72AAFA","background":"#FFFFFF"}'
							}
						]
					},
					listStyle: 3,
					jobIntroduction: [
						{
							title: '你将获得',
							introductionDesc: '专业指导免费指导；轻松get兼职技能'
						},
						{
							title: '就业机会',
							introductionDesc: '成为技能专业培训师，副业收入稳定增长'
						}
					],
					newJobIntroduction: '工作室兼职派单机会，副业增收的好机会',
					ptpModParam: {
						algorithmStrategyId: '1-170',
						dataSource: 1
					}
				},
				{
					addressDetail: '不限工作地点',
					partJobId: 1118122,
					title: '需电脑/免费学剪辑/在家派单赚钱>19岁',
					titleSimple: '需电脑/免费学剪辑/在家派单赚钱>19岁',
					salary: '880元/其他',
					clearingForm: {
						key: '0',
						value: '其他'
					},
					welfare: '',
					companyName: '杭州学德慧教育科技有限公司',
					logo: 'https://qiniu-image.qtshe.com/company_logo_default.png',
					dataSource: 1,
					jobLineType: 1,
					category: 1,
					entryCount: 15029,
					companyType: {
						key: '1',
						value: '企业'
					},
					brandName: '学德慧',
					companyLogo: '',
					parentClassId: 10139,
					classId: 10473,
					c1: 118000000,
					c2: 118110000,
					c3: 118110101,
					algorithmStrategyId: '1-170',
					jobPicture: [
						{
							picture: 'https://qiniu-image.qtshe.com/1636457624503_715.jpg',
							pictureType: 0
						}
					],
					labelList: {
						serviceLabels: [
							{
								labelId: 61,
								labelName: '企业认证',
								labelStyle: '{"id":10,"icon":"","color":"#72AAFA","borderColor":"#72AAFA","background":"#FFFFFF"}'
							}
						],
						descLabels: [
							{
								labelId: 66,
								labelName: '免费培训',
								labelStyle: '{"id":2,"icon":"https://qiniu-image.qtshe.com/newLabel/icon5.png","color":"#703E0F","borderColor":"#FEDEA9","background":"#FEDEA9"}'
							}
						]
					},
					listStyle: 1,
					ptpModParam: {
						algorithmStrategyId: '1-170',
						dataSource: 1
					}
				},
				{
					addressDetail: '不限工作地点',
					partJobId: 1136876,
					title: '手机淘宝开店兼职  满21岁以上',
					titleSimple: '手机淘宝开店兼职  满21岁以上',
					salary: '300元/天',
					clearingForm: {
						key: '3',
						value: '月结'
					},
					welfare: '',
					companyName: '桐乡市梧桐界频网络技术服务部',
					logo: 'https://qiniu-image.qtshe.com/company_logo_default.png',
					dataSource: 1,
					jobLineType: 1,
					category: 1,
					entryCount: 11703,
					companyType: {
						key: '1',
						value: '企业'
					},
					brandName: '梧桐界频',
					companyLogo: '',
					parentClassId: 10139,
					classId: 10473,
					c1: 117000000,
					c2: 117103000,
					c3: 117103102,
					algorithmStrategyId: '1-170',
					labelList: {
						serviceLabels: [
							{
								labelId: 61,
								labelName: '企业认证',
								labelStyle: '{"id":10,"icon":"","color":"#72AAFA","borderColor":"#72AAFA","background":"#FFFFFF"}'
							}
						],
						descLabels: [
							{
								labelId: 9,
								labelName: '有提成',
								labelStyle: '{"id":6,"icon":"","color":"#FA5555","borderColor":"#FEEEEE","background":"#FEEEEE"}'
							},
							{
								labelId: 17,
								labelName: '日薪300元+',
								labelStyle: '{"id":8,"icon":"https://qiniu-image.qtshe.com/newLabel/icon2.png","color":"#FA5555","borderColor":"#FEEEEE","background":"#FEEEEE"}'
							},
							{
								labelId: 32,
								labelName: '限女生',
								labelStyle: '{"id":7,"icon":"","color":"#838D99","borderColor":"#DFE3E9","background":"#FFFFFF"}'
							}
						]
					},
					labelRecommendNewList: {
						subwayLabels: [],
						rankingLabels: [
							{
								townId: 0,
								tagType: 4,
								tagParams: '{"exposure_num":640508,"label_name":"批发代理","job_rnk":9}',
								icon: 'https://qiniu-image.qtshe.com/1615276852550_664.png',
								jumpKey: 'WORK_RANK',
								param: '[{"key":"labelId","name":"标签Id","type":"String","value":10206},{"key":"labelName","name":"标签名","type":"String","value":"批发代理"}]',
								backgroundColor: '#FFF2E5'
							},
							{
								townId: 0,
								tagType: 4,
								tagParams: '{"exposure_num":640508,"label_name":"赚钱小副业","job_rnk":20}',
								icon: 'https://qiniu-image.qtshe.com/1615276852550_664.png',
								jumpKey: 'WORK_RANK',
								param: '[{"key":"labelId","name":"标签Id","type":"String","value":10001},{"key":"labelName","name":"标签名","type":"String","value":""}]',
								backgroundColor: '#FFF2E5'
							}
						]
					},
					listStyle: 1,
					ptpModParam: {
						algorithmStrategyId: '1-170',
						dataSource: 1
					}
				},
				{
					addressDetail: '千艺发型会所',
					distance: '10.57km',
					partJobId: 528498,
					title: '招聘洗头工',
					titleSimple: '洗头工',
					salary: '5元/次',
					clearingForm: {
						key: '3',
						value: '月结'
					},
					welfare: '',
					companyName: '彭先生 · 招聘者',
					logo: 'https://qiniu-image.qtshe.com/company_person_logo_default.png',
					dataSource: 1,
					jobLineType: 2,
					category: 1,
					entryCount: 35,
					companyType: {
						key: '2',
						value: '个人'
					},
					companyLogo: '',
					parentClassId: 10206,
					classId: 10210,
					c1: 106000000,
					c2: 106107000,
					c3: 0,
					algorithmStrategyId: '1-170',
					labelList: {
						serviceLabels: [
							{
								labelId: 60,
								labelName: '实名认证',
								labelStyle: '{"id":11,"icon":"","color":"#00CF8A","borderColor":"#00CF8A","background":"#FFFFFF"}'
							}
						]
					},
					labelRecommend: [
						{
							townId: 205,
							tagType: 2,
							tagParams:
								'{"userNum":269,"labelStyle":"{\\"icon\\":\\"https://qiniu-image.qtshe.com/gateway/hot.png\\",\\"color\\":\\"#FA5555\\",\\"borderColor\\":\\"#FEEEEE\\",\\"background\\":\\"#FEEEEE\\"}","ranking":7,"schoolName":"广东茂名农林科技职业学院","schoolCode":"14638"}'
						}
					],
					labelRecommendNewList: {
						subwayLabels: [],
						rankingLabels: [
							{
								townId: 205,
								tagType: 2,
								tagParams:
									'{"userNum":269,"labelStyle":"{\\"icon\\":\\"https://qiniu-image.qtshe.com/gateway/hot.png\\",\\"color\\":\\"#FA5555\\",\\"borderColor\\":\\"#FEEEEE\\",\\"background\\":\\"#FEEEEE\\"}","ranking":7,"schoolName":"广东茂名农林科技职业学院","schoolCode":"14638"}',
								icon: 'https://qiniu-image.qtshe.com/1615277014125_55.png',
								jumpKey: 'CIRCLE_RECOMMEND_JOBS',
								param:
									'[{"key": "pageType","name": "页面类型2校友 3商圈","type": "String","value":2},{"key": "circleCode","name": "业务id","type": "String","value":"14638"}]',
								backgroundColor: '#FEEEEE'
							}
						]
					},
					listStyle: 1,
					ptpModParam: {
						algorithmStrategyId: '1-170',
						dataSource: 1
					}
				},
				{
					addressDetail: '不限工作地点',
					partJobId: 1183991,
					title: '自媒体发文章赚钱 低收入必听0元试听课程',
					titleSimple: '自媒体发文章赚钱 低收入必听0元试听课程',
					salary: '3980元/其他',
					clearingForm: {
						key: '0',
						value: '其他'
					},
					welfare: '名师授课,免费试听,进阶课折扣券',
					companyName: '黑龙江众源方略教育科技有限公司',
					logo: 'https://qiniu-image.qtshe.com/company_logo_default.png',
					dataSource: 1,
					jobLineType: 1,
					category: 1,
					entryCount: 514,
					companyType: {
						key: '1',
						value: '企业'
					},
					brandName: '众源方略',
					companyLogo: '',
					parentClassId: 10139,
					classId: 10468,
					c1: 118000000,
					c2: 118106000,
					c3: 118106106,
					algorithmStrategyId: '1-170',
					labelList: {
						serviceLabels: [
							{
								labelId: 61,
								labelName: '企业认证',
								labelStyle: '{"id":10,"icon":"","color":"#72AAFA","borderColor":"#72AAFA","background":"#FFFFFF"}'
							}
						],
						descLabels: [
							{
								labelId: 19,
								labelName: '最新发布',
								labelStyle: '{"id":6,"icon":"","color":"#FA5555","borderColor":"#FEEEEE","background":"#FEEEEE"}'
							}
						]
					},
					listStyle: 3,
					jobIntroduction: [
						{
							title: '你将获得',
							introductionDesc: '金牌讲师专业指导；轻松斩获大厂offer'
						},
						{
							title: '就业机会',
							introductionDesc: '成为大厂员工，获得个人发展大平台'
						}
					],
					newJobIntroduction: '利用社交平台实现创收，开始创业第一步~',
					ptpModParam: {
						algorithmStrategyId: '1-170',
						dataSource: 1
					}
				},
				{
					addressDetail: '天桥路118号',
					distance: '2.77km',
					partJobId: 594779,
					title: '车天下招门店汽车美容师',
					titleSimple: '门店汽车美容师',
					salary: '2500元/月',
					clearingForm: {
						key: '3',
						value: '月结'
					},
					welfare: '包吃,包住,有提成',
					companyName: '茂名市茂南区车天下汽车服务中心',
					logo: 'https://qiniu-image.qtshe.com/company_logo_default.png',
					dataSource: 1,
					jobLineType: 2,
					category: 1,
					entryCount: 15,
					companyType: {
						key: '1',
						value: '企业'
					},
					brandName: '车天下',
					companyLogo: '',
					parentClassId: 10207,
					classId: 10217,
					c1: 108000000,
					c2: 108104000,
					c3: 0,
					algorithmStrategyId: '1-170',
					labelList: {
						serviceLabels: [
							{
								labelId: 61,
								labelName: '企业认证',
								labelStyle: '{"id":10,"icon":"","color":"#72AAFA","borderColor":"#72AAFA","background":"#FFFFFF"}'
							}
						],
						descLabels: [
							{
								labelId: 9,
								labelName: '有提成',
								labelStyle: '{"id":6,"icon":"","color":"#FA5555","borderColor":"#FEEEEE","background":"#FEEEEE"}'
							},
							{
								labelId: 7,
								labelName: '包吃',
								labelStyle: '{"id":6,"icon":"","color":"#FA5555","borderColor":"#FEEEEE","background":"#FEEEEE"}'
							},
							{
								labelId: 8,
								labelName: '包住',
								labelStyle: '{"id":6,"icon":"","color":"#FA5555","borderColor":"#FEEEEE","background":"#FEEEEE"}'
							}
						]
					},
					labelRecommend: [
						{
							townId: 205,
							tagType: 2,
							tagParams:
								'{"userNum":337,"labelStyle":"{\\"icon\\":\\"https://qiniu-image.qtshe.com/gateway/hot.png\\",\\"color\\":\\"#FA5555\\",\\"borderColor\\":\\"#FEEEEE\\",\\"background\\":\\"#FEEEEE\\"}","ranking":3,"schoolName":"广东茂名幼儿师范专科学校","schoolCode":"14587"}'
						}
					],
					labelRecommendNewList: {
						subwayLabels: [],
						rankingLabels: [
							{
								townId: 205,
								tagType: 2,
								tagParams:
									'{"userNum":337,"labelStyle":"{\\"icon\\":\\"https://qiniu-image.qtshe.com/gateway/hot.png\\",\\"color\\":\\"#FA5555\\",\\"borderColor\\":\\"#FEEEEE\\",\\"background\\":\\"#FEEEEE\\"}","ranking":3,"schoolName":"广东茂名幼儿师范专科学校","schoolCode":"14587"}',
								icon: 'https://qiniu-image.qtshe.com/1615277014125_55.png',
								jumpKey: 'CIRCLE_RECOMMEND_JOBS',
								param:
									'[{"key": "pageType","name": "页面类型2校友 3商圈","type": "String","value":2},{"key": "circleCode","name": "业务id","type": "String","value":"14587"}]',
								backgroundColor: '#FEEEEE'
							}
						]
					},
					listStyle: 1,
					ptpModParam: {
						algorithmStrategyId: '1-170',
						dataSource: 1
					}
				},
				{
					addressDetail: '不限工作地点',
					partJobId: 1116687,
					title: '在家发视频赚钱  限22岁以上',
					titleSimple: '在家发视频赚钱  限22岁以上',
					salary: '300元/天',
					clearingForm: {
						key: '1',
						value: '日结'
					},
					welfare: '有提成',
					companyName: '宣城禾嘉商贸有限公司',
					logo: 'https://qiniu-image.qtshe.com/company_logo_default.png',
					dataSource: 1,
					jobLineType: 1,
					category: 1,
					entryCount: 27138,
					companyType: {
						key: '1',
						value: '企业'
					},
					brandName: '禾嘉商贸',
					companyLogo: '',
					parentClassId: 10139,
					classId: 10473,
					c1: 117000000,
					c2: 117103000,
					c3: 117103102,
					algorithmStrategyId: '1-170',
					labelList: {
						serviceLabels: [
							{
								labelId: 61,
								labelName: '企业认证',
								labelStyle: '{"id":10,"icon":"","color":"#72AAFA","borderColor":"#72AAFA","background":"#FFFFFF"}'
							}
						],
						descLabels: [
							{
								labelId: 9,
								labelName: '有提成',
								labelStyle: '{"id":6,"icon":"","color":"#FA5555","borderColor":"#FEEEEE","background":"#FEEEEE"}'
							},
							{
								labelId: 17,
								labelName: '日薪300元+',
								labelStyle: '{"id":8,"icon":"https://qiniu-image.qtshe.com/newLabel/icon2.png","color":"#FA5555","borderColor":"#FEEEEE","background":"#FEEEEE"}'
							}
						]
					},
					labelRecommendNewList: {
						subwayLabels: [],
						rankingLabels: [
							{
								townId: 0,
								tagType: 4,
								tagParams: '{"exposure_num":657840,"label_name":"批发代理","job_rnk":8}',
								icon: 'https://qiniu-image.qtshe.com/1615276852550_664.png',
								jumpKey: 'WORK_RANK',
								param: '[{"key":"labelId","name":"标签Id","type":"String","value":10206},{"key":"labelName","name":"标签名","type":"String","value":"批发代理"}]',
								backgroundColor: '#FFF2E5'
							},
							{
								townId: 0,
								tagType: 4,
								tagParams: '{"exposure_num":657840,"label_name":"赚钱小副业","job_rnk":19}',
								icon: 'https://qiniu-image.qtshe.com/1615276852550_664.png',
								jumpKey: 'WORK_RANK',
								param: '[{"key":"labelId","name":"标签Id","type":"String","value":10001},{"key":"labelName","name":"标签名","type":"String","value":""}]',
								backgroundColor: '#FFF2E5'
							}
						]
					},
					listStyle: 1,
					ptpModParam: {
						algorithmStrategyId: '1-170',
						dataSource: 1
					}
				},
				{
					addressDetail: '帝琪晧景新颖商贸中心',
					distance: '1.94km',
					partJobId: 619441,
					title: '招聘高级发型师',
					titleSimple: '高级发型师',
					salary: '300元/次',
					clearingForm: {
						key: '1',
						value: '日结'
					},
					welfare: '',
					companyName: '江先生 · 招聘者',
					logo: 'https://qiniu-image.qtshe.com/company_person_logo_default.png',
					dataSource: 1,
					jobLineType: 2,
					category: 1,
					entryCount: 5,
					companyType: {
						key: '2',
						value: '个人'
					},
					companyLogo: '',
					parentClassId: 10206,
					classId: 10208,
					c1: 106000000,
					c2: 106101000,
					c3: 0,
					algorithmStrategyId: '1-170',
					labelList: {
						serviceLabels: [
							{
								labelId: 60,
								labelName: '实名认证',
								labelStyle: '{"id":11,"icon":"","color":"#00CF8A","borderColor":"#00CF8A","background":"#FFFFFF"}'
							}
						]
					},
					labelRecommend: [
						{
							townId: 205,
							tagType: 2,
							tagParams:
								'{"userNum":763,"labelStyle":"{\\"icon\\":\\"https://qiniu-image.qtshe.com/gateway/hot.png\\",\\"color\\":\\"#FA5555\\",\\"borderColor\\":\\"#FEEEEE\\",\\"background\\":\\"#FEEEEE\\"}","ranking":7,"schoolName":"广东茂名健康职业学院","schoolCode":"14556"}'
						}
					],
					labelRecommendNewList: {
						subwayLabels: [],
						rankingLabels: [
							{
								townId: 205,
								tagType: 2,
								tagParams:
									'{"userNum":763,"labelStyle":"{\\"icon\\":\\"https://qiniu-image.qtshe.com/gateway/hot.png\\",\\"color\\":\\"#FA5555\\",\\"borderColor\\":\\"#FEEEEE\\",\\"background\\":\\"#FEEEEE\\"}","ranking":7,"schoolName":"广东茂名健康职业学院","schoolCode":"14556"}',
								icon: 'https://qiniu-image.qtshe.com/1615277014125_55.png',
								jumpKey: 'CIRCLE_RECOMMEND_JOBS',
								param:
									'[{"key": "pageType","name": "页面类型2校友 3商圈","type": "String","value":2},{"key": "circleCode","name": "业务id","type": "String","value":"14556"}]',
								backgroundColor: '#FEEEEE'
							}
						]
					},
					listStyle: 1,
					ptpModParam: {
						algorithmStrategyId: '1-170',
						dataSource: 1
					}
				},
				{
					addressDetail: '不限工作地点',
					partJobId: 1184018,
					title: '自媒体发文章赚钱 低收入必听0元试听课',
					titleSimple: '自媒体发文章赚钱 低收入必听0元试听课',
					salary: '3980元/其他',
					clearingForm: {
						key: '0',
						value: '其他'
					},
					welfare: '名师授课,免费试听',
					companyName: '黑龙江众源方略教育科技有限公司',
					logo: 'https://qiniu-image.qtshe.com/company_logo_default.png',
					dataSource: 1,
					jobLineType: 1,
					category: 1,
					entryCount: 109,
					companyType: {
						key: '1',
						value: '企业'
					},
					brandName: '众源方略',
					companyLogo: '',
					parentClassId: 10139,
					classId: 10468,
					c1: 118000000,
					c2: 118106000,
					c3: 118106106,
					algorithmStrategyId: '1-170',
					labelList: {
						serviceLabels: [
							{
								labelId: 61,
								labelName: '企业认证',
								labelStyle: '{"id":10,"icon":"","color":"#72AAFA","borderColor":"#72AAFA","background":"#FFFFFF"}'
							}
						],
						descLabels: [
							{
								labelId: 19,
								labelName: '最新发布',
								labelStyle: '{"id":6,"icon":"","color":"#FA5555","borderColor":"#FEEEEE","background":"#FEEEEE"}'
							}
						]
					},
					listStyle: 3,
					jobIntroduction: [
						{
							title: '你将获得',
							introductionDesc: '金牌讲师免费指导；GET电商入门技巧'
						},
						{
							title: '就业机会',
							introductionDesc: '利用社交平台实现创收，开始创业第一步~'
						}
					],
					newJobIntroduction: '利用社交平台实现创收，开始创业第一步~',
					ptpModParam: {
						algorithmStrategyId: '1-170',
						dataSource: 1
					}
				},
				{
					addressDetail: '油城三路219号',
					distance: '2.41km',
					partJobId: 559862,
					title: '招募服务员',
					titleSimple: '服务员',
					salary: '2500元/月',
					clearingForm: {
						key: '4',
						value: '完工结算'
					},
					welfare: '',
					companyName: '曾宽平 · 招聘者',
					logo: 'https://qiniu-image.qtshe.com/company_person_logo_default.png',
					dataSource: 1,
					jobLineType: 2,
					category: 1,
					entryCount: 446,
					companyType: {
						key: '2',
						value: '个人'
					},
					companyLogo: '',
					parentClassId: 10135,
					classId: 10153,
					c1: 101000000,
					c2: 101103000,
					c3: 0,
					algorithmStrategyId: '1-170',
					jobPicture: [
						{
							picture: 'https://qiniu-image.qtshe.com/1597839675434_88.jpg',
							pictureType: 0
						}
					],
					labelList: {
						serviceLabels: [
							{
								labelId: 60,
								labelName: '实名认证',
								labelStyle: '{"id":11,"icon":"","color":"#00CF8A","borderColor":"#00CF8A","background":"#FFFFFF"}'
							}
						],
						descLabels: [
							{
								labelId: 67,
								labelName: '工作证优先',
								labelStyle:
									'{"id":12,"icon":"https://qiniu-image.qtshe.com/newLabel/20210511-icon8.png","color":"#1677FF","borderColor":"#E7F0FF","background":"#E7F0FF"}'
							},
							{
								labelId: 30,
								labelName: '完工结',
								labelStyle: '{"id":9,"icon":"https://qiniu-image.qtshe.com/newLabel/icon3.png","color":"#FF8000","borderColor":"#FFF2E5","background":"#FFF2E5"}'
							}
						]
					},
					labelRecommend: [
						{
							townId: 205,
							tagType: 2,
							tagParams:
								'{"userNum":2813,"labelStyle":"{\\"icon\\":\\"https://qiniu-image.qtshe.com/gateway/hot.png\\",\\"color\\":\\"#FA5555\\",\\"borderColor\\":\\"#FEEEEE\\",\\"background\\":\\"#FEEEEE\\"}","ranking":4,"schoolName":"广东石油化工学院","schoolCode":"11656"}'
						}
					],
					labelRecommendNewList: {
						subwayLabels: [],
						rankingLabels: [
							{
								townId: 205,
								tagType: 2,
								tagParams:
									'{"userNum":2813,"labelStyle":"{\\"icon\\":\\"https://qiniu-image.qtshe.com/gateway/hot.png\\",\\"color\\":\\"#FA5555\\",\\"borderColor\\":\\"#FEEEEE\\",\\"background\\":\\"#FEEEEE\\"}","ranking":4,"schoolName":"广东石油化工学院","schoolCode":"11656"}',
								icon: 'https://qiniu-image.qtshe.com/1615277014125_55.png',
								jumpKey: 'CIRCLE_RECOMMEND_JOBS',
								param:
									'[{"key": "pageType","name": "页面类型2校友 3商圈","type": "String","value":2},{"key": "circleCode","name": "业务id","type": "String","value":"11656"}]',
								backgroundColor: '#FEEEEE'
							}
						]
					},
					listStyle: 1,
					ptpModParam: {
						algorithmStrategyId: '1-170',
						dataSource: 1
					}
				},
				{
					addressDetail: '不限工作地点',
					partJobId: 1187613,
					title: '适合新手自媒体发文章赚钱课程限时免费试听',
					titleSimple: '适合新手自媒体发文章赚钱课程限时免费试听',
					salary: '3980元/其他',
					clearingForm: {
						key: '0',
						value: '其他'
					},
					welfare: '名师授课,免费试听',
					companyName: '黑龙江众源方略教育科技有限公司',
					logo: 'https://qiniu-image.qtshe.com/company_logo_default.png',
					dataSource: 1,
					jobLineType: 1,
					category: 1,
					entryCount: 101,
					companyType: {
						key: '1',
						value: '企业'
					},
					brandName: '众源方略',
					companyLogo: '',
					parentClassId: 10139,
					classId: 10468,
					c1: 118000000,
					c2: 118106000,
					c3: 118106106,
					algorithmStrategyId: '1-170',
					labelList: {
						serviceLabels: [
							{
								labelId: 61,
								labelName: '企业认证',
								labelStyle: '{"id":10,"icon":"","color":"#72AAFA","borderColor":"#72AAFA","background":"#FFFFFF"}'
							}
						],
						descLabels: [
							{
								labelId: 19,
								labelName: '最新发布',
								labelStyle: '{"id":6,"icon":"","color":"#FA5555","borderColor":"#FEEEEE","background":"#FEEEEE"}'
							}
						]
					},
					listStyle: 3,
					jobIntroduction: [
						{
							title: '你将获得',
							introductionDesc: '电商技能免费试听；提升自我升值空间'
						},
						{
							title: '就业机会',
							introductionDesc: '知名互联网公司员工，获得个人发展大平台'
						}
					],
					newJobIntroduction: '知名互联网公司员工，获得个人发展大平台',
					ptpModParam: {
						algorithmStrategyId: '1-170',
						dataSource: 1
					}
				},
				{
					addressDetail: '不限工作地点',
					partJobId: 1184082,
					title: '招高颜值跳舞才艺主播日结',
					titleSimple: '招高颜值跳舞才艺主播日结',
					salary: '5000元/月',
					clearingForm: {
						key: '4',
						value: '完工结算'
					},
					welfare: '保底薪资,有提成,免费培训,奖金奖品,流量扶持,任务奖',
					companyName: '杭州莫凡文化传媒有限公司',
					logo: 'https://qiniu-image.qtshe.com/company_logo_default.png',
					dataSource: 0,
					jobLineType: 1,
					category: 1,
					entryCount: 13,
					companyType: {
						key: '1',
						value: '企业'
					},
					brandName: '',
					companyLogo: '',
					parentClassId: 10139,
					classId: 10349,
					c1: 120000000,
					c2: 120104000,
					c3: 0,
					jobPicture: [
						{
							picture: 'https://qiniu-image.qtshe.com/1605505407807_761.png',
							pictureType: 0
						}
					],
					labelList: {
						serviceLabels: [
							{
								labelId: 61,
								labelName: '企业认证',
								labelStyle: '{"id":10,"icon":"","color":"#72AAFA","borderColor":"#72AAFA","background":"#FFFFFF"}'
							}
						],
						descLabels: [
							{
								labelId: 19,
								labelName: '最新发布',
								labelStyle: '{"id":6,"icon":"","color":"#FA5555","borderColor":"#FEEEEE","background":"#FEEEEE"}'
							},
							{
								labelId: 9,
								labelName: '有提成',
								labelStyle: '{"id":6,"icon":"","color":"#FA5555","borderColor":"#FEEEEE","background":"#FEEEEE"}'
							},
							{
								labelId: 66,
								labelName: '免费培训',
								labelStyle: '{"id":2,"icon":"https://qiniu-image.qtshe.com/newLabel/icon5.png","color":"#703E0F","borderColor":"#FEDEA9","background":"#FEDEA9"}'
							},
							{
								labelId: 30,
								labelName: '完工结',
								labelStyle: '{"id":9,"icon":"https://qiniu-image.qtshe.com/newLabel/icon3.png","color":"#FF8000","borderColor":"#FFF2E5","background":"#FFF2E5"}'
							},
							{
								labelId: 32,
								labelName: '限女生',
								labelStyle: '{"id":7,"icon":"","color":"#838D99","borderColor":"#DFE3E9","background":"#FFFFFF"}'
							}
						]
					},
					listStyle: 2,
					jobIntroduction: [
						{
							title: '岗位简介',
							introductionDesc: '露脸主播，形象气质佳优先，与游客互动，活跃直播间气氛'
						}
					],
					newJobIntroduction: '露脸主播，形象气质佳优先，与游客互动，活跃直播间气氛',
					ptpModParam: {
						dataSource: 0
					}
				},
				{
					addressDetail: '不限工作地点',
					partJobId: 1178493,
					title: '保底孵化颜值视频主播 限苹果手机',
					titleSimple: '保底孵化颜值视频主播 限苹果手机',
					salary: '4000元/月',
					clearingForm: {
						key: '3',
						value: '月结'
					},
					welfare: '保底薪资,提成晋升,引导培训,住房补贴,租房补贴,设备发放',
					companyName: '深圳寰纳娱乐有限公司',
					logo: 'https://qiniu-image.qtshe.com/company_logo_default.png',
					dataSource: 0,
					jobLineType: 1,
					category: 1,
					entryCount: 16,
					companyType: {
						key: '1',
						value: '企业'
					},
					brandName: '寰纳娱乐',
					companyLogo: '',
					parentClassId: 10139,
					classId: 10349,
					c1: 120000000,
					c2: 120104000,
					c3: 0,
					jobPicture: [
						{
							picture: 'https://qiniu-image.qtshe.com/1605505407782_231.png',
							pictureType: 0
						}
					],
					labelList: {
						serviceLabels: [
							{
								labelId: 61,
								labelName: '企业认证',
								labelStyle: '{"id":10,"icon":"","color":"#72AAFA","borderColor":"#72AAFA","background":"#FFFFFF"}'
							}
						],
						descLabels: [
							{
								labelId: 19,
								labelName: '最新发布',
								labelStyle: '{"id":6,"icon":"","color":"#FA5555","borderColor":"#FEEEEE","background":"#FEEEEE"}'
							},
							{
								labelId: 9,
								labelName: '有提成',
								labelStyle: '{"id":6,"icon":"","color":"#FA5555","borderColor":"#FEEEEE","background":"#FEEEEE"}'
							},
							{
								labelId: 32,
								labelName: '限女生',
								labelStyle: '{"id":7,"icon":"","color":"#838D99","borderColor":"#DFE3E9","background":"#FFFFFF"}'
							}
						]
					},
					labelRecommendNewList: {
						subwayLabels: [],
						rankingLabels: [
							{
								townId: 0,
								tagType: 4,
								tagParams: '{"exposure_num":125909,"label_name":"舞蹈爱好者","job_rnk":8}',
								icon: 'https://qiniu-image.qtshe.com/1615276852550_664.png',
								jumpKey: 'WORK_RANK',
								param: [
									{
										key: 'labelId',
										name: '标签Id',
										type: 'String',
										value: 10010
									},
									{
										key: 'labelName',
										name: '标签名',
										type: 'String',
										value: '舞蹈兼职'
									}
								],
								backgroundColor: '#FFF2E5'
							}
						]
					},
					listStyle: 2,
					jobIntroduction: [
						{
							title: '岗位简介',
							introductionDesc: '露脸主播，形象气质佳优先，与游客互动，活跃直播间气氛'
						}
					],
					newJobIntroduction: '性格开朗会聊天，无经验者有专业指导，服从公司管理即可',
					ptpModParam: {
						dataSource: 0
					}
				},
				{
					addressDetail: '不限工作地点',
					partJobId: 1184503,
					title: '限时招0基础配音学员 在家兼职变现',
					titleSimple: '限时招0基础配音学员 在家兼职变现',
					salary: '8000元/其他',
					clearingForm: {
						key: '0',
						value: '其他'
					},
					welfare: '名师授课',
					companyName: '广州鱼子匠教育科技有限公司',
					logo: 'https://qiniu-image.qtshe.com/1633943535637_868.png',
					dataSource: 0,
					jobLineType: 1,
					category: 4,
					entryCount: 79,
					companyType: {
						key: '1',
						value: '企业'
					},
					brandName: '鱼子匠',
					companyLogo: 'https://qiniu-image.qtshe.com/1633943535637_868.png',
					parentClassId: 10139,
					classId: 10473,
					c1: 118000000,
					c2: 118103000,
					c3: 118103108,
					labelList: {
						serviceLabels: [
							{
								labelId: 61,
								labelName: '企业认证',
								labelStyle: '{"id":10,"icon":"","color":"#72AAFA","borderColor":"#72AAFA","background":"#FFFFFF"}'
							}
						],
						descLabels: [
							{
								labelId: 19,
								labelName: '最新发布',
								labelStyle: '{"id":6,"icon":"","color":"#FA5555","borderColor":"#FEEEEE","background":"#FEEEEE"}'
							},
							{
								labelId: 9,
								labelName: '有提成',
								labelStyle: '{"id":6,"icon":"","color":"#FA5555","borderColor":"#FEEEEE","background":"#FEEEEE"}'
							}
						]
					},
					labelRecommendNewList: {
						subwayLabels: [],
						rankingLabels: [
							{
								townId: 0,
								tagType: 4,
								tagParams: '{"exposure_num":306786,"label_name":"主持人","job_rnk":17}',
								icon: 'https://qiniu-image.qtshe.com/1615276852550_664.png',
								jumpKey: 'WORK_RANK',
								param:
									'[{"key":"labelId","name":"标签Id","type":"String","value":10008},{"key":"labelName","name":"标签名","type":"String","value":"主持人"},{"key":"jumpUserType","name":"用户类型","type":"String","value":"1"}]',
								backgroundColor: '#FFF2E5'
							}
						]
					},
					jobFee: {
						rushStatus: 1,
						price: 69900,
						rushPrice: 360,
						startTime: 1637164800000,
						endTime: 1672502399000,
						classTeacher: '',
						feePrice: '699',
						feeRushPrice: '3.6'
					},
					listStyle: 1,
					newJobIntroduction: '专业机构兼职接单，利用技能变现的好机会~',
					ptpModParam: {
						dataSource: 0
					}
				},
				{
					addressDetail: '不限工作地点',
					partJobId: 1184942,
					title: '播音配音学习招募 学用声音做副业',
					titleSimple: '播音配音学习招募 学用声音做副业',
					salary: '10000元/其他',
					clearingForm: {
						key: '0',
						value: '其他'
					},
					welfare: '名师授课,进阶课折扣券',
					companyName: '湖南潭州教育网络科技有限公司',
					logo: 'https://qiniu-image.qtshe.com/1636597974595_979.png',
					dataSource: 0,
					jobLineType: 1,
					category: 4,
					entryCount: 186,
					companyType: {
						key: '1',
						value: '企业'
					},
					brandName: '潭州',
					companyLogo: 'https://qiniu-image.qtshe.com/1636597974595_979.png',
					parentClassId: 10139,
					classId: 10473,
					c1: 118000000,
					c2: 118103000,
					c3: 118103108,
					labelList: {
						serviceLabels: [
							{
								labelId: 61,
								labelName: '企业认证',
								labelStyle: '{"id":10,"icon":"","color":"#72AAFA","borderColor":"#72AAFA","background":"#FFFFFF"}'
							}
						],
						descLabels: [
							{
								labelId: 19,
								labelName: '最新发布',
								labelStyle: '{"id":6,"icon":"","color":"#FA5555","borderColor":"#FEEEEE","background":"#FEEEEE"}'
							}
						]
					},
					labelRecommendNewList: {
						subwayLabels: [],
						rankingLabels: [
							{
								townId: 0,
								tagType: 4,
								tagParams: '{"exposure_num":316105,"label_name":"主持人","job_rnk":16}',
								icon: 'https://qiniu-image.qtshe.com/1615276852550_664.png',
								jumpKey: 'WORK_RANK',
								param:
									'[{"key":"labelId","name":"标签Id","type":"String","value":10008},{"key":"labelName","name":"标签名","type":"String","value":"主持人"},{"key":"jumpUserType","name":"用户类型","type":"String","value":"1"}]',
								backgroundColor: '#FFF2E5'
							}
						]
					},
					jobFee: {
						rushStatus: 1,
						price: 5000,
						rushPrice: 490,
						startTime: 1637510400000,
						endTime: 1672502399000,
						classTeacher: '',
						feePrice: '50',
						feeRushPrice: '4.9'
					},
					listStyle: 1,
					newJobIntroduction: '工作室兼职派单机会，副业增收的好机会',
					ptpModParam: {
						dataSource: 0
					}
				}
			],
			needStopPullDownRefresh: false,
			hasSelectFilter: false,
			bigBannerList: [
				{
					image: 'https://qiniu-image.qtshe.com/1627351727554_768.png'
				}
			],
			brandList: [],
			indexSort: [
				{
					key: '',
					value: '默认'
				},
				{
					key: '2',
					value: '离我近'
				},
				{
					key: '3',
					value: '最新'
				}
			],
			hostList: [],
			sysHeight: 60,
			brandType: '1',
			recommendExistsJobIds: '',
			landingMask: false,
			authorizedKey: '',
			innerComps: [],
			isFormJY: false,
			channelId: '',
			shareTitle: ['叮～来青团社，开启兼职赚钱新体验！', '「有人@你」青团子正在青团社找兼职，邀你一起来玩！', '空闲时间赚外快，找兼职神器青团社>>'],
			__webviewId__: 18,
			shareUserId: '',
			salaryPath: '',
			isLogin: '',
			sexRequire: '',
			customData: {
			    fixedSearchTop: 50,
			    fixedTop: 318,
			    currentScrollTop: 0
			},
		};
	},
	onLoad: function(t) {},
	onShow: function() {},
	onHide: function() {},
	onUnload: function() {},
	onPullDownRefresh: function() {},
	// 监听首页滚动，搜索框样式修改
	onPageScroll: function(e) {
		let pageScrollTop = e.scrollTop;
		this.customData.currentScrollTop = pageScrollTop;
		if (this.customData.fixedTop < pageScrollTop && !this.isFixed) {
			this.isFixed =  true;
		} else {
		    if (this.customData.fixedTop >= pageScrollTop && this.isFixed) {
		        this.isFixed = false;
		    } else {
		        if (this.customData.fixedSearchTop < pageScrollTop && !this.isSearchFixed) {
		             this.isSearchFixed = true;
		        } else {
		            if (this.customData.fixedSearchTop >= pageScrollTop && this.isSearchFixed) {
		                this.isSearchFixed = false;
		            }
		        }
		    }
		}
	},
	onReachBottom: function() {},
	onShareAppMessage: function() {},
	methods: {
		getSystemInfo: function() {},

		saveRef: function(t) {},

		closeCollectGift: function() {},

		initEvent: function() {},

		getWordList: function() {},

		getModuleList: function(t) {},

		getSearchList: function() {},

		getFirstPageData: function() {},

		getRandom: function() {},

		renderData: function(t) {},

		getFilterList: function() {},
		// 团子精选-筛选，更新数据
		filterChange: function(t) {
			this.hasSelectFilter = true;
			this.pageNum = 1;
			let item = this.tabList[this.jobItemType];
			this.commandFilterData = t.detail;
			// 更新列表
			// this.getModuleList(item.key);
		},

		dealIndex: function(t, a) {},

		getSetting: function(t) {},

		locationHandle: function() {},

		btFresh: function() {},

		tabChange: function(t) {},

		signClick: function() {},

		getFixedLength: function() {},

		closeLandingMask: function() {},

		jumpToShareFission: function() {},

		checkSignStatus: function() {}
	}
};
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
