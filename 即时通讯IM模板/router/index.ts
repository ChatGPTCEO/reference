import Vue from 'vue';
import Router from 'uni-simple-router';
import routes from './routes';
import store from '../store';

declare let uni: any;

Vue.use(Router);

//初始化
const router = new Router({
  encodeURI: false,
  routes: [...routes],
});

//全局路由前置守卫
router.beforeEach(async (to: any, from: any, next: any) => {
  if (!to.auth) {
    return next();
  }
  const { user_info } = store.state.user;
  if (user_info && user_info.id) {
    // 已登录则跳转
    return next();
  } else {
    // 未登录则尝试自动登录
    const token = uni.getStorageSync('token');
    if (!token) {
      return next({ name: 'userSignIn', NAVTYPE: 'push' });
    }
    const res = await store.dispatch('user/autoLogin');
    if (res && res.data && res.data.id) {
      // 自动登录后，正常跳转
      return next();
    } else {
      return next({ name: 'userSignIn', NAVTYPE: 'push' });
    }
  }
});

// 全局路由后置守卫
// router.afterEach((to, from) => {
// });

export default router;
