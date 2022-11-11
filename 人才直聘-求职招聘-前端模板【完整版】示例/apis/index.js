import http from "./http.js";
import config from "@/config/index.config.js";

// 获取OpenId
export const getOpenId = (data) => http.GET(`${config.baseUrl}/ums/getOpenId`, data);
// 绑定手机号
export const bindPhoneForWx = (data) => http.GET(`${config.baseUrl}/ums/bindPhoneForWx`, data);
// 小程序授权登录
export const xcxUserLogin = (data) => http.GET(`${config.baseUrl}/ums/xcxUserLogin`, data);
// 账号密码登录
export const memberLogin = (data) => http.GET(`${config.baseUrl}/ums/memberLogin`, data);
// 手机号验证码登录
export const memberLoginForCode = (data) => http.GET(`${config.baseUrl}/ums/memberLoginForCode`, data);
// 获取验证码
export const getVerifyCode = (data) => http.GET(`${config.baseUrl}/ums/getVerifyCode`, data);

// 获取用户资料
export const getUserInfo = (data) => http.GET(`${config.baseUrl}/ums/getMember`, data);
// 获取用户资料
export const getMemberBySn = (data) => http.GET(`${config.baseUrl}/ums/getMemberBySn`, data);

// 用户角色切换
export const switchRole = (data) => http.GET(`${config.baseUrl}/ums/switchRole`, data);
// 重新设置密码
export const resetPwd = (data) => http.POST(`${config.baseUrl}/ums/resetPwd`, data);


// 查询轮播图
export const getBanners = (data) => http.GET(`${config.baseUrl}/cms/ad/list`, data);
// 关于我们
export const getAboutUs = (data) => http.GET(`${config.baseUrl}/cms/aboutUs/detail`, data);
// 联系我们
export const getContactUs = (data) => http.GET(`${config.baseUrl}/cms/contactUs/detail`, data);
// 平台说明内容
export const getHelpDetail = (data) => http.GET(`${config.baseUrl}/cms/help/detail`, data);
// 查询公告列表
export const getNoticeList = (data) => http.GET(`${config.baseUrl}/cms/notice/list`, data);
// 查询公告详情
export const getNoticeDetail = (data) => http.GET(`${config.baseUrl}/cms/notice/detail`, data);
// 添加意见反馈
export const getFeedbackAdd = (data) => http.GET(`${config.baseUrl}/cms/feedback/add`, data);


// 查询行业列表
export const getIndustryList = (data) => http.GET(`${config.baseUrl}/bms/getIndustryList`, data);
// 查询职位列表
export const getPostList = (data) => http.GET(`${config.baseUrl}/bms/getPostList`, data);
// 查询热门职位列表
export const getHotPostList = (data) => http.GET(`${config.baseUrl}/bms/getHotPostList`, data);
// 查询福利列表
export const getWelfareList = (data) => http.GET(`${config.baseUrl}/bms/getWelfareList`, data);
// 查询职位列表
export const getPostPageList = (data) => http.GET(`${config.baseUrl}/bms/getPostPageList`, data);
// 查询城市列表
export const getCityList = (data) => http.GET(`${config.baseUrl}/bms/getCityList`, data);
// 查询学校列表
export const getSchoolList = (data) => http.GET(`${config.baseUrl}/bms/getSchoolList`, data);



// 查询简历信息
export const getResumeList = (data) => http.GET(`${config.baseUrl}/wms/getResumeList`, data);
// 查询简历完整信息
export const getResume = (data) => http.GET(`${config.baseUrl}/wms/getResume`, data);
// 查询简历基本信息
export const getResumeInfo = (data) => http.GET(`${config.baseUrl}/wms/getResumeInfo`, data);
//更新简历基本信息
export const updateResumeBasic = (data) => http.POST(`${config.baseUrl}/wms/updateResumeBasic`, data);

// 查询期望职位列表
export const getJobExpectList = (data) => http.GET(`${config.baseUrl}/wms/getJobExpectList`, data);
// 查询期望职位详情
export const getJobExpectDetail = (data) => http.GET(`${config.baseUrl}/wms/getJobExpectDetail`, data);
// 新增/更新期望职位
export const updateJobExpect = (data) => http.POST(`${config.baseUrl}/wms/updateJobExpect`, data);
// 删除期望职位
export const deleteJobExpectById = (data) => http.GET(`${config.baseUrl}/wms/deleteJobExpectById`, data);
// 导出简历
export const exportResumeWord = (data) => http.GET(`${config.baseUrl}/wms/exportWord`, data);
// 查询附件简历列表
export const getResumeFileList = (data) => http.GET(`${config.baseUrl}/wms/getResumeFileList`, data);
// 删除附件简历
export const deleteResumeFileById = (data) => http.GET(`${config.baseUrl}/wms/deleteResumeFileById`, data);


// 查询工作经历列表
export const getWorkExpList = (data) => http.GET(`${config.baseUrl}/wms/getWorkExpList`, data);
// 查询工作经历详情
export const getWorkExpDetail = (data) => http.GET(`${config.baseUrl}/wms/getWorkExpDetail`, data);
// 新增/更新工作经历
export const updateWorkExp = (data) => http.POST(`${config.baseUrl}/wms/updateWorkExp`, data);
// 删除工作经历
export const deleteWorkExpById = (data) => http.GET(`${config.baseUrl}/wms/deleteWorkExpById`, data);

// 查询项目经历列表
export const getProExpList = (data) => http.GET(`${config.baseUrl}/wms/getProExpList`, data);
// 查询项目经历详情
export const getProExpDetail = (data) => http.GET(`${config.baseUrl}/wms/getProExpDetail`, data);
// 新增/更新项目经历
export const updateProExp = (data) => http.POST(`${config.baseUrl}/wms/updateProExp`, data);
// 删除项目经历
export const deleteProExpById = (data) => http.GET(`${config.baseUrl}/wms/deleteProExpById`, data);

// 查询教育经历列表
export const getEduExpList = (data) => http.GET(`${config.baseUrl}/wms/getEduExpList`, data);
// 查询教育经历详情
export const getEduExpDetail = (data) => http.GET(`${config.baseUrl}/wms/getEduExpDetail`, data);
// 新增/更新教育经历
export const updateEduExp = (data) => http.POST(`${config.baseUrl}/wms/updateEduExp`, data);
// 删除教育经历
export const deleteEduExpById = (data) => http.GET(`${config.baseUrl}/wms/deleteEduExpById`, data);

// 查询公司列表
export const getCompanyList = (data) => http.GET(`${config.baseUrl}/rms/getCompanyList`, data);
// 查询公司列表(字段精简)
export const getCompanyListForSelect = (data) => http.GET(`${config.baseUrl}/rms/getCompanyListForSelect`, data);

// 新增/更新公司信息
export const updateCompany = (data) => http.POST(`${config.baseUrl}/rms/updateCompany`, data);
// 查询公司信息
export const getCompanyDetail = (data) => http.GET(`${config.baseUrl}/rms/getCompanyDetail`, data);
// 新增/更新职位信息
export const updatePosition = (data) => http.POST(`${config.baseUrl}/rms/updatePosition`, data);
// 公司认证
export const updateCompanyAuth = (data) => http.POST(`${config.baseUrl}/rms/updateAuth`, data);


// 查询职位信息
export const getPositionDetail = (data) => http.GET(`${config.baseUrl}/rms/getPositionDetail`, data);
// 查询公司职位列表
export const getCompanyPositionList = (data) => http.GET(`${config.baseUrl}/rms/getCompanyPositionList`, data);
// 删除公司职位
export const deletePositionById = (data) => http.GET(`${config.baseUrl}/rms/deletePositionById`, data);
// 查询职位列表
export const getPositionList = (data) => http.GET(`${config.baseUrl}/rms/getPositionList`, data);

// 查询课程列表
export const getCourseList = (data) => http.GET(`${config.baseUrl}/course/getCourseList`, data);
// 查询课程详情
export const getCourseDetail = (data) => http.GET(`${config.baseUrl}/course/getCourseDetail`, data);
// 课程报名
export const applyCourse = (data) => http.POST(`${config.baseUrl}/course/applyCourse`, data);
// 查询我的课程列表
export const getApplyCourseList = (data) => http.GET(`${config.baseUrl}/course/getApplyCourseList`, data);


// 查询外包任务列表
export const getTaskList = (data) => http.GET(`${config.baseUrl}/task/getTaskList`, data);
// 查询外包任务列表
export const getMyTaskList = (data) => http.GET(`${config.baseUrl}/task/getMyTaskList`, data);

// 查询外包任务详情
export const getTaskDetail = (data) => http.GET(`${config.baseUrl}/task/getTaskDetail`, data);
// 新增/更新外包任务信息
export const updateTask = (data) => http.POST(`${config.baseUrl}/task/addOrUpdateTask`, data);
// 删除外包任务
export const deleteTaskById = (data) => http.GET(`${config.baseUrl}/task/deleteTask`, data);
// 外包任务报名
export const applyTask = (data) => http.POST(`${config.baseUrl}/task/applyTask`, data);
// 查询我的任务列表
export const getApplyTaskList = (data) => http.GET(`${config.baseUrl}/task/getApplyTaskList`, data);

// 查询收藏列表
export const getCollectList = (data) => http.GET(`${config.baseUrl}/collect/getCollectList`, data);
// 查询收藏详情
export const getCollectDetail = (data) => http.GET(`${config.baseUrl}/collect/getCollectDetail`, data);
// 新增/更新收藏信息
export const updateCollect = (data) => http.POST(`${config.baseUrl}/collect/addOrUpdateCollect`, data);
// 删除收藏
export const deleteCollectById = (data) => http.POST(`${config.baseUrl}/collect/deleteCollect`, data);

// 查询职位申请列表
export const getApplyList = (data) => http.GET(`${config.baseUrl}/apply/getApplyList`, data);
// 查询职位申请详情
export const getApplyDetail = (data) => http.GET(`${config.baseUrl}/apply/getApplyDetail`, data);
// 新增/更新职位申请
export const updateApply = (data) => http.POST(`${config.baseUrl}/apply/addOrUpdateApply`, data);
// 更新简历状态
export const updateApplyStatus = (data) => http.POST(`${config.baseUrl}/apply/updateApplyStatus`, data);
// 删除职位申请
export const deleteApplyById = (data) => http.POST(`${config.baseUrl}/apply/deleteApply`, data);
// 添加职位申请查看记录
export const updateApplyRead = (data) => http.POST(`${config.baseUrl}/apply/addApplyRead`, data);


// 查询浏览记录列表
export const getBrowseList = (data) => http.GET(`${config.baseUrl}/browse/getBrowseList`, data);
// 查询看过我列表
export const getVisitList = (data) => http.GET(`${config.baseUrl}/browse/getVisitList`, data);
// 查询浏览记录详情
export const getBrowseDetail = (data) => http.GET(`${config.baseUrl}/browse/getBrowseDetail`, data);
// 新增/更新浏览记录
export const updateBrowse = (data) => http.POST(`${config.baseUrl}/browse/addOrUpdateBrowse`, data);
// 删除浏览记录
export const deleteBrowseById = (data) => http.POST(`${config.baseUrl}/browse/deleteBrowse`, data);

// 查询沟通记录列表
export const getCommList = (data) => http.GET(`${config.baseUrl}/comm/getCommList`, data);
// 查询沟通记录详情
export const getCommDetail = (data) => http.GET(`${config.baseUrl}/comm/getCommDetail`, data);
// 新增/更新沟通记录
export const updateComm = (data) => http.POST(`${config.baseUrl}/comm/addOrUpdateComm`, data);
// 删除沟通记录
export const deleteCommById = (data) => http.POST(`${config.baseUrl}/comm/deleteComm`, data);

// 查询分享记录列表
export const getShareList = (data) => http.GET(`${config.baseUrl}/share/getShareList`, data);
// 查询分享记录详情
export const getShareDetail = (data) => http.GET(`${config.baseUrl}/share/getShareDetail`, data);
// 新增/更新分享记录
export const updateShare = (data) => http.POST(`${config.baseUrl}/share/addOrUpdateShare`, data);
// 删除分享记录
export const deleteShareById = (data) => http.POST(`${config.baseUrl}/share/deleteShare`, data);

// 查询交易明细
export const getFinanceList = (data) => http.GET(`${config.baseUrl}/finance/getFinanceList`, data);
// 查询提现记录
export const getWithdrawList = (data) => http.GET(`${config.baseUrl}/finance/getWithdrawList`, data);
// 查询账户余额
export const getAccountDetail = (data) => http.GET(`${config.baseUrl}/finance/getAccountDetail`, data);
// 提现申请
export const withdrawApply = (data) => http.POST(`${config.baseUrl}/finance/withdrawApply`, data);

// 查询法律法规列表
export const getLawList = (data) => http.GET(`${config.baseUrl}/cms/law/list`, data);
// 查询法律法规列详情
export const getLawDetail = (data) => http.GET(`${config.baseUrl}/cms/law/detail`, data);

// 查询屏蔽公司列表
export const getShieldList = (data) => http.GET(`${config.baseUrl}/shield/getShieldList`, data);
// 新增/更新屏蔽公司
export const updateShield = (data) => http.POST(`${config.baseUrl}/shield/addOrUpdateShield`, data);
// 删除屏蔽公司
export const deleteShieldById = (data) => http.POST(`${config.baseUrl}/shield/deleteShield`, data);

// 查询常见问题列表
export const getChatAskList = (data) => http.GET(`${config.baseUrl}/chat/getChatAskList`, data);
// 查询回复信息
export const getChatReply = (data) => http.GET(`${config.baseUrl}/chat/getChatReply`, data);
// 查询智能聊天记录
export const getRobotLogList = (data) => http.GET(`${config.baseUrl}/chat/getRobotLogList`, data);
// 新增智能聊天记录
export const addRobotLog = (data) => http.POST(`${config.baseUrl}/chat/addRobotLog`, data);

// 文件上传
export const uploadFile = (data) => http.POST(`${config.baseUrl}/file/upload`, data);
// 简历附件上传
export const uploadResumeFile = (data) => http.POST(`${config.baseUrl}/file/uploadResumeFile`, data);

// 用户登录
export const postLogin = (data) => http.POST(`${config.baseUrl}/ums/xcxUserLogin`, data);
// 获取短信验证码
export const getMsgCode = (data) => http.GET(`${config.baseUrl}/register/sendMsg`, data);
// 校验注册验证码
export const postRegCode = (data) => http.POST(`${config.baseUrl}/register/verifySMSCode`, data);


// 获取卡片信息
export const getCardBin = (data) => http.GET(`${config.baseUrl}/card/getCardBin`, data);
// 图片上传
export const upload = (data) => http.POST(`${config.baseUrl}/register/upImg`, data);
// 图片下载
export const downloadImg = (data) => http.GET(`${config.baseUrl}/my/downloadImg`, data);
