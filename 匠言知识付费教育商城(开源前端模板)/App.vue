/**
 * 匠言知识付费v2.0.0
 * Author: 山西匠言网络科技有限公司
 * 这不是一个免费软件，它受限于许可条款，你可以访问https://www.zsfzxkc.cn/获取更多详细信息。
 * This is not a free software, it under the license terms, you can visit https://www.zsffzxkc.cn/ get more details.
 */
<script>
export default {
	onLaunch: function(e) {
		if(e.query){
			console.log(e.query)
			const scene = decodeURIComponent(e.query.scene)
			if(e.query.pid && e.query.pid!=''){
				uni.setStorageSync('pid',e.query.pid)
			}else if(scene && scene!=''){
				uni.setStorageSync('pid',scene)
			}
		}
		uni.HOST_URL = 'https://jyzsff581.sxjiangyan.com'
		uni.H5_URL = 'https://jyzsff581h5.sxjiangyan.com'
		uni.BASE_URL='https://jyzsff581.sxjiangyan.com/index.php/'
		uni.WSS_URL = 'wss://jyzsff581.sxjiangyan.com/wss'
		const BASE_URL = uni.BASE_URL
		uni.request({
			url: BASE_URL+'index/set/base_set',
			method:'GET',
			success:(res) =>{
				console.log(res.data);
				if(res.data.data.title==''){
					res.data.data.title='匠言知识付费'
				}
				uni.setStorageSync('base_set',res.data.data)
			},
			fail:(res)=> {
				console.log(res.data);
			}
		});
		// #ifdef H5
		var set=uni.getStorageSync('base_set')
		var that=this
		var userinfo=uni.getStorageSync('userinfo')
		const HOST_URL=uni.HOST_URL
		
		if(userinfo && userinfo.uid){
			var link=uni.H5_URL+'?pid='+userinfo.uid
		}else{
			var link=uni.H5_URL
		}
		if (this.$jwx && this.$jwx.isWechat()) {
			this.$jwx.share({
				'title': set.share_title,
				'desc': set.share_desc,
				'link': link,
				'img_url': HOST_URL+set.share_icon,
			})
			this.$jwx.sharepyq({
				'title': set.share_title,
				'link': link,
				'img_url': HOST_URL+set.share_icon,
			})
		}
		// #endif
	},
	onShow: function() {
		console.log('App Show');
	},
	onHide: function() {
		console.log('App Hide');
	}
};
</script>

<style>
/* 解决头条小程序组件内引入字体不生效的问题 */
body {
	background-color: #f6f6f6;
}
/* #ifdef H5 */
    uni-page-head {
        display: none;
    }
/* #endif */

</style>
