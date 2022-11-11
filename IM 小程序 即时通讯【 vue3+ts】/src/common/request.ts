import {store} from '../store'

export const PATH = "https://im.idb.com.cn/"
export const WsPATH = "wss://im.idb.com.cn/chat/login?token="

// export const PATH="http://127.0.0.1:8666/"
// export const WsPATH = "ws://127.0.0.1:8666/chat/login?token="


export function login() {
    loginFlag = true
    return new Promise<number>((resolve, reject) => {
        uni.showLoading({
            title: "登录中...",
            mask: true
        })
        //微信登录
        uni.login({
            success: logins => {
                // 发送 logins.code 到后台换取 openId, sessionKey, unionId
                const info = uni.getSystemInfoSync()
                uni.request({
                    url: PATH + 'wx/login',
                    data: {
                        code: logins.code,
                        brand: info.brand,
                        model: info.model,
                        version: info.version,
                        system: info.system,
                        platform: info.platform
                    },
                    method: 'POST',
                    success: resp => {
                        if (resp.statusCode != 200) {
                            uni.showModal({
                                title: '登录失败',
                                content: '请稍后再尝试',
                                success: function (res) {
                                    if (res.confirm) {
                                        console.log('用户点击确定');
                                        login()
                                    } else if (res.cancel) {
                                        console.log('用户点击取消');
                                    }
                                }
                            });
                            resolve(0)
                        } else {
                            //设置登录成功后信息
                            const data = resp.data as any;
                            store.commit('user/setUser', data.userInfo)
                            store.commit('user/setToken', data.token)
                            store.commit('user/setExpires', data.expiresIn)
                            loginFlag = false
                            resolve(1)
                        }
                    },
                    fail: (resp) => {
                        uni.showModal({
                            title: '登录失败',
                            content: '请稍后再尝试',
                            success: function (res) {
                                if (res.confirm) {
                                    console.log('用户点击确定');
                                    login()
                                } else if (res.cancel) {
                                    console.log('用户点击取消');
                                }
                            }
                        });
                        resolve(0)
                    },
                    complete: () => {
                        uni.hideLoading()
                    }
                });
            }
        })
    })
}

export async function post<T>(url: string, params: any) {
    let flag = await islogin()
    if (flag == 1) {
        return new Promise((resolve, reject) => {
            uni.showLoading({
                title: "数据提交中...",
                mask: true
            })
            uni.request({
                header: {
                    "Authorization": store.state.user.token
                },
                method: 'POST',
                data: params,
                url: url.startsWith("http") ? url : PATH + url,
                dataType: 'json',
                success: res => {
                    if(res.statusCode!==200){
                        uni.hideLoading()
                        uni.showToast({title: (res.data as any).message, icon: 'error'});
                        // reject(res.data)
                        return
                    }
                    resolve(res.data as T);
                    uni.hideLoading()
                }, fail: (resp) => {
                    uni.hideLoading()
                    uni.showModal({
                        title: '服务器超时',
                        content: '请稍后再尝试',
                    });
                },
            });
        })
    }
}

export async function put<T>(url: string, params: any) {
    let flag = await islogin()
    if (flag == 1) {
        return new Promise((resolve, reject) => {
            uni.showLoading({
                title: "数据提交中...",
                mask: true
            })
            uni.request({
                header: {
                    "Authorization": store.state.user.token,
                    "content-type": "application/x-www-form-urlencoded"
                },
                method: 'PUT',
                data: params,
                url: url.startsWith("http") ? url : PATH + url,
                success: res => {
                    if(res.statusCode!==200){
                        uni.hideLoading()
                        uni.showToast({title: (res.data as any).message, icon: 'error'});
                        // reject(res.data)
                        return
                    }
                    resolve(res.data as T);
                    uni.hideLoading()
                }, fail: (resp) => {
                    uni.hideLoading()
                    uni.showModal({
                        title: '服务器超时',
                        content: '请稍后再尝试',
                    });
                },
            });
        })
    }
}

export async function get<T>(url: string, params: any) {
    const noToken = (!(params && params.noToken))
    let flag = 1
    if (noToken) {
        flag = await islogin()
    }
    if (flag == 1) {
        const show = (!(params && params.hide))
        return new Promise<T>((resolve, reject) => {
            if (show) {
                uni.showLoading({
                    title: "数据加载中...",
                    mask: true
                })
            }
            uni.request({
                header: {
                    "Authorization": store.state.user.token
                },
                method: 'GET',
                data: params,
                url: url.startsWith("http") ? url : PATH + url,
                dataType: 'json',
                success: res => {
                    resolve(res.data as T);
                },
                complete() {
                    if (show) {
                        uni.hideLoading()
                    }
                }
            });
        })
    }
}

export async function upload<T>(url: string, filePath: string) {
    let flag = await islogin()
    if (flag == 1) {
        return new Promise<T>((resolve, reject) => {
            uni.showLoading({
                title: "文件上传中...",
                mask: true
            })
            uni.uploadFile({
                header: {
                    "Authorization": store.state.user.token
                },
                url: url.startsWith("http") ? url : PATH + url,
                filePath: filePath,
                name: 'file',
                success: res => {
                    resolve(JSON.parse(res.data) as T);
                },
                complete() {
                    uni.hideLoading()
                }
            });
        })
    }
}


export async function getToken() {
    let flag = await islogin()
    if (flag == 1) {
        return store.state.user.token;
    } else {
        uni.showToast({
            title: 'token 获取失败！',
            duration: 2000
        });
        return "NoToken";
    }
}


//---------------------以下登录相关操作-------------------------//
//是否发起登录中
let loginFlag = false

async function islogin(): Promise<number> {
    let flag = false
    //是否需要登录
    //1.判断是否登录或者是否超时
    //提前10分钟放弃token
    const now = new Date().getTime() / 1000 + 60 * 10
    if (store.state.user.expiresIn) {
        if (now > store.state.user.expiresIn) {
            //token超时s
            uni.removeStorageSync('expiresIn')
            uni.removeStorageSync('userInfo')
            uni.removeStorageSync('token')
            flag = true
        }
    } else {
        flag = true
    }

    if (flag) {
        let msg: number
        if (loginFlag) {
            msg = await loginAwait(200)
        } else {
            msg = await login()
        }
        //console.log('登录状态=', msg)
        return msg
    }
    return 1
}

function loginAwait(t: number) {
    return new Promise<number>((resolve, reject) => {
        _await(t, resolve, reject)
    })
}

function _await(t: number, resolve: Function, reject: Function) {
    if (!loginFlag) {
        resolve(1)
    }
    if (t > 0) {
        setTimeout(() => {
            _await(t--, resolve, reject)
        }, 20)
    } else {
        resolve(0)
    }
}


