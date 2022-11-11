import {ActionContext} from 'vuex'
import {IChatMessage} from "../../api/types/chat";
import {IChat, IChatFriend} from "../../types/store/chat";
import user from "../module/user";
import {msgTip, sendChatMessage} from "./utils";
import {getToken, WsPATH} from "../../common/request";

const state: IChat = {
    loginState: 0, // 登录状态
    friendList: uni.getStorageSync('friendList') || [], //朋友列表,
    setAction: 0,
    activeName: '', // 当前聊天窗口人
    chatList: [],// 当前聊天窗口消息
    updateId: 0,
    tempFilePath: {} //临时文件
}
const mutations = {
    // 接收消息
    async receiveMsg(state: IChat, msg: IChatMessage) {
        //TODO 系统消息处理
        if (msg.type! > 10) {
            //系统处理类型消息
            if (msg.type === 11) {
                console.log(msg)
                if (msg.from === state.activeName) {
                    //单次确认
                    for (let i = state.chatList.length - 1; i >= 0; i--) {
                        if (state.chatList[i].id === msg.id) {
                            state.chatList[i].status = 1//已读
                            break
                        }
                    }
                }
            } else if (msg.type === 12) {
                //进入聊天窗口-全部确认已读
                if (msg.from === state.activeName) {
                    for (const item of state.chatList) {
                        item.status = 1//已读
                    }
                }
            }
            return
        }
        //TODO 群组消息处理
        if (msg.code === 6) {
            //非本人消息才处理
            if (msg.from !== user.state.info?.username) {
                // 群消息正在打开
                if (msg.to === state.activeName) {
                    //当前聊天窗口打开的消息
                    state.chatList.push(msg)
                    state.updateId++;
                    //发送消息确认群已读
                    uni.sendSocketMessage({
                        data: '@' + msg.to,
                    });
                } else {
                    msg.from = msg.to //设置来源为组id
                    msg.avatar = msg.groupAvatar
                    msg.nickName = msg.groupNickName
                    msgCheckList(state, msg)
                }
            } else {
                //当前聊天窗口打开的消息
                if (msg.to === state.activeName) {
                    state.chatList.push(msg)
                    state.updateId++;
                }
            }
            return
        }
        //TODO 非群消息处理
        if (msg.to === state.activeName || msg.from === state.activeName) {
            //当前聊天窗口打开的消息
            state.chatList.push(msg)
            state.updateId++;

            //消息是否就是实时接收到页面
            if (msg.from === state.activeName) {
                //发送消息确认已读
                uni.sendSocketMessage({
                    data: msg.id + ',' + msg.from,
                });
            }
        } else {
            //不在聊天窗口打开的消息且不是自己的消息
            if (msg.from !== user.state.info?.username) {
                msgCheckList(state, msg)
            }
        }
    },
    // 设置当前窗口用户
    async setActive(state: IChat, username: string) {
        if (user.state.info?.username === username) {
            uni.showToast({title: '不能与自己聊天！'})
            return
        }
        state.activeName = username
        state.setAction++
        // await setActive(state)
    }
    , setFriendList(state: IChat, list: IChatFriend[]) {
        state.friendList = list
        uni.setStorage({
            key: 'friendList', data: list
        })
    }
}

//检查消息是否存在朋友列表
const msgCheckList = (state: IChat, msg: IChatMessage) => {
    //提醒
    msgTip()
    //console.log(state.friendList)
    //修改内容
    let flag = true
    for (const item of state.friendList) {
        if (item.username === msg.from) {
            item.message = msg.message!
            item.type = msg.type!
            item.count++
            flag = false
            break
        }
    }
    //说明列表不存在该消息，则直接插入
    if (flag) {
        let nickName = msg.nickName!
        let avatar = msg.avatar!
        if (msg.code === 7) {//客服消息-单独设置头像
            nickName = '系统客服'
            avatar = 'https://im.idb.com.cn/fs/static/customer.png'
        }
        //插入
        state.friendList.unshift({
            username: msg.from!,
            nickName: nickName,
            avatarUrl: avatar,
            message: msg.message!, // 最近消息内容
            createTime: msg.createTime!, // 最近消息时间
            type: msg.type!, // 最近一条消息类型
            count: 1,// 未读消息数目
            group: msg.code === 6 ? 1 : 0 //组类型
        })
    }
}

const actions = {
    async login(context: ActionContext<IChat, any>, openId: any): Promise<void> {

    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
