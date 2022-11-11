import Vue from 'vue';
import Vuex from 'vuex';
import confirm from './modules/confirmBox.js'
Vue.use(Vuex)
const store = new Vuex.Store({
    modules:{
		confirm
	}
})
export default store