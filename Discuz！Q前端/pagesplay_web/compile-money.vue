<template>
  <qui-page :data-qui-theme="theme">
    <view class="overallSituation">
      <view class="bigbox">
        <!-- 第一栏 -->
        <radio-group class="bigbox_01" @change="radioChange">
          <label class="fontclol">发放规则</label>
          <label class="bigbox_01_left">
            <!-- #ifdef H5-PLAY || MP-WEIXIN-PLAY -->
            <radio value="红包总金额" color="#EA3D5A" :checked="rule === 1" />
            <!-- #endif -->
            <!-- #ifndef H5-PLAY || MP-WEIXIN-PLAY -->
            <radio value="红包总金额" :checked="rule === 1" />
            <!-- #endif -->
            <text class="gap">随机</text>
            <!-- #ifdef H5-PLAY || MP-WEIXIN-PLAY -->
            <radio value="单个红包金额" color="#EA3D5A" />
            <!-- #endif -->
            <!-- #ifndef H5-PLAY || MP-WEIXIN-PLAY -->
            <radio value="单个红包金额" />
            <!-- #endif -->
            <text>定额</text>
          </label>
        </radio-group>
        <!-- 第一栏结束 -->

        <!-- 第二栏 -->
        <view class="bigbox_01">
          <view>
            <text class="fontclol">{{ sumtype }}</text>
          </view>
          <view class="bigbox_01_right">
            <input type="number" v-model="money" placeholder="0" @input="inputChange" />
            <text>元</text>
          </view>
        </view>
        <!-- 第二栏结束 -->

        <!-- 第三栏 -->
        <view class="bigbox_01">
          <view><text class="fontclol">红包个数</text></view>
          <view class="bigbox_01_right">
            <input type="number" v-model="number" @input="inputChanges" />
            <text>个</text>
          </view>
        </view>
        <!-- 第三栏结束 -->

        <!-- 第四栏 -->
        <radio-group class="bigbox_02">
          <view class="bigbox_02_left" style="color: #636363;"><text>获利条件</text></view>

          <view class="bigbox_02_right">
            <view class="bigbox_02_middle">
              <view>
                <!-- #ifdef H5-PLAY || MP-WEIXIN-PLAY -->
                <radio
                  value="回复领红包"
                  color="#EA3D5A"
                  @click="radioChangeipts"
                  :checked="condition === 0"
                />
                <!-- #endif -->
                <!-- #ifndef H5-PLAY || MP-WEIXIN-PLAY -->
                <radio value="回复领红包" @click="radioChangeipts" :checked="condition === 0" />
                <!-- #endif -->
                <text>回复领红包</text>
              </view>
              <view>
                <!-- #ifdef H5-PLAY || MP-WEIXIN-PLAY -->
                <radio value="集赞领红包" color="#EA3D5A" @click="radioChangeipt" />
                <!-- #endif -->
                <!-- #ifndef H5-PLAY || MP-WEIXIN-PLAY -->
                <radio value="集赞领红包" @click="radioChangeipt" />
                <!-- #endif -->
                <text>集赞领红包</text>
              </view>
            </view>

            <view>
              <input
                type="number"
                v-model="likenum"
                :disabled="defaultipt"
                class="bigbox_02_bottom"
                @input="inputChangeing"
              />
            </view>
          </view>
        </radio-group>
        <!-- 第四栏结束 -->
      </view>
      <!-- 底下俩按钮开始 -->
      <view class="bigbox_bottom">
        <button type="default" class="buttomone" @click="postAnswerClick">确定</button>
        <button type="default" class="buttomtwo" @tap="back">取消</button>
      </view>
    </view>
  </qui-page>
</template>

<script>
export default {
  data() {
    return {
      sumtype: '红包总金额',
      money: '', // 红包金额
      number: 1, //  红包数量
      likenum: 1, // 集赞数
      defaultipt: true, // 框框是否可以被选中
      is_red_packet: 0, // 文字帖类型 0-普通帖 1-红包贴
      rule: 1, // 红包贴模式 0-定额 1-随机
      condition: 0, // 红包获得条件 0-回复 1-集赞
    };
  },
  computed: {
    // 计算属性
  },

  methods: {
    radioChange(res) {
      // 变换金额选项
      this.sumtype = res.detail.value;
      if (this.sumtype === '红包总金额') {
        this.rule = 1;
      } else {
        this.rule = 0;
      }
    },
    radioChangeipt() {
      // 使之可选
      this.defaultipt = false;
      this.condition = 1;
    },
    radioChangeipts() {
      // 使之不可选
      this.defaultipt = true;
      this.condition = 0;
    },
    inputChange(e) {
      // 红包金额双向绑定 小于等于200
      this.money = e.detail.value;
    },
    inputChanges(e) {
      // 红包数量双向绑定 小于等于100
      this.number = e.detail.value;
    },
    inputChangeing(e) {
      // 集赞数双向绑定
      this.likenum = e.detail.value;
    },
    postAnswerClick() {
      // 点击确定做的方法，设定字段
      if (
        !(
          /^(([1-9]\d*(\.\d{1,2})?)|(0\.\d{1,2}))$/.test(this.money) &&
          this.money >= 0.01 &&
          this.money <= 200
        )
      ) {
        return uni.showToast({
          title: this.i18n.t('金额错误0-200￥'),
          duration: 1000,
        });
      }
      if (!(/^([1-9][0-9]*)$/.test(this.number) && this.number <= 100)) {
        return uni.showToast({
          title: this.i18n.t('红包数量错误1-100'),
          duration: 1000,
        });
      }
      if (!(/^([1-9][0-9]*)$/.test(this.likenum) && this.likenum <= 250)) {
        return uni.showToast({
          title: this.i18n.t('集赞数错误1-250'),
          duration: 1000,
        });
      }
      this.is_red_packet = 1;
      uni.setStorage({
        key: 'money',
        data: this.money,
      });
      uni.setStorage({
        key: 'number',
        data: this.number,
      });
      uni.setStorage({
        key: 'rule',
        data: this.rule,
      });
      uni.setStorage({
        key: 'likenum',
        data: this.likenum,
      });
      uni.setStorage({
        key: 'is_red_packet',
        data: this.is_red_packet,
      });
      uni.setStorage({
        key: 'condition',
        data: this.condition,
      });
      uni.navigateBack();
    },
    back() {
      // 返回
      uni.navigateBack();
    },
  },
};
</script>
<style lang="scss" scoped>
@import '@/styles/base/theme/fn.scss';
@import '@/styles/base/variable/global.scss';
.overallSituation {
  font-family: 'PingFangSC-Regular';
  font-size: 28rpx;
  font-weight: 400;
  .bigbox {
    width: 100%;
    height: 93vh;
    background: --color(--qui-BG-2);
    .bigbox_01 {
      display: flex;
      width: 94%;
      height: 106rpx;
      margin-right: 3%;
      margin-left: 3%;
      line-height: 106rpx;
      justify-content: space-between;
      border-bottom: 2rpx solid --color(--qui-BOR-ED);
    }
  }
  .bigbox_01_left {
    width: 250rpx;
    /* #ifdef MP-WEIXIN-PLAY */
    width: 270rpx;
    /* #endif */
    .gap {
      margin-right: 7.33%;
    }
  }
  .fontclol {
    color: #636363;
  }
  .bigbox_01_right {
    display: flex;
    justify-content: center;
    align-items: center;
    input {
      width: 70rpx;
      height: 55rpx;
      text-align: center;
    }
  }
  .bigbox_02 {
    display: flex;
    width: 94%;
    // height: 200rpx;
    padding-top: 35rpx;
    padding-bottom: 27rpx;
    margin-right: 3%;
    margin-left: 3%;
    line-height: 62rpx;
    justify-content: space-between;
    border-bottom: 2rpx solid --color(--qui-BOR-ED);
    .bigbox_02_right {
      display: flex;
    }
    .bigbox_02_bottom {
      width: 130rpx;
      height: 55rpx;
      margin-top: 66rpx;
      margin-left: 20rpx;
      text-align: center;
      border: 2rpx solid #eee;
      border-radius: 28rpx;
    }
  }
  .bigbox_bottom {
    position: absolute;
    bottom: 0;
    display: flex;
    width: 94%;
    height: 106rpx;
    margin-right: 3%;
    margin-left: 3%;
    line-height: 106rpx;
    justify-content: space-between;
    text-align: center;
    .buttomone {
      width: 332rpx;
      height: 88rpx;
      line-height: 88rpx;
      color: #333;
      background: #eee;
      border-radius: 44rpx;
      &:hover {
        color: white;
        /* #ifdef H5-PLAY || MP-WEIXIN-PLAY */
        background: #ea3d5a;
        /* #endif */
        /* #ifndef H5-PLAY || MP-WEIXIN-PLAY */
        background: #007aff;
        /* #endif */
      }
      &:after {
        border: none;
      }
    }
    .buttomtwo {
      width: 332rpx;
      height: 88rpx;
      line-height: 88rpx;
      color: #333;
      background: #eee;
      border-radius: 44rpx;
      &:hover {
        color: white;
        /* #ifdef H5-PLAY || MP-WEIXIN-PLAY */
        background: #ea3d5a;
        /* #endif */
        /* #ifndef H5-PLAY || MP-WEIXIN-PLAY */
        background: #007aff;
        /* #endif */
      }
      &:after {
        border: none;
      }
    }
  }
}
</style>
