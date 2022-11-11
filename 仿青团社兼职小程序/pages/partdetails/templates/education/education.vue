<template>
	<view>
		<template name="education">
			<view class="common-header education-header pb16">
				<view class="common-header-title">{{ partJobVo.title }}</view>
				<view class="common-list-tag list-tag-box"
					v-if="partJobVo.labelList.descLabels && partJobVo.labelList.descLabels.length > 0">
					<view class="list-tag" v-if="label.labelName"
						v-for="(label, index) in partJobVo.labelList.descLabels" :key="label.labelName">
						<view class="ellipsis">{{ label.labelName }}</view>
					</view>
				</view>
				<view @tap="skiptoWebview" class="common-safe ptp_exposure_static" data-ptpid="69a4-1137-8c63-fcc7"
					id="pid=69a4-1137-8c63-fcc7">
					<view class="common-safe-left">
						<view class="iconfont iconsafeguard"></view>
						<image lazyLoad class="common-safe-image" src="https://qiniu-image.qtshe.com/20200812safe.png">
						</image>
						<view>放心投递 兼职无忧</view>
					</view>
					<view class="iconfont iconarrow"></view>
				</view>
				<view @tap="jumpRecommenList"
					:class="'ptp_exposure_static ' + (partJobVo.labelRecommend[0].tagType === 2 ? 'recommendmodalSchool' : 'recommendmodal')"
					:data-jobLineType="partJobVo.jobLineType"
					:data-jumpCode="partJobVo.labelRecommend[0].tagType === 2 ? partJobVo.labelRecommendEntrance.schoolCode : partJobVo.labelRecommendEntrance.business_area_id"
					:data-ptpid="'99fc-1f72-b7f0-1b65-education-' + partJobVo.labelRecommend[0].tagType"
					:data-tagType="partJobVo.labelRecommend[0].tagType"
					:id="'pid=99fc-1f72-b7f0-1b65-education-' + partJobVo.labelRecommend[0].tagType"
					v-if="partJobVo.labelRecommend.length && partJobVo.labelRecommend[0].tagType !== 1">
					<view class="TitleGradient"></view>
					<view class="iconfont iconarrow arrowposition labelRecommendIcon"></view>
					<view class="recommendRankTitle">
						<image class="recommendmodalIcon" mode="widthFix" :src="
                                partJobVo.labelRecommend[0].tagType === 2
                                    ? 'https://qiniu-image.qtshe.com/recommend/recommendSchoolTitle.png'
                                    : 'https://qiniu-image.qtshe.com/%20recommend/recommendTitle.png'
                            "></image>
						<view class="recommendArea">
							<view :class="
                                    partJobVo.labelRecommendEntrance.ranking === 1 || partJobVo.labelRecommendEntrance.job_rnk === 1
                                        ? 'recommendRankIcon'
                                        : partJobVo.labelRecommendEntrance.ranking === 2 || partJobVo.labelRecommendEntrance.job_rnk === 2
                                        ? 'recommendRankIcon2'
                                        : partJobVo.labelRecommendEntrance.ranking === 3 || partJobVo.labelRecommendEntrance.job_rnk === 3
                                        ? 'recommendRankIcon3'
                                        : 'recommendRankIcon4'
                                "
								v-if="partJobVo.labelRecommendEntrance.ranking <= 7 || partJobVo.labelRecommendEntrance.job_rnk <= 7">
								{{ partJobVo.labelRecommendEntrance.ranking || partJobVo.labelRecommendEntrance.job_rnk }}
							</view>
							<view class="recommendAreaDes">
								{{ partJobVo.labelRecommendEntrance.schoolName || partJobVo.labelRecommendEntrance.business_area
                                }}{{
                                    partJobVo.labelRecommendEntrance.ranking <= 30 || partJobVo.labelRecommendEntrance.job_rnk <= 30
                                        ? '·第' + (partJobVo.labelRecommendEntrance.ranking || partJobVo.labelRecommendEntrance.job_rnk) + '名'
                                        : ''
                                }}
							</view>
						</view>
					</view>
					<view class="recommendModalViewer">
						{{
                            (partJobVo.labelRecommendEntrance.userNum || partJobVo.labelRecommendEntrance.area_stat_value) +
                            (partJobVo.labelRecommendEntrance.userNum ? '人最近活跃' : '人最近浏览过该商圈')
                        }}
					</view>
				</view>
			</view>
			<view class="common-box">
				<view class="common-desc-box common-desc-box-top">
					<view class="iconfont iconcomputer"></view>
					不限时间地点
				</view>
				<view class="common-desc-box common-desc-box-top bt" v-if="partJobVo.requireList.length">
					<view class="iconfont iconnote_confirm"></view>
					<view class="common-desc-right">
						<view class="common-desc-right-box">岗位要求</view>
						<view class="common-desc-right-text mt10">
							<block v-for="(item, index) in partJobVo.requireList" :key="index">
								<text style="margin-left: 8rpx; margin-right: 8rpx; font-size: 24rpx"
									v-if="index > 0">|</text>

								{{ item }}

								<text @tap="healthVisibleControl" class="iconfont iconquestion1" :data-index="index"
									data-ptpid="917e-1900-b017-74db" id="pid=917e-1900-b017-74db"
									v-if="item === '需要健康证'"></text>
							</block>
						</view>
					</view>
				</view>
			</view>
			<view class="common-title">培训详情</view>
			<view class="common-box">
				<view :class="'detail-info-box ' + (isInfoShowBtn ? '' : 'detail-info-show')">
					<view class="detail-info-text">{{ partJobVo.jobDesc }}</view>
				</view>
				<view @tap="infoBtnTap" class="detail-info-btn" data-ptpid="decb-1a0f-b6c4-339f"
					v-if="isInfoShowBtn && isComputedInfo">
					展开
					<view class="iconfont iconarrow_down"></view>
				</view>
				<view class="common-user-box mt32" v-if="partJobVo.entryCount > 0">
					<view class="common-user-number">{{ partJobVo.entryCount }}人已报名</view>
					<scroll-view class="common-user-scroll" :scrollX="true">
						<image lazyLoad class="common-user-img"
							:src="item.logo || 'https://qiniu-image.qtshe.com/default-avatar20190717.png'"
							v-for="(item, index) in partJobVo.users" :key="item.logo"></image>
					</scroll-view>
				</view>
			</view>
			<view class="common-title">{{ partJobVo.company.companyType === 2 ? '发布者' : '发布企业' }}</view>
			<view :class="'common-box ' + (partJobVo.company.isOfficialAccount || partJobVo.company.companyType === 2 || (partJobVo.company.companyType === 1 && hasEyeAuth) ? 'pb0' : '')
                ">
				<view @tap="jumpToCompany" class="common-company ptp_exposure_static" data-ptpid="c4e6-18fa-96fc-d96d"
					id="pid=c4e6-18fa-96fc-d96d">
					<view class="common-company-box">
						<image lazyLoad class="common-company-logo"
							:src="partJobVo.company.logo || 'https://qiniu-image.qtshe.com/company_default_5.4.png'">
						</image>
						<view class="common-company-main">
							<view class="common-company-name ellipsis">{{ partJobVo.company.name }}</view>
							<view @Tap.stop.prevent="showRemindModel"
								class="common-company-auth ptp_exposure_static ignoreT2"
								data-ptpid="49af-1548-98e1-0ce6" :data-type="0" id="pid=49af-1548-98e1-0ce6"
								v-if="partJobVo.company.companyType === 1 && !partJobVo.company.isOfficialAccount">
								<view class="iconfont iconverified company-icon-blue"></view>
								<view>企业认证</view>
								<image class="common-company-auth-icon" mode="scaleToFill"
									src="https://qiniu-image.qtshe.com/20210106_icon.png"
									v-if="partJobVo.company.companyLabelType === 1"></image>
								<image class="common-company-auth-icon2" mode="scaleToFill"
									src="https://qiniu-image.qtshe.com/20210106_icon2.png"
									v-if="partJobVo.company.companyLabelType === 2"></image>
							</view>
							<view @Tap.stop.prevent="showRemindModel" class="common-company-auth ignoreT2"
								data-ptpid="3d21-11c9-b793-bc3b" :data-type="1"
								v-if="partJobVo.company.companyType === 2 && !partJobVo.company.isOfficialAccount">
								<view class="iconfont iconverified company-icon-yellow"></view>
								<view>个人认证</view>
							</view>
							<view class="common-company-auth ignoreT2" v-if="partJobVo.company.isOfficialAccount">
								<view class="iconfont iconverified company-icon-green"></view>
								<view>官方认证</view>
								<image class="common-company-auth-icon" mode="scaleToFill"
									src="https://qiniu-image.qtshe.com/20210106_icon.png"
									v-if="partJobVo.company.companyLabelType === 1"></image>
								<image class="common-company-auth-icon2" mode="scaleToFill"
									src="https://qiniu-image.qtshe.com/20210106_icon2.png"
									v-if="partJobVo.company.companyLabelType === 2"></image>
							</view>
						</view>
					</view>
					<view class="iconfont iconarrow" v-if="hasEyeAuth"></view>
				</view>
				<view class="official-box"
					v-if="partJobVo.company.isOfficialAccount || partJobVo.company.companyType === 2 || (partJobVo.company.companyType === 1 && hasEyeAuth)">
					<block v-if="partJobVo.company.isOfficialAccount">
						<view class="official-item" v-for="(item, index) in officialList" :key="item.text">
							<image lazyLoad class="official-image" :src="item.image" v-if="item.image"></image>
							{{ item.text }}
						</view>
					</block>
					<view class="official-item" v-else>
						<block
							v-if="partJobVo.company.companyType === 2 || (partJobVo.company.companyType === 1 && hasEyeAuth)">
							<view class="iconfont iconconfirm_round"></view>
							{{ partJobVo.company.companyType === 1 ? '已通过天眼查认证' : '已通过实名认证' }}
						</block>
					</view>
				</view>
				<view class="official-text" v-if="agreementVo.result === 1 || agreementVo.result === 2">
					{{ agreementVo.remark }}
				</view>
			</view>
			<view class="common-title" v-if="chosenList.length">入选专区</view>
			<view @tap="_universalJump" class="chosen-inner-item single ptp_exposure_static" :data-item="chosenList[0]"
				data-ptpid="jk73-ms82-m38s-dea1-1"
				:data-remark="'param_' + chosenList[0].param + '&jumpKey_' + chosenList[0].jumpKey"
				v-if="chosenList.length === 1">
				<view class="single-box">
					<image class="logo"
						:src="chosenList[0].type === 1 ? 'https://qiniu-image.qtshe.com/entrance/bd_small.png' : chosenList[0].icon">
					</image>
					<view>
						<view class="title ellipsis">{{ chosenList[0].name }}</view>
						<view class="desc">{{ chosenList[0].content }}</view>
					</view>
				</view>
				<view class="btn orange" v-if="chosenList[0].type === 1">进入榜单</view>
				<view class="btn green" v-else>进入专区</view>
			</view>
			<scroll-view scrollX class="chosen-scroll-box" v-if="chosenList.length > 1">
				<view @tap="_universalJump" class="chosen-list-item ptp_exposure_static" :data-index="index"
					:data-item="item" data-ptpid="jk73-ms82-m38s-dea1"
					:data-remark="'param_' + item.param + '&jumpKey_' + item.jumpKey" v-if="index <= 9"
					v-for="(item, index) in chosenList" :key="item.param">
					<view class="chosen-inner-item">
						<image class="logo"
							:src="item.type === 1 ? 'https://qiniu-image.qtshe.com/entrance/bd_small.png' : item.icon">
						</image>
						<view>
							<view class="title ellipsis">{{ item.name }}</view>
							<view class="desc">{{ item.content }}</view>
							<view class="btn orange" v-if="item.type === 1">进入榜单</view>
							<view class="btn green" v-else>进入专区</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</template>
	</view>
</template>

<script>
	export default {
		props: {
			partJobVo: {
				type: Object,
				default: {}
			},
			chosenList: {
				type: Array,
				default: []
			},
			tabCurrent: {
				type: Number,
				default: 0
			},
			hasEyeAuth: {
				type: Boolean,
				default: !1
			},
			isShowAll: {
				type: Boolean,
				default: !1
			},
			agreementVo: {
				type: Object,
				default: {}
			}
		},
		data() {
			return {
				isInfoShowBtn: true,
				isComputedInfo: false,
			}
		},
		created() {
			console.log('初始化页面');
			this.initData();
		},
		methods: {
			initData() {
				this.getInfoHeight();
			},
			// 判断是否显示更多
			getInfoHeight: function() {
				uni.createSelectorQuery().in(this).select('.detail-info-text').boundingClientRect(res1 => {
					uni.createSelectorQuery().in(this).select('.detail-info-box').boundingClientRect(res2 => {
						if (res1 && res2 && res1.height && res2.height) {
							this.isInfoShowBtn = res1.height > res2.height;
							this.isComputedInfo = true;
						} else {
							this.isInfoShowBtn = false;
							this.isComputedInfo = true;
						}
					}).exec();
				}).exec();
				
			},
			// 点击更多
			infoBtnTap: function() {
				this.isInfoShowBtn = false;
			},
			// 跳转到公司
			jumpToCompany: function() {
				if (this.hasEyeAuth) {
					uni.navigateTo({
						url: "/pages/company/company?companyId=" + this.partJobVo.company.companyId
					});
				}
			},
		}
	}
</script>

<style lang="scss">
	@import './education.scss';
</style>
