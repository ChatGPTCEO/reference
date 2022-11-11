// 聊天请求接口

import {IParams, IResponse} from "./types/common";
import {get, post, put} from "../common/request";
import {IUserInfo} from "../types/store/user";
import {IChatFriend} from "../types/store/chat";
import {IChatMessage, IChatParams, IGroupInfo} from "./types/chat";


//获取好友列表
export const friendList = () => {
    return get<Array<IChatFriend>>('chat/myFriendList', {hide: true})
}

//删除好友
export const deleteFriend = (username: string) => {
    return post<Array<IChatFriend>>(`chat/deleteFriend/${username}`, {hide: true})
}

//获取通讯录用户
export const contactList = (params: IParams) => {
    return get<IResponse<IUserInfo>>('chat/contactList', params)
}

//查询聊天记录
export const queryMessage = (params: IChatParams, chatType: number) => {
    if (chatType === 1) {
        //群消息查询
        return get<Array<IChatMessage>>('chat/queryGroupMsg', params)
    } else if (chatType === 0) {
        //单人普消息查询
        return get<Array<IChatMessage>>('chat/queryMsg', params)
    } else {
        //客服消息
        return get<Array<IChatMessage>>('customer/queryMessageList', params)
    }
}

//查询未读的消息记录
export const unReadCount = (params: { from: string, to: string }) => {
    return get<number>('chat/unReadCount', params)
}
//查询客服未读的消息
export const customerUnReadCount = () => {
    return get<number>('customer/unReadCount', {hide: true})
}

//查询用户信息
export const queryUser = (id: string) => {
    return get<IUserInfo>('wx/queryUser/' + id, {hide: true})
}


/**
 * 群接口
 */

// 查询群人数
export const groupCount = (groupId: string) => {
    return get<number>('chat/groupCount/' + groupId, {hide: true})
}

// 群信息
export const getGroupInfo = (groupId: string) => {
    return get<IGroupInfo>('chat/groupInfo/' + groupId, {hide: true})
}

// 查詢群列表用戶
export const groupUserList = (groupId: string) => {
    return get<Array<IGroupInfo>>('chat/groupUserList/' + groupId, {hide: true})
}

// 主動推出群聊
export const quitGroup = (groupId: string) => {
    return post(`chat/quitGroup/${groupId}`, {hide: true})
}

//踢出群聊
export const kickGroup = (groupId: string, username: string) => {
    return post(`chat/kickGroup/${groupId}/${username}`, {hide: true})
}

//邀请群聊
export const inviterGroup = (groupId: string, users: Array<string>) => {
    return post(`chat/inviterGroup/${groupId}`, users)
}

//更新群昵称
export const groupUpdateName = (groupId: string, name: string) => {
    return put(`chat/groupUpdateName/${groupId}`,{name})
}
