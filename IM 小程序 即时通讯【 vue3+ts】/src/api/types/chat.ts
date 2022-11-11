import {IParams} from "./common";

export interface IChatMessage {
    id?: number //
    to?: string // 接收者
    from?: string // 发送者
    type?: number // 消息类型
    message?: string // 消息内容
    status?: number // 消息状态
    createTime?: number //
    nickName?: string // 昵称
    avatar?: string // 头像
    code?: number// 默认是0 ,code=6 群消息
    //群消息时候的群信息
    groupNickName?: string
    groupAvatar?: string
    // me?: boolean // 是否本人发的消息
    // hist?: boolean // 是否历史加载消息
    /** 以下是渲染使用参数 */
    anmitionPlay?: boolean//语音消息使用
}

// 聊天记录查询参数
export interface IChatParams {
    from: string,
    to: string,
    time?: string,
    unread?: number
}

export interface IGroupInfo {
    id?: number //
    createdAt?: string // 创建时间
    nickName?: string // 昵称
    avatarUrl?: string // 头像
    username?: string//
    inviter?: string // 邀請人
}

