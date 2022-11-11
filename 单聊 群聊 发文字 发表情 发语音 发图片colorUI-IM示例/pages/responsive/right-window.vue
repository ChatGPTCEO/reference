<template>
  <view>
    <!-- 这里将 /pages/detail/detail.nvue 页面作为一个组件使用 -->
    <!-- 路径 “/pages/detail/detail” 转为 “pages-detail-detail” 组件 -->
    <pages-chat-width></pages-chat-width>
  </view>
</template>

<script>

  export default {
    created(e) {
      //监听自定义事件，该事件由详情页列表的点击触发
	  console.log('right-window-load!!!')
	  
    },
	
    onLoad() {
	},
	computed:{
		// option(){
		// 	return this.app.option
		// }
	},
	
	
    methods: {

	}
  }
</script>