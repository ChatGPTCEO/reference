const { uniacid } = require('../../../siteinfo');

var app = getApp();

function judge(status, tpl_id) {
    console.log('缓存用户信息', uni.getStorageSync('userinfo'));
    var that = this;
    var status = false;

    if (uni.getStorageSync('userinfo')) {
        app.util.request({
            url: 'entry/wxapp/judgeIdentity',
            data: {
                openid: uni.getStorageSync('openid')
            },

            success(res) {
                console.log('身份', res.data.data);

                if (res.data.data == 1) {
                    app.util.request({
                        url: 'entry/wxapp/Sysparment',

                        success(sub) {
                            console.log('配置返回值', sub.data.data.sys);
                            uni.requestSubscribeMessage({
                                tmplIds: [sub.data.data.sys.template_id, sub.data.data.sys.cancel_template_id],

                                // 此处可填写多个模板 ID，但低版本微信不兼容只能授权一个
                                success(res) {
                                    console.log('已授权接收订阅消息');
                                },

                                complete() {
                                    // status = true
                                    // return 123456;
                                }
                            });
                        }
                    });
                } else {
                    status = true;
                    return status;
                }
            }
        });
        var returnParam = {
            status: status
        };
        return returnParam;
    } // else{
    // status = true
    // var returnParam = {
    //   'status': status
    // }
    // return returnParam;
    // }
}

module.exports = {
    judge
};
