<template>
	<view class="content">
		<Rboy-upload-sfz :obverse-url="formData.obverseUrl" :reverse-url="formData.reverseUrl"
			@selectChange="sfz_chagne" @del="del_btn"></Rboy-upload-sfz>
	</view>
</template>

<script>
	import RboyUploadSfz from "@/components/Rboy-upload-sfz/Rboy-upload-sfz.vue"
	export default {
		components: {
			RboyUploadSfz,
		},
		data() {
			return {
				title: 'Hello',
				// 表单
				formData: {
					// 正面
					obverseUrl: "",
					// 反面
					reverseUrl: "",
				},
			}
		},
		onLoad() {

		},
		methods: {
			// 身份证
			// 上传
			sfz_chagne(e) {
				if (e.name == "obverse") {
					this.formData.obverseUrl = e.tempFilePath
				} else if (e.name == "reverse") {
					this.formData.reverseUrl = e.tempFilePath
				}
			},
			// 删除
			del_btn(e) {
				if (e.name == "obverse") {
					this.formData.obverseUrl = ""
				} else if (e.name == "reverse") {
					this.formData.reverseUrl = ""
				}
			},
		}
	}
</script>

<style>

</style>
