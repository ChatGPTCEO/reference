
import config from '@/common/config.js'
import messages from '@/fake_data/messages.js'

const state = {
	messages:JSON.parse(uni.getStorageSync('messages')||(config.fake?JSON.stringify(messages):'[]')||'[]'),//[{id/messages/type}]
	socket_open:false,
	wbsocket_url: config.wbsocket_url,
	client_id:'',
	
	grouping_user_ids:[],//已在群中的用户id
	group_checked_user_ids:[],//已经选中的group_checked_user_ids
	
	pull_refresh:false,//下拉刷新的时候不滚动聊天记录，除非新进入一个聊天框或者手动发送信息
}

const mutations = {


	messages: (state, data) => {
		uni.setStorageSync('messages',JSON.stringify(data))
		state.messages = data
	},

	socket_open: (state, data) => {
		state.socket_open = data
	},
	client_id: (state, data) => {
		state.client_id = data
	},
	grouping_user_ids: (state, grouping_user_ids) => {
		state.grouping_user_ids = grouping_user_ids
	},
	group_checked_user_ids: (state, group_checked_user_ids) => {
		state.group_checked_user_ids = group_checked_user_ids
	},
	pull_refresh: (state, pull_refresh) => {
		state.pull_refresh = pull_refresh
	},



}

const actions = {
	send({commit,state}, params){//登录后，可以好友聊，群聊
		return this._vm.$request.post('api.im.send',params).then(res=>{
			if(res.data.code==0){
				
			}
			return res;
		})
	
	},
	groupSend({commit,state}, params){//不登录，就能在大群聊
		return this._vm.$request.post('api.im.groupSend',params).then(res=>{
			if(res.data.code==0){
				
			}
			return res;
		})
	
	},
	bindUid({commit,state}, { ...params}) {//正常的需登录好友聊，群聊等
		return this._vm.$request.post('api.im.bindUid',{...params}).then(res=>{
			if(!res.data.code){
				
			}
			return res;
		})
	},
	bindGroupUid({commit,state}, { ...params}) {//不需登录就可在一个大群里聊，常用与，沟通交流
		return this._vm.$request.post('api.im.bindGroupUid',{...params}).then(res=>{
			if(!res.data.code){
				
			}
			return res;
		})
	},
	joinGroup({commit,state}, data) {
		return this._vm.$request.post('api.im.joinGroup',data).then(res=>{
			if(!res.data.code){
				
			}
			return res;
		})
	},
	uploadImage({commit,state}, filepath) {
		return this._vm.$request.upload('api.upload.image',filepath).then(res=>{
			if(!res.data.code){
				
			}
			return res;
		})
	},
	uploadVideo({commit,state}, filepath) {
		return this._vm.$request.upload('api.upload.video',filepath).then(res=>{
			if(!res.data.code){
				
			}
			return res;
		})
	},
	uploadAudio({commit,state}, data) {//通过base64 上传
		return this._vm.$request.post('api.upload.audio',data).then(res=>{
			if(!res.data.code){
				
			}
			return res;
		})
	},
	uploadFileAudio({commit,state}, data) {//通过base64 上传
		return this._vm.$request.upload('api.upload.fileAudio',data).then(res=>{
			if(!res.data.code){
				
			}
			return res;
		})
	},
	uploadFile({commit,state}, filepath) {
		// console.log(formData,'3232')
		return this._vm.$request.upload('api.upload.file',filepath).then(res=>{
			if(res.data.code){
				
			}
			return res;
		})
	},
	getMessages({commit,state},data){
		return this._vm.$request.get('api.im.messages',data).then(res=>{
			console.log(res,'messages')
			if(res.data.code==0){
				
			}
			return res;
		})
	},
	socket_open({commit,state},data){
		commit('socket_open',data)
	},
	client_id({commit,state},data){
		commit('client_id',data)
	},
	messages({commit,state},messages){
		commit('messages',messages)
	},
	removeMessagesByIndex({commit,state},index){
		var messages = JSON.parse(JSON.stringify(this.state.im.messages))
		messages.splice(index,1)
		commit('messages',messages)
	},
	grouping_user_ids({commit,state},data){//已在群中的用户id
		commit('grouping_user_ids',data)
	},
	group_checked_user_ids({commit,state},data){//加群用户id
		commit('group_checked_user_ids',data)
	},
	pull_refresh({commit,state},pull_refresh){//加群用户id
		commit('pull_refresh',pull_refresh)
	}

}

export default {
	namespaced: true,
	state,
	mutations,
	actions
}
