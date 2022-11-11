const state = {
  skinColor:'#f44336'
};
const mutations = {
	setSkinColor(state,param){
		state.skinColor = param;
	}
};
export default {
    state,
    mutations
}