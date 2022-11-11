
对开发友好的极简IM

[文档地址](https://jc91715.top/colorui-im-doc/10/chapters)

## 功能

* 单聊
* 群聊
* 发文字
* 发表情
* 发语音
* 发图片
* 发文件
* 发视频
* 拍一拍
* 群内兴趣小组
* 多设备登录及信息同步
* 支持pc,H5，小程序 和 apk ，ios 理论上应该也可以，但太麻烦，有心者可研究

## 0 扫码体验

[demo](https://jc91715.top/im)

![1](https://jc91715.top/storage/app/blog/vTAPQocXMW.png)
<a href="https://jc91715.top/im-pc" target="_blank">电脑版</a>
## 1 项目结构

* 前端 uni-app ([colorUI](https://www.color-ui.com/))
* api后端 （[Laravel8](https://laravel.com/)）
* 管理后端 ([Octobercms](http://octobercms.com/))
* wbsocket服务端 ([GatewayWorker2.x 3.x 手册](http://doc2.workerman.net/642185))

这么多几个，只需关注`前端`就行了,`后端`可以用自己比较熟悉的语言进行实现。

## 2 安装

这里对前端安装进行介绍，安装之前请先安装[HBuilderX](https://www.dcloud.io/hbuilderx.html)

### 2.1 下载代码

```
git clone https://gitee.com/colorui-im/colorui-im-h5.git
```

### 2.2 运行

打开HBuilderX ，打开下载的代码，点击上方运行->运行到浏览器,即可

## 3 配置

在 common/config.js 中，可以什么也不改

```
const config = {
	'api_domain':'https://colorui-im-admin.jc91715.top',//api域名
	chat_img_domain:'https://colorui-im-admin.jc91715.top',//图片域名没啥用
	'wbsocket_url':'wss://colorui-im-h5.jc91715.top:8284',//wbsocket服务端链接地址
	fake:false //是否使用假数据，如运行失败，改为 true,则不会走api接口
}

export default config
```

## 4 访问

HBuilderX 运行成功后，会自动打开一个链接，访问那个链接即可，一般为 [localhost:8000](http://localhost:8000) 这样的

## 其他

打包桌面应用 [参考](https://ext.dcloud.net.cn/plugin?id=2905)

在manifest.json h5 设置中
```
目录 ./
取消 https
```

main.js
```
const {app, BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({width: 967, height: 667})

  // and load the index.html of the app.
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Open the DevTools.
  // win.webContents.openDevTools()

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
```
package.json
```
{
  "name"    : "app-name",
  "version" : "0.1.0",
  "main"    : "main.js"
}
```
打包 在unpackage/dist/build/h5/下
```
electron-packager . MyApp --win --out MyApp --arch=x64 --electron-version 12.0.2 --overwrite --ignore=node_modules
Packaging app for platform darwin x64 using electron v12.0.2
Wrote new app to MyApp/MyApp-darwin-x64
```