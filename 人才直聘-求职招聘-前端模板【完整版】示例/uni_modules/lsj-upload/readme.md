# lsj-upload

### 插件地址：https://ext.dcloud.net.cn/plugin?id=5459

### 不清楚使用方式可点击右侧导入示例项目运行完整示例
### 此次更新2.0与1.0使用方式略有差异，已使用1.0的同学自行斟酌是否更新到2.0版本！！！

使用插件有任何问题欢迎加入QQ讨论群：
- 群1：701468256（已满）
- 群2：469580165

若能帮到你请高抬贵手点亮5颗星~
------
## 重要提示
### 控件的height高度应与slot自定义内容高度保持一致
### nvue窗口只能使用固定模式position=absolute
### show() 当DOM重排后在this.$nextTick内调用show()，控件定位会更加准确
### hide() APP端webview层级比view高，如不希望触发点击时，应调用hide隐藏控件，反之调用show
### 若iOS端跨域服务端同学实在配置不好，可把hybrid下html目录放到服务器去，同源则不存在跨域问题。
### 小程序端因hybrid不能使用本地HTML，所以插件提供的是从微信消息列表拉取文件并选择，请知悉。
------

## 使用说明
| 属性		| 是否必填	|  值类型	| 默认值	| 说明			|
| --------- | -------- 	| -----: 	| --: 	| :------------:|
| width		|	否 		| String	|100%	| 容器宽度		|
| height	|	是 		| String	|80rpx	| 容器高度		|
| debug		|	否 		| Boolean	|false	| 打印调试日志	|
| option	|	是 		| Object	|-		| [文件上传接口相关参数](#p1)|
| instantly	|	否 		| Boolean	|false	| true=自动上传	|
| count		|	否 		| Number	|10		| 附件选择上限(个)|
| size		|	否 		| Number	|10		| 附件大小上限(M)|
| accept	|	否 		| String	|-		| 文件选择器input file格式限制(部分机型不兼容，建议使用formats)|
| formats	|	否 		| String	|-		| 禁止上传的文件格式类型，多个以逗号隔开，例如png,jpg,pdf|
| childId	|	否 		| String	|lsjUpload| 控件的id(仅APP有效，应用内每个控件命名一个唯一Id，不同窗口也不要同名Id)|
| position	|	否 		| String	|static	| 控件的定位模式(static=控件随页面滚动;absolute=控件在页面中绝对定位，不随窗口内容滚动)|
| top,left,right,bottom	|	否 		| [Number,String]	|0		| 设置控件绝对位置，position=absolute时有效|
| @change	|	否 		| Function	|Map	| 选择文件触发，返回所有已选择文件Map集合|
| @progress	|	否 		| Function	|Object	| 上传过程中发生状态变化的文件对象，需通过set更新至Map集合|

## <a id="p1">option说明</a>
|参数 | 是否必填 |  说明|
|---- | ---- | :--: |
|url  |	是	| 上传接口地址|
|name| 否	|上传接口文件key，默认为file|
|header| 否	|上传接口请求头|
|formData| 否	|上传接口额外参数|

## ref调用
|作用 | 方法名| 传入参数|  说明|
|---- | --------- | -------- | :--: |
|显示控件| show|-| 控件显示状态下可触发点击|
|隐藏控件| hide|-| 控件隐藏状态下不触发点击|
|移除选择的文件| clear|[String] name| 不传参数清空所有文件，传入文件name时删除该name的文件|
|手动上传| upload|[String] name| 不传参数默认依次上传所有type=waiting的文件，传入文件name时不关心type是否为waiting，单独上传指定name的文件|

## progress返回对象字段说明
|字段 |  说明|
|---- | :--: |
|file | 文件对象|
|name |文件名称|
|size |文件大小|
|type |文件上传状态：waiting（等待上传）、loading（上传中）、success（成功） 、fail（失败）|
|responseText|上传成功后服务端返回数据(仅type为success时存在)|

### vue:
``` javascript
<lsj-upload 
	ref="lsjUpload"
	childId="upload"
	width="100px"
	:height="height"
	:option="option"
	:size="size"
	:debug="debug"
	:instantly="instantly"
	@progress="onprogress"
	@change="onChange">
		<view class="btn" :style="{height: height}">选择附件</view>
</lsj-upload>
```

---
* 函数说明


``` javascript
/*  */
export default {
	data() {
		return {
			option: {},
			height: '180rpx',
			size: 10,
			debug: true,
			// 选择文件后是否立即自动上传
			instantly: true,
			files: new Map(),
			// 微信小程序Map对象for循环不显示，所以转成普通数组，不要问为什么，我也不知道
			wxFiles: [],
			
			
			// 演示用
			tabIndex: 0,
			list:[], 
		}
	},
	onReady() {
		this.option = {
			// 上传服务器地址，此地址需要替换为你的接口地址
			url: 'http://youaaddress/upload',
			// 上传附件的key
			name: 'file',
			// 根据你接口需求自定义请求头
			header: {
				'Authorization': 'bearer eyJhbGciOiJS',
				'uid': '27682',
				'client': 'app',
			},
			// 根据你接口需求自定义body参数
			formData: {
				// 'orderId': 1000
			}
		};
	},
	methods: {
		// 上传进度回调
		onprogress(item) {
			this.files.set(item.name,item);
			this.$forceUpdate();
			// console.log('打印对象',JSON.stringify(this.files.get(item.name)));
			
			// 微信小程序Map对象for循环不显示，所以转成普通数组，不要问为什么，我也不知道
			// #ifdef MP-WEIXIN
			this.wxFiles = [...this.files.values()];
			// #endif
			
			
			// 演示-判断是否所有文件均已上传成功
			let isAll = [...this.files.values()].find(item=>item.type!=='success');
			if (!isAll) {
				console.log('已全部上传完毕');
			}
			else {
				console.log(isAll.name+'待上传');
			}
		},
		// 文件选择回调
		onChange(files) {
			this.files = files;
			this.$forceUpdate();
			
			// 微信小程序Map对象for循环不显示，所以转成普通数组，不要问为什么，我也不知道
			// #ifdef MP-WEIXIN
			this.wxFiles = [...this.files.values()];
			// #endif
		},
		// instantly=false时，手动调用上传
		upload() {
			// name=指定文件名，不指定则上传所有type等于waiting和fail的文件
			this.$refs.lsjUpload.upload();
		},
		// 移除某个文件
		clear(name) {
			// name=指定文件名，不传name默认移除所有文件
			this.$refs.lsjUpload.clear(name);
		},
		
		
		/**
		 * 以下为演示
		 */
		// DOM重排演示，重排后组件内部updated默认会触发show方法,若特殊情况未能触发updated也可以手动调用一次show()
		// 什么是DOM重排？自行百度去~
		add() {
			this.list.push('DOM重排测试');
		},
		// 切换视图演示，APP端因为是webview，层级比view高，
		// 此时若不希望点击触发选择文件，需要手动调用hide()
		// 手动调用hide后，需要调用show()才能恢复触发面
		onTab(tabIndex) {
			this.tabIndex = tabIndex;
			
			if (tabIndex == 0 ) {
				this.$nextTick(()=>{
					this.$refs.lsjUpload.show();
				})
			}
			else {
				this.$refs.lsjUpload.hide();
			}
		}
	}
}

```

## 温馨提示
	
* 文件上传
0. 如说明表达还不够清楚，怎么调用可导入完整示例项目运行体验和查看	
1. APP端请优先联调Android,上传成功后再运行iOS端，如iOS返回status=0则需要后端开启允许跨域；
2. header的Content-Type类型需要与服务端要求一致，否则收不到附件（服务端若没有明文规定则可不写，使用默认匹配）
3. 服务端不清楚怎么配置跨域可加群咨询，具体百度~
4. 欢迎加入QQ讨论群：701468256(已满)
5. 欢迎加入QQ讨论群：469580165
6. 欢迎加入QQ讨论群：469580165
7. 若能帮到你还请点亮5颗小星星以作鼓励哈~
8. 若能帮到你还请点亮5颗小星星以作鼓励哈~
9. 若能帮到你还请点亮5颗小星星以作鼓励哈~