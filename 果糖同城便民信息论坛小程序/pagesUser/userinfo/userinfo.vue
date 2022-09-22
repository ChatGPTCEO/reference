<template>
	<view>
		<u-cell-group>
			<u-cell-item title="头像">
				<u-avatar @click="selAvatar" slot="right-icon" :src="userInfo&&userInfo.avatar"></u-avatar>
			</u-cell-item>
			<u-cell-item title="昵称" :value="userInfo&&userInfo.nickname"
				@click="$u.route('/pagesUser/nickname/nickname')">
			</u-cell-item>
			<u-cell-item title="绑定手机号" :value="userInfo&&userInfo.mobile?userInfo.mobile:'您还没有绑定哦'"
				@click="$u.route('/pagesUser/mobile/mobile')"></u-cell-item>
			<u-cell-item title="密码" value="更换密码" @click="$u.route('/pagesUser/password/password')"></u-cell-item>
		</u-cell-group>
	</view>
</template>

<script>
	import {
		mapActions,
		mapState
	} from 'vuex'
	import {
		API_URL
	} from '@/env.js'
	export default {
		data() {
			return {

			}
		},
		computed: {
			...mapState({
				userInfo: state => state.user.userInfo
			})
		},
		created() {
			this.$u.get('/addons/hicity/user/userInfo', this.form).then(info => {
				this.upUserInfo(info);
			})
			// 监听从裁剪页发布的事件，获得裁剪结果
			var that = this;
			uni.$on('uAvatarCropper', path => {
				uni.uploadFile({
					url: API_URL + '/addons/hicity/index/upload',
					filePath: path,
					name: 'file',
					success(res) {
						let updata = JSON.parse(res.data);
						that.$u.get('/addons/hicity/user/profile', {
							avatar: updata.data.fullurl
						}).then(info => {
							that.upUserInfo(info);
						})
					},
					fail(err) {
						that.$u.toast('上传失败');
					}
				});
			})
		},
		methods: {
			...mapActions([
				'upUserInfo'
			]),
			selAvatar() {
				this.$u.route({
					url: '/uview-ui/components/u-avatar-cropper/u-avatar-cropper',
					params: {
						// 输出图片宽度，高等于宽，单位px
						destWidth: 200,
						// 裁剪框宽度，高等于宽，单位px
						rectWidth: 200,
						// 输出的图片类型，如果'png'类型发现裁剪的图片太大，改成"jpg"即可
						fileType: 'jpg',
					}
				})
			}
		}
	}
</script>

<style>

</style>
