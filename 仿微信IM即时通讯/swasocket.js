const innerAudioContext = uni.createInnerAudioContext();
var swasocket = {
	Handels:{
		"mainpage":null,
		"dialog":null,
		"trtc":null
	},
	Callbacks:{
		"dialog":null
	},
	TIM:null,
	TRTC:{
		connecting:true,
		userId:''
	},
	Connected:false,
	Socket:null,
	UserSign:"",
	Core:{
		platform:'h5',
		userset:{}
	},
	Logout(type='local'){
		if(type=='local'){
			// #ifdef MP-TOUTIAO
			this.Socket.close({
				code:1000,
				reason:"logout"
			});
			// #endif
			// #ifndef MP-TOUTIAO
			uni.closeSocket({
				code:1000,
				reason:"logout"
			});
			// #endif
		}else if(type=='tim'){
			this.Socket.logout();
		}else{
			this.Socket.io.emit('logout');
		}
		this.Connected = false;
	},
	PostEvent:null,
	Ready:function(e){
		innerAudioContext.autoplay = false;
		innerAudioContext.src = this.Core.system.siteroot + '/addons/xfy_whotalk/static/notice.mp3';
	},
	Received:function(socketdata){
	    for(let i in this.Handels){
			let handel = this.Handels[i];
			if(typeof(handel)=='function'){
				handel(socketdata);
			}
		}
		if(socketdata.type=='dialog'){
			if(this.Core.userset.remind_vibrate==1){
				uni.vibrateLong();
			}
			if(this.Core.userset.remind_voice==1){
				innerAudioContext.play();
			}
		}
		if(socketdata.type=='trtcinvite'){
			if(typeof(this.Handels.mainpage=='function')){
				let dialogdata = {
					avatar:socketdata.avatar,
					nickname:socketdata.nickname,
					dialogid:socketdata.uid,
					mid:socketdata.mid,
					type:'dialog',
					dialogtype:'normal',
					spct:socketdata.spct
				}
				this.Handels.mainpage(dialogdata);
			}
			console.log('接收到实时语音视频邀请：'+socketdata.mode);
			if(this.TRTC.connecting){
				this.Core.post('trtc/busy',function(res){},{roomid:socketdata.roomid});
			}else{
				this.Core.navito('trtc/'+socketdata.mode,{cid:socketdata.uid,fp:socketdata.frompage});
			}
		}
	},
	Send:function(socketdata={},scktype='local',server=''){
		if(scktype=='local'){
			if(typeof(socketdata.fromId)=='undefined' || !socketdata.fromId){
				socketdata.fromId = this.UserSign;
			}
			//console.log(socketdata);
			// #ifdef MP-TOUTIAO
			this.Socket.send({
				data:JSON.stringify(socketdata),
				success:function(res){
					//console.log('Socket数据发送成功');
				},
				fail:(res)=> {
					console.log('Socket数据发送失败：',res);
				}
			});
			// #endif
			// #ifndef MP-TOUTIAO
			uni.sendSocketMessage({
				data:JSON.stringify(socketdata),
				success:function(res){
					//console.log('Socket数据发送成功');
				},
				fail:(res)=> {
					console.log('Socket数据发送失败：');
					console.log(res);
				}
			});
			// #endif
		}else if(scktype=='tim'){
			if(this.Socket==null) return console.log("TimSocket加载失败"),!1;
			let promise = this.Socket.sendMessage(socketdata);
			promise.then(function(imResponse) {
				// 发送成功
				//console.log(imResponse);
				//checkoffline(sendchatid,dialogtype);
			}).catch(function(imError) {
				// 发送失败
				console.warn('sendMessage error:', imError);
			});
		}else if(server!=''){
			uni.request({
				url:server,
				data:socketdata,
				method:"POST",
				dataType:"jsonp",
				success:function(res){
					console.log(res);
				}
			})
		}
	},
	TimREVOKED:function(event) {
	    // 收到消息被撤回的通知
	    console.log(event.data);
	},
	TIMSdkReady:function(event){
		// TIM接口初始化完成调用
		this.Ready(event);
	}
}
module.exports = swasocket;