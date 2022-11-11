<template>
	<view class="bg-gradual-blue">
		
		<view  class="DrawerPage" style="" :class="(modalName=='viewModal'||modalName=='viewModalGroupAdd')?'show':''">
			<cu-custom bgColor="bg-gradual-pink" :isBack="true" ><block slot="content">{{title}}</block> <block slot="right">
				<view class="action"  >
					<!-- <text class="cuIcon-add" @tap="showModal" data-target="viewModalGroupAdd"></text> -->
					<!-- <text class="cuIcon-add" @tap="hide_emoji_typewriting"></text> -->
					<!-- #ifndef MP-WEIXIN -->
					<text class="cuIcon-add" @tap="add_user_to_currnt_group()" data-target="DrawerModalL"></text>
					<text class="cuIcon-more" @tap="showModal" data-target="viewModal"></text>
					<!-- #endif -->
					
				</view>
			</block>
			</cu-custom>
			
			<!-- 聊天记录-->
				<view class="">
					<chat-list :current_messages="current_messages"  :is_pop_up="modalName=='bottomModal'"></chat-list>
				</view>
			<!-- 聊天记录-->
			
			<!-- 左边抽屉 -->
			<view class="cu-modal drawer-modal justify-start" :class="(modalName=='DrawerModalL'||modalName=='viewModalGroupAdd')?'show':''" @tap="hideModal">
				<view @tap.stop="" class="cu-dialog basis-lg" style="min-width: 85vw;"  :style="[{top:CustomBar+'px',height:'calc(100vh - ' + CustomBar + 'px)'}]">
					
					<chat-left></chat-left>
				</view>
				<text class="cuIcon-add" @tap="showModal" data-target="viewModalGroupAdd"></text>
			</view>
			<!-- 左边抽屉 -->
			
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
				<!-- <view class="action"  @tap="imChooseImage()" v-if="!send_button">
					<text class="cuIcon-camera text-grey"></text>
				</view> -->
				<view class="action"  @tap="showModal" data-target="bottomModal" data-display="add" v-if="!send_button">
					<text class="cuIcon-add text-grey"></text>
				</view>	
				<!-- <view class="action" @tap="imChooseVideo()"  data-display="add" v-if="!send_button">
					<text class="cuIcon-add text-grey"></text>
				</view> -->
				
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
					<view class="cu-item" :class="1==TabCur?'text-white cur':''" @tap="tabSelect" data-id="1">
						<text class="cuIcon-my"></text> 好友
					</view>
					<view class="cu-item" :class="2==TabCur?'text-white cur':''" @tap="tabSelect" data-id="2">
						<text class="cuIcon-group"></text> 群
					</view>
						<view class="cu-item" :class="3==TabCur?'text-white cur':''" @tap="tabSelect" data-id="3">
						<text class="cuIcon-info"></text> 兴趣组
					</view>
		
				</scroll-view>
			</view>
			<view class="">
				<scroll-view scroll-x class="" scroll-with-animation :scroll-left="scrollLeft">
					<messages :isCard="true" :change_type="2" v-if="0==TabCur"></messages>
					<friends :isCard="true" :change_type="2" v-if="1==TabCur"></friends>
					<groups :isCard="true" :change_type="2" v-if="2==TabCur"></groups>
					<random-chat-index :isCard="true" :change_type="3" v-if="3==TabCur"></random-chat-index>
					
				</scroll-view>
			</view>

		</scroll-view>
		
	
		<!-- 左边抽屉添加拉群-->
		
		<scroll-view scroll-y class="DrawerWindow" :class="modalName=='viewModalGroupAdd'?'show':''">			
				<chat-add-user-to-group></chat-add-user-to-group>
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
	import random_chat from '@/mixins/random_chat.js'


	export default {
		data() {
			return {
				title:'聊天',
				avatar:['https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg','https://ossweb-img.qq.com/images/lol/web201310/skin/big81005.jpg','https://ossweb-img.qq.com/images/lol/web201310/skin/big25002.jpg','https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg'],
				
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
			}
		},
		mixins:[app,im,recorder,random_chat],
		methods: {
			send_message(){
				
				this.im_send(1)
				this.toEmit('im-send-after-event')
				
			},
			hide_emoji_typewriting(e){//点击屏幕 隐藏输入法等
				console.log(132132)
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
				if(this.modalName=='viewModalGroupAdd'){//聊天页面全屏抽屉关闭后展示左边抽屉
					//此时选择完了要加群的用户，这里加个群
					if(this.im.group_checked_user_ids.length>0){
						await this.imJoinGroup()
						console.log(212332132132)
					}
					this.modalName='DrawerModalL'
					console.log(9999999)
				}else if(this.modalName=='bottomModal'){
					this.modalName = null
					console.log(21323)
				}else{
					this.modalName = null
				}
			},
			showModal(e){
				if(e.currentTarget.dataset.target=='bottomModal'){
					this.InputBottom = 0
					 this.modalName = null
					this.displayName = null
					
					setTimeout(()=>{
						
						this.InputBottom = 260
						this.modalName = 'bottomModal'
						this.displayName = e.currentTarget.dataset.display
					},200)
				}else{
					this.modalName = e.currentTarget.dataset.target
				}
			},
		
			InputFocus(e) {
				console.log(e.detail.height,'input')
				// alert(e.detail.height)
				
				this.InputBottom = e.detail.height
				if(!this.InputBottom){
					this.InputBottom = 1
				}else{
					this.InputBottom += 10
				}
				this.modalName = null
				return 
				if(this.InputBottom){
					this.modalName = null
					this.InputBottom = 0
				}else{
					this.InputBottom = e.detail.height
				}
				//小程序 页面整体高度加了 键盘的高度，其他的是键盘高度将页面高度压缩了
				//#ifdef MP-WEIXIN
				this.InputBottom = 260
				//#endif
				
				// this.InputBottom = this.InputBottom>150?(e.detail.height-300):e.detail.height
				// this.modalName = null //输入法吊起所有隐藏
			},
			InputBlur(e) {
				
				this.InputBottom = 0
				return 
				//#ifdef MP-WEIXIN
				this.InputBottom = 0
				//#endif
				// this.InputBottom = 0
			},
			
			async add_user_to_currnt_group(){
				this.init_grouping_user_ids_and_group_checked_user_ids()
				this.modalName = 'DrawerModalL'
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
			drawerWindow(e){
				this.modalName = 'viewModalGroupAdd'
			},
			chat_content(data){//表情
				this.content+=data
			},
			chat_modal(data){
				this.modalName = data
			},
		},

		mounted() {
			
			console.log('chat mounted!!!')
			console.log(this.option,'chat mounted option')
			this.connectWbsocket()
			uni.$on('message-change', this.messageChange)//切换了聊天
			uni.$on('display-drawer-window', this.drawerWindow)//显示抽屉
			uni.$on('chat-content',this.chat_content)//表情添加到content
			
			//发送事件
			uni.$on('im-send-event',this.imSendEvent)
			uni.$on('im-send-after-event',this.imSendAfterEvent)
			
		},
		destroyed() {
			uni.$off('message-change', this.messageChange)
			uni.$off('display-drawer-window', this.drawerWindow)
			uni.$off('chat-content', this.chat_content)
			uni.$off('im-send-event',this.imSendEvent)
			uni.$off('im-send-after-event',this.imSendAfterEvent)
		},
		onUnload() {
			// clearInterval(this.timer)
			// uni.closeSocket();
			uni.$off('message-change', this.messageChange)
			uni.$off('display-drawer-window', this.drawerWindow)
			uni.$off('chat-content', this.chat_content)
			// uni.$off('chat-modal', this.chat_modal)
			
		},
		 onLoad(option) {
			 var new_option = {}
			new_option.to = {id:option.to_id}
			new_option.type = option.type	
			console.log('chat onLoad!!!')
			// this.toEmit('message-change',option)
			this.$store.dispatch('app/option',new_option)
			this.random_chat_get_lists({group_id:new_option.to.id})
		},

	}
</script>

<style>
	@import "@/colorui/drawer.css";
	page{
	  padding-bottom: 100rpx;
	}
</style>
