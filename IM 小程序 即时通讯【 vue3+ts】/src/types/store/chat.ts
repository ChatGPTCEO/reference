//
import {IUserInfo} from "./user";
import {IChatMessage} from "../../api/types/chat";

export interface IChatFriend {
  username: string
  nickName: string
  avatarUrl: string
  message: string // 最近消息内容
  createTime: number // 最近消息时间
  type: number // 最近一条消息类型
  count: number// 未读消息数目
  group:number // 默认0，group=1 组数据
}

export interface IChat {
  loginState: number // 登录状态
  friendList: IChatFriend[]
  setAction: number  // 点击设置人触发
  activeName: string // 当前聊天窗口人
  chatList: IChatMessage[] // 当前聊天窗口消息
  updateId: number // 更新id
  tempFilePath: Record<string,string> //临时文件缓存
}

