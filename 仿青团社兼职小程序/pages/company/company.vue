<template>
	<view class="container" :disableScroll="disableScroll" v-if="isLoaded">
		<view class="header" v-if="bannerList.length > 0">
			<swiper :autoplay="swiperAutoplay" @change="currentHandle" class="swiper" :current="current" :indicatorDots="false">
				<swiper-item
					:class="'header-swiper-item ptp_exposure_swiper_' + index"
					:id="'pid=2fm1-zmc2-29fj-1kfn-' + (index + 1)"
					key="url"
					v-for="(item, index) in bannerList"
					:key="index"
				>
					<video
						:autoplay="autoplay"
						@pause="videoPauseHandle"
						@play="videoPlayHandle"
						class="swiper-item-pic"
						id="video"
						:muted="true"
						:poster="item.poster"
						:src="item.url"
						v-if="item.type === 'video'"
					></video>

					<image class="swiper-item-pic" mode="aspectFill" :src="item.url" v-if="item.type === 'pic'"></image>

					<view class="header-swiper-bottom" v-if="item.type === 'pic'"></view>
				</swiper-item>
			</swiper>
			<view class="swiper-index" v-if="bannerList.length > 1">{{ current + 1 }}/{{ bannerList.length }}</view>
		</view>
		<view class="name">{{ companyName }}</view>
		<view class="info">
			<block v-if="companyData.style">
				<image class="info-image" mode="scaleToFill" src="https://qiniu-image.qtshe.com/20201203_companyIcon.png"></image>
				<view>青团认证</view>
				<image class="info-icon" mode="scaleToFill" src="https://qiniu-image.qtshe.com/20210106_icon.png" v-if="companyData.companyLabelType === 1"></image>
				<image class="info-icon2" mode="scaleToFill" src="https://qiniu-image.qtshe.com/20210106_icon2.png" v-if="companyData.companyLabelType === 2"></image>
			</block>
			<block v-else>
				<image class="info-image" mode="scaleToFill" src="https://qiniu-image.qtshe.com/20200821_authIcon.png"></image>
				<view>企业认证</view>
				<image class="info-icon" mode="scaleToFill" src="https://qiniu-image.qtshe.com/20210106_icon.png" v-if="companyData.companyLabelType === 1"></image>
				<image class="info-icon2" mode="scaleToFill" src="https://qiniu-image.qtshe.com/20210106_icon2.png" v-if="companyData.companyLabelType === 2"></image>
			</block>
		</view>
		<block v-if="companyData.style">
			<view class="title-box">
				<view>服务保障</view>
				<view class="title-box-tips">官方自营</view>
			</view>
			<image class="serve-image" mode="widthFix" :src="companyData.serviceUrl" v-if="companyData.serviceUrl"></image>
			<view class="title-box">
				<view>招聘顾问团队</view>
				<view class="title-box-tips">官方自营</view>
			</view>
			<view class="assist-box" v-if="companyData.team.length > 0">
				<scroll-view class="assist-list" :scrollX="true">
					<view class="assist-list-item" v-for="(item, index) in companyData.team" :key="index">
						<image class="assist-list-img ptp_exposure_static" :id="'pid=dj1k-dn1b-ug1b-vh72-' + (index + 1)" :src="item.headImg" v-if="item.headImg"></image>

						<image class="assist-list-icon" src="https://qiniu-image.qtshe.com/20201203_companyIcon3.png"></image>

						<view class="assist-list-title">{{ item.userName }}</view>

						<view class="assist-list-desc">{{ item.people }}</view>

						<view class="assist-list-rate"><rate :limit="5" :rate="item.rank"></rate></view>
					</view>
				</scroll-view>
			</view>
		</block>
		<view class="company-title">企业基本信息</view>
		<view class="content">
			<view class="part">
				<view class="part-title">企业类型</view>
				<view class="part-desc">{{ companyData.companyEyeCheckInfo.type === 1 ? '个体' : '公司' }}</view>
			</view>
			<view class="part">
				<view class="part-title">经营状态</view>
				<view class="part-desc">{{ companyData.companyEyeCheckInfo.regStatus || '--' }}</view>
			</view>
			<view class="part">
				<view class="part-title">成立日期</view>
				<view class="part-desc">{{ time }}</view>
			</view>
			<view class="part">
				<view class="part-title">注册地址</view>
				<view class="part-desc">{{ companyData.companyEyeCheckInfo.regLocation || '--' }}</view>
			</view>
			<view class="part">
				<view class="part-title">统一信用代码</view>
				<view class="part-desc">{{ companyData.companyEyeCheckInfo.creditCode || '--' }}</view>
			</view>
			<view class="part" v-if="isShowAll">
				<view class="part-title">组织机构代码</view>
				<view class="part-desc">{{ companyData.companyEyeCheckInfo.orgNumber || '--' }}</view>
			</view>
			<view class="part" v-if="isShowAll">
				<view class="part-title">经营范围</view>
				<view class="part-desc">{{ companyData.companyEyeCheckInfo.businessScope || '--' }}</view>
			</view>
			<view class="content-bottom">
				<view>以上信息由</view>
				<image mode="scaleToFill" src="https://qiniu-image.qtshe.com/20200822_companyIcon.png"></image>
				<view>提供</view>
			</view>
			<view @tap="showAllHandle" class="content-button ptp_exposure_static" data-ptpid="ff0d-1875-b777-e0c0" id="pid=ff0d-1875-b777-e0c0" v-if="!isShowAll">
				<text style="margin-right: 4rpx">展开全部</text>
				<text class="iconfont iconarrow_down"></text>
			</view>
			<view class="content-mask" v-if="!isShowAll"></view>
		</view>
		<move-drag
			@disable="disableScrollControl"
			@loadmore="loadmore"
			:isEnd="isEnd"
			:isLoading="isModuleLoading"
			:limit="400"
			:list="moduleList"
			ptpId="22df-1mag-1kfy-290f"
			ref="saveRef"
			:start="0"
			:startDirction="true"
			:title="'在招岗位 ' + totalCount"
		></move-drag>
	</view>
</template>

<script>
import moveDrag from '@/components/moveDrag/index';
import rate from '../../components/rate/index';

export default {
	components: {
		moveDrag,
		rate
	},
	data() {
		return {
			isLoaded: false,
			companyId: '',
			companyName: '',
			companyData: {},
			time: '--',
			pageNum: 1,
			jobList: [],
			current: 0,
			bannerList: [
				{
					url: 'https://qiniu-image.qtshe.com/20201210_companyBg.png',
					type: 'pic'
				}
			],
			assistList: [],
			isShowAll: false,
			autoplay: false,
			totalCount: 0,
			swiperAutoplay: true,
			scrollTop: 0,
			disableScroll: false,
			moduleList: []
		};
	},
	onLoad: function(t) {
		this.initData();
	},
	onShow: function() {},
	onReachBottom: function() {},
	methods: {
		initData: function() {
			this.companyData = {
				style: 0,
				serviceUrl: null,
				team: null,
				bossAccountId: 3469177,
				companyIndexImages: [],
				logo: 'https://qiniu-image.qtshe.com/company_logo_default.png-100',
				name: '河北涵品教育科技有限责任公司',
				companyEyeCheckInfo: {
					type: 1,
					regStatus: '存续',
					fromTime: 1605196800000,
					regLocation: '保定市翠园街723号科技产业园D座303室',
					creditCode: '91130605MA0FPXGW03',
					orgNumber: 'MA0FPXGW0',
					businessScope:
						'基础软件开发；企业管理咨询服务，教育咨询服务(培训、教育辅导除外)，计算机网络技术开发、咨询、转让、推广服务，广告发布、代理服务，文化会展服务，公司礼仪服务，大型活动组织服务。（依法须经批准的项目，经相关部门批准后方可开展经营活动）'
				},
				shareContentClassifys: {
					weixinTalk: '6个职位招聘中，点击查看更多招聘信息！',
					weixinFriend: '【河北涵品教育科技有限责任公司】6个职位招聘中，点击查看更多招聘信息！',
					sinaWb: '【河北涵品教育科技有限责任公司】6个职位招聘中，点击查看更多招聘信息！',
					qqshare: '6个职位招聘中，点击查看更多招聘信息！',
					qqtalk: '6个职位招聘中，点击查看更多招聘信息！'
				},
				orgRole: 1,
				introduction: null,
				companyShareUrl: 'http://m.qtshe.com/app/company?companyId=3469177',
				companyShareProgramUrl: 'pages/company/index?companyId=3469177',
				companyShareLogo: 'https://qiniu-image.qtshe.com/company_logo_default.png-100',
				companyShareTitle: '【河北涵品教育科技有限责任公司】',
				companyShareContent: '在名企做兼职，除了更好的福利薪资，还有更大的成长空间！你，注定和别人不同！',
				companyLabelType: 0
			};

			this.moduleList = [
				{
					addressDetail: '不限工作地点',
					partJobId: 1173318,
					title: '0基础招ps插画兼职-小白免费教',
					titleSimple: '0基础招ps插画兼职-小白免费教',
					salary: '800元/其他',
					clearingForm: {
						key: '0',
						value: '其他'
					},
					welfare: '免费试听,名师授课,软件安装包,进阶课折扣券',
					companyName: '河北涵品教育科技有限责任公司',
					logo: 'https://qiniu-image.qtshe.com/company_logo_default.png',
					dataSource: 0,
					jobLineType: 1,
					category: 1,
					entryCount: 834,
					companyType: {
						key: '1',
						value: '企业'
					},
					brandName: '涵品教育',
					companyLogo: '',
					parentClassId: 10139,
					classId: 10465,
					c1: 118000000,
					c2: 118102000,
					c3: 118102109,
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
								tagParams: '{"exposure_num":299588,"label_name":"设计创作","job_rnk":27}',
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
						dataSource: 0
					}
				},
				{
					addressDetail: '不限工作地点',
					partJobId: 1178419,
					title: '招0基础ps手绘插画兼职 免费培训',
					titleSimple: '招0基础ps手绘插画兼职 免费培训',
					salary: '800元/其他',
					clearingForm: {
						key: '0',
						value: '其他'
					},
					welfare: '名师授课,免费试听,软件安装包,进阶课折扣券',
					companyName: '河北涵品教育科技有限责任公司',
					logo: 'https://qiniu-image.qtshe.com/company_logo_default.png',
					dataSource: 0,
					jobLineType: 1,
					category: 1,
					entryCount: 978,
					companyType: {
						key: '1',
						value: '企业'
					},
					brandName: '涵品教育',
					companyLogo: '',
					parentClassId: 10139,
					classId: 10465,
					c1: 118000000,
					c2: 118102000,
					c3: 118102109,
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
								tagParams: '{"exposure_num":444052,"label_name":"设计创作","job_rnk":22}',
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
							introductionDesc: '画图软件免费安装；金牌讲师专业指导'
						},
						{
							title: '就业机会',
							introductionDesc: '淘宝店铺兼职接单，高薪行业，机会众多'
						}
					],
					newJobIntroduction: '专业图库网站兼职接单，内容简单，时间自由',
					ptpModParam: {
						dataSource: 0
					}
				},
				{
					addressDetail: '不限工作地点',
					partJobId: 1173309,
					title: '0基础学PS手绘插画 限18岁以上需电脑',
					titleSimple: '0基础学PS手绘插画 限18岁以上需电脑',
					salary: '800元/其他',
					clearingForm: {
						key: '0',
						value: '其他'
					},
					welfare: '名师授课,免费试听,软件安装包,进阶课折扣券',
					companyName: '河北涵品教育科技有限责任公司',
					logo: 'https://qiniu-image.qtshe.com/company_logo_default.png',
					dataSource: 0,
					jobLineType: 1,
					category: 1,
					entryCount: 277,
					companyType: {
						key: '1',
						value: '企业'
					},
					brandName: '涵品教育',
					companyLogo: '',
					parentClassId: 10139,
					classId: 10465,
					c1: 118000000,
					c2: 118102000,
					c3: 118102109,
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
							introductionDesc: '掌握PS实用技能；熟练使用画图软件'
						},
						{
							title: '就业机会',
							introductionDesc: '专业图库网站兼职接单，内容简单，时间自由'
						}
					],
					newJobIntroduction: '互联网行业专业设计师，高薪行业，发展空间大',
					ptpModParam: {
						dataSource: 0
					}
				},
				{
					addressDetail: '不限工作地点',
					partJobId: 1171923,
					title: '线上免费学习手绘在家做兼职',
					titleSimple: '线上免费学习手绘在家做兼职',
					salary: '798元/其他',
					clearingForm: {
						key: '0',
						value: '其他'
					},
					welfare: '免费试听,软件安装包,进阶课折扣券,名师授课',
					companyName: '河北涵品教育科技有限责任公司',
					logo: 'https://qiniu-image.qtshe.com/company_logo_default.png',
					dataSource: 0,
					jobLineType: 1,
					category: 1,
					entryCount: 5858,
					companyType: {
						key: '1',
						value: '企业'
					},
					brandName: '涵品教育',
					companyLogo: '',
					parentClassId: 10139,
					classId: 10465,
					c1: 118000000,
					c2: 118102000,
					c3: 118102109,
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
								tagParams: '{"exposure_num":1252208,"label_name":"零基础技能变现","job_rnk":13}',
								icon: 'https://qiniu-image.qtshe.com/1615276852550_664.png',
								jumpKey: 'WORK_RANK',
								param:
									'[{"key":"labelId","name":"标签Id","type":"String","value":10070},{"key":"labelName","name":"标签名","type":"String","value":"在线课程"},{"key":"jumpUserType","name":"用户类型","type":"String","value":"1"}]',
								backgroundColor: '#FFF2E5'
							},
							{
								townId: 0,
								tagType: 4,
								tagParams: '{"exposure_num":1252208,"label_name":"设计创作","job_rnk":5}',
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
					newJobIntroduction: '专业图库网站兼职接单，内容简单，时间自由',
					ptpModParam: {
						dataSource: 0
					}
				},
				{
					addressDetail: '不限工作地点',
					partJobId: 1172501,
					title: '招ps插画兼职小白免费教-需电脑',
					titleSimple: '招ps插画兼职小白免费教-需电脑',
					salary: '800元/其他',
					clearingForm: {
						key: '0',
						value: '其他'
					},
					welfare: '名师授课,免费试听,进阶课折扣券,软件安装包',
					companyName: '河北涵品教育科技有限责任公司',
					logo: 'https://qiniu-image.qtshe.com/company_logo_default.png',
					dataSource: 0,
					jobLineType: 1,
					category: 1,
					entryCount: 243,
					companyType: {
						key: '1',
						value: '企业'
					},
					brandName: '涵品教育',
					companyLogo: '',
					parentClassId: 10139,
					classId: 10465,
					c1: 118000000,
					c2: 118102000,
					c3: 118102109,
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
							introductionDesc: '熟练使用画图软件；GET兼职基本技能'
						},
						{
							title: '就业机会',
							introductionDesc: '成为工作室专业设计师，工作稳定，就业机会多'
						}
					],
					newJobIntroduction: '互联网行业专业设计师，高薪行业，发展空间大',
					ptpModParam: {
						dataSource: 0
					}
				},
				{
					addressDetail: '不限工作地点',
					partJobId: 1033009,
					title: '招0基础ps插画兼职 免费培训（需电脑）',
					titleSimple: '招0基础ps插画兼职 免费培训（需电脑）',
					salary: '298元/其他',
					clearingForm: {
						key: '0',
						value: '其他'
					},
					welfare: '免费培训',
					companyName: '河北涵品教育科技有限责任公司',
					logo: 'https://qiniu-image.qtshe.com/company_logo_default.png',
					dataSource: 0,
					jobLineType: 1,
					category: 1,
					entryCount: 1032,
					companyType: {
						key: '1',
						value: '企业'
					},
					brandName: '涵品教育',
					companyLogo: '',
					parentClassId: 10139,
					classId: 10465,
					c1: 118000000,
					c2: 118102000,
					c3: 118102109,
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
							introductionDesc: '熟练使用画图软件；GET兼职基本技能'
						},
						{
							title: '就业机会',
							introductionDesc: '成为工作室专业设计师，工作稳定，就业机会多'
						}
					],
					newJobIntroduction: '互联网行业专业设计师，高薪行业，发展空间大',
					ptpModParam: {
						dataSource: 0
					}
				}
			];
			
			this.isEnd = true;
			this.isModuleLoading = false;
			this.isLoaded = true;
		},
		showAllHandle: function() {},
		currentHandle: function(t) {},
		getNetworkType: function() {},
		videoPlayHandle: function() {},
		videoPauseHandle: function() {},
		loadmore: function() {},
		onShareAppMessage: function() {
			return {
				title: '青团社兼职',
				path: '/pages/company/index?companyId=' + this.companyId
			};
		},
		disableScrollControl: function(t) {
			this.disableScroll = t;
		},
		saveRef: function(t) {}
	}
};
</script>
<style lang="scss" scoped>
@import './company.scss';
</style>
