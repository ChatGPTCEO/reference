import Vue from 'vue';
import  Vuex  from 'vuex';
Vue.use(Vuex);

import member from './modules/member.js';
import location from './modules/location.js';
import template from './modules/template.js';
import datas from './modules/datas.js';
const modules = {
	member,
	location,
	template,
	datas
};

const store = new Vuex.Store({
	modules
});

export default store