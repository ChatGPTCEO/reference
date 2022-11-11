<!--
 * @name: 
 * @version: 1.1.1
 * @Author: 刘大可
 * @Date: 2022-03-24 19:35:23
 * @LastEditors: 刘大可
 * @LastEditTime: 2022-03-24 19:37:00
-->

<template>
   <view class="footer row">
       <block v-for="(item,index) in tabBar" :key="index">
           <view class="item col" :class="flg==index?'cur':''" @click="go(item)">
               <image
                    class="icon"
                    
                   :src="flg==index?item.selectedIconPath:item.iconPath"
                   mode="scaleToFill"
               />
               {{item.text}}
           </view>
       </block>
   </view>
</template>
<script>
export default {
    data() {
        return {
            tabBar:[
                {
                    pagePath:"/manage/manage/index/index",
                    text:"首页",
                    iconPath:"/static/icon/tabBar/icon1.png",
                    selectedIconPath:"/static/icon/tabBar/icon1_active.png"
                },
                {
                    pagePath:"/pages/msg/msg",
                    text:"消息",
                    iconPath:"/static/icon/tabBar/icon3.png",
                    selectedIconPath:"/static/icon/tabBar/icon3_active.png"
                },
                {
                    pagePath:"/pages/userCenter/index",
                    text:"我的",
                    iconPath:"/static/icon/tabBar/icon4.png",
                    selectedIconPath:"/static/icon/tabBar/icon4_active.png"
                }
            ]	
        }
    },
    props:{
        flg:{
            type:String,
        }
    },
    created() {
        wx.hideTabBar({
            animation:true
        })
    },
    methods: {
        go(item){
            uni.redirectTo({ url: item.pagePath })
            // uni.switchTab({ url: item.pagePath })
        }
    }
}
</script>
<style lang="scss">
    @import "./main.scss";
</style>