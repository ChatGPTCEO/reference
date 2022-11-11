<template>
  <view class="background-wrapper">
    <view class="login-wrapper">
      <view class="login-title">
        <image src="/static/images/logo.png"></image>
      </view>
      <form @submit="doLogin">
        <view class="login-item">
          <text class="login-item-text">账号</text>
          <input v-model="account" class="login-item-input" placeholder="请输入" type="text" confirm-type="next">
        </view>
        <view class="login-item">
          <text class="login-item-text">密码</text>
          <input v-model="password" type="password" class="login-item-input" placeholder="请输入" confirm-type="done">
        </view>
        <button form-type="submit" :loading="isLogin" :disabled="!account || !password" class="login-submit-btn">登录</button>
      </form>
    </view>
  </view>
</template>

<script>
import IMController from '../../../libs/imController.js'
export default {
  data() {
    return {
      isLogin: '',
      account: '',
      password: ''
    }
  },
  components: {},
  props: {},
  methods: {
    doLogin() {
      new IMController({
        token: this.password,
        account: this.account
      })
    }
  }
}
</script>
<style>
.login-wrapper {
  width: 100%;
  position: absolute;
  /* top: 50%; */
  /* margin-top: -400rpx; */
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #000;
}
.login-wrapper form {
  width: 100%;
}
.login-title {
  display: block;
  padding: 152rpx 0 116rpx;
  text-align: center;
}
.login-title image {
  width: 142rpx;
  height: 148rpx;
}
.login-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0 auto;
  width: 90%;
  height: 88rpx;
  border-bottom: 1px solid #c6cbd4;
}
.login-item + .login-item {
  margin-top: 16rpx;
  margin-bottom: 60rpx;
}
.login-item-text {
  align-self: center;
  margin-right: 20rpx;
  font-size: 32rpx;
  color: #020202;
}
.login-item-input {
  border: none;
  display: inline-block;
  box-sizing: border-box;
  width: 80%;
  font-size: 32rpx;
  padding-left: 10rpx;
}

.login-submit-btn {
  width: 90%;
  vertical-align: middle;
  background-color: #3387ff;
  color: #fff;
}

.to-register {
  margin-top: 30rpx;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 28rpx;
}
.login-to-unregister {
  color: #555555;
}
.login-to-register {
  color: #4f8dff;
  text-decoration: underline;
}

/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIiUzQ2lucHV0JTIwY3NzJTIwV0xoQXNlJTNFIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsV0FBVztFQUNYLGtCQUFrQjtFQUNsQixjQUFjO0VBQ2QseUJBQXlCO0VBQ3pCLGFBQWE7RUFDYixzQkFBc0I7RUFDdEIsbUJBQW1CO0VBQ25CLFdBQVc7QUFDYjtBQUNBO0VBQ0UsV0FBVztBQUNiO0FBQ0E7RUFDRSxjQUFjO0VBQ2Qsd0JBQXdCO0VBQ3hCLGtCQUFrQjtBQUNwQjtBQUNBO0VBQ0UsYUFBYTtFQUNiLGNBQWM7QUFDaEI7QUFDQTtFQUNFLGFBQWE7RUFDYixtQkFBbUI7RUFDbkIsbUJBQW1CO0VBQ25CLGNBQWM7RUFDZCxVQUFVO0VBQ1YsYUFBYTtFQUNiLGdDQUFnQztBQUNsQztBQUNBO0VBQ0UsaUJBQWlCO0VBQ2pCLG9CQUFvQjtBQUN0QjtBQUNBO0VBQ0Usa0JBQWtCO0VBQ2xCLG1CQUFtQjtFQUNuQixnQkFBZ0I7RUFDaEIsY0FBYztBQUNoQjtBQUNBO0VBQ0UsWUFBWTtFQUNaLHFCQUFxQjtFQUNyQixzQkFBc0I7RUFDdEIsVUFBVTtFQUNWLGdCQUFnQjtFQUNoQixtQkFBbUI7QUFDckI7O0FBRUE7RUFDRSxVQUFVO0VBQ1Ysc0JBQXNCO0VBQ3RCLHlCQUF5QjtFQUN6QixXQUFXO0FBQ2I7O0FBRUE7RUFDRSxpQkFBaUI7RUFDakIsYUFBYTtFQUNiLG1CQUFtQjtFQUNuQix1QkFBdUI7RUFDdkIsbUJBQW1CO0VBQ25CLGdCQUFnQjtBQUNsQjtBQUNBO0VBQ0UsY0FBYztBQUNoQjtBQUNBO0VBQ0UsY0FBYztFQUNkLDBCQUEwQjtBQUM1QiIsImZpbGUiOiJ0by5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIubG9naW4td3JhcHBlciB7XHJcbiAgd2lkdGg6IDEwMCU7XHJcbiAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gIC8qIHRvcDogNTAlOyAqL1xyXG4gIC8qIG1hcmdpbi10b3A6IC00MDBycHg7ICovXHJcbiAgZGlzcGxheTogZmxleDtcclxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgY29sb3I6ICMwMDA7XHJcbn1cclxuLmxvZ2luLXdyYXBwZXIgZm9ybSB7XHJcbiAgd2lkdGg6IDEwMCU7XHJcbn1cclxuLmxvZ2luLXRpdGxlIHtcclxuICBkaXNwbGF5OiBibG9jaztcclxuICBwYWRkaW5nOiAxNTJycHggMCAxMTZycHg7XHJcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG59XHJcbi5sb2dpbi10aXRsZSBpbWFnZSB7XHJcbiAgd2lkdGg6IDE0MnJweDtcclxuICBoZWlnaHQ6IDE0OHJweDtcclxufVxyXG4ubG9naW4taXRlbSB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBmbGV4LWRpcmVjdGlvbjogcm93O1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgbWFyZ2luOiAwIGF1dG87XHJcbiAgd2lkdGg6IDkwJTtcclxuICBoZWlnaHQ6IDg4cnB4O1xyXG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjQzZDQkQ0O1xyXG59XHJcbi5sb2dpbi1pdGVtICsgLmxvZ2luLWl0ZW0ge1xyXG4gIG1hcmdpbi10b3A6IDE2cnB4O1xyXG4gIG1hcmdpbi1ib3R0b206IDYwcnB4O1xyXG59XHJcbi5sb2dpbi1pdGVtLXRleHQge1xyXG4gIGFsaWduLXNlbGY6IGNlbnRlcjtcclxuICBtYXJnaW4tcmlnaHQ6IDIwcnB4O1xyXG4gIGZvbnQtc2l6ZTogMzJycHg7XHJcbiAgY29sb3I6ICMwMjAyMDI7XHJcbn1cclxuLmxvZ2luLWl0ZW0taW5wdXQge1xyXG4gIGJvcmRlcjogbm9uZTtcclxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XHJcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcclxuICB3aWR0aDogODAlO1xyXG4gIGZvbnQtc2l6ZTogMzJycHg7XHJcbiAgcGFkZGluZy1sZWZ0OiAxMHJweDtcclxufVxyXG5cclxuLmxvZ2luLXN1Ym1pdC1idG4ge1xyXG4gIHdpZHRoOiA5MCU7XHJcbiAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMzM4N0ZGO1xyXG4gIGNvbG9yOiAjZmZmO1xyXG59XHJcblxyXG4udG8tcmVnaXN0ZXIge1xyXG4gIG1hcmdpbi10b3A6IDMwcnB4O1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgZmxleC1kaXJlY3Rpb246IHJvdztcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIGZvbnQtc2l6ZTogMjhycHg7XHJcbn1cclxuLmxvZ2luLXRvLXVucmVnaXN0ZXIge1xyXG4gIGNvbG9yOiAjNTU1NTU1O1xyXG59XHJcbi5sb2dpbi10by1yZWdpc3RlciB7XHJcbiAgY29sb3I6ICM0RjhERkY7XHJcbiAgdGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmU7XHJcbn1cclxuIl19 */
</style>