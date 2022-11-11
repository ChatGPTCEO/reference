/*
 * @name: 提示
 * @version: 1.1.1
 * @Author: 刘大可
 * @Date: 2022-02-17 11:31:35
 * @LastEditors: 刘大可
 * @LastEditTime: 2022-02-17 14:53:02
 */
let color = "#F02036"
module.exports = {
    tips(title, duration = 2000) {
        const res = new Promise((success, fun2) => {
            uni.showToast({
                title, duration,
                icon: "none",
                success: res => {
                    success(res)
                }
            });
        })
    },
    error(content, back_num = 0) {
        const res = new Promise((success, fun2) => {
            uni.showModal({
                title: '提示',
                content,
                showCancel: false,
                confirmColor: color,
                success: function (res) {
                    if (res.confirm) {
                        if (back_num > 0) {
                            uni.navigateBack({
                                delta: back_num
                            });
                        }
                        success({
                            code: 200,
                            msg: "用户点击确定"
                        })
                    }

                }
            });
        })
        return res
    },
    success(title, duration = 1500) {
        // console.log(title);
        const res = new Promise((success, fun2) => {
            uni.showToast({
                title, duration,
                mask:true,
                success: (res) => {
                    setTimeout(() => {
                        success({
                            code: 200,
                            msg: "成功"
                        })
                    }, duration);

                }
            });

        })
        return res
    },

    choose(content, title = '提示',confirmText="确定") {
        const res = new Promise((success, fail) => {
            uni.showModal({
                title,
                content,
                showCancel: true,
                confirmColor:color,
                confirmText,
                success: function (res) {
                    if (res.confirm) {
                        success({
                            code: 200,
                            msg: "用户点击确定"
                        })
                    } else {
                        success({
                            code: 400,
                            msg: "用户点击取消"
                        })
                    }
                },
                fail: (err) => {
                    fail(err)
                }
            });
        })
        return res
    }
}