<template>
	<view class="right-window-chat-width" v-if="option.to&&option.to.id">
		
		<view  style="" class="right-window-chat-width" >
			<cu-custom-width  bgColor="bg-gradual-pink" >
				<block slot="content">{{title}}</block> 
				<block slot="right">
				
				</block>
			</cu-custom-width>
			
			<!-- 聊天记录-->
				<view class="">
					<view  class="text-center" @tap="pullRefresh()">点我加载更多</view>
					<chat-list :current_messages="current_messages"  :is_pop_up="modalName=='bottomModal'"></chat-list>
				</view>
			<!-- 聊天记录-->
			
			
			
			<view class="" style="display: none;">
				{{current_to.id}}
			</view>
			<!-- 聊天框 -->
			
			<view ref="input" class="cu-bar foot input right-window-chat-width too" style="z-index: 9999;" @tap.stop="" :style="[{bottom:InputBottom*2+'rpx'}]">
				<view class="action" @tap="recOpen()" v-if="!rec_open">
					<text class="cuIcon-sound text-grey"></text>
				</view>
				<view class="action text-black"  @tap="recCancel()" v-if="rec_open">
					 取消
				</view>
				<input @tap="recStart()" v-if="rec_open" class="solid-bottom" disabled="true" :placeholder="audio_plachodler" placeholder-style="text-align:center">
				<textarea  auto-height="true" :show-confirm-bar="false" style=""  v-if="!rec_open"  class="text-black solid-bottom" :adjust-position="false" :focus="focus" maxlength="300" cursor-spacing="10"
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
						<view class="basis-xs  margin-xs padding-sm" @tap="imChooseImage(1)">
							<view class="cu-avatar xl" style="">
								<view class="cuIcon-camera">
									
								</view>
							</view>
						</view>
						
						<!-- #ifdef H5 -->
						<view class="basis-xs  margin-xs padding-sm" @tap="imChooseFile(1)">
							<view class="cu-avatar xl" style="">
								<view class="cuIcon-file">
									
								</view>
							</view>
						</view>
						<!-- #endif -->
						<view class="basis-xs  margin-xs padding-sm" @tap="imChooseVideo(1)">
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
		<view class="">
			
		</view>
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
				title:'聊天',	
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
			}
		},
		mixins:[app,im,recorder],
		methods: {
			pullRefresh(){
				uni.showLoading({
					
				})
				this.imPullRefresh()
				uni.hideLoading()
			},
			async send_message(){
				await this.im_send(1)
				this.InputBottom = 0
				this.modalName = null
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
				console.log('message-change')
				uni.setStorageSync('option',JSON.stringify(option))//保存当前的聊天窗口
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
			console.log('chat with mounted!!! ',this._isWidescreen)
			if(this.option.to&&this.option.to.id){
				uni.setStorageSync('option',JSON.stringify(this.option))
			}else{
				var option =  JSON.parse(uni.getStorageSync('option')||'{}')//避免刷新页面后没有值是组件需要，非组件不需要
				if(option.to&&option.to.id){
					// .option = option
				}else{
					option = {//一个默认的值，上线可替换掉
						to:{
							id:1
						},
						type:'group'
					}
				}
				// this.option = option
				this.$store.dispatch('app/option',option)
				uni.setStorageSync('option',JSON.stringify(option))
			}
			this.connectWbsocket()
			uni.$on('message-change', this.messageChange)//切换了聊天
			uni.$on('display-drawer-window', this.drawerWindow)//显示抽屉
			uni.$on('chat-content',this.chat_content)//表情添加到content
			uni.$on('im-width-send-event',this.imSendEvent)
			uni.$on('im-send-after-event',this.imSendAfterEvent)
			console.log('chat with mounted!!!',this.option)
			
			
		},
		destroyed() {
			uni.$off('message-change', this.messageChange)
			uni.$off('display-drawer-window', this.drawerWindow)
			uni.$off('chat-content', this.chat_content)
			uni.$off('im-width-send-event',this.imSendEvent)
			uni.$off('im-send-after-event',this.imSendAfterEvent)
		},
		onUnload() {
			// clearInterval(this.timer)
			// uni.closeSocket();
			uni.$off('message-change', this.messageChange)
			uni.$off('display-drawer-window', this.drawerWindow)
			uni.$off('chat-content', this.chat_content)
			uni.$off('iim-width-send-event', this.imSendEvent)			
			uni.$off('im-send-after-event',this.imSendAfterEvent)
			// uni.$off('chat-modal', this.chat_modal)
			
		},

	}
</script>

<style>
	page{
	  padding-bottom: 100rpx;
	}


</style>
