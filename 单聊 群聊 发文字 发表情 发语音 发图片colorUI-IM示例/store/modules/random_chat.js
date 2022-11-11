

const state = {
	lists:[]
}

const mutations = {

	
	lists: (state, lists) => {
		state.lists = lists
	},



}

const actions = {
	get_lists({commit,state}, { ...params}){
		return this._vm.$request.get('api.randomchat.byGroupId',{...params}).then(res=>{
			if(res.data.code==0){
				commit('lists',res.data.data.lists)
			}
			return res;
		})
	},
	join({commit,state}, { ...params}){
		return this._vm.$request.post('api.randomchat.join',{...params}).then(res=>{
			if(res.data.code==0){
				// commit('lists',res.data.data.lists)
			}
			return res;
		})
	},
	lists({commit,state}, data){
		commit('lists',data)
	}
}

export default {
	namespaced: true,
	state,
	mutations,
	actions
}
