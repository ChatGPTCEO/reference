import  config from './config.js';
import store from './store/store.js';

const  post   =  function (url,params){
	if(!params) params = new Object;
	params.device = config.dev;
	params.b2b_id  = config.b2bId;
	let newUrl = '';
	if(url.indexOf('platform') > -1){
		newUrl = url;
	}else{
		newUrl = 'b2b/miniapp/' + url
	}
	return  new Promise((resolve,reject) => {
		uni.request({
		    url: config.apiUrl + newUrl, //仅为示例，并非真实接口地址。
		    data: params,
			method:'POST',
		    success: (res) => {
				uni.hideLoading(); 
				if(res.statusCode == 200){
					if(res.data.code == 200){
						if(res.data.code == 100){ //未登录的情况
							store.commit('setMember',null);
							reject({
								code:res.data.code,
								msg:res.data.msg
							});	
						}else{
							resolve(res.data.data);	
						}
					}else{
						
						uni.showToast({
							icon:'none',
							title:res.data.msg
						});
						reject({
							code:res.data.code,
							msg:res.data.msg
						});	
					}
				}else{
					
					uni.showToast({
						icon:'none',
						title:"网络异常"
					});
					reject({
						code:500,
						msg:'网络异常'
					});
				}  
		    },
			fail:(res)=>{
				uni.hideLoading(); 
				uni.showToast({
					icon:'none',
					title:"服务器繁忙"
				});
				reject({
					code:500,
					msg:'服务器繁忙'
				});
			}
		});
		
	});
}


//需要登录的使用这个
const api  = function(url,params){
	if(!params) params = new Object;
	let token = uni.getStorageSync('member-token');
	params.auth_token = token;
	return this.post(url,params);
}

export default {
	post,
	api
}