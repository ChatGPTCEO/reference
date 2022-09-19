<!-- /* <style lang="scss">
	@import "uview-ui/index.scss";
</style> */ -->
<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			// #ifdef APP-PLUS  
			plus.runtime.getProperty(plus.runtime.appid, function(widgetInfo) {  
				console.log('211111111111版本号是'+widgetInfo.version+widgetInfo.name)
			    uni.request({  
			        url: 'http://www.example.com/update/',  
			        data: {  
			            version: widgetInfo.version,  
			            name: widgetInfo.name  
			        },  
			        success: (result) => {  
			            var data = result.data;  
			            if (data.update && data.wgtUrl) {  
			                uni.downloadFile({  
			                    url: data.wgtUrl,  
			                    success: (downloadResult) => {  
			                        if (downloadResult.statusCode === 200) {  
			                            plus.runtime.install(downloadResult.tempFilePath, {  
			                                force: false  
			                            }, function() {  
			                                console.log('install success...');  
			                                plus.runtime.restart();  
			                            }, function(e) {  
			                                console.error('install fail...');  
			                            });  
			                        }  
			                    }  
			                });  
			            }  
			        }  
			    });  
			});  
			// #endif
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
	@import "uview-ui/index.scss";
	/* 阿里云自定义图标库 */
	@import "common/aliicon.css";
</style>
