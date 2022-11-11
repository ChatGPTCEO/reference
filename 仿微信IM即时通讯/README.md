**文档最新更新时间：****2021年03月29日**

**文档最新更新内容：****更新【参考文档：插件配置说明】**

**文档线上更新地址：**[https://shimo.im/docs/XRkgJOKZ41UrFbqM](https://shimo.im/docs/XRkgJOKZ41UrFbqM?fileGuid=GKhVWY0fijocIgy4)

![图片](https://uploader.shimo.im/f/HCovaXXFScyNU05H.png!thumbnail?fileGuid=GKhVWY0fijocIgy4)


## 前言

该软件为付费软件，故此处发布源码为部分功能，完整代码请联系作者购买。

该软件为前后端分离软件，需要购买后端源码+前端源码结合使用，后台可通过下方【参考文档】提交免费试用。

后端源码为SaaS应用，购买后可以多开出无限个即时通讯软件平台，结合前端uni-app源码，您可以一次部署就能发布无数个完全不同的即时通讯软件，数据完全隔离，功能完全独立，并可自由定义功能和界面。

## 
## 参考文档

### 后台试用申请：[https://chat.gxit.org/app/index.php?i=4&c=entry&m=swa_supersale&do=app&r=whotalkcloud.trial](https://chat.gxit.org/app/index.php?i=4&c=entry&m=swa_supersale&do=app&r=whotalkcloud.trial&fileGuid=GKhVWY0fijocIgy4)

### 二次开发参考：

**1.拓展插件开发手册：**[https://www.yuque.com/shenwa/whotalk/lnctag](https://www.yuque.com/shenwa/whotalk/lnctag?fileGuid=GKhVWY0fijocIgy4)

**2.二开后升级教程：**[https://shimo.im/docs/1lq7MK9Lv0ILblAe/](https://shimo.im/docs/1lq7MK9Lv0ILblAe/?fileGuid=GKhVWY0fijocIgy4)

**3.****第三方系统自动登录:**[https://shimo.im/docs/m4kMLZnwMKUYQMqD](https://shimo.im/docs/m4kMLZnwMKUYQMqD?fileGuid=GKhVWY0fijocIgy4)

### 插件配置说明：

**1.智能AI机器人客服：**[https://shimo.im/docs/47kgJ91wYQF9Z4qV](https://shimo.im/docs/47kgJ91wYQF9Z4qV?fileGuid=GKhVWY0fijocIgy4)

## 安装说明

### 安装教程参考

    1. **通过微擎站点安装Whotalk：**[https://shimo.im/docs/XRkgJOXJLVCrFbqM/](https://shimo.im/docs/XRkgJOXJLVCrFbqM/?fileGuid=GKhVWY0fijocIgy4)《微擎安装及购买Whotalk详细流程》
    2. **通过镜像一键安装Whotalk：**[https://shimo.im/docs/7OAYV45OrMhXFb3D/](https://shimo.im/docs/7OAYV45OrMhXFb3D/?fileGuid=GKhVWY0fijocIgy4)《镜像搭建Laravel+Whotalk详细流程》

也可以咨询售后客服，**微擎系统相关的使用和安装请**[联系微擎客服](http://wpa.qq.com/msgrd?v=3&uin=3222162191&site=qq&menu=yes&fileGuid=GKhVWY0fijocIgy4)。

### 第三方接入参考

    1. **接入微信公众号：**[https://shimo.im/docs/dOq5Mj5YwmsdFDql](https://shimo.im/docs/dOq5Mj5YwmsdFDql?fileGuid=GKhVWY0fijocIgy4)
    2. **接入微信支付：**[https://shimo.im/docs/REkKVZL7GwtjFQqx](https://shimo.im/docs/REkKVZL7GwtjFQqx?fileGuid=GKhVWY0fijocIgy4)
    3. **接入支付宝支付：**
    4. **接入uni-push推送：**[https://ask.dcloud.net.cn/article/35622](https://ask.dcloud.net.cn/article/35622?fileGuid=GKhVWY0fijocIgy4)
## 
## 配置说明

安装好Whotalk后，软件会进行默认参数设置，原则上打开前台就能使用，但如果需要使用更强大的功能，还需要到后台的【系统设置】做如下配置。

**注：这里说的后台是指模块的后台，不是微擎站点的后台。**

**注：此处的配置说明仅列出部分主要配置，其余设置项请参考演示站的设置**

**注：系统内部分功能需要接入微信公众号后才可使用，**[点此查看公众号接入微擎流程](https://shimo.im/docs/dOq5Mj5YwmsdFDql?fileGuid=GKhVWY0fijocIgy4)

演示站后台地址：[http://mp.whotalk.gxit.org/](http://mp.whotalk.gxit.org/?fileGuid=GKhVWY0fijocIgy4)

演示站账号：**管理员**

演示站密码：**请咨询客服**

### 一、配置socket服务器

安装好模块后，如果需要在聊天、群聊时实时接收到即时消息，需要到模块后台的【系统设置】→【域名设置】→【域名设置】里设置socket服务器地址：

    * **本地SOCKET（推荐）**
        * 官方提供永久免费的SOCKET服务器及接口
            * SOCKET地址：wss://socket.whotalk.com.cn/wss
            * SOCKET接口：https://socket.whotalk.com.cn/api/message/sendMessageToUser
        * 如需自行搭建SOCKET服务器请联系售后群管理员付费安装
        * **注：该SOCKET需要加载组件后才可正常使用**
    * [腾讯云TIM](https://url.cn/5ASq8et?fileGuid=GKhVWY0fijocIgy4)**（不推荐）**
        * 到[腾讯云IM控制台](https://url.cn/5ASq8et?fileGuid=GKhVWY0fijocIgy4)创建应用

![图片](https://uploader.shimo.im/f/xlbVDtBSoEg48Lil.png!thumbnail?fileGuid=GKhVWY0fijocIgy4)

        * 添加账号管理员

![图片](https://uploader.shimo.im/f/7UZZAZrpwxgVKOXv.png!thumbnail?fileGuid=GKhVWY0fijocIgy4)

        * 复制应用的**SDKAppID、密钥、帐号管理员用户名**，填写到模块的后台即可开始使用，**无需其它设置****（注：如果您的密钥是“**非对称式加密**”方式的话，您需要转换为“**HMAC-SHA256**”方式加密之后再复制）**

![图片](https://uploader.shimo.im/f/NuZOn9GO40gNinWT.png!thumbnail?fileGuid=GKhVWY0fijocIgy4)

![图片](https://uploader.shimo.im/f/bAYBcPwPKo8PBcuz.png!thumbnail?fileGuid=GKhVWY0fijocIgy4)

![图片](https://uploader.shimo.im/f/myij6QAlyrI5CSYU.png!thumbnail?fileGuid=GKhVWY0fijocIgy4)

    * **其它第三方（已弃用）**

![图片](https://uploader.shimo.im/f/KysgrnbvDAspVr0E.png!thumbnail?fileGuid=GKhVWY0fijocIgy4)

注：此处可以填写第三方或者您自己搭建的socket服务器地址，基于稳定性和隐私安全性考虑，我们建议您自己搭建socket服务器（相关的搭建手册我们会在新的版本推出），如果您没有socket服务器，**可以直接复制演示站的其它第三方配置信息**。

### 二、配置视频转码

详细步骤请参考（配置说明的第一条）：[https://shimo.im/docs/aBAYV4doRmhry53j](https://shimo.im/docs/aBAYV4doRmhry53j?fileGuid=GKhVWY0fijocIgy4)

### 三、配置附件格式大小及远程附件

不同手机录制视频和图片的格式都不同，请您在使用前到站点后台的【站点设置】→【附件设置】设置附件支持的格式和尺寸。

![图片](https://uploader.shimo.im/f/ewqaV5egrjMOA5PD.png!thumbnail?fileGuid=GKhVWY0fijocIgy4)

常见的图片格式：gif jpg jpeg png webp bmp

常见的音视频格式：mp3 ogg mp4 rm rmvb avi m3u8 3gp awm aroute wav aac amr vod mov

**注：附件格式设置是每行一个，不要直接复制粘贴**

**注：附件格式设置是每行一个，不要直接复制粘贴**

**注：附件格式设置是每行一个，不要直接复制粘贴**

**注：此处的文件大小受服务器的PHP上传设置限制，如果您需要上传更大的文件，除了此处的设置外，可能还需要修改PHP的设置并重启服务器，详细请咨询您的服务器管理员。**

### 四、配置前端域名（已弃用）

前端域名的作用是将前台和后台域名分离，可以避免后台域名的暴露，同时在前台域名遭到一些平台的屏蔽时，后台仍可正常使用且不影响业务的进展。

配置前端域名前只**需要将域名像后台域名一样解析到网站的根目录**，然后将域名填入后台的【系统设置】→【参数设置】→【域名设置】的“前端绑定域名”设置项内即可。

**注：如需要使用公众号自动登录功能请到微信公众平台将此域名设置为公众号的【网页授权域名】**

![图片](https://uploader.shimo.im/f/gO02inNwJN4oJvoU.png!thumbnail?fileGuid=GKhVWY0fijocIgy4)

### 五、配置分享域名（已弃用）

分享域名的作用是在生成二维码和分享到微信、QQ时，自动将网址替换为特定的跳转网址，该网址仅供跳转，别无它用，这样就可以确保当前端域名被一些平台屏蔽时，更换前端域名后，原来的分享链接和二维码仍然是可以正常使用的（活码分享）。

**配置分享域名需要将域名解析到网站目录内的  /addons/xfy_whotalk/redirect.php 文件，并将此域名配置到微信公众平台的【JS接口安全域名】**

![图片](https://uploader.shimo.im/f/Bj4W607qgME9UA7g.png!thumbnail?fileGuid=GKhVWY0fijocIgy4)

**注：此功能需要设置前端域名后才能使用**

**注：将域名解析到文件的原理很简单，就是先解析到服务器，然后为这个域名创建一个站点，站点的目录和微擎目录是同一个，再修改服务器的站点配置文件的****DocumentRoot 参数****，把原来默认站点根目录的路径改为模块的主目录，同时修改站点的默认文件为****redirect.php****即可，以WDCP为例：**

    1. 解析域名到服务器：略
    2. 创建站点：参考上面【安装说明】→【三、安装微擎】的创建站点环节，**其中目录请先填写和微擎站点相同的目录，然后默认文件请填写********redirect.php**![图片](https://uploader.shimo.im/f/yKdsaGUVz0Id8cuz.png!thumbnail?fileGuid=GKhVWY0fijocIgy4)
    3. 修改站点的配置文件：在WDCP面板的【文件管理】→【apache配置】，找到**“分享域名.conf”**文件，点击后面的“编辑”按钮![图片](https://uploader.shimo.im/f/mxq5ExFHWGgJMuut.png!thumbnail?fileGuid=GKhVWY0fijocIgy4)
    4. 找到里面的 DocumentRoot 参数，在后面的路径后面再加上**/addons/xfy_whotalk/**然后保存![图片](https://uploader.shimo.im/f/YChFysll70EWXuWM.png!thumbnail?fileGuid=GKhVWY0fijocIgy4)
    5. 保存后点击右侧菜单的【系统管理】→【服务重启】→【重启WEB】，来重新启动Apache即可完成。**配置完成后，直接访问分享域名，如果出现如下显示则说明配置成功，如果不是，请按步骤排查一下即可。**![图片](https://uploader.shimo.im/f/2bPSO69bl4Y5hcVv.png!thumbnail?fileGuid=GKhVWY0fijocIgy4)
### 六、配置短信发送

当前短信服务使用的是[阿里云短信通道（点此申请）](https://promotion.aliyun.com/ntms/yunparter/invite.html?userCode=v99u8qju&fileGuid=GKhVWY0fijocIgy4)，开通好短信服务后，需要申请AccessKey、短信签名、短信模板，申请好后填写到后台的【系统设置】→【参数设置】→【短信设置】即可。

**阿里云短信 AccessKey 生成步骤：**

![图片](https://uploader.shimo.im/f/qHjohT91IdkdzxfC.png!thumbnail?fileGuid=GKhVWY0fijocIgy4)

![图片](https://uploader.shimo.im/f/TRcXpnyTZsw4Q2Sp.png!thumbnail?fileGuid=GKhVWY0fijocIgy4)

![图片](https://uploader.shimo.im/f/JvpYRTMA5EgpiOl7.png!thumbnail?fileGuid=GKhVWY0fijocIgy4)

![图片](https://uploader.shimo.im/f/zPZ0D8lXXSYUsPVM.png!thumbnail?fileGuid=GKhVWY0fijocIgy4)

**注：申请模板时，模板内容请参照：****“您的验证码：${code}，请不要把验证码泄露给任何人。如非本人操作请忽略”****（不含引号，其中的 ${code} 不能缺少）**

### 七、配置邮件发送

到微擎站点的平台页面内，从左侧的菜单中进入【配置】→【参数配置】→【邮件通知参数】，根据提示开启邮箱服务器即可。

![图片](https://uploader.shimo.im/f/HzhKcJWm1vomerdI.png!thumbnail?fileGuid=GKhVWY0fijocIgy4)

### 八、配置模板消息通知

此功能需要已认证的公众号才能使用，设置步骤如下：

1. 在微信公众号后台申请开通模板消息功能

![图片](https://uploader.shimo.im/f/qYKPMfSeQ8k1ZblR.png!thumbnail?fileGuid=GKhVWY0fijocIgy4)

未开通的需要申请开通，申请后一般需要1-3天才通过审核并正式开通

注：申请时分类请选择**IT科技/互联网|电子商务**

2. 开通后请进入模板库添加一个模板

![图片](https://uploader.shimo.im/f/cfWb3pbK9YgzxowZ.png!thumbnail?fileGuid=GKhVWY0fijocIgy4)

找到合适的模板后，点击后面的【详情】按钮，然后点击详情页里的【添加】按钮

![图片](https://uploader.shimo.im/f/7tX7yNhqtbshJ65D.png!thumbnail?fileGuid=GKhVWY0fijocIgy4)

注：选择模板时，请选择和您的使用场景相符的模板即可，任何模板都可以。**选择有三条关键字（分别是昵称、时间、内容）的模板最佳。**

3. 添加好模板后，会自动生成一串模板ID，将此处的模板ID复制粘贴填到模块后台的【系统设置】→【参数设置】→【聊天设置】→【模板消息通知】

![图片](https://uploader.shimo.im/f/89AKKtDhOls1OESI.png!thumbnail?fileGuid=GKhVWY0fijocIgy4)

![图片](https://uploader.shimo.im/f/Mp18hYrvit843TSC.png!thumbnail?fileGuid=GKhVWY0fijocIgy4)

### 九、配置群聊权限

该功能主要用于限制不同等级用户的创群、加群限制，后期会提供更全面的限制，如好友数量限制等。

![图片](https://uploader.shimo.im/f/s5YvdC8lfmQDMXue.png!thumbnail?fileGuid=GKhVWY0fijocIgy4)

### 十、配置附近的人、发送位置功能

* **配置发送位置功能**
    * 发送位置功能依赖腾讯地图，需要到后台的【系统管理】→【参数设置】→【通讯设置】中配置“腾讯地图KEY”

![图片](https://uploader.shimo.im/f/k4CFKyBfxXHVpFr5.png!thumbnail?fileGuid=GKhVWY0fijocIgy4)

**注：申请腾讯地图KEY时，请务必在启用产品选择“****WebServiceAPI****”和“****地图SDK ( Android/iOS )****”**

![图片](https://uploader.shimo.im/f/KuClRnzNxW4rueZa.png!thumbnail?fileGuid=GKhVWY0fijocIgy4)


* **配置附近的人功能**
    * 安装插件

到后台的【插件管理】安装【用户排行榜】插件

![图片](https://uploader.shimo.im/f/laLshl49mA6nLwvn.png!thumbnail?fileGuid=GKhVWY0fijocIgy4)

    * 新建排行榜

进入【用户排行榜】插件，点击【添加排行榜按钮】

![图片](https://uploader.shimo.im/f/ayH8VeXHSyAtn6Um.png!thumbnail?fileGuid=GKhVWY0fijocIgy4)

排行类型选择“附近的人”，其它选项按需填写

![图片](https://uploader.shimo.im/f/YCklyfPPgMzuC09F.png!thumbnail?fileGuid=GKhVWY0fijocIgy4)

    * 复制入口链接

创建好排行榜后，在列表即可复制排行榜的入口链接，可以将链接放到任何地方，如导航、广告等。

![图片](https://uploader.shimo.im/f/mCDgphK6ldEo3gKK.png!thumbnail?fileGuid=GKhVWY0fijocIgy4)

**注：非微信内浏览器访问位置需要依赖腾讯地图定位，为了提高获取定位准确率，请在**【系统管理】→【参数设置】→【通讯设置】中配置“腾讯地图KEY”

![图片](https://uploader.shimo.im/f/09XcFCVmh5z4xJIp.png!thumbnail?fileGuid=GKhVWY0fijocIgy4)



### 十一、安装SG11拓展

具体步骤请参考：[https://blog.csdn.net/u012664897/article/details/93616578](https://blog.csdn.net/u012664897/article/details/93616578?fileGuid=GKhVWY0fijocIgy4)

### 十二、制作小程序

注：此处小程序制作教程相当于在小程序内打开网页（将网页打包在小程序内），可单独作为一个小程序，也可以嵌入到其它小程序中。

注：官方已推出原生小程序，如需要制作请联系客服。

1. 进入售后群，从群文件下载  “**wxapp_sdk.zip**” 并解压
2. 解压后复制**pages**文件夹粘贴到您的小程序源码的根目录
3. 修改**/pages/whotalk/index.js**文件，将原来的**whotalkurl**后的链接修改为**您的模块首页网址**

![图片](https://uploader.shimo.im/f/MXwogrsV4Yca0yPO.png!thumbnail?fileGuid=GKhVWY0fijocIgy4)

![图片](https://uploader.shimo.im/f/iZC3kHteLhUBjwfK.png!thumbnail?fileGuid=GKhVWY0fijocIgy4)

4. 将您的域名添加到的微信开放平台的【开发设置】☞【业务域名】里

![图片](https://uploader.shimo.im/f/cNvb097lpE0GLldU.png!thumbnail?fileGuid=GKhVWY0fijocIgy4)

5. 此时模块功能在您的小程序内的页面地址是**/pages/whotalk/index**您可以在小程序的其它页面做导航跳转到此页面，也可以通过公众号菜单直接跳转到此页面，也可以到微信开放平台的【开发设置】☞【扫普通二维码打开小程序】设置通过链接和扫码方式直接跳转小程序

![图片](https://uploader.shimo.im/f/KiuswwJU408eEKrw.png!thumbnail?fileGuid=GKhVWY0fijocIgy4)

![图片](https://uploader.shimo.im/f/i3mu3RCMJ88TBfhP.png!thumbnail?fileGuid=GKhVWY0fijocIgy4)

6. 上传小程序源码并提交审核即可
### 十三、制作安卓/iOS客户端

**请**[点击这里](https://chat.gxit.org/app/index.php?i=4&c=entry&m=swa_supersale&do=app&r=whotalkcloud.post&fileGuid=GKhVWY0fijocIgy4)**开始自助制作原生APP，插件版的用户可以通过后台直接生成封装APP**

**注：APP制作必须通过上述的渠道或者后台提交制作申请才能正常使用APP功能，使用其它方式制作的APP很可能无法使用，同时我们不提供其相关的售后服务。**

**注：制作iOS客户端后，苹果手机安装时不能像安卓一样直接下载安装包进行安装，而是要进行如下操作后才能正常安装使用：**

1. **上架到App Store**

上架到App Store的应用可通过以下链接安装客户端：**itms-apps://itunes.apple.com/app/apple-store/id****您的APPID******，您可以将该链接制作成二维码，苹果手机扫码即可安装。也可以把它作为超链接放在任何网页上，苹果用户点击后即可下载。

2. **未上架到App Store****（注：未上架的iOS客户端需要购买企业签名后，普通苹果手机才能正常使用，否则只能在越狱的苹果手机上安装使用）**
    1. 将制作好后的ipa安装包上传到服务器，并确保可以通过网址访问这个文件；
    2. [点击这里下载PLIST文件](https://chat.gxit.org/addons/appstore.plist?fileGuid=GKhVWY0fijocIgy4)（注：部分浏览器点击后直接显示文件内容，这时候直接按**Ctrl+S**键保存文件即可，保存的时候注意后缀名如果是**.txt**的话就要把后面的**.txt**去掉）；
    3. 用编辑器编辑保存的**appstore.plist**文件，修改文件里面的五个地方，如图所示：

![图片](https://uploader.shimo.im/f/SL9npwyrQhwHKUE1.png!thumbnail?fileGuid=GKhVWY0fijocIgy4)

    4. 保存修改后的appstore.plist文件，并把这个文件上传到服务器，并确保可以通过网址访问这个文件。
    5. 这时候，您的iOS客户端才可以正常通过链接及二维码进行安装，安装地址是：itms-services:///?action=download-manifest&url=**您上传的appstore.plist文件的访问地址（步骤d的文件网址）**
    6. 您可以将以上网址制作成二维码，苹果手机扫码即可安装。也可以把它作为超链接放在任何网页上，苹果用户点击后即可下载。

**其它更多设置请逐一查看Whotalk后台的【系统设置】☞【参数设置】，设置方法请参考演示站后台的设置。**


## 常见问题

### 一、无法即时接收聊天消息

可能原因及解决办法：

    1. **未设置socket服务器：**请查看上文的【配置说明】☞【一、配置socket服务器】
    2. **socket设置项填写错误：**注意复制设置时不要带有空格等；如果不是自己搭建的socket服务器，请直接复制演示站的socket设置，不要自行填写其它域名。
    3. **域名代理、CDN加速等：**关闭域名代理和CDN加速。
    4. **服务器组件或PHP拓展未安装完成：**排查一下服务器组件和PHP拓展安装情况，如openssl等。
### 二、无法上传图片或视频、APP无法发送语音

可能原因及解决办法：

    1. **上传的文件格式与后台设置的格式不一致：**请参考上文的【配置说明】→【二、配置附件格式大小及远程附件】
    2. **上传的文件大小超出后台设置的大小：**请参考上文的【配置说明】→【二、配置附件格式大小及远程附件】
### 三、公众号无法收到提醒

可能原因及解决办法：

    1. **后台未设置模板消息编号：**请参考上文的【配置说明】→【七、配置模板消息通知】
    2. **公众号未认证：**请先完成公众号认证后才可使用此功能
    3. **公众号未正确接入到系统：**[点此查看公众号接入方法](https://shimo.im/docs/dOq5Mj5YwmsdFDql?fileGuid=GKhVWY0fijocIgy4)
### 四、无法发送验证码

可能原因及解决办法：

    1. **后台未设置验证码登录/注册：**请到模块后台的【系统设置】→【参数设置】→【注册设置】里，开启**“注册验证码”**设置项。
    2. **后台未配置正确的短信和邮件发送通道：**请参考上文的【配置说明】→【五、配置短信发送】和【六、配置邮件发送】
    3. **未下载并部署短信发送SDK：**请参考上文的【配置说明】→【五、配置短信发送】
### 五、搜索不到用户/群组

可能原因及解决办法：

    1. **后台未开启模糊搜索：**到后台的【系统设置】→【参数设置】→【聊天设置】底部的【开启模糊搜索】，开启即可。
### 六、无法发送位置、无法获取定位

可能原因及解决办法：

    1. 后台未配置腾讯地图KEY：参考上文【配置说明：十、配置附近的人、发送位置功能】
    2. 手机未开启GPS定位：请手动开启GPS定位
    3. 未授权APP、小程序、公众号获取位置信息：请彻底退出并重新登录，当系统弹出授权框时点击“同意”
### 七、系统出现报错

可能原因及解决办法：

    1. **PHP版本不兼容：**升级PHP到5.6及以上，具体升级方法请自行搜索，不同的服务器和运行环境升级方式不同。
    2. **缺少PHP拓展：**根据报错提示安装指定的PHP拓展，具体安装方法请联系技术人员
    3. **模块存在BUG：**请截图完整的报错界面发到售后群内获取技术支持

注：模块经过多次更新迭代，到目前为止已经基本完善，偶尔因兼容等原因报出的错误（有时候也有可能是微擎本身或其它模块的报错）**都大多是出现在后台，而且并不影响使用，若无必要请忽略即可**，如觉得影响美观，请关闭站点的调试模式和服务器的报错提示。

**关闭站点的调试模式：**

![图片](https://uploader.shimo.im/f/cAjOyiN863QvaESW.png!thumbnail?fileGuid=GKhVWY0fijocIgy4)

**关闭服务器的报错提示：**

![图片](https://uploader.shimo.im/f/y28EeIJr1vUzzxhK.png!thumbnail?fileGuid=GKhVWY0fijocIgy4)

（WDCP关闭display_errors，修改后需重启WEB）

![图片](https://uploader.shimo.im/f/FZa3FwfH6Xu5jTx7.png!thumbnail?fileGuid=GKhVWY0fijocIgy4)

（宝塔面板关闭display_errors，修改后需重启PHP）

其实是关掉PHP的**display_errors**，将**php.ini**内的**display_errors**后面的**On 改为 Off**并重启即可

### 八、如何查看平台ID（uniacid）

平台ID即您在微擎站点后台创建平台时该平台的编号，**是一个数字**，一般从2开始累加，您可以通过一下方式查看平台ID：

    1. 点击对应公众号的【管理设置】按钮，新打开页面后在浏览器网址里就有平台ID

![图片](https://uploader.shimo.im/f/RT5E8qWbwF8Gm9gY.png!thumbnail?fileGuid=GKhVWY0fijocIgy4)

    2. 进入模块后台，首页的【常用入口地址】下方的网址后面紧跟着的数字就是平台ID

![图片](https://uploader.shimo.im/f/Ban3gVywGrtXCANy.png!thumbnail?fileGuid=GKhVWY0fijocIgy4)


### **九、遇到其它问题**

**请**[点此加入售后服务群](https://jq.qq.com/?_wv=1027&k=5chQT0w&fileGuid=GKhVWY0fijocIgy4)**反馈（****售后群仅限付费购买用户加入****）**

![图片](https://uploader.shimo.im/f/7NIuzdyEogUUCW1V.png!thumbnail?fileGuid=GKhVWY0fijocIgy4)

