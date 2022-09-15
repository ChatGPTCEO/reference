/**
 * 针对给出的请求实例进行本地化配置
 */
// #ifdef MP-WEIXIN
import Vue from 'vue';
// #endif
import { DISCUZ_REQUEST_HOST } from '@/common/const';
import { apiIns, RESPONSE_CODE } from '../library/discuz-sdk/lib/api';

const baseURL = DISCUZ_REQUEST_HOST.replace(/\/$/, '');

const api = apiIns({
  baseURL,
});

const { http } = api;

// 搬运一下老逻辑
let app;

// 响应结果进行设置
http.interceptors.response.use(res => {
  const { data } = res;
  const { Code, Message } = data || {};
  // 接下来搬运一下老逻辑
  // #ifdef MP-WEIXIN
  app = Vue.prototype;
  // #endif

  // #ifdef H5
  app = getApp();
  // #endif

  switch (Number(Code)) {
    case RESPONSE_CODE.UNAUTHORIZED:
      app.$store.dispatch('forum/setError', {
        code: 'type_401',
        status: 500,
      });
      break;
    case RESPONSE_CODE.SUCCESS:
      break;
    default:
      uni.showToast({
        icon: 'none',
        title: Message,
      });
  }

  return data;
});

/**
 * 2021-03-09：目前有 5 个新的接口需要改造更换。请看 src/library/discuz-sdk/lib/api/content 下面对应的文件，里面有具体的入参说明
 * 1. 获取板块分类: api.readCategories
 * 2. 获取文章列表: api.readThreadList
 * 3. 获取置顶列表：api.readStickList
 * 4. 获取文章详情：api.readThreadDetail
 * 5. 获取评论列表：api.readCommentList
 */
export default api;
