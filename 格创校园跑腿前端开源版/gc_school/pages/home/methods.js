/*
 * @name: 
 * @version: 1.1.1
 * @Author: 刘大可
 * @Date: 2022-04-13 17:37:35
 * @LastEditors: 刘大可
 * @LastEditTime: 2022-04-13 19:07:56
 */
var app = getApp();
import Vue from 'vue';

const api={
   async  getSchool(){
        Vue.prototype.request('School/index',{
            openid: uni.getStorageSync('openid') ? uni.getStorageSync('openid') :
                'nologinuser'
        })
    }

};








module.exports = {

    //获取学校列表
    getSchool() {
        api.getSchool()
        var self = this;
        app.globalData.util.request({
            url: 'School/index',
            data: {
                openid: uni.getStorageSync('openid') ? uni.getStorageSync('openid') :
                    'nologinuser' // lon: wx.getStorageSync('city').location.lng,
                // lat: wx.getStorageSync('city').location.lat,
            },

            success(res) {
                var index = uni.getStorageSync('schoolIndex') ? uni.getStorageSync('schoolIndex') : 0;

                if (res.data.data.list.length > 0) {
                    for (var i = 0; i < res.data.data.list.length; i++) {
                        if (res.data.data.list[i]['s_id'] == uni.getStorageSync('schoolId')) {
                            var index = i;
                            uni.setStorageSync('schoolIndex', i);
                            console.log(i);
                        }
                    }
                }

                console.log(index);
                uni.setStorageSync('schoolList', res.data.data.list);
                uni.setStorageSync('sys', res.data.data.sys);
                self.setData({
                    school: res.data.data.list,
                    index: uni.getStorageSync('schoolIndex') ? uni.getStorageSync('schoolIndex') :
                        0,
                    s_id: res.data.data.list[index].s_id,
                    // sys: res.data.data.sys
                }); // console.log("学校信息",res.data.data.list[index])
                // console.log("学校信息",res.data.data.list[index].thums)
                if (uni.getStorageSync('token')) {
                    self.userChangeSchool(res.data.data.list[index].s_id)
                }
                uni.setStorageSync('schoolId', res.data.data.list[index].s_id);
                self.getSchoolInfo(res.data.data.list[index].s_id);
                // self.getOrderData();
                // self.getHistoryList();
                self.getRank();
                self.getSysparment(); // console.log("学校信心",self.data.school)
            }
        });
    },

    //获取学校信息
    async getSchoolInfo(id) {
        console.log("学校信息")
        var self = this; // self.getOrderData()
        // self.getRank()
        if (!uni.getStorageSync('latitude')) {
            await this.getLocations()
        }

        var self = this;
        app.globalData.util.request({
            url: 'School/view',
            data: {
                latitude: uni.getStorageSync('latitude'),
                longitude: uni.getStorageSync('longitude'),
                // ...localtion,
                s_id: id,
                show_type: 1
            },

            success(res) {
                console.log(res.data.data);
                self.setData({
                    modules_load: true,
                    schoolInfo: res.data.data
                });
                // self.getOrderData()
                // self.getHistoryList()
                // self.getRank()
            }
        });
    },


    //获取列表
    getSysparment() {
        const self = this;
        app.globalData.util.request({
            url: 'Setting/view',
            data: {
                page: this.page,
                openid: uni.getStorageSync('openid'),
                s_id: uni.getStorageSync('schoolId')
            },

            success(res) {
                uni.setStorageSync('sys', res.data.data.sys)
                this.sys = res.data.data.sys
                var tmp = res.data.data.list;
                console.log(res.data);
                // var dataList = self.dataList;

                // for (var n = 0; n < tmp.length; n += 2) {
                //     dataList.push(tmp.slice(n, n + 2));
                // }

                // self.setData({
                //     dataList: dataList
                // });
                // console.log('规格的', dataList); // if(res.data.data.sys.is_show_toast==1)
                // {
                // 	self.setData({
                // 		is_show_toast:true
                // 	})
                // }

                if (res.data.data.sys.toast_content) {
                    //WxParse.wxParse('toast_content', 'html', res.data.data.sys.toast_content, self, 0)
                    self.article_toast_content = self.escape2Html(res.data.data.sys.toast_content);
                }

                self.setData({
                    sysparment: res.data.data.sys // modules:res.data.data.homes
                });
                uni.setStorageSync('template_id', res.data.data.sys.template_new);
                uni.setStorageSync('cancel_template_id', res.data.data.sys.template_cancel);
                uni.setStorageSync('template_comment', res.data.data.sys.template_comment);
                // app.util.request({
                // 	url: 'entry/wxapp/sendSubscribeMessage',
                // 	data: {
                // 			ordersn:'3583202103171811593073'
                // 	},
                // })
            }
        });
    },










        openview(e) {
            console.log(e);
            uni.previewImage({
                current: e.currentTarget.dataset.url,
                urls: [e.currentTarget.dataset.url]
            });
        },

        urlFun() {
            uni.navigateTo({
                url: '/gc_school/pages/url/index?url=https://www.baidu.com'
            });
        },

        //读取本地缓存文件
        getLocalFiles(manager, $this) {
            manager.readdir({
                dirPath: `${uni.env.USER_DATA_PATH}/download`,
                success: (res) => {
                    // console.log('本地文件列表: ', res)
                    let downloadFile = [];
                    res.files.forEach((item, index) => {
                        downloadFile.push({
                            file: item,
                            path: `${uni.env.USER_DATA_PATH}/download/` + item,
                            sel: false
                        });
                    });
                    $this.setData({
                        downloadFile
                    });
                },
                fail: (err) => {
                    console.log('本地文件列表读取失败: ', err);
                }
            });
        },
        goQuan() {
            uni.redirectTo({
                url: '/gc_school/pages/article/index'
            })
        },
        down() {
            uni.downloadFile({
                url: 'https://gcwe7.link1024.com/attachment/files/2/2021/11/vznAv5Png5pV0jV5mmmWQGnr95F6A9.pdf',

                //仅为示例，并非真实的资源
                success(res) {
                    console.log(res);
                    var filePath = res.tempFilePath;
                    uni.openDocument({
                        //打开
                        showMenu: true,
                        filePath: filePath,
                        success: function (resu) {
                            console.log(resu);
                        }
                    });
                    uni.saveFile({
                        tempFilePath: res.tempFilePath,

                        success(e) {
                            console.log(e);
                        }
                    }); // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容

                    if (res.statusCode === 200) {
                        // wx.playVoice({
                        // 	filePath: res.tempFilePath
                        // })
                    }
                }
            });
        },

        order_change(e) {
            console.log(e.currentTarget.dataset.index);

            if (e.currentTarget.dataset.index == 0) {
                var list = this.list;
            } else {
                var list = this.history;
            }

            console.log('列表', list);
            this.setData({
                order_index: e.currentTarget.dataset.index // list:list
            });
        },

        jie() {
            var self = this;
            uni.showModal({
                title: '提示',
                content: '允许接收订阅消息',

                success(res) {
                    if (res.confirm) {
                        uni.getSetting({
                            success(res) {
                                console.log(res.authSetting);
                            }
                        });
                        uni.requestSubscribeMessage({
                            tmplIds: [self.sysparment.template_id],

                            // 此处可填写多个模板 ID，但低版本微信不兼容只能授权一个
                            success(res) {
                                console.log('已授权接收订阅消息');
                                app.globalData.util.request({
                                    url: 'entry/wxapp/sendSubscribeMessage',
                                    data: {
                                        ordersn: '3583202103171811593073'
                                    }
                                });
                                uni.navigateTo({
                                    // url: '/schoolrun/pages/shop/index?id='+id+'&openid='+openid+'&name='+name+'&status='+status,
                                });
                            }
                        });
                    } else { }
                }
            });
        },

        onChangeShowText: function () {
            this.setData({
                showText: !this.showText
            });
        },

        onGoodsInfo: function (t) {
            this.setData({
                note: t.detail.value
            });
        },

        onJsEvent: function (e) {
            console.log("打印值", e.currentTarget.dataset)
            // console.log(e)
            // console.log(e.currentTarget.dataset.url);
            console.log('是否加载完毕', this.modules_load);
            if (this.modules_load) {
                //后台配置内容
                if (e.currentTarget.dataset.url != " ") {
                    if (e.currentTarget.dataset.urltype == 0) {
                        uni.setStorageSync('module_id', e.currentTarget.dataset.id)
                        uni.navigateTo({
                            url: e.currentTarget.dataset.url + '&id=' + e.currentTarget.dataset.id
                        })
                    } else {
                        uni.navigateTo({
                            url: '/gc_school/pages/webview/index?url=' + e.currentTarget.dataset.url,
                        })
                    }
                } else {
                    uni.setStorageSync('module_id', 0)
                    if (e.currentTarget.dataset.type == 3) {
                        uni.navigateTo({
                            url: '/gc_school/pages/canteen/canteen'
                        })
                    } else {
                        uni.navigateTo({
                            url: '/gc_school/pages/public/index?type=' + e.currentTarget.dataset.type +
                                '&id=' + e.currentTarget.dataset.id
                        })
                    }
                }
            }
        },

        PickerChange(e) {
            console.log(e);
            this.setData({
                index: e.detail.value,
                schoolInfo: this.school[parseInt(e.detail.value)],
                s_id: this.school[parseInt(e.detail.value)].s_id,
                current: 0
            });
            uni.setStorageSync('schoolId', this.school[parseInt(e.detail.value)].s_id);
            uni.setStorageSync('schoolIndex', parseInt(e.detail.value));
            if (uni.getStorageSync('token')) {
                this.userChangeSchool(this.school[parseInt(e.detail.value)].s_id)
            }
            this.getSchoolInfo(this.school[parseInt(e.detail.value)].s_id);
            this.getSysparment(); //全局加载变量设置为真，信息圈的列表需要重新加载
            // this.getOrderData();
            // this.getHistoryList();
            this.getRank();
            this.setData({
                dataList: []
            });

            app.globalData.isload = true;
        },

        //用户手动更改学校
        userChangeSchool(s_id) {
            app.globalData.util.request({
                url: 'School/changeSchool',
                data: {
                    s_id: s_id
                },
                success() {

                }
            }, true)
        },

        //跳转其他小程序
        toOther(e) {
            console.log(e.currentTarget.dataset.appid);
            uni.navigateToMiniProgram({
                appId: e.currentTarget.dataset.appid,
                path: '',
                extraData: {
                    foo: 'bar'
                },
                envVersion: 'release',

                success(res) {
                    // 打开成功
                    console.log('打开成功');
                }
            });
        },

        //详情跳转
        detail(e) {
            console.log(e.currentTarget.dataset.index);
            var that = this;

            if (e.currentTarget.dataset.status != '已完成') {
                if (uni.getStorageSync('user_identity') == 1) {
                    uni.requestSubscribeMessage({
                        tmplIds: [uni.getStorageSync('template_id'), uni.getStorageSync('cancel_template_id'),
                        uni.getStorageSync('template_comment')
                        ],

                        // 此处可填写多个模板 ID，但低版本微信不兼容只能授权一个
                        success(res) {
                            console.log('已授权接收订阅消息');
                        },

                        complete() {
                            uni.navigateTo({
                                url: '/gc_school/pages/order/detail?id=' + that.list[e.currentTarget
                                    .dataset.index].id
                            });
                        }
                    });
                } else {
                    uni.navigateTo({
                        url: '/gc_school/pages/order/detail?id=' + that.list[e.currentTarget.dataset.index].id
                    });
                }
            }
        },

       

       
        jump(e) {
            console.log(e);
            var url = e.currentTarget.dataset.url;

            if (url) {
                if (uni.getStorageSync('user_identity') == 1) {
                    uni.requestSubscribeMessage({
                        tmplIds: [uni.getStorageSync('template_id'), uni.getStorageSync('cancel_template_id'),
                        uni.getStorageSync('template_comment')
                        ],

                        // 此处可填写多个模板 ID，但低版本微信不兼容只能授权一个
                        success(res) {
                            console.log('已授权接收订阅消息');
                        },

                        complete() {
                            uni.navigateTo({
                                url: url
                            });
                        }
                    });
                } else {
                    uni.navigateTo({
                        url: url
                    });
                }
            }
        },

        //轮播图跳转
        slideJump(e) {
            console.log(e);

            if (e.currentTarget.dataset.type == 1) {
                uni.navigateTo({
                    url: e.currentTarget.dataset.url
                });
            } else {
                if (e.currentTarget.dataset.type == 2) {
                    console.log('appid是', e.currentTarget.dataset.url);
                    uni.navigateToMiniProgram({
                        appId: e.currentTarget.dataset.url,
                        path: '',
                        extraData: {
                            foo: 'bar'
                        },
                        envVersion: 'release',

                        success(res) {
                            console.log('打开成功');
                        }
                    });
                } else if (e.currentTarget.dataset.type == 3) {
                    uni.navigateTo({
                        url: '/gc_school/pages/webview/index?url=' + e.currentTarget.dataset.url
                    });
                }
            }
        },


        //获取列表
        getList() {
            const self = this;
            app.globalData.util.request({
                url: 'entry/wxapp/IndexList',
                data: {
                    page: this.page,
                    openid: uni.getStorageSync('openid'),
                    lon: uni.getStorageSync('city').location.lng,
                    lat: uni.getStorageSync('city').location.lat
                },

                success(res) {
                    console.log('11111', res);

                    if (this.page == 1) {
                        self.setData({
                            list: res.data.data.list
                        });
                    } else {
                        for (var i = 0; i < res.data.data.list.length; i++) {
                            self.setData({
                                list: [...self.list, res.data.data.list[i]]
                            });
                        }
                    }
                }
            });
        },

        close() {
            this.setData({
                is_show_toast: false
            });
        },

        //获取经纬度
        getLocation(callback) {
            var self = this;
            uni.getLocation({
                type: 'gcj02',
                success: function (res) {
                    console.log('打印位置', res); // wx.request({
                    // 	url: "https://api.map.baidu.com/geocoder/v2/?ak=p3ksM8ObxtYWHUsGWo8CWNqI&location=" + res.latitude + "," + res.longitude + "&output=json",
                    // 	header: {
                    // 		"Content-Type": "application/json"
                    // 	},
                    // success: function (params) {
                    // 	console.log("经纬度",params)

                    self.setData({
                        tmps: {
                            location: {
                                lng: res.longitude,
                                lat: res.latitude
                            }
                        }
                    });
                    setTimeout(() => {
                        console.log('location的值', self.tmps);
                        uni.setStorageSync('city', self.tmps);
                        self.setData({
                            city: self.location
                        });
                        callback();
                    }, 2000); // wx.setStorageSync("city", (params))
                    // self.setData({
                    // 	city: params
                    // })
                    // }
                    // });
                }
            });
        },

        //获取用户信息
        getUsetInfo: function (data) {
            if ('getUserInfo:ok' == data.detail.errMsg) {
                this.setData({
                    getUseInfo: true
                });
                uni.setStorage({
                    key: 'useInfo',
                    data: 'true'
                });
                this.getGetUid(data.detail.userInfo);
            } else {
                this.setData({
                    getUseInfo: true
                });
            }
        },

        //获取排行榜列表
        getRank() {
            var self = this;
            app.globalData.util.request({
                url: 'ZhRankingList/index',
                data: {
                    s_id: uni.getStorageSync('schoolId')
                },
                method: 'GET',
                success(res) {
                    self.rankList = res.data.data.list
                    console.log("排行榜", res.data.data.list)
                    var text = ''
                    for (var i = 0; i < res.data.data.list.length; i++) {
                        text += res.data.data.list[i]['nickname'] + '总赚' + res.data.data.list[i]['brokerage'] + '                                     '
                    }
                    // console.log(text)
                    self.text = text
                }
            });
        },
       
        //获取用户状态
        getPage() {
            var self = this;
            self.getLocation(() => {
                console.log('lplp'); //更新用户状态

                app.globalData.util.request({
                    url: 'entry/wxapp/UserInfoUpdate',
                    data: {
                        openid: uni.getStorageSync('openid'),
                        nickname: uni.getStorageSync('userinfo').nickName,
                        avatar: uni.getStorageSync('userinfo').avatarUrl
                    },

                    success(res) {
                        app.globalData.util.footer(self);
                        self.setData({
                            userInfo: uni.getStorageSync('userinfo')
                        }); // self.getRank()
                        // if(!wx.getStorageSync('schoolId')){
                        // self.getSchool()
                        // }
                        // else{
                        // }
                        // console.log("学校信心",self.data.school)
                    }
                });
            });
        },

        //获取用户openid
        getGetUid: function (a) {
            var that = this;
            uni.login({
                success: function (data) {
                    if (data.code) {
                        app.globalData.util.request({
                            url: 'entry/wxapp/GetUid',
                            data: {
                                code: data.code
                            },
                            success: function (data) {
                                console.log(data.data.data.openid);
                                that.setData({
                                    getUseInfo: false
                                });
                                uni.setStorageSync('openid', data.data.data.openid);
                                uni.getUserInfo({
                                    success: function (params) {
                                        var userInfo = params.userInfo;
                                        uni.setStorageSync('userinfo',
                                            userInfo);
                                        that.getPage();
                                    }
                                });
                            }
                        });
                    }
                }
            });
        },

        getDateDiff(dateTimeStamp, dateStr) {
            var result = '';
            var minute = 1000 * 60;
            var hour = minute * 60;
            var day = hour * 24;
            var halfamonth = day * 15;
            var month = day * 30;
            var now = new Date().getTime();
            var diffValue = now - dateTimeStamp;

            if (diffValue < 0) {
                return;
            }

            var monthC = diffValue / month;
            var weekC = diffValue / (7 * day);
            var dayC = diffValue / day;
            var hourC = diffValue / hour;
            var minC = diffValue / minute;

            if (monthC >= 1) {
                result = '' + parseInt(monthC) + '个月前';
            } else {
                if (weekC >= 1) {
                    result = '' + parseInt(weekC) + '周前';
                } else {
                    if (dayC >= 1) {
                        result = '' + parseInt(dayC) + '天前';
                    } else {
                        if (hourC >= 1) {
                            result = '' + parseInt(hourC) + '小时前';
                        } else {
                            if (minC >= 1) {
                                result = '' + parseInt(minC) + '分钟前';
                            } else {
                                result = '刚刚';
                            }
                        }
                    }
                }
            } // console.log(result)
            // console.log(dateStr)

            if (result == '') {
                return dateStr;
            } else {
                return result;
            }
        },

        getDateTimeStamp(dateStr) {
            dateStr = dateStr;
            var da = Date.parse(dateStr.replace(/-/gi, '/'));
            return this.getDateDiff(da, dateStr);
        },

        getOrderData() {
            const self = this;
            app.globalData.util.request({
                url: 'ZhOrder/getNewestOrderList',
                data: {
                    s_id: uni.getStorageSync('schoolId'),
                },
                method: 'GET',
                success(res) {
                    console.log("res.data.data.list", res.data.data.list)
                    console.log("res.data.data.list", res.data.data.list.length)
                    if (res.data.data.list.length > 0) {
                        for (var i = 0; i < res.data.data.list.length; i++) {
                            // res.data.data.order[i].start_time = self.getDateTimeStamp(res.data.data.order[i].start_time)
                            res.data.data.list[i].createtime = self.getDateTimeStamp(res.data.data.list[i]
                                .createtime);
                            var temp = res.data.data.list[i].remarks;
                            res.data.data.list[i].remarks.replace(/[0-9]*(\.[0-9]*)?/g, function (e) {
                                var te = e;

                                if (Number(e)) {
                                    if (e.toString().length > 3) {
                                        var d = e.substr(0, 2) + '****' + e.substr(6);
                                    } else {
                                        var d = e.substr(0, 1) + '**';
                                    }

                                    temp = temp.replace(te, d); // console.log(temp)
                                }
                            });
                            res.data.data.list[i].desc = temp;
                        }
                    }

                    self.setData({
                        list: res.data.data.list
                    });
                }
            });
        },

        //获取历史订单
        getHistoryList() {
            const self = this;
            app.globalData.util.request({
                url: 'ZhOrder/getHistoryOrderList',
                method: 'GET',
                data: {
                    s_id: uni.getStorageSync('schoolId'),
                },

                success(res) {
                    if (res.data.data.list.length > 0) {
                        for (var i = 0; i < res.data.data.list.length; i++) {
                            // res.data.data.order[i].start_time = self.getDateTimeStamp(res.data.data.order[i].start_time)
                            res.data.data.list[i].createtime = self.getDateTimeStamp(res.data.data.list[i]
                                .createtime);
                            var temp = res.data.data.list[i].remarks;
                            res.data.data.list[i].remarks.replace(/[0-9]*(\.[0-9]*)?/g, function (e) {
                                var te = e;

                                if (Number(e)) {
                                    if (e.toString().length > 3) {
                                        var d = e.substr(0, 2) + '****' + e.substr(6);
                                    } else {
                                        var d = e.substr(0, 1) + '**';
                                    }

                                    temp = temp.replace(te, d); // console.log(temp)
                                }
                            });
                            res.data.data.list[i].desc = temp;
                        }
                    }

                    self.setData({
                        history: res.data.data.list
                    });
                }
            });
        }
    }
