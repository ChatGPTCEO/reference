<script setup lang="ts">
import {onLaunch, onShow, onHide} from "@dcloudio/uni-app";
import {getToken} from "./common/request";
import {start, stop} from "./store/chat/utils";
import {onMounted} from "vue";
import {store} from "./store";
import {getConfig} from "./api/common";


onLaunch(async() => {
  console.log("App Launch");

  //检查是否登录
  await getToken()

  //获取当前网络状态
  uni.getNetworkType({
    success: function (res) {
      start();
    }
  });

  //监听网络变化
  uni.onNetworkStatusChange(function (res) {
    console.log('网络类型:' + res.networkType + ',网络连接:' + res.isConnected);
    if (!res.isConnected) {
      uni.showToast({
        title: '您的网络已断开连接！',
        icon: 'none'
      });
      stop();
      return;
    } else {
      start();
    }
  });

  uni.onSocketOpen((res) => {
    console.log('WebSocket连接已打开！');
  });

  uni.onSocketError((res) => {
    console.log('WebSocket连接打开失败，请检查！');
  });

  uni.onSocketClose((res) => {
    console.log('WebSocket 已关闭！');
  });

  uni.onSocketMessage((res) => {
    console.log('收到服务器内容：' + res.data);
    store.commit('chat/receiveMsg', JSON.parse(res.data as string))
  });

});
onShow(() => {
  console.log("App Show");
});
onHide(() => {
  console.log("App Hide");
});

</script>
<style lang="scss">
@import "uni.scss";
@import "src/common/common.scss";
</style>
