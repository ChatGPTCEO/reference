export const get_provider = () => { 
   let	 p = new Promise(function(resolve, reject){
	        //做一些异步操作
	        // setTimeout(function(){
	        //     console.log('执行完成');
	        //     resolve('随便什么数据');
	        // }, 2000);
			let provider_list = []
			uni.getProvider({
				service: "share",
				success: function(res) {
						console.log(res.provider)
					res.provider.forEach(function(item, index) {
						switch (item) {
							case "weixin":
								provider_list.push({
									name: "微信好友",
									url: "../../static/share_icon/weixin.png",
								});
								provider_list.push({
									name: "微信朋友圈",
									url: "../../static/pengyouquan.png",
								});
								break;
							case "qq":
								provider_list.push({
									name: "QQ",
									url: "../../static/share_icon/QQ.png",
								});
								break;
							case "sinaweibo":
								provider_list.push({
									name: "微博",
									url: "../../static/share_icon/weibo.png",
								});
								break;
						}
						if(provider_list.length == 4){
							resolve(provider_list)
						}
							
					});
						
						
				},
			});
			
	    });
	
	
	
	
	return p 
	  
	  
}