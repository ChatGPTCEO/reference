<template>
  <view>
    <view class="content" @touchstart="hideDrawer">
      <scroll-view
        class="msg-list"
        scroll-y="true"
        :scroll-with-animation="scrollAnimation"
        :scroll-top="scrollTop"
        :scroll-into-view="scrollToView"
        @scrolltoupper="loadHistory"
        upper-threshold="50"
      >
        <!-- 加载历史数据waitingUI -->
        <view class="loading">
          <view class="spinner">
            <view class="rect1"></view>
            <view class="rect2"></view>
            <view class="rect3"></view>
            <view class="rect4"></view>
            <view class="rect5"></view>
          </view>
        </view>
        <view
          class="row"
          v-for="(row, index) in msgList"
          :key="index"
          :id="'msg' + row.msg.id"
        >
          <!-- 系统消息 -->
          <block v-if="row.type == 'system'">
            <view class="system">
              <!-- 文字消息 -->
              <view v-if="row.msg.type == 'text'" class="text">
                {{ row.msg.content.text }}
              </view>
              <!-- 领取红包消息 -->
              <view v-if="row.msg.type == 'redEnvelope'" class="red-envelope">
                <image src="/static/img/red-envelope-chat.png"></image>
                {{ row.msg.content.text }}
              </view>
            </view>
          </block>
          <!-- 用户消息 -->
          <block v-if="row.type == 'user'">
            <!-- 自己发出的消息 -->
            <view class="my" v-if="row.msg.userinfo.uid == myuid">
              <!-- 左-消息 -->
              <view class="left">
                <!-- 文字消息 -->
                <view v-if="row.msg.type == 'text'" class="bubble">
                  <rich-text :nodes="row.msg.content.text"></rich-text>
                </view>
                <!-- 语言消息 -->
                <view
                  v-if="row.msg.type == 'voice'"
                  class="bubble voice"
                  @tap="playVoice(row.msg)"
                  :class="playMsgid == row.msg.id ? 'play' : ''"
                >
                  <view class="length">{{ row.msg.content.length }}</view>
                  <view class="icon my-voice"></view>
                </view>
                <!-- 图片消息 -->
                <view
                  v-if="row.msg.type == 'img'"
                  class="bubble img"
                  @tap="showPic(row.msg)"
                >
                  <image
                    :src="row.msg.content.url"
                    :style="{
                      width: row.msg.content.w + 'px',
                      height: row.msg.content.h + 'px',
                    }"
                  ></image>
                </view>
              </view>
              <!-- 右-头像 -->
              <view class="right">
                <image :src="row.msg.userinfo.face"></image>
              </view>
            </view>
            <!-- 别人发出的消息 -->
            <view class="other" v-if="row.msg.userinfo.uid != myuid">
              <!-- 左-头像 -->
              <view class="left">
                <image :src="row.msg.userinfo.face"></image>
              </view>
              <!-- 右-用户名称-时间-消息 -->
              <view class="right">
                <view class="username">
                  <view class="name">{{ row.msg.userinfo.username }}</view>
                  <view class="time">{{ row.msg.time }}</view>
                </view>
                <!-- 文字消息 -->
                <view v-if="row.msg.type == 'text'" class="bubble">
                  <rich-text :nodes="row.msg.content.text"></rich-text>
                </view>
                <!-- 语音消息 -->
                <view
                  v-if="row.msg.type == 'voice'"
                  class="bubble voice"
                  @tap="playVoice(row.msg)"
                  :class="playMsgid == row.msg.id ? 'play' : ''"
                >
                  <view class="icon other-voice"></view>
                  <view class="length">{{ row.msg.content.length }}</view>
                </view>
                <!-- 图片消息 -->
                <view
                  v-if="row.msg.type == 'img'"
                  class="bubble img"
                  @tap="showPic(row.msg)"
                >
                  <image
                    :src="row.msg.content.url"
                    :style="{
                      width: row.msg.content.w + 'px',
                      height: row.msg.content.h + 'px',
                    }"
                  ></image>
                </view>
              </view>
            </view>
          </block>
        </view>
      </scroll-view>
    </view>
    <!-- 抽屉栏 -->
    <view
      class="popup-layer"
      :class="popupLayerClass"
      @touchmove.stop.prevent="discard"
    >
      <!-- 表情 -->
      <swiper
        class="emoji-swiper"
        :class="{ hidden: hideEmoji }"
        indicator-dots="true"
        duration="150"
      >
        <swiper-item v-for="(page, pid) in emojiList" :key="pid">
          <scroll-view :scroll-y="true" style="width: 100%;height: 100%;overflow: hidden;">
            <view v-for="(em, eid) in page" :key="eid" @tap="addEmoji(em)" style="float: left;">
              <image mode="widthFix" :src="'/static/img/emoji/' + em.url"></image>
            </view>
          </scroll-view>
        </swiper-item>
      </swiper>
      <!-- 更多功能 相册-拍照-红包 -->
      <view class="more-layer" :class="{ hidden: hideMore }">
        <view class="list">
          <view class="box" @tap="chooseImage">
            <view class="icon tupian2"></view>
          </view>
          <view class="box" @tap="camera">
            <view class="icon paizhao"></view>
          </view>
          <view class="box" @tap="videoCall">
            <view class="icon shipin"></view>
          </view>
          <view class="box" @tap="showMap">
            <view class="icon ditu"></view>
          </view>
          <!-- <view class="box" @tap="handRedEnvelopes"
            ><view class="icon hongbao"></view
          ></view> -->
        </view>
      </view>
    </view>
    <!-- 底部输入栏 -->
    <view
      class="input-box"
      :class="popupLayerClass"
      @touchmove.stop.prevent="discard"
    >
      <!-- H5下不能录音，输入栏布局改动一下 -->
      <!-- #ifndef H5 -->
      <view class="voice">
        <view
          class="icon"
          :class="isVoice ? 'jianpan' : 'yuyin'"
          @tap="switchVoice"
        ></view>
      </view>
      <!-- #endif -->
      <!-- #ifdef H5 -->
      <view class="more" @tap="showMore">
        <view class="icon add"></view>
      </view>
      <!-- #endif -->
      <view class="textbox">
        <view
          class="voice-mode"
          :class="[isVoice ? '' : 'hidden', recording ? 'recording' : '']"
          @touchstart="voiceBegin"
          @touchmove.stop.prevent="voiceIng"
          @touchend="voiceEnd"
          @touchcancel="voiceCancel"
          >{{ voiceTis }}</view
        >
        <view class="text-mode" :class="isVoice ? 'hidden' : ''">
          <view class="box">
            <textarea
              auto-height="true"
              v-model="textMsg"
              @focus="textareaFocus"
              style="padding: 7px 0;"
              cursor-spacing="10"
            />
          </view>
          <view class="em" @tap="chooseEmoji">
            <view class="icon biaoqing"></view>
          </view>
        </view>
      </view>
      <!-- #ifndef H5 -->
      <view class="more" @tap="showMore">
        <view class="icon add"></view>
      </view>
      <!-- #endif -->
      <view class="send" :class="isVoice ? 'hidden' : ''" @tap="sendText">
        <view class="btn">发送</view>
      </view>
    </view>
    <!-- 录音UI效果 -->
    <view class="record" :class="recording ? '' : 'hidden'">
      <view class="ing" :class="willStop ? 'hidden' : ''"
        ><view class="icon luyin2"></view
      ></view>
      <view class="cancel" :class="willStop ? '' : 'hidden'"
        ><view class="icon chehui"></view
      ></view>
      <view class="tis" :class="willStop ? 'change' : ''">{{ recordTis }}</view>
    </view>
  </view>
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
interface ImgMsgContent { url: string, w: number, h: number }
@Component({
  name: 'MsgChartPage',
}) // 装饰器
export default class MsgChartPage extends Vue {
  // 文字消息相关参数
  private textMsg: any = ''
  private isHistoryLoading: any = false
  private scrollAnimation: any = false
  private scrollTop: any = 0
  private scrollToView: any = ''
  private msgList: any = []
  private msgImgList: any = []
  private myuid: any = 0
  // 录音相关参数
  private readonly RECORDER: any = uni.getRecorderManager()
  private isVoice: any = false
  private voiceTis: any = '按住 说话'
  private recordTis: any = '手指上滑 取消发送'
  private recording: any = false
  private willStop: any = false
  private initPoint: any = { identifier: 0, Y: 0 }
  private recordTimer: any = null
  private recordLength: any = 0
  // 播放语音相关参数
  private readonly AUDIO: any = uni.createInnerAudioContext()
  private playMsgid: any = null
  private VoiceTimer: any = null
  private popupLayerClass: any = ''
  private hideMore: any = true
  // 表情相关
  private hideEmoji: any = true
  private emojiList: any = [
    [
      { url: '100.gif', alt: '[微笑]' },
      { url: '101.gif', alt: '[伤心]' },
      { url: '102.gif', alt: '[美女]' },
      { url: '103.gif', alt: '[发呆]' },
      { url: '104.gif', alt: '[墨镜]' },
      { url: '105.gif', alt: '[哭]' },
      { url: '106.gif', alt: '[羞]' },
      { url: '107.gif', alt: '[哑]' },
      { url: '108.gif', alt: '[睡]' },
      { url: '109.gif', alt: '[哭]' },
      { url: '110.gif', alt: '[囧]' },
      { url: '111.gif', alt: '[怒]' },
      { url: '112.gif', alt: '[调皮]' },
      { url: '113.gif', alt: '[笑]' },
      { url: '114.gif', alt: '[惊讶]' },
      { url: '115.gif', alt: '[难过]' },
      { url: '116.gif', alt: '[酷]' },
      { url: '117.gif', alt: '[汗]' },
      { url: '118.gif', alt: '[抓狂]' },
      { url: '119.gif', alt: '[吐]' },
      { url: '120.gif', alt: '[笑]' },
      { url: '121.gif', alt: '[快乐]' },
      { url: '122.gif', alt: '[奇]' },
      { url: '123.gif', alt: '[傲]' },
    ],
    [
      { url: '124.gif', alt: '[饿]' },
      { url: '125.gif', alt: '[累]' },
      { url: '126.gif', alt: '[吓]' },
      { url: '127.gif', alt: '[汗]' },
      { url: '128.gif', alt: '[高兴]' },
      { url: '129.gif', alt: '[闲]' },
      { url: '130.gif', alt: '[努力]' },
      { url: '131.gif', alt: '[骂]' },
      { url: '132.gif', alt: '[疑问]' },
      { url: '133.gif', alt: '[秘密]' },
      { url: '134.gif', alt: '[乱]' },
      { url: '135.gif', alt: '[疯]' },
      { url: '136.gif', alt: '[哀]' },
      { url: '137.gif', alt: '[鬼]' },
      { url: '138.gif', alt: '[打击]' },
      { url: '139.gif', alt: '[bye]' },
      { url: '140.gif', alt: '[汗]' },
      { url: '141.gif', alt: '[抠]' },
      { url: '142.gif', alt: '[鼓掌]' },
      { url: '143.gif', alt: '[糟糕]' },
      { url: '144.gif', alt: '[恶搞]' },
      { url: '145.gif', alt: '[什么]' },
      { url: '146.gif', alt: '[什么]' },
      { url: '147.gif', alt: '[累]' },
    ],
    [
      { url: '148.gif', alt: '[看]' },
      { url: '149.gif', alt: '[难过]' },
      { url: '150.gif', alt: '[难过]' },
      { url: '151.gif', alt: '[坏]' },
      { url: '152.gif', alt: '[亲]' },
      { url: '153.gif', alt: '[吓]' },
      { url: '154.gif', alt: '[可怜]' },
      { url: '155.gif', alt: '[刀]' },
      { url: '156.gif', alt: '[水果]' },
      { url: '157.gif', alt: '[酒]' },
      { url: '158.gif', alt: '[篮球]' },
      { url: '159.gif', alt: '[乒乓]' },
      { url: '160.gif', alt: '[咖啡]' },
      { url: '161.gif', alt: '[美食]' },
      { url: '162.gif', alt: '[动物]' },
      { url: '163.gif', alt: '[鲜花]' },
      { url: '164.gif', alt: '[枯]' },
      { url: '165.gif', alt: '[唇]' },
      { url: '166.gif', alt: '[爱]' },
      { url: '167.gif', alt: '[分手]' },
      { url: '168.gif', alt: '[生日]' },
      { url: '169.gif', alt: '[电]' },
      { url: '170.gif', alt: '[炸弹]' },
      { url: '171.gif', alt: '[刀子]' },
    ],
    [
      { url: '172.gif', alt: '[足球]' },
      { url: '173.gif', alt: '[瓢虫]' },
      { url: '174.gif', alt: '[翔]' },
      { url: '175.gif', alt: '[月亮]' },
      { url: '176.gif', alt: '[太阳]' },
      { url: '177.gif', alt: '[礼物]' },
      { url: '178.gif', alt: '[抱抱]' },
      { url: '179.gif', alt: '[拇指]' },
      { url: '180.gif', alt: '[贬低]' },
      { url: '181.gif', alt: '[握手]' },
      { url: '182.gif', alt: '[剪刀手]' },
      { url: '183.gif', alt: '[抱拳]' },
      { url: '184.gif', alt: '[勾引]' },
      { url: '185.gif', alt: '[拳头]' },
      { url: '186.gif', alt: '[小拇指]' },
      { url: '187.gif', alt: '[拇指八]' },
      { url: '188.gif', alt: '[食指]' },
      { url: '189.gif', alt: '[ok]' },
      { url: '190.gif', alt: '[情侣]' },
      { url: '191.gif', alt: '[爱心]' },
      { url: '192.gif', alt: '[蹦哒]' },
      { url: '193.gif', alt: '[颤抖]' },
      { url: '194.gif', alt: '[怄气]' },
      { url: '195.gif', alt: '[跳舞]' },
    ],
    [
      { url: '196.gif', alt: '[发呆]' },
      { url: '197.gif', alt: '[背着]' },
      { url: '198.gif', alt: '[伸手]' },
      { url: '199.gif', alt: '[耍帅]' },
      { url: '200.png', alt: '[微笑]' },
      { url: '201.png', alt: '[生病]' },
      { url: '202.png', alt: '[哭泣]' },
      { url: '203.png', alt: '[吐舌]' },
      { url: '204.png', alt: '[迷糊]' },
      { url: '205.png', alt: '[瞪眼]' },
      { url: '206.png', alt: '[恐怖]' },
      { url: '207.png', alt: '[忧愁]' },
      { url: '208.png', alt: '[眨眉]' },
      { url: '209.png', alt: '[闭眼]' },
      { url: '210.png', alt: '[鄙视]' },
      { url: '211.png', alt: '[阴暗]' },
      { url: '212.png', alt: '[小鬼]' },
      { url: '213.png', alt: '[礼物]' },
      { url: '214.png', alt: '[拜佛]' },
      { url: '215.png', alt: '[力量]' },
      { url: '216.png', alt: '[金钱]' },
      { url: '217.png', alt: '[蛋糕]' },
      { url: '218.png', alt: '[彩带]' },
      { url: '219.png', alt: '[礼物]' },
    ],
  ]
  //表情图片图床名称 ，由于我上传的第三方图床名称会有改变，所以有此数据来做对应，您实际应用中应该不需要
  private onlineEmoji: any = {
    '100.gif': 'AbNQgA.gif',
    '101.gif': 'AbN3ut.gif',
    '102.gif': 'AbNM3d.gif',
    '103.gif': 'AbN8DP.gif',
    '104.gif': 'AbNljI.gif',
    '105.gif': 'AbNtUS.gif',
    '106.gif': 'AbNGHf.gif',
    '107.gif': 'AbNYE8.gif',
    '108.gif': 'AbNaCQ.gif',
    '109.gif': 'AbNN4g.gif',
    '110.gif': 'AbN0vn.gif',
    '111.gif': 'AbNd3j.gif',
    '112.gif': 'AbNsbV.gif',
    '113.gif': 'AbNwgs.gif',
    '114.gif': 'AbNrD0.gif',
    '115.gif': 'AbNDuq.gif',
    '116.gif': 'AbNg5F.gif',
    '117.gif': 'AbN6ET.gif',
    '118.gif': 'AbNcUU.gif',
    '119.gif': 'AbNRC4.gif',
    '120.gif': 'AbNhvR.gif',
    '121.gif': 'AbNf29.gif',
    '122.gif': 'AbNW8J.gif',
    '123.gif': 'AbNob6.gif',
    '124.gif': 'AbN5K1.gif',
    '125.gif': 'AbNHUO.gif',
    '126.gif': 'AbNIDx.gif',
    '127.gif': 'AbN7VK.gif',
    '128.gif': 'AbNb5D.gif',
    '129.gif': 'AbNX2d.gif',
    '130.gif': 'AbNLPe.gif',
    '131.gif': 'AbNjxA.gif',
    '132.gif': 'AbNO8H.gif',
    '133.gif': 'AbNxKI.gif',
    '134.gif': 'AbNzrt.gif',
    '135.gif': 'AbU9Vf.gif',
    '136.gif': 'AbUSqP.gif',
    '137.gif': 'AbUCa8.gif',
    '138.gif': 'AbUkGQ.gif',
    '139.gif': 'AbUFPg.gif',
    '140.gif': 'AbUPIS.gif',
    '141.gif': 'AbUZMn.gif',
    '142.gif': 'AbUExs.gif',
    '143.gif': 'AbUA2j.gif',
    '144.gif': 'AbUMIU.gif',
    '145.gif': 'AbUerq.gif',
    '146.gif': 'AbUKaT.gif',
    '147.gif': 'AbUmq0.gif',
    '148.gif': 'AbUuZV.gif',
    '149.gif': 'AbUliF.gif',
    '150.gif': 'AbU1G4.gif',
    '151.gif': 'AbU8z9.gif',
    '152.gif': 'AbU3RJ.gif',
    '153.gif': 'AbUYs1.gif',
    '154.gif': 'AbUJMR.gif',
    '155.gif': 'AbUadK.gif',
    '156.gif': 'AbUtqx.gif',
    '157.gif': 'AbUUZ6.gif',
    '158.gif': 'AbUBJe.gif',
    '159.gif': 'AbUdIO.gif',
    '160.gif': 'AbU0iD.gif',
    '161.gif': 'AbUrzd.gif',
    '162.gif': 'AbUDRH.gif',
    '163.gif': 'AbUyQA.gif',
    '164.gif': 'AbUWo8.gif',
    '165.gif': 'AbU6sI.gif',
    '166.gif': 'AbU2eP.gif',
    '167.gif': 'AbUcLt.gif',
    '168.gif': 'AbU4Jg.gif',
    '169.gif': 'AbURdf.gif',
    '170.gif': 'AbUhFS.gif',
    '171.gif': 'AbU5WQ.gif',
    '172.gif': 'AbULwV.gif',
    '173.gif': 'AbUIzj.gif',
    '174.gif': 'AbUTQs.gif',
    '175.gif': 'AbU7yn.gif',
    '176.gif': 'AbUqe0.gif',
    '177.gif': 'AbUHLq.gif',
    '178.gif': 'AbUOoT.gif',
    '179.gif': 'AbUvYF.gif',
    '180.gif': 'AbUjFU.gif',
    '181.gif': 'AbaSSJ.gif',
    '182.gif': 'AbUxW4.gif',
    '183.gif': 'AbaCO1.gif',
    '184.gif': 'Abapl9.gif',
    '185.gif': 'Aba9yR.gif',
    '186.gif': 'AbaFw6.gif',
    '187.gif': 'Abaiex.gif',
    '188.gif': 'AbakTK.gif',
    '189.gif': 'AbaZfe.png',
    '190.gif': 'AbaEFO.gif',
    '191.gif': 'AbaVYD.gif',
    '192.gif': 'AbamSH.gif',
    '193.gif': 'AbaKOI.gif',
    '194.gif': 'Abanld.gif',
    '195.gif': 'Abau6A.gif',
    '196.gif': 'AbaQmt.gif',
    '197.gif': 'Abal0P.gif',
    '198.gif': 'AbatpQ.gif',
    '199.gif': 'Aba1Tf.gif',
    '200.png': 'Aba8k8.png',
    '201.png': 'AbaGtS.png',
    '202.png': 'AbaJfg.png',
    '203.png': 'AbaNlj.png',
    '204.png': 'Abawmq.png',
    '205.png': 'AbaU6s.png',
    '206.png': 'AbaaXn.png',
    '207.png': 'Aba000.png',
    '208.png': 'AbarkT.png',
    '209.png': 'AbastU.png',
    '210.png': 'AbaB7V.png',
    '211.png': 'Abafn1.png',
    '212.png': 'Abacp4.png',
    '213.png': 'AbayhF.png',
    '214.png': 'Abag1J.png',
    '215.png': 'Aba2c9.png',
    '216.png': 'AbaRXR.png',
    '217.png': 'Aba476.png',
    '218.png': 'Abah0x.png',
    '219.png': 'Abdg58.png',
  }
  //红包相关参数
  private windowsState: any = ''
  private redenvelopeData: any = {
    rid: null, //红包ID
    from: null,
    face: null,
    blessing: null,
    money: null,
  }

  onLoad(data: any) {
    const jsonData = JSON.parse(data.data)
    uni.setNavigationBarTitle({
      title: jsonData.name,
    })
    this.getMsgList()
    //语音自然播放结束
    this.AUDIO.onEnded((res: any) => {
      this.playMsgid = null
    })
    //录音开始事件
    this.RECORDER.onStart((e: any) => {
      this.recordBegin(e)
    })
    //录音结束事件
    this.RECORDER.onStop((e: any) => {
      this.recordEnd(e)
    })
  }
  onShow() {
    this.scrollTop = 9999999
  }
  // 接受消息(筛选处理)
  private screenMsg(msg: any) {
    //从长连接处转发给这个方法，进行筛选处理
    if (msg.type == 'system') {
      // 系统消息
      switch (msg.msg.type) {
        case 'text':
          this.addSystemTextMsg(msg)
          break
        case 'redEnvelope':
          this.addSystemRedEnvelopeMsg(msg)
          break
      }
    } else if (msg.type == 'user') {
      // 用户消息
      switch (msg.msg.type) {
        case 'text':
          this.addTextMsg(msg)
          break
        case 'voice':
          this.addVoiceMsg(msg)
          break
        case 'img':
          this.addImgMsg(msg)
          break
        case 'redEnvelope':
          this.addRedEnvelopeMsg(msg)
          break
      }
      console.log('用户消息')
      //非自己的消息震动
      if (msg.msg.userinfo.uid != this.myuid) {
        console.log('振动')
        uni.vibrateLong({
            success: function () {
                console.log('vibrateLong success')
            }
        })
      }
    }
    this.$nextTick(function () {
      // 滚动到底
      this.scrollToView = 'msg' + msg.msg.id
    })
  }

  //触发滑动到顶部(加载历史信息记录)
  private loadHistory() {
    if (this.isHistoryLoading) {
      return
    }
    this.isHistoryLoading = true //参数作为进入请求标识，防止重复请求
    this.scrollAnimation = false //关闭滑动动画
    let Viewid = this.msgList[0].msg.id //记住第一个信息ID
    //本地模拟请求历史记录效果
    setTimeout(() => {
      // 消息列表
      let list = [
        {
          type: 'user',
          msg: {
            id: 1,
            type: 'text',
            time: '12:56',
            userinfo: {
              uid: 0,
              username: '李帅武',
              face: 'https://cdn.uviewui.com/uview/common/logo.png',
            },
            content: { text: '？？？？？？' },
          }
        }
      ]
      // 获取消息中的图片,并处理显示尺寸
      for (let i = 0; i < list.length; i++) {
        if (list[i].type == 'user' && list[i].msg.type == 'img') {
          list[i].msg.content = this.setPicSize(list[i].msg.content)
          const imgContent: any = list[i].msg.content
          this.msgImgList.unshift(imgContent.url)
        }
        list[i].msg.id = Math.floor(Math.random() * 1000 + 1)
        this.msgList.unshift(list[i])
      }

      //这段代码很重要，不然每次加载历史数据都会跳到顶部
      this.$nextTick(function () {
        this.scrollToView = 'msg' + Viewid //跳转上次的第一行信息位置
        this.$nextTick(function () {
          this.scrollAnimation = true //恢复滚动动画
        })
      })
      this.isHistoryLoading = false
    }, 1000)
  }
  // 加载初始页面消息
  private getMsgList() {
    // 消息列表
    let list = [
      {
        type: 'system',
        msg: {
          id: 0,
          type: 'text',
          content: { text: '开始聊天~' },
        },
      },
      {
        type: 'user',
        msg: {
          id: 1,
          type: 'text',
          time: '12:56',
          userinfo: {
            uid: 0,
            username: '李帅武',
            face: 'https://cdn.uviewui.com/uview/common/logo.png',
          },
          content: { text: '晚上好' },
        },
      },
      {
        type: 'user',
        msg: {
          id: 2,
          type: 'text',
          time: '12:57',
          userinfo: {
            uid: 1,
            username: '边哥哥',
            face: 'https://cdn.uviewui.com/uview/common/logo.png',
          },
          content: {
            text: '晚上好。',
          },
        },
      },
      {
        type: 'user',
        msg: {
          id: 3,
          type: 'voice',
          time: '12:59',
          userinfo: {
            uid: 1,
            username: '边哥哥',
            face: 'https://cdn.uviewui.com/uview/common/logo.png',
          },
          content: { url: '/static/voice/1.mp3', length: '00:06' },
        },
      },
      {
        type: 'user',
        msg: {
          id: 4,
          type: 'voice',
          time: '13:05',
          userinfo: {
            uid: 0,
            username: '李帅武',
            face: 'https://cdn.uviewui.com/uview/common/logo.png',
          },
          content: { url: '/static/voice/2.mp3', length: '00:06' },
        },
      },
      {
        type: 'user',
        msg: {
          id: 5,
          type: 'img',
          time: '13:05',
          userinfo: {
            uid: 0,
            username: '李帅武',
            face: 'https://cdn.uviewui.com/uview/common/logo.png',
          },
          content: { url: 'https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-uni-app-doc/87a0a0d0-60aa-11eb-8ff1-d5dcf8779628.png', w: 200, h: 200 },
        },
      },
      {
        type: 'user',
        msg: {
          id: 6,
          type: 'img',
          time: '12:59',
          userinfo: {
            uid: 1,
            username: '边哥哥',
            face: 'https://cdn.uviewui.com/uview/common/logo.png',
          },
          content: { url: 'https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-uni-app-doc/87a0a0d0-60aa-11eb-8ff1-d5dcf8779628.png', w: 1920, h: 1080 },
        },
      }
    ]
    // 获取消息中的图片,并处理显示尺寸
    for (let i = 0; i < list.length; i++) {
      if (list[i].type == 'user' && list[i].msg.type == 'img') {
        list[i].msg.content = this.setPicSize(list[i].msg.content)
        this.msgImgList.push(list[i].msg.content.url)
      }
    }
    this.msgList = list
    // 滚动到底部
    this.$nextTick(function () {
      //进入页面滚动到底部
      this.scrollTop = 9999
      this.$nextTick(function () {
        this.scrollAnimation = true
      })
    })
  }
  //处理图片尺寸，如果不处理宽高，新进入页面加载图片时候会闪
  private setPicSize(content: any) {
    // 让图片最长边等于设置的最大长度，短边等比例缩小，图片控件真实改变，区别于aspectFit方式。
    let maxW = uni.upx2px(350) //350是定义消息图片最大宽度
    let maxH = uni.upx2px(350) //350是定义消息图片最大高度
    if (content.w > maxW || content.h > maxH) {
      let scale = content.w / content.h
      content.w = scale > 1 ? maxW : maxH * scale
      content.h = scale > 1 ? maxW / scale : maxH
    }
    return content
  }

  //更多功能(点击+弹出)
  private showMore() {
    this.isVoice = false
    this.hideEmoji = true
    if (this.hideMore) {
      this.hideMore = false
      this.openDrawer()
    } else {
      this.hideDrawer()
    }
  }
  // 打开抽屉
  private openDrawer() {
    this.popupLayerClass = 'showLayer'
  }
  // 隐藏抽屉
  private hideDrawer() {
    this.popupLayerClass = ''
    setTimeout(() => {
      this.hideMore = true
      this.hideEmoji = true
    }, 150)
  }
  // 选择图片发送
  private chooseImage() {
    this.getImage('album')
  }
  //拍照发送
  private camera() {
    this.getImage('camera')
  }
  // 视频通话
  private videoCall () {}
  // 地图
  private showMap () {}
  //发红包
  private handRedEnvelopes() {
    uni.navigateTo({
      url: 'HM-hand/HM-hand',
    })
    this.hideDrawer()
  }
  //选照片 or 拍照
  private getImage(type: any) {
    this.hideDrawer()
    uni.chooseImage({
      sourceType: [type],
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      success: (res) => {
        for (let i = 0; i < res.tempFilePaths.length; i++) {
          uni.getImageInfo({
            src: res.tempFilePaths[i],
            success: (image) => {
              console.log(image.width)
              console.log(image.height)
              let msg = {
                url: res.tempFilePaths[i],
                w: image.width,
                h: image.height,
              }
              this.sendMsg(msg, 'img')
            },
          })
        }
      },
    })
  }
  // 选择表情
  private chooseEmoji() {
    this.hideMore = true
    if (this.hideEmoji) {
      this.hideEmoji = false
      this.openDrawer()
    } else {
      this.hideDrawer()
    }
  }
  //添加表情
  private addEmoji(em: any) {
    this.textMsg += em.alt
  }

  //获取焦点，如果不是选表情ing,则关闭抽屉
  private textareaFocus() {
    if (this.popupLayerClass == 'showLayer' && this.hideMore == false) {
      this.hideDrawer()
    }
  }
  // 发送文字消息
  private sendText() {
    this.hideDrawer() //隐藏抽屉
    if (!this.textMsg) {
      return
    }
    let content = this.replaceEmoji(this.textMsg)
    let msg = { text: content }
    this.sendMsg(msg, 'text')
    this.textMsg = '' //清空输入框
  }
  //替换表情符号为图片
  private replaceEmoji(str: any) {
    let replacedStr = str.replace(/\[([^(\]|\[)]*)\]/g, (item: any, index: any) => {
      console.log('item: ' + item)
      for (let i = 0; i < this.emojiList.length; i++) {
        let row = this.emojiList[i]
        for (let j = 0; j < row.length; j++) {
          let EM = row[j]
          if (EM.alt == item) {
            //在线表情路径，图文混排必须使用网络路径，请上传一份表情到你的服务器后再替换此路径
            //比如你上传服务器后，你的100.gif路径为https://www.xxx.com/emoji/100.gif 则替换onlinePath填写为https://www.xxx.com/emoji/
            let onlinePath = 'https://s2.ax1x.com/2019/04/12/'
            let imgstr =
              '<img style="vertical-align: middle;" src="' + onlinePath + this.onlineEmoji[EM.url] + '">'
            console.log('imgstr: ' + imgstr)
            return imgstr
          }
        }
      }
    })
    return (
      '<div style="line-height: 25px;">' +
      replacedStr +
      '</div>'
    )
  }

  // 发送消息
  private sendMsg(content: any, type: any) {
    //实际应用中，此处应该提交长连接，模板仅做本地处理。
    var nowDate = new Date()
    let lastid = this.msgList[this.msgList.length - 1].msg.id
    lastid++
    let msg = {
      type: 'user',
      msg: {
        id: lastid,
        time: nowDate.getHours() + ':' + nowDate.getMinutes(),
        type: type,
        userinfo: { uid: 0, username: '李帅武', face: 'https://cdn.uviewui.com/uview/common/logo.png' },
        content: content,
      },
    }
    // 发送消息
    this.screenMsg(msg)
    // 定时器模拟对方回复,三秒
    setTimeout(() => {
      lastid = this.msgList[this.msgList.length - 1].msg.id
      lastid++
      msg = {
        type: 'user',
        msg: {
          id: lastid,
          time: nowDate.getHours() + ':' + nowDate.getMinutes(),
          type: type,
          userinfo: {
            uid: 1,
            username: '边哥哥',
            face: 'https://cdn.uviewui.com/uview/common/logo.png',
          },
          content: content,
        },
      }
      // 本地模拟发送消息
      this.screenMsg(msg)
    }, 3000)
  }

  // 添加文字消息到列表
  private addTextMsg(msg: any) {
    this.msgList.push(msg)
  }
  // 添加语音消息到列表
  private addVoiceMsg(msg: any) {
    this.msgList.push(msg)
  }
  // 添加图片消息到列表
  private addImgMsg(msg: any) {
    msg.msg.content = this.setPicSize(msg.msg.content)
    this.msgImgList.push(msg.msg.content.url)
    this.msgList.push(msg)
  }
  private addRedEnvelopeMsg(msg: any) {
    this.msgList.push(msg)
  }
  // 添加系统文字消息到列表
  private addSystemTextMsg(msg: any) {
    this.msgList.push(msg)
  }
  // 添加系统红包消息到列表
  private addSystemRedEnvelopeMsg(msg: any) {
    this.msgList.push(msg)
  }
  private sendSystemMsg(content: any, type: any) {
    let lastid = this.msgList[this.msgList.length - 1].msg.id
    lastid++
    let row = {
      type: 'system',
      msg: { id: lastid, type: type, content: content },
    }
    this.screenMsg(row)
  }
  // 预览图片
  private showPic(msg: any) {
    uni.previewImage({
      indicator: 'none',
      current: msg.content.url,
      urls: this.msgImgList,
    })
  }
  // 播放语音
  private playVoice(msg: any) {
    this.playMsgid = msg.id
    this.AUDIO.src = msg.content.url
    this.$nextTick(function () {
      this.AUDIO.play()
    })
  }
  // 录音开始
  private voiceBegin(e: any) {
    if (e.touches.length > 1) {
      return
    }
    this.initPoint.Y = e.touches[0].clientY
    this.initPoint.identifier = e.touches[0].identifier
    this.RECORDER.start({ format: 'mp3' }) //录音开始,
  }
  //录音开始UI效果
  private recordBegin(e: any) {
    this.recording = true
    this.voiceTis = '松开 结束'
    this.recordLength = 0
    this.recordTimer = setInterval(() => {
      this.recordLength++
    }, 1000)
  }
  // 录音被打断
  private voiceCancel() {
    this.recording = false
    this.voiceTis = '按住 说话'
    this.recordTis = '手指上滑 取消发送'
    this.willStop = true //不发送录音
    this.RECORDER.stop() //录音结束
  }
  // 录音中(判断是否触发上滑取消发送)
  private voiceIng(e: any) {
    if (!this.recording) {
      return
    }
    let touche = e.touches[0]
    //上滑一个导航栏的高度触发上滑取消发送
    if (this.initPoint.Y - touche.clientY >= uni.upx2px(100)) {
      this.willStop = true
      this.recordTis = '松开手指 取消发送'
    } else {
      this.willStop = false
      this.recordTis = '手指上滑 取消发送'
    }
  }
  // 结束录音
  private voiceEnd(e: any) {
    if (!this.recording) {
      return
    }
    this.recording = false
    this.voiceTis = '按住 说话'
    this.recordTis = '手指上滑 取消发送'
    this.RECORDER.stop() //录音结束
  }
  //录音结束(回调文件)
  private recordEnd(e: any) {
    clearInterval(this.recordTimer)
    if (!this.willStop) {
      console.log('e: ' + JSON.stringify(e))
      let msg = {
        length: '',
        url: e.tempFilePath,
      }
      let min: any = parseInt(String(this.recordLength / 60))
      let sec: any = this.recordLength % 60
      min = min < 10 ? '0' + min : min
      sec = sec < 10 ? '0' + sec : sec
      msg.length = min + ':' + sec
      this.sendMsg(msg, 'voice')
    } else {
      console.log('取消发送录音')
    }
    this.willStop = false
  }
  // 切换语音/文字输入
  private switchVoice() {
    this.hideDrawer()
    this.isVoice = this.isVoice ? false : true
  }
  private discard() {
    return
  }
}
</script>

<style lang="scss" scoped>
page{
	background-color: #e5e5e5;
}
.hidden{
	display: none !important;
}
.popup-layer{
	&.showLayer{transform: translate3d(0,-42vw,0);}
	transition: all .15s linear;
	width: 750upx;
	height: 42vw;
	padding: 20upx 2%;
	background-color: #f3f3f3;
	border-top: solid 1upx #ddd;
	position: fixed;
	z-index: 20;
	top: 100%;
	.emoji-swiper{
		height: 40vw;
		swiper-item{
			display: flex;
			align-content: flex-start;
			flex-wrap: wrap;
			view{
				width: 12vw;
				height: 12vw;
				display: flex;
				justify-content: center;
				align-items: center;
				image{
					width: 8.4vw;
					height: 8.4vw;
				}
			}
		}
	}
	.more-layer{
		width: 100%;
		height: 42vw;
		.list{
			width: 100%;
			display: flex;
			flex-wrap: wrap;
			.box{
				width: 18vw;
				height: 18vw;
				border-radius: 20upx;
				background-color: #fff;
				display: flex;
				justify-content: center;
				align-items: center;
				margin: 0 2.8vw 2vw 2.8vw;
				.icon{
					font-size: 70upx;
				}
			}
		}
	}
}
.input-box{
	width: 750upx;
	min-height: 100upx;
	padding: 0 1%;
	background-color: #f2f2f2;
	display: flex;
	position: fixed;
	z-index: 20;
	bottom:-2upx;
	&.showLayer{transform: translate3d(0,-42vw,0);}
	transition: all .15s linear;
	border-bottom: solid 1upx #ddd;
	.voice,.more{
		flex-shrink: 0;
		width: 90upx;
		height: 100upx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	
	.send{
		//H5发送按钮左边距
		/* #ifdef H5 */
		margin-left: 20upx;
		/* #endif */
		flex-shrink: 0;
		width: 100upx;
		height: 100upx;
		display: flex;
		align-items: center;
		.btn{
			width: 90upx;
			height: 56upx;
			display: flex;
			justify-content: center;
			align-items: center;
			background:linear-gradient(to right,#4998ee,#087af0);
			color: #fff;
			border-radius: 6upx;
			font-size: 24upx;
		}
	}
	.textbox{
		width: 100%;
		min-height: 70upx;
		margin-top: 15upx;
		.voice-mode{
			width: calc(100% - 2upx);
			height: 68upx;
			border-radius: 70upx;
			border:solid 1upx #cdcdcd;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 28upx;
			background-color: #fff;
			color: #555;
			&.recording{
				background-color: #e5e5e5;
			}
		}
		.text-mode{
			width: 100%;
			min-height: 70upx;
			display: flex;
			background-color: #fff;
			border-radius: 40upx;
			.box{
				width: 100%;
				padding-left: 30upx;
				min-height: 70upx;
				display: flex;
				align-items: center;
				textarea{
					width: 100%;
				}
			}
			.em{
				flex-shrink: 0;
				width: 80upx;
				padding-left: 10upx;
				height: 70upx;
				display: flex;
				justify-content: center;
				align-items: center;
			}
		}
	}
}
.record{
	width: 40vw;
	height: 40vw;
	position: fixed;
	top: 55%;
	left: 30%;
	background-color: rgba(0,0,0,.6);
	border-radius: 20upx;
	.ing{
		width: 100%;
		height: 30vw;
		display: flex;
		justify-content: center;
		align-items: center;
		// 模拟录音音效动画
		@keyframes volatility {
			0% {background-position: 0% 130%;}
			20% {background-position: 0% 150%;}
			30% {background-position: 0% 155%;}
			40% {background-position: 0% 150%;}
			50% {background-position: 0% 145%;}
			70% {background-position: 0% 150%;}
			80% {background-position: 0% 155%;}
			90% {background-position: 0% 140%;}
			100% {background-position: 0% 135%;}
		}
		.icon{
			background-image:linear-gradient(to bottom,#087af0,#fff 50%); 
			background-size:100% 200%;
			animation: volatility 1.5s ease-in-out -1.5s infinite alternate;
			-webkit-background-clip:text; 
			-webkit-text-fill-color:transparent; 
			font-size: 150upx;
			color: #087af0;
		}
	}
	.cancel{
		width: 100%;
		height: 30vw;
		display: flex;
		justify-content: center;
		align-items: center;
		.icon{
			color: #fff;
			font-size: 150upx;
		}
	}
	.tis{
		width: 100%;
		height: 10vw;
		display: flex;
		justify-content: center;
		font-size: 28upx;
		color: #fff;
		&.change{
			color: #087af0;
		}
	}
}
.content{
	width: 100%;
	.msg-list{
		width: 96%;
		padding: 0 2%;
		position: absolute;
		top: 0;
		bottom: 100upx;
		.loading{
			//loading动画
			display: flex;
			justify-content: center;
			@keyframes stretchdelay {
				0%, 40%, 100% {
					transform: scaleY(0.6);
				}
				20% {
					transform: scaleY(1.0);
				}
			}
			.spinner {
				margin: 20upx 0;
				width: 60upx;
				height: 100upx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				view {
					background-color: #087af0;
					height: 50upx;
					width: 6upx;
					border-radius: 6upx;
					animation: stretchdelay 1.2s infinite ease-in-out;
				}
				.rect2 {
				  animation-delay: -1.1s;
				}
				.rect3 {
				  animation-delay: -1.0s;
				}
				.rect4 {
				  animation-delay: -0.9s;
				}
				.rect5 {
				  animation-delay: -0.8s;
				}
			}
		}
		.row{
			.system{
				display: flex;
				justify-content: center;
				view{
					padding: 0 30upx;
					height: 50upx;
					display: flex;
					justify-content: center;
					align-items: center;
					background-color: #c9c9c9;
					color: #fff;
					font-size: 24upx;
					border-radius: 40upx;
				}
				.red-envelope{
					image{
						margin-right: 5upx;
						width: 30upx;
						height: 30upx;
					}
				}
			}
			&:first-child{
				margin-top: 20upx;
			}
			padding: 20upx 0;
			.my .left,.other .right{
				width: 100%;
				display: flex;
				.bubble{
					max-width: 70%;
					min-height: 50upx;
					border-radius: 10upx;
					padding: 15upx 20upx;
					display: flex;
					align-items: center;
					font-size: 32upx;
					word-break: break-word;
					&.img{
						background-color: transparent;
						padding:0;
						overflow: hidden;
						image{
							max-width: 350upx;
							max-height: 350upx;
						}
					}
					&.red-envelope{
						background-color: transparent;
						padding:0;
						overflow: hidden;
						position: relative;
						justify-content: center;
						align-items: flex-start;
						image{
							width: 250upx;
							height: 313upx;
						}
						.tis{
							position: absolute;
							top: 6%;
							font-size: 26upx;
							color: #9c1712;
						}
						.blessing{
							position: absolute;
							bottom: 14%;
							color: #e9b874;
							width: 80%;
							text-align: center;
							overflow: hidden;
							// 最多两行
							display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 2;
						}
					}
					&.voice{
						.icon{
							font-size: 40upx;
							display: flex;
							align-items: center;
						}
						.icon:after
						{
							content:" ";
							width: 53upx;
							height: 53upx;
							border-radius: 100%;
							position: absolute;
							box-sizing: border-box;
						}
						.length{
							font-size: 28upx;
						}
					}
				}
			}
			.my .right,.other .left{
				flex-shrink: 0;
				width: 80upx;
				height: 80upx;
				image{
					width: 80upx;
					height: 80upx;
					border-radius: 10upx;
				}
			}
			.my{
				width: 100%;
				display: flex;
				justify-content: flex-end;
				.left{
					min-height: 80upx;
					
					align-items: center;
					justify-content: flex-end;
					.bubble{
						background-color: #087af0;
						color: #fff;
						
						&.voice{
							.icon{
								color: #fff;
							}
							.length{
								margin-right: 20upx;
							}
						}
						&.play{
							@keyframes my-play {
								0% {
									transform: translateX(80%);
								}
								100% {
									transform: translateX(0%);
								}
							}
							.icon:after
							{
								border-left: solid 10upx #087af0;
								animation: my-play 1s linear infinite;
							}
						}
					}
				}
				.right{
					margin-left: 15upx;
				}
			}
			.other{
				width: 100%;
				display: flex;
				.left{
					margin-right: 15upx;
				}
				.right{
					flex-wrap: wrap;
					.username{
						width: 100%;
						height: 45upx;
						font-size: 24upx;
						color: #999;
						display: flex;
						.name{
							margin-right: 50upx;
						}
					}
					.bubble{
						background-color: #fff;
						color: #333;
						&.voice{
							.icon{
								color: #333;
								
							}
							.length{
								margin-left: 20upx;
							}
						}
						&.play{
							@keyframes other-play {
								0% {
									transform: translateX(-80%);
								}
								100% {
									transform: translateX(0%);
								}
							}
							.icon:after
							{
								border-right: solid 10upx rgba(255,255,255,.8);
								
								animation: other-play 1s linear infinite;
							}
						}
					}
				}
			}
		}
	}
}
.windows{

	.mask{
		position: fixed;
		top: 100%;
		width: 100%;
		height: 100%;
		z-index: 1000;
		background-color: rgba(0,0,0,.6);
		opacity: 0;
		transition: opacity .2s ease-out;
	}
	.layer{
		position: fixed;
		width: 80%;
		height: 70%;
		left: 10%;
		z-index: 1001;
		border-radius: 20upx;
		overflow: hidden;
		top:100%;
		transform: scale3d(.5,.5,1);
		transition: all .2s ease-out;
	}
	&.show{
		display: block;
		.mask{
			top: 0;
			opacity: 1;
		}
		.layer{
			transform: translate3d(0,-85vh,0) scale3d(1,1,1);
		}
	}
	&.hide{
		display: block;
		.mask{
			top: 0;
			opacity: 0;
		}
		.layer{
			//transform: translate3d(0,-85vh,0) scale3d(.5,.5,1);
		}
	}
}
.open-redenvelope{
	width: 100%;
	height: 70vh;
	background-color: #cf3c35; 
	position: relative;
	.top{
		width: 100%;
		background-color: #fe5454;
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
		border-radius: 0 0 100% 100%;
		box-shadow: inset 0 -20upx 0 #9c1712;
		.close-btn{
			width: 100%;
			height: 80upx;
			display: flex;
			justify-content: flex-end;
			margin-bottom: 30upx;
			.icon{
				color: #9c1712;
				margin-top: 10upx;
				margin-right: 10upx;
			}
		}
		image{
			width: 130upx;
			height: 130upx;
			border: solid 12upx #cf3c35;
			border-radius: 100%;
			
			margin-bottom: -65upx;
		}
		margin-bottom: 65upx;
	}
	.from,.blessing,.money,.showDetails{
		width: 90%;
		padding: 5upx 5%;
		display: flex;
		justify-content: center;
		font-size: 32upx;
		color: #fff;
	}
	.money{
		font-size: 100upx;
		color: #f8d757;
		display: flex;
		padding-top: 20upx;
	}
	.showDetails{
		position: absolute;
		bottom: 20upx;
		align-items: center;
		font-size: 28upx;
		color: #f8d757;
		.icon{
			font-size: 26upx;
			color: #f8d757;
		}
	}
}
</style>