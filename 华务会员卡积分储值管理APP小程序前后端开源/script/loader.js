
function getUser(){
	return uni.getStorageSync('userdata')
}


var modules ={
		'format_date':date,
		'api':api,
		'getUser':getUser
	}

import date from './date.js'
import api from './api.js'

module.exports = (vue)=>{
	for(let key in modules){
		console.log('['+key+'] loading ...')
		vue.prototype[key] = modules[key]
	}
}