/* 
 * 路由表对象：
 * 该文件挂载在Vue原型中 $mRoutesConfig
 * 作用：调用$mRouter对象的方法 传入以下对应的路由对象，详细见common目录下的router.js
 * 示例：this.$mRouter.push({route:this.$mRoutesConfig.main,query:{a:1}})
 * 注意：所有在pages目录下新建的页面都必须在"路由表"中进行声明，并且在框架的pages.json注册。
 * 
 * 配置参数项说明： 
 * name:可选配置 （路由名称）
 * path:必填配置 （路由地址）
 * requiresAuth:可选配置 （是否权限路由）
 */

export default {
	index: {
		name: "首页",
		path: "/pages/index/index"
	},

	search: {
		name: "搜索",
		path: "/pages/index/search"
	},

	type: {
		name: "分类",
		path: "/pages/type/type"
	},

	industry: {
		name: "行业选择",
		path: "/pages/common/industry"
	},

	post: {
		name: "职位选择",
		path: "/pages/common/post"
	},

	positionList: {
		name: "岗位列表",
		path: "/pages/position/list"
	},

	shareList: {
		name: "共享用工",
		path: "/pages/position/shareList"
	},

	taskList: {
		name: "外包任务",
		path: "/pages/position/taskList"
	},

	taskDetail: {
		name: "外包任务详情",
		path: "/pages/position/taskDetail"
	},

	taskApply: {
		name: "立即报名",
		path: "/pages/position/taskApply"
	},

	positionDetail: {
		name: "职位详情",
		path: "/pages/position/detail"
	},

	positionSearch: {
		name: "职位搜索",
		path: "/pages/position/search"
	},

	companyList: {
		name: "公司列表",
		path: "/pages/company/list"
	},

	resumeList: {
		name: "简历列表",
		path: "/pages/company/resumeList"
	},

	companyDetail: {
		name: "公司详情",
		path: "/pages/company/detail"
	},

	//个人简历相关
	personReume: {
		name: "个人简历",
		path: "/pages/user/person/resume",
		requiresAuth: true
	},

	resumeFile: {
		name: "附件简历",
		path: "/pages/user/person/resume-file",
		requiresAuth: true
	},

	resumeDetail: {
		name: "个人简历",
		path: "/pages/user/person/resumeDetail",
		requiresAuth: true
	},
	resumePreview: {
		name: "简历预览",
		path: "/pages/user/person/resume-preview",
		requiresAuth: true
	},
	editSkill: {
		name: "个人优势",
		path: "/pages/user/person/edit-skill",
		requiresAuth: true
	},
	editExpect: {
		name: "求职期望",
		path: "/pages/user/person/edit-expect",
		requiresAuth: true
	},
	editWork: {
		name: "工作经历",
		path: "/pages/user/person/edit-work",
		requiresAuth: true
	},
	editWorkContent: {
		name: "工作内容",
		path: "/pages/user/person/edit-work-content",
		requiresAuth: true
	},
	editPro: {
		name: "项目经历",
		path: "/pages/user/person/edit-pro",
		requiresAuth: true
	},
	editProContent: {
		name: "添加项目内容",
		path: "/pages/user/person/edit-pro-content"
	},
	editEdu: {
		name: "教育经历",
		path: "/pages/user/person/edit-edu"
	},
	editCert: {
		name: "资格证书",
		path: "/pages/user/person/edit-cert"
	},

	enter: {
		name: "公司入驻",
		path: "/pages/user/company/enter",
		requiresAuth: true
	},
	companyAuth: {
		name: "公司认证",
		path: "/pages/user/company/auth",
		requiresAuth: true
	},
	company: {
		name: "公司信息",
		path: "/pages/user/company/company"
	},
	positions: {
		name: "职位管理",
		path: "/pages/user/company/positions"
	},
	positionEdit: {
		name: "职位编辑",
		path: "/pages/user/company/position-edit"
	},
	positionPreview: {
		name: "职位预览",
		path: "/pages/user/company/position-preview"
	},

	tasks: {
		name: "外包任务管理",
		path: "/pages/user/company/tasks"
	},
	taskPreview: {
		name: "外包任务预览",
		path: "/pages/user/company/task-preview"
	},
	taskEdit: {
		name: "外包任务编辑",
		path: "/pages/user/company/task-edit"
	},

	courseList: {
		name: "课程列表",
		path: "/pages/course/list"
	},

	courseDetail: {
		name: "课程详情",
		path: "/pages/course/detail"
	},

	login: {
		name: "登录",
		path: "/pages/login/login"
	},
	loginPwd: {
		name: "密码登录",
		path: "/pages/login/loginPwd"
	},

	forgetPwd: {
		name: "忘记密码",
		path: "/pages/login/forgetPwd"
	},
	resetPwd: {
		name: "重置密码",
		path: "/pages/login/resetPwd",
		requiresAuth: true
	},
	reg: {
		name: "注册",
		path: "/pages/login/reg"
	},

	wallet: {
		name: "我的钱包",
		path: "/pages/user/finance/wallet",
		requiresAuth: true
	},
	rule: {
		name: "提现规则",
		path: "/pages/user/finance/rule",
		requiresAuth: true
	},
	withdraw: {
		name: "提现",
		path: "/pages/user/finance/withdraw",
		requiresAuth: true
	},
	withdrawLog: {
		name: "提现记录",
		path: "/pages/user/finance/withdrawLog",
		requiresAuth: true
	},
	records: {
		name: "交易明细",
		path: "/pages/user/finance/records",
		requiresAuth: true
	},


	// 权限路由
	user: {
		name: "个人中心",
		path: "/pages/user/user",
		requiresAuth: true
	},

	userInfo: {
		name: "基本信息",
		path: "/pages/user/userInfo",
		requiresAuth: true
	},
	uUserInfo: {
		name: "修改基本信息",
		path: "/pages/user/uUserInfo",
		requiresAuth: true
	},

	system: {
		name: "系统设置",
		path: "/pages/user/common/system"
	},

	aboutUs: {
		name: "关于我们",
		path: "/pages/user/common/aboutUs"
	},

	contactUs: {
		name: "联系我们",
		path: "/pages/user/common/contactUs"
	},

	collect: {
		name: "我的收藏",
		path: "/pages/user/common/collect",
		requiresAuth: true
	},

	connected: {
		name: "已沟通过",
		path: "/pages/user/common/connected",
		requiresAuth: true
	},

	browse: {
		name: "浏览记录",
		path: "/pages/user/common/browse",
		requiresAuth: true
	},

	apply: {
		name: "我的投递",
		path: "/pages/user/common/apply",
		requiresAuth: true
	},
	course: {
		name: "我的课程",
		path: "/pages/user/common/course",
		requiresAuth: true
	},
	share: {
		name: "我的分享",
		path: "/pages/user/common/share",
		requiresAuth: true
	},
	task: {
		name: "我的任务",
		path: "/pages/user/common/task",
		requiresAuth: true
	},
	visitme: {
		name: "谁看过我",
		path: "/pages/user/common/visitme",
		requiresAuth: true
	},
	terms: {
		name: "用户协议",
		path: "/pages/user/common/terms",
	},
	privacy: {
		name: "隐私政策",
		path: "/pages/user/common/privacy",
	},
	hideSetting: {
		name: "隐藏设置",
		path: "/pages/user/common/hideSetting",
	},
	robot: {
		name: "自动客服",
		path: "/pages/user/service/robot",
	},

	addShield: {
		name: "添加屏蔽公司",
		path: "/pages/user/common/addShield",
	},
	officePreview: {
		name: "文件预览",
		path: "/pages/user/common/office-preview"
	},
	notices: {
		name: "系统消息",
		path: "/pages/chat/notice/notices",
		requiresAuth: true
	},
	noticeDetail: {
		name: "消息详情",
		path: "/pages/chat/notice/noticeDetail",
		requiresAuth: true
	},
	privateChat: {
		name: "聊天",
		path: "/pages/chat/privateChat",
		requiresAuth: true
	},

	lawList: {
		name: "技能知识",
		path: "/pages/law/law",
		requiresAuth: false
	},

	lawDetail: {
		name: "详情",
		path: "/pages/law/lawDetail",
		requiresAuth: false
	},


}
