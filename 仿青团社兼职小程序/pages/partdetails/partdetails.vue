<template>
	<view>
		<!-- 分享图片组件 -->
		<share-img @sharePath="getSharePath" :jobInfo="partJobVo" :startDraw="startDraw"></share-img>

		<block v-if="partJobVo.template.templateId === 2">
			<view>
				<image lazyLoad class="allmessimage" mode="widthFix" :src="partJobVo.qualityBackground"></image>
				<view class="resourse">
					<parser :html="partJobVo.targetUrlContent"></parser>
				</view>
			</view>
			<apply-button :agreementVo="agreementVo" @cancel="agreementCancelHandle" @initData="initData"
				@loginSuccess="onLoginSuccess" @promptly="confirmReport" :collectImg="collectImg" :hasToken="hasToken"
				:partJobVo="partJobVo" v-if="flag"></apply-button>
		</block>
		<block v-else>
			<view class="container" v-if="partJobVo.template.templateId!==3">
				

				<view class="education-wrap">
					<education :partJobVo="partJobVo" :chosenList="chosenList" :tabCurrent="tabCurrent"
						:hasEyeAuth="hasEyeAuth" :isShowAll="isShowAll" :isInfoShowBtn="isInfoShowBtn"
						:isComputedInfo="isComputedInfo" :agreementVo="agreementVo"></education>
					<job-list @tabChange="anchorTabHandle" :isTabList="true" :recommendList="moduleList"
						:tabCurrent="tabCurrent">
					</job-list>
				</view>
				
			</view>
			<apply-button 
			:agreementVo="agreementVo" 
			:baseInfo="jobDetailJson.baseInfo"
			:collectImg="collectImg" 
			:hasToken="hasToken" 
			:partJobVo="partJobVo"
			@cancel="agreementCancelHandle"
			@initData="initData" 
			@loginSuccess="onLoginSuccess"
			@pay="showPayDialog" 
			@promptly="confirmReport"></apply-button>
		</block>
		<report-dialog :agreementVo="agreementVo" :authorizedKey="authorizedKey" @close="closeReportDialog"
			@payCancel="onPayCancel" @paySuccess="onPaySuccess" :famousJobList="famousList"
			:fromRecommend="fromRecommend" :hasLatitude="hasLatitude" :isDirect="isDirect" :isPartDetails="true"
			:partJobId="partJobId" :partJobVo="partJobVo" :recommendTips="recommendTips"
			:reportDialogText="reportDialogText" :shareUserId="shareUserId" :source="source" :visible="visible"
			v-if="visible"></report-dialog>
		<quick-login @initData="initData" :isShow="isLoginVisible"></quick-login>
		<!-- 		<qts-canvas :clearingForm="partJobVo.clearingForm.value" :isDrawImage="isDrawImage" :partCode="partCode"
			:partSalary="partJobVo.salary" :partTitle="partJobVo.title"></qts-canvas> -->
		<apply-sure-modal @onCancelBtn="onCancelBtn" @onSureBtn="onSureBtn" :locationTownName="locationTownName"
			:nowTownName="nowTownName" v-if="isShowApplySure"></apply-sure-modal>
	</view>
</template>

<script>
	import quickLogin from '../components/quickLogin/quickLogin';
	import applyButton from '../components/applyButton/applyButton';
	import simpleModel from '../components/simpleModel/simpleModel';
	import navigationBar from '@/components/navigationBar/index';
	import applySureModal from './components/applySureModal/index';
	import shareImg from './components/shareImg/index';
	import jobList from './components/jobList/index';
	import reportDialog from '@/components/reportDialog/index';
	import regularItem from '@/components/regularItem/index';
	// 页面模板
	import education from './templates/education/education.vue';
	
	import { apiJobsList } from '@/api/mock/mock.js';

	export default {
		components: {
			// 组件
			jobList,
			quickLogin,
			applySureModal,
			applyButton,
			// 模板
			education
		},
		data() {
			return {
				hasToken: !1,
				isLoading: !0,
				diploma: {
					0: '学历不限',
					2: '限高中以上',
					3: '限大专以上',
					4: '限本科以上',
					6: '限硕士以上',
					7: '限博士以上'
				},
				partJobId: '',
				partJobVo: {
					"addressBuilding": "",
					"addressDetail": "不限工作地点",
					"anchorShortJobDesc": "【报名须知】\n1：需晚上【19：30-21：30】有时间参加技能提升课程\n2：需要自备电脑（后期学习和兼职都需要用到哦~）\n3：未满18周岁请勿报名；\n4：报名",
					"applyBalance": 196446,
					"applySuccessCount": 3554,
					"bonus": "计件提成",
					"bonusType": 2,
					"buttonStatus": 6,
					"c1": 118000000,
					"c2": 118102000,
					"c3": 118102101,
					"classification": {
						"bgLogo": "",
						"classLevel": 2,
						"classificationId": 10465,
						"classifyDesc": "设计创作相关课程",
						"flagAnchorType": 0,
						"logo": "",
						"logoList": "",
						"memberType": 1,
						"name": "设计创作",
						"parentId": 10139
					},
					"clearingForm": {
						"key": "0",
						"value": "其他结算"
					},
					"company": {
						"accountId": 3547408,
						"accountName": "庆娴",
						"active": "37分钟前活跃",
						"activeTset": "37",
						"auditType": 3,
						"authList": [{
								"name": "营业执照认证",
								"type": 1
							},
							{
								"name": "天眼查认证",
								"type": 2
							}
						],
						"bossAccountId": 3501841,
						"commentNumber": 1173,
						"companyId": 3501841,
						"companyLabelType": 0,
						"companyStar": false,
						"companyType": 1,
						"companyUuid": "",
						"enterpriseAuth": false,
						"evaluateStar": "5.0",
						"headImg": "https://qiniu-image.qtshe.com/1575466339493_259.png-100",
						"isOfficialAccount": false,
						"logo": "https://qiniu-image.qtshe.com/company_logo_default.png-100",
						"mobile": "",
						"name": "涵品教育",
						"organizationId": 464924,
						"processProportion": "--",
						"processTime": "--",
						"starNumber": 5
					},
					"contactWay": 2,
					"contentPrompt": "兼职过程中请拒绝向商家缴纳任何费用，若收费向客服举报",
					"cycleType": {
						"key": "2",
						"value": "长期兼职"
					},
					"diploma": 0,
					"distance": {
						"distanceNum": "0.00",
						"type": 1
					},
					"entryCount": 3554,
					"extra": "{}",
					"floors": [
						1,
						9,
						2,
						3,
						4,
						5,
						6,
						7,
						8
					],
					"hasApply": false,
					"heightRequire": "不限",
					"jobCount": 200000,
					"jobDateDesc": "依据个人时间安排",
					"jobDesc": "【报名须知】\n1：需晚上【19：30-21：30】有时间参加技能提升课程\n2：需要自备电脑（后期学习和兼职都需要用到哦~）\n3：未满18周岁请勿报名；\n4：报名后请主动添加老师微信，老师会1V1进行课程学习沟通和免费培训，尽快学习尽快赚钱哦~\n\n【适用人群】\n1、大学生：想兼职，但没技术，只能“卖苦力”，不能积累任何社会经验；面临就业，却很迷茫，没有一技之长，无法找到合适的工作。\n2、宝妈：想实现经济自由，但没有收入来源；带娃期间脱离社会，后期就业很迷茫。\n3、工作白领或待业人员：本职工作薪资低，想做副业，或转行，同时业余时间充裕。\n4、设计相关行业在职：技能差，只能做抠图套版，月入4000以下。\n\n【兼职收益】\n1：初级阶段（免费学习3天），可以掌握初级的PS知识：简单的抠图、调色、构图。\n2：中级阶段（1.5个月），可做兼职：300-800元详情、海报/单；500-1500元首页/单，成为原创设计师，可以达到初、中级设计师水准（兼职收入3000-6000+，设计行业就业月薪4000-8000+）\n3：高级阶段（3-4个月），达到中、高级设计师水准，能做高端产品800-1500+建模图片，（兼职收入6000-8000+，设计行业就业薪资可过万）。 \n\n【优势保障】 \nA、我们是——腾讯认证机构！\nB、学习方式——直播+实操，可以边学习边接单，在实战当中掌握技能！\nC、兼职渠道多（包图网、花瓣、淘宝、猪八戒各种在线平台）\nD、设计行业应用范围广泛（应用范围：电商美工，互联网，微商，影楼，婚纱摄影，视频剪辑等）\nE、薪资高、提升空间大（月入5000-20000不等）\nF、不受地域限制（可在线全国接单，在家办公）",
					"jobLineType": 1,
					"jobPhotos": [],
					"jobShortJobDesc": "【报名须知】\n1：需晚上【19：30-21：30】有时间参加技能提升课程\n2：需要自备电脑（后期学习和兼职都需要用到哦~）\n3：未满18周岁请勿报名；\n4：报名后请主动添加老师微信，老师会1V1进行课程学习沟通和免费培训，尽快学习尽快赚钱哦~\n\n【适用人群】\n1、大学生：想兼职，但没技术，只能“卖苦力”，不能积累任何社会经验；面临就业，却",
					"jobTime": "19:30~21:30",
					"jobType": 0,
					"labelList": {
						"descLabels": [{
								"labelId": 19,
								"labelName": "最新发布",
								"labelStyle": "{\"id\":6,\"icon\":\"\",\"color\":\"#FA5555\",\"borderColor\":\"#FEEEEE\",\"background\":\"#FEEEEE\"}"
							},
							{
								"labelId": 66,
								"labelName": "免费培训",
								"labelStyle": "{\"id\":2,\"icon\":\"https://qiniu-image.qtshe.com/newLabel/icon5.png\",\"color\":\"#703E0F\",\"borderColor\":\"#FEDEA9\",\"background\":\"#FEDEA9\"}"
							}
						],
						"serviceLabels": [{
							"labelId": 61,
							"labelName": "企业认证",
							"labelStyle": "{\"id\":10,\"icon\":\"\",\"color\":\"#72AAFA\",\"borderColor\":\"#72AAFA\",\"background\":\"#FFFFFF\"}"
						}]
					},
					"labelRecommend": [],
					"labelV2List": [{
							"labelId": 10064,
							"labelName": "零基础学PS",
							"labelStyle": "",
							"specialIcon": "",
							"specialType": 1,
							"type": 6
						},
						{
							"labelId": 10070,
							"labelName": "零基础技能变现",
							"labelStyle": "",
							"specialIcon": "",
							"specialType": 1,
							"type": 6
						},
						{
							"labelId": 10117,
							"labelName": "设计创作",
							"labelStyle": "",
							"specialIcon": "",
							"specialType": 1,
							"type": 6
						},
						{
							"jumpKey": "WORK_TAG_NEW",
							"labelId": 10049,
							"labelName": "免费培训",
							"labelStyle": "",
							"param": "[{\"key\":\"labelId\",\"name\":\"标签Id\",\"type\":\"String\",\"value\":10049},{\"key\":\"labelName\",\"name\":\"标签名\",\"type\":\"String\",\"value\":\"免费培训\"},{\"key\":\"jumpUserType\",\"name\":\"用户类型\",\"type\":\"String\",\"value\":\"1\"}]",
							"specialIcon": "",
							"specialType": 1,
							"type": 6
						},
						{
							"labelId": 10023,
							"labelName": "宅家赚",
							"labelStyle": "",
							"specialIcon": "",
							"specialType": 1,
							"type": 6
						},
						{
							"labelId": 10200,
							"labelName": "足不出户赚零花",
							"labelStyle": "",
							"specialIcon": "",
							"specialType": 1,
							"type": 6
						},
						{
							"labelId": 10204,
							"labelName": "学生兼职",
							"labelStyle": "",
							"specialIcon": "",
							"specialType": 1,
							"type": 6
						},
						{
							"labelId": 10358,
							"labelName": "宝妈高薪兼职",
							"labelStyle": "",
							"specialIcon": "",
							"specialType": 1,
							"type": 6
						},
						{
							"labelId": 10374,
							"labelName": "精选课程",
							"labelStyle": "",
							"specialIcon": "",
							"specialType": 1,
							"type": 6
						},
						{
							"labelId": 10376,
							"labelName": "日进斗金",
							"labelStyle": "",
							"specialIcon": "",
							"specialType": 1,
							"type": 6
						},
						{
							"labelId": 10332,
							"labelName": "摄影合集",
							"labelStyle": "",
							"specialIcon": "",
							"specialType": 1,
							"type": 6
						},
						{
							"labelId": 10000,
							"labelName": "靠谱兼职",
							"labelStyle": "",
							"specialIcon": "",
							"specialType": 1,
							"type": 6
						},
						{
							"labelId": 10305,
							"labelName": "热门兼职",
							"labelStyle": "",
							"specialIcon": "",
							"specialType": 1,
							"type": 6
						},
						{
							"jumpKey": "WORK_TAG_NEW",
							"labelId": 10306,
							"labelName": "严选兼职",
							"labelStyle": "",
							"param": "[{\"key\":\"labelId\",\"name\":\"标签Id\",\"type\":\"String\",\"value\":10306},{\"key\":\"labelName\",\"name\":\"标签名\",\"type\":\"String\",\"value\":\"讲师1V1\"},{\"key\":\"jumpUserType\",\"name\":\"用户类型\",\"type\":\"String\",\"value\":\"1\"}]",
							"specialIcon": "",
							"specialType": 1,
							"type": 6
						}
					],
					"labels": [{
							"labelId": 19,
							"labelName": "最新发布",
							"labelStyle": "{\"id\":6,\"icon\":\"\",\"color\":\"#FA5555\",\"borderColor\":\"#FEEEEE\",\"background\":\"#FEEEEE\"}"
						},
						{
							"labelId": 66,
							"labelName": "免费培训",
							"labelStyle": "{\"id\":2,\"icon\":\"https://qiniu-image.qtshe.com/newLabel/icon5.png\",\"color\":\"#703E0F\",\"borderColor\":\"#FEDEA9\",\"background\":\"#FEDEA9\"}"
						}
					],
					"latitude": 0,
					"logo": "",
					"longitude": 0,
					"maxAge": 100,
					"memberType": 1,
					"minAge": 18,
					"miniAppShare": "pages/partdetails/partdetails?partJobId=1181716&shareFrom=user",
					"needHealth": false,
					"needHeight": false,
					"needLiveExper": 0,
					"needPicture": 0,
					"newWefare": [
						"软件安装包"
					],
					"partJobId": 1181716,
					"publishTown": {
						"townId": 0,
						"townName": "全国"
					},
					"qingtuanbaoProctionUrl": "https://m.qtshe.com/activity/v1?activityMark=e5831e49d1577f499ce332845326f613",
					"queueCount": 0,
					"requireList": [
						"18岁以上"
					],
					"salary": "500元/其他",
					"salaryNum": "500",
					"salaryUnit": "/其他",
					"schoolList": [],
					"secureTips": "",
					"sexRequire": {
						"key": "0",
						"value": "不限"
					},
					"shareContentClassifys": {
						"qqshare": "【青团社兼职】PS修图 在家接私单，500元/其他，不限工作地点",
						"qqtalk": "500元/其他，500元/其他",
						"sinaWb": "【青团社兼职】PS修图 在家接私单，500元/其他招聘中，手慢无~",
						"weixinFriend": "【青团社兼职】PS修图 在家接私单，500元/其他招聘中，手慢无~",
						"weixinTalk": "500元/其他，依据个人时间安排，不限工作地点"
					},
					"shareUrl": "https://m.qtshe.com/app/partdetails?job=150ad7&shareFrom=user",
					"status": 3,
					"template": {
						"secureTips": "",
						"subTitle": "",
						"templateId": 11
					},
					"title": "PS修图 在家接私单",
					"titleSimple": "PS修图 在家接私单",
					"users": [{
							"logo": "https://qiniu-image.qtshe.com/1470616986516_420.jpg-100",
							"name": "肤**"
						},
						{
							"logo": "https://qiniu-image.qtshe.com/1575466524064_943.png-100",
							"name": "张**"
						},
						{
							"logo": "https://qiniu-image.qtshe.com/1575466524064_943.png-100",
							"name": "铁**"
						},
						{
							"logo": "https://qiniu-image.qtshe.com/1580455246488_476.png-100",
							"name": "冬**"
						},
						{
							"logo": "https://qiniu-image.qtshe.com/1596725027883_87.png-100",
							"name": "S**"
						},
						{
							"logo": "https://qiniu-image.qtshe.com/1575466438843_844.png-100",
							"name": "黄**"
						},
						{
							"logo": "https://qiniu-image.qtshe.com/1575466438843_844.png-100",
							"name": "张**"
						},
						{
							"logo": "https://qiniu-image.qtshe.com/1575466491243_708.png-100",
							"name": "刘**"
						},
						{
							"logo": "https://qiniu-image.qtshe.com/1575466438843_844.png-100",
							"name": "孟**"
						},
						{
							"logo": "https://qiniu-image.qtshe.com/1625707022093_120.png-100",
							"name": "夏**"
						},
						{
							"logo": "https://qiniu-image.qtshe.com/1575466438843_844.png-100",
							"name": "宋**"
						},
						{
							"logo": "https://qiniu-image.qtshe.com/1575466509784_570.png-100",
							"name": "呢**"
						},
						{
							"logo": "https://qiniu-image.qtshe.com/1575466474567_51.png-100",
							"name": "小**"
						},
						{
							"logo": "https://qiniu-image.qtshe.com/1575466438843_844.png-100",
							"name": "刘**"
						},
						{
							"logo": "https://qiniu-image.qtshe.com/1575466524064_943.png-100",
							"name": "假**"
						},
						{
							"logo": "https://qiniu-image.qtshe.com/1575466438843_844.png-100",
							"name": "王**"
						},
						{
							"logo": "https://qiniu-image.qtshe.com/1575466438843_844.png-100",
							"name": "蒋**"
						},
						{
							"logo": "https://qiniu-image.qtshe.com/1575432072276_579.png-100",
							"name": "满**"
						},
						{
							"logo": "https://qiniu-image.qtshe.com/1575466438843_844.png-100",
							"name": "李**"
						},
						{
							"logo": "https://qiniu-image.qtshe.com/1575466438843_844.png-100",
							"name": "赵**"
						},
						{
							"logo": "https://qiniu-image.qtshe.com/1575466438843_844.png-100",
							"name": "张**"
						},
						{
							"logo": "https://qiniu-image.qtshe.com/1575466438843_844.png-100",
							"name": "金**"
						},
						{
							"logo": "https://qiniu-image.qtshe.com/1575466438843_844.png-100",
							"name": "孙**"
						},
						{
							"logo": "https://qiniu-image.qtshe.com/1575466438843_844.png-100",
							"name": "吕**"
						},
						{
							"logo": "https://qiniu-image.qtshe.com/1575466339493_259.png-100",
							"name": "刘**"
						},
						{
							"logo": "https://qiniu-image.qtshe.com/1575466438843_844.png-100",
							"name": "黄**"
						},
						{
							"logo": "https://qiniu-image.qtshe.com/1638279864972_374.jpg-100",
							"name": "易**"
						},
						{
							"logo": "https://qiniu-image.qtshe.com/1575466455774_684.png-100",
							"name": "梁**"
						},
						{
							"logo": "https://qiniu-image.qtshe.com/1575466491243_708.png-100",
							"name": "秀**"
						},
						{
							"logo": "https://qiniu-image.qtshe.com/1582120756187_263.png-100",
							"name": "苏**"
						}
					],
					"welfare": "软件安装包",
					"welfareList": [{
						"imageMax": "https://qiniu-image.qtshe.com/other_welfare.png",
						"imageMin": "https://qiniu-image.qtshe.com/other_welfare.png-100",
						"imageName": "软件安装包"
					}]
				},
				showAll: !1,
				flag: !1,
				showRemind: !1,
				remainingApplyCount: '',
				userRemark: '',
				isSupportLifestyle: !1,
				positionId: '',
				source: '',
				visible: !1,
				famousList: [],
				recommendTips: '',
				isShowApplySure: !1,
				locationTownName: '',
				nowTownName: '',
				nowTownId: '',
				duration: '',
				routeType: '公交',
				routeMethods: [],
				current: 0,
				navList: [{
					text: '详情',
					type: 1
				}],
				navCurrent: 0,
				navTop: 148,
				navHeight: 40,
				isFixed: !1,
				reportSwiper: [],
				computedFlag: !1,
				qtbPrdUrl: '',
				healthVisible: !1,
				moduleList: [],
				recommendAllList: [],
				tuanContentPrompt: [],
				experienceConfig: {
					tips: '商家出现任何违规请及时投诉，我们承诺24小时处理完毕。核实工资受损，将启动保障流程，最高可赔3000元。',
					tel: '0571-56076688',
					step: [{
							title: '添加商家联系方式',
							desc: '报名后，请按照提示添加商家联系方式',
							showContact: !0
						},
						{
							title: '在线完成任务',
							desc: '根据引导，在线完成一些手机小任务，操作简单，5-10分钟即可完成一个',
							showContact: !1
						},
						{
							title: '截图提交',
							desc: '每个任务完成后，截图发给商家审核，若有不懂可随时询问客服',
							showContact: !1
						}
					],
					welfare: ['无底薪，按照实际完成任务量发放薪资，每个任务1-10元不等', '单个任务薪资和具体结算方式以和商家实际沟通为准'],
					reportTips: ['兼职过程若商家要求缴纳费用或押金，切勿缴费并第一时间向我们举报', '如遇联系不上商家，可直接联系青团社官方客服，客服联系方式：0571-xxxxx']
				},
				copyVisible: !1,
				guideVisible: !1,
				tabCurrent: 0,
				complaintPhotos: [],
				personalImageList: [],
				positionTags: [],
				hasLatitude: !1,
				appList: [{
						image: 'https://qiniu-image.qtshe.com/20200812safe1.png',
						text: '岗位严密审核',
						num: '11重'
					},
					{
						image: 'https://qiniu-image.qtshe.com/20200812safe2.png',
						text: '客服快速响应',
						num: '24小时'
					},
					{
						image: 'https://qiniu-image.qtshe.com/20200812safe3.png',
						text: '运营服务经验',
						num: '7年'
					},
					{
						image: 'https://qiniu-image.qtshe.com/20200812safe4.png',
						text: '官方先行垫付',
						num: '3000元'
					}
				],
				officialList: [{
						image: 'https://qiniu-image.qtshe.com/20200813icon1.png',
						text: '平台担保'
					},
					{
						image: 'https://qiniu-image.qtshe.com/20200813icon2.png',
						text: '工资保障'
					},
					{
						image: 'https://qiniu-image.qtshe.com/20200813icon3.png',
						text: '极速入职'
					},
					{
						image: 'https://qiniu-image.qtshe.com/20200813icon4.png',
						text: '管家服务'
					}
				],
				isInfoShowBtn: !0,
				isComputedInfo: !1,
				remindType: 0,
				hasEyeAuth: !1,
				isShowAll: !1,
				jobRequireList: [],
				bannerList: [],
				bannerCurrent: 0,
				fromRecommend: !1,
				companyFeatureList: [{
						icon: 'https://qiniu-image.qtshe.com/20201203_jobIcon1.png',
						title: '安全靠谱'
					},
					{
						icon: 'https://qiniu-image.qtshe.com/20201203_jobIcon2.png',
						title: '薪资日结'
					},
					{
						icon: 'https://qiniu-image.qtshe.com/20201203_jobIcon3.png',
						title: '闪电入职'
					},
					{
						icon: 'https://qiniu-image.qtshe.com/20201203_jobIcon4.png',
						title: '面试指导'
					}
				],
				rate: 0,
				videoAutoplay: !1,
				swiperAutoplay: !0,
				gateWay: {},
				countdownDesc: '00:00:00',
				payVisible: !1,
				sendData: {},
				applyId: '',
				successVisible: !1,
				finishCount: 0,
				deg: 0,
				point: 0,
				redpacketVisible: !1,
				guideReportVisible: !1,
				scrollFlag: !1,
				toastVisible: !1,
				browserSeconds: 10,
				rewardMoney: 0,
				actId: '',
				poinitTime: 10,
				coundownTimer: 10,
				guideReportDialogVisible: !1,
				jobDetailJson: {},
				descMore: !1,
				companyDescMore: !1,
				classMore: !1,
				busLine: '',
				chosenList: [],
				isOnlineCourse: !1,
				contactDialogShow: !1,
				contactInfo: {},
				contactInfoTime: '',
				onlineCourseIds: '10465,10467,10468,10469,10470,10471,10472',
				agreementVo: {},
				agreementVisible: !1,
				isDirect: !1,
				collectImg: ''
			};
		},
		onLoad(options) {
			this.initData();
		},
		methods: {
			initData() {
				this.collectImg = 'iconcollect';
				this.hasEyeAuth = !0;
				apiJobsList(1,10).then(res=>{
					this.moduleList = res;
				}).catch(err=>{
					console.log(err);
				})
			}
		}
	};
</script>

<style lang="scss">
	@import './partdetails.scss';
</style>
