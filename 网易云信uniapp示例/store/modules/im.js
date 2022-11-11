import config from '@/config'
const state = {
  sessions: [], // 处理后的会话列表
  rawSessions: [], // 原始的会话列表
  defaultUserLogo: `${config.imgSrc}default-contactor.png`, // 默认头像
  userInfo: {}, // 登录用户信息
  currentSession: '', // 正在聊天 sessionId 不带聊天类型
  currentChatTo: '', // 正在聊天 sessionId 带聊天类型
  currentChatInfo: '', // 正在聊天所有信息
  personList: {}, // 所有有信息的人的列表
  unreadInfo: {}, // 未读信息，包含已、未订阅的账户数
  unreadTotalNum: 0, // 未读信息总数
  rawMessageList: {}, // 所有的聊天列表都在里面
  blackList: [], // 黑名单列表
  notificationList: {
    system: [],
    custom: []
  }, // 系统通知，分为自定义消息和系统消息

}
const actions = {
  // im注册登录
  imRegisterLogin() {
    if (getApp().globalData.nim) {
      getApp().globalData.nim.disconnect()
    }
    new IMController({
      token: '123456',
      account: '18589080607'
    })

  },
  // UnreadInfo：更新群未读数
  SessionUnreadInfo_update(context, sessions) {
    let totalNum = 0
    sessions.map(item => {
      if (item.unread) {
        state.unreadInfo[item.id] = item.unread
        totalNum = totalNum + item.unread
      }
    })
    context.commit('setUnreadInfo', state.unreadInfo)
    context.commit('setUnreadTotalNum', totalNum)
  },
  // UnreadInfo：更新未读数
  UnreadInfo_update(context, updateSession) {
    state.unreadInfo[updateSession.id] = updateSession.unread
    context.commit('setUnreadInfo', state.unreadInfo)
    let totalNum = 0
    for (let key in state.unreadInfo) {
      totalNum = totalNum + state.unreadInfo[key]
    }
    context.commit('setUnreadTotalNum', totalNum)
  },
  // 会话更新
  Session_update(context, args) {
    let list = args
    // console.log('RawSessions')
    // console.log(list)
    context.commit('setRawSessions', list);
    let sessionIds = []
    let newSessions = []
    list.map(item => {
      sessionIds.push(item.to)
    })
    // 获取关系列表中的用户信息
    getApp().globalData.nim.getUsers({
      accounts: sessionIds,
      done: getUsersDone
    });
    // 
    function getUsersDone(error, users) {
      let accounts = []
      let personList = {}
      users.map(item => {
        let key = item.account
        personList[key] = item
      })
      context.commit('setPersonList', personList);
      list.forEach((item, index) => {
        let i = Object.assign(item, personList[item.to])
        newSessions.push(i)
      })

      context.commit('setSessions', newSessions);
      // console.log('newSessions')
      // console.log(newSessions)



      if (!error) {}
    }

  },
  // 设置当前聊天对象
  CurrentChatTo_Change(context, args) {
    context.commit('setCurrentChatTo', args.session)
    context.commit('setCurrentSession', args.account)
  },
  // 设置个人信息
  IM_OnMyInfo(context, args) {
    context.commit('setUserInfo', args)
  },
  // RawMessageList：存储原始消息
  RawMessageList_Add_Msg(context, args) {
    /*
      attach:{type: "acceptTeamInvite", team: {…}, account: "twilbeter3", users: Array(2), members: Array(1)}
      cc:true
      flow:"out"
      from:"twilbeter"
      fromClientType:"Web"
      fromNick:""
      idClient:"c86b07d8-c98f-4186-94a4-68c2db010ae2"
      idServer:"93284035043786753"
      isHistoryable:true
      isLocal:false
      isOfflinable:true
      isPushable:true
      isReplyMsg:true
      isRoamingable:true
      isSyncable:true
      isUnreadable:true
      needMsgReceipt:false
      needPushNick:false
      scene:"team"
      sessionId:"team-1390040443"
      status:"success"
      target:"1390040443"
      text:""
      time:1536914522419
      to:"1390040443"
      type:"notification"
    */
    let msg = args.msg
    let rawMessageList = Object.assign({}, state.rawMessageList)
    let sessionId = msg.sessionId
    if (!rawMessageList[sessionId]) {
      rawMessageList[sessionId] = {}
    }
    rawMessageList[sessionId][msg.time] = Object.assign({}, msg)
    if (state.currentChatTo === msg.sessionId) { // 当前会话
      getApp().globalData.nim.resetSessionUnread(msg.sessionId)
    }

    context.commit('setRawMessageList', rawMessageList)
  },
  // RawMessageList：存储漫游消息
  RawMessageList_Add_RoamingMsgList(context, args) {
    let msgList = args.msgs
    let sessionId = args.sessionId
    let rawMessageList = Object.assign({}, state.rawMessageList)
    msgList.map(msg => {
      if (!rawMessageList[sessionId]) {
        rawMessageList[sessionId] = {}
      }
      rawMessageList[sessionId][msg.time] = Object.assign({}, msg)
    })
    // console.log('rawMessageList', rawMessageList)
    context.commit('setRawMessageList', rawMessageList)
  },
  // OfflineMessageList：存储离线消息
  RawMessageList_Add_OfflineMessage(context, args) {
    let rawMessageList = Object.assign({}, state.rawMessageList)
    let msg = args.args
    let sessionId = msg.sessionId
    if (!rawMessageList[sessionId]) {
      rawMessageList[sessionId] = {}
    }
    msg.msgs.map((item) => {
      rawMessageList[sessionId][item.time] = Object.assign({}, item)
    })
    // console.log('rawMessageList', rawMessageList)
    context.commit('setRawMessageList', rawMessageList)

  },


  // 更新黑名单列表
  Blacklist_Update_Initial(context, args) {
    context.commit('setBlackList', args)
  }

}
const mutations = {
  setSessions(state, value) {
    state.sessions = value
  },
  setRawSessions(state, value) {
    state.rawSessions = value
  },
  setCurrentChatTo(state, value) {
    state.currentChatTo = value
  },
  setCurrentChatInfo(state, value) {
    state.currentChatInfo = value
  },
  setCurrentSession(state, value) {
    state.currentSession = value
  },
  setUserInfo(state, value) {
    state.userInfo = value
  },
  setUnreadInfo(state, value) {
    state.unreadInfo = value
  },
  setUnreadTotalNum(state, value) {
    state.unreadTotalNum = value
    if (value == 0) {
      uni.removeTabBarBadge({
        index: 1
      })
      return
    }
    if (value > 0 && value < 100) {
      value = value.toString()
    } else if (value > 99) {
      value = '99+'
    }
    uni.setTabBarBadge({
      index: 1,
      text: value
    })




  },
  setRawMessageList(state, value) {
    state.rawMessageList = value
  },
  setPersonList(state, value) {
    state.personList = value
  },
  setBlackList(state, value) {
    state.blackList = value
  }

}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}