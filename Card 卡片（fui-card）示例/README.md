# First UI 快速上手

使用 First UI 前，请确保你已经学习并熟练使用过 [uni-app](https://uniapp.dcloud.io/) 。


### 安装

#### 方式一 ：通过 npm 安装

<div class="fui-sub__text">使通过 npm 安装，需要先通过 vue-cli 创建 uni-app 项目，<a href="https://uniapp.dcloud.io/quickstart-cli" target="_blank">详见</a> 。</div>

``` js
// # Using npm
npm install firstui-uni
```

#### 方式二 ：通过下载代码

<div class="fui-sub__text">通过 <a target="_blank" href="https://github.com/FirstUI/FirstUI">GitHub</a> 或者 <a target="_blank" href="https://www.firstui.cn/">FirstUI官网(VIP)</a> 下载 First UI 的代码，然后 将 components/firstui/ 目录拷贝到自己的项目中。</div>

``` js
// # GitHub
git clone https://github.com/FirstUI/FirstUI.git
```

#### 方式三 ：选择需要的模块引入

<div class="fui-sub__text">下载 First UI 的代码，在 components/firstui/ 目录下找到需要的组件拷贝到自己的项目中。</div>

### 如何使用

按照以下的方式使用组件，以 `Button` 为例，其它组件在对应的文档页查看。

<div class="fui-doc__card">
 <div class="fui-doc__title">第一种：在页面中引用、注册</div>
 
``` js
import fuiButton from "@/components/firstui/fui-button/fui-button"
export default {
	components:{
		fuiButton
	}
}
```
</div>

<div class="fui-doc__card fui-mbtm">
 <div class="fui-doc__title">第二种：easycom组件规范</div>
<div class="fui-sub__text">传统vue组件，需要安装、引用、注册，三个步骤后才能使用组件。easycom将其精简为一步，如果不了解easycom，可先查看 <a href="https://uniapp.dcloud.io/collocation/pages?id=easycom" target="_blank">官网文档</a> 。</div>

在 `pages.json` 中 添加配置：

``` js
// 下载安装时配置
"easycom": {
		"autoscan": true,
		"custom": {
			"fui-(.*)": "@/components/firstui/fui-$1/fui-$1.vue"
		}
	}

// 使用npm安装时配置（配置完成后重新编译运行）
"easycom": {
		"autoscan": true,
		"custom": {
			"fui-(.*)": "firstui-uni/firstui/fui-$1/fui-$1.vue"
		}
	}
```

</div>

### 使用组件

引入组件后，可以在 页面 中直接使用组件

``` html
<fui-button text="默认按钮"></fui-button>
```


### 相关链接

官网地址：[https://www.firstui.cn](https://www.firstui.cn)

文档地址：[https://doc.firstui.cn](https://doc.firstui.cn)

GitHub地址：[https://github.com/FirstUI/FirstUI](https://github.com/FirstUI/FirstUI)