/*
 * @name: 
 * @version: 1.1.1
 * @Author: 刘大可
 * @Date: 2022-03-24 09:40:13
 * @LastEditors: 刘大可
 * @LastEditTime: 2022-04-13 18:38:37
 */
import Vue from 'vue';
import tips from "./tools/tips.js";
import date from "./tools/date.js";
import img from "./tools/img.js";
Vue.prototype.tips = tips
Vue.prototype.date = date
Vue.prototype.go = function (url) {
    console.log(url);
    uni.navigateTo({
            url
    });
}
Vue.prototype.login= async function (){
    return new Promise( async (resolve, reject)=> {
        if (!uni.getStorageSync('token')) {
            let res = await this.tips.choose("请先登录！")
			if(res.code==200)
			{
				uni.navigateTo({
					url: "/gc_school/pages/login/login"
				});
			}
			return reject()
        }else{
            return resolve()
        }

    })
   
   
}
Vue.prototype.getLocations=function (){
    return new Promise( (resolve, reject)=> {
        return uni.getLocation({
            success:(res)=>{
				console.log("调用获取当前位置方法")
				uni.setStorageSync('latitude',res.latitude)
				uni.setStorageSync('longitude',res.longitude)
                return resolve(res)
            },
            fail:(err)=>{
                return reject(err)
            }
        })
    })
}

Vue.prototype.configInfo = {
    color: '#fff'
}
Vue.prototype.compress =async function(url){
     url = await img.compressEvent(url)
    return url.tempFilePath
}

Vue.prototype.request = function (url,data){
    var app = getApp()
    return new Promise((resolve, reject) => {
        return app.globalData.util.request({
            url, data,
            success: (res) => {
                return resolve(res)
            },
            fail: (err) => {
                return reject(err)
            }
        })
    })

   
}
// async function getConfig(){
//     return new Promise((resolve, reject)=>{
    //    return 
       uni.getSystemInfo({
            success: function (e) {
                // #ifndef MP
                Vue.prototype.StatusBar = e.statusBarHeight;
                if (e.platform == 'android') {
                    Vue.prototype.configInfo.CustomBar = e.statusBarHeight + 50;
                } else {
                    Vue.prototype.configInfo.CustomBar = e.statusBarHeight + 45;
                };
                // #endif

                // #ifdef MP-WEIXIN
                // Vue.prototype.StatusBar = e.statusbarHeight;
                let statusBar = e.statusBarHeight;
                // if (!statusBar) {
                // statusBar = e.statusbarHeight;
                // }
                // statusBar = e.statusbarHeight;
                Vue.prototype.configInfo.StatusBar = statusBar;
                let custom = wx.getMenuButtonBoundingClientRect();

                Vue.prototype.configInfo.Custom = custom;
                Vue.prototype.configInfo.CustomBar = custom.bottom + custom.top - statusBar;
                // #endif		

                // #ifdef MP-ALIPAY
                Vue.prototype.configInfo.StatusBar = e.statusBarHeight;
                Vue.prototype.configInfo.CustomBar = e.statusBarHeight + e.titleBarHeight;
                // #endif

                return {

                    StatusBar: 123,

                    CustomBar: 333
                }
            }
        })

    // })

// }

// module.exports =



// console.log(config);
