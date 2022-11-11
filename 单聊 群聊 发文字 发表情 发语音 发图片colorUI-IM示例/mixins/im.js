
import getMessage from '@/fake_data/message.js'
var im = {
	data(){
		return {
			// option:{
			// 	to:{id:0},
			// 	type:'',
			// },
			
			//输入框内容
			content:'',
			msg:'',//自定义首页提示内容，图片消息显示，您收到图片消息
			message_type:'text',//消息类型
			extra:{},
			
			im_timer:null,//心跳
			
			//输入框位置
			InputBottom: 0,
			focus:false,
			displayName:'',
			
		}
	},
	onPullDownRefresh() {
        console.log('refresh');
		this.imPullRefresh()
		
        setTimeout(function () {
            uni.stopPullDownRefresh();
        }, 5000);
    },
	methods:{
		async imPullRefresh(){
			if(this.option.to&&this.option.to.id){
				await this.$store.dispatch('im/getMessages',{group_id:this.option.to.id,unique_slug:this.current_oldest_unique_slug}).then(res=>{
					uni.stopPullDownRefresh();
					if(res.data.code==0){
						
						if(res.data.data.messages.length>0){
							this.$store.dispatch('im/pull_refresh',true)
							console.log(23232132,'updateCurrentMessages')
							this.updateCurrentMessages(res.data.data.messages)
						}else{
							uni.showToast({
								icon:'none',
								title:'没有更多数据了'
							})
						}
					}
				})
			}
		},
		imSendEvent(data){//
			// data ={
			// 	msg:'',
			// 	content:'',
			// 	message_type:'',
			// 	extra:{}
			// }
			console.log('im-send-event')
			this.msg = data.msg
			this.content = data.content
			this.message_type = data.message_type
			this.extra = data.extra
			this.im_send()
			uni.$emit('im-send-after-event')
			
		},
		imSendAfterEvent(){//每个页面继承这个事件，做一些自定义的事情
			this.InputBottom =0
			this.modalName = null
			this.displayName = null
			
		},
		toChat(item){//群
			this.$store.dispatch('im/pull_refresh',false)//取消下拉刷新，聊天记录自动滚动
			// this.$store.dispatch('app/option',item)
			if(this._isWidescreen){//宽屏
				console.log('宽屏，页面切换群')
				this.toEmit('message-change',item)
			}else{
				uni.navigateTo({
					url:'/pages/chat/chat?to_id='+item.to_id+'&type='+item.type
				})
			}
			
		},
		toChatFriend(toUser){//好友
			this.$store.dispatch('im/pull_refresh',false)//取消下拉刷新，聊天记录自动滚动
			var friend_group = this.geCurrenttFriendGroupByToUser(toUser)
			if(this._isWidescreen){//宽屏
				console.log('宽屏，页面切换好友')
				console.log(friend_group.id)
				var option = {}
				option.to_id = friend_group.id
				option.type = 'friend'
				this.toEmit('message-change',{to_id:friend_group.id,type:'friend'})
			}else{
				var option = {}
				option.to_id = friend_group.id
				option.type = 'friend'
				uni.navigateTo({
					url:'/pages/chat/chat?to_id='+friend_group.id+'&type=friend'
				})
			}
			
		},
		getCurrentFriendByUserId(usserId){
			var user = {}
			this.user.divide_groups.map(item=>{
				item.users.map(u=>{
					if(u.id==usserId){
						user = u
					}
					
					return u;
				})
				return item
			})
			return user
		},
		geCurrenttFriendGroupByToUser(toUser){
			var friend_groups = this.user.friend_groups
			var a = [],b={}
			console.log(friend_groups,'friend_groups')
			a.push(this.user.id)
			a.push(toUser.id)
			a.sort((function(a,b){return a-b}))
			var user_to_user = a.join('-')
			console.log(user_to_user,'user_to_user1111')
			friend_groups.map(friend_group=>{
				if(user_to_user==friend_group.user_to_user){
					b = friend_group
				}
				return friend_group
			})
			
			return b
		},
		geCurrenttFriendGroupByGroupId(group_id){
			var friend_groups = this.user.friend_groups
			var b={}
			friend_groups.map(friend_group=>{
				if(group_id==friend_group.id){
					b = friend_group
				}
				return friend_group
			})
			
			return b
		},
		getCurrentGroupByGroupId(group_id){
			var friend_groups = this.user.friend_groups
			var b={}
			friend_groups.map(friend_group=>{
				if(group_id==friend_group.id){
					b = friend_group
				}
				return friend_group
			})
			
			if(!b.id){//还没找到
				this.user.groups.map(group=>{
					if(group_id==group.id){
						b = group
					}
					return group
				})
			}
			
			return b
		},
		setMsg(){//首页消息提示内容统一起来
			let msg=''
			if(this.option.type=='friend'){
				if(this.message_type=='text'){
					msg =  this.content
				}else if(this.message_type=='image'){
					msg ='图片消息'
				}else if(this.message_type=='audio'){
					msg ='语音消息'
				}else if(this.message_type=='file'){
					msg ='文件消息'
				}else if(this.message_type=='video'){
					msg ='视频消息'
				}
			}else if(this.option.type=='group'){
				if(this.message_type=='text'){
					msg =  this.user.name+':'+this.content
				}else if(this.message_type=='image'){
					msg =this.user.name+':'+'图片消息'
				}else if(this.message_type=='audio'){
					msg = this.user.name+':'+'语音消息'
				}else if(this.message_type=='file'){
					msg = this.user.name+':'+'文件消息'
				}else if(this.message_type=='video'){
					msg = this.user.name+':'+'视频消息'
				}
			}
			this.msg = msg
		},
		async im_send(type){
			this.$store.dispatch('im/pull_refresh',false)//取消下拉刷新，聊天记录自动滚动
			if(type){
				this.message_type = 'text'
			}
			if(!this.msg){//统一设置小字提示
				this.setMsg()
			}
			
			
			var user = JSON.parse(JSON.stringify(this.user))
			delete user.divide_groups
			delete user.groups
			delete user.friend_groups
			delete user.token_length
			var params = {
				unique_slug:this.option.to.id+'-'+(new Date()).getTime()+'-'+this.$tool.randomString(10),
				from_id:this.user.id,
				from: user,
				to_id:this.option.to.id,
				type:this.option.type,
				to: this.current_to,
				message_type:this.message_type,
				data:{
					content: this.content,
					msg: this.msg,
					extra:this.extra
				},
				sended_at:this.$tool.dateFormat('Y-m-d H:M:S',new Date())
			}
			
			this.put_message(params)
			this.content=''
			this.msg=''
			this.extra={}
			
			if(this.fake){//假数据
				var m = getMessage()
				m.to.id = params.to.id //发信息到这里面
				m.type = params.type //
				m.sended_at = this.$tool.dateFormat('Y-m-d H:M:S',new Date()) //
				setTimeout(()=>{
					this.put_message(m)
				},2000)
				return 
			}
			
			uni.$emit('im-send-after-event')
			
			params.client_id = this.im.client_id
			await this.$store.dispatch('im/send',params)
		},
		async put_message(message){
			var params1 = message
			var messages = JSON.parse(JSON.stringify(this.im.messages))
			var state =false
			messages = messages.map(item=>{
				if((params1.to.id==item.group_id)&&(params1.type==item.type)){//说明是已有聊天记录
					item.messages.push(params1)
					item.message = params1
					item.sended_at = params1.sended_at
					item.unread_count = this.current_to.id==params1.to.id?0:++item.unread_count//在群里已读
					state = true
				}
				return item
			})
			
			if(!state){
				var msg = {
					group_id:params1.to.id,
					type:params1.type,
					message_id:0,
					message:params1,
					messages:[params1],
					sended_at: params1.sended_at,
					unread_count:this.current_to.id==params1.to.id?0:1//在群里已读
				}
				messages.push(msg)
			}
			
			await this.$store.dispatch('im/messages',messages)
		},
		updateCurrentMessages(messages){//更新当前聊天信息 messages 是下拉刷新获取的聊天记录
			var current_messages = JSON.parse(JSON.stringify(this.current_messages))
			current_messages = messages.concat(current_messages)
			var new_messages = JSON.parse(JSON.stringify(this.im.messages))
			var state = false
			new_messages = new_messages.map(message=>{
				if((message.group_id==this.option.to.id)&&(message.type==this.option.type)){
					message.messages = current_messages
					state=true
				}
				return message
			})
			if(!state){
				var msg = {
					group_id:this.option.to.id,
					type:this.option.type,
					message_id:0,
					message:current_messages[current_messages.length-1],
					messages:current_messages,
					sended_at: current_messages[current_messages.length-1].sended_at,
					unread_count:0//在群里已读
				}
				new_messages.push(msg)
			}
			this.$store.dispatch('im/messages',new_messages)
		},
		getLatestMessageAvatar(item){
			if(item.type=='group'){
				return item.message.to.avatar
			}else{
				if(this.user.id==item.message.from.id){
					return item.message.to.avatar
				}else{
					return item.message.from.avatar
				}
			}
		},

		 connectWbsocket(){
			
			if(this.fake){
				console.log('模拟连接，已打开！！')
				return 
			}
			if(this.im.socket_open){
				console.log('已经连接上了')
				return ;
			}
			if(!this.hasLogin){
				console.log('没有登录')
				return 
			}
			uni.connectSocket({
			  url: this.im.wbsocket_url
			});
			uni.onSocketOpen( (res) =>{
				this.$store.dispatch('im/socket_open',true)
				console.log('WebSocket连接已打开！');
			});
			uni.onSocketError( (res) =>{
				clearInterval(this.timer)
			  console.log('WebSocket连接打开失败，请检查！',res);
			  this.$store.dispatch('im/socket_open',false)
			});
			uni.onSocketClose( (res) =>{
				this.$store.dispatch('im/socket_open',false)
				console.log('WebSocket 已关闭！');
				clearInterval(this.im_timer)
			});
			

			
			uni.onSocketMessage( (res)=> {
				console.log('收到服务器内容：' + res.data);
				var data = JSON.parse(res.data)
				switch(data.type){
					case 'friend'://					
					case 'group'://
						 this.put_message(data)
						break;
					case 'login'://绑定wbsocket
						this.option.client_id = data.client_id
						this.$store.dispatch('im/client_id',data.client_id)
						this.bindUid()
						break;
					case 'system_join_group':
						this.bindUid() //重新绑定
						this.$store.dispatch('getInfo')//重新获取用户信息
						break;
					case 'random_chat_joining':
						this.random_chat_update_list(data)	
						break;
					case 'random_chat_waiting':
						this.random_chat_update_list(data)
						this.bindUid() //重新绑定
						this.$store.dispatch('getInfo')//重新获取用户信息
						break;
				}
				
			});
			
			this.im_timer = setInterval(()=>{
				if(this.im.socket_open){
					try{
						uni.sendSocketMessage({
						  data: 'heart'
						});
					}catch (err) {
						console.log('no heart')
						console.log("err: " + JSON.stringify(err));
					}
					
				}else{
					console.log('no open')
				}
				
			},5000)
			
		
		},
		bindUid(){
			this.$store.dispatch('im/bindUid',{client_id:this.im.client_id})
		},
		imChooseImage(type) {
			uni.chooseImage({
				count: 1, //默认9
				sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				sourceType: ['album'], //从相册选择
				success: (chooseImageRes) => {
					console.log('chooseImageRes:',chooseImageRes.tempFilePaths[0])
					if(this.fake){//拦截图片数据
						// this.content = chooseImageRes.tempFilePaths[0]
						// // this.msg = this.user.name+':图片消息'
						// this.message_type = 'image'
						
						var data ={
							msg:'',
							content:chooseImageRes.tempFilePaths[0],
							message_type:'image',
							extra:{}
						}
						if(type==1){//宽屏和窄萍事件分开
							this.toEmit('im-width-send-event',data)
						}else{
							this.toEmit('im-send-event',data)
						}
						return
					}
					this.$store.dispatch('im/uploadImage',chooseImageRes.tempFilePaths[0]).then(res=>{
						if(res.data.code==0){
							// this.content = res.data.data.src 
							// // this.msg = this.user.name+':图片消息'
							// this.message_type = 'image'
							var data ={
								msg:'',
								content:res.data.data.src,
								message_type:'image',
								extra:{}
							}
							if(type==1){//宽屏和窄萍事件分开
								this.toEmit('im-width-send-event',data)
							}else{
								this.toEmit('im-send-event',data)
							}
							// this.im_send()
						}
					})
				}
			});
		},
		imChooseFile(type) {
			console.log(2321312)
			uni.chooseFile({
				count: 1, //默认9
				// sourceType: [], //从相册选择
				// extension:[],
				success: (chooseImageRes) => {
					console.log(JSON.stringify(chooseImageRes.tempFilePaths));
					console.log('chooseImageRes:',chooseImageRes.tempFilePaths[0])
					if(this.fake){//拦截图片数据
						
						
						var data ={
							msg:'',
							content:chooseImageRes.tempFilePaths[0],
							message_type:'file',
							extra:{}
						}
						if(type==1){//宽屏和窄萍事件分开
							this.toEmit('im-width-send-event',data)
						}else{
							this.toEmit('im-send-event',data)
						}
						return
					}
					this.$store.dispatch('im/uploadFile',chooseImageRes.tempFilePaths[0]).then(res=>{
						if(res.data.code==0){
							// this.content = res.data.data.src 
							// // this.msg = this.user.name+':图片消息'
							// this.message_type = 'image'
							var data ={
								msg:'',
								content:res.data.data.src,
								message_type:'file',
								extra:{
									name:res.data.data.name
								}
							}
							if(type==1){//宽屏和窄萍事件分开
								this.toEmit('im-width-send-event',data)
							}else{
								this.toEmit('im-send-event',data)
							}
							// this.im_send()
						}
					})
				}
			});
		},
		imChooseVideo(type) {
			console.log(2321312111111)
			uni.chooseVideo({
				count: 1, //默认9
				sourceType: ['camera','album'], //从相册选择
				// extension:[],
				maxDuration:60,
				success: (chooseImageRes) => {
					console.log(chooseImageRes);
					console.log('chooseImageRes:',chooseImageRes.tempFilePath)
					if(this.fake){//拦截图片数据
						
						var data ={
							msg:'',
							content:chooseImageRes.tempFilePath,
							message_type:'video',
							extra:{}
						}
						if(type==1){//宽屏和窄萍事件分开
							this.toEmit('im-width-send-event',data)
						}else{
							this.toEmit('im-send-event',data)
						}
						return
					}
					this.$store.dispatch('im/uploadVideo',chooseImageRes.tempFilePath).then(res=>{
						if(res.data.code==0){
							// this.content = res.data.data.src 
							// // this.msg = this.user.name+':图片消息'
							// this.message_type = 'image'
							var data ={
								msg:'',
								content:res.data.data.src,
								message_type:'video',
								extra:{
									name:res.data.data.name
								}
							}
							if(type==1){//宽屏和窄萍事件分开
								this.toEmit('im-width-send-event',data)
							}else{
								this.toEmit('im-send-event',data)
							}
							// this.im_send()
						}
					})
				}
			});
		},
		imJoinGroup(){//加群
			
			var data = {
				group_id:this.current_to.id,
				join_user_ids:this.im.group_checked_user_ids
			}
			if(this.fake){//拦截加群请求
				var group_users = []//要加群的用户
				this.user_friends.map((user)=>{
					if(this.$tool.in_array(user.id,this.im.group_checked_user_ids)){
						group_users.push(user)
					}
				})
				var current_group_users = this.current_group_users //当前群中的用户
				current_group_users = current_group_users.concat(group_users)//加进去
				var current_group = this.getCurrentGroupByGroupId(this.current_to.id);
				current_group.users = current_group_users
				this.updateUserGroup(current_group)//这里直接加入到当前群里，对接接口的话，当前是在好友的群（两个人），则创建一个新群，然后把当前用户加进去，切换到新群里
				this.init_grouping_user_ids_and_group_checked_user_ids()//更新左边抽屉的用户
				
				return ;
			}
		
			return this.$store.dispatch('im/joinGroup',data).then(res=>{
				if(res.data.code==0){
					this.$store.dispatch('getInfo').then(res_user=>{//重新拉去用户信息
						if(res_user.data.code==0){
							if(res.data.data.state==1){//需重新切换到新的群组
								uni.$emit('message-change', {to_id:res.data.data.group.id,type:'group'})
							}
							//重新计算当前群中的用户id
							this.init_grouping_user_ids_and_group_checked_user_ids()
						}
					})
						
				}
			})
		},
		async init_grouping_user_ids_and_group_checked_user_ids(){
			var user_ids = []
			console.log(this.current_group_users,'dadasd')
			this.current_group_users.map((user)=>{
				if(this.user.id==user.id){
					user_ids.unshift(user.id)
				}else{
					user_ids.push(user.id)
				}
				return user
			})
			await this.$store.dispatch('im/grouping_user_ids',user_ids)//正在群中的用户id
			await this.$store.dispatch('im/group_checked_user_ids',[])//清空选中的用户id
			
		},
		updateUserGroup(current_group){//本地假数据添加用到，对接接口的话用不到
			var user = JSON.parse(JSON.stringify(this.user))
			
			var state = false
			var groups = user.groups.map(group=>{
				if(group.id==current_group.id){
					state = true
					return current_group;
				}
				return group
			})
			if(!state){//说明，当前群组在好友的群里
				var devide_groups = user.divide_groups.map(devide_group=>{
					if(devide_group.id==current_group.id){
						return current_group;
					}
					return devide_group
				})
				user.divide_groups = devide_groups
				
			}else{
				user.groups = groups
			}
			this.$store.dispatch('user',user)//更新用户信息
		},
		get_group_users(groupId){
			var a = [];
			var groups_length = this.user.groups?this.user.groups.length:0
			var friend_groups_length = this.user.friend_groups?this.user.friend_groups.length:0
			for(let i=0;i<groups_length;i++){
				let group = this.user.groups[i]
				if(groupId==group.id){
					a = group.users
					break;
				}
			}
			if(a.length>0){
				return a
			}
			for(let i=0;i<friend_groups_length;i++){
				let group = this.user.friend_groups[i]
				if(groupId==group.id){
					a = group.users
					break;
				}
			}	
			return a;
		}
		

	},
	computed:{
		im(){
			return this.$store.state.im
		},
		current_to(){
			
			if(this.option.to&&this.option.to.id){
				var  a = {} 
				if(this.option.type=='group'){
					
					this.user.groups&&this.user.groups.map(group=>{
						if(this.option.to.id==group.id){
							a =  {
								id:group.id,
								name:group.name,
								avatar:group.avatr,
							}
						}
						return group
					})
				}else if (this.option.type=='friend'){
					var toUser = {},userId
					
					var friend_group = this.geCurrenttFriendGroupByGroupId(this.option.to.id)
					console.log('friendGroup',friend_group)
					if(friend_group&&friend_group.user_to_user){
						console.log(friend_group,112121,this.option.to.id)
						var user_to_user = friend_group.user_to_user.split('-')
						user_to_user[0]==this.user.id?(userId=user_to_user[1]):(userId=user_to_user[0])
						toUser = this.getCurrentFriendByUserId(userId)
						a = {
							id:friend_group.id,
							name: toUser.name,//换成好友的名称
							avatar: toUser.avatar,//换成好友头像
						}
					}else{
						console.log('无 friendGroup',friend_group)
					}
					
				}
				this.title = a.name
				return a
				
			}
			
			return {}
			
		},
		messages(){
			var messages = JSON.parse(JSON.stringify(this.im.messages))
			messages = messages.sort(function(a,b){
				return a.sended_at < b.sended_at ? 1 : -1
			});
			return messages
		},
		unread_count(){
			var unread_count = 0
			var messages = JSON.parse(JSON.stringify(this.im.messages))
			 messages.map(function(message){
				unread_count+=message.unread_count
			});
			return unread_count
		},
		current_messages(){
			if(this.option.to&&this.option.to.id){
				
			}else{
				return []
			}
			
			console.log(this.im.messages,11111)
			var messages = JSON.parse(JSON.stringify(this.im.messages))
			console.log(messages,'dadsa',this.option)
			let current_messages = []
			var refresh = false
			messages = messages.map(message=>{
				if((message.group_id==this.option.to.id)&&(message.type==this.option.type)){
					console.log('true',message.type)
					current_messages = message.messages
					if(message.unread_count>0){
						message.unread_count = 0;
						refresh = true
					}
					
				}
				return message
			})
			if(refresh){
				this.$store.dispatch('im/messages',messages)
			}
			return current_messages
		},
		current_oldest_unique_slug(){//当前聊天记录的第一条
			if(this.current_messages&&this.current_messages.length){
				return this.current_messages[0].unique_slug;
			}
			return ''
		},
		current_group_users(){
			var a = [];
			if(this.current_to.id){
				this.user.friend_groups.map(group=>{
					if(this.current_to.id==group.id){
						a = group.users
					}
				})
				this.user.groups.map(group=>{
					if(this.current_to.id==group.id){
						a = group.users
					}
				})
			}
			return a;
		}
		
	}
}

export default im