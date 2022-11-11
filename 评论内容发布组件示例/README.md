评论内容发布组件
###注意事项：
- 1.0.0版在安卓系统上出现点击的时候出现的区域会在顶部而不是在小键盘上面，这是因为组件focus属性设置为自动获取焦点，使得点击弹出评论的时候能自动把键盘也弹出。关于textarea的这个这个属性官方有说到“在 H5 平台能否聚焦以及软键盘是否跟随弹出，取决于当前浏览器本身的实现”。按实际调试看来不只是H5平台不同浏览器会有差异，ios和android平台也有差异。
- 为了不趟这摊浑水，1.0.2版的修复做法是组件在组件生命周期里判断客户端是ios还是android，如果是android就不让软键盘自动跟随弹出。
- 1.0.6版做了一些优化使得点击发布评论android系统软键盘也会自动跟随弹出。
- 安卓app软键盘自动弹出有点问题，暂时还没有很好的解决方案，1.0.7版先禁止安卓app软键盘自动弹出，安卓端小程序和h5不受影响。如果哪位朋友有好的解决方案可以在评论里告诉大家参考一下。
###使用方式
#### 在 script 中引用组件
```javascript
import ygcComment from '@/components/ygc-comment/ygc-comment.vue';
export default {
    components: {ygcComment}
}
```
#### 在 template 中使用组件
这里不一定是button，只要绑定了事件来调用组件内部的toggleMask(type)方法就行了，具体见示例
```html
<button @click="这里的方法要调用组件内部的toggleMask(type)方法">发布评论</button>
```
```html
<ygc-comment ref="ygcComment" 
		    :placeholder="'发布评论'" 
			@pubComment="pubComment"></ygc-comment>
```
#### 属性说明

|属性名        | 类型    | 默认值 |   说明  |
| :------------ |:--------:| -------:|---------:|
| placeholder  |String | 无       |  textarea的placeholder参数|
#### 事件说明
|事件名     |   说明  |
| :------------ |:--------:|
|pubComment  | 点击发布按钮触发的事件|
