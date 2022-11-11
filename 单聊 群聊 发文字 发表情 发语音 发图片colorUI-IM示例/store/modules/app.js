
import config from '@/common/config.js'

const state = {
	name:'jcc',
	api_domain: config.api_domain,
	users:[],
	option:{}
}

const mutations = {

	users: (state, users) => {
		state.users = users
	},
	option: (state, option) => {
		state.option = option
	},



}

const actions = {
	users({commit,state}, { ...params}){
		return this._vm.$request.get('api.user.users',{...params}).then(res=>{
			if(res.data.code==0){
				commit('users',res.data.data.lists)
			}
			return res;
		})
	},
	option({commit,state}, option){
		commit('option',option)
	},
}

export default {
	namespaced: true,
	state,
	mutations,
	actions
}
