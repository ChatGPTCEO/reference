<template>
	<view class="">
		
		<view  class="DrawerPage" style="" :class="(modalName=='viewModal'||modalName=='viewModalGroupAdd')?'show':''">
			<cu-custom bgColor="bg-gradual-pink"  ><block slot="content">{{title}}</block> <block slot="right">
				<view class="action">
				</view>
				<view class="action">
					<text class="cuIcon-more" @tap="showModal" data-target="viewModal"></text>
				</view>
			</block>
			</cu-custom>
			
			<!-- 聊天记录-->
				<view class="">
					<chat-list :current_messages="current_messages"  :is_pop_up="modalName=='bottomModal'"></chat-list>
				</view>
			<!-- 聊天记录-->
			

			
			<view class="" style="display: none;">
				{{current_to.id}}
			</view>
			<!-- 聊天框 -->
			
			<view ref="input" class="cu-bar foot input" style="z-index: 9999;" @tap.stop="" :style="[{bottom:InputBottom*2+'rpx'}]">
				<view class="action" @tap="recOpen()" v-if="!rec_open">
					<text class="cuIcon-sound text-grey"></text>
				</view>
				<view class="action text-black"  @tap="recCancel()" v-if="rec_open">
					 取消
				</view>
				<input @tap="recStart()" v-if="rec_open" class="solid-bottom" disabled="true" :placeholder="audio_plachodler" placeholder-style="text-align:center">
				<textarea auto-height="true" :show-confirm-bar="false" style=""  v-if="!rec_open"  class="text-black solid-bottom" :adjust-position="false" :focus="focus" maxlength="300" cursor-spacing="10"
				 @focus="InputFocus" @blur="InputBlur" v-model="content"   placeholder-style="height: 64upx;line-height: 64upx" placeholder="请输入内容">
				
				 </textarea>
				
				<view class="action" @tap="showModal" data-target="bottomModal" data-display="emoji" v-if="!modalName">
					<text class="cuIcon-emoji text-grey"></text>
				</view>
				<view class="action"  @tap="edit()" v-if="modalName=='bottomModal'">
					<text class="cuIcon-form text-grey"></text>
				</view>
				<!-- <view class="action" @tap="imChooseImage()" v-if="!send_button">
					<text class="cuIcon-camera text-grey"></text>
				</view> -->
				<view class="action"  @tap="showModal" data-target="bottomModal" data-display="add" v-if="!send_button">
					<text class="cuIcon-add text-grey"></text>
				</view>	
				
				<button class="cu-btn bg-green shadow" @tap="send_message()" v-if="send_button">发送</button>
			</view>
			<!-- 聊天框 -->
			
			
			<view ref="emoji" class="cu-bar foot" style="z-index: 9999;" :style="[{display:modalName=='bottomModal'?'block':'none'}]">
				<view class="" v-show="displayName=='emoji'">
					<chat-emoji ></chat-emoji>
				</view>
				<view v-show="displayName=='add'" class="" style="height: 520rpx;overflow-y: auto;">
					<view class="flex flex-wrap" style="min-height: 520rpx;background-color: #f1f1f1;">
						<view class="basis-xs  margin-xs padding-sm" @tap="imChooseImage()">
							<view class="cu-avatar xl" style="">
								<view class="cuIcon-camera">
									
								</view>
							</view>
						</view>
						
						<!-- #ifdef H5 -->
						<view class="basis-xs  margin-xs padding-sm" @tap="imChooseFile()">
							<view class="cu-avatar xl" style="">
								<view class="cuIcon-file">
									
								</view>
							</view>
						</view>
						<!-- #endif -->
						<view class="basis-xs  margin-xs padding-sm" @tap="imChooseVideo()">
							<view class="cu-avatar xl" style="">
								<view class="cuIcon-video">
									
								</view>
							</view>
						</view>
						
						
						
					</view>
				</view>
			</view>
			
			<view class="" style="position: fixed;left: 0;top: 0;width: 100vw;height: 100vh;z-index: 1;" @tap="hide_emoji_typewriting()" v-if="InputBottom>0" >
				
			</view>
		</view>
		<!-- 聊天框 -->
		
		
		<!-- 左边抽屉快速切换 -->
		<scroll-view  scroll-y class="DrawerWindow" :class="modalName=='viewModal'?'show':''" >
			<!-- <chat-new-group></chat-new-group> -->
			<view class="padding">
				<scroll-view scroll-x class="bg-green nav text-center radius" scroll-with-animation :scroll-left="scrollLeft">
					<view class="cu-item" :class="0==TabCur?'text-white cur':''" @tap="tabSelect" data-id="0">
						<text class="cuIcon-message"></text> 消息
					</view>
					
		
				</scroll-view>
			</view>
			<view class="">
				<scroll-view scroll-x class="" scroll-with-animation :scroll-left="scrollLeft">
					<messages :isCard="true" :change_type="2" v-if="0==TabCur"></messages>
				</scroll-view>
			</view>

		</scroll-view>
		
		<view class="DrawerClose" :class="(modalName=='viewModal'||modalName=='viewModalGroupAdd')?'show':''" @tap="hideModal">
			<text class="cuIcon-pullright"></text>
		</view>
		<!-- 左边抽屉 -->
	</view>
</template>

<script>
	import app from '@/mixins/app.js'
	import im from '@/mixins/im.js'
	import recorder from '@/mixins/recorder.js'
	export default {
		data() {
			return {
				InputBottom: 0,
				go:0,//todo,
				title:'客服',
				focus:false
			};
		},
		computed:{
			send_button(){
				return !!this.content
			},
			placeholder(){
				if(!this.send_button){
					return '其输入内容'
				}
				return ''
			},
			current_to(){//覆盖掉im.js 的current_to
				return {
					id:this.option.to?this.option.to.id:1,
					name: '客服：'+this.user.name,
					avatar: '',
				}
			}
		},
		mixins:[app,im,recorder],
		methods: {
			send_message(){
				this.im_send(1)
				this.InputBottom = 0
				this.modalName = null
				this.toEmit('im-send-after-event')
				return 
			
			},
			hide_emoji_typewriting(e){//点击屏幕 隐藏输入法等
				this.InputBottom = 0
				if(this.modalName=='bottomModal'){//表情
					this.modalName = null
				}
				
			},
			edit(){
				this.focus =false
				this.modalName = null
				this.InputBottom = 0
				this.$nextTick(()=>{
					this.focus =true
				})
			},
			async hideModal(e) {//重写app 里的方法
				if(this.modalName=='bottomModal'){
					this.modalName = null
				}else{
					this.modalName = null
				}
			},
			showModal(e){
				if(e.currentTarget.dataset.target=='bottomModal'){
					this.InputBottom = 0
					 this.modalName = null
					setTimeout(()=>{
						this.InputBottom = 260
						this.modalName = 'bottomModal'
						this.displayName = e.currentTarget.dataset.display
					},100)
				}else{
					this.modalName = e.currentTarget.dataset.target
				}
			},
		
			InputFocus(e) {
				this.InputBottom = e.detail.height
				if(!this.InputBottom){
					this.InputBottom = 1
				}else{
					this.InputBottom += 10
				}
				this.modalName = null
				return 

			},
			InputBlur(e) {
				this.InputBottom = 0
			},
			drawerWindow(e){
				this.modalName = 'viewModalGroupAdd'
			},
			chat_content(data){//表情
				this.content+=data
			},
			connectWbsocket(){
				
				
				if(this.im.socket_open){
					console.log('已经连接上了')
					return ;
				}

				uni.connectSocket({
				  url: this.im.wbsocket_url
				});
				uni.onSocketOpen( (res) =>{
					this.$store.dispatch('im/socket_open',true)
					console.log('WebSocket连接已打开！');
				});
				uni.onSocketError( (res) =>{
					clearInterval(this.im_timer)
					console.log('WebSocket连接打开失败，请检查！',res);
					this.$store.dispatch('im/socket_open',false)
				});
				uni.onSocketClose( (res) =>{
					this.$store.dispatch('im/socket_open',false)
					console.log('WebSocket 已关闭！');
					clearInterval(this.timer)
				});
				
			
				
				uni.onSocketMessage( (res)=> {
					console.log('收到服务器内容：' + res.data);
					var data = JSON.parse(res.data)
					switch(data.type){
						case 'group'://
							 this.put_message(data)
							break;
						case 'login'://绑定wbsocket
							this.option.client_id = data.client_id
							this.$store.dispatch('im/client_id',data.client_id)
							this.bindUid()
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
			async im_send(type){//覆盖掉im.js 的方法,重新定义方法
				if(type){
					this.message_type = 'text'
				}
				
			
				var user = this.user
				
				

				var params = {
					unique_slug:this.option.to.id+'-'+(new Date()).getTime()+'-'+this.$tool.randomString(10),
					from_id:user.id,
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
				
				
				
				params.client_id = this.im.client_id
				await this.$store.dispatch('im/groupSend',params)
			},
			bindUid(){//覆盖掉 im.js 的bindUid
				this.$store.dispatch('im/bindGroupUid',{'customer_service':1,client_id:this.im.client_id})
			},
			messageChange(e){
				var option = {}
				option.to = {id:e.to_id}
				option.type = e.type
				if(this.modalName=='DrawerModalL'){//左侧抽屉，只能通过点击右侧关掉
				}else{
					this.hideModal()
				}
				this.$store.dispatch('app/option',option)
			},
		},
		onUnload() {
			clearInterval(this.im_timer)
			uni.closeSocket();
			uni.$off('message-change', this.messageChange)
			uni.$off('chat-content', this.chat_content)
			uni.$off('im-send-event',this.imSendEvent)
			uni.$off('im-send-after-event',this.imSendAfterEvent)
		},
		 onLoad(option) {
			 
			// this.option.to = {id:option.to_id||1}
			
			// this.option.type = option.type||'group'
			
			this.$store.dispatch('app/option',{
				to:{id:option.to_id||1},
				type: option.type||'group'
			})
				
		},
		mounted() {
			var user = {
				id: this.$tool.randomString(9),
				name: this.$tool.randomString(2),
				avatar: '',
				divide_groups:[],//我的分组（类似于qq的好友）
				groups:[],//我加的群
				friend_groups:[],//我和好友的群（就两个人）
			}
			this.$store.dispatch('user',user)
			
			this.connectWbsocket()
			uni.$on('message-change', this.messageChange)//切换了聊天
			uni.$on('chat-content',this.chat_content)//表情添加到content
			uni.$on('im-send-event',this.imSendEvent)
			uni.$on('im-send-after-event',this.imSendAfterEvent)
			return 
			if(!this.user.id){//模拟一个用户
				var user = JSON.parse(uni.getStorageSync('user')||'{}')
				if(!user.id){
					user = {
						id: this.$tool.randomString(9),
						name: this.$tool.randomString(2),
						avatar: ''
					}
				}
				
				uni.setStorageSync('user',JSON.stringify(user))
				this.$store.dispatch('user',user)
			}
		}

	}

</script>

<style>
	@import "@/colorui/drawer.css";
	page{
	  padding-bottom: 100rpx;
	}
</style>
