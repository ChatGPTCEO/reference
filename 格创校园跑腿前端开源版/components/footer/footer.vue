<!--
 * @name: 公共底部组件
 * @version: 1.1.1
 * @Author: 刘大可
 * @Date: 2022-02-11 17:50:12
 * @LastEditors: 刘大可
 * @LastEditTime: 2022-04-13 17:21:31
-->
<template>
   <view class="footer flex">
        <block v-for="(item,index) in tabBar" :key="index">
            <view class="item flex" :class="flg==index?'cur':''" @click="go(item)">
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
                    "pagePath": "/gc_school/pages/home/index",
                    "iconPath": "/static/tabbar/home.png",
                    "selectedIconPath": "/static/tabbar/home_s.png",
                    "text": "首页"
                },
                {
                    "pagePath": "/gc_school/pages/article/index",
                    "iconPath": "/static/tabbar/quanzi.png",
                    "selectedIconPath": "/static/tabbar/quanzi_s.png",
                    "text": "圈子"
                },
                {
                    "pagePath": "/gc_school/pages/order/index",
                    "iconPath": "/static/tabbar/order.png",
                    "selectedIconPath": "/static/tabbar/order_s.png",
                    "text": "订单"
                },
                {
                    "pagePath": "/gc_school/pages/user/index",
                    "iconPath": "/static/tabbar/my.png",
                    "selectedIconPath": "/static/tabbar/my_s.png",
                    "text": "我的"
                }
                // {
                //     pagePath:"/pages/tabBar/index/index",
                //     text:"首页",
                //     iconPath:"/static/icon/tabBar/icon1.png",
                //     selectedIconPath:"/static/icon/tabBar/icon1_active.png"
                // },
                // {
                //     pagePath:"/pages/tabBar/product/product",
                //     text:"产品",
                //     iconPath:"/static/icon/tabBar/icon2.png",
                //     selectedIconPath:"/static/icon/tabBar/icon2_active.png"
                // },
                // {
                //     pagePath:"/pages/tabBar/shopCar/shopCar",
                //     text:"购物车",
                //     iconPath:"/static/icon/tabBar/icon3.png",
                //     selectedIconPath:"/static/icon/tabBar/icon3_active.png"
                // },
                // {
                //     pagePath:"/pages/tabBar/me/me",
                //     text:"我的",
                //     iconPath:"/static/icon/tabBar/icon4.png",
                //     selectedIconPath:"/static/icon/tabBar/icon4_active.png"
                // }
            ]	
        }
    },
    props:{
        flg:{
            type:String,
        }
    },
    created() {
        // uni.hideTabBar({
        //     animation:true
        // })
    },
    methods: {
        go(item){
            // // uni.switchTab({ url: item.pagePath })
            // uni.redirectTo({
            //      url: item.pagePath 
            // });
            // uni.redirectTo({ url: '/pages/' })
            uni.reLaunch({
                 url: item.pagePath 

            });
        }
    }
}
</script>
<style lang="scss">
    @import "./main.scss";
</style>