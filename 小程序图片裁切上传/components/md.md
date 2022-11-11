## 使用方法
```
<template>
	<view>
		<imageCut
			ratio='4:3'
			maxUpload='2'
			uploadUrl='https://common/oss/upload'
			:upHeader='upHeader'
			:upFromData='upFromData'
			@uploadComplete='uploadCompleteHandle'
		></imageCut>
	</view>
</template>

<script>
	import imageCut from '@/components/imagecut-upload/index.vue'
	export default {
		components:{
			imageCut
		},
		data() {
			return {
				upFromData: {
						'token':'token'
				},
				upHeader: {
					'Authorization':'Bearere token',
				}
			}
		},
		methods: {
			uploadCompleteHandle(e) {
				console.log(e)
			}
		}
	}
</script>

<style>

</style>

```

|参数|类型|默认值|备注|
|:-:|:-:|:-:|:-:|
|maxUpload|number|1|最大上传个数|
|uploadUrl|String|-|上传文件api地址|
|upFromData|Object|-|上传文件FromData|
|upHeader|Object|-|上传文件Header|
|ratio|String|1:1|图片裁切框比例支持（1:1,4:3）|


[![6nQmz8.png](https://s3.ax1x.com/2021/03/06/6nQmz8.png)](https://imgtu.com/i/6nQmz8)
[![6nQKsg.png](https://s3.ax1x.com/2021/03/06/6nQKsg.png)](https://imgtu.com/i/6nQKsg)
[![6nQuQS.png](https://s3.ax1x.com/2021/03/06/6nQuQS.png)](https://imgtu.com/i/6nQuQS)