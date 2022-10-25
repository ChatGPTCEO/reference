const install = (Vue, vm) => {

	vm.$u.api = {}
	
	//首页数据
	vm.$u.api.index = params => vm.$u.get('/api/index', params);
	//广场数据
	vm.$u.api.square = params => vm.$u.get('/api/index/square', params); 
	//消息列表
	vm.$u.api.message = params => vm.$u.get('/api/index/message',params);
	//用户中心
	vm.$u.api.user = params => vm.$u.get('/api/index/user',params);
	//下拉刷新（广场）
	vm.$u.api.pullDown = params => vm.$u.get('/api/index/refresh',params);
	//栏目分类
	vm.$u.api.category = params => vm.$u.get('/api/index/category', params); 
	//更多信息
	vm.$u.api.more = params => vm.$u.get('/api/index/more', params); 
	//帖子详情
	vm.$u.api.forumDetail = params => vm.$u.get('/api/detail/forum', params); 
	//用户详情
	vm.$u.api.userDetail = params => vm.$u.get('/api/detail/user', params); 
	
	
	//登录接口
	vm.$u.api.login = params => vm.$u.post('/api/user/login', params);
	//微信登录
	vm.$u.api.mpLogin = params => vm.$u.post('/api/user/mpLogin', params);
	//退出登录
	vm.$u.api.logout = () => vm.$u.post('/api/user/logout');
	//轮播图点击统计
	vm.$u.api.bannerCount = (params) => vm.$u.get('/api/operate/banner',params);
	
	// 评论接口
	vm.$u.api.comment = params => vm.$u.post('/api/operate/comment',params);
	// 点赞接口
	vm.$u.api.like = params => vm.$u.post('/api/operate/like',params);
	// 收藏接口
	vm.$u.api.collect = params => vm.$u.post('/api/operate/collect',params);
	// 关注接口
	vm.$u.api.focus = params => vm.$u.post('/api/operate/focus',params);
	
	//删除图片
	vm.$u.api.deleteImg = params => vm.$u.post('/api/operate/destroy', params);
	//发布接口
	vm.$u.api.publish = params => vm.$u.post('/api/operate/publish', params);
	//刷新接口
	vm.$u.api.refresh = params => vm.$u.get('/api/operate/refresh', params);
	//删除接口
	vm.$u.api.delete = params => vm.$u.get('/api/operate/delete', params);
	//搜索
	vm.$u.api.search = params => vm.$u.get('/api/operate/search',params);
	//更新资料
	vm.$u.api.profile = params => vm.$u.post('/api/operate/profile',params);
	//更新头像
	vm.$u.api.updateAvatar = params => vm.$u.post('/api/operate/avatar',params);
	//修改密码
	vm.$u.api.modify = params => vm.$u.post('/api/operate/modify',params);
	//设置用户名
	vm.$u.api.username = params => vm.$u.post('/api/operate/username',params);
	//列表数据
	vm.$u.api.getListData = params => vm.$u.get('/api/detail/list',params);
	//用户信息
	vm.$u.api.userInfo = params => vm.$u.get('/api/user/index',params);
	//获取电话
	vm.$u.api.getMobile = params => vm.$u.get('/api/operate/mobile',params);
	//微信获取手机号
	vm.$u.api.getPhone = params => vm.$u.post('/api/operate/getPhone',params);
	//作者签约
	vm.$u.api.signature = params => vm.$u.post('/api/operate/signature',params);
	//代理申请
	vm.$u.api.apply = params => vm.$u.post('/api/operate/apply',params);
	//申请记录
	vm.$u.api.record = params => vm.$u.get('/api/operate/record',params);
	//意见反馈
	vm.$u.api.feedback = params => vm.$u.post('/api/operate/feedback',params);
	//意见反馈
	vm.$u.api.help = params => vm.$u.get('/api/index/help',params);
}

export default {
	install
}
