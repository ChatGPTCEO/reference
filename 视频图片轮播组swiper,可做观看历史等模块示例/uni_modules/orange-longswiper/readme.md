
### 安装方式

本组件符合[easycom](https://uniapp.dcloud.io/collocation/pages?id=easycom)规范，`HBuilderX 2.5.5`起，只需将本组件导入项目，在页面`template`中即可直接使用，无需在页面中`import`和注册`components`。

### 基本用法

在 ``template`` 中使用组件

```html
<orange-longswiper :list="listData" :config="configData"  @tapMore="tapMore" @tapList="tapList"></orange-longswiper>
```

## API

### Props

|属性名	|类型		|默认值	|说明				|
|:-:	|:-:		|:-:	|:-:				|
|list	|Array		|-		|列表数组 字段见下方说明			|
|config	|Array		|-		|列表数组 字段见下方说明	|


### list

|属性名	|类型		|默认值	|说明				|
|:-:	|:-:		|:-:	|:-:				|
|id	|Number		|-		|id			|
|img	|String		|-		|图片路径	|
|subject	|String		|-		|图片标题			|


### config

|属性名	|类型		|默认值	|说明				|
|:-:	|:-:		|:-:	|:-:				|
|title	|String		|-		|模块左侧大标题			|
|titlemore	|String		|-		|模块右侧更多小标题	|
|listmore	|String		|-		|图片列表最右侧更多文字			|
|moreurl	|String		|-		|点击更多跳转链接			|
|multiple	|Number		|3		|页面同时显示的图片数量			|
|nextMargin	|Number		|0		|后边距，可用于露出后一项的一小部分 rpx			|
|height	|Number		|140		|图片高度 rpx			|
|radius	|Number		|0		|图片圆角 rpx			|


### Event

|属性名	|说明				|
|:-:	|:-:				|
|@tapMore	|返回 config 内的  moreurl 		|
|@tapList	|返回 list 数组的 id和index			|


## 示例项目

本组件也提供了示例项目，可点击下载查看