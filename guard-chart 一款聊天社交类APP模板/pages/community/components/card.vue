<template>
  <view class="card-content">
    <view class="card-header">
      <!-- 头像 -->
      <u-avatar
        src="https://sf6-cdn-tos.toutiaostatic.com/img/mosaic-legacy/2e0e20003729191fac9e8~c5_300x300.image"
        show-sex
        sex-icon="woman"
        show-level
        >
      </u-avatar>
      <!-- 昵称和时间 -->
      <view class="card-right">
        <view class="right-top-name">西瓜妹严尚嘉</view>
        <view class="header-right-bottom">
          两小时前
          <text class="header-right-info">
            <text class="header-right-point">·</text>
            泰洋川禾签约演员 头号英雄主持人
          </text>
        </view>
      </view>
    </view>
    <!-- 内容 -->
    <view class="card-body">
      <view class="card-body-text">
        东棉花胡同39号
      </view>
      <!-- 图片 -->
      <view class="card-body-img-col3" v-if="imgList.length > 1">
        <view class="card-body-img-col3-item" v-for="item in splitImgArr(imgList)" :key="item">
          <view v-for="item2 in item" :key="item2">
            <u-image @click="showPic(item2)" width="100%" height="250upx" :src="item2"></u-image>
          </view>
        </view>
      </view>
      <view class="card-body-img-col1" v-else>
        <u-image @click="showPic(imgList[0])" width="100%" height="750upx" :src="imgList[0]"></u-image>
      </view>
    </view>
    <!-- address -->
    <view class="address">
      <u-icon name="map-fill" class="map-icon" color="#2979ff"></u-icon>
      <u-link color="#2979ff">{{address}}</u-link>
    </view>
    <!-- 点赞 评论 转发 -->
    <view class="card-foot">
      <view class="card-foot-item">
        <u-image :src="zhuanfa" width="60upx" height="60upx"/>
        <text class="card-foot-item-text">转发</text>
      </view>
      <view class="card-foot-item" @tap="showDetail">
        <u-image :src="pinglun" width="60upx" height="60upx"/>
        <text class="card-foot-item-text">6</text>
      </view>
      <view class="card-foot-item">
        <u-image :src="dianzan" width="60upx" height="60upx"/>
        <text class="card-foot-item-text">13</text>
      </view>
    </view>
  </view>
</template>

<script lang="ts" scoped>
import { Component, Vue, Watch} from 'vue-property-decorator'
@Component({
  name: 'ListCard'
}) // 装饰器
export default class ListCard extends Vue {
  private imgList: Array<string> = [
    'http://p26.toutiaoimg.com/img/tos-cn-i-0022/9b823768adde469996b6efad367b9394~tplv-tt-post:342:224.jpeg?from=post',
    'http://p26.toutiaoimg.com/img/tos-cn-i-0022/030af1dda4404e96889bf2bd7ee44cb0~tplv-tt-post:342:224.jpeg?from=post',
    'http://p26.toutiaoimg.com/img/tos-cn-i-0022/ee96e46ab1c44ed0a7e0f51430b3dca3~tplv-tt-post:342:224.jpeg?from=post',
    'http://p26.toutiaoimg.com/img/tos-cn-i-0022/ee96e46ab1c44ed0a7e0f51430b3dca3~tplv-tt-post:342:224.jpeg?from=post',
    'http://p26.toutiaoimg.com/img/tos-cn-i-0022/23977c52f89742a69636fae4ff64f338~tplv-tt-post:342:224.jpeg?from=post',
    'http://p26.toutiaoimg.com/img/tos-cn-i-0022/04085075c1f64f119f7a036716f413e6~tplv-tt-post:342:224.jpeg?from=post',
    'http://p26.toutiaoimg.com/img/tos-cn-i-0022/5f27fd0e6bcf479aa3a4ef8e819817fb~tplv-tt-post:342:224.jpeg?from=post',
    'http://p26.toutiaoimg.com/img/tos-cn-i-0022/148144db611e44a2ba533a95a6001c54~tplv-tt-post:342:224.jpeg?from=post',
    'http://p26.toutiaoimg.com/img/tos-cn-i-0022/8490dec2d2ff4554a112934de2567f0f~tplv-tt-post:342:224.jpeg?from=post'
  ]

  /* 地址 */
  private address: string = '北京市·西小口·东升科技园'

  /* 切割图片数组 */
  private splitImgArr (data: Array<string>) {
    let result = []
    for(let i = 0; i < data.length; i += 3){
      result.push(data.slice(i, i + 3))
    }
    return result
  }
  /* 查看评论 */
  private showDetail () {
    uni.navigateTo({
      url: '/pages/community/components/cardDetail'
    })
  }
  // 预览图片
  private showPic(imgSrc: string) {
    uni.previewImage({
      indicator: 'none',
      current: imgSrc,
      urls: this.imgList,
    })
  }
  /* base64 */
  private zhuanfa: string = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMjRweCIgaGVpZ2h0PSIyNHB4IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDQ4LjIgKDQ3MzI3KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5mb3J3YXJkPC90aXRsZT4KICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPgogICAgPGRlZnM+PC9kZWZzPgogICAgPGcgaWQ9IlN5bWJvbHMiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSJmb3J3YXJkIiBmaWxsPSIjMjIyMjIyIiBmaWxsLXJ1bGU9Im5vbnplcm8iPgogICAgICAgICAgICA8cGF0aCBkPSJNOC40Mjg5MzIxOSwxNi41IEwxNy41MDM5MTA0LDE2LjUgQzE4LjA1MjkxLDE2LjUgMTguNSwxNi4wNTA2MzA5IDE4LjUsMTUuNDk1Njk1NyBMMTguNSwxMCBDMTguNSw5LjcyMzg1NzYzIDE4LjcyMzg1NzYsOS41IDE5LDkuNSBDMTkuMjc2MTQyNCw5LjUgMTkuNSw5LjcyMzg1NzYzIDE5LjUsMTAgTDE5LjUsMTUuNDk1Njk1NyBDMTkuNSwxNi42MDE3ODA3IDE4LjYwNjMzNjEsMTcuNSAxNy41MDM5MTA0LDE3LjUgTDguMDg1Nzg2NDQsMTcuNSBMOS41MzE4NTg5NywxOC45NDYwNzI1IEM5LjcyMzQwMjc1LDE5LjEzNzYxNjMgOS43MTQ2Nzc4NCwxOS40NTY4OTUgOS41MjUxMjYyNywxOS42NDY0NDY2IEM5LjMyOTg2NDEyLDE5Ljg0MTcwODggOS4wMTk1MDQzNSwxOS44NDc5MzE1IDguODI0NzUyMTksMTkuNjUzMTc5MyBMNi42ODk5NjY0MywxNy41MTgzOTM2IEM2LjUwMDY5Mzc2LDE3LjMyOTEyMDkgNi41MDY5Njg4MiwxNy4wMTUxMjQ0IDYuNjkwMDMyOTksMTYuODI0ODE2MiBMOC44MjQ3NTIxOSwxNC42ODk5NjY0IEM5LjAxNjI5NTk3LDE0LjQ5ODQyMjcgOS4zMzU1NzQ2OSwxNC41MDcxNDc2IDkuNTI1MTI2MjcsMTQuNjk2Njk5MSBDOS43MjAzODg0MSwxNC44OTE5NjEzIDkuNzI2NjExMTMsMTUuMjAyMzIxMSA5LjUzMTg1ODk3LDE1LjM5NzA3MzIgTDguNDI4OTMyMTksMTYuNSBaIE0xNi41NzEwNjc4LDcuNSBMNy40OTYwODk1OCw3LjUgQzYuOTQ3MDkwMDIsNy41IDYuNSw3Ljk0OTM2OTA1IDYuNSw4LjUwNDMwNDI5IEw2LjUsMTQgQzYuNSwxNC4yNzYxNDI0IDYuMjc2MTQyMzcsMTQuNSA2LDE0LjUgQzUuNzIzODU3NjMsMTQuNSA1LjUsMTQuMjc2MTQyNCA1LjUsMTQgTDUuNSw4LjUwNDMwNDI5IEM1LjUsNy4zOTgyMTkzMSA2LjM5MzY2Mzg3LDYuNSA3LjQ5NjA4OTU4LDYuNSBMMTYuOTE0MjEzNiw2LjUgTDE1LjQ2ODE0MSw1LjA1MzkyNzQ3IEMxNS4yNzY1OTczLDQuODYyMzgzNjkgMTUuMjg1MzIyMiw0LjU0MzEwNDk2IDE1LjQ3NDg3MzcsNC4zNTM1NTMzOSBDMTUuNjcwMTM1OSw0LjE1ODI5MTI0IDE1Ljk4MDQ5NTcsNC4xNTIwNjg1MyAxNi4xNzUyNDc4LDQuMzQ2ODIwNjggTDE4LjMxMDAzMzYsNi40ODE2MDY0NCBDMTguNDA0NjY5OSw2LjU3NjI0Mjc4IDE4LjQ1MDQxOTMsNi43MDIwNjAwNyAxOC40NDk2MjY2LDYuODI4MDA2ODEgQzE4LjQ1MzQ0OTcsNi45NTQ0OTg2MSAxOC40MDYyODgyLDcuMDc4OTkzMjEgMTguMzEwMDMzNiw3LjE3NTI0NzgxIEwxNi4xNzUyNDc4LDkuMzEwMDMzNTcgQzE1Ljk4MzcwNCw5LjUwMTU3NzM0IDE1LjY2NDQyNTMsOS40OTI4NTI0MyAxNS40NzQ4NzM3LDkuMzAzMzAwODYgQzE1LjI3OTYxMTYsOS4xMDgwMzg3MSAxNS4yNzMzODg5LDguNzk3Njc4OTQgMTUuNDY4MTQxLDguNjAyOTI2NzggTDE2LjU3MTA2NzgsNy41IFoiIGlkPSJDb21iaW5lZC1TaGFwZSI+PC9wYXRoPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+'
  private pinglun: string = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMjRweCIgaGVpZ2h0PSIyNHB4IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDQ4LjIgKDQ3MzI3KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5jb21tZW50PC90aXRsZT4KICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPgogICAgPGRlZnM+PC9kZWZzPgogICAgPGcgaWQ9IlN5bWJvbHMiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSJjb21tZW50IiBmaWxsPSIjMjIyMjIyIiBmaWxsLXJ1bGU9Im5vbnplcm8iPgogICAgICAgICAgICA8ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSg0LjAwMDAwMCwgNS4wMDAwMDApIiBpZD0iUGFnZS0xLUNvcHktMTMiPgogICAgICAgICAgICAgICAgPHBhdGggZD0iTTEzLjE1MTYzNDcsMTAuMTQxMTkzNiBDMTQuMzIxNTU1NCw5LjIwNTA4MTYyIDE1LDcuODE0ODM4NDcgMTUsNi4zMzgwMTY3IEwxNSw1Ljg5Nzc3MjA5IEMxNSwzLjIwODEzMDY2IDEyLjc2NTEwNTgsMSAxMC4wMzA1ODEzLDEgTDUuOTY5NDE4NzQsMSBDMy4yMzQ4OTQxNywxIDEsMy4yMDgxMzA2NiAxLDUuODk3NzcyMDkgTDEsNi4zMzgwMTY3IEMxLDkuMDI3NjU4MTIgMy4yMzQ4OTQxNywxMS4yMzU3ODg4IDUuOTY5NDE4NzQsMTEuMjM1Nzg4OCBMOS4zNTA1NDMxOSwxMS4yMzU3ODg4IEw5LjM1MDU0MzE5LDEzLjMxNzI1ODIgTDEzLjE1MTYzNDcsMTAuMTQxMTkzNiBaIE0xNiw2LjMzODAxNjcgQzE2LDguMTM0NTcwNzEgMTUuMTcwNzg4NCw5LjgwNjI4NjQgMTMuNzc2NDAxMSwxMC45MjIwMDUzIEw5LjAwOTAzODE0LDE0LjkwNTc0NzQgQzguNzQ5MTAwNzcsMTUuMTIyOTU4MyA4LjM1MDU0MzE5LDE0Ljk0MDY0MjcgOC4zNTA1NDMxOSwxNC42MDQ1MjYzIEw4LjM1MDU0MzE5LDEyLjIzNTc4ODggTDUuOTY5NDE4NzQsMTIuMjM1Nzg4OCBDMi42ODUyMDY3MSwxMi4yMzU3ODg4IDAsOS41ODI1NzcwNyAwLDYuMzM4MDE2NyBMMCw1Ljg5Nzc3MjA5IEMwLDIuNjUzMjExNzIgMi42ODUyMDY3MSwwIDUuOTY5NDE4NzQsMCBMMTAuMDMwNTgxMywwIEMxMy4zMTQ3OTMzLDAgMTYsMi42NTMyMTE3MiAxNiw1Ljg5Nzc3MjA5IEwxNiw2LjMzODAxNjcgWiI+PC9wYXRoPgogICAgICAgICAgICA8L2c+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4='
  private dianzan: string = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMjRweCIgaGVpZ2h0PSIyNHB4IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDQ4LjIgKDQ3MzI3KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5saWtlX25vcjwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxkZWZzPjwvZGVmcz4KICAgIDxnIGlkPSJTeW1ib2xzIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8ZyBpZD0ibGlrZV9ub3IiIGZpbGw9IiMyMjIyMjIiIGZpbGwtcnVsZT0ibm9uemVybyI+CiAgICAgICAgICAgIDxnIGlkPSJsaWtlIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg0LjAwMDAwMCwgNC4wMDAwMDApIj4KICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik02LjI0ODY5OTM0LDYuMTA5NDkyMjcgQzYuOTMyNjI1MjMsNS4xMzUxMDEyNyA3LjcwMzI1NzU2LDMuNTQzNDkwMjQgOC40NjY0OTk1MiwxLjY1MzI0NjM4IEM4LjY1Nzg5ODkzLDEuMjM4MDkxODIgOC43MzYwOTg3MSwxLjA3NzE3MDMxIDguNzgwNDU0ODksMS4wMDgwNzc0OCBDOS4wMTQ3MDIyNywxLjA1NTkyNDgzIDkuMjI0MTc5MzgsMS4xNDczMDI1IDkuMzUyOTc5MDMsMS4zMDE1NDc2IEM5LjYzMzcxODQ2LDEuNjM3ODg0OTcgOS42MDY3NDIwMywzLjIyOTgxNDc0IDkuMjQ0NTQzMjMsNS4yNDc4MTQ5MyBDOS4xODc4OTMxNyw1Ljc3MDM1MDcxIDkuMjE0ODQ2MDcsNS45ODY4MjE4IDkuNTQ2ODUwNDksNi4xODkzMDU2NiBDOS43NTUwNDQyNyw2LjMxNjI3OTUxIDkuODQ2MDIyNzgsNi4zMjIzNDYxMiAxMC40ODgwOTQ2LDYuMzIxNDI4ODkgQzEwLjU0MjgyOTksNi4zMjEzNTE4OCAxMC41NDI4Mjk5LDYuMzIxMzUxODggMTAuNjAwNDQzMiw2LjMyMTMyNjQgTDE0Ljk3OTY4OTksNi4zMjEzMjY0IEMxNS40NzA2NzMxLDYuMzIxMzI2NCAxNS41NDk3NzcsNi40MDAxNzU2NiAxNS40ODA3MzgsNi42NjY3MDA0NyBDMTUuMzM4NTM5OSw3LjE5NzEyNzYgMTQuNTk4ODMzOSw5Ljk1NTYyMzM1IDE0LjQ0NTQ4NzMsMTAuNTI3NTgxMSBDMTMuOTY3NTE2MSwxMi4zMTAzMzU5IDEzLjYzMDM4OTksMTMuNTY4NjIxNCAxMy40MTA3MTg5LDE0LjM5MDE2MTkgQzEzLjI5ODQ1MTgsMTQuNzE1NDQxNiAxMi45NjQwMjcxLDE1LjAwMDIwNDggMTIuNzQ5NTI5OSwxNS4wMDAyMDQ4IEw1LjM5NTQ0OTY1LDE1LjAwMDIwNDggQzUuMjcyODE3ODIsMTUuMDAwMjA0OCA1LjA0MTI1NTI4LDE0LjcyMzkzNDEgNS4wNDEyNTUyOCwxNC41MTY4OTIxIEw1LjA0MTI1NTI4LDcuNTEyODM0NjIgQzUuMzU2MjU1ODIsNy4yMzk2NTYxMiA1Ljc3NTU3NDc2LDYuNzgyODc1NjQgNi4yNDg2OTkzNCw2LjEwOTQ5MjI3IFogTTEwLjExNjY5MDcsMC42NTk1MjU3NTQgQzkuOTIyNDk3MzcsMC40MjY5Njc5MzkgOS42NzIzNTAyLDAuMjYyNjEzNjkxIDkuMzg4MTk2NzIsMC4xNDk2ODY3MTEgQzkuMjA3NjkxOTEsMC4wNzc5NTEzMTEyIDkuMDUyMDk2NjEsMC4wMzkyNzYwNzA1IDguODg2NDMyNjQsMC4wMTEwNzA2MjQ5IEw4LjgyMTQwOTYxLC0zLjU1MjcxMzY4ZS0xNSBMOC43NTU3NTU4NywwLjAwNjI5MDI4MTUgQzguNDI1MDI5NDcsMC4wMzg3NjMxNDIgOC4yNDkwOTA1NCwwLjA5OTIyOTg3MTQgOC4wNjI2NDg5NSwwLjMwODAzNjU3NSBDNy45MTk5ODYyLDAuNDY3ODEyODE1IDcuODY1MDI1OTQsMC41NzYzOTMzMzYgNy41NTI0ODgxNSwxLjI1NjEwNjAxIEM2LjgwNjYxNjIxLDMuMTAxODQwNSA2LjA2MjYyNDgzLDQuNjM4NDI5MTIgNS40MzQyOTk0Nyw1LjUzMzYwNiBDNS4xMjc3NzUxLDUuOTY5ODcyNDMgNC44MzM4NjE0OSw2LjMxODEzMTcyIDQuNTY0MjUwMDUsNi41ODY0MjAwMSBDNC40MDk3MjU1MSw2Ljc0MDE4NjIgNC4zMDI3NTYzNyw2LjgzMDA3OTk2IDQuMjU0ODg3NTcsNi44NjQxNTQ1MSBMNC4wNDQ5NTkyOSw3LjAxMzU4ODI0IEw0LjA0NDk1OTI5LDE0LjUxNjg5MjEgQzQuMDQ0OTU5MjksMTUuMjQxNDY0OCA0LjY4MDcwMzQxLDE1Ljk5OTk1MzEgNS4zOTU0NDk2NSwxNS45OTk5NTMxIEwxMi43NDk1Mjk5LDE1Ljk5OTk1MzEgQzEzLjQyNjg2MDUsMTUuOTk5OTUzMSAxNC4xMTIzMjAyLDE1LjQxNjI4MjkgMTQuMzYzMTA4NCwxNC42ODE3MTI2IEMxNC41OTI1NzI5LDEzLjgyNzk5MjcgMTQuOTI5NjU5NSwxMi41Njk4NTUgMTUuNDA2MzE5MywxMC43OTE5OTEzIEMxNS41NjA5MDgsMTAuMjE1NDAwOCAxNi4zMDA2MjQ3LDcuNDU2ODY1MTIgMTYuNDQzOTE1Miw2LjkyMjI5NDI5IEMxNi42OTYwOTQ5LDUuOTQ4ODI2MDggMTYuMDY2ODIwOCw1LjMyMTU3ODEgMTQuOTc5Njg5OSw1LjMyMTU3ODEgTDEwLjYwMDQ0MzIsNS4zMjE1NzgxIEMxMC41NDE3MDkzLDUuMzIxNjA0MTEgMTAuNTQxNzA5Myw1LjMyMTYwNDExIDEwLjQ4NjY3NjMsNS4zMjE2ODE2MSBDMTAuMzc4NDI0MSw1LjMyMTgzNjI1IDEwLjMwMTI2MDEsNS4zMjE3NTUwNiAxMC4yNDIzMzE0LDUuMzIxMjA1MDUgQzEwLjY0OTI0MzMsMy4wMzA3ODg2MiAxMC42NzI1OTI4LDEuMzI1NTE5MzIgMTAuMTE2NjkwNywwLjY1OTUyNTc1NCBaIE0xLjk5MzQzMzYxLDE1LjAwMDI1MTcgTDEuNDk1MDA1MDcsMTUuMDAwMjUxNyBDMS4yMTMyOTQ5MywxNS4wMDAyNTE3IDAuOTk2Mjk1OTkxLDE0Ljc5NTUyNzcgMC45OTYyOTU5OTEsMTQuNTU5OTEwOCBMMC45OTYyOTU5OTEsOC40NDMyNjY5IEMwLjk5NjI5NTk5MSw4LjIwNjU0MDI0IDEuMjEzMDEzMDgsOC4wMDIwMTM2MyAxLjQ5NTAwNTA3LDguMDAyMDEzNjMgTDEuOTkzNDMzNjEsOC4wMDIwMTM2MyBDMi4yNzQxMzg5OSw4LjAwMjAxMzYzIDIuNDkwNzM5OTgsOC4yMDY2Mjk1MiAyLjQ5MDczOTk4LDguNDQzMjY2OSBMMi40OTA3Mzk5OCwxNC41NTk5MTA4IEMyLjQ5MDczOTk4LDE0Ljc5NTQzODUgMi4yNzM4NTc0OSwxNS4wMDAyNTE3IDEuOTkzNDMzNjEsMTUuMDAwMjUxNyBaIE0xLjk5MzQzMzYxLDE2IEMyLjgxMTAyNzU3LDE2IDMuNDg3MDM1OTcsMTUuMzYxNjEwOCAzLjQ4NzAzNTk3LDE0LjU1OTkxMDggTDMuNDg3MDM1OTcsOC40NDMyNjY5IEMzLjQ4NzAzNTk3LDcuNjQwNTM2OTUgMi44MTEzNzg0OCw3LjAwMjI2NTMzIDEuOTkzNDMzNjEsNy4wMDIyNjUzMyBMMS40OTUwMDUwNyw3LjAwMjI2NTMzIEMwLjY3NTk3NDk4MSw3LjAwMjI2NTMzIDAsNy42NDAyMTYzIDAsOC40NDMyNjY5IEwwLDE0LjU1OTkxMDggQzAsMTUuMzYxOTMxNCAwLjY3NjMyNjE0OCwxNiAxLjQ5NTAwNTA3LDE2IEwxLjk5MzQzMzYxLDE2IFoiPjwvcGF0aD4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+'
}
</script>

<style lang="scss" scoped>
  .card-content {
    width: 750upx;
    display: flex;
    flex-direction: column;
    .card-header {
      padding: 20upx;
      display: flex;
      flex-direction: row;
      .card-right {
        padding-left: 10upx;
      }
    }
    .right-top-name {
      color: #222;
      font-family: PingFangSC-Medium;
      font-size: 30upx;
    }
    .header-right-bottom {
      margin-top: 4upx;
      font-size: 20upx;
      line-height: 10upx;
      color: #999;
      .header-right-info {
        .header-right-point {
          display: inline-block;
          padding: 10upx;
          font-weight: 700;
        }
      }
    }
    .card-body {
      .card-body-text {
        font-size: 30upx;
        line-height: 40upx;
        padding: 0 20upx;
        margin-bottom: 20upx;
      }
      .card-body-img-col1 {
         width: 750upx;
      }
      .card-body-img-col3 {
        width: 750upx;
        .card-body-img-col3-item {
          width: 750upx;
          display: flex;
          flex-direction: row;
          >view {
            width: 250upx;
            margin: 2upx;
          }
        }
      }
    }
    .card-foot {
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      padding: 20upx 0;
      .card-foot-item {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        text {
          color: #222;
          font-size: 34upx;
        }
      }
    }
    .address {
      margin-left: 40upx;
      margin-top: 20upx;
      .map-icon {
        margin-right: 10upx;
      }
    }
  }
</style>
