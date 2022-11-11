<template>
	<view>
		<cEditor htmlContent="文本内容" ref="cEditor" 
		:uploadUrl="uploadUrl" 
		:header="header"
		:isUseCustomNavbar="isUseCustomNavbar"
		@uploadFile="uploadFile" @saveContent="saveContent"></cEditor>
	</view>
</template>

<script>
	import cEditor from "@/components/editor.vue"
	export default {
		components: {
			cEditor
		},
		data() {
			return {
				/* 图片上传路径 */
				uploadUrl: "http://localhost:8002/pc/auth/upload",
				/* 头文件 */
				header: { authorization: "XXXXXXX" },
				/* 是否使用自定义导航栏 */
				isUseCustomNavbar: true,
			}
		},
		methods: {
			saveContent(data) {
				console.log(data);
			},
			uploadFile(fileUrl) {
				/* 此处为你上传图片服务器后得到的url链接 */
				var urlPath = JSON.parse(fileUrl.data).link;
				this.$refs.cEditor.editorCtx.insertImage({
					src: urlPath
				})
			}
		}
	}
</script>
