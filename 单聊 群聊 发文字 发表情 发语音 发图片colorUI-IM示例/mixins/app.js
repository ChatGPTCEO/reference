import { mapGetters } from 'vuex'
var app = {
	data(){
		return {
			// option:{
				
			// },
			modalName:null,
			TabCur: 0,
			scrollLeft: 0,
			_isWidescreen:false
		}
	},
	methods:{
		toEmit(name,data){//统一触发事件
			console.log('event',name)
			uni.$emit(name,data)
		},
		showModal(e) {
			this.modalName = e.currentTarget.dataset.target
		},
		hideModal(e) {
			this.modalName = null
		},
		tabSelect(e) {
			this.TabCur = e.currentTarget.dataset.id;
			this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
		},
		needLogin(){
			if(!this.hasLogin&&!this.fake){
					uni.showToast({
						icon:'none',
						title:'请先登录',
					})
					
					uni.showModal({
						title: '未登录',
						content: '您未登录，需要登录后才能继续',
						/**
						 * 如果需要强制登录，不显示取消按钮
						 */
						showCancel: !this.forcedLogin,
						success: (res) => {
							if (res.confirm) {
								/**
								 * 如果需要强制登录，使用reLaunch方式
								 */
								if (this.forcedLogin) {
									console.log(232132)
									this.toEmit('modal_name','my')
								} else {
									console.log(2323213213132)
									this.toEmit('modal_name','my')
								}
							}
						}
					});
				}
			
		},
		logout(){
			this.$store.dispatch('logout')
			clearInterval(this.im_timer)
			uni.closeSocket();
		},	
		login(){
			this.connectWbsocket()//登录连接wbsocket
		}
	},
	created(){
		this._isWidescreen = false;
		// #ifdef H5
		var mediaQueryOb = uni.createMediaQueryObserver(this)
		mediaQueryOb.observe({
		  minWidth: 967
		}, matches => {
		  this._isWidescreen = matches;
		})
		// #endif
	},
	computed:{
		...mapGetters(['forcedLogin','hasLogin','user','users','fake','option']),
		user_friends(){
			var a = []
			var divide_groups = JSON.parse(JSON.stringify(this.user.divide_groups))
			divide_groups.map(devide_group=>{
				devide_group = devide_group.users.map(friend=>{
					a.push(friend)
				})
				return devide_group
			})
			return a
		}
	}
}

export default app