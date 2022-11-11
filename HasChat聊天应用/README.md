

<h1 align="center">HasChat</h1>

<h5 align="center">基于uni-app+socket.io的聊天应用</h5>
<div align="center">

[![star](https://gitee.com/howcode/has-chat-app/badge/star.svg)](https://gitee.com/howcode/has-chat-app)  [![fork](https://gitee.com/howcode/has-chat-app/badge/fork.svg)](https://gitee.com/howcode/has-chat-app)  [![](https://img.shields.io/badge/QQ群-149091283-red)](https://jq.qq.com/?_wv=1027&k=XivFMfBQ)


```shell
无偿开源！你们的Star是我的动力！
```

------------------------------------------------------------------------
</div>

# 介绍
自我做的客服聊天以来，让我做一套聊天应用的呼声越来越多，加上那套客服聊天由于没有组件化、UI设计等问题，也让我一直心有遗憾做的不够完美，于是利用空余时间做了一套相对完整的聊天应用。HasChat 是一套使用全新技术完成的通讯聊天网页。

- [PC网页版前端：Vue3 + Vite + TypeScript + Naive UI + Socket.io](https://gitee.com/howcode/has-chat)
- [移动版前端：uni-app + Socket.io](https://gitee.com/howcode/has-chat-app)
- [后端：Express.js](https://gitee.com/howcode/has-chat-service)

作者开源目的旨在给刚学习该领域的新人一些引路，不管你是前端还是后端，都能对你在通讯聊天这个领域有一点点的启发。
# 预览图
![PC端](https://img-blog.csdnimg.cn/ef64ea7a09484131b1570e3c3c086fbd.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAaG93Y29kZXI=,size_20,color_FFFFFF,t_70,g_se,x_16#pic_center)

![PC端](https://img-blog.csdnimg.cn/f74d114a4b21465b9a02997aacce1edc.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAaG93Y29kZXI=,size_20,color_FFFFFF,t_70,g_se,x_16#pic_center)

![移动端](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-e9420bcd-26cd-4faf-b47a-9949982f7c41/f2b01df3-748e-4a20-9252-abd1fdf80ee7.jpg)
# 在线预览
[haschat-PC端](https://howcode.online/haschat)

[haschat-移动端](https://howcode.online/haschatapp)
# 功能一览
- 登陆、随机获取用户登陆
- 发送邮箱验证码注册
- 发送表情+文字组合的富文本内容
- 发送图片内容，查看大图
- enter发送信息，enter+ctrl换行输入内容
- 消息提醒
- 未读消息标记
- 记录历史会话
- 记录历史聊天内容
- 切换主题
- 发送视频
- 发送语音（仅移动端具备）
# 版本说明
- 前端：暂无版本区别
- 后端：分为mysql版本（分支main）和json版本（分支master）；json版本主要是为了不懂mysql的新手学习；
# 环境部署
```javascript
Node.Js >= 12.0.0
Mysql >= 5.7.0 (仅mysql版本需要，但执行mysql文件需要8.0以上版本)
```
## 下载项目
前端

```javascript
https://gitee.com/howcode/has-chat.git
```
后端 mysql版本
```javascript
git clone -b main https://gitee.com/howcode/has-chat-service.git
```
后端 json版本
```javascript
git clone -b master https://gitee.com/howcode/has-chat-service.git
```
## 启动项目
### 安装依赖
前、后端
```javascript
npm install
```
### mysql配置（json版本跳过）
- 在mysql的版本中，找到目录store下的sql文件，运行sql文件
![在这里插入图片描述](https://img-blog.csdnimg.cn/4cbe505a6cd344c5933359c36192c223.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAaG93Y29kZXI=,size_14,color_FFFFFF,t_70,g_se,x_16)![在这里插入图片描述](https://img-blog.csdnimg.cn/253ce4de33f84648a6d769041d8227d1.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAaG93Y29kZXI=,size_17,color_FFFFFF,t_70,g_se,x_16)
![在这里插入图片描述](https://img-blog.csdnimg.cn/c794583d2e7f41fc90447c57b0234057.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAaG93Y29kZXI=,size_20,color_FFFFFF,t_70,g_se,x_16)
![在这里插入图片描述](https://img-blog.csdnimg.cn/b02d0124c0624466982203208ddbaa03.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAaG93Y29kZXI=,size_17,color_FFFFFF,t_70,g_se,x_16)
- 依次运行两个sql文件，并且刷新数据库表就可看到了
![在这里插入图片描述](https://img-blog.csdnimg.cn/5d325c9a9b1b424ba8d57a04a3f8edc1.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAaG93Y29kZXI=,size_17,color_FFFFFF,t_70,g_se,x_16)
- 找到config.js文件

```javascript
const db = mysql.createConnection({
  host: "", // 主机地址 （默认：localhost）
  user: "", // 用户名
  password: "", // 密码
  database: "" // 数据库
})
```
更多配置查看：[nodejs-mysql](https://www.runoob.com/nodejs/nodejs-mysql.html)
### 邮箱配置（json版本跳过）
- 找到config.js文件
```javascript
emailConfig: { //邮箱配置
    host: "smtp.qq.com",//邮箱服务器  这里我用的QQ邮箱
    port: 465,//邮箱使用端口
    secure: true,//是否使用默认的465端口
    auth: {
      user: "", // 发送方邮箱地址
      pass: "" // smtp 验证码
    }
  }
```
详情使用可以查看该文章：[nodejs发送邮箱信息](https://www.cnblogs.com/kusaki/p/11801769.html)
### 启动项目/服务
- 后端
 ```javascript
node app.js
```
- 前端
```javascript
npm run dev
```
*到此，项目可以正常运行*

# 教程
[本地构建HasChat项目](https://www.bilibili.com/video/bv1iY411K7La)

# 项目目录

```javascript
haschat     
├── src            
│       └── api                    		  // 接口文件
│       └── assets						  // 资源文件
│			└── css					 	  // css样式
│			└── emo					 	  // 表情包
│			└── icon					  // 字体图标
│			└── img					 	  // 图片资源
│			└── mp3					 	  // 消息提示音频
│       └── class                      	  // 类文件
│       └── components                    // 组件
│			└── ChatContent.vue			  // 聊天窗口
│			└── ChatDomain.vue			  // 功能组件
│			└── ChatEditor.vue			  // 聊天输入框
│			└── ChatFoot.vue			  // 聊天框底部
│			└── ChatHead.vue			  // 聊天头部
│			└── ChatNav.vue				  // 菜单栏
│			└── HasChat.vue				  // 聊天入口
│       └── enums                         // 通用枚举
│       └── json                          // JSON数据处理
│       └── router                        // 路由
│       └── store                         // 数据仓库
│       └── utils                         // 工具
│       └── views                         // 页面
```

# 类文件
## User
| 字段               | 类型      | 描述             |
| ------------------ | --------- | ---------------- |
| Id                 | number    | 用户Id           |
| Name               | string    | 用户姓名         |
| NickName           | string    | 用户昵称         |
| OnlineState        | boolean   | 在线状态         |
| Mobile             | string    | 用户手机号       |
| Avatar             | string    | 用户头像         |
## Conversition
| 字段               | 类型      | 描述              |
| ------------------ | --------- | ----------------  |
| Id                 | number    | 内容Id            |
| SendId             | number    | 发送人Id          |
| ReciverId          | number    | 接受人Id          |
| Content            | string    | 内容              |
| Type               | number    | 类型              |
| State              | number    | 发送状态          |
| NoCode             | string    | 信息编号          |
| CreateDateUtc      | string    | 创建时间          |
| Title              | string    | 拓展功能字段      |
| Description        | string    | 拓展功能字段      |
| Label              | string    | 拓展功能字段      |
| Thumbnail          | string    | 拓展功能字段      |
| ReadFlag           | boolean   | 是否阅读          |
| Avatar             | string    | 发送者用户头像    |

# 请求api
## 1.获取用户信息
**参数**

`id`：用户Id，必传

**接口地址** : /api/getUserById
## 2.获取用户列表
**参数**

`id`：除去的用户Id，必传

**接口地址** : /api/userList
## 3.随机获取一条用户数据
**参数**

无

**接口地址** : /api/getRandomUser
## 4.登陆
**参数**

`email`：账户，必传

`password`：密码，必传

**接口地址** : /api/login
## 5.注册
**参数**

`email`：邮箱，必传

`name`：用户名，必传

`password`：密码，必传

`surePassword`：确认密码，必传

**接口地址** : /api/register
## 6.发送邮箱验证码
**参数**

`email`：邮箱，必传

`timestamp`：时间戳，自动携带

**接口地址** : /api/sendVerificationCode
## 7.校验邮箱验证码
**参数**

`verificationCode`：验证码，必传

`timestamp`：时间戳，自动携带

**接口地址** : /api/checkVerificationCode

# socket.io的api
## 1.加入聊天
**参数**

`SendId`：发送者Id，必传

`NoCode`：时间戳，自动携带

**调用方式**
```javascript
store.state.socket.emit("joinChat", {
  SendId: xxx,
  NoCode: xxx,
});
```
## 2.发送消息
**参数**

`Conversition`：发送内容对象（查看Conversition类），必传

`ReciverId`：接收者Id，必传

`SendId`：发送者Id，必传

**调用方式**
```javascript
store.state.socket.emit("sendMsg", {
  Conversition: xxx,
  ReciverId: xxx,
  SendId: xxx,
});
```
## 3.修改信息阅读状态
**参数**

`ReciverId`：接收者Id，必传

`SendId`：发送者Id，必传

**调用方式**
```javascript
store.state.socket.emit("changeMsgRead", {
  ReciverId: xxx,
  SendId: xxx,
});
```
## 4.新增历史会话
**参数**

`SendId`：发送者Id，必传

`Revicer`：接受者对象（可查看Use类），必传

**调用方式**
```javascript
store.state.socket.emit("insertHistorySession", {
  SendId: xxx,
  Revicer: xxx,
});
```
# 免责声明
一、本项目宗旨在于为广大的正在学习通讯方面的新手提供学习、思路

二、本项目资源全部免费分享，包括前端源码、后端转源码等。本项目不会利用任何资源进行任何的销售盈利活动。

三、任何情况下，因使用本项目进行违法犯罪的行为，本人不承担任何法律责任。
# 未来计划

- 发送图片上传到服务器，以src路径形式获取
- 发送视频功能（已完成）
- 群聊功能
- 发送语音功能（已完成）
- uni-app开发混合app/h5/小程序版本（已完成）

## 😊 捐助作者

<table>
	<tr>
		<td><img src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-e9420bcd-26cd-4faf-b47a-9949982f7c41/6b8532a9-46a0-4f1a-a0df-4ecc89498490.jpg" width="220"/></td>
		<td><img src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-e9420bcd-26cd-4faf-b47a-9949982f7c41/6dc29fd6-0a13-4858-ab62-85da29642b46.jpg" width="220" /></td>
	</tr>
</table>
<code>👍👍👍👍👍👍 您的捐助和赞赏，将会是作者howcode更好的维护动力！</code>