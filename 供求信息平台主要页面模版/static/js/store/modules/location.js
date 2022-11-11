import helper from '../../helper.js';
const state = {
	location:{
		lat:31.863433,
		lng:117.292364
	},
};
const mutations = {
	setLocation(state,param){
		state.location = param;
	},
};

export default {
  state,
  mutations
}