const state = {
  global:{
	  helper:'', //商家制作小程序的助手
	  b2b:'',//B2B制作小程序的助手
  },
  site:{
	  name:'',
	  logo:'',
	  tel:'',
	  weixin:'',
	  qrcode:'',
  },
};
const mutations = {
	setGlobalData(state,param){
		state.global = param;
	},
	setSiteData(state,param){
		state.site = param;
	}
};
export default {
    state,
    mutations
}