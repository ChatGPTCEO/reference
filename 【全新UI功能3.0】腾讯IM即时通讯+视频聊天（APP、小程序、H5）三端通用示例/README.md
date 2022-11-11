# uniapp-tx-tim

#### git

gitee：https://gitee.com/jinbiaode/uniapp-tx-tim
分支：1.0 分支 - 1.0 版本
分支：2.0 分支 - 2.0 新版本

#### --------------1.0 版本介绍

gitee：https://gitee.com/jinbiaode/uniapp-tx-tim
分支：1.0 分支

此项目是 uniapp 的腾讯 im，一套代码三端用（APP\小程序\H5） 可直接使用，传入 uid 跳转会话页面即可聊天

功能： 1.聊天 2.群组 3.加入群聊 4.新建群聊 5.黑名单 6.好友、群组

#### 1.0 使用

使用方式：

1.下载

2.配置腾讯秘钥 前往腾讯 im：https://console.cloud.tencent.com/im-detail 中查看 im 应用的 SDKAppID 及密钥；
在项目中配置 appid: 项目位置在 /static/utils/GenerateTestUserSig.js 中需要更换成自己的秘钥和 \_SDKAPPID、\_SECRETKEY

启动项目 调试

初次使用的账号为 user0 user1 user2 user3 user4 user5

#### --------------2.0 版本介绍

gitee：https://gitee.com/jinbiaode/uniapp-tx-tim
分支：master 分支

功能： 1.聊天 2.群组 3.加入群聊 4.新建群聊 5.黑名单 6.好友、群组

本次升级，重新调整了 uniapp 的结构，采用分包形式 /im 分包；

2.0 升级内容：
1.im 采用分包注入 /im 分包；

2.采用 uview UI；

3.优化修复视频通话和语音通话；

4.修复若干 bug；

5.兼容 H5、小程序 修复若干问题（目前 app 端还存在问题，在随后修复，可以先用 1.0 版本）；

#### 2.0 初次使用

使用方式：

1.下载

2.配置腾讯秘钥 前往腾讯 im：https://console.cloud.tencent.com/im-detail 中查看 im 应用的 SDKAppID 及密钥；
在项目中配置 appid: 项目位置在分包 /im/utils/im/GenerateTestUserSig.js 中需要更换成自己的秘钥和 \_SDKAPPID、\_SECRETKEY

启动项目 调试

初次使用的账号为 user0 user1 user2 user3 user4 user5

3.使用 2.0 如何快速移入项目？
本次 2.0 采用分包，直接拖动分包/im 到自己项目，并复制 main.js\uni.scss\store\等文件 快速迁移到自己项目即可；

#### 帮助

im 及时通讯一直是前端的难题，是一个重量级功能，特此创建了 uniapp-腾讯 im 互助交流群

QQ 群：179675595，欢迎大家加入讨论互助；

#### 定制

1.承接定制各类 im 通讯功能；

2.承接各类高端 APP、小程序、H5 项目，定制联系群主的 QQ：270315475；
