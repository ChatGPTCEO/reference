<template>
  <view class="page-chatting">
    <u-navbar :title="currentChatInfo.nick" :subTitle="currentChatInfo.custom.enterprise_name"></u-navbar>
    <!-- 视频全屏播放区 -->
    <view v-if="isVideoFullScreen" style="position:fixed;top:0;bottom:0;right:0;left:0;z-index:999;background-color:#000;">
      <video id="videoEle" :src="videoSrc" @ended="videoEnded" show-fullscreen-btn controls style="width:100%;height:100%;"></video>
      <view style="position:absolute;top:40rpx;left:40rpx" @click="videoEnded">
        <img :src="backWhiteIcon" alt="" style="width:80rpx;height:80rpx">
      </view>
    </view>

    <scroll-view scroll-y="true" id="scrollView" :scroll-top="scrollTop" class="scroll-y" @scrolltoupper="scrolltoupper">
      <view class="record-wrapper" id="recordWrapper">
        <view v-for="(message, index) in messageArr" :key="index" v-if="index>showIndex">
          <view class="record-item-time-wrapper" v-if="message.displayTimeHeader != ''">
            <text class="record-item-time">{{message.displayTimeHeader}}</text>
          </view>
          <!-- 发送的消息 -->
          <view v-if="message.sendOrReceive == 'send'" :class="message.sendOrReceive == 'send' ? 'record-chatting-item self' : ''"
            :style="'justify-content: ' + (message.type === 'tip' || message.type === 'notification' ? 'center' : 'flex-end')">
            <view v-if="message.type === 'video'" @tap.stop="requestFullScreenVideo(message)" class="small-video-wrapper">
              <img :src="videoPlayIcon" alt="">
              <!-- <view style="color: #000;">{{message.video.dur / 1000 << 1 >> 1}}''</view> --> -->
            </view>
            <view v-if="message.type === 'audio'" class="audio-wrapper" :data-audio="message.audio" @tap.stop="playAudio"
              style="background-color:#3DC3FF;color: #000;">
              <image :src="iconBase64Map.iconVoiceWhite" class="image"></image>
              <text class="text">{{message.audio.dur / 1000 << 1 >> 1}}''</text>
            </view>
            <rich-text v-if="message.type === 'image'" class="record-chatting-item-text nobg" :nodes="message.nodes"
              @click="previewImg(message.nodes)"></rich-text>
            <rich-text v-if="message.type === '猜拳' || message.type === '贴图表情'" class="record-chatting-item-text nobg"
              :nodes="message.nodes">
            </rich-text>
            <rich-text v-if="message.type === 'text' ||  message.type === '白板消息' || message.type === '阅后即焚' || message.type === 'robot'"
              class="record-chatting-item-text" :nodes="message.nodes" selectable space="nbsp"></rich-text>
            <rich-text v-if="message.type === 'tip' || message.type === 'notification'" class="tip-rich-text" :nodes="message.nodes">
            </rich-text>
            <text
              v-if="message.type !== 'tip'&& message.type !== 'custom' && message.type !== 'notification' && message.type !== 'image' && message.type !== 'video' && message.type !== 'geo' && message.type !== '猜拳' && message.type !== '贴图表情'"
              class="right-triangle"></text>
            <image v-if="message.type !== 'tip' && message.type !== 'notification' && message.type !== 'custom'"
              :src="userInfo.avatar || defaultUserLogo" @tap.stop="switchToMyTab" class="record-chatting-item-img"></image>
            <view v-if="message.type === 'custom'" class="card-custom">
              <jk-im-custom :message="message.nodes[0].content" :subType="message.subType" :accountId="accountId" :uuid="chatTo">
              </jk-im-custom>
            </view>
          </view>
          <!-- 接收的消息 -->
          <view v-if="message.sendOrReceive == 'receive'" :class="message.sendOrReceive == 'receive' ? 'record-chatting-item other' : ''"
            :style="'justify-content: ' + (message.type === 'tip' || message.type === 'notification' ? 'center' : 'flex-start')"
            :data-message="message" @longpress="showEditorMenu">
            <image v-if="message.type !== 'tip' && message.type !== 'notification'&& message.type !== 'custom'" @tap.stop="switchPersonCard"
              :data-account="message.from" :src="personList[message.from] && personList[message.from].avatar || defaultUserLogo"
              class="record-chatting-item-img">
            </image>
            <text
              v-if="message.type !== 'tip' && message.type !== 'custom'&& message.type !== 'notification' && message.type !== 'image' && message.type !== 'video' && message.type !== 'geo' && message.type !== '猜拳' && message.type !== '贴图表情'"
              class="left-triangle"></text>
            <view v-if="message.type === 'video'" @tap.stop="requestFullScreenVideo(message)" class="small-video-wrapper">
              <img :src="videoPlayIcon" alt="">
              <!-- <view class="video-triangle">
                
              </view> -->
              <!-- <view style="color: #000;">{{message.video.dur / 1000 << 1 >> 1}}''</view> -->
            </view>
            <view v-if="message.type === 'audio'" :data-audio="message.audio" @tap.stop="playAudio" class="audio-wrapper">
              <image :src="iconBase64Map.iconVoiceGrey" class="image"></image>
              <text class="text" style="color:#000;">{{message.audio.dur / 1000 << 1 >> 1}}''</text>
            </view>
            <rich-text v-if="message.type === 'image'" class="record-chatting-item-text nobg" :nodes="message.nodes"
              @click="previewImg(message.nodes)"></rich-text>
            <rich-text v-if="message.type === '猜拳' || message.type === '贴图表情'" class="record-chatting-item-text nobg"
              :nodes="message.nodes">
            </rich-text>
            <rich-text v-if="message.type === 'text' ||  message.type === '白板消息' || message.type === '阅后即焚' || message.type === 'robot'"
              class="record-chatting-item-text" style="color:#000;background-color:#fff;" :nodes="message.nodes"></rich-text>
            <rich-text v-if="message.type === 'tip' || message.type === 'notification'" class="tip-rich-text" :nodes="message.nodes">
            </rich-text>
            <view v-if="message.type === 'custom'" class="card-custom">
              <jk-im-custom :message="message.nodes[0].content" :subType="message.subType" :accountId="accountId" :uuid="chatTo">
                <template slot="userLogo">
                  <image @tap.stop="switchPersonCard" :data-account="message.from"
                    :src="personList[message.from] && personList[message.from].avatar || defaultUserLogo" class="record-chatting-item-img">
                  </image>
                  <text class="left-triangle"></text>
                </template>
              </jk-im-custom>
            </view>
          </view>
        </view>
        <view v-if="isBlack" class="flex-row-center">
          <view class="custom-text flex-center-center">对方已被您加入黑名单，您将不会再收到对方发送的任何消息，如果需要取消黑名单，点击“+”号并使用解除黑名单</view>
        </view>
      </view>

    </scroll-view>

    <!--底部输入框  -->
    <view v-if="chatType === 'p2p' || !currentGroup.isCurrentNotIn" class="chat-input-wrapper" @tap.stop="stopEventPropagation"
      :style="{ 'margin-bottom': isFullScreen?'32rpx':'0'}">
      <view class="chatinput-content flex-row-sb-center">
        <!-- <input style="margin-bottom: 20rpx;" v-if="sendType == 0" v-model="inputValue" :focus="focusFlag" @input="inputChange"
          @focus="inputFocus" @blur="inputBlur" @confirm="inputSend" class="chatinput-input" placeholder="输入文字" confirm-type="send">     -->
        <textarea auto-height :show-confirm-bar="false" cursor-spacing="100rpx" maxlength="300" v-if="sendType == 0" v-model="inputValue"
          placeholder-class="placeholder-class" :focus="focusFlag" @input="inputChange" @focus="inputFocus" @blur="inputBlur"
          class="chatinput-input" placeholder="输入消息内容">
          </textarea>

        <view class="flex-row-sb flex-align-center relative" :style="'width:'+ (focusFlag&&inputValue ? 186 : 156) +'rpx'">
          <view v-if="focusFlag && inputValue " class="icon-clear flex-center-center" @click="clearInput">
            <img :src="clearIcon" alt="">
          </view>
          <image :src="emojiIcon" @tap.stop="toggleEmoji" class="chatinput-img"></image>
          <view v-if="focusFlag && inputValue" class="btn-send flex-center-center" @click="inputSend">发送</view>
          <image v-else :src="plusIcon" @tap.stop="toggleMore" class="chatinput-img"></image>
        </view>

      </view>
      <view v-if="emojiFlag" class="chatinput-subcontent">
        <jk-im-emoji @EmojiClick="emojiCLick" @EmojiSend="emojiSend"></jk-im-emoji>
      </view>
      <view v-if="moreFlag" class="more-subcontent">
        <view style="display:flex;;">
          <view class="more-subcontent-item" @tap.stop="chooseImageToSend">
            <image :src="photoIcon" class="image"></image>
            <text class="text">相册</text>
          </view>
          <view class="more-subcontent-item" @tap.stop="chooseImageOrVideo">
            <image :src="cameraIcon" class="image"></image>
            <text class="text">拍摄</text>
          </view>
          <view v-if="isBlack" class="more-subcontent-item" @tap.stop="openRemoveBlack">
            <image :src="blackPeopleRemoveIcon" class="image"></image>
            <text class="text">解除</text>
          </view>
          <view v-else class="more-subcontent-item" @tap.stop="openAddBlack">
            <image :src="blackPeopleIcon" class="image"></image>
            <text class="text">黑名单</text>
          </view>
        </view>
      </view>
    </view>

    <u-modal v-model="showAddBlack" title="加入黑名单" content="加入黑名单后,您将不再接收该雇主的信息!" @confirm="addToBlack" show-cancel-button></u-modal>
    <u-modal v-model="showRemoveBlack" title="解除黑名单" content="解除黑名单后，您将继续接收该雇主的信息" @confirm="removeBlack" show-cancel-button></u-modal>

  </view>
</template>

<script>
import config from '@/config'
import { mapState, mapMutations } from 'vuex'
import { generateBigEmojiImageFile, generateRichTextNode, generateImageNode, calcTimeHeader } from '@/utils-im/util.js'
const app = getApp()
export default {
  components: {},
  data() {
    return {
      positionIcon: `${config.imgSrc}im/position-icon.png`,
      wechatIcon: `${config.imgSrc}im/wechat-icon.png`,
      qqIcon: `${config.imgSrc}im/qq-icon.png`,
      phoneIcon: `${config.imgSrc}im/phone-icon.png`,
      plusIcon: `${config.imgSrc}im/plus-icon.png`,
      emojiIcon: `${config.imgSrc}im/emoji-icon.png`,
      photoIcon: `${config.imgSrc}im/icon-photo.png`,
      cameraIcon: `${config.imgSrc}im/icon-camera.png`,
      clearIcon: `${config.imgSrc}delete_image.png`,
      backWhiteIcon: `${config.imgSrc}back-white-icon.png`,
      videoPlayIcon: `${config.imgSrc}video-play-icon.png`,
      avoidCheatIcon: `${config.imgSrc}im/avoid-cheat-icon.png`,
      blackPeopleIcon: `${config.imgSrc}im/black-people-icon.png`,
      blackPeopleRemoveIcon: `${config.imgSrc}im/black-people-remove-icon.png`,
      contactType: { icon: '', text: '', type: '' },
      showJobModal: false,
      showContactType: true,
      showContactTip: true,
      showContactModal: false,
      showAddBlack: false,
      showRemoveBlack: false,
      isBlack: false, // 是否已在黑名单
      isBlackIndex: 0, // 在黑名单列表的索引
      quickCommunicationType: 1, // 1直接沟通;2快捷沟通
      tipContent: '',
      options: {},
      jobCardInfo: {},
      videoContext: null,
      isVideoFullScreen: false,
      videoSrc: '',
      chatTo: '', //聊天对象account
      chatType: 'p2p', //聊天类型 advanced 高级群聊 normal 讨论组群聊 p2p 点对点聊天
      focusFlag: false, //控制输入框失去焦点与否
      emojiFlag: false, //emoji键盘标志位
      moreFlag: false, // 更多功能标志
      tipFlag: false, // tip消息标志
      tipInputValue: '', // tip消息文本框内容
      sendType: 0, //发送消息类型，0 文本 1 语音
      inputValue: '', //文本框输入内容
      from: '',
      scrollTop: 1000,
      messageArr: [], //[{text, time, sendOrReceive: 'send', displayTimeHeader, nodes: []},{type: 'geo',geo: {lat,lng,title}}]
      accountId: '', // 当前聊天对象的信息
      showIndex: 10,
      scrollHeight: '72vh'
    }
  },
  watch: {
    rawMessageList: function () {
      this.setMessage()
    },
    moreFlag: function (newValue) {}
  },
  computed: {
    ...mapState(['hasLogin']),
    ...mapState('im', {
      currentChatTo: 'currentChatTo',
      currentChatInfo: 'currentChatInfo',
      rawMessageList: 'rawMessageList',
      userInfo: 'userInfo',
      defaultUserLogo: 'defaultUserLogo',
      blackList: 'blackList',
      personList: 'personList'
    })
  },
  methods: {
    // 设置当前聊天数据
    setMessage() {
      let messageArr = Object.assign({}, this.rawMessageList[this.currentChatTo])
      // console.log('当前聊天记录,处理前数据')
      // console.log(messageArr)
      this.messageArr = this.convertRawMessageListToRenderMessageArr(messageArr)
      this.showIndex = this.messageArr.length - 10
      // console.log('当前聊天记录,处理后数据')
      // console.log(this.messageArr)
      this.scrollToBottom()
    },
    // 滚动到底部
    scrollToBottom() {
      const query = uni.createSelectorQuery().in(this)
      let value = 0
      let h1 = 0
      let h2 = 0
      query
        .select('#scrollView')
        .boundingClientRect(data => {
          h2 = data.height
        })
        .exec()
      setTimeout(() => {
        query
          .select('#recordWrapper')
          .boundingClientRect(data => {
            h1 = data.height
            this.scrollTop = h1 - h2
          })
          .exec()
      }, 500)
    },
    //图片预览
    previewImg(e) {
      console.log(e[0])
      uni.previewImage({
        urls: [e[0].attrs.src]
      })
    },
    // 距离上一条消息是否超过5分钟
    judgeOverTwoMinute(time, messageArr) {
      let displayTimeHeader = ''
      let lastMessage = messageArr[messageArr.length - 1]
      if (lastMessage) {
        //拥有上一条消息
        let delta = time - lastMessage.time
        if (delta > 5 * 60 * 1000) {
          //5分钟以上
          displayTimeHeader = calcTimeHeader(time)
        }
      } else {
        //没有上一条消息
        displayTimeHeader = calcTimeHeader(time)
      }
      return displayTimeHeader
    },
    // 原始消息列表转化为适用于渲染的消息列表
    convertRawMessageListToRenderMessageArr(rawMsgList) {
      let messageArr = []
      for (let time in rawMsgList) {
        let rawMsg = rawMsgList[time]
        let msgType = ''
        if (rawMsg.type === 'custom' && JSON.parse(rawMsg['content'])['type'] === 1) {
          msgType = '猜拳'
        } else if (rawMsg.type === 'custom' && JSON.parse(rawMsg['content'])['type'] === 3) {
          msgType = '贴图表情'
        } else {
          msgType = rawMsg.type
        }
        let displayTimeHeader = this.judgeOverTwoMinute(rawMsg.time, messageArr)
        let sendOrReceive = rawMsg.flow === 'in' ? 'receive' : 'send'
        let specifiedObject = {}
        switch (msgType) {
          case 'text': {
            specifiedObject = {
              nodes: generateRichTextNode(rawMsg.text)
            }
            break
          }
          case 'image': {
            specifiedObject = {
              nodes: generateImageNode(rawMsg.file)
            }
            break
          }
          case '贴图表情': {
            let content = JSON.parse(rawMsg['content'])
            specifiedObject = {
              nodes: generateImageNode(generateBigEmojiImageFile(content))
            }
            break
          }
          case 'tip': {
            specifiedObject = {
              text: rawMsg.tip,
              nodes: [
                {
                  type: 'text',
                  text: rawMsg.tip
                }
              ]
            }
            break
          }
          case 'video': {
            specifiedObject = {
              video: rawMsg.file
            }
            break
          }
          case 'robot': {
            let text = msgType === 'file' ? '文件消息' : '机器人消息'
            specifiedObject = {
              nodes: [
                {
                  type: 'text',
                  text: `[${text}],请到手机或电脑客户端查看`
                }
              ]
            }
            break
          }
          case 'custom':
            specifiedObject = {
              nodes: [
                {
                  type: 'custom',
                  content: JSON.parse(JSON.parse(rawMsg.content).msg)
                }
              ]
            }
            break
          case 'notification':
            specifiedObject = {
              // netbill的text为空
              text: rawMsg.groupNotification || (rawMsg.text.length == 0 ? '通知' : rawMsg.text),
              nodes: [
                {
                  type: 'text',
                  text: rawMsg.groupNotification || (rawMsg.text.length == 0 ? '通知' : rawMsg.text)
                }
              ]
            }
            break
          default: {
            break
          }
        }
        messageArr.push(
          Object.assign(
            {},
            {
              from: rawMsg.from,
              type: msgType,
              text: rawMsg.text || '',
              time,
              sendOrReceive,
              displayTimeHeader
            },
            specifiedObject
          )
        )
      }
      return messageArr
    },
    // 文本框输入事件
    inputChange(e) {},
    // 键盘单击发送，发送文本
    inputSend(e) {
      this.sendRequest(e.detail.value || this.inputValue)
    },
    // emoji组件回调
    emojiCLick(e) {
      let val = e.detail
      // 单击删除按钮，，删除emoji
      if (val == '[删除]') {
        let lastIndex = this.inputValue.lastIndexOf('[')
        if (lastIndex != -1) {
          this.inputValue = this.inputValue.slice(0, lastIndex)
        }
        return
      }
      if (val[0] == '[') {
        // emoji
        this.inputValue = this.inputValue + val
      } else {
        //大图
        this.sendBigEmoji(val)
      }
    },
    // emoji点击发送
    emojiSend(e) {
      let val = this.inputValue
      this.sendRequest(val)
      this.emojiFlag = false
    },
    // 发送网络请求：发送文本消息(包括emoji)
    sendRequest(text) {
      let self = this
      app.globalData.nim.sendText({
        scene: self.chatType,
        to: self.chatTo,
        text,
        done: (err, msg) => {
          // 判断错误类型，并做相应处理
          if (self.handleErrorAfterSend(err)) {
            return
          }
          // 存储数据到store
          self.saveChatMessageListToStore(msg)
          self.focusFlag = false
          self.inputValue = ''
          // 滚动到底部
          self.scrollToBottom()
        }
      })
    },
    // 发送大的emoji:实际上是type=3的自定义消息
    sendBigEmoji(val) {
      wx.showLoading({
        title: '发送中...'
      })
      let self = this
      let catalog = ''
      if (val[0] === 'a') {
        catalog = 'ajmd'
      } else if (val[0] === 'x') {
        catalog = 'xxy'
      } else if (val[0] === 'l') {
        catalog = 'lt'
      }
      let content = {
        type: 3,
        data: {
          catalog,
          chartlet: val
        }
      }
      app.globalData.nim.sendCustomMsg({
        scene: self.chatType === 'p2p' ? 'p2p' : 'team',
        to: self.chatTo,
        content: JSON.stringify(content),
        done: function (err, msg) {
          wx.hideLoading()
          // 判断错误类型，并做相应处理
          if (self.handleErrorAfterSend(err)) {
            return
          }
          // 存储数据到store
          self.saveChatMessageListToStore(msg)

          // 隐藏发送栏
          self.setData({
            focusFlag: false,
            emojiFlag: false,
            tipFlag: false,
            moreFlag: false
          })
          // 滚动到底部
          self.scrollToBottom()
        }
      })
    },
    // 发送图片到nos
    sendImageToNOS(res) {
      wx.showLoading({
        title: '发送中...'
      })
      let self = this
      let tempFilePaths = res.tempFilePaths
      for (let i = 0; i < tempFilePaths.length; i++) {
        // 上传文件到nos
        app.globalData.nim.sendFile({
          type: 'image',
          scene: self.chatType === 'p2p' ? 'p2p' : 'team',
          to: self.chatTo,
          wxFilePath: tempFilePaths[i],
          done: function (err, msg) {
            wx.hideLoading()
            // 判断错误类型，并做相应处理
            if (self.handleErrorAfterSend(err)) {
              return
            }
            // 存储数据到store
            self.saveChatMessageListToStore(msg)

            // 滚动到底部
            self.scrollToBottom()
          }
        })
      }
    },
    // 统一发送消息后打回的错误信息 返回true表示有错误，false表示没错误
    handleErrorAfterSend(err) {
      if (err) {
        if (err.code == 7101) {
          showToast('text', '你已被对方拉黑')
        }
        console.log(err)
        return true
      }
      return false
    },
    // 保存数据到store
    saveChatMessageListToStore(msg, handledMsg) {
      this.$store.dispatch('im/RawMessageList_Add_Msg', {
        msg,
        nim: app.globalData.nim
      })
      // this.setMessage()
    },
    //  收起所有输入框
    chatingWrapperClick(e) {
      this.foldInputArea()
    },
    // 收起键盘
    foldInputArea() {
      this.setData({
        focusFlag: false,
        emojiFlag: false,
        tipFlag: false,
        moreFlag: false
      })
    },
    // 阻止事件冒泡空函数
    stopEventPropagation() {},
    // 重新计算时间头
    reCalcAllMessageTime() {
      let tempArr = [...this.messageArr]
      if (tempArr.length == 0) return
      // 计算时差
      tempArr.map((msg, index) => {
        if (index === 0) {
          msg['displayTimeHeader'] = calcTimeHeader(msg.time)
        } else {
          let delta = (msg.time - tempArr[index - 1].time) / (120 * 1000)
          if (delta > 1) {
            // 距离上一条，超过5分钟重新计算头部
            msg['displayTimeHeader'] = calcTimeHeader(msg.time)
          }
        }
      })
      this.messageArr = tempArr
    },
    // 切换发送文本类型
    switchSendType() {
      this.emojiFlag = false
      this.focusFlag = false
      this.sendType = this.sendType == 0 ? 1 : 0
    },
    //  获取焦点
    inputFocus(e) {
      this.emojiFlag = false
      this.focusFlag = true
    },
    // 失去焦点
    inputBlur() {
      this.focusFlag = false
    },
    //  组件按钮回调
    tipClickHandler(e) {
      let data = e.detail.data
      if (data === 'confirm') {
        if (this.tipInputValue.length === 0) {
          showToast('text', '请输入内容')
        } else {
          this.tipInputConfirm()
          this.setData({
            tipFlag: false
          })
        }
      } else if (data === 'cancel') {
        this.setData({
          tipFlag: false
        })
      }
    },
    // 切换出emoji键盘
    toggleEmoji() {
      this.sendType = 0
      this.emojiFlag = !this.emojiFlag
      this.moreFlag = false
    },
    // 切出更多
    toggleMore() {
      this.moreFlag = !this.moreFlag
      this.emojiFlag = false
      this.focusFlag = false
    },
    // 选择相册图片
    chooseImageToSend(e) {
      let type = e.currentTarget.dataset.type
      let self = this
      this.moreFlag = false
      wx.chooseImage({
        sourceType: ['album'],
        success: function (res) {
          self.sendImageToNOS(res)
        }
      })
    },
    // 选择拍摄视频或者照片
    chooseImageOrVideo() {
      let self = this
      this.moreFlag = false
      wx.showActionSheet({
        itemList: ['照相', '视频'],
        success: function (res) {
          if (res.tapIndex === 0) {
            // 相片
            wx.chooseImage({
              sourceType: ['camera'],
              success: function (res) {
                self.sendImageToNOS(res)
              }
            })
          } else if (res.tapIndex === 1) {
            // 视频
            wx.chooseVideo({
              sourceType: ['camera', 'album'],
              success: function (res) {
                if (res.duration > 60) {
                  showToast('text', '视频时长超过60s，请重新选择')
                  return
                }
                console.log(res)
                // {duration,errMsg,height,size,tempFilePath,width}
                self.sendVideoToNos(res)
              }
            })
          }
        }
      })
    },
    // 发送视频文件到nos
    sendVideoToNos(res) {
      uni.showLoading({
        title: '发送中...'
      })
      // {duration,errMsg,height,size,tempFilePath,width}
      let self = this
      let tempFilePath = res.tempFilePath
      // 上传文件到nos
      app.globalData.nim.sendFile({
        type: 'video',
        scene: this.chatType === 'p2p' ? 'p2p' : 'team',
        to: this.chatTo,
        wxFilePath: tempFilePath,
        done: function (err, msg) {
          uni.hideLoading()
          // file: {dur, ext,h,md5,name,size,url,w}
          // 判断错误类型，并做相应处理
          if (self.handleErrorAfterSend(err)) {
            return
          }
          // 存储数据到store
          self.saveChatMessageListToStore(msg)

          // 滚动到底部
          self.scrollToBottom()
        }
      })
    },
    // 查看云端历史消息、查看群信息、查看讨论组信息
    lookMessage() {
      let self = this
      let actionArr = ['清空本地聊天记录', '查看云消息记录']
      let actionFn = [self.sureToClearAllMessage, self.lookAllMessage]
      if (this.currentGroup.isCurrentNotIn) {
        actionArr.pop()
      }
      if (self.chatType === 'advanced') {
        actionArr.unshift('群信息')
        actionFn.unshift(self.lookAdvancedGroupInfo)
      } else if (self.chatType === 'normal') {
        actionArr.unshift('讨论组信息')
        actionFn.unshift(self.lookNormalGroupInfo)
      }
      wx.showActionSheet({
        itemList: actionArr,
        success: res => {
          actionFn[res.tapIndex]()
        }
      })
    },
    //  弹框 确认 清除本地记录
    sureToClearAllMessage() {
      let self = this
      wx.showActionSheet({
        //二次确认
        itemList: ['清空'],
        itemColor: '#f00',
        success: res => {
          if (res.tapIndex == 0) {
            self.clearAllMessage()
          }
        }
      })
    },
    //  清除本地记录
    clearAllMessage() {
      // 刷新本地视图
      this.setData({
        messageArr: []
      })
      store.dispatch({
        type: 'Delete_All_MessageByAccount',
        payload: (this.chatType === 'p2p' ? 'p2p-' : 'team-') + this.chatTo
      })
    },
    // 展示编辑菜单
    showEditorMenu(e) {
      return
      let message = e.currentTarget.dataset.message
      if (message.type === 'tip') {
        return
      }
      let paraObj = {
        time: message.time,
        chatTo: this.chatTo,
        chatType: this.chatType
      }
      let self = this
      if (message.sendOrReceive === 'send') {
        // 自己消息
        wx.showActionSheet({
          itemList: ['删除', '转发', '撤回'],
          success: function (res) {
            switch (res.tapIndex) {
              case 0:
                self.deleteMessageRecord(message)
                break
              case 1:
                self.forwardMessage(paraObj)
                break
              case 2:
                wx.showActionSheet({
                  itemList: ['确定'],
                  itemColor: '#ff0000',
                  success: function (res) {
                    if (res.tapIndex === 0) {
                      self.recallMessage(message)
                    }
                  }
                })
                break
              default:
                break
            }
          }
        })
      } else {
        // 对方消息
        wx.showActionSheet({
          itemList: ['删除', '转发'],
          success: function (res) {
            switch (res.tapIndex) {
              case 0:
                self.deleteMessageRecord(message)
                break
              case 1:
                self.forwardMessage(paraObj)
                break
              default:
                break
            }
          }
        })
      }
    },
    // 转发消息
    forwardMessage(paramObj) {
      let str = encodeURIComponent(JSON.stringify(paramObj))
      wx.redirectTo({
        url: '../forwardContact/forwardContact?data=' + str
      })
    },
    //  撤回消息
    recallMessage(message) {
      let self = this
      let sessionId = (self.chatType === 'p2p' ? 'p2p-' : 'team-') + self.chatTo
      let rawMessage = self.rawMessageList[sessionId][message.time]

      app.globalData.nim.deleteMsg({
        msg: rawMessage,
        done: function (err, { msg }) {
          if (err) {
            // 撤回失败
            console.log(err)
            showToast('text', '消息已超过2分钟，不能撤回')
            return
          } else {
            // 撤回成功
            store.dispatch({
              type: 'RawMessageList_Recall_Msg',
              payload: msg
            })
            // 滚动到底部
            self.scrollToBottom()
          }
        }
      })
    },
    // 删除消息 {displayTimeHeader,nodes,sendOrReceive,text,time,type}
    deleteMessageRecord(msg) {
      let sessionId = (this.chatType === 'p2p' ? 'p2p-' : 'team-') + this.chatTo
      // 从全局记录中删除
      store.dispatch({
        type: 'Delete_Single_MessageByAccount',
        payload: { sessionId: sessionId, time: msg.time }
      })
    },
    // 全屏播放视频
    requestFullScreenVideo(e) {
      let video = e.video
      let videoContext = uni.createVideoContext('videoEle')
      this.isVideoFullScreen = true
      this.videoSrc = video.url
      this.videoContext = videoContext
      videoContext.requestFullScreen()
      videoContext.play()
    },
    // 视频播放结束钩子
    videoEnded() {
      this.isVideoFullScreen = false
      this.videoSrc = ''
    },
    // 清除输入框内容
    clearInput() {
      this.inputValue = ''
    },
    // 判断是否在黑名单列表内
    isInBlack() {
      this.blackList.forEach((item, index) => {
        if (item.account == this.currentChatTo.substring(4, this.currentChatTo.length)) {
          this.isBlack = true
          this.isBlackIndex = index
          return
        }
      })
    },
    // 打开加入黑名单提示框
    openAddBlack() {
      this.showAddBlack = true
    },
    //打开解除黑名单提示框
    openRemoveBlack() {
      this.showRemoveBlack = true
    },
    // 确定加入黑名单
    addToBlack() {
      let account = this.currentChatTo.substring(4, this.currentChatTo.length)
      getApp().globalData.nim.markInBlacklist({
        account: account,
        // `true`表示加入黑名单, `false`表示从黑名单移除
        isAdd: true,
        done: markInBlacklistDone
      })
      let _this = this
      function markInBlacklistDone(error, obj) {
        console.log('将' + obj.account + '加入黑名单' + (!error ? '成功' : '失败'))
        if (!error) {
          _this.isBlack = true
          _this.showAddBlack = false
          _this.blackList.push({ account: account })
          _this.$store.commit('im/setBlackList', _this.blackList)
          _this.$toast('当前雇主已被您加入黑名单')
          _this.moreFlag = false
        }
      }
    },
    // 确定解除黑名单
    removeBlack() {
      let account = this.currentChatTo.substring(4, this.currentChatTo.length)
      getApp().globalData.nim.markInBlacklist({
        account: account,
        // `true`表示加入黑名单, `false`表示从黑名单移除
        isAdd: false,
        done: markInBlacklistDone
      })
      let _this = this
      function markInBlacklistDone(error, obj) {
        console.log('将' + obj.account + '从黑名单移除' + (!error ? '成功' : '失败'))
        if (!error) {
          _this.isBlack = false
          _this.showRemoveBlack = false
          _this.blackList.splice(_this.isBlackIndex, 1)
          _this.$store.commit('im/setBlackList', _this.blackList)
          _this.$toast('黑名单已解除，您可以继续和对方沟通')
          _this.moreFlag = false
        }
      }
    },
    // 跳转防骗指南页面
    gotoAvoidCheatPage() {
      this.$router.push({ path: '/pages/avoid-cheat/avoid-cheat' })
    },
    // 加载更多聊天记录
    scrolltoupper() {
      if (this.showIndex <= 0) return
      this.showIndex = this.showIndex - 10
    }
  },
  onLoad(options) {
    // 传入参数: chatTo: 聊天对象在im体系的id, accountId:聊天对象在兼客体系中的accountId
    this.options = options
    this.chatTo = options.chatTo
    this.accountId = this.options.accountId
    this.isInBlack()
    this.reCalcAllMessageTime()
    this.setMessage()
  },
  onReady() {},
  onShow() {},
  onHide() {},
  onUnload() {
    // 更新当前会话对象账户
    this.$store.dispatch('im/CurrentChatTo_Change', { session: '', account: '' })
  },
  onReachBottom() {},
  onPullDownRefresh() {},
  onShareAppMessage() {}
}
</script>

<style lang="scss">
.page-chatting {
  .top {
    padding: 30rpx 40rpx 20rpx 40rpx;
    background: #ffffff;
    .top-item {
      .top-item-img {
        img {
          width: 64rpx;
          height: 64rpx;
        }
      }
      .top-item-text {
        margin-top: 14rpx;
        font-size: 28rpx;
        color: #333333;
      }
    }
  }
  .cheat-tip {
    // position: fixed;
    // z-index: 99;
    margin-top: 24rpx;
    width: 100%;
    font-size: 28rpx;
    color: #0091ff;
  }
  /*聊天记录  */
  .record-wrapper {
    width: 100%;
    min-height: 100%;
    padding-bottom: 180rpx;
    padding-top: 100rpx;
    background: #f7f8f8;
    .record-chatting-item {
      width: 100%;
      padding: 20rpx 20rpx;
      box-sizing: border-box;
    }
    .record-item-time-wrapper {
      display: flex;
      flex-direction: row;
      justify-content: center;
    }
    .record-item-time {
      padding: 4rpx 10rpx;
      background: #d6d6d6;
      border-radius: 8rpx;
      font-size: 24rpx;
      color: #fff;
    }
    .record-chatting-item-img {
      width: 80rpx;
      height: 80rpx;
      border-radius: 100%;
      display: inline-block;
    }

    .record-chatting-item-text {
      max-width: 70%;
      border-radius: 8rpx;
      background-color: #3dc3ff;
      padding: 16rpx;
      box-sizing: border-box;
      word-wrap: break-word;
      overflow: hidden;
      font-size: 32rpx;
      line-height: 48rpx;
    }
    .record-chatting-item-text.nobg {
      background: transparent;
      margin-left: 20rpx;
      margin-right: 20rpx;
    }
    /* tip消息富文本 */
    .tip-rich-text {
      background-color: #ccc;
      text-align: center;
      align-self: center;
      min-height: 40rpx;
      word-break: break-word;
      font-size: 26rpx;
      padding: 0 20rpx;
      color: #000;
      border-radius: 10rpx;
    }

    .self {
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      color: #fff;
    }
    .other {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      color: #222;
    }
    .left-triangle {
      height: 0px;
      width: 0px;
      border-width: 12rpx;
      border-style: solid;
      border-color: transparent transparent transparent transparent;
      margin-top: 20rpx;
    }
    .right-triangle {
      height: 0px;
      width: 0px;
      border-width: 12rpx;
      border-style: solid;
      border-color: transparent transparent transparent transparent;
      margin-top: 20rpx;
    }
    .video-triangle {
      height: 0px;
      width: 0px;
      border-width: 30rpx;
      border-style: solid;
      border-color: transparent transparent transparent #777;
      margin-top: 20rpx;
      margin-left: 30rpx;
    }

    .small-map-wrapper {
      overflow: hidden;
      width: 452rpx;
      height: 300rpx;
      position: relative;
      border-radius: 8rpx;
    }
    .self .small-map-wrapper {
      margin-right: 20rpx;
    }
    .other .small-map-wrapper {
      margin-left: 20rpx;
    }
    .small-map-wrapper .small-geo-img {
      width: 100%;
      height: 100%;
      background-color: pink;
    }
    .small-map-wrapper .text {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      box-sizing: border-box;
      width: 100%;
      padding: 10rpx;
      min-height: 70rpx;
      /* line-height: 70rpx; */
      opacity: 0.75;
      font-size: 28rpx;
      /* white-space: nowrap; */
      text-align: center;
      text-overflow: ellipsis;
      background-color: #444;
      color: #fff;
    }

    .small-video-wrapper {
      margin-left: 20rpx;
      margin-right: 20rpx;
      width: 240rpx;
      height: 240rpx;
      padding: 10rpx;
      background-color: #fff;
      border-radius: 0px 16rpx 16rpx 16rpx;
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      img {
        width: 88rpx;
        height: 88rpx;
      }
    }
    .small-video-wrapper .video {
      max-width: 200px;
      max-height: 300px;
    }

    .audio-wrapper {
      background-color: #fff;
      border-radius: 28rpx;
      display: flex;
      justify-content: space-between;
      padding: 0 20rpx;
      min-width: 30%;
      box-sizing: border-box;
      margin-left: -2px;
    }
    .audio-wrapper .image {
      width: 70rpx;
      height: 70rpx;
      align-self: center;
    }
    .audio-wrapper .text {
      align-self: center;
      color: #fff;
    }
  }

  /*聊天输入框  */
  .chat-input-wrapper {
    width: 100%;
    background-color: #fff;
    position: fixed;
    bottom: -3px;
    left: 0;

    .btn-send {
      width: 78rpx;
      height: 48rpx;
      background: #3cc3ff;
      border-radius: 8rpx;
      font-size: 24rpx;
      color: #ffffff;
    }
    .chatinput-content {
      width: 100%;
      padding: 13rpx 30rpx;
    }
    .icon-clear {
      position: absolute;
      z-index: 99;
      width: 32rpx;
      height: 32rpx;
      left: -50rpx;
      top: 4rpx;
      img {
        width: 32rpx;
        height: 32rpx;
      }
    }
    .chatinput-img {
      width: 48rpx;
      height: 48rpx;
      margin-left: 30rpx;
    }
    .chatinput-img.emoji {
      margin-right: 0;
    }
    .chatinput-img:active {
      opacity: 0.6;
    }
    .chatinput-input {
      // width: 534rpx;
      flex: 3;
      min-height: 72rpx;
      border-radius: 16rpx;
      margin-top: 15rpx;
      padding-top: 10rpx;
      padding-left: 30rpx;
      padding-right: 40rpx;
      font-size: 30rpx;
      margin-bottom: 20rpx;
      background: #f7f7f7;
    }
    .placeholder-class {
      padding: 30rpx 0 0 0;
      color: #999999;
      line-height: 36px;
    }
    .chatinput-voice-mask {
      width: 466rpx;
      height: 76rpx;
      line-height: 76rpx;
      display: inline-block;
      border-radius: 12rpx;
      border: 1px solid #ccc;
      margin-top: 12rpx;
      vertical-align: top;
      box-sizing: border-box;
      /* padding-left: 20rpx; */
      font-size: 30rpx;
      text-align: center;
      color: #333336;
      background-color: #fff;
      letter-spacing: 4rpx;
    }
    .chatinput-voice-mask-hover {
      background-color: #cecece;
      color: #333336;
    }
    /*subcontent wrapper  */
    .chatinput-subcontent {
      width: 100%;
      // height: 470rpx;
      margin-bottom: 32rpx;
      background-color: #999;
    }
    .fr {
      float: right;
    }
    /* more-subcontent */
    .more-subcontent {
      padding: 40rpx 50rpx;
      border-top: 1rpx solid #e6e6e6;
    }
    .more-subcontent .more-subcontent-item {
      display: flex;
      flex-direction: column;
      margin-bottom: 30rpx;
      margin-right: 85rpx;
    }
    .more-subcontent .more-subcontent-item .image {
      width: 98rpx;
      height: 98rpx;
      margin-bottom: 24rpx;
    }
    .more-subcontent .more-subcontent-item .text {
      font-size: 24rpx;
      text-align: center;
      color: #333333;
    }
    /*聊天记录  */
    .record-wrapper {
      width: 100%;
      padding-bottom: 100rpx;
      padding-top: 80rpx;
    }
    .record-chatting-item {
      width: 100%;
      padding: 20rpx 20rpx;
      box-sizing: border-box;
    }
    .record-item-time-wrapper {
      display: flex;
      flex-direction: row;
      justify-content: center;
    }
    .record-item-time {
      padding: 4rpx 10rpx;
      background: #d6d6d6;
      border-radius: 8rpx;
      font-size: 24rpx;
      color: #fff;
    }
    .record-chatting-item-img {
      width: 80rpx;
      height: 80rpx;
      border-radius: 100%;
      display: inline-block;
    }

    .record-chatting-item-text {
      max-width: 70%;
      border-radius: 8rpx;
      background-color: #3dc3ff;
      padding: 16rpx;
      box-sizing: border-box;
      word-wrap: break-word;
      overflow: hidden;
      font-size: 32rpx;
      line-height: 48rpx;
    }
    .record-chatting-item-text.nobg {
      background: transparent;
      margin-left: 20rpx;
      margin-right: 20rpx;
    }
    /* tip消息富文本 */
    .tip-rich-text {
      background-color: #ccc;
      text-align: center;
      align-self: center;
      min-height: 40rpx;
      word-break: break-word;
      font-size: 26rpx;
      padding: 0 20rpx;
      color: #000;
      border-radius: 10rpx;
    }

    .self {
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      color: #fff;
    }
    .other {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      color: #222;
    }
    .left-triangle {
      height: 0px;
      width: 0px;
      border-width: 20rpx;
      border-style: solid;
      border-color: transparent #fff transparent transparent;
      margin-top: 20rpx;
    }
    .right-triangle {
      height: 0px;
      width: 0px;
      border-width: 20rpx;
      border-style: solid;
      border-color: transparent transparent transparent #3dc3ff;
      margin-top: 20rpx;
    }
    .video-triangle {
      height: 0px;
      width: 0px;
      border-width: 30rpx;
      border-style: solid;
      border-color: transparent transparent transparent #777;
      margin-top: 20rpx;
      margin-left: 30rpx;
    }

    .small-map-wrapper {
      overflow: hidden;
      width: 452rpx;
      height: 300rpx;
      position: relative;
      border-radius: 8rpx;
    }
    .self .small-map-wrapper {
      margin-right: 20rpx;
    }
    .other .small-map-wrapper {
      margin-left: 20rpx;
    }
    .small-map-wrapper .small-geo-img {
      width: 100%;
      height: 100%;
      background-color: pink;
    }
    .small-map-wrapper .text {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      box-sizing: border-box;
      width: 100%;
      padding: 10rpx;
      min-height: 70rpx;
      opacity: 0.75;
      font-size: 28rpx;
      text-align: center;
      text-overflow: ellipsis;
      background-color: #444;
      color: #fff;
    }

    .small-video-wrapper {
      margin-left: 20rpx;
      margin-right: 20rpx;
      width: 200rpx;
      height: 200rpx;
      padding: 10rpx;
      background-color: #fff;
      border-radius: 20rpx;
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
    }
    .small-video-wrapper .video {
      max-width: 200px;
      max-height: 300px;
    }

    .audio-wrapper {
      background-color: #fff;
      border-radius: 28rpx;
      display: flex;
      justify-content: space-between;
      padding: 0 20rpx;
      min-width: 30%;
      box-sizing: border-box;
      margin-left: -2px;
    }
    .audio-wrapper .image {
      width: 70rpx;
      height: 70rpx;
      align-self: center;
    }
    .audio-wrapper .text {
      align-self: center;
      color: #fff;
    }
  }
  .scroll-y {
    height: 86vh;
    background: #f7f8f8;
  }
  .card-custom {
    width: 100%;
  }
  .slot-content {
    width: 699rpx;
    padding: 0 40rpx 40rpx 40rpx;
    background: #f7f8f8;
    border-radius: 12rpx;
    .modal-title {
      padding: 56rpx 0;
      font-size: 36rpx;
      text-align: center;
      font-weight: bold;
      color: #000000;
    }
    .job-card {
      background: #ffffff;
      border-radius: 12rpx;
    }
  }
  .custom-text {
    margin-top: 40rpx;
    width: 500rpx;
    text-align: center;
    font-size: 26rpx;
    color: #999999;
    line-height: 40rpx;
  }
}
</style>
