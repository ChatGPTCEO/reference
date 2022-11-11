import {IUser, IUserInfo} from "../../types/store/user";
import {ActionContext} from "vuex";
import {store} from "../index";
import {start, stop} from "../chat/utils";

const state: IUser = {
  info: uni.getStorageSync('userInfo'), //用户信息
  token: uni.getStorageSync('token'),  //token
  expiresIn: uni.getStorageSync('expiresIn'), //过期时间
  username: uni.getStorageSync('username'),  //当前用户账号
  password: uni.getStorageSync('password')  //当前账号密码
}

const mutations = {
  setUser(state: IUser, user: IUserInfo) {
    state.info = user
    uni.setStorageSync('userInfo', user)
  },
  setToken(state: IUser, token: string) {
    state.token = token
    uni.setStorageSync('token', token)
  },
  setExpires(state: IUser, expiresIn: number) {
    state.expiresIn = expiresIn
    uni.setStorageSync('expiresIn', expiresIn)
  }, userLogout(state: IUser) {
    state.token = null
    state.info = null
    state.expiresIn = null
    state.username = ''
    state.password = ''
    uni.removeStorageSync('userInfo')
    uni.removeStorageSync('token')
    uni.removeStorageSync('expiresIn')
    uni.removeStorageSync('username')
    uni.removeStorageSync('password')
    //停止心跳
    stop()
    //关闭socket
    uni.closeSocket({})
  }
}

const actions = {
  // 登录成功操作
  async loginSuccess(context: ActionContext<IUser, any>, data: any): Promise<void> {
    context.commit('setUser', data.userInfo)
    context.commit('setToken', data.token)
    context.commit('setExpires', data.expiresIn)
    //启动websocket监听
    start()
  }
}

const userState = {
  namespaced: true,
  state,
  mutations,
  actions
}

export default userState
