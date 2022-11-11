<template>
    <block>
        <view v-if="tabBar" class="we7-bottom" :style="'background-color:' + tabBar.backgroundColor + ';border-color:' + tabBar.borderStyle">
            <block v-for="(item, index) in tabBar.list" :key="index">
                <view class="we7-bottom-item" v-if="item.pageUrl == '/' + thisurl" hover-class="active">
                    <navigator :url="item.pagePath" open-type="redirect" hover-class="active">
                        <image :src="item.selectedIconPath" mode="widthFix" class="item-img"></image>
                        <view class="item-text" :style="'color: ' + tabBar.selectedColor + ';'">{{ item.text }}</view>
                    </navigator>
                </view>

                <view class="we7-bottom-item" v-else hover-class="active">
                    <navigator :url="item.pagePath" open-type="redirect" hover-class="active">
                        <image :src="item.iconPath" mode="widthFix" class="item-img"></image>
                        <view class="item-text" :style="'color: ' + tabBar.tabBarcolor">{{ item.text }}</view>
                    </navigator>
                </view>
            </block>
        </view>
        <view class="we7-bottom-placeholder"></view>
    </block>
</template>

<script>
// we7/pages/component/footer/footer.js
var app = getApp();
export default {
    data() {
        return {
            thisurl: ''
        };
    },
    /**
     * 组件的属性列表
     */
    props: {
        tabBar: {
            type: Object,
            default: app.globalData.tabBar
        }
    },
    /**
     * 组件的方法列表
     */
    methods: {},
    created() {}
};
</script>
<style>
.we7-bottom-placeholder {
    width: 100%;
    height: 134rpx;
    position: relative;
    bottom: 0;
    z-index: -1;
}

.we7-bottom {
    display: flex;
    overflow: hidden;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 10rpx 0;
    border-top: 1px solid #000;
    background-color: #fff;
}

.we7-bottom.active {
    background-color: #fff;
}

.we7-bottom.active navigatorurl {
    background-color: #fff;
}

.we7-bottom .we7-bottom-item {
    flex: 1;
    padding: 10rpx;
    text-align: center;
}

.we7-bottom .item-img {
    width: 50rpx;
    height: 50rpx;
    display: inline-block;
}

.we7-bottom .item-text {
    display: block;
    font-size: 12px;
    line-height: 1;
}
</style>
