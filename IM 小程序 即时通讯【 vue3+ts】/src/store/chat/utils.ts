import {getToken, WsPATH} from "../../common/request";
import {store} from "../index";
import {IChatMessage} from "../../api/types/chat";

let beatInterval: number

//启动
export function start() {
  setTimeout(() => {
    heartbeat()
  }, 200)
  if (beatInterval) {
    stop()
  }
  beatInterval = setInterval(heartbeat, 10000);
}

//停止
export function stop() {
  clearInterval(beatInterval);
}

//心跳
export function heartbeat() {
  uni.sendSocketMessage({
    data: '',
    /*success() {
      console.log('----心跳成功----');
    },*/
    fail() {
      console.log('心跳错误');
      // 重试登录
      getToken().then(token => {
        uni.connectSocket({
          url: WsPATH + token,
          method: 'GET'
        });
      })
    }
  });
}

//发送消息
export const sendChatMessage = (msg: IChatMessage, call?: Function) => {
  if (!msg.to) {
    //接收者
    msg.to = store.state.chat.activeName
  }
  msg.from = store.state.user.info?.username
  if (!msg.type) {
    msg.type = 0
  }
  // console.log(msg)
  uni.sendSocketMessage({
    data: JSON.stringify(msg),
    success() {
      // console.log('消息发成功', msg)
      call && call()
    }, fail() {
      // 重试登录
      getToken().then(token => {
        uni.connectSocket({
          url: WsPATH + token,
          method: 'GET'
        });
      })
      uni.showToast({
        title: '消息发生失败，请稍后再试！',
        icon: 'error',
        duration: 1000
      });
    }
  });
}

const innerAudioContext = uni.createInnerAudioContext();
innerAudioContext.autoplay = false;
innerAudioContext.startTime = 0.8;
uni.downloadFile({
  url: 'https://im.idb.com.cn/fs/static/msgTip.mp3',
  success: (res) => {
    if (res.tempFilePath) {
      innerAudioContext.src = res.tempFilePath;
    }
  },
  fail: (err) => {
    console.log("err", err);
  },
});
innerAudioContext.onPlay(() => {
  // console.log('开始播放');
  uni.vibrateLong({})
});

export const msgTip = () => {
  innerAudioContext.play();
}