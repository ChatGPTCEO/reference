var click = {
	data(){
		return {
			click_index: 0,  
			click_start_time: 0,  
			click_end_time: 0 
		}
	},
	methods:{
		twoAvatarClick() { //双击聊天头像
			this.click_index = this.click_index == 0 ? 1 : this.click_index + 1;  
			if (this.click_index == 1) {  
				this.click_start_time = new Date().getTime();  
				setTimeout(()=>{  
					this.click_index = this.click_start_time = this.click_end_time = 0;  
				},200)  
			} else if (this.click_index == 2) {  
				this.end_time = new Date().getTime();
				if (this.click_end_time - this.click_start_time < 300) { 
					var content = '';
					if(this.user.id==this.message.from.id){//拍拍自己
						content = '"'+this.user.name+'"拍了拍"'+this.message.from.name+'"'
					}else{//拍拍对方
						content = '"'+this.user.name+'"拍了拍"'+this.message.from.name+'"'
					}
					this.toEmit('im-send-event',{
						'msg':'',
						'content':content,
						'message_type':'two-click-avatar',
						'extra':{
							to_id:this.message.from.id,
							to_name:this.message.from.name,
						}
					})
					// uni.showToast({  
					// 	title: '双击了屏幕',  
					// 	icon: 'none'  
					// })  
				}  
				this.click_index = this.click_start_time = this.click_end_time = 0;  
			}  
		},
		twoTextClick() { //双击聊天头像
			this.click_index = this.click_index == 0 ? 1 : this.click_index + 1;  
			if (this.click_index == 1) {  
				this.click_start_time = new Date().getTime();  
				setTimeout(()=>{  
					this.click_index = this.click_start_time = this.click_end_time = 0;  
				},200)  
			} else if (this.click_index == 2) {  
				this.end_time = new Date().getTime();
				if (this.click_end_time - this.click_start_time < 300) { 
					var content = '';
					if(this.user.id==this.message.from.id){//拍拍自己
						content = '"'+this.user.name+'"拍了拍"'+this.message.from.name+'"发送的'+'`'+this.message.data.content+'`'
					}else{//拍拍对方
						content = '"'+this.user.name+'"拍了拍"'+this.message.from.name+'"发送的'+'`'+this.message.data.content+'`'
					}
					this.toEmit('im-send-event',{
						'msg':'',
						'content':content,
						'message_type':'two-click-text',
						'extra':{
							to_id:this.message.from.id,
							to_name:this.message.from.name,
						}
					})
					// uni.showToast({  
					// 	title: '双击了屏幕',  
					// 	icon: 'none'  
					// })  
				}  
				this.click_index = this.click_start_time = this.click_end_time = 0;  
			}  
		}
		
	}
}

export default click