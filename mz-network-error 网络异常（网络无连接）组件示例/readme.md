### mzNetworkError 网络异常组件

·简单易用，全端支持

·自动监听网络状态变化，显示或隐藏提示文本

·可配置是否悬浮（悬浮表示脱离文档流）

·提供网络异常提示页面示例


**基本用法：**

```html
<template>
	<view class="content">
		<mz-network-error></mz-network-error>
		<image class="logo" src="/static/logo.png"></image>
		<view class="text-area">
			<text class="title">{{title}}</text>
		</view>
	</view>
</template>
```
```javascript
<script>
	import mzNetworkError from '@/components/mz-network-error/mz-network-error.vue'
	export default {
		components: {
			mzNetworkError
		},
		data() {
			return {
				title: 'Hello'
			}
		}
	}
</script>
```


**点击跳转：**

```html
<template>
	<view class="content">
		<mz-network-error @clickFn="hancleClick"></mz-network-error>
		<image class="logo" src="/static/logo.png"></image>
		<view class="text-area">
			<text class="title">{{title}}</text>
		</view>
	</view>
</template>
```
```javascript
import mzNetworkError from '@/components/mz-network-error/mz-network-error.vue'
export default {
	components: {
		mzNetworkError
	},
	data() {
		return {
			title: 'Hello'
		}
	},
	onLoad() {

	},
	methods: {
		hancleClick() {
			uni.navigateTo({
				url: '../network/networkError'
			});
		}
	}
}
```

**属性说明：**

|属性名			|类型			|默认值	|说明															|
|-				|-				|-		|-																|
|message	|String			|网络异常，请检查您的网络设置|提示信息										|
|fixed		|Boolean			|false		|是否悬浮，true：处于正常文档流，其他内容会被向下挤压；false:悬浮									|
|showRightBtn		|Boolean			|true		|是否显示右侧图标									|
|top		|String			|距离顶部距离		|'0'														|
|icon		|String			|mz-iconfont icon-wangluocuowu		|可以是图片路径，也可以是样式类名													|