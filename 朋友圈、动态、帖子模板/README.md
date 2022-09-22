# 项目介绍

## 主架构 uniapp

###	介绍 
-	组件使用easycom模式 cl-*(可在pages里面修改)
-	演示项目使用了[项目基础脚手架](https://ext.dcloud.net.cn/plugin?id=4797)
-	项目使用的是uview1.0

###	plugins  
-	路由 ->  [uni-simple-router](https://hhyang.cn/v2/)
-	ui框架 ->  [uview](http://uviewui.com/)
-	api请求 ->  [uview自带api请求](http://uviewui.com/js/http.html)
-	图标 ->  [Iconfont](https://www.iconfont.cn/)

###	项目结构

```
├─apis					// 接口管理
│  ├─http.api 			// 请求接口
│  │  └─modules 		// api模块化目录
│  ├─user 				// 模拟user模块
│  └─http.interceptor 	// 拦截器
├─common				// 公共方法库
│  ├─config 			// 环境配置 (设置baseurl等)
│  ├─extend 			// 扩展原型方法
│  ├─filters 			// 全局过滤器
│  ├─tools 				// 全局公共方法
│  └─router 			// 路由文件
├─components			// 组件库
│  ├─cl-test			// easycom测试组件 (示例使用可删除)
│  └─cl-icon			// iconfont图标库
├─store					// vuex
│  ├─$u.mixin			// store全局混入方法
│  └─index				// vuex
└─uview-ui				// uview1.0
```
###	使用方式
-	直接看demo吧 这里我就不罗嗦了




