# zero-loading

### 全屏加载动画

提供多种加载动画类型,传入type即可

## 插件使用方法:

导入 `uni_modules` 后直接使用即可

```html
<template v-if="error">
	<view >{{error.message}}</view>
</template>
<template v-else-if="loading">
	<zero-loading></zero-loading>
</template>
<template v-else>

//或

<zero-loading v-if="loading"></zero-loading>

```

## 参数说明

|参数		|类型	|默认值	|描述			|
|--			|--		|--		|--				|
|type		|String	|circle	|样式			|
|position	|String	|fixed	|定位方式		|
|zIndex		|Number	|9		|				|
|mask		|Boolean|false	|是否需要遮罩	|

插件预览:
![code](https://gitee.com/zerojs/public/raw/master/uni/we_code.jpg)