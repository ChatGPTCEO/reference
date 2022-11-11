<template>
  <view class="content">
    <view class="content-title">
      <view :style="{'width':menuWidth +'px;height:'+menuHeight+'px;margin-top:'+menuTop+'px;'}">
        <uni-icons style="width: 60rpx;margin: 10rpx" :type="backType" size="28" @click="back"></uni-icons>
        <view>
          <text :style="{'width': textWidth +'px'}">{{ titleName }}</text>
          <text style="width: 110rpx" v-if="groupUserSize>0">({{ groupUserSize }})</text>
        </view>
        <uni-icons @click="toChatInfo" style="width: 80rpx;" type="gear" size="28"></uni-icons>
      </view>
    </view>
    <view class="content-body">
      <view class="message" :style="'height: '+chatViewHeight+'px;'">
        <chatList ref="chatf" :username="username"></chatList>
      </view>
      <view class="sender-content">
        <view class="sender">
          <!--切换按钮-->
          <view>
            <image v-if="chatType === 'voice'" class="icon_img" src="@/pagesChat/static/voice.png"
                   @click="switchChatType('keyboard')"></image>
            <image v-if="chatType === 'keyboard'" class="icon_img" src="@/pagesChat/static/keyboard.png"
                   @click="switchChatType('voice')"></image>
          </view>
          <!--文本框-->
          <view>
            <view class="textArea-box" v-if="chatType === 'voice'">
              <scroll-view scroll-y="true" class="inputScroll">
							<textarea placeholder-style="color:#DDDDDD;"
                        ref="textRef"
                        :auto-height="true"
                        :auto-focus="false"
                        :cursor-spacing="10"
                        @linechange="updateHeight"
                        :show-confirm-bar="false"
                        confirm-type="next"
                        :auto-blur="true"
                        :confirm-hold="true" v-model="sendStr"
                        :maxlength="1000"/>
              </scroll-view>
            </view>
            <view class="voice_title" v-if="chatType === 'keyboard'">
              <voice-btn></voice-btn>
            </view>
          </view>
          <!--功能区-->
          <view>
            <image src="@/pagesChat/static/emoji.png" @click="changeEmojiBox"></image>
            <image src="@/pagesChat/static/add.png" :class="(chatType === 'keyboard'||sendStr.length===0)?'':'hidden'"
                   @click="changeFun"></image>
            <view class="send" :class="(chatType === 'voice'&&sendStr.length>0)?'':'hidden'">
              <button type="primary" size="mini" @click="sendText">
                <text>发送</text>
              </button>
            </view>
          </view>
        </view>
        <!--表情-->
        <view class="fun-box" :class="{'show-fun-box':showEmojiBox}">
          <emoji v-show="showEmojiBox" @addEmoji="addEmoji"></emoji>
        </view>
        <!--功能-->
        <view class="fun-box" :class="{'show-fun-box':showFunBtn}">
          <fun-btn v-show="showFunBtn"></fun-btn>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import {onLoad, onShow} from "@dcloudio/uni-app";
import {onMounted, ref} from "vue";
import emoji from './components/emoji.vue'
import funBtn from './components/funbtn.vue'
import voiceBtn from './components/voiceBtn.vue'
import chatList from './chatList.vue'
import {store} from "../../store";
import {sendChatMessage} from "../../store/chat/utils";
import {groupCount, queryUser} from "../../api/chat";


const username = ref('')
const chatViewHeight = ref(900)
const sendStr = ref('')
const chatType = ref('voice')
const showFunBtn = ref(false)
const showEmojiBox = ref(false)
const titleName = ref('')
const groupUserSize = ref(0)
const menuWidth = ref(400)
const menuHeight = ref(30)
const menuTop = ref(30)

const textWidth = ref(200)
const backType = ref('back')
onLoad(async (option) => {
  if (option.scene) {
    //扫码进来的
    const scene = decodeURIComponent(option.scene);
    const user = await queryUser(scene)
    if (store.state.user.info?.id === parseInt(scene)) {
      uni.showToast({
        title: '不能与自己聊天！',
        icon: 'error',
        duration: 2000
      });
      uni.switchTab({
        url: '/pages/friendList/friendList'
      });
      return
    }
    username.value = user!.username
    titleName.value = `${user!.nickName}`
  } else {
    username.value = option.username!;
    titleName.value = `${option!.nickName}`
  }
  updateHeight()

  //1.计算标题长度
  const menu = uni.getMenuButtonBoundingClientRect()
  menuTop.value=menu.top
  menuHeight.value=menu.height+uni.upx2px(10); // 高度偏高一点
  menuWidth.value = menu.left - uni.upx2px(10);
  textWidth.value = menuWidth.value - uni.upx2px(130)
  if (username.value.startsWith('group_')) {
    textWidth.value -= uni.upx2px(110)
  }
  //2.计算页面返回
  if(getCurrentPages().length===1){
    backType.value='home'
  }

})

onShow(async () => {
  if (username.value.startsWith('group_')) {
    const size = await groupCount(username.value)
    groupUserSize.value = size!
  }
})

const back = () => {
  const pages = getCurrentPages()
  if (pages.length === 1) {
    uni.switchTab({
      url: '/pages/friendList/friendList'
    });
  } else {
    uni.navigateBack({
      delta: 1
    });
  }
}
const toChatInfo = () => {
  uni.navigateTo({
    url: `/pagesChat/chatView/chatInfo?username=${username.value}`
  });
}

const addEmoji = (em: any) => {
  sendStr.value += em.alt;
}

//发送消息
const sendText = () => {
  sendChatMessage({
    to: username.value,
    message: sendStr.value,
  }, () => {
    sendStr.value = ''
  })
}

//切换功能性按钮
const changeFun = () => {
  showEmojiBox.value = false;
  showFunBtn.value = !showFunBtn.value;
  uni.hideKeyboard();
  updateHeight()
}
//表情弹窗
const changeEmojiBox = () => {
  showFunBtn.value = false;
  showEmojiBox.value = !showEmojiBox.value;
  uni.hideKeyboard();
  if (showEmojiBox.value) {
    chatType.value = "voice";
  }
  console.log(showEmojiBox.value)
  updateHeight()
}

//切换语音或者键盘方式
const switchChatType = (type: string) => {
  chatType.value = type;
  //底部菜单隐藏
  showFunBtn.value = false;
  //底部菜单隐藏
  showFunBtn.value = false;
  //表情弹窗
  if (showEmojiBox.value == true) {
    showEmojiBox.value = false;
    updateHeight()
  }
  updateHeight()
}

const updateHeight = (flag?: boolean) => {
  const titleHeight = menuTop.value+menuHeight.value; // 导航栏高度
  const windowHeight = uni.getSystemInfoSync().windowHeight - titleHeight;
  // 自动设置高度
  if (chatType.value === 'keyboard' && !showFunBtn.value) {
    chatViewHeight.value = windowHeight - uni.upx2px(121);
  } else {
    uni.createSelectorQuery().select(".sender").boundingClientRect((header) => {
      let height = header.height!
      /*if(height>=uni.upx2px(121)&&sendStr.value.length<=30){
        height=uni.upx2px(121)
      }*/
      if (showEmojiBox.value || showFunBtn.value) {
        height += uni.upx2px(320)
      }
      chatViewHeight.value = windowHeight - height;
      if (!flag) {
        setTimeout(() => {
          updateHeight(true)
        }, 50)
      }
    }).exec();
  }

}

</script>

<style lang="scss" scoped>
@import './components/chatview.scss';

fun-btn {
  width: 100vw;
}
</style>
