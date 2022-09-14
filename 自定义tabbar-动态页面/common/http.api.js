/*
接口统一管理配置
*/
import config from '@/common/environment.js';
const BASE_API=config.BASE_API+"/";
const multipartUrl=config.MULTIPART_API+"/";
const  install = (Vue, vm) => {
	// 将各个定义的接口名称，统一放进对象挂载到vm.$u.api(因为vm就是this，也即this.$u.api)下
	const  sys={
		login: (params = {}) => vm.$u.post(BASE_API+'accountapi/passport/passwdlogin',params,{'type':'form'}),
		getUserInfo: (params = {}) => vm.$u.post(BASE_API+'accountapi/passport/myinfo',params),
		wxLogin:(params = {}) => vm.$u.post(BASE_API+'accountapi/wx/login',params),
		logout :(params = {}) => vm.$u.post(BASE_API+'logout', params),
	}
	const  attachment = {
		uploadFormatBase64 :(params) => vm.$u.post(BASE_API+'sys/attachment/uploadFormatBase64',params),
	}

	vm.$u.api = {sys,attachment};
}
export default {
	install
}
