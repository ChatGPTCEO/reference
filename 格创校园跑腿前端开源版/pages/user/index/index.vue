<template>
    <block>
        <view class="container">
            <view class="textContainer">
                <text class="textStyle">{{ text }}</text>
            </view>
        </view>

        <!-- parse <template is="footerWx" :data="...tabBar"/> -->
        <block name="footerWx">
            <view v-if="list" class="we7-bottom" :style="'background-color:' + backgroundColor + ';border-color:' + borderStyle">
                <block v-for="(item, index) in list" :key="index">
                    <view class="we7-bottom-item" v-if="item.pageUrl == '/' + thisurl" hover-class="active">
                        <navigator :url="item.pagePath" open-type="redirect" hover-class="active">
                            <image :src="item.selectedIconPath" mode="widthFix" class="item-img"></image>
                            <view class="item-text" :style="'color: ' + selectedColor + ';'">{{ item.text }}</view>
                        </navigator>
                    </view>

                    <view class="we7-bottom-item" v-else hover-class="active">
                        <navigator :url="item.pagePath" open-type="redirect" hover-class="active">
                            <image :src="item.iconPath" mode="widthFix" class="item-img"></image>
                            <view class="item-text" :style="'color: ' + color">{{ item.text }}</view>
                        </navigator>
                    </view>
                </block>
            </view>
            <view class="we7-bottom-placeholder"></view>
        </block>
    </block>
</template>

<script>
var app = getApp();
export default {
    data() {
        return {
            text: '微擎我的',
            list: [],
            backgroundColor: '',
            borderStyle: '',
            thisurl: '',
            selectedColor: '',
            color: ''
        };
    },
    onLoad: function (options) {
        // 页面初始化 options为页面跳转所带来的参数
        app.globalData.util.footer(this);
    },
    onReady: function () {
        // 页面渲染完成
    },
    onShow: function () {
        // 页面显示
    },
    onHide: function () {
        // 页面隐藏
    },
    onUnload: function () {
        // 页面关闭
    },
    methods: {}
};
</script>
<style>
.container {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 200rpx 0;
    box-sizing: border-box;
}

.textStyle {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.textContainer {
    margin-top: 200px;
}
</style>
