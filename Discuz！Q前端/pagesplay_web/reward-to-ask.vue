<template>
  <qui-page :data-qui-theme="theme">
    <view class="post-box" v-if="loadStatus">
      <!-- #ifdef MP-WEIXIN -->
      <view class="post-box__hd">
        <view class="post-box__hd-l">
          <qui-icon
            class="post-box__hd-l__icon"
            name="icon-expression"
            size="40"
            :color="emojiShow ? '#1878F3' : '#777'"
            @click="emojiclick"
          ></qui-icon>
          <qui-icon
            class="post-box__hd-l__icon"
            name="icon-call"
            size="40"
            color="#777"
            @click="callClick"
          ></qui-icon>
          <qui-icon
            class="post-box__hd-l__icon"
            name="icon-wei"
            size="40"
            color="#777"
            @click="topicPage"
          ></qui-icon>
        </view>
        <text class="post-box__hd-r" v-if="type !== 5">
          {{
        textAreaValue.length &lt;= textAreaLength
        ? i18n.t('discuzq.post.note', { num: textAreaLength - textAreaValue.length })
        : i18n.t('discuzq.post.exceed', { num: textAreaValue.length - textAreaLength })
          }}
        </text>
        <text class="post-box__hd-r" v-if="type === 5">
          {{
        textAreaValue.length &lt;= textAreaLength
        ? i18n.t('discuzq.post.note', { num: textAreaLength - textAreaValue.length })
        : i18n.t('discuzq.post.exceed', { num: textAreaValue.length - textAreaLength })
          }}
        </text>
      </view>
      <view class="emoji-bd" v-show="emojiShow">
        <qui-emoji
          position="absolute"
          top="20rpx"
          border-radius="10rpx"
          @click="getEmojiClick"
        ></qui-emoji>
      </view>
      <view class="post-box__con">
        <textarea
          id="textarea"
          ref="textarea"
          class="post-box__con-text"
          :placeholder="
            type !== 5
              ? i18n.t('discuzq.post.placeholder')
              : i18n.t('discuzq.post.placeholderQuestion')
          "
          placeholder-class="textarea-placeholder"
          v-model="textAreaValue"
          auto-height="true"
          :show-confirm-bar="barStatus"
          :adjust-position="true"
          cursor-spacing="30"
          cursor="cursor"
          :maxlength="49999"
          :focus="type !== 1"
          v-show="textShow"
          @blur="contBlur"
          @focus="focusEvent"
        ></textarea>
        <view class="post-box__con-text post-box__con-text--static" v-show="!textShow">
          <text class="text-cover">{{ textAreaValue }}</text>
        </view>
        <view class="markdown-box" v-if="markdownShow">
          <view>
            <qui-icon
              name="icon-bold"
              size="30"
              class="qui-icon"
              @click="toolBarClick('bold')"
            ></qui-icon>
          </view>
          <view>
            <qui-icon
              name="icon-title"
              size="30"
              class="qui-icon"
              @click="toolBarClick('title')"
            ></qui-icon>
          </view>
          <view>
            <qui-icon
              name="icon-italic"
              size="30"
              class="qui-icon"
              @click="toolBarClick('italic')"
            ></qui-icon>
          </view>
          <view>
            <qui-icon
              name="icon-quote"
              size="30"
              class="qui-icon"
              @click="toolBarClick('quote')"
            ></qui-icon>
          </view>
          <view>
            <qui-icon
              name="icon-code"
              size="30"
              class="qui-icon"
              @click="toolBarClick('code')"
            ></qui-icon>
          </view>
          <view>
            <qui-icon
              name="icon-link"
              size="30"
              class="qui-icon"
              @click="toolBarClick('link')"
            ></qui-icon>
          </view>
          <view>
            <qui-icon
              name="icon-strikethrough"
              size="30"
              class="qui-icon"
              @click="toolBarClick('strikethrough')"
            ></qui-icon>
          </view>
        </view>
      </view>
      <!-- #endif -->
      <!-- 开头表情包部分 -->
      <!-- #ifdef H5 -->
      <view v-if="type !== 1">
        <view class="post-box__hd">
          <view class="post-box__hd-l">
            <qui-icon
              class="post-box__hd-l__icon"
              name="icon-expression"
              size="34"
              :color="emojiShow ? '#EA3D5A' : '#999999'"
              @click="emojiclick"
            ></qui-icon>
            <qui-icon
              class="post-box__hd-l__icon"
              name="icon-call"
              size="34"
              color="#999999"
              @click="callClick"
            ></qui-icon>
            <qui-icon
              class="post-box__hd-l__icon"
              name="icon-wei"
              size="34"
              color="#999999"
              @click="topicPage"
            ></qui-icon>
          </view>
          <text class="post-box__hd-r" v-if="type !== 5">
            {{
          textAreaValue.length &lt;= textAreaLength
          ? i18n.t('discuzq.post.note', { num: textAreaLength - textAreaValue.length })
          : i18n.t('discuzq.post.exceed', { num: textAreaValue.length - textAreaLength })
            }}
          </text>
          <text class="post-box__hd-r" v-if="type === 5">
            {{
          textAreaValue.length &lt;= textAreaLength
          ? i18n.t('discuzq.post.note', { num: textAnswerLength - textAreaValue.length })
          : i18n.t('discuzq.post.exceed', { num: textAreaValue.length - textAnswerLength })
            }}
          </text>
        </view>
        <view class="emoji-bd" v-show="emojiShow">
          <qui-emoji
            position="absolute"
            top="20rpx"
            border-radius="10rpx"
            @click="getEmojiClick"
          ></qui-emoji>
        </view>
        <!-- 文本框输入部分 -->
        <view class="post-box__con">
          <textarea
            id="textarea"
            ref="textarea"
            class="post-box__con-text"
            :placeholder="
              type !== 5
                ? i18n.t('discuzq.post.placeholder')
                : i18n.t('discuzq.post.placeholderQuestion')
            "
            placeholder-class="textarea-placeholder"
            v-model="textAreaValue"
            auto-height="true"
            :show-confirm-bar="barStatus"
            :adjust-position="true"
            cursor-spacing="30"
            cursor="cursor"
            :maxlength="49999"
            :focus="type !== 1"
            v-show="textShow"
            @blur="contBlur"
            @focus="focusEvent"
          ></textarea>
          <view class="post-box__con-text post-box__con-text--static" v-show="!textShow">
            <text class="text-cover">{{ textAreaValue }}</text>
          </view>
        </view>
        <!-- 文本框输入部分结束 -->
      </view>
      <!-- 表情包部分结束 -->
      <view v-else>
        <!-- 大长输入框 -->
        <view ref="vditor">
          <view class="post-box__hd">
            <view class="post-box__hd-l">
              <qui-icon
                class="post-box__hd-l__icon"
                name="icon-expression"
                size="40"
                :color="emojiShow ? '#1878F3' : '#777'"
                @click="emojiclick"
              ></qui-icon>
              <qui-icon
                class="post-box__hd-l__icon"
                name="icon-call"
                size="40"
                color="#777"
                @click="callClick"
              ></qui-icon>
              <qui-icon
                class="post-box__hd-l__icon"
                name="icon-wei"
                size="40"
                color="#777"
                @click="topicPage"
              ></qui-icon>
            </view>
            <text class="post-box__hd-r">
              {{
            textAreaValue.length &lt;= textAreaLength
            ? i18n.t('discuzq.post.note', { num: textAnswerLength - textAreaValue.length })
            : i18n.t('discuzq.post.exceed', { num: textAreaValue.length - textAnswerLength })
              }}
            </text>
          </view>
          <view class="emoji-bd" v-show="emojiShow">
            <qui-emoji
              position="absolute"
              top="20rpx"
              border-radius="10rpx"
              @click="getEmojiClick"
            ></qui-emoji>
          </view>
          <!-- 文本框输入部分 -->
          <view class="post-box__con">
            <textarea
              id="textarea"
              ref="textarea"
              class="post-box__con-text"
              :placeholder="
                type !== 5
                  ? i18n.t('discuzq.post.placeholder')
                  : i18n.t('discuzq.post.placeholderQuestion')
              "
              placeholder-class="textarea-placeholder"
              v-model="textAreaValue"
              auto-height="true"
              :show-confirm-bar="barStatus"
              :adjust-position="true"
              cursor-spacing="30"
              cursor="cursor"
              :maxlength="49999"
              :focus="type !== 1"
              v-show="textShow"
              @blur="contBlur"
              @focus="focusEvent"
            ></textarea>
            <view class="post-box__con-text post-box__con-text--static" v-show="!textShow">
              <text class="text-cover">{{ textAreaValue }}</text>
            </view>
          </view>
        </view>
      </view>
      <!-- #endif -->

      <!-- 图片上传start -->
      <qui-uploader
        :url="`${url}api/attachments`"
        :form-data="formData"
        :file-preview="filePreview"
        name="file"
        :async-clear="true"
        ref="upload"
        @change="uploadChange"
        @clear="uploadClear"
        @uploadClick="uploadClick"
        style="padding-top: 0;"
      ></qui-uploader>
      <!-- 图片上传end -->
      <uni-popup ref="deletePopup" type="center">
        <uni-popup-dialog
          type="warn"
          :content="deleteTip"
          :before-close="true"
          @close="handleClickCancel"
          @confirm="handleClickOk"
        ></uni-popup-dialog>
      </uni-popup>
      <!-- 设置悬赏金额 -->
      <view>
        <qui-cell-item
          :class="price > 0 ? 'cell-item-right-text' : ''"
          title="悬赏金额"
          :addon="showPrice"
          arrow
          @click="cellClick('pay')"
        ></qui-cell-item>
      </view>
      <!-- 设置悬赏时间 -->
      <view>
        <view class="endTimes">
          <onwTimePicker
            @getTimes="getTimes"
            @setTimes="setTimes"
            :time-value="timeValue ? timeValue : '悬赏结束时间'"
          ></onwTimePicker>
          <qui-icon class="" name="icon-folding-r" size="26" color="#ddd"></qui-icon>
        </view>
      </view>
      <!-- 匿名提问 -->
      <view class="uni-list-cell uni-list-cell-pd" v-if="anonymity_show && operating !== 'edit'">
        <view class="uni-list-cell-db">{{ i18n.t('discuzq.post.anonymity') }}</view>
        <!-- #ifndef H5-PLAY || MP-WEIXIN-PLAY -->
        <u-switch @change="changeCheck" v-model="checked" active-color="#1E78F3"></u-switch>
        <!-- #endif -->
        <!-- #ifdef H5-PLAY || MP-WEIXIN-PLAY -->
        <u-switch @change="changeCheck" v-model="checked" active-color="#EA3D5A"></u-switch>
        <!-- #endif -->
      </view>
      <!-- 添加位置 -->
      <view class="post-box__position" v-if="geographical_location">
        <qui-cell-item arrow :slot-left="true" @click="choosePosition">
          <view>
            <!-- <qui-icon name="icon-weizhi" size="35" color="#777"></qui-icon> -->
            <text style="color: var(--qui-FC-777);">
              {{
                currentPosition && currentPosition.location
                  ? currentPosition.location
                  : i18n.t('discuzq.post.addPosition')
              }}
            </text>
          </view>
        </qui-cell-item>
        <qui-icon
          name="icon-close1"
          size="32"
          color="#ccc"
          @tap="clearPosition"
          v-if="currentPosition && currentPosition.location"
        ></qui-icon>
      </view>
      <!--支付组件-->
      <view v-if="payShowStatus">
        <qui-pay
          ref="payShow"
          :pay-type="payTypeText"
          :money="priceAsk"
          :wallet-status="user.canWalletPay"
          :balance="Number(user.walletBalance)"
          :pay-password="pwdVal"
          :pay-type-data="payTypeData"
          :to-name="beUserName"
          @paysureShow="paysureShow"
          @onInput="onInput"
          @radioChange="radioChange"
        ></qui-pay>
      </view>
      <uni-popup ref="lookPayPopup" type="bottom">
        <view class="popup-share">
          <view class="pay-type" @click="choicePayType(0)">
            {{ i18n.t('discuzq.post.TheContentAndTheAccessoriesIsFree') }}
          </view>
          <view class="pay-type" v-if="type === 1 && canUploadAttachment" @click="choicePayType(1)">
            {{ i18n.t('discuzq.post.TheContentIsFreeAndTheAccessoriesArePaid') }}
          </view>
          <view class="pay-type" @click="choicePayType(2)">
            {{ i18n.t('discuzq.post.TheContentAndTheAccessoriesIsPaid') }}
          </view>
          <view class="popup-share-content-space"></view>
          <text class="popup-share-btn" @click="cancelLookPay()">
            {{ i18n.t('discuzq.post.cancel') }}
          </text>
        </view>
      </uni-popup>
      <!-- 循环分类功能 -->
      <!-- #ifndef H5-PLAY || MP-WEIXIN-PLAY -->
      <view class="post-box__ft-categories">
        <qui-button
          v-for="(item, index) in allCategories"
          :key="item._jv.id"
          :type="Number(item._jv.id) === Number(categoryId) ? 'primary' : ''"
          :plain="Number(item._jv.id) === Number(categoryId)"
          :class="Number(item._jv.id) === Number(categoryId) ? 'cateActive' : ''"
          @click="checkClass(item, index, item._jv.id)"
        >
          {{ item.name }}
        </qui-button>
      </view>
      <view class="post-box__ft-categories post-box__img" v-if="secondallcategories != ''">
        <qui-button
          v-for="(item1, index) in secondallcategories"
          :key="item1.id"
          :type="Number(item1.id) === Number(two_categoryId) ? 'primary' : ''"
          :plain="Number(item1.id) === Number(two_categoryId)"
          :class="Number(item1.id) === Number(two_categoryId) ? 'cateActive' : ''"
          @click="checkClassing(item1, index, item1.id)"
        >
          {{ item1.name }}
        </qui-button>
      </view>
      <!-- #endif -->
      <!-- #ifdef H5-PLAY || MP-WEIXIN-PLAY -->
      <view class="post-box__ft">
        <text class="post-box__ft-tit">{{ i18n.t('discuzq.post.chooseCategory') }}</text>
        <view class="post-box__ft-categories">
          <qui-button
            v-for="(item, index) in allCategories"
            :key="item._jv.id"
            :type="Number(item._jv.id) === Number(categoryId) ? 'primary' : ''"
            :plain="Number(item._jv.id) === Number(categoryId)"
            :class="Number(item._jv.id) === Number(categoryId) ? 'cateActive' : ''"
            @click="checkClass(item, index, item._jv.id)"
          >
            {{ item.name }}
          </qui-button>
        </view>
        <!-- 二级菜单 -->
        <view class="post-box__ft-categories post-box__img" v-if="secondallcategories != ''">
          <qui-button
            v-for="(item1, index) in secondallcategories"
            :key="item1.id"
            :type="Number(item1.id) === Number(two_categoryId) ? 'primary' : 'second_level'"
            :plain="Number(item1.id) === Number(two_categoryId)"
            :class="Number(item1.id) === Number(two_categoryId) ? 'cateActive' : ''"
            @click="checkClassing(item1, index, item1.id)"
          >
            {{ item1.name }}
          </qui-button>
          <img src="../static/h5-play/pullDown.png" alt="" class="pullDown_img" />
        </view>
      </view>
      <!-- #endif -->
      <!-- 循环分类功能结束 -->
      <!-- #ifdef H5-PLAY || MP-WEIXIN-PLAY -->
      <!-- 发布按钮功能 -->
      <view class="bottom_button">
        <qui-button
          :loading="postLoading"
          type="primary"
          size="minpink"
          id="TencentCaptcha"
          :data-appid="(forums.qcloud && forums.qcloud.qcloud_captcha_app_id) || ''"
          @click="postClick"
          :disabled="textAreaValue.length > textAreaLength"
        >
          {{ i18n.t('discuzq.post.post') }}
        </qui-button>
        <qui-button
          :loading="postLoading"
          type="primary"
          size="minpink"
          id="TencentCaptcha"
          :data-appid="(forums.qcloud && forums.qcloud.qcloud_captcha_app_id) || ''"
          :disabled="textAreaValue.length > textAreaLength"
          @tap="toDraftsing"
        >
          保存草稿箱
        </qui-button>
      </view>
      <!-- #endif -->
      <!-- #ifndef H5-PLAY || MP-WEIXIN-PLAY -->
      <view class="bottom_button">
        <qui-button
          :loading="postLoading"
          type="primary"
          size="smalls"
          id="TencentCaptcha"
          :data-appid="(forums.qcloud && forums.qcloud.qcloud_captcha_app_id) || ''"
          @click="postClick"
          :disabled="textAreaValue.length > textAreaLength"
        >
          {{ i18n.t('discuzq.post.post') }}
        </qui-button>
        <qui-button
          :loading="postLoading"
          type="primary"
          size="smalls"
          id="TencentCaptcha"
          :data-appid="(forums.qcloud && forums.qcloud.qcloud_captcha_app_id) || ''"
          :disabled="textAreaValue.length > textAreaLength"
          @tap="toDraftsing"
        >
          保存草稿箱
        </qui-button>
      </view>
      <!-- #endif -->
      <!-- 发布按钮功能结束 -->

      <!-- 设置悬赏金额弹窗 -->
      <uni-popup ref="popupBtm" type="bottom">
        <view class="popup-share">
          <view class="popup-share-content">
            <text class="popup-title">请设置悬赏金额</text>
            <view class="popup-content-btn">
              <qui-button
                class="popup-btn"
                v-for="(item, index) in payNum"
                :key="index"
                :type="
                  payNumCheck.length > 0 && payNumCheck[0].name === item.name
                    ? 'myradcolor'
                    : 'post'
                "
                plain
                size="post"
                @click="moneyClick(index)"
              >
                {{ item.name }}
              </qui-button>
            </view>
            <!-- 设置免费的字数百分比 -->
            <view class="popup-content-btn" v-if="setType === 'word'">
              <qui-button
                class="popup-btn"
                v-for="(item, index) in freepercentage"
                :key="index"
                :type="freewords.length > 0 && freewords[0].name === item.name ? 'primary' : 'post'"
                plain
                size="post"
                @click="percentageClick(index)"
              >
                {{ item.name }}
              </qui-button>
            </view>
          </view>
          <view class="popup-share-content-space"></view>
          <text class="popup-share-btn" @click="cancel()">{{ i18n.t('discuzq.post.cancel') }}</text>
        </view>
      </uni-popup>
      <!-- 自定义金额 -->
      <view v-if="popupStatus">
        <uni-popup ref="popup" type="center">
          <view class="popup-dialog">
            <view class="popup-dialog__top"><text>输入悬赏金额</text></view>
            <view class="popup-dialog__cont">
              <qui-icon class="popup-dialog__cont-rmb" name="icon-rmb" size="40"></qui-icon>
              <input
                class="popup-dialog__cont-input"
                v-model="inputPrice"
                type="digit"
                placeholder="0.0"
                :maxlength="maxLength"
                :focus="setType === 'pay'"
                @input="checkNum"
              />
            </view>
            <view class="popup-dialog__ft">
              <button class="popup-btn--close" @click="diaLogClose">
                {{ i18n.t('discuzq.close') }}
              </button>
              <button
                class="popup-btn--ok"
                :class="inputPrice > 0 ? 'popup-btn--ok--blue' : ''"
                :disabled="inputPrice === ''"
                @click="diaLogOk"
              >
                {{ i18n.t('discuzq.ok') }}
              </button>
            </view>
          </view>
        </uni-popup>
      </view>
      <!-- 提示框 -->
      <uni-popup ref="wechatPopup" type="center">
        <uni-popup-dialog
          type="warn"
          :content="wechatTip"
          :before-close="true"
          @close="handleWechatClickCancel"
          @confirm="handleWechatClickOk"
        ></uni-popup-dialog>
      </uni-popup>
      <qui-toast ref="toast"></qui-toast>
      <qui-upload-file
        :url="`${url}api/attachments`"
        ref="uploadFiles"
        :header="header"
        :attachment-list="attachmentList"
        :file-format="forums.set_attach && forums.set_attach.support_file_ext"
        :file-size="forums.set_attach && forums.set_attach.support_max_size"
        v-show="type === 1 && type !== 5 && forums.other && forums.other.can_upload_attachments"
        @deleteItem="deleteFile"
      ></qui-upload-file>
    </view>
  </qui-page>
</template>

<script>
import { mapState, mapMutations } from 'vuex'; // vuex里的仓库和更改的办法
import { DISCUZ_REQUEST_HOST } from '@/common/const'; // 这个会等于路由里的host，会根据版本变化，几乎可以说会等于主路由
// import VodUploader from '@/common/cos-wx-sdk-v5.1';
import forums from '@/mixin/forums'; // 发送请求的方法
import user from '@/mixin/user'; // 不知道干嘛的，好像是重复发送请求的
import loginModule from '@/mixin/loginModule'; // 用来各种小程序登录请求的
// #ifdef  H5
import tcaptchs from '@/utils/tcaptcha'; // 1200多行没备注，神仙，看不懂，应该是组件封装的方法
import appCommonH from '@/utils/commonHelper'; // 判断设备类型的方法
import choosePosition from '@/mixin/choosePosition'; // 定位的方法
// #endif
import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog'; // 弹出的对话框
import onwTimePicker from '@/components/h5-play/now-time-picker/now-time-picker';
import forumsPermission from '@/mixin/forumsPermission'; // 权限判断
import apiRequest from '../api/new-api';

// 小程序与h5支付setInterval
let payWechat = null;
const payPhone = null;
export default {
  name: 'Post',
  // components: { uniPopupDialog }, // 对话框设置为组件引用
  components: {
    onwTimePicker,
    uniPopupDialog,
  },
  mixins: [
    // 混入方法使之内部可以直接使用
    forums, // 计算属性里添加一个请求数据的方法
    user, // 不知道干嘛的，好像是重复发送请求的
    loginModule, // 用来各种小程序登录请求的
    forumsPermission('other.can_create_thread_question'),
    // #ifdef H5
    tcaptchs, // 1200多行没备注，神仙，看不懂，应该是组件封装的方法
    choosePosition, // 定位的方法
    appCommonH, // 判断设备类型的方法
    // #endif
  ],
  data() {
    return {
      choiceMoney: false, // 标记是否点击的是选择金额
      geographical_location: false, // 添加位置是否显示
      anonymity_show: false, // 匿名是否显示
      timeValue: '', // 显示时间
      save: false, // 帖子保存，防止上一个保存还没成功就发下一个保存了
      currentId: '', // 帖子类型
      timer1: null, // 准备启动自动保存
      timer2: null, // 自动保存
      SecondaryClassification: '', // 二级分类参数
      isCateAxtive: -1,
      expired_at: '', // 悬赏贴过期时间
      expired_time: false, // 时间差
      titlexune: '已添加0个标题',
      secondallcategories: [], // 二级分类
      two_categoryId: '', // 二级分类选中
      vditor: null,
      navTitle: '发布', // 导航栏标题
      loadStatus: '',
      textAreaValue: '', // 输入框内容
      markdownShow: false, // 是否显示markdown菜单
      barStatus: false, // 是否显示输入框获取焦点时完成的那一栏
      textAreaLength: 5000, // 输入框可输入字
      textAnswerLength: 5000, // 问答输入框可输入字
      postTitle: '', // 标题
      checkClassData: [],
      type: 0, // 帖子类型
      price: 0, // 付费金额
      priceAsk: 0, // 提问价格
      pwdVal: '', // 提问价格的支付密码
      browser: 0, // 是不是浏览器
      inputPrice: '', // 付费金额输入框
      maxLength: 7, // 输入框长度
      inputWord: '', // 查看字数输入框
      operating: '', // 编辑或发布类型
      emojiShow: false, // 表情是否显示
      textShow: true, // 文本域是否显示
      header: {}, // 图片请求头部
      formData: {}, // 图片请求data
      captcha: null, // 腾讯云验证码实例
      captcha_ticket: '', // 腾讯云验证码返回票据
      captcha_rand_str: '', // 腾讯云验证码返回随机字符串
      userImage: '', // 被提问用户的头像
      beUserName: '', // 被提问用户的用户名
      checked: false, // 是否匿名
      watchChecked: false, // 他人围观
      watchShow: false, // 是否显示他人围观
      payShowStatus: true, // 是否显示支付
      haveDate: 0, // 你得
      answerIsDate: 0, // 回答者得
      platformDate: 0, // 平台得
      askingPrice: true, // 显示提问价格
      payNum: [
        // 弹出的红包金额的渲染数组
        {
          name: '￥1',
          pay: 1,
        },
        {
          name: '￥2',
          pay: 2,
        },
        {
          name: '￥5',
          pay: 5,
        },
        {
          name: '￥10',
          pay: 10,
        },
        {
          name: '￥20',
          pay: 20,
        },
        {
          name: '￥50',
          pay: 50,
        },
        {
          name: '￥88',
          pay: 88,
        },
        {
          name: '￥128',
          pay: 128,
        },
        {
          name: this.i18n.t('discuzq.post.customize'),
          pay: 0,
        },
      ], // 付费金额
      payNumCheck: [
        // 付费金额选中
        {
          name: '',
          pay: 0,
        },
      ], // 付费金额选中
      freepercentage: [
        // 免费字数的百分比的数组
        {
          name: '0%',
          pay: 0,
        },
        {
          name: '10%',
          pay: 0.1,
        },
        {
          name: '30%',
          pay: 0.3,
        },
        {
          name: '50%',
          pay: 0.5,
        },
        {
          name: '70%',
          pay: 0.7,
        },
        {
          name: '100%',
          pay: 1,
        },
      ],
      freewords: [], // 免费字数选中
      percentagedisplay: '0%',
      uploadFile: [], // 图片上传列表
      cursor: 0, // 内容输入框光标未知
      wordCountCheck: [
        {
          name: this.i18n.t('discuzq.post.word', {
            num: 0,
          }),
          num: 0,
        },
      ], // 查看字数选中
      word: 0, // 可查看字数
      setType: 'pay', // 金额或查看字
      controlsStatus: false, // 是否显示默认播放控件
      videoBeforeList: [], // 视频上传列表
      audioBeforeList: [], // 语音上传列表
      fullscreenStatus: false, // 视频全屏状态
      videoName: '', // 视频名称
      percent: 0, // 视频上传进度
      // videoPercent: 0, // 视频上传进度，用来控制进度条
      fileId: '', // 视频ID
      url: '', // 视频url
      postLoading: false, // 发布按钮loading状态
      allCategories: [], // 所有分类
      categoryIndex: '', // 分类下标
      categoryId: '', // 分类id
      threadId: '', // 编辑时主题id
      firstPostId: '', // 编辑时帖子id
      postDetails: {}, // 编辑时帖子详情
      filePreview: [], // 服务器上传
      uploadStatus: true, // 图片上传状态
      showHidden: true, // 付费金额的显示隐藏
      ticket: '',
      randstr: '',
      captchaResult: {},
      attachmentList: [], // 附件列表
      signatureVal: '',
      deleteType: '', // 删除类型 0为图片，1为附件，2为视频
      deleteId: '', // 当前点击要删除的图片Id
      deleteIndex: '', // 当前点击要删除的图片index
      deleteTip: '确定删除吗？', // 删除提示
      wechatTip: this.i18n.t('discuzq.wechatBind'), // 微信绑定提示
      currentPosition: {},
      watchMoeny: '1', // 他人付费需付费多少元
      beAskId: '', // 被提问人ID
      payTypeText: '', // 支付提问价格文案
      orderSn: '', // 提问支付订单号
      coverLoading: false, // 提问支付遮罩层
      payStatus: false, // 订单支付状态
      payTypeData: [
        // 微信支付和钱包支付的渲染数据
        {
          name: '微信支付',
          icon: 'icon-wxPay',
          color: '#09bb07',
          value: '0',
        },
        {
          name: '钱包支付',
          icon: 'icon-walletPay',
          color: '#1878f3',
          value: '1',
        },
      ], // 支付方式
      chooseType: 1, // 视频是从首页上传的还是从发布页上传的
      payType: 0, //  查看付费的方式，  0均免费， 1内容免费，附件付费，  2内容和附件都付费
      showPayType: '', // 选择的支付方式
      ioshide: false, // ios下付费隐藏
      isShowGoods: true,
      dataGoodInfo: {},
      dataGoodInfoPrice: 0, // 商品价格
      goodsId: '', // 商品ID
      categoryid: 0,
      categoryindex: 0,
      postShow: false,
      popupStatus: false, // 这是自定义金额或者自定义字数弹框显示状态
      canUploadAttachment: false, // 用户上传附件权限
    };
  },
  computed: {
    // 计算属性
    ...mapState({
      getAtMemberData: state => state.atMember.atMemberData,
    }),
    showPrice() {
      let pay = '';
      if (this.priceAsk > 0) {
        pay = `￥${this.priceAsk + this.i18n.t('discuzq.post.yuan')}`;
      }
      return pay;
    },
    showAskPrice() {
      let payAsk = this.i18n.t('discuzq.post.free');
      if (this.priceAsk <= 0) {
        payAsk = this.i18n.t('discuzq.post.free');
      } else {
        payAsk = `￥${this.priceAsk + this.i18n.t('discuzq.post.yuan')}`;
      }
      return payAsk;
    },
    currentLoginId() {
      const userId = this.$store.getters['session/get']('userId');
      return parseInt(userId, 10);
    },
  },
  updated() {
    // 数据更新后
    this.geographical_location_show();
    if (this.forums && this.type === 5) {
      this.platformDate = (
        this.forums.set_site.site_onlooker_price *
        (this.forums.set_site.site_master_scale / 10)
      ).toFixed(2);
      this.haveDate = ((this.forums.set_site.site_onlooker_price - this.platformDate) / 2).toFixed(
        2,
      );
      this.answerIsDate = (
        this.forums.set_site.site_onlooker_price -
        this.platformDate -
        this.haveDate
      ).toFixed(2);
    }
    // #ifndef MP-WEIXIN
    this.$nextTick(() => {
      if (this.$refs.textarea) {
        this.$refs.textarea.$refs.textarea.style.overflowY = 'auto';
        this.$refs.textarea.$refs.textarea.style.paddingRight = '10px';
      }
    });
    // #endif
    uni.$on('uploadVideoOver', data => {
      // 这是计算周期里获取到的上传后的数据
      this.percent = 1;
      if (data.doneResult) {
        this.fileId = data.doneResult.fileId;
      }
      if (data.result) {
        this.fileId = data.result.fileId;
      }
    });
  },
  mounted() {
    // 监听自动保存
    this.onStartSave();
  },
  beforeDestroy() {
    this.save = true;
    clearInterval(this.timer1);
    this.timer1 = null;
    clearInterval(this.timer2);
    this.timer2 = null;
  },
  methods: {
    // 位置和匿名是否显示
    geographical_location_show() {
      if (this.type === 5 && this.forums.other.can_create_thread_question_position) {
        this.geographical_location = true;
      }
      if (this.type === 5 && this.forums.other.can_create_thread_question_anonymous) {
        this.anonymity_show = true;
      }
    },
    // 判断时间是否合理
    isTimeReasonable(timeRea) {
      const newtime = timeRea.split(' ');
      const newtime0 = newtime[0].split('-');
      const newtime1 = newtime[1].split(':');
      const newTime = [...newtime0, ...newtime1];
      const _year = parseInt(newTime[0], 10);
      let _month = parseInt(newTime[1], 10) - 1;
      let _day = parseInt(newTime[2], 10);
      let _hour = parseInt(newTime[3], 10);
      let _minute = parseInt(newTime[4], 10);
      const _second = parseInt(newTime[5], 10);
      const setDay = new Date(_year, _month, _day, _hour, _minute, _second);
      const timeDifference = setDay.getTime() - Date.now();
      const minSetTime = 60 * 60 * 23;
      if (minSetTime >= timeDifference / 1000) {
        this.expired_time = false;
      } else {
        this.expired_time = true;
        _month = parseInt(_month, 10) + 1;
        _month = _month < 10 ? `0${_month}` : _month;
        _day = _day < 10 ? `0${_day}` : _day;
        _hour = _hour < 10 ? `0${_hour}` : _hour;
        _minute = _minute < 10 ? `0${_minute}` : _minute;
        this.timeValue = `设置时间: ${_year}-${_month}-${_day} ${_hour}:${_minute}`;
      }
    },
    // 回显悬赏金额和结束时间
    echoMoneyAndTime(threadId) {
      this.$store.dispatch('jv/get', [`threads/${threadId}`, {}]).then(res => {
        console.log(res);
        this.priceAsk = parseInt(res.questionTypeAndMoney.money, 10);
        this.checked = res.isAnonymous;
        this.isTimeReasonable(res.questionTypeAndMoney.expired_at);
        this.expired_at = res.questionTypeAndMoney.expired_at;
      });
    },
    // 手动保存草稿箱
    toDraftsing() {
      if (this.textAreaValue.length < 1 && this.price < 1 && !this.expired_at) {
        this.$refs.toast.show({
          message: '草稿箱内容不能为空',
        });
        return false;
      }
      if (!this.categoryId) {
        this.$refs.toast.show({
          message: '分类不能为空',
        });
        return false;
      }
      this.save = true;
      clearInterval(this.timer1);
      this.timer1 = null;
      clearInterval(this.timer2);
      this.timer2 = null;
      // 手动保存成功
      const params = {
        _jv: {
          type: 'threads',
          relationships: {
            category: {
              data: {
                type: 'categories',
                id: this.two_categoryId || this.categoryId,
              },
            },
            question: {
              data: {
                type: 0,
                expired_at: this.expired_at,
                be_user_id: 0,
                order_id: this.orderSn,
                price: this.priceAsk,
                is_onlooker: this.checked,
              },
            },
          },
          links: {
            self:
              'threads?include=user,category,firstPost,firstPost.images,firstPost.postGoods,question,question.beUser,question.beUser.groups,question.images',
          },
        },
        content: this.textAreaValue,
        type: this.type,
        price: this.price,
        free_words: this.word,
        captcha_ticket: this.ticket,
        captcha_rand_str: this.randstr,
        is_anonymous: this.checked,
        is_red_packet: this.is_red_packet,
        is_draft: 1,
        is_old_draft: 0,
        id: this.currentId,
        redPacket: {
          rule: +this.rule,
          money: +this.money,
          number: +this.number,
          condition: +this.condition,
          likenum: +this.likenum,
        },
      };
      if (this.payType === 1) {
        params.attachment_price = this.price;
        params.price = '';
      } else if (this.payType === 0) {
        params.attachment_price = '';
        params.price = this.price;
      }
      const { currentPosition } = this;
      params.longitude = currentPosition.longitude || '';
      params.latitude = currentPosition.latitude || '';
      params.location = currentPosition.location || '';
      params.address = currentPosition.address || '';
      const postPromise = new Promise((resolve, reject) => {
        switch (this.type) {
          case 0:
            resolve();
            break;
          case 1:
            params.title = this.postTitle;
            params._jv.relationships.attachments = {
              data: this.addImg().data.concat(this.addFile().data),
            };
            resolve();
            break;
          case 2:
            params.file_id = this.fileId;
            params.file_name = this.videoName;
            resolve();
            break;
          case 3:
            params._jv.relationships.attachments = this.addImg();
            resolve();
            break;
          case 4:
            params.file_id = this.audioBeforeList[0].id;
            params.file_name = this.audioBeforeList[0].fileName;
            resolve();
            break;
          case 5:
            params._jv.relationships.attachments = this.addImg();
            // params._jv.relationships.question = this.addQuestion();
            resolve();
            break;
          case 6:
            params.post_goods_id = this.dataGoodInfo._jv.id;
            resolve();
            break;
          default:
            reject();

            this.$refs.toast.show({ message: this.i18n.t('core.postTypesDoNotMatch') }); // ~帖子类型不匹配，请重新进入本页面
        }
      });
      postPromise.then(() => {
        this.$store
          .dispatch('jv/post', params)
          .then(res => {
            if (!this.currentId) {
              this.currentId = res._jv.id;
            }
            // 这是手动发到草稿箱时接口返回的
            this.$refs.toast.show({ message: this.i18n.t('保存成功') });
          })
          .catch(err => {
            console.log(err);
          });
      });
    },

    // 自动保存草稿方法
    toDrafts() {
      this.save = true;
      const params = {
        _jv: {
          type: 'threads',
          relationships: {
            category: {
              data: {
                type: 'categories',
                id: this.two_categoryId || this.categoryId,
              },
            },
            question: {
              data: {
                type: 0,
                expired_at: this.expired_at,
                be_user_id: 0,
                order_id: this.orderSn,
                price: this.priceAsk,
                is_onlooker: this.checked,
              },
            },
          },
          links: {
            self:
              'threads?include=user,category,firstPost,firstPost.images,firstPost.postGoods,question,question.beUser,question.beUser.groups,question.images',
          },
        },
        free_words: this.word,
        captcha_ticket: this.ticket,
        captcha_rand_str: this.randstr,
        is_draft: 1,
        is_old_draft: 0,
        id: this.currentId,
        price: 0,
        attachment_price: '',
        title: '',
        type: 5,
        content: this.textAreaValue,
        is_anonymous: this.checked,
        longitude: '',
        latitude: '',
        location: '',
        redPacket: {
          rule: +this.rule,
          money: +this.money,
          number: +this.number,
          condition: +this.condition,
          likenum: +this.likenum,
        },
      };
      if (this.payType === 1) {
        params.attachment_price = this.price;
        params.price = '';
      } else if (this.payType === 0) {
        params.attachment_price = '';
        params.price = this.price;
      }

      const { currentPosition } = this;
      params.longitude = currentPosition.longitude || '';
      params.latitude = currentPosition.latitude || '';
      params.location = currentPosition.location || '';
      params.address = currentPosition.address || '';
      const postPromise = new Promise((resolve, reject) => {
        switch (this.type) {
          case 0:
            resolve();
            break;
          case 1:
            params.title = this.postTitle;
            params._jv.relationships.attachments = {
              data: this.addImg().data.concat(this.addFile().data),
            };
            resolve();
            break;
          case 2:
            params.file_id = this.fileId;
            params.file_name = this.videoName;
            resolve();
            break;
          case 3:
            params._jv.relationships.attachments = this.addImg();
            resolve();
            break;
          case 4:
            params.file_id = this.audioBeforeList[0].id;
            params.file_name = this.audioBeforeList[0].fileName;
            resolve();
            break;
          case 5:
            params._jv.relationships.attachments = this.addImg();
            // params._jv.relationships.question = this.addQuestion();
            resolve();
            break;
          case 6:
            params.post_goods_id = this.dataGoodInfo._jv.id;
            resolve();
            break;
          default:
            reject();
            this.$refs.toast.show({ message: this.i18n.t('core.postTypesDoNotMatch') }); // ~帖子类型不匹配，请重新进入本页面
        }
      });
      postPromise.then(() => {
        this.$store
          .dispatch('jv/post', [params, { custom: { loading: false } }])
          .then(res => {
            this.save = false;
            if (!this.currentId) {
              this.currentId = res._jv.id;
            }
          })
          .catch(err => {
            console.log(err);
          });
      });
    },
    onStartSave() {
      // 监听自动保存;
      this.timer1 = setInterval(() => {
        if (!this.categoryId || this.textAreaValue.length === 0) return;
        this.startSave();
        clearInterval(this.timer1);
        this.timer1 = null;
      }, 120000);
    },
    startSave() {
      // 开始自动保存
      // 自动保存 启动中'
      this.timer2 = setInterval(() => {
        if (this.save) {
          // 必须得上一条数据回来才能发下一条呢
        } else {
          this.toDrafts();
        }
      }, 120000);
    },
    // 设置显示时间
    setTimes(time) {
      this.timeValue = time;
    },
    // 获取时间
    getTimes(e, val) {
      const minSetTime = 60 * 60 * 23;
      if (minSetTime >= e) {
        uni.showToast({
          title: '设置时间不能小于24小时',
          icon: 'none',
        });
        return;
      }
      uni.showToast({
        title: '设置时间成功',
        icon: 'none',
      });
      this.expired_time = true;

      const setTime = `${val}:00`;
      this.expired_at = setTime;
    },
    // 弹出悬赏时间结束
    selectEndTime() {
      this.$refs.setEndTime.open();
    },
    focusEvent() {},
    addGoods() {
      if (this.operating === 'edit') {
        uni.redirectTo({
          url: `/pages/topic/parse-goods?type=${this.type}&operating=edit&threadId=${this.threadId}`,
        });
      } else {
        uni.redirectTo({
          url: `/pages/topic/parse-goods?type=${this.type}`,
        });
      }
    },
    deleteGoods() {
      this.dataGoodInfo = [];
      this.isShowGoods = false;
    },
    // 匿名提问
    changeCheck() {
      // this.checked !== this.checked;
      // this.is_onlooker === this.is_onlooker;
      // 是否匿名提问
    },
    // 暂存帖子信息，以防选完地址回来页面刷新后丢失
    saveThread() {
      uni.removeStorageSync('current_thread');
      if (this.type === 1) {
        this.textAreaValue = this.vditor.getValue();
      }
      const thread = {};
      const items = [
        'postTitle',
        'price',
        'word',
        'fileId',
        'videoName',
        'textAreaValue',
        'categoryIndex',
        'categoryId',
        'checkClassData',
        'uploadFile',
        'videoBeforeList',
        'audioBeforeList',
        'checked',
        'watchChecked',
        'askingPrice',
        'watchShow',
        'priceAsk',
        'beAskId',
        'userImage',
        'beUserName',
        'type',
        'showHidden',
        'payType',
        'showPayType',
        'ioshide',
        'dataGoodInfo',
      ];
      items.forEach(key => {
        if (this[key]) {
          thread[key] = this[key];
        }
      });
      if (this.$refs.uploadFiles) {
        const fileList = this.$refs.uploadFiles.getValue();
        const attachmentList = [];
        fileList.forEach(v => {
          attachmentList.push({
            fileName: v.attributes.fileName,
            url: v.attributes.url,
            _jv: {
              id: v.id,
            },
          });
        });
        thread.attachmentList = attachmentList;
      }
      if (this.$refs.upload) {
        const imgList = this.$refs.upload.getValue();
        imgList.forEach((value, index) => {
          if (value.attributes) {
            imgList[index] = {
              path: value.attributes.thumbUrl,
              id: value.id,
              order: value.attributes.order,
              name: value.attributes.fileName,
              url: value.attributes.url,
            };
          }
        });
        thread.imgList = imgList;
      }
      uni.setStorageSync('current_thread', JSON.stringify(thread));
      // #ifdef H5-PLAY || MP-WEIXIN-PLAY
      uni.setStorageSync('current_expired_at', JSON.stringify(this.expired_at));
      // #endif
    },
    choosePosition() {
      const that = this;
      if (that.currentPosition.location) {
        return;
      }
      // #ifdef H5
      this.saveThread();
      this.getPosition();
      // #endif
      // #ifdef MP-WEIXIN
      uni.getSetting({
        success(res) {
          if (!res.authSetting['scope.userLocation']) {
            uni.authorize({
              scope: 'scope.userLocation',
              success() {
                uni.chooseLocation({
                  success(res1) {
                    const positionData = res1;
                    positionData.location = res1.name;
                    that.currentPosition = positionData;
                  },
                });
              },
            });
          } else {
            uni.chooseLocation({
              success(res1) {
                const positionData = res1;
                positionData.location = res1.name;
                that.currentPosition = positionData;
              },
            });
          }
        },
      });
      // #endif
    },
    clearPosition() {
      this.currentPosition = {};
    },
    checkNum(e) {
      const that = this;
      let price = e.target.value;
      const maxLength = price.indexOf('.');
      if (price.indexOf('.') < 0 && price !== '') {
        // '超过4位则大于1万元';
        if (price.length > 6) {
          price = price.substring(0, price.length - 1);
          uni.showToast({
            title: that.c.TheAmountCannotExceedOneMillion,
            icon: 'none',
          });
        } else {
          price = parseFloat(price);
        }
      } else if (price.indexOf('.') === 0) {
        // '首位小数点情况'
        price = price.replace(/[^$#$]/g, '0.');
        price = price.replace(/\.{2,}/g, '.');
      } else if (!/^(\d?)+(\.\d{0,2})?$/.test(price)) {
        // 去掉最后一位
        price = price.substring(0, price.length - 1);
      }
      that.$nextTick(() => {
        // '有小数点时，最大长度为9位，没有则是7位'
        that.maxLength = maxLength === -1 ? 7 : 10;
        that.inputPrice = price;
      });
    },
    fullscreenchange(e) {
      this.fullscreenStatus = e.detail.fullScreen;
      if (!e.detail.fullScreen) {
        this.controlsStatus = false;
        this.videoContext.pause();
      }
    },
    // 点击表情
    emojiclick() {
      this.emojiShow = !this.emojiShow;
      this.textShow = !this.textShow;
    },
    // 弹框相关方法
    contBlur(e) {
      this.cursor = e.detail.cursor;
    },
    diaLogClose() {
      this.$refs.popup.close();
      this.popupStatus = false;
      this.textShow = true;
    },
    // 自定义悬赏金额数
    diaLogOk() {
      const inputPriceSrt = `${this.inputPrice}`;
      if (!/^\d+(\.\d{1,2})?$/.test(inputPriceSrt)) {
        uni.showToast({
          title: '只能精确到小数点后两位',
          icon: 'none',
        });
        return;
      }
      if (this.forums.set_site.site_minimum_amount === '') {
        if (this.inputPrice < 0.1) {
          uni.showToast({
            title: '悬赏金额不能少于0.1元',
            icon: 'none',
          });
          return;
        }
      } else if (this.inputPrice < this.forums.set_site.site_minimum_amount) {
        uni.showToast({
          title:
            this.i18n.t('core.TheAmountCannotBeLessThanMinMoney') +
            this.forums.set_site.site_minimum_amount +
            this.i18n.t('discuzq.post.yuan'),
          icon: 'none',
        });
        return;
      }
      if (this.inputPrice >= 10000) {
        uni.showToast({
          title: '悬赏金额应低于10000元',
          icon: 'none',
        });
        return;
      }
      if (this.type === 5) {
        this.priceAsk = this.inputPrice;
        // 锚点
        this.$refs.popup.close();
        this.popupStatus = false;
        this.textShow = true;
        this.postClick();
        return;
      }

      if (this.setType === 'pay') {
        this.price = this.inputPrice;
      } else {
        this.word = this.inputWord;
      }
      this.$refs.popup.close();
      this.popupStatus = false;
      this.textShow = true;
    },
    percentageClick(index) {
      this.word = this.freepercentage[index].pay;
      this.percentagedisplay = this.freepercentage[index].name;
      this.setType = 'word';
      this.freewords = [];
      this.freewords.push(this.freepercentage[index]);
      this.$refs.popupBtm.close();
    },
    moneyClick(index) {
      this.choiceMoney = true;
      this.setType = 'pay';
      this.payNumCheck = [];
      this.payNumCheck.push(this.payNum[index]);
      if (this.payNumCheck[0].name === this.i18n.t('discuzq.post.customize')) {
        // 自定义金额
        this.textShow = false;
        this.$refs.popupBtm.close();
        this.popupStatus = true;
        this.$nextTick(() => {
          this.inputPrice = '';
          this.$refs.popup.open();
          this.textShow = false;
        });
      } else {
        this.price = this.payNumCheck[0].pay;
        this.priceAsk = this.payNumCheck[0].pay;
        this.$refs.popupBtm.close();
        this.postClick();
        this.textShow = true;
      }
    },
    // 点击显示查看支付的抽屉
    lookPay() {
      this.$refs.lookPayPopup.open();
    },
    // 取消查看支付选择
    cancelLookPay() {
      this.$refs.lookPayPopup.close();
    },
    // 选择支付查看的方式 0均免费， 1内容免费，附件付费，  2内容和附件都付费
    choicePayType(type) {
      this.payType = type;
      this.$refs.lookPayPopup.close();
    },
    cellClick(type) {
      this.setType = type;
      this.$refs.popupBtm.open();
      this.textShow = false;
    },
    // 提问价格
    postAnswerClick() {
      this.$refs.popupBtm.open();
      this.textShow = false;
    },
    cancel() {
      this.$refs.popupBtm.close();
      this.textShow = true;
    },
    // 图片上传相关方法
    uploadClick(e) {
      this.uploadStatus = e;
    },
    uploadChange(e, status) {
      this.uploadFile = e;
      this.uploadStatus = status;
    },
    uploadClear(list, del) {
      const { id } = list;
      this.deleteType = 0;
      this.deleteId = id;
      this.deleteIndex = del;
      this.$refs.deletePopup.open();
      this.deleteTip = this.i18n.t('core.deleteImgSure');
    },
    audioDel() {
      this.deleteType = 3;
      this.$refs.deletePopup.open();
      this.deleteTip = this.i18n.t('core.deleteAudioSure');
    },
    // 表情点击事件
    getEmojiClick(code) {
      let text = '';
      text = `${this.textAreaValue.slice(0, this.cursor) +
        code +
        this.textAreaValue.slice(this.cursor)}`;
      this.cursor = text.length;
      this.textAreaValue = text;
      this.emojiShow = false;
      this.textShow = true;
    },
    // @人员跳转
    callClick() {
      uni.navigateTo({
        url: '/pages/user/at-member',
      });
    },
    topicPage() {
      uni.navigateTo({
        url: '/pages/topic/topic',
      });
    },
    // 分类点击
    checkClass(e, index, fid) {
      // 当前一级分类
      // 单选功能
      this.two_categoryId = '';
      this.checkClassData = [];
      // this.categoryIndex = index;//变红的下标变这个底下的
      if (+this.categoryId !== +fid) {
        this.categoryId = fid;
        this.checkClassData.push(e);
        this.secondallcategories = e.children || []; // 二级分类点击事件
      } else {
        this.categoryId = '';
      }
    },
    // 点击二级分类
    checkClassCh(i, index) {
      // 当前二级分类
      this.isCateAxtive = index;
      this.SecondaryClassification = i.search_ids;
    },
    checkClassing(e, index, id) {
      // 二级下拉单选功能
      // 当前二级分类
      if (+this.two_categoryId !== +id) {
        this.two_categoryId = id;
      } else {
        this.two_categoryId = '';
      }
    },
    // 主题提问价格
    payClickShow() {
      if (!this.$store.getters['session/get']('isLogin')) {
        // #ifdef MP-WEIXIN
        this.mpLoginMode();
        // #endif
        // #ifdef H5
        this.$store.dispatch('session/setUrl', this.curUrl);
        this.h5LoginMode();
        // #endif
      }
      this.payStatus = false;
      if (!this.forums.paycenter.wxpay_close) {
        this.payShowStatus = false;
        return;
      }
      if (this.forums.paycenter.wxpay_close && this.forums.other.can_create_thread_paid) {
        // #ifndef H5
        if (this.system === 'ios') {
          this.postShow = true;
          this.payShowStatus = false;
          this.ioshide = false;
          return;
        }
        this.ioshide = true;
        this.payShowStatus = true;

        // #endif
        // #ifdef H5
        this.ioshide = true;
        this.payShowStatus = true;
        // #endif
      } else {
        this.ioshide = false;
        this.payShowStatus = false;
        return;
      }
      this.payTypeText = this.t.pay + this.t.payAskingPrice;
      this.priceAsk = parseFloat(this.thread.price);
      this.$nextTick(() => {
        this.$refs.payShow.payClickShow(this.payTypeVal);
      });
    },
    setThread() {
      let thread = uni.getStorageSync('current_thread');
      if (!thread) {
        return;
      }
      thread = JSON.parse(thread);
      // #ifdef H5-PLAY || MP-WEIXIN-PLAY
      const threadExpiredAt = uni.getStorageSync('current_expired_at');
      if (threadExpiredAt !== '""') {
        this.expired_at = JSON.parse(threadExpiredAt);
        this.isTimeReasonable(this.expired_at);
        uni.removeStorageSync('current_expired_at');
      }
      // #endif
      this.dataGoodInfo = thread.dataGoodInfo;
      Object.getOwnPropertyNames(thread).forEach(key => {
        if (key === 'imgList') {
          const threadImgList = thread[key];
          threadImgList.forEach((v, index) => {
            threadImgList[index] = {
              thumbUrl: v.path,
              _jv: {
                id: v.id,
              },
              order: v.order,
              fileName: v.name,
              url: v.url,
            };
          });
          const image = { firstPost: { images: [] } };
          image.firstPost.images = thread[key];
          this.setAnnex('img', image);
        } else {
          this[key] = thread[key];
        }
      });
      if (this.videoBeforeList.length > 0) {
        // this.videoPercent = 1;
        this.percent = 1;
      }

      uni.removeStorageSync('current_thread');
    },
    // 支付方式选择完成点击确定时
    paysureShow(payType) {
      uni.setStorage({
        key: 'page',
        data: `/topic/post?type=5&categoryId=${this.categoryid}&categoryIndex=${this.categoryindex}`,
      });
      if (payType === 0) {
        // #ifdef H5
        if (this.isWeixin === true && this.user.wechat === undefined) {
          this.$refs.wechatPopup.open();
          return;
        }
        if (this.isWeixin === true && this.user.wechat && this.user.wechat.mp_openid === '') {
          this.$refs.wechatPopup.open();
          return;
        }
        // #endif

        // #ifdef MP-WEIXIN
        if (
          this.user.wechat === undefined ||
          (this.user.wechat && this.user.wechat.min_openid === '')
        ) {
          this.$refs.wechatPopup.open();
          return;
        }
        // #endif
        this.creatOrder(this.priceAsk, 5, '', payType);
      } else if (payType === 1) {
        // 这是详情页获取到的支付方式---钱包
      }
    },
    // 输入密码完成时
    onInput(val) {
      this.value = val;
      this.creatOrder(this.priceAsk, 5, val, 1);
    },
    creatOrder(amount, type, value, payType) {
      const userId = this.$store.getters['session/get']('userId');
      const params = {
        _jv: {
          type: 'orders',
        },
        type,
        payee_id: userId,
        amount,
        is_anonymous: this.checked ? '0' : '1',
      };
      this.$store
        .dispatch('jv/post', params)
        .then(res => {
          this.orderSn = res.order_sn;
          if (payType === 0) {
            // 微信支付
            if (this.browser === 0) {
              // 这是微信小程序内的支付
              this.orderPay(13, value, this.orderSn, payType, '0');
              // 这是除微信小程序之外, this.isWeixin, this.isPhone
            } else if (this.isWeixin && this.isPhone) {
              // 这是微信浏览器
              this.orderPay(12, value, this.orderSn, payType, '1');
            } else if (this.isPhone) {
              this.orderPay(20, value, this.orderSn, 1, '2');
            } else {
              // 这是pc，没调接口之前
              this.orderPay(10, value, this.orderSn, payType, '3');
            }
          } else if (payType === 1) {
            // 钱包支付
            this.orderPay(20, value, this.orderSn, payType);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 订单支付       broswerType: 0是小程序，微信1是浏览器，2是h5，3是pc
    orderPay(type, value, orderSn, payType, broswerType) {
      let params = {};
      if (payType === 0) {
        params = {
          _jv: {
            type: `trade/pay/order/${orderSn}`,
          },
          payment_type: type,
        };
      } else if (payType === 1) {
        params = {
          _jv: {
            type: `trade/pay/order/${orderSn}`,
          },
          payment_type: type,
          pay_password: value,
        };
      }
      this.$store
        .dispatch('jv/post', params)
        .then(res => {
          this.wxRes = res;
          if (payType === 0) {
            if (broswerType === '0') {
              this.wechatPay(
                res.wechat_js.timeStamp,
                res.wechat_js.nonceStr,
                res.wechat_js.package,
                res.wechat_js.signType,
                res.wechat_js.paySign,
              );
            } else if (broswerType === '1') {
              if (typeof WeixinJSBridge === 'undefined') {
                if (document.addEventListener) {
                  document.addEventListener('WeixinJSBridgeReady', this.onBridgeReady(res), false);
                } else if (document.attachEvent) {
                  document.attachEvent('WeixinJSBridgeReady', this.onBridgeReady(res));
                  document.attachEvent('onWeixinJSBridgeReady', this.onBridgeReady(res));
                }
              } else {
                this.onBridgeReady(res);
              }
            } else if (broswerType === '2') {
              this.postThread().then(re => {
                // window.location.href = `${res.wechat_h5_link}&redirect_url=${encodeURIComponent(window.location.origin /topic/indexdex?id='+ data._jv.id)}`;
                this.postLoading = false;
                uni.hideLoading();
                if (re && re.isApproved === 1) {
                  // 因为设置了虚拟滚动，所以将会去除所有对列表数据的操作，只会刷新才会更新现有数据
                  // this.$u.event.$emit('addThread', res);
                }
                if (re && re.Data && re.Data.id) {
                  uni.redirectTo({
                    url: `/topic/index?id=${re.Data.id}`,
                  });
                }
              });
            } else if (broswerType === '3') {
              if (res) {
                this.codeUrl = res.wechat_qrcode;
                this.payShowStatus = false;
                this.$refs.codePopup.open();
                this.qrcodeShow = true;
                payWechat = setInterval(() => {
                  if (this.payStatus === 1) {
                    clearInterval(payWechat);
                    return;
                  }
                  this.getOrderStatus(this.orderSn, broswerType);
                  uni.hideLoading();
                }, 3000);
              }
            }
          } else if (payType === 1) {
            if (res.wallet_pay.result === 'success') {
              this.$store.dispatch('jv/get', [`users/${this.currentLoginId}`, {}]);
              this.coverLoading = false;
              this.postThread().then(r => {
                this.postLoading = false;
                uni.hideLoading();
                if (r && r.Data && r.Data.id) {
                  uni.redirectTo({
                    url: `/topic/index?id=${r.Data.id}`,
                  });
                }
              });
            }
            this.coverLoading = false;
          }
        })
        .catch(err => {
          // 清空支付的密码
          console.log(err);
          this.$refs.payShow.clearPassword();
        });
    },
    getOrderStatus(orderSn, broswerType) {
      this.$store
        .dispatch('jv/get', [`orders/${orderSn}`, { custom: { loading: false } }])
        .then(res => {
          this.payStatus = res.status;
          if (this.payStatus === 1) {
            if (broswerType === '2') {
              // return false;
            } else if (broswerType === '3') {
              // 这是pc扫码支付完成
              this.$refs.codePopup.close();
              this.qrcodeShow = false;
              this.postThread();
            } else if (broswerType === '0') {
              this.postThread().then(data => {
                this.postLoading = false;
                uni.hideLoading();
                if (data && data.isApproved === 1) {
                  // 因为设置了虚拟滚动，所以将会去除所有对列表数据的操作，只会刷新才会更新现有数据
                  this.$u.event.$emit('refreshHome', data);
                }
                if (data && data.Data && data.Data.id) {
                  uni.redirectTo({
                    url: `/topic/index?id=${data.Data.id}`,
                  });
                }
              });
            } else if (broswerType === '1') {
              this.postThread().then(dat => {
                this.postLoading = false;
                uni.hideLoading();
                if (dat && dat.isApproved === 1) {
                  // 因为设置了虚拟滚动，所以将会去除所有对列表数据的操作，只会刷新才会更新现有数据
                  this.$u.event.$emit('refreshHome', dat);
                }
                if (dat && dat.Data && dat.Data.id) {
                  uni.redirectTo({
                    url: `/topic/index?id=${dat.Data.id}`,
                  });
                }
              });
            }
            this.$refs.toast.show({ message: this.i18n.t('pay.paySuccess') });
          }
        })
        .catch(err => {
          console.log(err);
          this.coverLoading = false;
          this.$refs.toast.show({ message: this.i18n.t('pay.payFail') });
        });
    },
    wechatPay(timeStamp, nonceStr, packageVal, signType, paySign) {
      // 小程序支付。
      const _this = this;
      uni.requestPayment({
        provider: 'wxpay',
        timeStamp,
        nonceStr,
        package: packageVal,
        signType,
        paySign,
        success() {
          _this.coverLoading = true;
          payWechat = setInterval(() => {
            if (_this.payStatus === 1) {
              clearInterval(payWechat);
              return;
            }
            _this.getOrderStatus(_this.orderSn, '0');
          }, 3000);
        },
        fail() {
          _this.payShowStatus = false;
          _this.coverLoading = false;
          _this.$refs.toast.show({
            message: _this.p.payFail,
          });
        },
      });
    },
    // 非小程序内微信支付
    onBridgeReady(data) {
      // const that = this;
      window.WeixinJSBridge.invoke(
        'getBrandWCPayRequest',
        {
          appId: data.wechat_js.appId, // 公众号名称，由商户传入
          timeStamp: data.wechat_js.timeStamp, // 时间戳，自1970年以来的秒数
          nonceStr: data.wechat_js.nonceStr, // 随机串
          package: data.wechat_js.package,
          signType: 'MD5', // 微信签名方式：
          paySign: data.wechat_js.paySign, // 微信签名
        },
        dat => {
          // alert('支付唤醒');
          if (dat.err_msg === 'get_brand_wcpay_request:ok') {
            // 微信支付成功，进行支付成功处理
          } else if (dat.err_msg === 'get_brand_wcpay_request:cancel') {
            // 取消支付
            clearInterval(payWechat);
            // resolve;
          } else if (dat.err_msg === 'get_brand_wcpay_request:fail') {
            // 支付失败
            clearInterval(payWechat);
            // resolve;
          }
        },
      );
      payWechat = setInterval(() => {
        if (this.payStatus === 1) {
          clearInterval(payWechat);
          return;
        }
        this.getOrderStatus(this.orderSn, '1');
      }, 3000);
    },
    // 发布按钮点击，检测条件是否符合，符合的话调用接口
    postClick() {
      // this.payTypeText = this.i18n.t('topic.pay') + this.i18n.t('discuzq.post.payAskingPrice');
      if (this.priceAsk < 0.1) {
        this.$refs.toast.show({
          message: '悬赏金额不能为空',
        });
        return false;
      }
      if (this.choiceMoney) {
        this.choiceMoney = false;
        return false;
      }
      if (Number(this.categoryId) < 1 && Number(this.two_categoryId) < 1) {
        this.$refs.toast.show({
          message: this.i18n.t('discuzq.post.theclassifyCanNotBeBlank'),
        });
        return false;
      }
      if (this.textAreaValue.length < 1) {
        this.$refs.toast.show({
          message: this.i18n.t('discuzq.post.theContentCanNotBeBlank'),
        });
        return false;
      }
      if (!this.expired_at) {
        this.$refs.toast.show({
          message: '悬赏结束时间不能为空',
        });
        return false;
      }
      if (!this.expired_time) {
        this.$refs.toast.show({
          message: '设置时间不能小于24小时',
        });
        return false;
      }
      if (this.forums.qcloud.qcloud_captcha && this.forums.other.create_thread_with_captcha) {
        if (!this.ticket || !this.randstr) {
          this.toTCaptcha();
          this.payShowStatus = true;
        }
      }
      this.$nextTick(() => {
        this.$refs.payShow.payClickShow();
      });
      if (!this.orderSn) {
        return false;
      }
      clearInterval(this.timer1);
      this.timer1 = null;
      clearInterval(this.timer2);
      this.timer2 = null;
      this.postThread();
    },
    // 编辑回显主题，处理附件
    setAnnex(type, data) {
      const filePreview = [];
      switch (type) {
        case 'img':
          data.firstPost.images.map(item => {
            filePreview.push({
              path: item.thumbUrl,
              id: item._jv.id,
              order: item.order,
              name: item.fileName,
              url: item.url,
            });
            return item;
          });
          this.filePreview = filePreview;
          break;
        case 'video':
          this.videoBeforeList.push({
            path: data.threadVideo.media_url,
          });
          // this.videoPercent = 1;
          break;
        case 'audio':
          this.audioBeforeList.push({
            fileName: data.threadAudio.file_name,
            url: data.threadAudio.media_url,
            id: data.threadAudio.file_id,
          });
          break;
        case 'goods':
          this.dataGoodInfo = data.firstPost.postGoods;
          if (
            data.firstPost.postGoods.price.indexOf('-') !== -1 ||
            Number(data.firstPost.postGoods.price) > 0
          ) {
            this.dataGoodInfoPrice = data.firstPost.postGoods.price;
          } else if (Number(data.firstPost.postGoods.price) <= 0) {
            this.dataGoodInfoPrice = '';
          }
          // this.audioBeforeList.push({
          //   fileName: data.threadAudio.file_name,
          //   url: data.threadAudio.media_url,
          //   id: data.threadAudio.file_id,
          // });
          break;
        default:
          // 没有匹配模式
          break;
      }
    },
    // 发布主题，处理图片
    addImg() {
      const attachments = {};
      attachments.data = [];
      this.uploadFile.forEach(item => {
        if (item) {
          attachments.data.push({
            type: 'attachments',
            id: item.id,
          });
        }
      });
      return attachments;
    },
    // 发布主题，处理附件
    addFile() {
      const attachmentFiles = {};
      attachmentFiles.data = [];
      // if (this.type === 1 && this.$refs.uploadFiles) {
      const newAttachmentList = this.$refs.uploadFiles.getValue();
      newAttachmentList.forEach(item => {
        if (item.id) {
          attachmentFiles.data.push({
            type: 'attachments',
            id: item.id,
          });
        }
      });
      // }
      return attachmentFiles;
    },
    // 发布问题
    addQuestion() {
      const question = {
        data: {
          be_user_id: this.beAskId,
          price: this.priceAsk,
          is_onlooker: this.watchChecked,
          order_id: this.orderSn,
        },
      };
      // if(!this.watchShow){
      //   delete question.data.order_id
      // }
      return question;
    },
    // 删除附件显示弹框
    deleteFile(id) {
      this.deleteTip = this.i18n.t('core.deleteEnclosureSure');
      this.$refs.deletePopup.open();
      this.deleteType = 1;
      this.deleteId = id;
    },
    // 删除附件调用删除接口
    deleteFileSure(id) {
      const params = {
        _jv: {
          type: 'attachments',
          id,
        },
      };
      this.$store.dispatch('jv/delete', params).then(() => {
        this.$refs.uploadFiles.deleteSure();
      });
    },
    // 接口请求
    getCategories() {
      this.$store.dispatch('jv/get', ['categories?filter[createThread]=1', {}]).then(res => {
        this.allCategories = res;
        res.map(item => {
          if (item._jv) {
            if (Number(item._jv.id) === Number(this.categoryId)) {
              this.checkClassData.push(item);
            }
          }
          return item;
        });
      });
    },
    postThread() {
      let categoryid = '';
      // #ifndef H5-PLAY || MP-WEIXIN-PLAY
      categoryid = this.checkClassData[0]._jv.id;
      // #endif
      // #ifdef H5-PLAY || MP-WEIXIN-PLAY
      categoryid = this.two_categoryId || this.categoryId;
      // #endif
      const sun = {
        categoriesId: Number(categoryid),
        content: this.textAreaValue,
        type: 5,
        isAnonymous: this.checked ? 1 : 0,
        price: 0,
        freeWords: this.word,
        id: this.currentId,
        isDraft: 0,
        isOldDraft: this.currentId ? 1 : 0,
        captchaTicket: this.ticket,
        captchaRandStr: this.randstr,
        attachmentPrice: '',
        title: '',
        longitude: '',
        latitude: '',
        location: '',
        question: {
          type: 0,
          price: Number(this.priceAsk),
          orderId: this.orderSn,
          isOnlooker: this.checked,
          beUserId: 0,
          expiredAt: this.expired_at,
        },
        attachments: [],
      };
      const currentPositions = this.currentPosition;
      sun.longitude = Number(currentPositions.longitude) || '';
      sun.latitude = Number(currentPositions.latitude) || '';
      sun.location = currentPositions.location || '';
      sun.address = currentPositions.address || '';
      const postPromise = new Promise(resolve => {
        const Num = this.addImg().data;
        Num.forEach(item => {
          sun.attachments.push({ id: Number(item.id), type: item.type });
        });
        resolve();
      });
      return postPromise.then(() => {
        return apiRequest.createThread({ data: sun }).then(res => {
          return res;
        });
      });
    },
    handleClickOk() {
      this.$refs.deletePopup.close();
      if (this.deleteType === 0) {
        // 删除类型为图片
        this.delAttachments(this.deleteId, this.deleteIndex);
        this.$refs.upload.clear(this.deleteIndex);
        // this.delAttachments(this.deleteId, this.deleteIndex).then(() => {
        //   this.$refs.upload.clear(this.deleteIndex);
        // });
      } else if (this.deleteType === 2) {
        // 删除类型为视频
        this.videoBeforeList = [];
        this.percent = 0;
        // this.videoPercent = 0;
      } else if (this.deleteType === 3) {
        this.audioBeforeList = [];
      }
    },
    handleClickCancel() {
      this.$refs.deletePopup.close();
    },
    // 确认去绑定微信
    handleWechatClickOk() {
      // #ifdef MP-WEIXIN
      this.mpLogin();
      // #endif
      // #ifdef H5
      if (this.isWeixin) {
        this.wxh5Login(0, 0);
      } else {
        uni.showToast({
          icon: 'none',
          title: this.i18n.t('user.unLogin'),
          duration: 2000,
        });
      }
      // #endif
    },
    // 取消去绑定微信
    handleWechatClickCancel() {
      this.$refs.wechatPopup.close();
    },
    delAttachments(id, index) {
      if (this.operating === 'edit') {
        // 这是编辑
        this.$u.event.$emit('deleteImg', {
          threadId: this.postDetails._jv.id,
          index,
        });
        const post = this.$store.getters['jv/get'](`posts/${this.postDetails.firstPost._jv.id}`);
        post.images.splice(index, 1);
        post._jv.relationships.images.data.splice(index, 1);
      }
    },
    getSignature(callBack) {
      this.$store.dispatch('jv/get', ['signature', {}]).then(res => {
        // #ifndef MP-WEIXIN
        callBack(() => res.signature);
        // #endif
        // #ifdef MP-WEIXIN
        callBack(res.signature);
        // #endif
      });
    },
    postVideo(fileId) {
      const params = {
        _jv: {
          type: 'thread/video',
        },
        file_id: fileId,
        type: 0,
      };
      this.$store.dispatch('jv/post', params);
    },
    // 获取当前编辑的主题数据
    getPostThread(option) {
      const params = {
        include: [
          'firstPost',
          'firstPost.images',
          'threadVideo',
          'threadAudio',
          'category',
          'firstPost.attachments',
          'question',
          'onlookers',
          'question.beUser',
          'question.images',
          'firstPost.postGoods',
        ],
      };
      this.$store
        .dispatch('jv/get', [
          `threads/${this.threadId}`,
          {
            params,
          },
        ])
        .then(res => {
          if (res.question) {
            this.beUserName = res.question.beUser.username;
            this.beAskId = res.question.beUser.id;
            this.userImage = res.question.beUser.avatarUrl;
          }
          this.postDetails = res;
          this.firstPostId = res.firstPost._jv.id;
          this.type = res.type;

          // #ifdef MP-WEIXIN
          this.markdownShow = false;
          // #endif
          // #ifdef H5
          if (this.type === 1) {
            this.markdownShow = true;
          }
          // #endif
          this.attachmentList = res.firstPost.attachments || [];
          this.textAreaValue = res.firstPost.content;
          this.categoryId = res.category._jv.id;
          this.checkClassData.push(res.category);
          if (res.threadVideo) {
            this.fileId = res.threadVideo.file_id;
            this.percent = 1;
          }
          // this.uploadFile = res.firstPost.images;
          if (res.firstPost.images) {
            res.firstPost.images.forEach(item => {
              if (item) {
                this.uploadFile.push({
                  type: 'attachments',
                  id: item._jv.id,
                  order: item.order,
                  name: item.fileName,
                  url: item.url,
                  path: item.thumbUrl ? item.thumbUrl : '',
                });
              }
            });
          }
          if (this.type === 6 && res.firstPost.postGoods) {
            this.dataGoodInfo = res.firstPost.postGoods;
            if (
              res.firstPost.postGoods.price.indexOf('-') !== -1 ||
              Number(res.firstPost.postGoods.price) > 0
            ) {
              this.dataGoodInfoPrice = res.firstPost.postGoods.price;
            } else if (Number(res.firstPost.postGoods.price) <= 0) {
              this.dataGoodInfoPrice = '';
            }

            this.isShowGoods = true;
          }
          this.loadStatus = true;
          if (Number(res.price) > 0) {
            this.price = res.price;
            this.word = res.freeWords;
            this.freepercentage.forEach(item => {
              if (res.freeWords === item.pay) {
                this.percentagedisplay = item.name;
              }
            });
            this.payType = 2;
            this.showPayType = this.i18n.t('discuzq.post.TheContentAndTheAccessoriesIsPaid');
            if (this.type === 1) {
              this.payNum[0].name = '￥1';
              this.payNum[0].pay = 1;
            }
          } else if (Number(res.attachmentPrice) > 0) {
            this.price = res.attachmentPrice;
            this.payType = 1;
            this.showPayType = this.i18n.t('discuzq.post.TheContentIsFreeAndTheAccessoriesArePaid');
            this.payNum[0].name = '￥1';
            this.payNum[0].pay = 1;
          } else {
            this.showPayType = this.i18n.t('discuzq.post.TheContentAndTheAccessoriesIsFree');
          }

          this.textAreaLength = this.type === 1 ? 49999 : 5000;
          switch (Number(res.type)) {
            case 0:
              break;
            case 1:
              this.postTitle = res.title;
              this.setAnnex('img', res);
              break;
            case 2:
              this.percent = 1;
              this.setAnnex('video', res);
              break;
            case 3:
              this.setAnnex('img', res);
              break;
            case 4:
              this.setAnnex('audio', res);
              break;
            case 5:
              this.setAnnex('img', res);
              break;
            case 6:
              this.setAnnex('goods', res);
              break;
            default:
          }
          // 微信里面的定位
          if (option.name) {
            const currentPosition = {};
            // const data = option.latng.split(',');
            // 微信里的定位
            // currentPosition.longitude = data[1];
            // currentPosition.latitude = data[0];
            currentPosition.location = option.name;
            currentPosition.address = option.addr;
            this.currentPosition = currentPosition;
          } else {
            this.currentPosition.longitude = res.longitude || '';
            this.currentPosition.latitude = res.latitude || '';
            this.currentPosition.location = res.location || '';
            this.currentPosition.address = res.address || '';
          }
          if (this.operating === 'edit' && this.goodsId) {
            this.getGoodsInfo();
          }
          this.setThread();
        });
    },

    // 获取商品信息
    getGoodsInfo() {
      this.$store.dispatch('jv/get', `goods/${this.goodsId}`).then(res => {
        // 这是取到的商品信息
        this.dataGoodInfo = res;
        if (res.price.indexOf('-') !== -1 || Number(res.price) > 0) {
          this.dataGoodInfoPrice = res.price;
        } else if (Number(res.price) <= 0) {
          this.dataGoodInfoPrice = '';
        }
        this.isShowGoods = true;
      });
    },

    // 编辑帖子接口
    async editThread() {
      let state = 0;
      const posts = {
        _jv: {
          type: 'posts',
          // id: `${this.firstPostId}?include=user,thread,images`,
          id: this.firstPostId,
          relationships: {},
          links: {
            self: `posts/${this.firstPostId}?include=user,thread,images`,
          },
        },
        content: this.textAreaValue,
      };
      const threads = {
        _jv: {
          type: 'threads',
          id: this.threadId,
          is_old_draft: 1,
          relationships: {
            category: {
              data: {
                type: 'categories',
                id: this.checkClassData[0]._jv.id,
              },
            },
          },
        },
      };
      const { currentPosition } = this;
      threads.longitude = currentPosition.longitude || '';
      threads.latitude = currentPosition.latitude || '';
      threads.location = currentPosition.location || '';
      threads.address = currentPosition.address || '';
      switch (this.type) {
        case 0:
          break;
        case 1:
          threads.title = this.postTitle;
          // threads.price = this.price;
          if (this.payType === 1) {
            threads.attachment_price = this.price;
            threads.price = '';
          } else if (this.payType === 2) {
            threads.attachment_price = '';
            threads.price = this.price;
          } else if (this.payType === 0) {
            threads.attachment_price = '';
            threads.price = '';
          }
          threads.free_words = this.word;
          posts._jv.relationships.attachments = {
            data: this.addImg().data.concat(this.addFile().data),
          };
          break;
        case 2:
          threads.file_id = this.fileId;
          threads.file_name = this.videoName;
          threads.price = this.price;
          break;
        case 3:
          threads.price = this.price;
          posts._jv.relationships.attachments = this.addImg();
          break;
        case 4:
          threads.price = this.price;
          threads.file_id = this.audioBeforeList[0].id;
          threads.file_name = this.audioBeforeList[0].fileName;
          break;
        case 5:
          posts._jv.relationships.attachments = this.addImg();
          // params._jv.relationships.question = this.addQuestion();
          break;
        case 6:
          posts.post_goods_id = this.dataGoodInfo._jv.id;
          break;
        default:
          break;
      }
      await this.$store.dispatch('jv/patch', posts).then(res => {
        if (res._jv.json.data.id) state += 1;
        if (res._jv.json.data.attributes.isApproved === 1) {
          // 因为设置了虚拟滚动，所以将会去除所有对列表数据的操作，只会刷新才会更新现有数据
          // this.$u.event.$emit('refreshImg', {
          //   id: this.firstPostId,
          //   threadId: this.threadId,
          //   images: this.addImg(),
          // });
          // this.$u.event.$emit('refreshGoods', {
          //   id: this.firstPostId,
          //   threadId: this.threadId,
          //   goods: this.dataGoodInfo,
          // });
        }
        // 更新详情页的信息
        // this.$u.event.$emit('refreshFiles');
        return res;
      });
      await this.$store.dispatch('jv/patch', threads).then(res => {
        if (res._jv.json.data.id) state += 1;
      });
      if (state === 2) {
        return state;
      }
      throw new Error('出错了');
    },
    // 小程序内发布按钮验证码验证
    toTCaptcha() {
      // #ifdef MP-WEIXIN
      const _this = this;
      wx.navigateToMiniProgram({
        appId: 'wx5a3a7366fd07e119',
        path: '/pages/captcha/index',
        envVersion: 'release',
        extraData: {
          appId: this.forums.qcloud.qcloud_captcha_app_id, // 您申请的验证码的 appId
        },
        success() {
          // 验证码成功打开
        },
        fail() {
          uni.hideLoading();
          _this.postLoading = false;
          _this.payShowStatus = false;
        },
      });
      // #endif
      // h5内发布按钮验证码验证
      // #ifdef H5
      this.captcha = new window.TencentCaptcha(this.forums.qcloud.qcloud_captcha_app_id, res => {
        if (res.ret === 0) {
          this.ticket = res.ticket;
          this.randstr = res.randstr;
          // 验证通过后发布
          this.postClick();
        }
        if (res.ret === 2) {
          this.postLoading = false;
          this.payShowStatus = false;
          uni.hideLoading();
        }
      });
      // 显示验证码
      this.captcha.show();
      // #endif
    },
    // 问答贴点击头像跳转选择被提问人
    changeAvatar() {
      uni.navigateTo({
        url: '/pages/user/at-member?name=select',
      });
    },
    ...mapMutations({
      setAtMember: 'atMember/SET_ATMEMBER',
    }),
  },
  onLoad(option) {
    this.setThread();
    if (option.threadId) {
      this.currentId = option.threadId;
      // 请求该帖子信息渲染到页面
      this.echoMoneyAndTime(option.threadId);
    }
    if (option.type === '5') {
      // this.payNum[0].name = this.i18n.t('discuzq.post.noReward');
    }
    this.categoryid = option.categoryId;
    this.categoryindex = option.categoryIndex;
    uni.$on('radioChange', item => {
      this.beUserName = item.username;
      this.beAskId = item.id;
      this.userImage = item.avatarUrl;
    });
    if (this.forums && this.forums.other) {
      this.canUploadAttachment = this.forums.other.can_upload_attachments;
    }
    // 问答编辑不显示提问价格
    if (this.forums && this.forums.paycenter) {
      if (option.operating === 'edit' || !this.forums.paycenter.wxpay_close) {
        this.askingPrice = false;
      } else {
        // 初始化默认内容附件均免费
        this.showPayType = this.i18n.t('discuzq.post.TheContentAndTheAccessoriesIsFree');
      }
    }

    if (option.type) this.type = Number(option.type);
    // #ifdef MP-WEIXIN
    const data = uni.getSystemInfoSync();
    if (data.platform === 'ios' && this.type === 5) {
      this.askingPrice = false;
      // this.postClick = true;
    }
    // #endif
    // #ifdef H5
    const { isWeixin } = appCommonH.isWeixin();
    this.isWeixin = isWeixin;
    this.isPhone = appCommonH.isWeixin().isPhone; // 这是h5
    if (this.isWeixin === false) {
      this.payTypeData[0].hide = true;
    }
    this.browser = 1;
    if (this.type === 1) {
      uni.$on('vditor', (vditor, vditorComponent) => {
        this.vditor = vditor;
        this.vditor.setValue(this.textAreaValue);
        vditorComponent.setPostComponent(this);
      });
    }
    // #endif
    this.url = DISCUZ_REQUEST_HOST;
    const token = uni.getStorageSync('access_token');
    this.header = {
      authorization: `Bearer ${token}`,
    };
    this.formData = {
      type: 1,
    };
    this.getCategories();
    if (option.operating) this.operating = option.operating;
    if (option.threadId) this.threadId = option.threadId;
    if (option.categoryIndex) {
      if (option.categoryIndex === '0') {
        this.categoryIndex = '';
      } else {
        this.categoryIndex = Number(option.categoryIndex);
      }
    }
    if (option.categoryId)
      this.categoryId = Number(option.categoryId) === 0 ? '' : Number(option.categoryId);
    this.textAreaLength = Number(option.type) === 1 ? 49999 : 5000;
    if (this.operating === 'edit' || this.operating === 'draft') {
      this.loadStatus = false;
      this.getPostThread(option);
    } else {
      this.loadStatus = true;
      if (option.name && option.latng) {
        const currentPosition = {};
        // const dat = option.latng.split(',');
        // currentPosition.longitude = dat[1];
        // currentPosition.latitude = dat[0];
        currentPosition.location = option.name;
        currentPosition.address = option.addr;
        this.currentPosition = currentPosition;
      }
    }
    try {
      const res = uni.getSystemInfoSync();
      if (
        this.forums &&
        this.forums.paycenter.wxpay_close &&
        this.forums.other.can_create_thread_paid
      ) {
        // #ifndef H5
        if (res.platform === 'ios') {
          // if (this.forums.paycenter.wxpay_ios === false) {
          //   this.showHidden = false;
          // } else {
          //   this.showHidden = true;
          // }
          this.ioshide = false;
        } else {
          this.ioshide = true;
          this.showHidden = true;
        }
        // #endif
        // #ifdef H5
        this.ioshide = true;
        this.showHidden = true;
        // #endif
      } else {
        this.ioshide = false;
        this.showHidden = false;
      }
    } catch (e) {
      // error
    }
    // #ifdef MP-WEIXIN
    this.markdownShow = false;
    // #endif
    // #ifdef H5
    if (this.type === 1) {
      this.markdownShow = true;
    }
    // #endif
    // 接受验证码captchaResult
    this.$u.event.$on('captchaResult', result => {
      this.ticket = result.ticket;
      this.randstr = result.randstr;
      this.postClick();
    });
    this.$u.event.$on('closeChaReault', () => {
      this.postLoading = false;
      this.payShowStatus = false;
      uni.hideLoading();
    });
    uni.$on('clickTopic', d => {
      this.textAreaValue = `${this.textAreaValue.slice(0, this.cursor)}  #${d.keywords.replace(
        /\s+/g,
        '',
      )}#${this.textAreaValue.slice(this.cursor)}  `;
      this.cursor = this.textAreaValue ? this.textAreaValue.length : 0;
    });
    if (this.type === 6) {
      this.goodsId = option.goodsId;
    }
    if (
      (this.type === 6 && option.operating !== 'edit' && option.threadId !== '' && this.goodsId) ||
      (this.type === 6 && this.goodsId)
    ) {
      this.getGoodsInfo();
    }
    // 接收来自首页的数据，并渲染或者报错时提示
    if (this.type === 2 || this.type === 3) {
      const eventChannel = this.getOpenerEventChannel();
      eventChannel.on('acceptDataFromOpenerPage', attachments => {
        if (this.type === 3) {
          attachments.map(item => {
            // eslint-disable-next-line
            // 当首页上传图片成功时
            this.uploadFile.push({
              type: 'attachments',
              id: item.data.id,
              order: item.data.attributes.order,
              name: item.data.attributes.fileName,
              url: item.data.attributes.url,
              path: item.data.attributes.thumbUrl ? item.data.attributes.thumbUrl : '',
            });
            this.filePreview.push({
              path: item.data.attributes.thumbUrl,
              id: item.data.id,
              order: item.data.attributes.order,
              name: item.data.attributes.fileName,
              url: item.data.attributes.url,
            });
            return item;
          });
          this.addImg();
        }
        if (this.type === 2) {
          if (attachments.data) {
            if (attachments.data.doneResult) {
              this.fileId = attachments.data.doneResult.fileId;
            } else {
              this.fileId = attachments.data.result.fileId;
            }
            this.videoBeforeList.push({
              path: attachments.data.uploadVideoRes.tempFilePath,
            });
            this.chooseType = 0;
            this.percent = 1;
          }
        }
      });
    }
  },
  onShow() {
    // 监听页面显示。页面每次出现在屏幕上都触发，包括从下级页面点返回露出当前页面
    let atMemberList = '';
    this.getAtMemberData.map(item => {
      atMemberList += `@${item.username} `;
      return atMemberList;
    });
    this.textAreaValue = `${this.textAreaValue.slice(0, this.cursor) +
      atMemberList +
      this.textAreaValue.slice(this.cursor)}`;
    this.setAtMember([]);
    this.cursor = this.textAreaValue ? this.textAreaValue.length : 0;
    if (!this.threadId) {
      // this.setThread();
    }
  },
  onReady() {
    // 监听页面初次渲染完成
    this.videoContext = uni.createVideoContext('video');
  },
  onUnload() {
    // 监听页面卸载
    this.$u.event.$off('captchaResult');
    this.$u.event.$off('closeChaReault');
    this.$u.event.$off('radioChange');
    this.$u.event.$off('radioEditChange');
    // #ifdef H5
    uni.$off('clickTopic');
    uni.$off('clickImage');
    uni.$off('clickAttach');
    // #endif
    // 隐藏验证码
    if (this.captcha) {
      this.captcha.destroy();
    }
    clearInterval(payWechat);
    clearInterval(payPhone);
    clearInterval(this.timer1);
    this.timer1 = null;
    clearInterval(this.timer2);
    this.timer2 = null;
    this.save = true;
  },
};
</script>

<style lang="scss" scoped>
@import '@/styles/base/theme/fn.scss';
@import '@/styles/base/variable/global.scss';

.endTimes {
  display: flex;
  // #ifdef MP-WEIXIN
  height: 110rpx;
  // #endif
  align-items: center;
  border-bottom: 2rpx solid --color(--qui-BOR-ED);
  justify-content: space-between;
}

.post-box__ft-tit {
  display: block;
  margin: 30rpx 0;
  font-size: $fg-f4;
  font-weight: bolder !important;
  color: --color(--qui-FC-7D7979);
  color: #333 !important;
}

// 他人围观样式
// .uni-list-cell-gw {
//   display: flex;
//   flex-direction: column;
// }
// .uni-list-cell-gw-explain {
//   color: #c5c6cb;
//   font-size: 24rpx;
// }
.post-box {
  width: 100vw;
  height: 100%;
  padding: 40rpx;
  overflow: hidden;
  background-color: --color(--qui-BG-2);
  box-sizing: border-box;

  &__title {
    display: flex;
    align-items: center;
    width: 100vw;
    height: 100rpx;
    margin-bottom: 30rpx;
    border-bottom: 2rpx solid --color(--qui-BOR-ED);

    &-input {
      width: 100%;
      padding-right: 80rpx;
      font-size: $fg-f5;
    }
  }

  &__titles {
    margin-bottom: 30rpx;
  }

  &__hd {
    display: flex;
    justify-content: space-between;
    align-items: center;

    &-l {
      &__icon {
        margin-right: 54rpx;
      }
    }

    &-r {
      font-size: $fg-f2;
      color: --color(--qui-FC-777);
      color: #999 !important;
    }
  }

  &__con {
    width: 100%;
    max-height: 900rpx;
    padding: 10rpx 0 0;
    margin-top: 20rpx;
    margin-bottom: 63rpx;
    overflow: hidden;
    background-color: --color(--qui-BG-1);
    border: 1rpx solid --color(--qui-BOR-DDD);
    border-radius: 7rpx;
    box-sizing: border-box;
  }

  &__con-text {
    z-index: 0;
    width: 100%;
    max-height: 900rpx;
    min-height: 400rpx;
    min-height: 238rpx;
    padding: 10rpx 20rpx 20rpx;
    font-size: $fg-f4;
    line-height: 40rpx;
    box-sizing: border-box;
    .text-cover {
      font-size: $fg-f4;
      line-height: 40rpx;
    }

    &--static {
      overflow: auto;
    }
  }

  &__ft {
    &-tit {
      display: block;
      margin: 30rpx 0;
      font-size: $fg-f4;
      color: --color(--qui-FC-7D7979);
    }

    &-categories {
      // 分类下面的margin
      margin-bottom: 40rpx;
    }
  }

  &__good {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    margin: 30rpx 0;
    font-size: $fg-f3;

    &__image {
      width: 160rpx;
      height: 160rpx;
      margin: 0 30rpx 0 0;
      border-radius: 5rpx;
    }

    &__info {
      position: relative;
      flex: 1;
      display: flex;
      flex-direction: column;
    }

    &__title {
      max-height: 120rpx;
      overflow: hidden;
      font-weight: bold;
      line-height: 40rpx;
      color: --color(--qui-FC-333);
    }

    &__ft {
      position: absolute;
      bottom: 0;
      display: flex;
      width: 100%;
      justify-content: space-between;
      align-items: center;
      line-height: 45rpx;
      color: --color(--qui-FC-777);
    }

    &__price {
      display: inline-block;
      font-size: $fg-f5;
      color: --color(--qui-RED);
    }

    &__btn {
      display: inline-block;
    }
  }

  &__space {
    width: 100%;
    height: 160rpx;
    margin: 30rpx 0;
    line-height: 160rpx;
    color: --color(--qui-FC-B5);
    text-align: center;
    background-color: --color(--qui-FC-f7);
    border: 1rpx solid --color(--qui-BOR-ED);
    border-radius: 5rpx;
  }

  &__position /deep/ {
    position: relative;
    color: --color(--qui-FC-777);

    .icon-weizhi {
      margin-right: 10rpx;
    }

    .icon-close1 {
      position: absolute;
      top: 36rpx;
      right: 0;
      z-index: 100;
    }
  }
}

.play-load {
  .post-box__video__play__load__mask {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: --color(--qui-BG-ED);
    border: 1px solid --color(--qui-BOR-ED);
    border-radius: 5rpx;
    opacity: 0.7;
  }

  .post-box__video__play__load__text {
    position: relative;
    z-index: 2;
    font-size: $fg-f4;
    line-height: 36rpx;
    color: --color(--qui-FC-34);
  }

  progress {
    position: absolute;
    bottom: 9.5rpx;
    z-index: 3;
    width: 87.5%;
  }
}

.post-box__ft-categories /deep/ .qui-button--button {
  margin-top: 10rpx;
  margin-right: 20rpx;
  margin-bottom: 10rpx;
  &[size='default'] {
    /* #ifndef H5-PLAY || MP-WEIXIN-PLAY */
    border: 1px solid rgba(0, 0, 0, 0.2);
    /* #endif */
  }
  /* #ifdef H5-PLAY ||MP-WEIXIN-PLAY */
  &[type='primary'] {
    color: #fff;
    background: #ea3d5a;
    border: none;
  }
  /* #endif */
}

.post-box__ft-categories /deep/ .qui-button--button:after {
  border: none;
  border-radius: 0;
}

.post-box__ft-categories /deep/ .cateActive {
  // 分类按钮点击时候变化颜色
  &[size='default'] {
    /* #ifdef H5-PLAY || MP-WEIXIN-PLAY */
    color: #fff;
    background: #ea3d5a;
    /* #endif */
    /* #ifndef H5-PLAY || MP-WEIXIN-PLAY */
    border: 1px solid #1878f3;
    /* #endif */
  }
}

.popup-content-btn {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  .popup-btn {
    margin-top: 20rpx;
  }
}

.popup-share {
  /* #ifndef APP-NVUE */
  display: flex;
  flex-direction: column;
  /* #endif */
  background: --color(--qui-BG-2);
}

.popup-share-content {
  height: 477rpx;
  padding: 40rpx 45rpx;
  text-align: center;
  box-sizing: border-box;

  .popup-title {
    font-size: $fg-f4;
  }
}

.popup-share-content-space {
  width: 100%;
  height: 9rpx;
  background: --color(--qui-BG-ED);
}

.emoji-bd {
  position: relative;
  width: 100%;
}

/deep/ textarea .textarea-placeholder {
  // 输入框的字体
  font-size: $fg-f4;
  color: --color(--qui-FC-B5);
}

/deep/ input .input-placeholder {
  font-size: $fg-f5;
  color: --color(--qui-FC-AAA);
}

.cell-item-right-text {
  /deep/ .cell-item__body__right-text {
    color: --color(--qui-RED);
  }
}

/deep/ .cell-item__body__right .cell-item__body__right-text {
  font-size: $fg-f5;
}

/deep/ .cell-item__body__content-title {
  color: --color(--qui-FC-777);
}

/deep/ .uni-list-cell {
  display: flex;
  justify-content: space-between;
  height: 100rpx;
  align-items: center;
  font-size: $fg-f4;
  color: --color(--qui-FC-777);
  border-bottom: 2rpx solid #ededed;
}

/deep/ .my-profile__avatar {
  position: relative;
}

// /deep/ .avatar-box {
//   padding-left: 0;
// }
/deep/ .avatar-box__r__tit {
  color: --color(--qui-FC-TAG);
}

/deep/ .uni-list-cell .uni-list-cell-pd {
  position: relative;
}

.popup-dialog {
  width: 670rpx;
  height: 342rpx;
  background-color: --color(--qui-BG-2);
  border-radius: 14rpx;

  &__top {
    padding-top: 40rpx;
    text-align: center;

    text {
      font-size: $fg-f4;
      color: --color(--qui-FC-333);
    }
  }

  &__cont {
    position: relative;
    display: flex;
    align-items: center;
    padding: 24rpx 52rpx 40rpx;

    &-rmb {
      position: absolute;
      margin-left: 25rpx;
    }

    &-input {
      width: 100%;
      height: 100rpx;
      padding: 0 25rpx 0 80rpx;
      font-size: 40rpx;
      text-align: right;
      border: 1px solid --color(--qui-BOR-DDD);
      border-radius: 7rpx;
      box-sizing: border-box;
    }
  }

  &__ft {
    display: flex;
    align-items: center;
    height: 100rpx;
    border-top: 2rpx solid --color(--qui-BOR-DDD);
    box-sizing: border-box;

    button {
      width: 50%;
      color: --color(--qui-FC-777);
      background-color: --color(--qui-BG-2);
      border-radius: 0;

      &:after {
        border: none;
      }

      &:last-of-type {
        border-left: 2rpx solid --color(--qui-BOR-DDD);
        border-bottom-right-radius: 10rpx;
      }

      &:first-of-type {
        border-bottom-left-radius: 10rpx;
      }
    }

    .popup-btn--ok--blue {
      color: --color(--qui-BG-HIGH-LIGHT);
    }
  }
}

/deep/ .uni-video-cover {
  display: none;
}

/deep/ .cell-item__body__right {
  display: contents;
}

.markdown-box {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
  height: 60rpx;
  line-height: 60rpx;
  background: --color(--qui-BG-FFF);
  border-top: 1px solid --color(--qui-BOR-DDD);
}

.username {
  max-width: 200rpx;
  overflow: hidden;
  font-size: $fg-f3;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.pay-type {
  font-size: $fg-f4;
  line-height: 100rpx;
  text-align: center;
  border-bottom: 1px solid --color(--qui-BOR-ED);
}

.watchpay {
  font-size: $fg-f3;
  color: --color(--qui-FC-AAA);
}

/* #ifdef H5-PLAY || MP-WEIXIN-PLAY */
.post-box__hd-r {
  color: #999 !important;
}

.bottom_button {
  display: flex;
  justify-content: space-between;
}

.bottom_button /deep/ .qui-button--button:after {
  border: none;
}

.post-box__img {
  // display: flex;
  // justify-content: space-between;
  // align-items: center;
  position: relative;
  padding: 20rpx 10rpx;
  // margin: 60rpx 0 100rpx;
  background-color: #f4f4f4;
  .pullDown_img {
    position: absolute;
    top: -30rpx;
    left: 20rpx;
    width: 44rpx;
    height: 33rpx;
  }
}

/* #endif */
</style>
