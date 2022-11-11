<script>
//app.js
// require('./utils/push_sdk.js');
import siteInfo from '@/siteinfo.js';

export default {
    data() {
        return {};
    },
    onLaunch: function () {
        this.globalData.autoUpdate(); // this.overShare()
        // const updateManager = wx.getUpdateManager();
        // updateManager.onCheckForUpdate(function (res) {
        // 	// 请求完新版本信息的回调
        // })
        // updateManager.onUpdateReady(function () {
        // 	wx.showModal({
        // 		title: '更新提示',
        // 		content: '新版本已经准备好，是否重启应用？',
        // 		success: function (res) {
        // 			if (res.confirm) {
        // 				// 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
        // 				updateManager.applyUpdate()
        // 			}
        // 		}
        // 	})
        // });
        // updateManager.onUpdateFailed(function () {
        // 	return that.Tips({
        // 		title: '新版本下载失败'
        // 	});
        // })
        //调用API从本地缓存中获取数据

        uni.getSystemInfo({
            success: (e) => {
                this.globalData.StatusBar = e.statusBarHeight;
                let custom = uni.getMenuButtonBoundingClientRect();
                this.globalData.Custom = custom;
                this.globalData.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
                uni.setStorageSync('StatusBar', e.statusBarHeight);
                uni.setStorageSync('CustomBar', custom.bottom + custom.top - e.statusBarHeight);
            }
        });
    },
    onShow: function () {
        // this.autoUpdate()
    },
    onHide: function () {},
    onError: function (msg) {
        console.log(msg);
    },
    globalData: {
        userInfo: null,
        isload: true,

        overShare: function () {
            //监听路由切换
            uni.onAppRoute(function (res) {
                let pages = getCurrentPages();
                let view = pages[pages.length - 1];
                if (view) {
                    uni.showShareMenu({
                        withShareTicket: true,
                        menus: ['shareAppMessage']
                    });
                }
            });
        },

        autoUpdate: function () {
            const updateManager = uni.getUpdateManager();
            updateManager.onCheckForUpdate(function (res) {
                // console.log("版本",res.hasUpdate)
                // 请求完新版本信息的回调
                if (res.hasUpdate) {
                    //监听小程序有版本更新事件
                    updateManager.onUpdateReady(function () {
                        uni.showModal({
                            title: '更新提示',
                            content: '新版本已经准备好，是否重启应用？',

                            success(res) {
                                if (res.confirm) {
                                    // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                                    updateManager.applyUpdate();
                                }
                            }
                        });
                    });
                    updateManager.onUpdateFailed(function () {
                        // 新版本下载失败
                        uni.showModal({
                            title: '已经有新版本咯~',
                            content: '请您删除当前小程序，到微信 “发现-小程序” 页，重新搜索打开呦~'
                        });
                    });
                }
            });
        },

        autoUpdates: function () {
            var that = this; // 获取小程序更新机制兼容

            if (uni.canIUse('getUpdateManager')) {
                const updateManager = uni.getUpdateManager(); //1. 检查小程序是否有新版本发布

                updateManager.onCheckForUpdate(function (res) {
                    console.log('版本', res.hasUpdate); // 请求完新版本信息的回调

                    if (res.hasUpdate) {
                        //检测到新版本，需要更新，给出提示
                        uni.showModal({
                            title: '更新提示',
                            content: '检测到新版本，是否下载新版本并重启小程序？',
                            success: function (res) {
                                if (res.confirm) {
                                    //2. 用户确定下载更新小程序，小程序下载及更新静默进行
                                    that.downLoadAndUpdate(updateManager);
                                } else {
                                    if (res.cancel) {
                                        //用户点击取消按钮的处理，如果需要强制更新，则给出二次弹窗，如果不需要，则这里的代码都可以删掉了
                                        uni.showModal({
                                            title: '温馨提示~',
                                            content: '本次版本更新涉及到新的功能添加，旧版本无法正常访问的哦~',
                                            showCancel: false,
                                            //隐藏取消按钮
                                            confirmText: '确定更新',
                                            //只保留确定更新按钮
                                            success: function (res) {
                                                if (res.confirm) {
                                                    //下载新版本，并重新应用
                                                    that.downLoadAndUpdate(updateManager);
                                                }
                                            }
                                        });
                                    }
                                }
                            }
                        });
                    }
                });
            } else {
                // 如果希望用户在最新版本的客户端上体验您的小程序，可以这样子提示
                uni.showModal({
                    title: '提示',
                    content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
                });
            }
        },

        /**
         * 下载小程序新版本并重启应用
         */
        downLoadAndUpdate: function (updateManager) {
            var that = this; // wx.showLoading();
            //静默下载更新小程序新版本

            updateManager.onUpdateReady(function () {
                // wx.hideLoading()
                //新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                // updateManager.applyUpdate()
                // updateManager.onUpdateReady(function () {
                uni.showModal({
                    title: '更新提示',
                    content: '新版本已经准备好，是否重启应用？',
                    success: function (res) {
                        if (res.confirm) {
                            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                            updateManager.applyUpdate();
                        }
                    }
                });
            });
            updateManager.onUpdateFailed(function () {
                // 新的版本下载失败
                uni.showModal({
                    title: '已经有新版本了哟~',
                    content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~'
                });
            });
        },

        util: require('./we7/resource/js/util.js'),

        tabBar: {
            color: '#123',
            selectedColor: '#f1f1f1',
            borderStyle: '#87CEEB',
            backgroundColor: '#87CEEB',
            list: [
                {
                    pagePath: '/gc_school/pages/home/index',
                    iconPath: '/static/images/home.png',
                    selectedIconPath: '/static/images/home_s.png',
                    text: '首页1'
                },
                {
                    pagePath: '/gc_school/pages/order/index',
                    iconPath: '/static/gc_school/images/public.png',
                    selectedIconPath: '/static/gc_school/images/public.png',
                    text: '我的发布'
                },
                {
                    pagePath: '/gc_school/pages/user/index',
                    iconPath: '/static/images/my.png',
                    selectedIconPath: '/static/images/my_s.png',
                    text: '我的'
                }
            ]
        },

        // siteInfo: {
        //  'uniacid': '2',
        //  'acid': '2',
        //  'version': '1.0.0',
        //  'siteroot': 'https://tongxuebangshou.denajia.com/app/index.php',
        //  'appimg': "https://tongxuebangshou.denajia.com/attachment/",
        //  'appimgupload': "https://tongxuebangshou.denajia.com/",
        //  'appimg2': "https://tongxuebangshou.denajia.com/",
        // }
        siteInfo: require('./siteinfo.js')

        /* 		'uniacid' : '6',
        'acid': '6',
        'version' : '1.0.0',
        'siteroot': 'https://newe7.lingy.cc/app/index.php',
        'appimg': "https://newe7.lingy.cc/attachment/",
        'appimgupload': "https://newe7.lingy.cc/",
        'appimg2': "https://newe7.lingy.cc/", */
    }
};
</script>
<style lang="scss">
    @import 'middleware/main.scss';
</style>
<style>
@import 'colorui/main.css';
@import 'colorui/icon.css';

.bgmain {
    background-color: #ff6444;
    /* background-color: #17A9EE; */
    color: #fff;
    background: #fff;
    color: #000;
}

switch{
    color:#ff6444 !important;
}
.bg-yellow {
    background-color: #17a9ee;
    color: #fff;
}

.text-main {
    color: #87ceeb;
}
image {
    width: 100%;
    height: 100%;
    vertical-align: middle;
}

.df {
    display: flex;
    flex-direction: row;
    align-items: center;
}

.aifs {
    align-items: flex-start;
}

.jsb {
    justify-content: space-between;
}

.jcc {
    justify-content: center;
}

.dfja {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.fshrink0 {
    flex-shrink: 0;
}

.tc {
    text-align: center;
}

.tr {
    text-align: right;
}

.fr {
    float: right;
}

.p20 {
    padding: 20rpx 0;
}

.p10 {
    padding: 10rpx 0;
}

.pq20 {
    padding: 20rpx;
}

.p30 {
    padding: 30rpx 0;
}

.mb5 {
    margin-bottom: 5rpx;
}

.mb10 {
    margin-bottom: 10rpx;
}

.mb20 {
    margin-bottom: 20rpx;
}

.mt20 {
    margin-top: 20rpx;
}

.border_bot_20 {
    border-bottom: 20rpx solid #f5f5f5;
}

.border_bot_2 {
    border-bottom: 2rpx solid #f5f5f5;
}

.fs20 {
    font-size: 20rpx;
}

.fs22 {
    font-size: 22rpx;
}

.fs24 {
    font-size: 24rpx;
}

.fs26 {
    font-size: 26rpx;
}

.fs28 {
    font-size: 28rpx;
}

.fs30 {
    font-size: 30rpx;
}

.fs32 {
    font-size: 32rpx;
}

.fs34 {
    font-size: 34rpx;
}

.fs50 {
    font-size: 50rpx;
}

.fw {
    font-weight: bold;
}

::-webkit-scrollbar {
    width: 0;
    height: 0;
    color: transparent;
    z-index: 9999 !important;
}

.color_gray {
    color: #686868;
}

.color_red {
    color: red;
}

.color_pink {
    color: #ef4a50;
}

.color666 {
    color: #666;
}

.color333 {
    color: #333;
}

.color999 {
    color: #999;
}

.mt_15 {
    margin-top: -15rpx;
}

.line_one {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.wd100 {
    width: 100%;
}

.line_two {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    text-overflow: ellipsis;
}

.nomore {
    line-height: 60rpx;
    height: 60rpx;
    text-align: center;
    position: relative;
    font-size: 24rpx;
    width: 100%;
    color: #999;
}

.nomore::before {
    content: '';
    display: block;
    width: 100rpx;
    height: 2rpx;
    background: #999;
    position: absolute;
    left: 180rpx;
    top: 50%;
}

.nomore::after {
    content: '';
    display: block;
    width: 100rpx;
    height: 2rpx;
    background: #999;
    position: absolute;
    right: 180rpx;
    top: 50%;
}

.noadd {
    width: 100%;
    height: 100%;
    text-align: center;
}

.noadd image {
    width: 200rpx;
    height: 200rpx;
    margin-top: 100rpx;
}

.b_icon {
    width: 25rpx;
    height: 25rpx;
    margin-right: 10rpx;
}

.wui-dialog .section .section-title {
    display: block;
    padding: 8px 0;
    text-align: center;
    font-size: 14px;
    padding-top: 50px;
}

.wui-dialog .body-view {
    padding: 0 15px 10px;
    padding-bottom: 100px;
}

.wui-dialog.wui-dialog-show .wui-dialog-container {
    z-index: 10000000;
}

.wui-dialog-address .content {
    height: 350px;
    padding-bottom: 50px;
    display: -webkit-flex;
    box-sizing: border-box;
}

.wui-dialog-address .content scroll-view {
    height: 100%;
}

.wui-dialog-address .content .weui-cells {
    margin-top: 0;
    padding-left: 10px;
}

.wui-dialog-address .weui-cells:after,
.wui-dialog-address .weui-cells:before {
    border: none;
}

.wui-dialog-address .content .weui-cell__label.disabled {
    background-color: #f6f6f6;
}

.wui-dialog-address .content .weui-cell__label {
    position: relative;
}

.wui-dialog-address .content .weui-cell__label.disabled .address-noscope {
    display: block;
}

.wui-dialog-address .content .weui-cell__label .address-noscope {
    display: none;
    position: absolute;
    width: 58px;
    height: 58px;
    right: 10px;
    top: 50%;
    transform: translate(0, -50%);
    z-index: 100;
}

.wui-dialog-address .content .weui-cell__label .address-noscope image {
    width: 100%;
    height: 100%;
}

.wui-dialog-address .content .weui-cell__bd {
    position: relative;
}

.wui-dialog-address .content .weui-cell__bd .left {
    position: absolute;
    top: 50%;
    left: 0;
    transform: translate(0, -50%);
    display: inline-block;
}

.wui-dialog-address .content .weui-cell__bd .left .icon {
    font-size: 16px;
    color: #ff2d4b;
}

.wui-dialog-address .content .weui-cell__bd .right {
    margin-left: 30px;
    font-size: 15px;
}

.wui-dialog-address .content .weui-cell__bd .right .detail > view {
    display: inline-block;
    color: #b2b2b2;
}

.wui-dialog-address .content .weui-cell__bd .right .detail .name {
    margin-right: 10px;
}

.wui-dialog-address .content .weui-cell__bd .right .detail .tel {
    float: right;
}

.wui-dialog-address .content .weui-cell__bd .right .address {
    margin-top: 5px;
}

.wui-dialog-redpacket .content {
    height: 350px;
    padding-bottom: 50px;
    display: -webkit-flex;
    box-sizing: border-box;
}

.wui-dialog-redpacket .redPacket-container {
    background: #f4f4f4;
}

.wui-dialog-redpacket .content .redPacket {
    padding-top: 21px;
}

.wui-dialog-redpacket .content .redPacket .wui-loadmore {
    margin-top: 0;
    margin-bottom: 0;
    width: 93%;
}

.wui-dialog-redpacket .content .redPacket .redPacket-list {
    margin: 0px 15px 10px 15px;
}

.wui-dialog-redpacket .content .redPacket .redPacket-list .item {
    background: #fff;
    margin-bottom: 13px;
    padding: 17px;
    overflow: hidden;
    position: relative;
}

.wui-dialog-redpacket .content .redPacket .redPacket-list .item .circle {
    display: block;
    width: 17px;
    height: 17px;
    background: #f4f4f4;
    position: absolute;
    border-radius: 100%;
    top: 50%;
    transform: translate(0, -50%);
    z-index: 20;
}

.wui-dialog-redpacket .content .redPacket .redPacket-list .item .circle-left {
    left: -7px;
}

.wui-dialog-redpacket .content .redPacket .redPacket-list .item .circle-right {
    right: -7px;
}

.wui-dialog-redpacket .content .redPacket .redPacket-list .item .redPacket-info {
    font-size: 17px;
    color: #ff2d4b;
}

.wui-dialog-redpacket .content .redPacket .redPacket-list .item .redPacket-info .price {
    display: inline-block;
    font-size: 22px;
}

.wui-dialog-redpacket .content .redPacket .redPacket-list .item .redPacket-uselimit {
    color: #666;
    font-size: 14px;
    margin-top: 5px;
}

.wui-dialog-redpacket .content .redPacket .redPacket-list .item .selected-status {
    position: absolute;
    right: 0;
    bottom: 0;
    width: 31px;
    height: 24px;
}

.wui-dialog-redpacket .content .redPacket .redPacket-list .item .selected-status image {
    width: 100%;
    height: 100%;
}

.wui-dialog {
}

.wui-dialog.wui-dialog-show {
    display: block;
}

.wui-dialog .wui-dialog-mask {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 10;
    background: rgba(0, 0, 0, 0.7);
    display: none;
}

.wui-dialog .wui-dialog-container {
    position: fixed;
    bottom: 0;
    width: 750rpx;
    background-color: #fff;
    transform: translateY(150%);
    transition: all 0.4s ease;
    z-index: 11;
}

.wui-dialog.wui-dialog-show .wui-dialog-container {
    transform: translateY(0);
}

.wui-dialog.wui-dialog-show .wui-dialog-mask {
    display: block;
}

.wui-cell {
    position: relative;
    padding: 15px 15px;
    display: flex;
    align-items: center;
    font-size: 14px;
}

.wui-cell {
    position: relative;
    padding: 15px 15px;
    display: flex;
    align-items: center;
    font-size: 14px;
}

.wui-cell::after {
    position: absolute;
    left: 15px;
    right: 15px;
    bottom: 0;
    border-top: 1rpx solid #e5e5e5;
    background: #e5e5e5;
    content: '';
}

.wui-cell-bd {
    flex: 1;
}

.wui-cell-ft {
    position: relative;
    text-align: right;
    color: #666;
}

.wui-cell-access .wui-cell-ft {
    padding-right: 13px;
}

.wui-cell-access .wui-cell-ft::after {
    position: absolute;
    top: 50%;
    right: 2px;
    content: '';
    display: inline-block;
    height: 6px;
    width: 6px;
    border-width: 2px 2px 0 0;
    border-color: #c8c8c8;
    border-style: solid;
    transform: translateY(-50%) matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
}

.wui-cell .cell-description {
    color: #666;
    font-size: 15px;
}

.wui-label {
    display: inline-block;
    font-size: 12px;
    height: 28px;
    line-height: 28px;
    color: #333;
    border: 1rpx solid #999;
    padding: 0px 10px;
    border-radius: 2px;
    margin-right: 10px;
    box-sizing: border-box;
    vertical-align: middle;
    text-align: center;
}

.wui-label-primary {
    color: #fff;
    background: #ffd56f;
    border: 1rpx solid #ffd56f;
}

.wui-label-disabled {
    color: #cacaca;
    background: #eee;
    border: 1rpx solid #e5e5e5;
}

.wui-label-small {
    font-size: 11px;
    height: 16px;
    line-height: 16px;
    padding: 0px 3px;
}
.btn {
    font-size: 15px;
    border: 1px solid #ffd56f;
    display: inline-block;
    padding: 11px 0;
    border-radius: 3px;
    width: 85px;
    text-align: center;
    box-sizing: border-box;
}

.btn-disabled {
    background-color: #ccc !important;
    color: #fff !important;
}

.btn.btn-large {
    width: 90%;
}

.btn-danger {
    background-color: #ffd56f;
    border: 1px solid #ffd56f;
    color: #fff;
}
.nodata {
    display: flex;
    align-items: center;
    text-align: center;
}

page {
    background-color: #f5f7fe;
}
.text-m {
    color: #87ceeb;
}
</style>