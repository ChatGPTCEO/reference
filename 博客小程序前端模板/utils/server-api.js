// const SERVER_HOST = "http://192.168.2.13:8001"
// const SERVER_HOST = "http://192.168.31.243:8001"
const SERVER_HOST = "https://www.azhou.cloud/blog"
const BASE_URL = SERVER_HOST + '/smart' 


const APIURL = {
	// 首页相关
	getBanner: BASE_URL.concat('/index/banner'), // 首页轮播图获取
	getSubject: BASE_URL.concat('/index/subject'), // 专题获取
	getBlogs: BASE_URL.concat('/index/blogs'), // 文章获取
	getProject: BASE_URL.concat('/index/project'), // 推荐项目获取
	getBlogBySubjectId: BASE_URL.concat('/index/subject/'), // 根据专题ID获得文章列表
	// 文章相关
	getBlogType: BASE_URL.concat('/blog/type'), // 获取文章分类
	getBlogDetail: BASE_URL.concat('/blog/'), // 获取文章详情
	blogPage: BASE_URL.concat('/blog/page'), // 分页获取文章
	getRank: BASE_URL.concat('/index/rank'), // 排行榜获取
	getBlogComment: BASE_URL.concat('/blog/comment/'), // 根据文章获取评论
	// 项目相关
	getProjectType: BASE_URL.concat('/project/type'), // 获取项目分类
	getProjectTags: BASE_URL.concat('/project/tags'), // 获取项目标签
	getProjectDetail: BASE_URL.concat('/project/'), // 获取项目详情
	projectPage: BASE_URL.concat('/project/page'), // 分页获取项目
	// 软件相关
	softwarePage: BASE_URL.concat('/software/page'), // 分页获取软件
	// 用户相关
	smartSendCode: BASE_URL.concat('/user/send/code'), // 发送短信验证码
	userLogin: BASE_URL.concat('/user/login'), // 登录
	addComment: SERVER_HOST.concat('/blog/comment/insert'), // 添加评论
	delComment: SERVER_HOST.concat('/blog/comment/del'), // 删除评论
	saveCustom: SERVER_HOST.concat('/user/save/custom'), // 保存定制
	attentionBlog: SERVER_HOST.concat('/user/attention/blog/'), // 关注或取消文章
	existAttentionBlog: SERVER_HOST.concat('/user/exist/attention/blog/'), // 检验是否关注该文章
	userInfoByToken: SERVER_HOST.concat('/sys/user'), // 根据token获得用户信息
	likeBlog: SERVER_HOST.concat('/user/like/blog/'), // 点赞
	existLikeBlog: SERVER_HOST.concat('/user/exist/like/blog/'), // 是否点赞该文章
	getUserCustomer: SERVER_HOST.concat('/user/project/customer'), // 获得用户的定制
	delUserCustomer: SERVER_HOST.concat('/user/project/customer/'), // 删除用户的定制
	getUserLikePage: SERVER_HOST.concat('/user/like/page/'), // 获得用户的点赞
	getUserCollectPage: SERVER_HOST.concat('/user/collect/page/'), // 获得用户的收藏
	updateSmartUserInfo: SERVER_HOST.concat('/sys/user/smart/update'), // 修改用户
	saveMessage: BASE_URL.concat('/user/message'), // 留言
	// 搜索
	search: BASE_URL.concat('/search'), // 全站搜索
	// 文件上传
	getPolicy: SERVER_HOST.concat('/upload/way'), // 获得签名
	// 系统配置
	sysConfig: SERVER_HOST.concat('/smart/sys/config'), // 获取系统配置
}
module.exports.APIURL = APIURL;
