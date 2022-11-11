



## 此插件不再提供下载，
下架插件的原因：
1. Disucz!Q已经彻底的挂了，不管谁接手除非彻底重构，不然也很难起死回生。
建议官方的现有功能满足你就用，不满足换程序，不然得投入很多时间和金钱在二开修复上。
2. 开源此插件的本意是可以让更多人参与进来完善，但大部分都是拿了源码就走。
3. 很多人免费拿到插件，都没有二开就直接倒卖，卖也无所谓，但是还把服务都推到我这边。
4. 在维护和回答插件问题上花的时间太多，但是目前通过插件获得的收益不足百元。
5. 使用人数不多是最主要的原因，使用的人少就意味着形不成互帮互助的氛围，有任何问题都得我一遍一遍的回复。

基于以上原因，决定下载此插件，之前下载的可以继续使用，自行保存好源码。可以二开后自用或者出售，不用给我提成，但是请做好服务。
本人不再解答任何关于本插件的问题，如果有定制需求，请先整理好需求文档和预算再加我。




## DiscuzQ多端小程序和APP
![DiscuzQ多端小程序和APP](https://img-cdn-aliyun.dcloud.net.cn/stream/plugin_screens/b1308b70-eac9-11ec-889d-5375acec07b3_0.png?image_process=quality,q_70/format,webp&v=1655095167)

### 介绍
Discuz!Q生成多端小程序和APP。
基于DiscuzQ!3.0版本API，使用UNIAPP框架重构，暂时没有做登录互动和支付相关功能。

本来计划找人合作完善后发布，但是找了几十个都是拿了源码就没有后续了。
希望开源出来后能有人参与完善。

###  软件架构
DiscuzQ!3.0 + Uniapp

###  安装教程

1.  必须先安装好DiscuzQ!3.0 [点击查看安装文档](https://discuz.com/docs/)，并且有一定的内容。如需要二开或增加接口，可以看看[官方api文档](https://developer.discuz.chat/#/api/)
2.  如果要使用评论功能 请关闭后台的腾讯云——验证码，暂时没有接入验证码 
3.  将源码导入hbuilderx，并安装[sass插件](https://ext.dcloud.net.cn/plugin?name=compile-node-sass)
4.  修改/utils/config.js下的内容，并保存

```
const Domain = "discuz.chat";//网站域名
const WebsiteName = "Discuz!Q站长圈"; //网站名称
const Wechat = "微信：poisonkid ";//帖子页 联系方式
const Notice = "/pages/thread/thread?id=48991";//我的页面 官方公告 比如https://discuz.chat/thread/48991的id就是48994
const About = "/pages/user/user?id=27652";//我的页面 关于我们
const Update = "/pages/list/list?id=6&name=官方动态";//我的页面 更新日志id 
const Chaad = "adunit-bb0c7ed29c490a71";// 插屏广告id 不用写
const PageCount = '10'; //每页文章数目 
const WebType= '1'; //webview开关 1为开启 0为关闭 开启后帖子详情页和用户中心会使用网页版 不建议每个端都开启 根据自己需求开启 
const _home_data = {  
	banner() {
		return [

			{
				image: '/static/1.png',//轮播图图片网址
				// plugin-private://wx34345ae5855f892d/pages/productDetail/productDetail?productId=1145653
				path: '/pages/thread/thread?id=50494',//轮播图跳转的帖子
			}, {
				image: '/static/2.png',//轮播图图片网址
				path: '/pages/thread/thread?id=54569',//轮播图跳转的帖子
			}, {
				image: '/static/3.png',//轮播图图片网址
				path: '/pages/thread/thread?id=48991',//轮播图跳转的帖子
			}
		];
	},
	nav1() {
		return [{
			id: 1,
			name: '图库',
			bgcolor: 'orange',
			path: '/pages/media/image',
			img: '/static/photo.png',
		}, {
			id: 2,
			name: '视频',
			color: 'orange',
			path: '/pages/media/video',
			img: '/static/video.png',
		}, {
			id: 3,
			name: '音频',
			color: '',
			path: '/pages/media/audio',
			img: '/static/music.png',
		}, {
			id: 4,
			name: '文件',
			color: '',
		path: '/pages/media/file',
			img: '/static/files.png',
		} ,  ];
	}, 
 	nav2() {
 		return [  {
 			id: 1,
 			name: '直播LIVE',
 			color: '',
 			path: 'plugin-private://wx2b03c6e691cd7370/pages/live-player-plugin?room_id=2',
 			img: '/static/music.png',
 		}, {
 			id: 2,
 			name: '在线商城',
 			color: '',
 		path: 'plugin-private://wx34345ae5855f892d/pages/productDetail/productDetail?productId=1145653',
 			img: '/static/files.png',
 		} ];
 	}, 
 };  
```
4.  点击顶部的发行到各端即可 不会发布的可以看看[uniapp官方教程](https://uniapp.dcloud.net.cn/quickstart-hx.html)




###  常见问题
###  
1. 有没有视频教程？

如果有录制的话会发布到[哔哩哔哩](https://space.bilibili.com/404046614)

2. 为什么不能发布评论？

目前我已经做了错误提示，如果不能发布会提示错误的code和文字
对照[DZQ官方的发表评论文档](https://developer.discuz.chat/#/api/post:_api_v3_posts.create)查看原因


常见的原因： 1.开启了全局——腾讯云——验证码，关闭即可 2.设置了用户权限 用户——用户角色——操作权限给予发表评论的权限 3. 设置了安全策略 用户——用户角色——安全设置 全部取消勾选(也可以让用户在电脑端验证后再评论)

###  定制说明
 
**不备注的不要加  没有运营站点的不要加   整理好需求文档和预算再加我** 
 
微信：poisonkid【备注 **dzqapp付费定制 ** 】 
本人不再解答任何关于本插件的问题，如果有定制需求，请先整理好需求文档和预算再加我。
 
**不备注的不要加  没有运营站点的不要加   整理好需求文档和预算再加我** 
   
 