<template>
	<view class="u-p-30">
		<u-form :model="profile">
			<u-form-item label="头像">
				<view slot="right" @click="chooseAvatar">
					<u-avatar :src="vuex_user.avatar?(vuex_user.avatar.indexOf('https')==-1?baseUrl+vuex_user.avatar:vuex_user.avatar):''">
					</u-avatar>
				</view>
			</u-form-item>
			<u-form-item label="昵称">
				<u-input v-model="profile.nickname" input-align="right" />
			</u-form-item>
			<u-form-item label="简介">
				<u-input v-model="profile.bio" input-align="right" />
			</u-form-item>
			<u-form-item label="性别">
				<u-input type="select" :select-open="selectShow" v-model="profile.sex" placeholder="请选择"	@click="selectShow = true" input-align="right" />
			</u-form-item>
			<u-form-item label="密码">
				<view slot="right">
					<u-button type="error" size="mini" @click="pwdShow=true">修改</u-button>
				</view>
			</u-form-item>
		</u-form>
		<view class="u-m-t-60">
			<u-button type="primary" shape="circle" @click="saveProfile">保存资料</u-button>
		</view>
		<u-select mode="single-column" :list="sexs" v-model="selectShow" @confirm="selectConfirm"></u-select>
		<u-popup v-model="pwdShow" mode="center" width="80%" border-radius="20">
			<view class=" u-p-80">
				<u-field v-model="password.new" :password="true" label-width="20" placeholder="请输入新密码" required>
				</u-field>
				<u-field v-model="password.confirm" :password="true" label-width="20" placeholder="请输入确认密码" required>
				</u-field>
				<view class="u-m-t-50">
					<u-button type="primary" @click="modify">确定</u-button>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				baseUrl: this.$u.http.config.baseUrl,
				action: this.$u.http.config.baseUrl + '/api/operate/upload',
				profile: {
					nickname: '',
					bio: '',
					gender: '',
					sex: ''
				},
				password: {
					new: '',
					confirm: ''
				},

				sexs: [{
						label: '男',
						value: 1
					},
					{
						label: '女',
						value: -1
					},
					{
						label: '未知',
						value: 0
					}
				],
				selectShow: false,
				pwdShow: false,
			};
		},
		created() {
			var that = this
			uni.$on('uAvatarCropper', path => {
				uni.uploadFile({
					url: this.$u.http.config.baseUrl+'/api/operate/upload',
					filePath: path,
					header:{token:this.vuex_token},
					formData:{avatar:1},
					name: 'file',
					success: (res) => {
						res = JSON.parse(res.data)
						if (res.code == 1) {
							that.utils.updateUser()
							uni.showToast({
								title: res.msg
							})
						}
					}
				})
			})
		},
		onLoad() {
			this.profile = {
				nickname: this.vuex_user.nickname,
				bio: this.vuex_user.bio,
				gender: this.vuex_user.gender,
				sex: this.sexs.filter(item => {
					return item.value == this.vuex_user.gender
				})[0].label
			}
		},
		methods: {
			chooseAvatar() {
				this.$u.route({
					url: '/uview-ui/components/u-avatar-cropper/u-avatar-cropper',
					params: {
						// 输出图片宽度，高等于宽，单位px
						destWidth: 200,
						// 裁剪框宽度，高等于宽，单位px
						rectWidth: 300,						
					}
				})
			},
			selectConfirm(e) {
				this.profile.gender = e[0].value;
				this.profile.sex = e[0].label;
			},
			async modify() {
				var pwd = this.password;
				var item = this.$u.test.enOrNum(pwd.new) && this.$u.test.rangeLength(pwd.new, [6, 20])
				if (!item) return this.$u.toast('密码只能是字母或数字，长度为6~20位');
				if (pwd.new !== pwd.confirm) return this.$u.toast('两次密码不一致');
				const res = await this.$u.api.modify(this.password)
				if (res.code == 1) {
					this.pwdShow = false
					this.password = {
						new: '',
						confirm: ''
					}
					uni.showToast({
						title: res.msg,
					})
				}
			},
			async saveProfile() {
				if (this.$u.test.isEmpty(this.profile.nickname) || !this.$u.test.rangeLength(this.profile.nickname, [0,20])){
					 this.$u.toast('昵称不能为空，且字数20个以内')
					 return false;
				}
				if (!this.$u.test.rangeLength(this.profile.bio, [0, 30])){
					 this.$u.toast('简介字数30个以内')
					  return false;
				}
				const res = await this.$u.api.profile(this.profile)
				if (res.code == 1) {
					this.utils.updateUser()
					setTimeout(()=>{
						uni.showToast({
							title:res.msg,
							duration:1000
						})
					},100)
					setTimeout(() => {
						uni.reLaunch({
							url: './user'
						})
					}, 1100)
				}
			}
		}
	}
</script>
