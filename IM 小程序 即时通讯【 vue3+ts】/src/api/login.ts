import {store} from "../store";
import {IUserInfo} from "../types/store/user";
import {PATH} from "../common/request";

export const userLogin = (username: string, password: string, resolve: Function) => {
  uni.showLoading({
    title: "登录中...",
    mask: true
  })
  uni.request({
    method: 'POST',
    data: {
      username: username,
      password: password
    },
    url: PATH + 'wx/userLogin',
    dataType: 'json',
    success: resp => {
      if (resp.statusCode !== 200) {
        const data = resp.data as any
        uni.showToast({
          title: data.message,
          icon: 'error',
          duration: 2000
        });
        return
      }
      //设置账户信息
      store.state.user.username = username
      store.state.user.password = password
      uni.setStorageSync('username', username)
      uni.setStorageSync('password', password)
      //设置登录成功后信息
      const data = resp.data as any;
      store.dispatch('user/loginSuccess', data).then(() => {
        resolve(1)
      })
    },
    fail: resp => {
      console.log(resp)
      //登录失败
      resolve(0)
    },
    complete() {
      uni.hideLoading()
    }
  });
}

// 用户注册
export const userRegister = async (user: IUserInfo,call:Function) => {

  const resp = await uni.request({
    url: PATH + "wx/userRegister",
    method: 'POST',
    data: user,
  }) as any;

  if (resp.statusCode !== 200) {
    uni.showToast({
      title: resp.data.message,
      icon: 'error',
      duration: 2000
    });
    return
  }
  call()

}
