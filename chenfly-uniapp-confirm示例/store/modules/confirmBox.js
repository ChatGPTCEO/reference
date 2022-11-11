const state = {
    componentNames: [],
	
}

const mutations = {
    SET_COMPONENT_NAMES(state,names) {
		if(names.hasOwnProperty('name')){
			let has = state.componentNames.filter(item => item.name == names.name);
			if(has.length) return;
        }
        state.componentNames.push({confirm:()=>{},cancel:()=>{},close:()=>{},...names});
    },
	DELETE_COMPONENT_NAMES(state,id){
		state.componentNames.splice(id,1);
	}
}

const actions = {
	
}

const getters = {
    componentNames: state => state.componentNames
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}