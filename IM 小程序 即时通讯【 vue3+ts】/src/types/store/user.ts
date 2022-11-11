export interface IUserInfo {
  openId?: string // 唯一属性
  id?: number // 主键
  createdAt?: string // 创建时间
  updatedAt?: string // 修改时间
  username: string // 登录名称
  password?: string // 密码
  email?: string // 邮箱
  mobile?: string // 手机
  nickName?: string // 联系人姓名
  sex?: string // 性别
  avatarUrl?: string // 头像
  description?: string // 描述
  status?: string // 状态
  lastLoginTime?: string //
  roleType?: string // 角色类型
}

export interface IUser {
  info: IUserInfo | null
  token: string | null
  expiresIn: number | null

  //以下是登录需要使用的参数
  username:string
  password:string
}
