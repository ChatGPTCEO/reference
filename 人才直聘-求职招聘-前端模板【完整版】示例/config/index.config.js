const CONFIG = {
        //开发环境配置
        development: {
                loginTitleTxt: "欢迎使用人才直聘", // 登录页标题
                copyrightTxt: "人才直聘v1.0", // 版本信息
                assetsPath: "/static/img", // 静态资源路径
                // baseUrl: "http://localhost:8099/api,//小程序请选用该地址调试"
				baseUrl: "/api",//H5请选用该地址调试
                tokenKey: "WECHAT_TRADE", // 登录标识
                testOpenId: "oEjRxwy7jL9PgG0kWeb4VcDTZEas", // 小程序测试openId
                forcedLogin: false, // touristMode游客模式下APP是否强制用户登录 场景：当用户进入登录页面后无法后退。
                touristMode: true, // APP是否开启游客模式， 游客模式true开启：APP打开后可以进入首页和无权限的页面，游客模式false关闭：APP打开后首先需要登录才能进入， 此时forcedLogin配置项失效。
        },

        //生产环境配置
        production: {
                loginTitleTxt: "人才直聘", // 登录页标题
                copyrightTxt: "人才直聘v1.0", // 版本信息
                assetsPath: "/static/img", // 静态资源路径
				// baseUrl: "http://192.168.0.106:8092/api",
                baseUrl: "https://job.qinkonglan.cn/api",
                tokenKey: "WECHAT_TRADE", // 登录标识
                testOpenId: "oEjRxwy7jL9PgG0kWeb4VcDTZEas", // 小程序测试openId
                forcedLogin: false, // touristMode游客模式下APP是否强制用户登录 场景：当用户进入登录页面后无法后退。
                touristMode: true, // APP是否开启游客模式， 游客模式true开启：APP打开后可以进入首页和无权限的页面，游客模式false关闭：APP打开后首先需要登录才能进入， 此时forcedLogin配置项失效。
        }

}
export default CONFIG[process.env.NODE_ENV];
